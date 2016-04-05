'use strict';

import { Router } from 'express';
import TodoCtrl from './simple/TodoCtrl';

export default function () {
  var router = Router();

  router.use('/todos', TodoCtrl());

  return router;
}
