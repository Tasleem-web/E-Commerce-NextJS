import React from 'react'
import { DataContext } from '../store/GlobalState'
import { ACTIONS, deleteItem } from '../store/Actions';

export default function Modal() {

  const { state, dispatch } = React.useContext(DataContext);

  const { modal } = state;

  const handleSubmit = () => {
    dispatch(deleteItem(modal.data, modal.id, ACTIONS.ADD_CART));
    dispatch({ type: ACTIONS.ADD_MODAL, payload: {} });
  }

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modal.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Do you want to delete this item?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleSubmit}>Yes</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
  )
}
