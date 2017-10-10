<template>
	<div class="col-md-9">
        <todo-list :todos="todos" @create-todo="createTodo" @delete-todo="deleteTodo"></todo-list>
    </div>
</template>

<script>
    export default {
        components: {
            'todo-list': require('../components/TodoList')
        },

        data() {
            return {
                todos: null
            };
        },

        created() {
            Store.refresh = this.fetchData;
            this.fetchData();
        },

        watch: {
            '$route': 'fetchData'
        },

        methods: {

            createTodo(todo) {
                this.todos.push(todo);
            },

            deleteTodo(todo) {
                this.todos.splice(this.todos.indexOf(todo), 1);
            },

            fetchData() {
                Store.todos.getAll().then(todos => {
                    this.todos = todos;
                }, this.errorHandler);
            },

            errorHandler(error) {
                console.error("Error: " + error);
            },

        }
    }
</script>
