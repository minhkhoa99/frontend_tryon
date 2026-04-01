import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  email: z.email("Vui lòng nhập email hợp lệ"),
  subject: z.string().min(3, "Vui lòng nhập chủ đề"),
  message: z.string().min(10, "Vui lòng nhập nội dung chi tiết hơn"),
});

export type ContactSchema = z.infer<typeof contactSchema>;
