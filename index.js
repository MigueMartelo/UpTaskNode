const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

// importando variables
require('dotenv').config({ path: 'variables.env' });

// importando helpers con algunas funciones
const helpers = require('./helpers');

// crear la conexión a la DB
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
	.then(() => console.log('Conectado al Servidor'))
	.catch(err => console.log(err));

// crear una aplicación de express
const app = express();

// donde cargar archivos estaticos
app.use(express.static('public'));

// habilitar bodyParser para leer datos de formularios
app.use(bodyParser.urlencoded({ extends: true }));

// agregamos express validator a toda la aplicación
app.use(expressValidator());

// habilitar pug
app.set('view engine', 'pug');

// añadir carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// agregar flash messages
app.use(flash());

app.use(cookieParser());

// sessiones nos permiten navegar entre distintas paginas sin volver autenticarnos
app.use(
	session({
		secret: 'supersecreto',
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());

// habilitando vardump en la aplicación
app.use((req, res, next) => {
	res.locals.vardump = helpers.vardump;
	res.locals.mensajes = req.flash();
	res.locals.usuario = { ...req.user } || null;
	next();
});

// rutas
app.use('/', routes());

// Servidor y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
	console.log('El servidor está funcionando correctamente');
});
