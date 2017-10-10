require('./bootstrap');

const routes = [
	{ path: '/', component: require('./views/DashboardView') },
	{ path: '/dashboard', component: require('./views/DashboardView') },
	{ path: '/authors', component: require('./views/AuthorsView') },
	{ 
        path: '/books', 
        component: require('./views/BooksView'),
        children: [
            { path: '', component: require('./views/Books/ListBooksView') },
            { path: 'create', component: require('./views/Books/CreateBookView') },
        ]
    }
];

const router = new VueRouter({
	root: '/',
	mode: 'history',
	linkActiveClass: 'active',
	routes
});

const app = new Vue({
	router,

    data: {
        actions: Store.actions,
        loading: true,
    },

    created() {
        DB.open(() => {
            this.loading = false;
            Store.init();
        });
    }
}).$mount('#app');
