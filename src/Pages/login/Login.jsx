import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import  { publicRequest } from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
    const [error,setError] = useState('');

    const navigate = useNavigate();

    const {updateUser} = useContext(AuthContext);

    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');
        try{
            const res = await publicRequest.post('/auth/login',{username,password});
            // console.log("userData:"+res.data.accessToken);
            updateUser(res.data);
            navigate('/');
        }catch(err){
            setError(err.response.data.message);
        }
    }

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button>Login</button>
          {error && <span>{error}</span> }
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;