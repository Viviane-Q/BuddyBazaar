import Encryption from '../../domain/interfaces/Encryption';

const bcrypt = require('bcrypt');
const jwt = require('jws');

class EncryptionLib implements Encryption {
  sign(header: { alg: string }, payload: string, secret: string): string {
    return jwt.sign({ header, payload, secret });
  }

  compare(password: string, passhash: string): boolean {
    return bcrypt.compare(password, passhash);
  }

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

export default EncryptionLib;
