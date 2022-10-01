import React, { useContext, useState } from 'react'
import { AuthContext } from '../providers/AuthProvider';
import { createTodo } from '../service/firebaseApi';
import { signInWithGoogle } from '../service/signInWithGoogle';

export const DashBoard = () => {
	const authContext = useContext(AuthContext);
	const [todoInputValue, setTodoInputValue] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (authContext.currentUser === null) {
			alert('error: you are not log in this service.');
			return;
		}
		await createTodo(todoInputValue, authContext.currentUser?.uid);
		setTodoInputValue('');
	}

	/* ログイン状態によって、Todoリストとログインボタンの表示を切り替える **/
	const formRender = () => {
		return (
			<>
				{authContext.currentUser?.uid ?
					<form onSubmit={handleSubmit}>
						<input
							type="text" placeholder='Todo title'
							value={todoInputValue}
							onChange={(e) => {
								setTodoInputValue(e.target.value);
							}}
						/>
						<button>Add</button>
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
		</>
	)
}
