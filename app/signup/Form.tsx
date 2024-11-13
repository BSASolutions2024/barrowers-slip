"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signupAction } from "./actions";

export default function Form() {
    const signupStatus = useFormStatus();
  const [state, action] = useFormState(signupAction, {
    error: "",
  });

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          required
          className="border p-2 rounded"
        />

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
        focus:outline-2 focus:outline-sky-400 focus:outline-offset-2 focus:outline
        disabled:outline-none
        btn"
      tabIndex={-1}
      disabled={signupStatus.pending}
    >
      {signupStatus.pending ? "Loading" : "Sign up"}
    </button>
    </form>
  );
}