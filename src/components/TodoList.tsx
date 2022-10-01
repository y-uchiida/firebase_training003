import React from 'react'
import { TodoItem } from '../@types/TodoItem'

interface props {
	todoList: TodoItem[]
}

export const TodoList = ({ todoList }: props) => {
	return (
		<>
			<h2>Your todo list</h2>
			{todoList.length
				?
				<ul>
					{todoList.map(todoItem => {
						return <li key={todoItem.id}>{todoItem.title}</li>
					})}
				</ul>
				: <></>
			}

		</>
	)
}
