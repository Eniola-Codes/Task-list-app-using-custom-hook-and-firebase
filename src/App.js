import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttps from "./hooks/use-https";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttps();

  useEffect(() => {
    const transformedTask = (taskData) => {
      const loadedTasks = [];

      for (const taskKey in taskData) {
        loadedTasks.push({ id: taskKey, text: taskData[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      { url: "https://tasklist-5ef16-default-rtdb.firebaseio.com//tasks.json" },
      transformedTask
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
