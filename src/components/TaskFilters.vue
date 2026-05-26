<template>
    <v-card elevated hover class="pa-5 mt-5 ml-10 mr-10">
        <v-card-title>Filter tasks</v-card-title>
        <v-card-actions>
            <v-text-field label="Search" placeholder="Search tasks..." variant="underlined" v-model="search">
            </v-text-field>
            <v-select label="Filter by category" placeholder="Select category" variant="underlined"
                :items="['All categories', ...categories]" v-model="categoryFilter">
            </v-select>
        </v-card-actions>

    </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/TaskStore.js'

const taskStore = useTaskStore();
const categories = computed(() => taskStore.categories)
const { categoryFilter, search } = storeToRefs(taskStore);

</script>

<style lang="scss" scoped></style>