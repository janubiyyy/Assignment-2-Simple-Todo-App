<template>
  <li class="task-item">
    <div class="task-details" :class="{ completed: task.completed }">
      <span class="check-icon" @click="$emit('toggle-complete')"></span>
      <span v-if="!isEditing" @dblclick="startEditing" class="task-text">
        {{ task.text }}
      </span>
      <input
        v-else
        type="text"
        v-model="editText"
        @keyup.enter="confirmEdit"
        @blur="confirmEdit"
        class="edit-input"
      />
    </div>
    <div class="task-actions">
      <button
        :class="['complete-button', { 'undo-button': task.completed }]"
        @click="$emit('toggle-complete')"
      >
        <span class="btn-icon">
          {{ task.completed ? "↩️" : "✅" }}
        </span>
        <span class="btn-text">
          {{ task.completed ? "Undo" : "Complete" }}
        </span>
      </button>
      <button class="delete-button" @click="$emit('delete-task')">
        <span class="btn-icon">🗑️</span>
        <span class="btn-text">Delete</span>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      editText: this.task.text,
    };
  },
  methods: {
    startEditing() {
      this.isEditing = true;
      this.$nextTick(() => {
        this.$el.querySelector("input").focus();
      });
    },
    confirmEdit() {
      if (this.editText.trim() === "") {
        this.editText = this.task.text;
      }
      this.isEditing = false;
      this.$emit("edit-task", this.editText);
    },
  },
};
</script>
