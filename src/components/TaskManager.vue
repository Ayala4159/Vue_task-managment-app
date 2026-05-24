<template>
    <v-card class="bg-cyan-darken-4 m-2">
        <template v-slot:title>
            <span class="font-weight-black">Task Managment</span>
        </template>

        <v-card-text class="bg-surface-light pt-4">
            <TaskInput :tasks="tasks" :categories="categories" @category-added="categories.push($event)"/>
            <TaskFilters />
            <TaskTable />
            <TaskRow />
        </v-card-text>
    </v-card>
</template>

<script>
import TaskInput from './TaskInput.vue';
import TaskFilters from './TaskFilters.vue';
import TaskRow from './TaskRow.vue';
import TaskTable from './TaskTable.vue';
import { default as data} from '@/assets/Data.json'
import { ref } from 'vue';
export default {
    name: 'TaskManager',
    setup() {
        const categories=ref(['Work','Personal','Shopping'])
        const tasks=ref(data)
        return {categories,tasks}
    },
    components: {
        TaskFilters, TaskInput, TaskRow, TaskTable
    }
}
</script>

<style lang="scss" scoped></style>