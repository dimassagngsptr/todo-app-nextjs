import FormTask from "@/components/form";
import ListTask from "@/components/listTask";
import { Poppins } from "next/font/google";
import { useState } from "react";

const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home({ initialOnGoingTask, initialCompletedTask }) {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState({
    id: null,
    title: "",
  });
  const [onGoingTask, setOnGoingTask] = useState(initialOnGoingTask);
  const [completedTask, setCompletedTask] = useState(initialCompletedTask);

  const handleIsEdit = (data) => {
    setIsEdit(true);
    setValue({ title: data?.title, id: data?.id });
    console.log(data);
  };
  const handleAddTask = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: value?.title,
        }),
      });

      if (res.ok) {
        setValue("");
        const { onGoingTask, completedTask } = await fetchTasks();
        setOnGoingTask(onGoingTask);
        setCompletedTask(completedTask);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTask = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/task/${value?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: value?.title,
        }),
      });

      if (res.ok) {
        setValue("");
        const { onGoingTask, completedTask } = await fetchTasks();
        setOnGoingTask(onGoingTask);
        setCompletedTask(completedTask);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCompleteTask = async (id, checked) => {
    try {
      const res = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !checked,
        }),
      });

      if (res.ok) {
        setValue("");
        const { onGoingTask, completedTask } = await fetchTasks();
        setOnGoingTask(onGoingTask);
        setCompletedTask(completedTask);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletedTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setValue("");
        const { onGoingTask, completedTask } = await fetchTasks();
        setOnGoingTask(onGoingTask);
        setCompletedTask(completedTask);
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main
      className={`flex min-h-screen bg-white flex-col items-center justify-between p-24 ${poppins.className}`}
    >
      <div className="flex flex-col gap-y-8 w-1/2 px-10 py-5">
        <h1 className="text-2xl font-semibold text-center">Task Management</h1>
        <FormTask
          handleAddTask={handleAddTask}
          setIsEdit={setIsEdit}
          setValue={setValue}
          value={value}
          isEdit={isEdit}
          handleEditTask={handleEditTask}
        />
        <ListTask
          title={"Ongoing task"}
          tasks={onGoingTask}
          handleIsEdit={handleIsEdit}
          handleCompleteTask={handleCompleteTask}
          handleDeletedTask={handleDeletedTask}
        />
        <ListTask
          title={"Completed task"}
          tasks={completedTask}
          handleIsEdit={handleIsEdit}
          handleCompleteTask={handleCompleteTask}
          handleDeletedTask={handleDeletedTask}
        />
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const { onGoingTask, completedTask } = await fetchTasks();
  return {
    props: {
      initialOnGoingTask: onGoingTask,
      initialCompletedTask: completedTask,
    },
  };
}

async function fetchTasks() {
  let onGoingTask = [];
  let completedTask = [];

  try {
    const res = await fetch("http://localhost:3000/api/task", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const tasks = await res.json();

    onGoingTask = tasks?.filter((task) => !task?.completed);
    completedTask = tasks
      ?.filter((task) => task?.completed)
      ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
  }

  return { onGoingTask, completedTask };
}
