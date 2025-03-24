import { ModalContext } from 'components/layouts/modal/modalProvider'
import { useCallback, useContext, useMemo, useState } from 'react'
import { uniqueString } from '@crew/utils'

export type UseModal = () => [
  isOpen: boolean,
  openModal: () => void,
  closeModal: () => void
]

export const useModal: UseModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // ユニークキー生成
  const modalKey = useMemo(() => uniqueString(), [])

  const { register, unregister } = useContext(ModalContext)
  const openModal = useCallback(() => {
    setIsOpen(true)
    register(modalKey)
  }, [register, modalKey])
  const closeModal = useCallback(() => {
    setIsOpen(false)
    unregister(modalKey)
  }, [unregister, modalKey])

  return [isOpen, openModal, closeModal]
}
