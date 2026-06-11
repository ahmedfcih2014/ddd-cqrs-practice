export const PASSWORD_HASH = Symbol('PASSWORD_HASH');

export interface PasswordHashInterface {
  hash(password: string): Promise<string>;
  compare(password: string, hashedPassword: string): Promise<boolean>;
}
