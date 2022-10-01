import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { TodoItem } from '../@types/TodoItem';
import { AuthContext } from '../providers/AuthProvider';
import { db } from '../service/firebase';
import { createTodo } from '../service/firebaseApi';
import { signInWithGoogle } from '../service/signInWithGoogle';
import { TodoList } from './TodoList';

export const DashBoard = () => {
	const currentUser = useContext(AuthContext).currentUser;
	const [todoInputValue, setTodoInputValue] = useState('');
	const [todoList, setTodoList] = useState<TodoItem[]>([]);

	/** ログインしたときにTodoの一覧を取得する */
	useEffect(() => {
		if (currentUser === null) {
			return
		}

		const todoItemsCollectionRef = collection(db, 'todoItems');
		const q = query(todoItemsCollectionRef, orderBy('createdAt', 'desc'), where('uid', '==', currentUser?.uid));
		const unSub = onSnapshot(q, snapshot => {
			setTodoList(
				snapshot.docs.map<TodoItem>(doc => {
					return {
						id: doc.id,
						uid: doc.data().uid,
						title: doc.data().title,
						isComplete: doc.data().isComplete,
						country: doc.data().country,
						createdAt: doc.data().createdAt
					}
				})
			);
		}, (err) => { console.log(err) });
		return unSub;
	}, [currentUser]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (currentUser === null) {
			alert('error: you are not log in this service.');
			return;
		}
		if (todoInputValue.length < 1) {
			return
		}
		await createTodo(todoInputValue, currentUser?.uid);
		setTodoInputValue('');
	}

	/* ログイン状態によって、Todoリストとログインボタンの表示を切り替える **/
	const formRender = () => {
		return (
			<>
				{currentUser?.uid ?
					<form onSubmit={handleSubmit}>
						<input
							type="text" placeholder='Todo title'
							value={todoInputValue}
							onChange={(e) => {
								setTodoInputValue(e.target.value);
							}}
						/>
						<button disabled={todoInputValue.length < 1}>Add</button>
					</form>
					:
					<button onClick={signInWithGoogle}>signIn with google</button>
				}
			</>
		)
	};

	return (
		<>
			{formRender()}
			<TodoList todoList={todoList}></TodoList>
		</>
	)
}
