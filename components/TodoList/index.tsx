'use client'

import { CheckCircleFilled, ClockCircleFilled, DeleteFilled } from '@ant-design/icons'
import { useDeleteTodoMutation, useEditTodoMutation, useGetTodosQuery } from '@api/todo'
import { EditTodoButton } from '@components/UI/Buttons/EditTodoButton'
import { ITodo } from '@models/Todo'
import { Button, List, ListProps, message, Space } from 'antd'
import { useCallback, useEffect } from 'react'

export interface TodoListProps extends Omit<ListProps<ITodo>, 'dataSource'> {}

export const TodoList: React.FC<TodoListProps> = ({ ...props }) => {
  const { data: todos, isFetching: isTodosFetching, isError: isTodosError } = useGetTodosQuery()

  useEffect(() => {
    if (isTodosError) {
      message.error('Failed to update todos X_X')
    }
  }, [isTodosError])

  return <List dataSource={todos} loading={isTodosFetching} renderItem={(todo) => <TodoListItem todo={todo} />} {...props} />
}

export interface TodoListItemProps {
  todo?: ITodo
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  const [editTodo] = useEditTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  const handleComplete = useCallback(() => {
    editTodo({ ...todo, status: todo?.status === 'completed' ? 'pending' : 'completed' })
  }, [todo, editTodo])

  const handleDelete = useCallback(() => {
    deleteTodo(todo?._id)
  }, [todo, deleteTodo])

  return (
    <List.Item>
      <List.Item.Meta
        title={todo?.title}
        description={todo?.description}
        avatar={
          todo?.status === 'completed' ? (
            <CheckCircleFilled style={{ color: '#52c41a', fontSize: 32 }} />
          ) : (
            <ClockCircleFilled style={{ color: '#faad14', fontSize: 32 }} />
          )
        }
      />

      <Space>
        <Button type="primary" ghost={todo?.status === 'completed'} onClick={handleComplete}>
          {todo?.status === 'completed' ? 'Uncomplete' : 'Complete'}
        </Button>
        <EditTodoButton todo={todo?._id} />
        <Button type="primary" danger icon={<DeleteFilled />} onClick={handleDelete} />
      </Space>
    </List.Item>
  )
}
