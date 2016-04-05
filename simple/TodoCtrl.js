import { Router } from 'express';

export default function () {
  var router = Router();

  router.get('/', function (req, res, next) {
    res.json('OK');
    next();
  });

  return router;
}
