import { Todo } from './app/Todo.type';

const main_url = new URL('http://localhost:8000/api/');

export const API_Todos = {
  getAllMainTodos: () =>
    fetch(new URL('todos/', main_url).href, {
      method: 'GET',
    }),
    getAllTodosFromMain: (todo_id: number) =>
      fetch(new URL('todos/'+todo_id, main_url).href, {
        method: 'GET',
      }),
  getTodo: (id:number) =>
    fetch(new URL('todos/single/'+id, main_url).href, {
      method: 'GET',
    }),
  createTodo: (todo:Todo) =>
    fetch(new URL('todos/', main_url).href, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    }),
  updateTodo: (id:number, todo:Todo) =>
    fetch(new URL('todos/'+id, main_url).href, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    }),
  deleteTodo: (id:number) =>
    fetch(new URL('todos/'+id, main_url).href, {
      method: 'DELETE',
    }),
};
