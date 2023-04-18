import Encryption from "../../core/interfaces/Encryption";

class EncryptionInMemory implements Encryption {
  hash(password: string): Promise<string> {
    return Promise.resolve("hash");
  }
}

export default EncryptionInMemory;
