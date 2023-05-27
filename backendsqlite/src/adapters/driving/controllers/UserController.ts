import RegisterUser from '../../../core/usecases/User/RegisterUser';
import SignInUser from '../../../core/usecases/User/SignInUser';
import User from '../../../domain/entities/User';
import CodeError from '../../../util/CodeError';
import { Services } from '../../config/services';
import { CustomRequest } from '../types/CustomRequest';

function validPassword(password: string): boolean {
  return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(
    password
  );
}

const registerUser = (req: CustomRequest): Promise<boolean> => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Register a new user'
    #swagger.parameters['obj'] = {
      in: 'body', description:'Name, email and password',
      schema: {
        $name: 'John Doe',
        $email: 'John.Doe@acme.com',
        $password: '1m02P@SsF0rt!'
      }
    }
    #swagger.responses[201] = {
      schema: { $message: 'User registered' }
    }
    #swagger.responses[400] = {
      schema: { $message: 'You must specify the name, email and password' }
    }
    #swagger.responses[409] = {
      schema: { $message: 'Email already registered' }
    }
  */
  if (!('name' in req.body && 'email' in req.body && 'password' in req.body)) {
    throw new CodeError('You must specify the name, email and password', 400);
  }
  const { name, email, password } = req.body;

  if (!validPassword(password)) throw new CodeError('Weak password!', 400);

  const userToRegister = new User(undefined, name, email);

  const services = req.context.services as Services;
  return RegisterUser({
    user: userToRegister,
    password,
    userRepository: services.userRepository,
    encryption: services.encryption,
  });
};

const signInUser = (req: CustomRequest): Promise<string | null> => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Verify credentials of user using email and password and return token'
    #swagger.parameters['obj'] = {
      in: 'body', description:'Email and password',
      schema: {
        $email: 'John.Doe@acme.com', $password: '1m02P@SsF0rt!'
      }
    }
    #swagger.responses[200] = {
      schema: {
        $message: 'User signed in',
        $token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }
    #swagger.responses[400] = {
      schema: { $message: 'You must specify the email and password' }
    }
    #swagger.responses[403] = {
      schema: { $message: 'Wrong email or password' }
    }
   */
  if (!('email' in req.body && 'password' in req.body)) {
    throw new CodeError('You must specify the email and password', 400);
  }
  const { email, password } = req.body;
  const services = req.context.services as Services;
  return SignInUser({
    email,
    password,
    userRepository: services.userRepository,
    encryption: services.encryption,
  });
};

export default { registerUser, signInUser };
