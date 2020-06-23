'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'), //строка ввода
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'), // выполненные дела
    todoRemove = document.querySelector('.todo-remove'); //кнопка удаления
    
let todoData = [];

const parseJSON = function(){
    let storageJSON = localStorage.getItem('json');
    if(storageJSON === null){
        return;
    } else {
        todoData = JSON.parse(storageJSON);
    }
};
parseJSON();

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item, index){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
        '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' + 
            '<button class="todo-complete"></button>' +
        '</div>';

        if(item.completed){
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

    const btnTodoCompleted = li.querySelector('.todo-complete');
    const btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoCompleted.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });
        btnTodoRemove.addEventListener('click', function(){
            todoData.splice(index, 1);
            render();
        });
    });
        
    let json = JSON.stringify(todoData);
    localStorage.setItem('json', json);
};


todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if(headerInput.value !== ''){
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
        todoData.push(newTodo);
        headerInput.value = '';
        render();
    }    
});

render();

//if(!.value) return; //нужно подставить переменную, пустая строка не будет записываться
//if(todoData.lenght === 0) todo.innerHTML = ''; // вывод пустой строки если нет ничего в записях
//значение.value = ''; //после записи в список дел строка становится пустой