import React from 'react'
import { TodoItem } from '../@types/TodoItem'
import { deleteTodo } from '../service/firebaseApi'

interface props {
	todoList: TodoItem[]
}

const handleDelete = async (todoId: string) => {
	await deleteTodo(todoId);
}

export const TodoList = ({ todoList }: props) => {
	return (
		<>
			<h2>Your todo list</h2>
			{todoList.length
				?
				<ul>
					{todoList.map(todoItem => {
						return <li key={todoItem.id}>
							{todoItem.title}
							<button onClick={() => handleDelete(todoItem.id!)}>delete</button>
						</li>
					})}
				</ul>
				: <></>
			}

		</>
	)
}
