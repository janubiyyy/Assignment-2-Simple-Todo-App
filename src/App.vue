<template>
  <div class="app-container">
    <h1 class="app-title">Todo App</h1>

    <div class="input-wrapper">
      <input
        type="text"
        v-model="newTask"
        placeholder="Enter a new task..."
        @keyup.enter="addTask"
        class="task-input"
      />
      <button @click="addTask" class="add-button">Add</button>
    </div>

    <transition-group name="list" tag="ul" class="task-list">
      <TodoItem
        v-for="task in todoStore.tasks"
        :key="task.id"
        :task="task"
        @delete-task="deleteTask(task.id)"
        @toggle-complete="toggleComplete(task.id)"
        @edit-task="editTask(task.id, $event)"
      />
    </transition-group>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useTodoStore } from "./stores/todoStore";
import TodoItem from "./components/TodoItem.vue";

export default {
  name: "App",
  components: { TodoItem },
  setup() {
    const newTask = ref("");
    const todoStore = useTodoStore();

    onMounted(() => {
      todoStore.loadTasks();
    });

    const addTask = () => {
      if (!newTask.value.trim()) return;
      todoStore.addTask(newTask.value);
      newTask.value = "";
    };

    const deleteTask = (id) => {
      todoStore.deleteTask(id);
    };

    const toggleComplete = (id) => {
      todoStore.toggleComplete(id);
    };

    const editTask = (id, newText) => {
      todoStore.editTask(id, newText);
    };

    return {
      newTask,
      todoStore,
      addTask,
      deleteTask,
      toggleComplete,
      editTask,
    };
  },
};
</script>
