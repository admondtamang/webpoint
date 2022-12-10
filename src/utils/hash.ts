import argon2 from "argon2";

export async function genHash(password: string) {
  return argon2.hash(password);
}
