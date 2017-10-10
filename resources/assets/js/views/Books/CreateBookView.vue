<template>
    <div class="col-md-9">
        <h2 style="margin-top: 0">Create Book</h2>

        <form @submit.prevent="createBook">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="form-group">
                        <label class="control-label">ISBN:</label>
                        <input class="form-control" type="text" v-model="book.isbn">
                    </div>
                    <div class="form-group">
                        <label class="control-label">Name:</label>
                        <input class="form-control" type="text" v-model="book.name">
                    </div>
                    <div class="form-group">
                        <label class="control-label">Description:</label>
                        <textarea class="form-control" v-model="book.description"></textarea>
                    </div>
                </div>
                <div class="panel-footer">
                    <p class="text-right">
                        <router-link to="/books" exact style="margin: 0 15px">Go Back</router-link>
                        <button type="submit" class="btn btn-primary">Add</button>
                    </p>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {

    data() {
        return {
            book: {
                isbn: '',
                name: '',
                description: '',
            }
        };
    },

    methods: {

        createBook() {
            Store.books.create(this.book).then(book => {
                this.$emit('create-book', book);
            }, error => {
                console.error("Error: " + error);
            });
            this.book = {
                isbn: '',
                name: '',
                description: '',
            };
        }

    }
}
</script>