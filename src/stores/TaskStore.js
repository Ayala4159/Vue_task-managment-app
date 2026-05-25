import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


const TASK_STATUS = Object.freeze({
    PENDING:'Pending',
    IN_PROGRESS:'In progress',
    COMPELETD:'Completed'
});

export const useTaskStore = defineStore('counter', () => {
    const tasks = ref(JSON.parse(localStorage.getItem('data')) || [])
    function addTask(taskName,taskCategory){
        const newTask={
            name: taskName,        
            category: taskCategory,
            status: TASK_STATUS.PENDING
        }
        tasks.value.push(newTask)
        localStorage.setItem('data', JSON.stringify(tasks.value))
    }
    return{
        tasks,addTask
    }
})