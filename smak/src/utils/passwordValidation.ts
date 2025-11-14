export function validatePassword(password: string) {
  const errors: string[] = [];

  if (password.length < 6) errors.push("Minst 6 tecken");
  if (!/[A-Z]/.test(password)) errors.push("Minst en versal (A–Z)");
  if (!/[0-9]/.test(password)) errors.push("Minst en siffra");
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    errors.push("Minst ett specialtecken");

  return {
    isValid: errors.length === 0,
    errors,
  };
}
