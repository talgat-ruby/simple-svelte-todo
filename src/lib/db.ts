type Todo = {
	id: string;
	description: string;
	done: boolean;
};

class DB {
	#todos: Todo[];

	constructor() {
		this.#todos = [];
	}

	add(todo: Omit<Todo, 'id'>) {
		this.#todos = [{ id: crypto.randomUUID(), ...todo }, ...this.#todos];
	}

	delete(deleteId: string) {
		this.#todos = this.#todos.filter(({ id }) => id !== deleteId);
	}

	update(id: string, partialTodo: Partial<Omit<Todo, 'id'>>) {
		this.#todos = this.#todos.map((todo) => (todo.id !== id ? todo : { ...todo, ...partialTodo }));
	}

	getTodos() {
		return this.#todos;
	}

	getTodo(id: string) {
		return this.#todos.find((todo) => todo.id === id);
	}
}

const db = new DB();

export default db;
