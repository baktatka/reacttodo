import React from "react";
import ReactDOM from "react-dom/client";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";

import "./index.css";

class App extends React.Component {
  maxId = 100;
  state = {
    todoData: [
      this.createTodoItem("Go shop"),
      this.createTodoItem("Go work"),
      this.createTodoItem("Go home"),
    ],
    filter: "all", //active,all,done
  };
  createTodoItem(label) {
    return {
      label,
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };
  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };

      const newArr = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newArr,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  clearDone = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => !el.done);
      return {
        todoData: newArr,
      };
    });
  };

  filter(items, filter) {
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
  }

  render() {
    const { todoData, filter } = this.state;
    const visibleItems = this.filter(todoData, filter);
    const doneCount = todoData.filter((el) => !el.done).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
          />
          <Footer
            done={doneCount}
            onClear={this.clearDone}
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </section>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector(".root"));
root.render(<App />);
