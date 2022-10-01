import React, { useContext, useState } from 'react'
import { AuthContext } from '../providers/AuthProvider';
import { signInWithGoogle } from '../service/signInWithGoogle';

export const DashBoard = () => {
	const authContext = useContext(AuthContext);
	const [todoInputValue, setTodoInputValue] = useState('');

	/* ログイン状態によって、Todoリストとログインボタンの表示を切り替える **/
	const formRender = () => {
		return (
			<>
				{authContext.currentUser?.uid ?
					<form>
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
