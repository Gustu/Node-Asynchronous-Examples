import { Router } from 'express';
import Todo from '../models/todo';
var router = Router({mergeParams: true});

function getTodos(req, res) {
  Todo.find()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.send(err);
    });
}

function createTodo(req, res) {
  Todo.create({
    text: req.body.text,
    done: false
  }).then((todo) => {
    res.json(todo);
  }).catch((err) => {
    res.send(err);
  });
}

function deleteTodo(req, res) {
  Todo.remove({
    _id: req.params.id
  }).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.send(err);
  });
}

function updateTodo(req, res) {
  Todo.update({
    _id: req.params.id
  }, {
    done: req.body.done
  }).then((affected) => {
    if (!affected)
      return res.send('Todo not found');
    res.send('Todo updated');
  }).catch((err) => {
    res.send(err);
  });
}

router.get('/', getTodos);
router.post('/', createTodo);
router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);

export default router;
