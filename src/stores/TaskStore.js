import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


const TASK_STATUS = Object.freeze({
    PENDING: 'Pending',
    IN_PROGRESS: 'In progress',
    COMPLETED: 'Completed'
});

export const useTaskStore = defineStore('counter', () => {
    //Data
    const tasks = ref(JSON.parse(localStorage.getItem('data')) || [])
    const categories = computed(() => {
        return [...new Set(tasks.value.map(task => task.category))];
    })
    //Filter data
    const categoryFilter = ref('All categories')
    const search = ref('')
    const filterTasks = computed(() => {
        let tmp = categoryFilter.value === 'All categories' ?
            tasks.value : tasks.value.filter((t) => t.category === categoryFilter.value)
        if (search.value)
            tmp = tmp.filter((t) => t.name.toLowerCase().includes(search.value.toLowerCase()))
        return tmp
    })
    //Sort data
    const tasksByCategory = computed(() => {
        return filterTasks.value.reduce((groups, task) => {
            const category = task.category
            if (!groups[category]) {
                groups[category] = []
            }
            groups[category].push(task)
            return groups;
        }, {})
    })
    //Function
    function addTask(taskName, taskCategory) {
        const newTask = {
            name: taskName,
            category: taskCategory,
            status: TASK_STATUS.PENDING
        }
        tasks.value.push(newTask)
        localStorage.setItem('data', JSON.stringify(tasks.value))
    }
    function deleteTask(task){
        tasks.value=tasks.value.filter((t)=>t.name!==task.name||t.category!==task.category)
        localStorage.setItem('data', JSON.stringify(tasks.value))
    }
    function updateStatus(task){
        tasks.value=tasks.value.map((t)=>{
            if(t.name===task.name&& t.category===task.category)
                t.status=t.status==='Pending'?TASK_STATUS.IN_PROGRESS:TASK_STATUS.COMPLETED
            return t
        })
        localStorage.setItem('data', JSON.stringify(tasks.value))
    }
    //Return
    return {
        tasks, categories, categoryFilter, filterTasks, search,tasksByCategory, addTask,deleteTask,updateStatus
    }
})