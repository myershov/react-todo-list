'use client'

import { useAddTodoMutation, useEditTodoMutation, useGetTodoQuery } from '@api/todo'
import { ITodo } from '@modules/models/Todo'
import { Form, FormProps, Input, Spin } from 'antd'
import { useCallback, useEffect } from 'react'

export interface EditFormProps<T>
  extends Omit<FormProps, 'children' | 'layout' | 'onFinish' | 'onFinishFailed' | 'initialValues' | 'requiredMark'> {
  onFinishFailed?: (error: any) => void
  onFinish?: (item?: T) => void
}

export interface EditTodoFormProps extends EditFormProps<ITodo> {
  todo?: ITodo['_id']
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({ form: _form, onFinish, onFinishFailed, todo: todoId, ...props }) => {
  const [form] = Form.useForm(_form)

  const { data: todo, isLoading: isTodoLoading } = useGetTodoQuery(todoId, { skip: !todoId })
  const [editTodo] = useEditTodoMutation()
  const [addTodo] = useAddTodoMutation()

  const handleFinish = useCallback(
    async (fields: Omit<ITodo, '_id'>) => {
      try {
        const response = todo ? await editTodo({ ...todo, ...fields }) : await addTodo(fields)

        if ('data' in response) {
          onFinish?.(response.data)
        } else if ('error' in response) {
          onFinishFailed?.(response.error)
        } else {
          onFinishFailed?.('unexpected result')
        }
      } catch (error: any) {
        onFinishFailed?.(error)
      }
    },
    [onFinish, onFinishFailed, editTodo, addTodo, todo]
  )

  useEffect(() => {
    if (todo) {
      form.setFieldsValue(todo)
    } else {
      form.resetFields()
    }
  }, [form, todo])

  return (
    <Spin spinning={isTodoLoading}>
      <Form onFinish={handleFinish} form={form} layout="vertical" {...props}>
        <Form.Item label="Title" name="title">
          <Input placeholder="Title..." />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Description..." />
        </Form.Item>
      </Form>
    </Spin>
  )
}
