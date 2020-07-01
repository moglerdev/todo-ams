const main_url = new URL('http://localhost:8000/api/');

export const API_Todos = {
  getAllTodos: () =>
    fetch(new URL('todos/', main_url).href, {
      method: 'GET',
    }),
  getTodo: (id) =>
    fetch(new URL('todos/'+id, main_url).href, {
      method: 'GET',
    }),
  createTodo: (todo) =>
    fetch(new URL('todos/', main_url).href, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    }),
  updateTodo: (id, todo) =>
    fetch(new URL('todos/'+id, main_url).href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(todo)
    }),
  deleteTodo: (id) =>
    fetch(new URL('todos/'+id, main_url).href, {
      method: 'DELETE',
    }),
};
