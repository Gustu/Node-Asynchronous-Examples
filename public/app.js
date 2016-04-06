var scotchTodo = angular.module('todo-todo-todo', ['ngCookies']);

function mainController($scope, $http, $cookies) {
  $scope.cookies = $cookies;

  $scope.formData = {};
  $scope.method = $scope.cookies.method || 'hell';
  $scope.cookies.method = $scope.method;
  $scope.options = ['hell', 'promises', 'async', 'highland'];

  $scope.$watch('method', function (method) {
    $scope.cookies.method = method;
  });

  function getTodos() {
    $http.get('/api/' + $scope.method + '/todos')
      .success(function (data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  }

  $scope.createTodo = function () {
    $http.post('/api/' + $scope.method + '/todos', $scope.formData)
      .success(function (todo) {
        $scope.formData = {};
        $scope.todos.push(todo);
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };

  $scope.deleteTodo = function (todo) {
    $http.delete('/api/' + $scope.method + '/todos/' + todo._id)
      .success(function () {
        var index = $scope.todos.indexOf(todo);
        $scope.todos.splice(index, 1);
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };

  $scope.updateTodo = function (done, todo) {
    todo.done = done;
    console.log(todo);
    $http({
      method: 'PUT',
      url: '/api/' + $scope.method + '/todos/' + todo._id,
      data: {done: done}
    }).success(function () {
        var index = $scope.todos.indexOf(todo);
        $scope.todos[index].done = done;
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };

  getTodos();
}
