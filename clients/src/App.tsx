import React from 'react'
import logo from './logo.svg'
import './App.css'
import GoogleLogin from 'react-google-login'

const responseGoogle = (response: any) => {
  console.log(response)
}
function App() {
  return (
    <GoogleLogin
      clientId="333233688208-as2rcli62b49cg6ofmh49md6fsqiphnb.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    />
  )
}

export default App
