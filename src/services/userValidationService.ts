import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";

// Validação do nome
export const validateName = (name: string): string | null => {
  if (!name || name.trim() === "") {
    return "Escreva um nome válido";
  }
  return null;
};

// Validação do formato do e-mail
export const validateEmailFormat = (email: string): string | null => {
  if (!email || email.trim() === "") {
    return "Escreva um EMAIL válido";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return "Digite um e-mail válido (ex: nome@email.com)";
  }
  return null;
};

// Verifica se o e-mail já existe
export const checkEmailExists = async (email: string): Promise<string | null> => {
  const existingUser = await UserModel.findOne({ where: { email } });
  if (existingUser) {
    return "Este e-mail já está cadastrado.";
  }
  return null;
};

// Validação do CPF no formato 000.000.000-00
export const validateCPF = (CPF: string): string | null => {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (!CPF || typeof CPF !== "string" || !cpfRegex.test(CPF)) {
    return "CPF inválido";
  }
  return null;
};

// Validação da senha (mínimo 8 caracteres e 1 caractere especial)
export const validatePasswordFormat = (password: string): string | null => {
  const senhaRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  if (!password || !senhaRegex.test(password)) {
    return "A senha deve ter no mínimo 8 caracteres e pelo menos 1 caractere especial";
  }
  return null;
};

// Função para gerar hash da senha
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

// Função que compõe todas as validações
export const validateUserData = async (
  name: string,
  email: string,
  password: string,
  CPF: string
): Promise<string | null | undefined > => {
    let error = validateName(name);
    if (error) return error;
};