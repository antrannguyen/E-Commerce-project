import React, { useState, useEffect } from 'react'
import './App.css'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

const useFetch = (url: string) => {
  const [data, setData] = useState([])
  const [error, setError] = useState([])

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/eCommerce/${url}`)
        const json = await res.json()
        setData(json)
      }
      console.log('Called')
      fetchData()
    } catch (e) {
      return setError(e)
    }
  }, [])
  return [error, data]
}

function App() {
  const url = 'products'
  const something = useFetch(url)

  const onSuccess = (response: any) => {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/eCommerce/users/auth/google',
      data: { id_token: response.tokenObj.id_token },
      headers: {
        authorization: `Bearer ${response.tokenObj.id_token}`,
      },
    })
      .then(function (response) {
        console.log('success', response)
        console.log('something', something)
      })
      .catch(function (error) {
        console.log(error)
      })
    console.log('success2', response)
  }

  const onFailure = (error: any) => {
    console.log(error)
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
      <div>{/* <button onClick={handle}>Get Products</button> */}</div>
    </div>
  )
}

export default App
