// Regla única de validación de contraseña para el registro.
// Alineada con el mínimo de 8 caracteres del backend.
export const validatePassword = (password: string): string | undefined => {
  if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres";
  if (!/\d/.test(password)) return "La contraseña debe tener al menos un número";
  if (!/[A-Z]/.test(password)) return "La contraseña debe tener al menos una mayúscula";
  if (!/[a-z]/.test(password)) return "La contraseña debe tener al menos una minúscula";
  if (!/[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/.test(password))
    return "La contraseña debe tener al menos un carácter especial";
  return undefined;
};
