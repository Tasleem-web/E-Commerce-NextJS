import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import useInput from '../hooks/useInput';

export default function SignIn() {
  const [email, bindEmail] = useInput('');
  const [password, bindPassword] = useInput('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic, such as validating the input
    // and making an API call to authenticate the user.
    console.log('Login attempt with:', { email, password });

    // For demonstration purposes, let's just log the values.
    // In a real application, you would replace this with your authentication logic.
  }

  return (
    <div>
      <Head>
        <title>Sign In Page</title>
      </Head>

      <div className="signin-container m-auto">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" {...bindEmail} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" {...bindPassword} />
          </div>
          <button type="submit" className="btn btn-dark w-100">Login</button>
          <p className='my-2'>You don't have an account? &nbsp;
            <Link href='/register' style={{ color: 'crimson' }}>Register here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
