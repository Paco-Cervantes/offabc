module.exports = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            axios.get('/api/books').then(response => {
                let books = response.data;
                DB.updateAll('books', books);
                resolve(books);
            }, error => {
                DB.getAll('books').then(books => {
                    resolve(books);
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
                axios.post('/api/books', data).then(response => {
                    let book = response.data;
                    if (! isRetry) {
                        DB.insert('books', book);
                    } else {
                       DB.replace('books', data.id, book); 
                    }
                    resolve(book);
                }, error => {
                    if (! isRetry) {
                        let id = (new Date).getTime();
                        data.id = id;
                        data._draft = true;
                        DB.insert('books', data).then(() => {
                            Store.push({
                                store: 'books',
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

};