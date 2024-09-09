const { Router } = require('express');

const listadesejosController = require('../Controllers/listaDesejoController');

const routes = Router();


routes.post('/listadedesejos', listadesejosController.create);
routes.post('/listadedesejos/addItem', listadesejosController.addItemNaListaDeDesejos);
routes.get('/listadedesejos', listadesejosController.getAll);
routes.get('/listadedesejos/:id', listadesejosController.getById);
routes.get('/listadedesejos/byParticipante/:idParticipante', listadesejosController.getListasByParticipanteId);
routes.put('/listadedesejos', listadesejosController.edit);
routes.put('/listadedesejos/editaListaPorId/:id', listadesejosController.edit);
routes.delete('/listadedesejos/:id', listadesejosController.delete);
routes.delete('/listadedesejos/:id/dellItem/:idParticipante', listadesejosController.delete);

module.exports = routes;