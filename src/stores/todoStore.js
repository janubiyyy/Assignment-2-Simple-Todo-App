import { defineStore } from "pinia";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    loadTasks() {
      const savedTasks = localStorage.getItem("vue-tasks");
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    },
    addTask(newTaskText) {
      if (!newTaskText.trim()) return;
      const newTask = {
        id: Date.now(),
        text: newTaskText,
        completed: false,
      };
      this.tasks.push(newTask);
      this.saveTasks();
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveTasks();
    },
    toggleComplete(id) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;
        this.saveTasks();
      }
    },
    editTask(id, newText) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.text = newText;
        this.saveTasks();
      }
    },
    saveTasks() {
      localStorage.setItem("vue-tasks", JSON.stringify(this.tasks));
    },
  },
});
