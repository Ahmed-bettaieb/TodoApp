import { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../authContext';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { username, password });
      login(res.data.token);
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input 
                className="form-control" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <input 
                type="password" 
                className="form-control" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
            <div className="text-center">
              <small>Don't have an account? <Link to="/register">Register</Link></small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
