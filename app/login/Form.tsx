"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { LoginFormValues, loginSchema } from "@/lib/schemas/userSchema";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { loginAction } from "./actions";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter()
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const loginFormHandler = async(data:LoginFormValues) => {
    setIsLoading(true)

    try{
      const formData = new FormData()

      formData.append("email", data.email)
      formData.append("password", data.password)

      let response:any = await loginAction(null, formData)

      if(response?.error) {
        toast({ title: "Error", description: response?.error, variant: "destructive" });
      } else {
        router.push('/borrowers-list')
      }

    }catch(error:any){
      toast({ title: "Error", description: error.error.message, variant: "destructive" });
    }finally{
      setIsLoading(false)
    }
  };

  // const loginStatus = useFormStatus();
  // const [state, action] = useFormState(loginAction, {
  //   error: "",
  // });

  return (
    <form
      onSubmit={handleSubmit(loginFormHandler)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-3">
        {errors.email && (
          <p className="text-error text-sm">{errors.email.message}</p>
        )}
        <Input
          type="email"
          placeholder="Enter your email"
          className="border p-2 rounded"
          {...register("email")}
        />
        {errors.password && (
          <p className="text-error text-sm">{errors.password.message}</p>
        )}
        <Input
          type="password"
          placeholder="Enter your password"
          className="border p-2 rounded"
          {...register("password")}
        />
      </div>

      <button
        className="
              bg-white 
              text-black 
              p-2 
              rounded-md 
              transition 
              disabled:outline-none btn"
        tabIndex={-1}
        disabled={isLoading}
      >
        {isLoading ? "Loading" : "Log in"}
      </button>
    </form>
  );
}
