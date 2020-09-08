import React from 'react'

export default class OauthLogin extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <form method='get' action='/auth/google'>
      <button type='submit' className='btn bg-red white p1 rounded'>Login with Google</button>
    </form>
    )
  }
}