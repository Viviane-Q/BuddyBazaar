import Encryption from '../../domain/interfaces/Encryption';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class EncryptionLib implements Encryption {
  sign(payload: string, secret: string): string {
    return jwt.sign(payload, secret, { algorithm: 'HS256' });
  }

  verify(token: string, secret: string): string | null {
    try {
      return jwt.verify(token, secret, { algorithms: ['HS256'] });
    } catch (error) {
      return null;
    }
  }

  compare(password: string, passhash: string): boolean {
    return bcrypt.compare(password, passhash);
  }

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

export default EncryptionLib;
