import { cookies } from "next/headers";
import { getUser } from "@/auth";
import { redirect } from "next/navigation";
import Form from "./Form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

export default async function Signup() {
  let user: any;

  try {
    let tokenCookie = cookies().get("token")?.value;

    if (!tokenCookie) {
      throw new Error();
    }

    user = await getUser(tokenCookie);
  } catch (error) {
    console.log(error);
  }

  if (user) {
    redirect("/borrowers-list");
  }

  return (
    <div className="grid place-items-center flex-grow">
      <main
        className="
          flex flex-col gap-6 
          p-8 
          mt-10
          border rounded-lg
          w-[30rem] border-slate-400"
      >
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Sign up</h1>

          <p className="text-zinc-400">
            Sign up and your information will be stored.
          </p>
        </header>

        <Form />
      </main>
    </div>
  );
}