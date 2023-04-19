import { Request } from "express";
import User from "../../../domain/entities/User";
import RegisterUser from "../../../core/usecases/User/RegisterUser";
import UserRepositorySQLite from "../../driven/repositories/UserRepositorySQLite";
import EncryptionBcrypt from "../../driven/EncryptionBcrypt";
import CodeError from "../../../util/CodeError";

const userRepository = new UserRepositorySQLite();
const encryption = new EncryptionBcrypt();

function validPassword (password: string): boolean {
    return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password);
}

const registerUser = async (req: Request): Promise<boolean> => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Register a new user'
    // #swagger.parameters['obj'] = { in: 'body', description:'Name and email', schema: { $name: 'John Doe', $email: 'John.Doe@acme.com', $password: '1m02P@SsF0rt!'}}
    if (!('name' in req.body && 'email' in req.body && 'password' in req.body)) {
        throw new CodeError('You must specify the name, email and password', 400);
    }
    const { name, email, password } = req.body;

    if (!validPassword(password)) 
        throw new CodeError('Weak password!', 400);

    const userToRegister = new User(undefined, name, email);

    const registerResult = await RegisterUser({
        user: userToRegister,
        password,
        userRepository,
        encryption,
    });
    return registerResult;
};

export default { registerUser };