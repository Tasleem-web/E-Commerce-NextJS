import Head from 'next/head'
import Link from 'next/link'
import useInput from '../hooks/useInput';
import fieldsValidation, { SUCCESS } from '../utils/validation';
import { DataContext } from '../store/GlobalState';
import { ACTIONS } from '../store/Actions';
import React from 'react';
import { StatusCode } from '../utils/constants';
import { postData } from '../utils/fetchData';

export default function Register() {

  const [username, bindUsername] = useInput('user');
  const [email, bindEmail] = useInput('user@mail.com');
  const [password, bindPassword] = useInput('123456');
  const [cf_password, bindCF_Password] = useInput('123456');

  const { state, dispatch } = React.useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = fieldsValidation(username, email, password, cf_password);

    if (errorMessage) return dispatch({ type: ACTIONS.NOTIFY, payload: { error: { message: errorMessage } } });
    dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } });

    const res = await postData('auth/register', { username, email, password, cf_password }, state.token);
    if (res.error) return dispatch({ type: ACTIONS.NOTIFY, payload: { error: { message: res.error } } });
    console.log(res);
    return dispatch({ type: ACTIONS.NOTIFY, payload: { success: { message: res.message } } });
  }



  return (
    <div>
      <Head>
        <title>Registration Page</title>
      </Head>

      <div className="signin-container m-auto" onSubmit={handleSubmit}>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username"  {...bindUsername} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" {...bindEmail} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" {...bindPassword} />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" {...bindCF_Password} />
          </div>
          <button type="submit" className="btn btn-dark w-100">Register</button>
          <p className='my-2'>Already have an account? &nbsp;
            <Link href='/signin' style={{ color: 'crimson' }}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
