const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Referencia al modelo donde vamos a autenticar
const Usuarios = require('../models/Usuarios');

// local strategy - Login con credenciales propios (usurio y password)
passport.use(
	new LocalStrategy(
		// por default passport espera usuario y password
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, done) => {
			try {
				const usuario = await Usuarios.findOne({
					where: {
						email,
						activo: 1
					}
				});
				// El usuario existe, pero el password es inconrrecto
				if (!usuario.verificarPassword(password)) {
					return done(null, false, {
						message: 'Datos incorrectos'
					});
				}
				// Email existe y password correcto
				return done(null, usuario);
			} catch (error) {
				// El usuario no existe
				return done(null, false, {
					message: 'El usuario no existe'
				});
			}
		}
	)
);

// serializar el usuario
passport.serializeUser((usuario, callback) => {
	callback(null, usuario);
});

// deserializar el usuario
passport.deserializeUser((usuario, callback) => {
	callback(null, usuario);
});

// exportar
module.exports = passport;
