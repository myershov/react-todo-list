'use client'

import { EditFilled } from '@ant-design/icons'
import { EditTodoModal } from '@components/Modals/EditTodoModal'
import { ITodo } from '@models/Todo'
import { Button, ButtonProps } from 'antd'
import { useState } from 'react'

export interface EditTodoButtonProps extends ButtonProps {
  todo?: ITodo['_id']
  onFinish?: (todo?: ITodo) => void
}

export const EditTodoButton: React.FC<EditTodoButtonProps> = ({ todo, icon = <EditFilled />, onClick, onFinish, ...props }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Button
        type="dashed"
        icon={icon}
        onClick={(e) => {
          onClick?.(e)
          setOpen(true)
        }}
        {...props}></Button>

      <EditTodoModal
        open={open}
        todo={todo}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        onFinish={onFinish}
        destroyOnClose
      />
    </>
  )
}
