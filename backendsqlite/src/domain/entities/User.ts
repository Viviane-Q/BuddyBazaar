class User {
  private _id?: number;
  private _name: string;
  private _email: string;
  private _passhash?: string;

  constructor(
    id: number | undefined,
    name: string,
    email: string,
    passhash?: string
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._passhash = passhash;
  }

  get id(): number | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get passhash(): string | undefined {
    return this._passhash;
  }

  toObject(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }

  toObjectWithPasshash(): any {
    return {
      ...this.toObject(),
      passhash: this.passhash,
    };
  }
}

export default User;
