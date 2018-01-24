import React from 'react';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputValue: ''};
  }

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleSubmit = () => {
    console.log(this.props.addTodo(this.state.inputValue));
  }

  render(){
    return(
      <div className="input-field">
        <form>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
            required
          />
          <button onClick={this.handleSubmit} className="input-btn">Add Todo</button>
        </form>
      </div>
    )
  }
}

export default TodoForm;
