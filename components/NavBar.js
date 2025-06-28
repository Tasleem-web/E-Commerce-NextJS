import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { DataContext } from '../store/GlobalState';



export default function NavBar() {
  const router = useRouter()

  const { state, dispatch } = React.useContext(DataContext);

  const { auth, cart } = state;

  const isActive = (path) => router.pathname === path ? 'active' : '';

  const handleLogout = () => {
    localStorage.removeItem('firstLogin', { path: 'api/auth/accessToken' });
    dispatch({ type: 'AUTH', payload: {} });
    dispatch({ type: 'NOTIFY', payload: { success: { message: 'Logged out successfully!' } } });
    // router.push('/signin');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href="/" className="navbar-brand">
          Online Store
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown" style={{ justifyContent: 'flex-end' }}>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href="/cart" className={"nav-link" + ' ' + isActive('/cart')}>
                <i className="fas fa-shopping-cart mx-2">
                  <span className="badge badge-pill badge-danger">{cart.length}</span>
                </i>
                Cart
              </Link>
            </li>

            {
              Object.keys(auth).length == 0 ?
                <li className="nav-item">
                  <Link href="/signin" className={"nav-link" + ' ' + isActive('/signin')}>
                    <i className="fas fa-user"></i>
                    Sign in
                  </Link>
                </li>
                :
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                    <img src={auth.user.avatar} alt={auth.user.username} className="rounded-circle" style={{ width: '20px', height: '20px' }} />
                    <span className="ml-2">{auth.user.username}</span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <Link className="dropdown-item" href="/profile">Profile</Link>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
                </li>
            }
          </ul>
        </div>
      </nav>
    </div>
  )
}
