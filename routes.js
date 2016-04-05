'use strict';
import { Router } from 'express';
import TodosHellCtrl from './simple-with-hell/TodosCtrl';
import TodosPromisesCtrl from './promises/TodosCtrl';
import TodosAsyncCtrl from './async/TodosCtrl';
var router = Router();

router.use('/hell/todos', TodosHellCtrl);
router.use('/promises/todos', TodosPromisesCtrl);
router.use('/async/todos', TodosAsyncCtrl);

export default router;
