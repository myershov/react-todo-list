import dbConnect from '@modules/lib/mongoose'
import Todo from '@modules/models/Todo'
import { toUpdateQuery } from '@utils/helpers'
import { NextRequest, NextResponse } from 'next/server'

dbConnect()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const todo = await Todo.findById(params.id)

    if (!todo) {
      return NextResponse.json({ error: 'not found' }, { status: 404 })
    }

    return NextResponse.json(todo, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    if (!params.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const newTodo = await Todo.findByIdAndUpdate(params.id, toUpdateQuery(body), { new: true, runValidators: true })

    if (!newTodo) {
      return NextResponse.json({ error: 'not found' }, { status: 404 })
    }

    return NextResponse.json(newTodo, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const deletedTodo = await Todo.findByIdAndDelete(params.id)

    if (!deletedTodo) {
      return NextResponse.json({ error: 'not found' }, { status: 404 })
    }

    return NextResponse.json(deletedTodo, { status: 200 })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error }, { status: 500 })
  }
}
