

const Toast = ({ message, handleShow, bgColor }) => {
  return (
    <div className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: '20px', right: '20px', zIndex: 9, minWidth: '300px' }}>
      <div className={`toast-header ${bgColor} text-light`}>
        <strong className="mr-auto">{message?.title}</strong>
        <button type="button" className="ml-2 mb-1 close text-light" data-dismiss="toast" aria-label="Close"
          onClick={handleShow}>
          <span aria-hidden="true" style={{ outline: 'none' }}>x</span>
        </button>
      </div>
      <div className="toast-body">{message?.message}</div>
    </div>
  );
}

export default Toast;