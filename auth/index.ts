import {pool} from "@/db";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { NextResponse } from "next/server";
// import { sql } from "@vercel/postgres";
import { Client } from "pg";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function createUser(formData: FormData) {

  const client = await pool.connect()
  
  try {
    const data = createUserSchema.parse(Object.fromEntries(formData));
  
    const hashedPassword = hashUserPassword(data.password)

    // Create user record
    await client.query(
      "INSERT INTO users (uid, name, email, password) VALUES ($1::text, $2::text, $3::text, $4::text);",
      [crypto.randomUUID(), data.name, data.email, hashedPassword]
    );

    let sessionFormData = new FormData();

    sessionFormData.append("email", data.email);
    sessionFormData.append("password", data.password);

    return createSession(sessionFormData);

  } catch (error:any) {
    return NextResponse.json({error: 'Something went wrong', details: error.message})
  } finally {
    client.release()
  }

  
}

const createSessionSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function createSession(formData: FormData) {

  const client = await pool.connect()

  const data = createSessionSchema.parse(Object.fromEntries(formData));

  const token = crypto.randomUUID();

  // const client = await sql.connect();


  try {
    await client.query('BEGIN')

    // Get uid
    // const userResult = await client.query(
    //   "SELECT uid FROM users WHERE email = $1::text AND password = $2::text;",
    //   [data.email, data.password]
    // );

    const userResult = await client.query(
      "SELECT uid, password FROM users WHERE email = $1::text",
      [data.email]
    );

    const userRow = userResult.rows[0];

    if (!userRow) {
      throw new Error("User not found");
    }

    const userID = userRow.uid;

    const storedHashedPassword = userRow.password;

    
    // Verify the supplied password with the stored hashed password
    const isPasswordValid = verifyPassword(storedHashedPassword, data.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    if (!userID || typeof userID !== "string") {
      throw new Error("Invalid user record");
    }

    // Check if a user has session already
    const sessionWithSameUID = await client.query(
      "SELECT * FROM sessions WHERE uid = $1::text;",
      [userID]
    );

    if (sessionWithSameUID.rowCount === 1) {
      await client.query("DELETE FROM sessions WHERE uid = $1::text;", [
        userID,
      ]);
    }

    // Create session
    await client.query(
      `INSERT INTO sessions (token, uid) VALUES ($1::text, $2::text);`,
      [token, userID]
    );

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');

    throw error;
  } finally {
    client.release()
  }

  return token;
}

// We don't want to expose the password
const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function getUser(token: string) {

  const client = await pool.connect()
  // const client = await sql.connect();

  let userData: any;

  try {
    await client.query('BEGIN')

    // Get session data
    const sessionResult = await client.query(
      "SELECT uid FROM sessions WHERE token = $1::text;",
      [token]
    );

    const sessionRow = sessionResult.rows[0];

    if (!sessionRow) {
      throw new Error("Session not found");
    }

    const userID = sessionRow.uid;

    if (!userID || typeof userID !== "string") {
      throw new Error("Invalid session record");
    }

    // Get user data from uid
    const userResult = await client.query(
      "SELECT name, email FROM users WHERE uid = $1::text;",
      [userID]
    );

    userData = userResult.rows[0];

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');

    throw error;
  }

  if (!userData) {
    throw new Error("User not found");
  }

  return userSchema.parse(userData);
}