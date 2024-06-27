import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import  { publicRequest } from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Register() {
    const {updateUser} = useContext(AuthContext);
    const [error,setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const username = formData.get('username');
        const email = formData.get('email');

        const password = formData.get('password');

        try{
            const res = await publicRequest.post('/auth/register',{
                username,email,password
            })
            updateUser(res.data);
            navigate('/')
            setError(error.response.data.message);
        }catch(err){
          console.log(err);
        }
        
    }
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit} >
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button >Register</button>
          {error && <span>{error}</span> }
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;