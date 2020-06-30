const main_url = new URL('http://localhost:8000/api/');

export const API_Todos = {
  getAllTodos: () =>
    fetch(new URL('todos/', main_url).href, {
      method: 'GET',
    }),
  getTodo: (id) =>
    fetch(new URL('todos/', main_url).href, {
      method: 'GET',
    }),
  createTodo: (todo) =>
    fetch(new URL('todos/', main_url).href, {
      method: 'POST',
    }),
  updateTodo: (id, todo) =>
    fetch(new URL('todos/', main_url).href, {
      method: 'PUT',
    }),
  deleteTodo: (id) =>
    fetch(new URL('todos/', main_url).href, {
      method: 'DELETE',
    }),
};
