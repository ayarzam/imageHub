import React from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component{
  constructor(){
    super()
    this.state = {
      file: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.resetForm = this.resetForm.bind(this)
  }
  async handleSubmit(event) {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append('photo', this.state.file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
    const response = await axios.post('/api/add', data, config)
    alert("You've successfully uploade your file")
    this.resetForm()
    } catch (error) {
      console.log('Error in the React component')
    }
  }
  resetForm(){
    this.setState({file: null})
  }

  onChange(event){
    this.setState({file: event.target.files[0]})
  }

  render(){
    console.log(this.state)
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='file'>File</label>
            <input type='file' name="photo" onChange={this.onChange}/>
          </div>
          <button>Submit</button>
        </form>
      </div>
    )
  }

};
