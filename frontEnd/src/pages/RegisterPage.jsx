import { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../authContext';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { username, password });
      login(res.data.token);
    } catch (err) {
      alert('User already exists or error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mt5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h2 className="text-center mb-4">Register</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <input 
              className="form-control mb-3" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
              type="password" 
              className="form-control mb-3" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit" className="btn btn-primary w-100 mb-2">Register</button>
          </div>
        </div>
      </div>
      {/* <h2>Register</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button> */}
    </form>

    
  );
}
