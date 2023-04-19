import User from "../../../domain/entities/User";
import RegisterUser from "../../../core/usecases/User/RegisterUser";
import CodeError from "../../../util/CodeError";
import { Services } from "../../config/services";
import { CustomRequest } from "../types/CustomRequest";

function validPassword (password: string): boolean {
    return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password);
}

const registerUser = async (req: CustomRequest): Promise<boolean> => {
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

    const services = req.context.services as Services;
    const registerResult = await RegisterUser({
        user: userToRegister,
        password,
        userRepository: services.userRepository,
        encryption: services.encryption,
    });
    return registerResult;
};

export default { registerUser };