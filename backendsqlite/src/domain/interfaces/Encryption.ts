interface Encryption {
    sign (header: { alg: string; }, payload: string, secret: string): string;
    compare (password: string, passhash: string): unknown;
    hash (password: string): Promise<string>;
}

export default Encryption;