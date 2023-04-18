import Encryption from "../../core/interfaces/Encryption";

const bcrypt = require("bcrypt");

class EncryptionBcrypt implements Encryption {
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

export default EncryptionBcrypt;
