import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProjectList } from "./ProjectList";

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const route = useRouter();
  const { id } = route.query;

  useEffect(async () => {
    try {
      const res = await fetch(`http://localhost:5001/projects/${id}`);
      const { todos, title } = await res.json();
      setTodos(todos);
      setTitle(title);
    } catch (e) {
      console.error(`Error on creating a project, Error: ${e}`);
    }
  }, [id]);

  return (
    <div className="flex">
      <ProjectList />
      <div className="px-4 py-1">
        <h3 className="font-bold text-xl">{title}</h3>
        {todos.length ? (
          todos.map((todo) => (
            <div key={todo.id}>
              <div>{todo.task}</div>
            </div>
          ))
        ) : (
          <div>Empty Todo</div>
        )}
      </div>
    </div>
  );
}
