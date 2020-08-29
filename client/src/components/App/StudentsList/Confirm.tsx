import React from 'react'

import './Confirm/style.css'

interface Props {
  onCancel: () => void
  onConfirm: () => void
}

const Confirm: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirm">
      <span>Are you sure?</span>
      <div className="confirm__footer">
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default Confirm
