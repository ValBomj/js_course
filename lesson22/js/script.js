'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
  }

  addToStorage() {
    localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem.bind(this));
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-edit"></button>
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
    `);
    if (todo.completed) {
      this.todoCompleted.appendChild(li);
    } else {
      this.todoList.appendChild(li);
    }
    this.animation(li, true);
  }

  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey()
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
      this.input.value = '';
    } else {
      alert('Добавить пустое дело - нельзя!');
    }
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem(target) {
    const itemKey = target.closest('li');
    this.todoData.forEach((item, i) => {
      if (item.key === itemKey.key) {
        this.animation(itemKey, false);
        this.todoData.delete(i);
      }
    });
  }

  animation(item, show) {
    if (show) {
      item.style.transition = 'all 1s';
      item.style.opacity = 0;
      setTimeout(() => {
        item.style.opacity = 1;
      }, 0);
    } else if (!show) {
      item.style.transition = 'all 1s';
      item.style.opacity = 1;
      setTimeout(() => {
        item.style.opacity = 0;
      }, 0);
      setTimeout(() => {
        this.render();
      }, 1000);
    }
  }

  completeItem(target) {
    const itemKey = target.closest('li');
    this.todoData.forEach(item => {
      if (item.key === itemKey.key) {
        this.animation(itemKey, false);
        item.completed = !item.completed;
      }
    });
  }

  editItem(target) {
    const itemKey = target.closest('li');
    this.todoData.forEach(item => {
      if (item.key === itemKey.key) {
        itemKey.contentEditable = true;
        itemKey.addEventListener('blur', () => {
          item.value = itemKey.children[0].textContent.trim();
          this.render();
        });
      }
    });
  }

  handler() {
    const todoContainer = document.querySelector('.todo-container');
    todoContainer.addEventListener('click', e => {
      const target = e.target;
      if (target.classList.contains('todo-complete')) {
        this.completeItem(target);
      } else if (target.classList.contains('todo-remove')) {
        this.deleteItem(target);
      } else if (target.classList.contains('todo-edit')) {
        this.editItem(target);
      }
    });
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
    this.handler();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
