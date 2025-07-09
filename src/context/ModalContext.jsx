import React, { createContext, useCallback, useContext, useState } from 'react'

import ModalRenderer from './Modalrenderer'

const ModalContext = createContext()

export const useModal = () => useContext(ModalContext)

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({ name: null, props: {} })
  const [onCloseCallback, setOnCloseCallback] = useState(null)

  const openModal = useCallback((name, props = {}, onClose = null) => {
    setModalState({ name, props })
    setOnCloseCallback(() => onClose)
  }, [])

  const closeModal = useCallback(() => {
    setModalState({ name: null, props: {} })
    if (onCloseCallback) {
      onCloseCallback()
      setOnCloseCallback(null)
    }
  }, [onCloseCallback])

  return (
    <ModalContext.Provider value={{ ...modalState, openModal, closeModal }}>
      {children}
      <ModalRenderer name={modalState.name} props={modalState.props} />
    </ModalContext.Provider>
  )
}
