"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "./actions";

export default function Form() {
  const loginStatus = useFormStatus();
  const [state, action] = useFormState(loginAction, {
    error: "",
  });


  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          className="border p-2 rounded"
        />
      </div>

      {state.error !== "" ? (
        <p className="text-rose-500 text-sm">{state.error}</p>
      ) : null}

      <button
            className="
              bg-white 
              text-black 
              p-2 
              rounded-md 
              transition 
              hover:opacity-80 
              disabled:bg-zinc-700 disabled:opacity-100
              disabled:outline-none btn"
            tabIndex={-1}
            disabled={loginStatus.pending}
          >
            {loginStatus.pending ? "Loading" : "Log in"}
        </button>
    </form>
  );
}