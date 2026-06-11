import { PasswordHashInterface } from 'src/domains/identity/application/contracts/password-hash.interface';
import * as bcrypt from 'bcrypt';

export class PasswordHashService implements PasswordHashInterface {
  public hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  public compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
