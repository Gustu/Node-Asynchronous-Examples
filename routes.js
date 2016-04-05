'use strict';
import { Router } from 'express';
import TodoCtrl from './simple-with-hell/TodoCtrl';
var router = Router();

router.use('/hell/todos', TodoCtrl);

export default router;
