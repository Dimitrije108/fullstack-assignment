import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
// Login controlled component utilizing global auth context
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

	console.log(error);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userLogin = await login(username, password);
    setUsername("");
    setPassword("");

		console.log(userLogin);

    if (!userLogin.success) {
      setError(userLogin.error);
    } else {
      setError(null);
      navigate("/products");
    };
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="p-4">Login</h1>
      <form 
        className="w-72 flex flex-col"
        onSubmit={handleLogin}
      >
        <div className="mb-2 flex justify-between items-center">
          <label htmlFor="username">Username</label>
          <input 
            className="p-1 pl-2 pr-2"
            type="text" 
            name="username" 
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-2 flex justify-between items-center">
          <label htmlFor="password">Password</label>
          <input 
            className="p-1 pl-2 pr-2"
            type="password" 
            name="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && 
          <ul>
            {error.map((error, index) => {
              return <li key={index} className="text-red-400">{error}</li>;
            })}
          </ul>
        }
        <button 
          className="flex justify-center"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
};
