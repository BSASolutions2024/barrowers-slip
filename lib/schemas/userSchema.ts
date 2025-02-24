import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
})

export const signupSchema = loginSchema.extend({
    name: z.string().min(1, "Name is required")
})


export type LoginFormValues = z.infer<typeof loginSchema>
export type SignupFormValues = z.infer<typeof signupSchema>