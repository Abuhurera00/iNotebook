import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setcredentials] = useState({name: "",email: "", password: "", cpassword: ""});
    let navigate = useNavigate();
    const host = process.env.REACT_APP_HOST;

    const handleSubmit = async (e) => {
        e.preventDefault();
          const {name, email, password} = credentials;
          const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
      body: JSON.stringify({name, email, password}),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save the authtoken and redirect
            localStorage.setItem("token", json.authtoken);
            navigate("/");
            props.showAlert("Account Created Successfully", "success");
        }
        else{
          props.showAlert("invalid details", "danger");
        }
        
    }


    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
  return (
    <div className="container mt-2">
        <h2 className="my-2">Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Setup Your Password for INotebook</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Create Account</button>
</form>
    </div>
  )
}

export default Signup
