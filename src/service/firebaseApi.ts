import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { TodoItem } from "../@types/TodoItem";
import { db } from "./firebase";

const initialToDoItem: TodoItem = {
	id: null,
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

export const deleteTodo = async (todoId: string) => {
	await deleteDoc(doc(db, 'todoItems', todoId));
};
