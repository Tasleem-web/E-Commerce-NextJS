import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import useInput from '../hooks/useInput';
import { postData } from '../utils/fetchData';
import { DataContext } from '../store/GlobalState';
import fieldsValidation from '../utils/validation';
import { ACTIONS } from '../store/Actions';
import Cookie from 'js-cookie'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [email, bindEmail] = useInput('user@mail.com');
  const [password, bindPassword] = useInput('123456');

  const { state, dispatch } = React.useContext(DataContext);
  const router = useRouter();
  const { auth } = state;

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/');
  }, [auth])

  const handleLogin = async (e) => {
    e.preventDefault();
    const errorMessage = fieldsValidation({ checkType: 'signin', fields: { email, password } });

    if (errorMessage) return dispatch({ type: ACTIONS.NOTIFY, payload: { error: errorMessage } });
    dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } });

    const res = await postData('auth/signin', { email, password }, state.token);
    if (res.error) return dispatch({ type: ACTIONS.NOTIFY, payload: { error: { message: res.error } } });
    dispatch({ type: ACTIONS.NOTIFY, payload: { success: { message: res.success } } });

    dispatch({
      type: 'AUTH', payload: {
        token: res.access_token,
        user: res.user
      }
    })

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', true)
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
