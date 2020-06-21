"use strict";

const todoControl = document.querySelector(".todo-control"),
  headerInput = document.querySelector(".header-input"),
  todoList = document.querySelector(".todo-list"),
  todoCompleted = document.querySelector(".todo-completed");

let todoData = [];

const resetData = function() {
  if (localStorage.todoData) {
    todoData = JSON.parse(localStorage.todoData);
  } else {
    todoData = [];
  }
} 
resetData();

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item, i, array) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
                   '<div class="todo-buttons">' + 
                   '<button class="todo-remove"></button>' +
                   '<button class="todo-complete"></button>' +
                   '</div>';
    if (item.completed) {
      todoCompleted.appendChild(li);
    } else {
      todoList.appendChild(li);
    }

    const btnTodoCompleted = li.querySelector('.todo-complete');
    btnTodoCompleted.addEventListener('click', function() {
      item.completed = !item.completed;

      render(); 
    });

    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function() {
      array.splice(i, 1);
      localStorage.setItem('todoData', JSON.stringify(array));
      render(); 
    });

    localStorage.setItem('todoData', JSON.stringify(todoData));
  });
};



todoControl.addEventListener('submit', function(event) {
  event.preventDefault();

  if (headerInput.value.trim()) {
    const newTodo = {
      value: headerInput.value,
      completed: false
    }
    todoData.push(newTodo);
  }

  headerInput.value = '';
  render();

});


render();