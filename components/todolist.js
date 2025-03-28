"use client";
import { useState } from "react";
import {
  FiPlus,
  FiTrash2,
  FiCheck,
  FiCircle,
  FiClock,
  FiEdit2,
} from "react-icons/fi";

const TodoList = () => {
  const [tasks, setTasks] = useState({
    current: [],
    inProgress: [],
    completed: [],
  });
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [editingTask, setEditingTask] = useState(null);
  const [editedText, setEditedText] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        priority: priority,
        createdAt: selectedDate,
        dueDate: dueDate || null,
        status: "current",
      };

      setTasks({
        ...tasks,
        current: [...tasks.current, newTask],
      });

      setInputValue("");
      setPriority("Medium");
      setDueDate("");
    }
  };

  const deleteTask = (id, status) => {
    setTasks({
      ...tasks,
      [status]: tasks[status].filter((task) => task.id !== id),
    });
  };

  const deleteAllTasks = (status) => {
    setTasks({
      ...tasks,
      [status]: [],
    });
  };

  const moveTask = (id, fromStatus, toStatus) => {
    const taskToMove = tasks[fromStatus].find((task) => task.id === id);

    if (!taskToMove) return;

    setTasks({
      ...tasks,
      [fromStatus]: tasks[fromStatus].filter((task) => task.id !== id),
      [toStatus]: [
        ...tasks[toStatus],
        {
          ...taskToMove,
          status: toStatus,
          ...(toStatus === "completed" && {
            completedAt: new Date().toISOString().split("T")[0],
          }),
        },
      ],
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100";
    }
  };

  const getPriorityBorderColor = (priority) => {
    switch (priority) {
      case "High":
        return "border-red-300";
      case "Medium":
        return "border-yellow-300";
      case "Low":
        return "border-green-300";
      default:
        return "border-gray-300";
    }
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setEditedText(task.text);
  };

  const saveEdit = (id) => {
    setTasks({
      ...tasks,
      current: tasks.current.map((task) =>
        task.id === id ? { ...task, text: editedText } : task
      ),
    });
    setEditingTask(null);
    setEditedText("");
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditedText("");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-indigo-600 mb-6">
        Todo List Manager
      </h1>

      <div className="flex flex-col mb-8 space-y-3 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <label className="mr-2 text-gray-700">Date:</label>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addTodo}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition"
          >
            <FiPlus size={20} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
          <div className="flex space-x-2">
            {["Low", "Medium", "High"].map((level) => (
              <button
                key={level}
                onClick={() => setPriority(level)}
                className={`px-3 py-1 rounded-full text-sm font-medium border ${
                  priority === level
                    ? getPriorityColor(level) + " ring-2 ring-indigo-200"
                    : "bg-white border-gray-300 text-gray-700"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="relative flex-1">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={selectedDate}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold flex items-center text-blue-600">
              <FiCircle className="mr-2" /> Current Tasks
            </h2>
            <span className="ml-4 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {tasks.current.length} tasks
            </span>
          </div>
          {tasks.current.length > 0 && (
            <button
              onClick={() => deleteAllTasks("current")}
              className="flex items-center text-white bg-red-600 hover:bg-red-800 text-sm font-medium px-3 py-1 rounded"
            >
              <FiTrash2 className="mr-1" /> Delete All
            </button>
          )}
        </div>

        {tasks.current.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.current.map((task) => (
                  <tr key={task.id} className="hover:bg-blue-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingTask?.id === task.id ? (
                        <input
                          type="text"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">
                          {task.text}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                          task.priority
                        )} ${getPriorityBorderColor(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.dueDate || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingTask?.id === task.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(task.id)}
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            <FiCheck size={16} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              moveTask(task.id, "current", "inProgress")
                            }
                            className="text-blue-600 hover:text-blue-900 mr-4"
                            title="Start Progress"
                          >
                            <FiClock size={16} />
                          </button>
                          <button
                            onClick={() => startEditing(task)}
                            className="text-yellow-600 hover:text-yellow-900 mr-4"
                            title="Edit"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id, "current")}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No current tasks</p>
          </div>
        )}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold flex items-center text-purple-600">
              <FiClock className="mr-2" /> In Progress
            </h2>
            <span className="ml-4 bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
              {tasks.inProgress.length} tasks
            </span>
          </div>
          {tasks.inProgress.length > 0 && (
            <button
              onClick={() => deleteAllTasks("inProgress")}
              className="flex items-center text-white bg-red-600 hover:bg-red-800 text-sm font-medium px-3 py-1 rounded"
            >
              <FiTrash2 className="mr-1" /> Delete All
            </button>
          )}
        </div>

        {tasks.inProgress.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.inProgress.map((task) => (
                  <tr key={task.id} className="hover:bg-purple-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {task.text}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                          task.priority
                        )} ${getPriorityBorderColor(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.dueDate || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() =>
                          moveTask(task.id, "inProgress", "completed")
                        }
                        className="text-green-600 hover:text-green-900 mr-4"
                        title="Mark Complete"
                      >
                        <FiCheck size={16} />
                      </button>
                      <button
                        onClick={() =>
                          moveTask(task.id, "inProgress", "current")
                        }
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        title="Move Back"
                      >
                        <FiCircle size={16} />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id, "inProgress")}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No tasks in progress</p>
          </div>
        )}
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold flex items-center text-green-600">
              <FiCheck className="mr-2" /> Completed Tasks
            </h2>
            <span className="ml-4 bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
              {tasks.completed.length} tasks
            </span>
          </div>
          {tasks.completed.length > 0 && (
            <button
              onClick={() => deleteAllTasks("completed")}
              className="flex items-center text-white bg-red-600 hover:bg-red-800 text-sm font-medium px-3 py-1 rounded"
            >
              <FiTrash2 className="mr-1" /> Delete All
            </button>
          )}
        </div>

        {tasks.completed.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-600 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-600 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-600 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-600 uppercase tracking-wider">
                    Completed On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.completed.map((task) => (
                  <tr key={task.id} className="hover:bg-green-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-500 line-through">
                        {task.text}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                          task.priority
                        )} ${getPriorityBorderColor(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {task.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {task.completedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => deleteTask(task.id, "completed")}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No completed tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
