import { getUser } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Form from "./Form";

export const dynamic = "force-dynamic"

export default async function LoginPage() {
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
          border rounded-lg border-slate-400
          bg-accent
          w-[30rem]"
      >
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Hi Admin</h1>

          <p className="text-zinc-400">Log into your account.</p>
        </header>

        <Form />
      </main>
    </div>
  );
}
