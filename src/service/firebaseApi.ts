import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";


const initialToDoItem = {
	uid: '',
	title: '',
	isComplete: false,
	country: '',
	createdAt: null
}

export const createTodo = async (title: string, uid: string) => {
	await addDoc(collection(db, 'todoItems'), {
		...initialToDoItem,
		uid,
		title,
		createdAt: serverTimestamp()
	});
};
