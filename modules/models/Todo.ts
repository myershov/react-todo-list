import { IDocument, timestamp } from '@modules/models/Document'
import { Status } from '@utils/constants'
import mongoose from 'mongoose'

export interface ITodo {
  _id?: string
  title?: string
  description?: string
  status?: Status
}
export type TodoModelType = Omit<ITodo, '_id'> & IDocument

export const TodoSchema = new mongoose.Schema<TodoModelType>({
  title: { type: String, required: false },
  description: { type: String, required: false },
  status: { type: String, required: false, default: Status.Pending }
}).plugin(timestamp)

const Todo = mongoose.models.Todo<mongoose.Model<TodoModelType>> || mongoose.model<TodoModelType>('Todo', TodoSchema)

export default Todo
