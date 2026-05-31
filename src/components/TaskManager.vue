<template>
    <v-card class="bg-cyan-darken-4 m-2">
        <template v-slot:title>
            <span class="font-weight-black">Task Managment</span>
        </template>

        <v-card-text class="bg-surface-light pt-4">
            <TaskInput @task-added="addTask" />
            <TaskFilters />
            <TaskTable @delete-task="deleteTask" @update-status="updateStatus" />
        </v-card-text>
    </v-card>
</template>

<script setup>
import { useTaskStore } from '@/stores/TaskStore.js';

import TaskInput from './TaskInput.vue';
import TaskFilters from './TaskFilters.vue';
import TaskTable from './TaskTable.vue';

const taskStore = useTaskStore();

function addTask(taskName, taskCategory) {
    taskStore.addTask(taskName, taskCategory)
}

function deleteTask(task) {
    taskStore.deleteTask(task)
}

function updateStatus(task) {
    taskStore.updateStatus(task)
}

</script>

<style lang="scss" scoped></style>