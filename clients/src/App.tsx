import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

function App() {
  const responseGoogle = (response: any) => {
    axios
      .post('http://localhost:3000/api/v1/eCommerce/users/auth/google', {
        id_token: response.tokenObj.id_token,
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    console.log(response)
  }

  return (
    <div>
      <h2> Login Google</h2>
      <div>
        <GoogleLogin
          clientId="333233688208-as2rcli62b49cg6ofmh49md6fsqiphnb.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    </div>
  )
}

export default App
