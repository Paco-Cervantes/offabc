<template>
    <div class="panel panel-default">
        <div class="panel-heading">Add Author</div>

        <div class="panel-body">
            <div class="form-group">
                <div class="row">
                    <div class="col-md-4">
                        <input type="text" class="form-control" v-model="name">
                    </div>
                    <div class="col-md-2">
                        <button :class="{ 'disabled' : ! name }" class="btn btn-primary" @click="createAuthor">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                name: '',
            };
        },

        methods: {

            createAuthor() {
                if (! this.name) return;

                Store.authors.create({ name: this.name }).then(author => {
                    this.$emit('create-author', author);
                }, error => {
                    console.error("Error: " + error);
                });
                this.name = '';
            }
            
        }

    }
</script>