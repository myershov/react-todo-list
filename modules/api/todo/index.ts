import { ITodo } from '@models/Todo'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toCleanObject } from '@utils/helpers'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['Todo'],
  baseQuery: fetchBaseQuery({ baseUrl: `/api/` }),
  endpoints: (builder) => ({
    getTodo: builder.query<ITodo[], string | undefined | void>({
      query: (id) => ({
        url: `todo/${id}`,
        method: 'GET'
      }),
      providesTags: ['Todo']
    }),
    addTodo: builder.mutation<ITodo, Partial<ITodo>>({
      query: (body) => ({
        url: 'todo',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Todo']
    }),
    editTodo: builder.mutation<ITodo, Partial<ITodo>>({
      query: (body) => ({
        url: `todo/${body._id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Todo']
    }),
    deleteTodo: builder.mutation<ITodo, ITodo['_id']>({
      query: (id) => ({
        url: `todo/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Todo']
    }),
    getTodos: builder.query<ITodo[], {} | undefined | void>({
      query: (query) => ({
        url: 'todo',
        method: 'GET',
        ...(query && { params: toCleanObject(query) as Record<string, any> })
      }),
      providesTags: ['Todo']
    }),
    addTodos: builder.mutation<void, Partial<ITodo>[]>({
      query: (body = []) => ({
        url: 'todo',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Todo']
    }),
    editTodos: builder.mutation<ITodo, Partial<ITodo>[]>({
      query: (body = []) => ({
        url: 'todo',
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['Todo']
    }),
    deleteTodos: builder.mutation<ITodo[], ITodo['_id'][] | undefined | void>({
      query: (body = []) => ({
        url: 'todo',
        method: 'DELETE',
        body
      }),
      invalidatesTags: ['Todo']
    })
  })
})

export const {
  useGetTodoQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useAddTodosMutation,
  useEditTodosMutation,
  useDeleteTodosMutation
} = todoApi
