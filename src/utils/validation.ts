// src/utils/validation.ts

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email é obrigatório.";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.trim())) return "Email inválido.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Digite a senha.";
  if (password.length < 8) return "A senha deve ter pelo menos 8 caracteres.";
  if (!/[A-Z]/.test(password)) return "A senha deve ter pelo menos uma letra maiúscula.";
  if (!/[a-z]/.test(password)) return "A senha deve ter pelo menos uma letra minúscula.";
  if (!/[0-9]/.test(password)) return "A senha deve ter pelo menos um número.";
  return null;
}

export function validateName(name: string): string | null {
  if (!name.trim()) return "Nome é obrigatório.";
  if (name.trim().length < 2) return "Nome muito curto.";
  return null;
}

export function validateConfirmPassword(password: string, confirm: string): string | null {
  if (!confirm) return "Confirme sua senha.";
  if (password !== confirm) return "As senhas não coincidem.";
  return null;
}

export function validateCode(code: string): string | null {
  if (!code) return "Digite o código.";
  if (code.length !== 6) return "O código deve ter 6 dígitos.";
  if (!/^\d{6}$/.test(code)) return "O código deve conter apenas números.";
  return null;
}