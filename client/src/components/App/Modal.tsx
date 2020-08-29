import React from 'react'
import ReactDOM from 'react-dom'

import './Modal/style.css'

const modalRoot = document.getElementById('modal-root')

const Modal: React.FC = ({ children }) => {
  return (
    modalRoot &&
    ReactDOM.createPortal(
      <div className="modal__overlay">
        <div className="modal__window">{children}</div>
      </div>,
      modalRoot
    )
  )
}

export default Modal
