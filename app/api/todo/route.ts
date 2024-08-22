import dbConnect from '@lib/mongoose'
import Todo, { ITodo } from '@models/Todo'
import { toUpdateQuery } from '@utils/helpers'
import { FilterQuery } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

dbConnect()

export async function GET(request: NextRequest) {
  try {
    const {
      nextUrl: { searchParams }
    } = request

    const filters: FilterQuery<typeof Todo> = {}

    const todos = await Todo.find(filters)

    return NextResponse.json(todos, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ITodo[] = await request.json()

    await Todo.insertMany(body)

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body: ITodo[] = await request.json()

    await Todo.bulkWrite(
      body.map((todo) => ({
        updateOne: {
          filter: { _id: todo._id },
          update: toUpdateQuery(todo)
        }
      }))
    )

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body: ITodo['_id'][] = await request.json()

    const deletedTodos = await Todo.deleteMany({ _id: { $in: body } })

    if (!deletedTodos) {
      return NextResponse.json({ error: 'not found' }, { status: 404 })
    }

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}
