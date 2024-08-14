const FormTask = ({
  setIsEdit,
  setValue,
  value,
  handleAddTask,
  handleEditTask,
  isEdit,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        className="border border-gray-400 outline-none rounded-md w-full px-2 py-1"
        value={value?.title}
        onChange={(e) => setValue({ ...value, title: e?.target?.value })}
      />

      {isEdit ? (
        <div className="flex gap-x-3 mt-5 mx-auto">
          <button
            onClick={handleEditTask}
            className="bg-[#FFB46F] py-1 px-2 rounded-lg"
          >
            Update Task
          </button>
          <button
            onClick={() => {
              setIsEdit(false);
              setValue({ title: "", id: null });
            }}
            className="bg-[#FF6F6F] py-1 px-8 rounded-lg"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddTask}
          className="bg-[#6FCBFF] w-1/2 mx-auto mt-5 rounded-lg py-1"
        >
          Add task
        </button>
      )}
    </div>
  );
};
export default FormTask;
