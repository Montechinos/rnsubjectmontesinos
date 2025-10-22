import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../constants/messages';

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION_MESSAGES.name.required)
    .min(3, VALIDATION_MESSAGES.name.minLength)
    .max(50, VALIDATION_MESSAGES.name.maxLength),
  
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.email.required)
    .email(VALIDATION_MESSAGES.email.invalid),
  
  password: z
    .string()
    .min(1, VALIDATION_MESSAGES.password.required)
    .min(8, VALIDATION_MESSAGES.password.minLength)
    .regex(/[A-Z]/, VALIDATION_MESSAGES.password.uppercase)
    .regex(/[a-z]/, VALIDATION_MESSAGES.password.lowercase)
    .regex(/[0-9]/, VALIDATION_MESSAGES.password.number)
    .regex(/[!@#$%^&*(),.?":{}|<>]/, VALIDATION_MESSAGES.password.special),
  
  confirmPassword: z
    .string()
    .min(1, VALIDATION_MESSAGES.confirmPassword.required)
}).refine((data) => data.password === data.confirmPassword, {
  message: VALIDATION_MESSAGES.confirmPassword.mismatch,
  path: ['confirmPassword']
});

export type SignupFormData = z.infer<typeof signupSchema>;