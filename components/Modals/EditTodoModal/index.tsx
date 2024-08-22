'use client'

import { EditTodoForm } from '@components/Forms/EditTodoForm'
import { ITodo } from '@models/Todo'
import { Form, Modal, ModalProps } from 'antd'
import { useCallback } from 'react'

export interface EditModalProps<T = unknown> extends Omit<ModalProps, 'onOk' | 'onCancel'> {
  onOk?: () => void
  onCancel?: () => void
  onFinish?: (todo?: T) => void
}

export interface EditTodoModalProps extends EditModalProps<ITodo> {
  todo?: ITodo['_id']
}

export const EditTodoModal: React.FC<EditTodoModalProps> = ({
  todo: todoId,
  onOk,
  onCancel,
  onFinish,
  destroyOnClose = true,
  title,
  okButtonProps,
  cancelText,
  ...props
}) => {
  const [form] = Form.useForm()

  const handleOk = useCallback(() => {
    form.submit()
  }, [form])

  const handleCancel = useCallback(() => {
    form.resetFields()
    onCancel?.()
  }, [form, onCancel])

  const handleFinish = useCallback(
    (todo?: ITodo) => {
      onFinish?.(todo)
      onOk?.()
    },
    [onOk, onFinish]
  )

  return (
    <Modal onOk={handleOk} onCancel={handleCancel} destroyOnClose={destroyOnClose} title="Edit todo modal" {...props}>
      <EditTodoForm form={form} todo={todoId} onFinish={handleFinish} />
    </Modal>
  )
}
