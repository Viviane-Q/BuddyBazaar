interface Encryption {
  sign(payload: string, secret: string): string;
  verify(token: string, secret: string): string | null;
  compare(password: string, passhash: string): unknown;
  hash(password: string): Promise<string>;
}

export default Encryption;
