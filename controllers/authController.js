const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/iniciar-sesion',
	failureFlash: true,
	badRequestMessage: 'Ambos campos son obligatorios'
});

// Función para revisar si usuario esta logueado o no
exports.usuarioAutenticado = (req, res, next) => {
	// Si el usuario esta autenticado, adelante
	if (req.isAuthenticated()) {
		return next();
	}
	// Si no esta autenticado, redireccionar al formulario
	return res.redirect('/iniciar-sesion');
};

// Función para cerrar sesión
exports.cerrarSesion = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/iniciar-sesion');
	});
};
