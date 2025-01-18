import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, LogOut } from 'lucide-react';
import { AppContext } from '../../context/myContext';
import './index.css';

export function Navbar() {
  const {isLogin, setLogin, user} = useContext(AppContext)

//   console.log("active user", user)

  const handleLogout = () => {
    setLogin(false);
  };
  //console.log("from navbar ", isLogin)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          V-Shop
        </Link>
        <div className="navbar-nav">
          {isLogin ? (
            <>
              <Link to="/cart" className="nav-link">
                <ShoppingCart />
              </Link>
              <div className="user-info">
                <UserIcon />
                <span>{user.name}</span>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}