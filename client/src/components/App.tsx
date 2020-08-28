import React, { useState } from 'react'

import Modal from './App/Modal'
import StudentsList from './App/StudentsList'

const App: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalChildren, setModalChildren] = useState<JSX.Element | null>(null)

  return (
    <div>
      <StudentsList
        setShowModal={setShowModal}
        setModalChildren={setModalChildren}
      />
      {showModal && <Modal>{modalChildren}</Modal>}
    </div>
  )
}

export default App
