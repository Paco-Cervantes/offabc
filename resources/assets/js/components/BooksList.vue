<template>
    <div>
        <p v-if="loading" class="text-muted">
            Loading...
        </p>
        <div v-else class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ISBN</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="book in books">
                        <td>{{ book.isbn }}</td>
                        <td>{{ book.name }}</td>
                        <td>{{ book.description }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {

        props: ['books'],

        computed: {
            loading() {
                return this.books == null;
            }
        }
        
    }
</script>