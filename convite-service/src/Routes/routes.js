const { Router } = require('express');
const conviteController = require('../Controller/conviteController')
const routes = Router();

routes.post('/enviar-convite', conviteController.enviarConvite);

module.exports = routes;