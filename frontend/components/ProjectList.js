import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const router = useRouter();

  useEffect(async () => {
    try {
      const res = await fetch("http://localhost:5001/projects");
      const projects = await res.json();
      console.log(projects);
      setProjects(projects);
    } catch (e) {
      console.error(`Error on creating a project, Error: ${e}`);
    }
  }, [router]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const body = { title: inputTitle };
      const res = await fetch("http://localhost:5001/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const { id } = await res.json();
      router.push(`/projects/${id}`);
      setInputTitle("");
    } catch (e) {
      console.error(`Error on creating a project, Error: ${e}`);
    }
  };

  const handleInputChange = (evt) => {
    setInputTitle(evt.target.value);
  };

  return (
    <div className="h-screen w-1/3 border-r-2 border-gray-400 py-2 px-4 space-y-1">
      <h3 className="font-bold text-xl">My Projects</h3>
      {projects.length ? (
        projects.map((project) => (
          <div key={project.id} className="hover:underline">
            <Link href={`/projects/${project.id}`}>
              <a>{project.title}</a>
            </Link>
          </div>
        ))
      ) : (
        <div>No projects found</div>
      )}

      <form className="mt-4 space-y-2" onSubmit={handleSubmit}>
        <input
          className="border-2 border-black rounded pl-2"
          type="text"
          value={inputTitle}
          onChange={handleInputChange}
          placeholder="Create new project"
        />
        <input
          className="px-3 py-0.5 rounded bg-green-400 text-white hover:bg-green-600 cursor-pointer"
          type="submit"
        />
      </form>
    </div>
  );
}
