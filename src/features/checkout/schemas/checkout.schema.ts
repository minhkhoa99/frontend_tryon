import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ và tên"),
  phone: z.string().min(9, "Vui lòng nhập số điện thoại hợp lệ"),
  email: z.email("Vui lòng nhập email hợp lệ"),
  address: z.string().min(8, "Vui lòng nhập địa chỉ nhận hàng"),
  city: z.string().min(3, "Vui lòng nhập tỉnh / quận"),
  postalCode: z.string().min(5, "Vui lòng nhập mã bưu chính"),
  paymentMethod: z.enum(["card", "cod", "wallet"]),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;
