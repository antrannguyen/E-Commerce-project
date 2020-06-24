import React from 'react'
import './App.css'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

function App() {
  const onSuccess = (response: any) => {
    axios
      .post('http://localhost:3000/api/v1/eCommerce/users/auth/google', {
        id_token: response.tokenObj.id_token,
      })
      .then(function (response) {
        console.log('success', response)
      })
      .catch(function (error) {
        console.log(error)
      })
    console.log('success2', response)
  }

  const onFailure = (error: any) => {
    console.log(error)
  }

  const getProducts = async (id_token: any) => {
    const res = await axios.get(
      'http://localhost:3000/api/v1/eCommerce/products',
      {
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW4gVHJhbiIsImVtYWlsIjoiYW4udHJhbkBpbnRlZ3JpZnkuaW8iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTkyOTQ1NDEyLCJleHAiOjE5NTI5NDU0MTJ9.bG5rePEQ8olaEDaxfMwcPhpD8sAa9aBApm2ng0rc7DY`,
        },
      }
    )
  }

  return (
    <div>
      <h2> Login Google</h2>
      <div>
        <GoogleLogin
          clientId="333233688208-as2rcli62b49cg6ofmh49md6fsqiphnb.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </div>
      <div>
        <button onClick={getProducts}>Get Products</button>
      </div>
    </div>
  )
}

export default App
