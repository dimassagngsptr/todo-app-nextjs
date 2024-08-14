import { formatDate } from "@/utils/formatedDate";
import { useEffect, useState } from "react";

const ListTask = ({
  tasks,
  title,
  handleIsEdit,
  handleCompleteTask,
  handleDeletedTask,
}) => {
  const [formattedTasks, setFormattedTasks] = useState([]);

  useEffect(() => {
    const updatedTasks = tasks?.map((task) => ({
      ...task,
      formattedDate: formatDate(task?.createdAt),
    }));
    setFormattedTasks(updatedTasks);
  }, [tasks]);
  return (
    <div className="mt-2">
      <p className="text-start font-semibold text-sm pb-2">{title}</p>
      {formattedTasks?.map((item) => (
        <div
          key={item?.id}
          className="px-3 py-4 bg-gray-200 flex justify-between w-full mt-2 rounded-md"
        >
          <div>
            <div className="flex items-center gap-x-2">
              <p
                className={`${
                  item?.completed ? "line-through" : ""
                } font-semibold`}
              >
                {item?.title}
              </p>
              <button onClick={() => handleIsEdit(item)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-pencil"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
            </div>
            <small className="text-xs block">{item?.formattedDate}</small>
          </div>
          <div className="flex gap-x-3 items-center">
            <button
              onClick={() => handleDeletedTask(item?.id)}
              className="border border-black rounded-full p-0.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <button
              className=" bg-white border border-gray-500 h-5 w-5 p-0.5 rounded-full"
              onClick={() => handleCompleteTask(item?.id, item?.completed)}
            >
              {item?.completed && (
                <span className="h-5 w-4 rounded-full top-1 left-1 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-check"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTask;
