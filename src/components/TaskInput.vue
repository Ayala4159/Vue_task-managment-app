<template>
    <v-card elevated hover class="pa-5 mt-10 ml-10 mr-10">
        <v-card-title class="ml-15">Add new task</v-card-title>
        <v-card-actions class="d-flex justify-center">
            <v-text-field       
                :rules="[rules.required]"
                label="Task name"
                placeholder="Enter task name"
                max-width="25%"
                variant="underlined"
                v-model="taskName">
            </v-text-field>

            <v-select
                :rules="[rules.required]"
                label="Category"
                placeholder="Select category"
                max-width="25%"
                variant="underlined"
                :items="[...categories]"
                v-model="taskCategory">
                <template v-slot:append-item>
                    <v-text-field       
                        class="ml-2 mr-2"
                        label="New category"
                        placeholder="Enter new category"
                        variant="underlined"
                        v-model="newCategory"
                        @blur="saveCategory">
                    </v-text-field>
                </template>
            </v-select>

            <v-btn
                elevated
                prepend-icon="mdi-plus"
                class="bg-cyan-darken-2 w-25"
                @click="console.log('click')"
                :disabled="!isTaskValid"
            >
            Add
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { ref,computed } from 'vue';
export default {
    name: 'TaskInput',
    props: {
        categories:Array,
        tasks:Array
    },
    setup(props,{ emit }) {
        const rules = {
            required: value => !!value || 'Field is required',
        }
        const taskName=ref('')
        const taskCategory=ref()
        const newCategory=ref('')
        const isTaskValid = computed(() => {
            //chekout if exist that name in that category, if it- show match message
            console.log(props.tasks);
            
            return taskName.value.trim() && taskCategory.value
        })
        function saveCategory() {
            const name = newCategory.value.trim()
            if (name !== '') {
                emit('category-added', name)
                taskCategory.value = name
                newCategory.value = ''
            }
        }
        return {
            rules,taskName,taskCategory,isTaskValid,newCategory,saveCategory
        }
    },
    

}
</script>

<style lang="scss" scoped></style>