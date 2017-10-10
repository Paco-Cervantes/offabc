<template>
    <div class="col-md-9">
        <div class="panel panel-default">
            <div class="panel-heading">Books list</div>

            <div class="panel-body">
                <p><router-link to="books/create">Add a new book</router-link></p>

                <books-list :books="books"></books-list>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        components: {
            'books-list': require('../../components/BooksList')
        },

        data() {
            return {
                books: null,
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
            fetchData() {
                Store.books.getAll().then(books => {
                    this.books = books;
                }, this.errorHandler);
            },

            errorHandler(error) {
                console.error("Error: " + error);
            }
        }

    }
</script>