import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { DataContext } from '../../store/GlobalState';
import useInput from '../../hooks/useInput';
import validation from '../../utils/validation';
import { ACTIONS } from '../../store/Actions';
import { patchData } from '../../utils/fetchData';
import { useRouter } from 'next/router'
import { imageUpload } from '../../utils/imageUpload';

export default function Profile() {
  const { state, dispatch } = React.useContext(DataContext);
  const { auth, notify } = state;
  const router = useRouter();

  const [username, bindUsername] = useInput('');
  const [email, bindEmail] = useInput(auth?.user?.email);
  const [password, bindPassword] = useInput("");
  const [avatar, setAvatar] = useState(null);
  const [cf_password, bindCF_password] = useInput("");

  useEffect(() => {
    if (!auth.user) router.push('/signin', undefined, { scroll: false })
  }, [])

  const handleUpdate = e => {
    e.preventDefault();
    const errMessage = validation({ fields: { username, email: auth.user.email, password, cf_password }, checkType: 'profile' });
    if (errMessage) return dispatch({ type: ACTIONS.NOTIFY, payload: { error: { message: errMessage.message } } })
    updatePassword()

    if (!username !== auth.user.username || avatar) updateInfo();
  }

  const updateInfo = async (e) => {
    dispatch({ tyep: ACTIONS.NOTIFY, payload: { loading: true } });

    let media;
    if (avatar) media = await imageUpload([avatar]);
    patchData('user', {
      username, avatar: avatar ? media[0].url : auth.user.avatar
    }, auth.token)
      .then(res => {
        if (res.error) return dispatch({ type: ACTIONS.NOTIFY, payload: { error: { message: res.error } } });

        dispatch({
          type: ACTIONS.AUTH, payload: {
            token: auth.token,
            user: res.user
          }
        })
        console.log(res);

        return dispatch({ type: ACTIONS.NOTIFY, payload: { success: { message: res.message } } })
      })
  }

  const updatePassword = () => {
    dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } });
    patchData('/user/resetPassword', { password }, auth.token)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  const handleAvatar = e => {
    const file = e.target.files[0];
    if (!file) return dispatch({ type: ACTIONS.NOTIFY, payload: { error: { message: 'File does not exists.' } } })

    if (file.size > (1024 * 1024))
      return dispatch({ type: ACTIONS.NOTIFY, payload: { error: { message: 'File size only allowed 1mb.' } } });

    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
      return dispatch({ type: ACTIONS.NOTIFY, payload: { error: { message: 'Image format is incorrect' } } });

    setAvatar(file)
  }

  return (
    <div className='profile_page'>
      <Head>
        <title>Profile Page</title>
      </Head>

      <section>
        <div className='row text-secondary'>
          <div className='col-md-4'>
            <h3>{auth?.user?.role == 'user' ? 'User Profile' : 'Admin profile'}</h3>
            <div className='avatar' style={{ boxShadow: "1px 2px 7px " + (avatar ? 'green' : 'red') }}>
              <img src={avatar ? URL.createObjectURL(avatar) : auth?.user?.avatar} title='avatar' width={150} height={150} />
              <span className='change-profile'>
                <i className='fas fa-camera'></i>
                <p>change</p>
                <input type='file' name='file' id='file_up' onChange={handleAvatar}
                  accept='image/*' />
              </span>
            </div>
            <div>

              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' name='username' {...bindUsername} placeholder='Your username' className='form-control' />
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' name='email' {...bindEmail} placeholder='Your Email'
                  className='form-control' disabled={true} />
              </div>

              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' {...bindPassword} placeholder='Your password'
                  className='form-control' />
              </div>

              <div className='form-group'>
                <label htmlFor='cf_password'>Confirm Password</label>
                <input type='password' id='cf_password' name='cf_password' {...bindCF_password} placeholder='Confirm Password'
                  className='form-control' />
              </div>

              <button className='btn btn-info w-100' disabled={notify?.loading}
                onClick={handleUpdate}>
                Update
              </button>

            </div>
          </div>
          <div className='col-md-8'>
            <h3>Orders</h3>
          </div>
        </div>
      </section >
    </div >
  )
}
