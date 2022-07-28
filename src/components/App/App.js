import React, { useState } from "react";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";
import "./App.css";

const App = () => {
  const createTodoItem = (label) => {
    return {
      label,
      done: false,
      id: Math.random()
        .toString(36)
        .substring(2, 9),
    };
  };

  const [todoData, setTodoData] = useState([
    createTodoItem("Go shoping"),
    createTodoItem("Go work"),
    createTodoItem("Go home"),
  ]);

  const [filter, setFilter] = useState("all"); //active,all,done

  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    setTodoData(newArr);
  };

  const addItem = (text) => {
    const newItem = createTodoItem(text);
    const newArr = [...todoData, newItem];

    setTodoData(newArr);
  };

  const onToggleDone = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);

    const oldItem = todoData[idx];
    const newItem = { ...oldItem, done: !oldItem.done };

    const newArr = [
      ...todoData.slice(0, idx),
      newItem,
      ...todoData.slice(idx + 1),
    ];
    setTodoData(newArr);
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const clearDone = () => {
    const newArr = todoData.filter((el) => !el.done);
    setTodoData(newArr);
  };

  const filterView = (items, filter) => {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  const visibleItems = filterView(todoData, filter);
  const doneCount = todoData.filter((el) => !el.done).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={visibleItems}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
        />
        <Footer
          done={doneCount}
          onClear={clearDone}
          filter={filter}
          onFilterChange={onFilterChange}
        />
      </section>
    </section>
  );
};

export default App;
