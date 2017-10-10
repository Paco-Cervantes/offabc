<template>
	<div class="col-md-9">
        <authors-form @create-author="createAuthor"></authors-form>

        <authors-list :authors="authors" @delete-author="deleteAuthor"></authors-list>
    </div>
</template>

<script>
    export default {
        components: {
            'authors-list': require('../components/AuthorsList'),
            'authors-form': require('../components/AuthorsForm')
        },

        data() {
            return {
                authors: null,
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

            createAuthor(author) {
                this.authors.push(author);
            },

            deleteAuthor(author) {
                this.authors.splice(this.authors.indexOf(author), 1);
            },

            fetchData() {
                Store.authors.getAll().then(authors => {
                    this.authors = authors;
                }, this.errorHandler);
            },

            errorHandler(error) {
                console.error("Error: " + error);
            }

        }
    }
</script>
