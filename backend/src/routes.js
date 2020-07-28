const express = require('express');
const IncidentController = require('./controllers/IncidentController');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

routes.post('/sessions', SessionController.create);

routes.get('/sum', ProfileController.sum);
routes.get('/fixed', ProfileController.fixed);
routes.get('/variable', ProfileController.variable);

routes.post('/users', UserController.create);
routes.get('/users', UserController.index);

module.exports = routes;