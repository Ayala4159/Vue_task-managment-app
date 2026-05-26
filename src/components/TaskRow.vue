<template>
    <tr class="v-data-table__tr">

        <td style="width: 30%">
            {{ item.name }}
        </td>

        <td style="width: 40%">
            <v-chip class="ma-0" size="small" :color="getStatusDetails(item.status).color"
                :prepend-icon="getStatusDetails(item.status).icon">
                {{ item.status }}
            </v-chip>
        </td>

        <td style="width: 30%" class="text-start">
            <v-btn icon="mdi-check" variant="text" size="small" color="success" class="bg-green-lighten-5 mr-2"
                @click="updateStatus(item)" :disabled="item.status === 'Completed'"></v-btn>
            <v-btn icon="mdi-delete" variant="text" size="small" color="error" class="bg-red-lighten-5"
                @click="deleteTask(item)"></v-btn>
        </td>

    </tr>
</template>


<script setup>
import { useTaskStore } from '@/stores/TaskStore.js'
import { ref } from 'vue'

defineProps({
    item: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['delete-task', 'update-status'])
const taskStore = useTaskStore();
const getStatusDetails = (status) => STATUS_CONFIG[status] || STATUS_CONFIG['Pending'];

function deleteTask(item) {

    emit('delete-task', item)
}
function updateStatus(item) {
    emit('update-status', item)
}
const STATUS_CONFIG = {
    'Completed': { color: 'green', icon: 'mdi-check-circle' },
    'In progress': { color: 'orange', icon: 'mdi-clock-time-eight' },
    'Pending': { color: 'indigo', icon: 'mdi-play' }
}
</script>

<style lang="scss" scoped></style>