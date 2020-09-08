import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class SignUp extends React.Component{
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      redirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  async handleSubmit(event){
    event.preventDefault()
    const response = await axios.post('/auth/signup', this.state)
    if (response.status === 200){
      this.setState({redirect: true})
    }
    console.log(response)
  }
  onChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    if(this.state.redirect){
      return <Redirect to='/upload' />
    }
    return(
      <form onSubmit={this.handleSubmit}>
      <div className='flex column'>
        <div className='flex column m1'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' onChange={this.onChange}className='input' />
        </div>
        <div className='flex column m1'>
          <label htmlFor='email'>Password</label>
          <input type='password' name='password' onChange={this.onChange}className='input' />
        </div>
        <div className='m1'>
          <button type='submit' className='btn bg-blue white p1 rounded'>Submit</button>
        </div>
      </div>
    </form>
    )
  }
}