import mongoose from 'mongoose';

var TodoSchema = mongoose.Schema({
  text: String,
  done: Boolean
});

var Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
