<template>
    <v-card elevated hover class="pa-5 mt-5 ml-10 mr-10">
        <v-card-title class="text-h5 mb-4">Tasks</v-card-title>
        <template v-if="!hasTasks">
            <v-empty-state icon="mdi-magnify"
                text="Try adjusting your search terms or filters. Sometimes less specific terms or broader queries can help you find what you're looking for."
                title="We couldn't find a match."></v-empty-state> </template>
        <div v-for="(tasks, categoryName) in tasksByCategory" :key="categoryName">
            <div class="d-flex align-center pa-3 bg-grey-lighten-4 rounded">
                <v-icon class="mr-2">mdi-folder</v-icon>
                <span class="font-weight-bold">{{ categoryName }} ({{ tasks.length }} tasks)</span>
            </div>

            <v-data-table :headers="tableHeaders" :items="tasks" hide-default-header hide-default-footer>
                <template v-slot:item="{ item }">
                    <TaskRow :item="item" @update-status="updateStatus" @delete-task="deleteTask" />
                </template>
            </v-data-table>
        </div>

        <v-snackbar :model-value="message === true" :timeout="timeout" :text=messageTxt :color=messageColor
            location="center top" @update:model-value="message = false"></v-snackbar>

    </v-card>
</template>

<script setup>
import { useTaskStore } from '@/stores/TaskStore.js'
import { ref, computed, shallowRef } from 'vue'
import TaskRow from './TaskRow.vue';

const emit = defineEmits(['delete-task', 'update-status'])

const taskStore = useTaskStore();

const groupBy = [{ key: 'category', order: 'asc' }]
const tasksByCategory = computed(() => taskStore.tasksByCategory)
const hasTasks = computed(() => {
    const groups = tasksByCategory.value || {};
    return Object.keys(groups).length > 0 && Object.values(groups).some(arr => arr && arr.length > 0);
});

const message = shallowRef(false)
const timeout = ref(2000)
const messageTxt = ref('')
const messageColor = ref('')

function deleteTask(item) {
    messageTxt.value = "Task deleted successfuly"
    message.value = true
    messageColor.value = "red-darken-4"
    emit('delete-task', item)
}
function updateStatus(item) {
    messageTxt.value = "Task updated successfuly"
    message.value = true
    messageColor.value = "green-darken-4"
    emit('update-status', item)
}
const tableHeaders = [
    { key: 'name', width: '30%' },
    { key: 'status', width: '40%' },
    { key: 'actions', width: '30%', align: 'start' }
]
</script>

<style lang="scss" scoped></style>