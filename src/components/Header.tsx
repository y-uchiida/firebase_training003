import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { signInWithGoogle } from '../service/signInWithGoogle'
import { signOut } from '../service/signOut'

export const Header = () => {
	const authContext = useContext(AuthContext);

	return (
		<header>
			React Todo App
			{authContext.currentUser ?
				<>
					{authContext.currentUser?.displayName}
					<button onClick={signOut}>sign out</button>
				</> :
				<>
					<button onClick={signInWithGoogle}>signIn with google</button>
				</>
			}
		</header>
	)
}
