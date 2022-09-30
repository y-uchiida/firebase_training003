import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
	signInWithPopup(auth, googleAuthProvider).then(res => {
		console.log('google authentication success');
		console.log(res)
	}).catch(err => {
		alert(err.message);
	});
}
