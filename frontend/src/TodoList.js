import React from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import './App.css';
const APIURL = '/api/todos/';

class TodoList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todos: []
    }
    // this.toggleTodo = this.toggleTodo.bind(this);
  }

  loadTodos = () => {
    fetch(APIURL)
      .then(res => {
        if(!res.ok) {
          if(res.status >= 400 && res.status < 500){
            return res.json().then(data => {
              let err = {errorMessage: data.message};
              throw err;
            })
          } else {
            let err = {errorMessage: "Server not responding, try again later."};
            throw err;
          }
        }
        return res.json();
      })
      .then(todos => this.setState({todos}))
  }

  componentWillMount(){
    this.loadTodos();
  }

  deleteTodo(id) {
    const deleteURL = APIURL + id;

    fetch(deleteURL, {
      method: 'DELETE',
    })
      .then(res => {
        if(!res.ok) {
          if(res.status >= 400 && res.status < 500){
            return res.json().then(data => {
              let err = {errorMessage: data.message};
              throw err;
            })
          } else {
            let err = {errorMessage: "Server not responding, try again later."};
            throw err;
          }
        }
        return res.json();
      })
      .then(()=> {
        const todos = this.state.todos.filter(todo => todo._id !== id)
        this.setState({todos: todos})
      });
  }

  addTodo = (value) => {
    fetch(APIURL, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({name: value})
    })
      .then(res => {
        if(!res.ok) {
          if(res.status >= 400 && res.status < 500){
            return res.json().then(data => {
              let err = {errorMessage: data.message};
              throw err;
            })
          } else {
            let err = {errorMessage: "Server not responding, try again later."};
            throw err;
          }
        }
        return res.json();
      })
      .then(newTodo => {
        this.setState({todos: [...this.state.todos, newTodo]})
      });
  }

  toggleTodo(todo) {
    const updateURL = APIURL + todo._id;

    fetch(updateURL, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({completed: !todo.completed})
    })
      .then(res => {
        if(!res.ok) {
          if(res.status >= 400 && res.status < 500){
            return res.json().then(data => {
              let err = {errorMessage: data.message};
              throw err;
            })
          } else {
            let err = {errorMessage: "Server not responding, try again later."};
            throw err;
          }
        }
        return res.json();
      })
      .then((updatedTodo)=> {
        const todos = this.state.todos.map(todo =>
          (todo._id === updatedTodo._id)
          ? {...todo, completed: !todo.completed}
          : todo
        )
        this.setState({todos: todos})
      });
  }

  render(){
    const todos = this.state.todos.map(t => (
      <Todo
        key={t._id}
        {...t}
        onDelete={this.deleteTodo.bind(this, t._id)}
        onToggle={this.toggleTodo.bind(this, t)}
      />
    ));

    return (
      <div>
        <div className="app-wrapper">
          <h1 className="page-header">Todo List</h1>
          <TodoForm addTodo={this.addTodo} />
          {todos}
        </div>
        <div class="credits">Exercise in React/Node | <a href="https://vikariusu.github.io/" target="_blank">Vikariusu</a></div>
      </div>
    )
  }
}

export default TodoList;
