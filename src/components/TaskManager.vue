<template>
    <v-card class="bg-cyan-darken-4 m-2">
        <template v-slot:title>
            <span class="font-weight-black">Task Managment</span>
        </template>

        <v-card-text class="bg-surface-light pt-4">
            <TaskInput 
            :tasks="tasks" 
            :categories="categories" 
            @category-added="categories.push($event)"
            @task-added="addTask"/>
            <TaskFilters />
            <TaskTable />
            <TaskRow />
        </v-card-text>
    </v-card>
</template>

<script setup>

import { ref } from 'vue';
import { useTaskStore } from '@/stores/TaskStore.js';

import TaskInput from './TaskInput.vue';
import TaskFilters from './TaskFilters.vue';
import TaskTable from './TaskTable.vue';
import TaskRow from './TaskRow.vue'; 

const taskStore = useTaskStore();
const categories = ref(['Work', 'Personal', 'Shopping']);
const tasks = taskStore.tasks; 

function addTask(taskName,taskCategory){
    taskStore.addTask(taskName,taskCategory)
    console.log("sucsses");
    
}

</script>

<style lang="scss" scoped></style>