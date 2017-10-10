module.exports = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/todos').then(response => {
                let todos = response.data;
                DB.updateAll('todos', todos);
                resolve(todos);
            }, error => {
                DB.getAll('todos').then(todos => {
                    resolve(todos);
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
                axios.post('/api/todos', data).then(response => {
                    let todo = response.data;
                    if (! isRetry) {
                        DB.insert('todos', todo);
                    } else {
                       DB.replace('todos', data.id, todo); 
                    }
                    resolve(todo);
                }, error => {
                    if (! isRetry) {
                        let id = (new Date).getTime();
                        data.id = id;
                        data._draft = true;
                        DB.insert('todos', data).then(() => {
                            Store.push({
                                store: 'todos',
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

    update: (todo, isRetry) => {
        return new Promise((resolve, reject) => {
            if (todo._deleted) {
                resolve();
            } else {
                axios.put('/api/todos/' + todo.id, todo).then(response => {
                    let todo = response.data;
                    DB.update('todos', todo);
                    resolve(todo);
                }, error => {
                    if (! isRetry) {
                        DB.update('todos', todo).then(() => {
                            if (! todo._draft) {
                                Store.push({
                                    store: 'todos',
                                    action: 'update',
                                    data: todo
                                });
                            }

                            resolve(todo);
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

    delete: (todo, isRetry) => {
        return new Promise((resolve, reject) => {
            axios.delete('/api/todos/' + todo.id).then(response => {
                DB.delete('todos', todo.id);
                resolve();
            }, error => {
                if (! isRetry) {
                    DB.delete('todos', todo.id).then(() => {
                        if (! todo._draft) {
                            Store.push({
                                store: 'todos',
                                action: 'delete',
                                data: todo
                            });
                        } else {
                            todo._deleted = true;
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