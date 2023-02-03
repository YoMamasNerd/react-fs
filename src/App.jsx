import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.tradena.me');

function App() {
  const [email, setVar1] = useState('');
  const [password, setVar2] = useState('');

  const handleChange1 = event => {
    setVar1(event.target.value);
  };

  const handleChange2 = event => {
    setVar2(event.target.value);
  };

  async function authMethod(email, password) {
    console.log(email + password)
    const authData = await pb.collection('users').authWithPassword(
      email,
      password,
    );
    if (pb.authStore.isValid) {
      console.log(pb.authStore.isValid);
      console.log(pb.authStore.token);
      console.log(pb.authStore.model.id);
      
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={handleChange1}
              value={email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={handleChange2}
              value={password}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={() => { authMethod(email, password) }}>
              Submit
            </button>
          </div>
          <p></p>
        </div>
      </form>
    </div>
  )
}

export default App
