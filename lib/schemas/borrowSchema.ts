import { z } from "zod";

export const borrowSchema = z.object({
  borrower_name: z.string().min(1, "Name is required"),
  borrower_email: z.string().email(),
  borrower_id: z.string().min(1, "This field is required"),
  location: z.string().min(1, "Location is required"),
  contact_no: z.string(),
  description: z.string().min(1, "Description is required"),
  borrow_date: z.string().min(1, "Date borrowed is required"),
  return_date: z.string().min(1, "Return date is required"),
  agreement: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" }),
  }),
  assets: z.array(z.string()).min(1, "Please select at least one"),
  borrow_status: z.enum(["open", "completed"]).optional()
});

export type BorrowFormValues = z.infer<typeof borrowSchema>;