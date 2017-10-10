<style>
    .AuthorsList ul {
        list-style: none;
        padding: 0;
    }

    .AuthorsList ul li {
        padding: 15px 10px;
        border-bottom: 1px solid #ccc;
    }
</style>

<template>
    <div class="AuthorsList">
        <p v-if="loading" class="text-muted">
            Loading...
        </p>
        <div v-else class="panel panel-default">
            <div class="panel-heading">Authors list</div>

            <div class="panel-body">
                <ul>
                    <li v-for="author in authors">
                        {{ author.name }}
                        <button class="btn btn-xs btn-danger pull-right" @click="deleteAuthor(author)">Delete</button>
                    </li>
                </ul>
                <p v-if="authors.length == 0" class="text-muted">There are no authors in the database.</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['authors'],

        computed: {

            loading() {
                return this.authors == null;
            }

        },

        methods: {

            deleteAuthor(author) {
                Store.authors.delete(author).then(() => {
                    this.$emit('delete-author', author);
                }, error => {
                    console.log("Error: " + error);
                });
            }
        }
    }
</script>