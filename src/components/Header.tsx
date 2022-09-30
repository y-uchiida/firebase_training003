import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { signInWithGoogle } from '../service/signInWithGoogle'

export const Header = () => {
	const authContext = useContext(AuthContext);

	return (
		<header>
			React Todo App
			<button onClick={signInWithGoogle}>signIn with google</button>
			{authContext ? <>{authContext.currentUser?.displayName}</> : <></>}
		</header>
	)
}
