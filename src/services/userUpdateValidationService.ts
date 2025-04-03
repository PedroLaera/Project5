import { cpf } from "cpf-cnpj-validator";
import bcrypt from "bcrypt";

export const validateName = (name: string): string | null => {
  if (!name || name.trim() === "") {
    return "Escreva um nome válido";
  }
  return null;
};

export const validateCPF = (CPF: string): string | null => {
  if (!CPF || typeof CPF !== "string" || !cpf.isValid(CPF)) {
    return "CPF inválido";
  }
  return null;
};

export const validatePasswordFormat = (password: string): string | null => {
  const senhaRegex =
    /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  if (!password || !senhaRegex.test(password)) {
    return "A senha deve ter no mínimo 8 caracteres e pelo menos 1 caractere especial";
  }
  return null;
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const validateUserUpdateData = async (
  name: string,
  password: string,
  CPF: string,
  email?: string
): Promise<string | null> => {
  if (email) {
    return "A atualização do e-mail não é permitida.";
  }

  let error = validateName(name);
  if (error) return error;

  error = validateCPF(CPF);
  if (error) return error;

  error = validatePasswordFormat(password);
  if (error) return error;

  return null;
};
