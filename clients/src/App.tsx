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

  const getProducts = async () => {
    const res = await axios.get(
      'http://localhost:3000/api/v1/eCommerce/products',
      {
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW4gVHJhbiIsImVtYWlsIjoiYW4udHJhbkBpbnRlZ3JpZnkuaW8iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTkyODM4NTg4LCJleHAiOjE1OTI4NDIxODh9.70zhNZZA6uacBkmcHC870na5fKHB-aUy0XiFwtV727c`,
        },
      }
    )
    console.log(res)
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
      <div>
        <button onClick={getProducts}>Get Products</button>
      </div>
    </div>
  )
}

export default App
