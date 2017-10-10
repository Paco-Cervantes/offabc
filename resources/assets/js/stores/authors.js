module.exports = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/authors').then(response => {
                let authors = response.data;
                DB.updateAll('authors', authors);
                resolve(authors);
            }, error => {
                DB.getAll('authors').then(authors => {
                    resolve(authors);
                }, error => {
                    reject(error);
                });
            });
        });
    },

    create: (data, isRetry) => {
        return new Promise((resolve, reject) => {
            if (data._deleted) {
                resolve();
            } else {
                axios.post('/api/authors', data).then(response => {
                    let author = response.data;
                    if (! isRetry) {
                        DB.insert('authors', author);
                    } else {
                       DB.replace('authors', data.id, author); 
                    }
                    resolve(author);
                }, error => {
                    if (! isRetry) {
                        let id = (new Date).getTime();
                        data.id = id;
                        data._draft = true;
                        DB.insert('authors', data).then(() => {
                            Store.push({
                                store: 'authors',
                                action: 'create',
                                data: data
                            });
                            resolve(data);
                        }, error => {
                            reject(error);
                        });
                    } else {
                        reject(error);
                    }
                });
            }
        });
    },

    update: (author, isRetry) => {
        return new Promise((resolve, reject) => {
            if (author._deleted) {
                resolve();
            } else {
                axios.put('/api/authors/' + author.id, author).then(response => {
                    let author = response.data;
                    DB.update('authors', author);
                    resolve(author);
                }, error => {
                    if (! isRetry) {
                        DB.update('authors', author).then(() => {
                            if (! author._draft) {
                                Store.push({
                                    store: 'authors',
                                    action: 'update',
                                    data: author
                                });
                            }

                            resolve(author);
                        }, error => {
                            reject(error);
                        });
                    } else {
                        reject(error);
                    }
                });
            }
        });
    },

    delete: (author, isRetry) => {
        return new Promise((resolve, reject) => {
            axios.delete('/api/authors/' + author.id).then(response => {
                DB.delete('authors', author.id);
                resolve();
            }, error => {
                if (! isRetry) {
                    DB.delete('authors', author.id).then(() => {
                        if (! author._draft) {
                            Store.push({
                                store: 'authors',
                                action: 'delete',
                                data: author
                            });
                        } else {
                            author._deleted = true;
                        }

                        resolve();
                    }, error => {
                        reject(error);
                    });
                } else {
                    reject(error);
                }
            });
        });
    },

};