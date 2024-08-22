'use client'

import { PlusOutlined } from '@ant-design/icons'
import { TodoList } from '@components/TodoList'
import { EditTodoButton } from '@components/UI/Buttons/EditTodoButton'
import { Card, Flex, Typography } from 'antd'

export default function Home() {
  return (
    <Card
      title={
        <Flex justify="space-between" gap={16} align="center">
          <Typography.Text>Todos</Typography.Text>
          <EditTodoButton type="primary" icon={<PlusOutlined />}>
            Create TODO
          </EditTodoButton>
        </Flex>
      }>
      <TodoList />
    </Card>
  )
}
