import React, { useState, useEffect, useContext } from 'react';
import { LogIn } from 'lucide-react';
import { gql, useLazyQuery } from '@apollo/client';
import { AppContext } from '../../context/myContext';
import { useNavigate } from 'react-router-dom'; 

export function Login() {
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {isLogin, setLogin, setUserOf} = useContext(AppContext)
  const navigate = useNavigate();

  const GET_LOGIN = gql`
    query userLogin($id: ID!) {
      getUserById(id: $id) {
        address
        email
        name
        user_id
      }
    }
  `;

  const [loginUser, { data, error, loading }] = useLazyQuery(GET_LOGIN);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      loginUser({ variables: { id: userId } });
    } else {
      setErrorMessage('Please enter a user ID');
    }
  };

  useEffect(() => {
    if (data) {
      if (data.getUserById !== null) {
        setLogin(true);
        setUserOf(data.getUserById)
        navigate('/');
        console.log('Data:', data.getUserById);
      } else {
        setErrorMessage('User Not Found');
      }
    }
  }, [data]);

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign in to your account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId" className="form-label">
              User ID
            </label>
            <input
              id="userId"
              type="text"
              className="form-input"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary auth-btn">
            <LogIn className="auth-btn-icon" />
            Sign in
          </button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{`Error: ${error.message}`}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}
