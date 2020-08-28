import React from 'react'

interface Props {
  onCancel: () => void
  onConfirm: () => void
}

const Confirm: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <div>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default Confirm
