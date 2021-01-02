// Index das rotas onde todas as rotas são configuradas
import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
