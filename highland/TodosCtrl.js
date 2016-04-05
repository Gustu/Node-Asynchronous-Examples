import { Router } from 'express';
import Todo from '../models/todo';
import _ from 'highland';
var router = Router({mergeParams: true});

function getTodos(req, res) {
  _.wrapCallback(Todo.find.bind(Todo))()
    .errors((err) => {
      res.send(err);
    })
    .apply((todos) => {
      res.json(todos);
    });
}

function createTodo(req, res) {
  _.wrapCallback(Todo.create.bind(Todo))({
      text: req.body.text,
      done: false
    })
    .errors((err) => {
      res.send(err);
    })
    .apply((todo) => {
      res.json(todo);
    });
}

function deleteTodo(req, res) {
  _.wrapCallback(Todo.remove.bind(Todo))({
      _id: req.params.id
    })
    .errors((err) => {
      res.send(err);
    })
    .apply(() => {
      res.sendStatus(200);
    });
}

function updateTodo(req, res) {
  _.wrapCallback(Todo.update.bind(Todo))({
      _id: req.params.id
    }, {
      done: req.body.done
    })
    .errors((err) => {
      res.send(err);
    })
    .apply((affected) => {
      affected ? res.send('Todo updated') : res.send('Todo not found');
    });
}

router.get('/', getTodos);
router.post('/', createTodo);
router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);

export default router;
