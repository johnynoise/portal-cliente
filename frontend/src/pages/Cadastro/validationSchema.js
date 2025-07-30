// src/schemas/userSchema.js

import { z } from 'zod';

// Schema de validação de cadastro de usuário
export const userSchema = z
  .object({
    name: z.string().min(1, 'Nome'),
    email: z.string().email('Email inválido'),
    empresa: z.string().min(1, 'Empresa é obrigatória'),
    telefone: z.string().min(10, 'Telefone inválido'),
    password: z
      .string()
      .min(8, 'Mínimo 8 caracteres')                          // Validação mínima
      .regex(/[A-Z]/, 'A senha precisa de uma letra maiúscula')     // Pelo menos uma maiúscula
      .regex(/[0-9]/, 'A senha precisa de um número')               // Pelo menos um número
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'A senha precisa de um caractere especial'), // Especial
    confirmPassword: z.string(), // Campo para confirmar senha
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });
