<template>
    <div>
        <p v-if="loading" class="text-muted">
            Loading...
        </p>
        <div v-else class="panel panel-default">
            <div class="panel-heading">Todo list</div>

            <div class="panel-body">
                <div class="form-group">
                    <input class="form-control" type="text" v-model="todo" @keyup.enter="addTodo">
                </div>

                <ul style="padding: 0 5px 0 20px">
                    <todo-item v-for="todo in todos" :todo="todo" @delete-todo="deleteTodo"></todo-item>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['todos'],

        components: {
            'todo-item': require('./TodoItem')
        },

        data() {
            return {
                todo: ''
            };
        },

        computed: {
            loading() {
                return this.todos == null;
            },
        },

        methods: {
            addTodo() {
                Store.todos.create({ text: this.todo, done: false }).then(todo => {
                    this.$emit('create-todo', todo);
                }, error => {
                    console.error("Error: " + error);
                })
            },

            deleteTodo(todo) {
                this.$emit('delete-todo', todo);
            }
        }
    }
</script>