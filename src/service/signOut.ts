import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const signOut = () => {
	auth.signOut().then(() => {
		console.log('sign out success.');
		document.location.reload();
	}).catch(err => {
		alert(err.message);
	});
}
