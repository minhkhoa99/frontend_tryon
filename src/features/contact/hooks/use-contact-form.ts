"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactSchema } from "@/features/contact/schemas/contact.schema";
import type { ContactContent } from "@/features/contact/types/contact.types";

export function useContactForm(content: ContactContent) {
  return useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: content.defaults,
    mode: "onBlur",
  });
}
