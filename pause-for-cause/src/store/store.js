import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        userInfo: {},
        userLinks: [
          { icon: 'fas fa-tasks', text: 'All Tasks', route: '/user' },
          { icon: 'fas fa-tasks', text: 'My Tasks', route: '/userTasks' },
          { icon: 'fas fa-donate', text: 'NGOs', route: '/ngosList' },
          { icon: 'fas fa-donate', text: 'Transactions', route: '/transaction' },
          { icon: 'fas fa-donate', text: 'Map', route: '/map' },
        ],
        companyLinks: [
          { icon: 'fas fa-tasks', text: 'All Tasks', route: '/organization' },
          { icon: 'fas fa-donate', text: 'NGOs', route: '/ngosList' },
          { icon: 'fas fa-donate', text: 'Transactions', route: '/transaction' }
        ],
        links : [],
        ngoLinks : [
          { icon: 'fas fa-donate', text: 'Home', route: '/ngo' },
          { icon: 'fas fa-donate', text: 'Transactions', route: '/transaction' }
        ]
    }
});
