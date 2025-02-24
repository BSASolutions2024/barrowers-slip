"use server";
import { createSession } from "@/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function loginAction(_: any, formData: FormData) {
  try {
    const result = await createSession(formData);

    cookies().set("token", result);

  } catch (error) {
    console.log({error})
    if (error instanceof ZodError) {
      return {
        error: error.errors[0].message,
      };
    }

    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Unknown error occurred while logging in",
    };
  }
}
