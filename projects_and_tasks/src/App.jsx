import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projects, setProjects] = useState({
    selectedProjectID: undefined,
    projects: [],
    tasks: [],
  });

  function handleCancelAddProject() {
    setProjects((prevProjects) => {
      return {
        ...prevProjects,
        selectedProjectID: undefined,
      };
    });
  }

  function handleStartAddProject() {
    setProjects((prevProjects) => {
      return {
        ...prevProjects,
        selectedProjectID: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjects((prevProjects) => {
      const newProject = { ...projectData, id: Math.random() };

      return {
        ...prevProjects,
        selectedProjectID: undefined,
        projects: [...prevProjects.projects, newProject],
      };
    });
  }

  function handleSelectProject(id) {
    setProjects((prevProjects) => {
      return {
        ...prevProjects,
        selectedProjectID: id,
      };
    });
  }

  function handleDeleteProject() {
    setProjects((prevProjects) => {
      return {
        ...prevProjects,
        selectedProjectID: undefined,
        projects: prevProjects.projects.filter(
          (projects) => projects.id !== prevProjects.selectedProjectID
        ),
      };
    });
  }

  function handleAddTask(text) {
    setProjects((prevProjects) => {
      const taskID = Math.random();
      const newTask = {
        text: text,
        projectID: prevProjects.selectedProjectID,
        id: taskID,
      };

      return {
        ...prevProjects,
        tasks: [newTask, ...prevProjects.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjects((prevProjects) => {
      return {
        ...prevProjects,
        tasks: prevProjects.tasks.filter((task) => task.id !== id),
      };
    });
  }

  const selectedProject = projects.projects.find(
    (project) => project.id === projects.selectedProjectID
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projects.tasks.filter(
        (task) => task.projectID === projects.selectedProjectID
      )}
    />
  );

  if (projects.selectedProjectID === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projects.selectedProjectID === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projects.projects}
        onSelectProject={handleSelectProject}
        selectedProjectID={projects.selectedProjectID}
      />
      {content}
    </main>
  );
}

export default App;
