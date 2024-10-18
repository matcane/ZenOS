export function generatePhoneNumber(): string {
  const firstDigit = Math.floor(Math.random() * 6) + 3;
  const remainingDigits = Math.random().toString().slice(2, 7);

  return firstDigit + remainingDigits;
}
