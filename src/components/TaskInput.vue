<template>
    <v-card elevated hover class="pa-5 mt-5 ml-10 mr-10">
        <v-card-title>Add new task</v-card-title>

        <v-form ref="formRef" class="w-100">
            <v-card-actions class="d-flex justify-center">

                <v-text-field :rules="[rules.required, rules.uniqueTask]" label="Task name"
                    placeholder="Enter task name" variant="underlined" max-width="33%" v-model="taskName">
                </v-text-field>

                <v-select :rules="[rules.required]" label="Category" placeholder="Select category" max-width="33%"
                    variant="underlined" :items="[...categories]" v-model="taskCategory">
                    <template v-slot:append-item>
                        <v-text-field class="ml-2 mr-2" label="New category" placeholder="Enter new category"
                            variant="underlined" v-model="newCategory" @blur="saveCategory">
                        </v-text-field>
                    </template>
                </v-select>

                <v-btn elevated prepend-icon="mdi-plus" class="bg-cyan-darken-2 w-33" @click="addTask"
                    :disabled="!isButtonEnabled">
                    Add
                </v-btn>

                <v-snackbar :model-value="message === true" :timeout="timeout" text="Task added succesfuly"
                    color="cyan-darken-2" location="center top" @update:model-value="message = false">
                </v-snackbar>
            </v-card-actions>
        </v-form>
    </v-card>
</template>


<script setup>
import { ref, computed, shallowRef, watch } from 'vue'
import { useTaskStore } from '@/stores/TaskStore.js'

const taskStore = useTaskStore()

const emit = defineEmits(['category-added', 'task-added']);

const message = shallowRef(false)

const rules = {
    required: value => !!value || 'Field is required',
    uniqueTask: (value) => {
        if (!value || !value.trim()) return true
        return !isDuplicateTask.value || 'This task already exists in this category'
    }
}

const tasks = computed(() => taskStore.tasks)

const categories = computed(() => {
    const storeCategories = taskStore.categories || [];
    if (taskCategory.value && !storeCategories.includes(taskCategory.value)) {
        return [...storeCategories, taskCategory.value];
    }
    return storeCategories;
})

const taskName = ref('')
const taskCategory = ref()
const newCategory = ref('')

const timeout = ref(2000)
const formRef = ref(null)

const isDuplicateTask = computed(() => {
    if (!taskName.value || !taskName.value.trim() || !taskCategory.value) return false
    return !!tasks.value.find((t) => t.category === taskCategory.value && t.name.trim() === taskName.value.trim())
})

const isButtonEnabled = computed(() => {
    return taskName.value.trim() && taskCategory.value && !isDuplicateTask.value
})

watch(taskCategory, (val) => {
  if (!formRef.value) return;
  if (val === null || val === undefined || val === '') {
    formRef.value.resetValidation();
  } else {
    formRef.value.validate();
  }
})

function saveCategory() {
    const name = newCategory.value.trim();
    if (name !== '') {
        emit('category-added', name);
        taskCategory.value = name;
        newCategory.value = ''
    }
}

function addTask() {
    emit('task-added', taskName.value, taskCategory.value)
    message.value = true
    taskCategory.value = null;
    taskName.value = ''
    if (formRef.value) {
        formRef.value.resetValidation();
    }
}
</script>

<style lang="scss" scoped></style>