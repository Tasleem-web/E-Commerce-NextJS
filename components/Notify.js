import React from 'react';
import { DataContext } from '../store/GlobalState';
import Loading from './Loading';
import Toast from './Toast';
// import Toast from 'react-bootstrap/Toast';

export default function Notify() {
  const { state, dispatch } = React.useContext(DataContext);
  const { notify } = state;

  console.log('Notify component', notify);

  return (
    <>
      {notify && notify.loading && <Loading />}
      {notify && notify.success &&
        <Toast
          bgColor="bg-success"
          message={{ message: notify.success.message, title: 'Success' }}
          handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
        />}

      {notify && notify.error &&
        <Toast
          bgColor="bg-danger"
          message={{ message: notify.error.message, title: 'Error' }}
          handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
        />}
    </>
  )
}
