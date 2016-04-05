import { Router } from 'express';
import Todo from '../models/todo';
import async from 'async';
var router = Router({mergeParams: true});

function getTodos(req, res) {
  async.waterfall([
    (onFound) => {
      Todo.find(onFound);
    }], (err, todos) => {
    err ? res.send(err) : res.json(todos);
  });
}

function getTodo(req, res) {
  async.waterfall([
    (onFound) => {
      Todo.findOne({_id: req.params.id}, onFound);
    }], (err, todo) => {
    err ? res.send(err) : res.json(todo);
  });
}

function createTodo(req, res) {
  async.waterfall([
    (onCreate) => {
      Todo.create({
        text: req.body.text,
        done: false
      }, onCreate);
    }
  ], (err, todo) => {
    err ? res.send(err) : res.json(todo);
  });
}

function deleteTodo(req, res) {
  async.waterfall([
    (onRemove) => {
      Todo.remove({
        _id: req.params.id
      }, onRemove);
    }
  ], (err) => {
    err ? res.send(err) : res.sendStatus(200);
  });

}

function updateTodo(req, res) {
  async.waterfall([
    (onUpdate) => {
      Todo.update({
        _id: req.params.id
      }, {
        done: req.body.done
      }, onUpdate);
    }
  ], (err, affected) => {
    if (err)
      return res.send(err);
    if (!affected)
      return res.send('Todo not found');
    res.send('Todo updated');
  });
}

router.get('/', getTodos);
router.get('/:id', getTodo);
router.post('/', createTodo);
router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);

export default router;
