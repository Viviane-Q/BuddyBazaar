import Encryption from "../../domain/interfaces/Encryption";

class EncryptionInMemory implements Encryption {
  sign(header: { alg: string }, payload: string, secret: string): string { // eslint-disable-line
    return 'token';
  }

  compare(password: string, passhash: string): unknown {
    return password === '123456' && passhash === 'hash';
  }

  hash(password: string): Promise<string> { // eslint-disable-line
    return Promise.resolve('hash');
  }
}

export default EncryptionInMemory;
