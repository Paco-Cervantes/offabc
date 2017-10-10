<template>
    <li style="margin: 5px 0;">
        {{ todo.text }}
        <span v-if="todo.done">&#10004;</span>
        <div class="pull-right">
            <button class="btn btn-xs btn-danger" @click="deleteTodo(todo)">Delete</button>
            <input type="checkbox" v-model="todo.done" @change="updateTodo">
        </div>
    </li>
</template>

<script>
    export default {
        props: ['todo'],

        methods: {
            updateTodo() {
                Store.todos.update(this.todo);
            },

            deleteTodo(todo) {
                Store.todos.delete(todo).then(() => {
                    this.$emit('delete-todo', todo);
                }, error => {
                    console.error("Error: " + error);
                });
            }
        }
    }
</script>