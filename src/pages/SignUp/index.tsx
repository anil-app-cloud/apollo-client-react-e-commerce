import React, { useState, useContext, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import { gql, useMutation  } from '@apollo/client';
import { AppContext } from '../../context/myContext';
import { useNavigate } from 'react-router-dom'; 
import './index.css';

export function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const {isLogin, setLogin, setUserOf} = useContext(AppContext)
   const navigate = useNavigate();
  const CREATE_USER = gql`
    mutation CreateUser($userInput: inputUser!) {
        createUser(userInput: $userInput) {
        address
        email
        name
        user_id
        }
    }
    `;

  const [signUpnUser, { data, error, loading }] = useMutation(CREATE_USER);
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log("user data for signup ", formData)
    if (formData.name === ""){
        setErrorMessage("Please Enter name")
        return
    }
    if (formData.email === ""){
        setErrorMessage("Please Enter Email")
        return
    }
    if (formData.address === ""){
        setErrorMessage("Please Enter Address")
        return
    }

    try {
        const response = await signUpnUser({
          variables: { userInput: formData },
        });
        //console.log('User created:', response.data.createUser);

        setLogin(true);
        localStorage.setItem("user", JSON.stringify(response.data.createUser))
        setUserOf(response.data.createUser)
        navigate('/');

      } catch (err) {
        console.error('Error creating user:', err);
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
useEffect(() => {
    if (isLogin) {
    navigate('/');
    }
}, [isLogin, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create your account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="form-input"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary auth-btn">
            <UserPlus className="auth-btn-icon" />
            Sign up
          </button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{`Error: ${error.message}`}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}