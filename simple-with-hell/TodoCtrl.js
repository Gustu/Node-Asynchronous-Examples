import { Router } from 'express';
import Todo from '../models/todo';
var router = Router({mergeParams: true});

function getTodos(req, res) {
  Todo.find((err, todos) => {
    if (err)
      return res.send(err);
    res.json(todos);
  });
}

function createTodo(req, res) {
  Todo.create({
    text: req.body.text,
    done: false
  }, (err, todo) => {
    if (err)
      return res.send(err);
    res.json(todo);
  });
}

function deleteTodo(req, res) {
  Todo.remove({
    _id: req.params.id
  }, (err) => {
    if (err)
      return res.send(err);
    res.sendStatus(200);
  });
}

function updateTodo(req, res) {
  Todo.update({
    _id: req.params.id
  }, {
    done: req.body.done
  }, (err, affected) => {
    if (err)
      return res.send(err);
    if (!affected)
      return res.send('Todo not found');
    res.send('Todo updated');
  });
}

router.get('/', getTodos);
router.post('/', createTodo);
router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);

export default router;
