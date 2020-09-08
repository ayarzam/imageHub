import React from 'react'
import LocalLogin from './LocalLogin'
import OauthLogin from './OauthLogin'
import { Link } from 'react-router-dom'

export default class Login extends React.Component{

  render(){
    return(
      <div>
        <LocalLogin />
        <OauthLogin />
        <Link to='/signup'>Not yet a memeber Signup here!</Link>

      </div>
    )
  }
}