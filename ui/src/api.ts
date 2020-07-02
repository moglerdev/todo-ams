import { Todo } from './app/Todo.type';
import { async } from 'rxjs/internal/scheduler/async';

const main_url = new URL('public/api/', window.location.origin);

var oauth_session = null;

const getHeaders = () => {
  let heads = new Headers();
  if (oauth_session != null) {
    heads.append("Authorization", `Bearer ${oauth_session.token}`);
  }
  heads.append("Accept", "application/json");
  heads.append("Content-Type", "application/json");
  return heads;
}

export const API_OAuth = {
  isAuth: async () => {
    if (oauth_session == null) return null;
    let r = await fetch(new URL('oauth/user', main_url).href, { method: 'GET', headers: getHeaders() });
    return r.ok;
  },
  signIn: async (user) => {
    oauth_session = null;
    let r = await API_OAuth.login(user);
    if (r.ok) {
      oauth_session = await r.json();
      return true;
    }
    return false;
  },
  signUp: async (user) => {
    oauth_session = null;
    let r = await API_OAuth.register(user);
    if (r.ok) {
      oauth_session = await r.json();
      return true;
    }
    return false;
  },
  signOut: async () => {
    oauth_session = null;
    let r = await API_OAuth.logout();
    if (r.ok) {
      return true;
    }
    return false;
  },
  login: (user) =>
    fetch(new URL('oauth/login', main_url).href, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(user)
    }),
  register: (user) =>
    fetch(new URL('oauth/register', main_url).href, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(user)
    }),
  logout: () =>
    fetch(new URL('oauth/logout', main_url).href, {
      method: 'GET',
      headers: getHeaders()
    }),
}

export const API_Todos = {
  getAllMainTodos: () =>
    fetch(new URL('todos/', main_url).href, {
      method: 'GET',
      headers: getHeaders()
    }),
  getAllTodosFromMain: (todo_id: number) =>
    fetch(new URL('todos/' + todo_id, main_url).href, {
      method: 'GET',
      headers: getHeaders()
    }),
  getTodo: (id: number) =>
    fetch(new URL('todos/single/' + id, main_url).href, {
      method: 'GET',
      headers: getHeaders()
    }),
  createTodo: (todo: Todo) =>
    fetch(new URL('todos/', main_url).href, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(todo)
    }),
  updateTodo: (id: number, todo: Todo) =>
    fetch(new URL('todos/' + id, main_url).href, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(todo)
    }),
  deleteTodo: (id: number) =>
    fetch(new URL('todos/' + id, main_url).href, {
      method: 'DELETE',
      headers: getHeaders(),
    }),
};
