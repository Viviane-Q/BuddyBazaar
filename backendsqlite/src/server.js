/* Pour info, ce point de départ est une adaptation de celui qui vous obtiendriez
en faisant npm create backend
issu du dépôt
<https://github.com/ChoqueCastroLD/create-backend/tree/master/src/template/js>
*/
import servicesBuilder from './adapters/config/services';

// Load Enviroment Variables to process.env (if not present take variables defined in .env file)
require('dotenv').config();
const { PORT } = process.env;

// Instantiate an Express Application
const app = require('./adapters/driving/app.js');

// Instantiate Socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });
const initListeners = require('./adapters/driving/listeners');
const services = servicesBuilder();
initListeners(io, services);

// Open Server on selected Port
server.listen(PORT, () => console.info('Server listening on port ', PORT));
