interface Encryption {
    hash(password: string): Promise<string>;
}

export default Encryption;