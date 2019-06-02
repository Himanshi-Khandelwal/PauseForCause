import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import firebase from 'firebase'

import VueApollo from "vue-apollo";

import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueQRCodeComponent from 'vue-qrcode-component'
Vue.component('qr-code', VueQRCodeComponent)

 Vue.use(VueApollo);

Vue.config.productionTip = false
const getHeaders = () => {
  const headers = {};
   const token = window.localStorage.getItem('apollo-token');
   if (token) {
     headers.authorization = `Bearer ${token}`;
   }
   return headers;
 };
 // Create an http link:
 const link = new HttpLink({
   uri: 'https://pauseforcause.herokuapp.com/v1/graphql',
   fetch,
   headers: getHeaders()
 });
 const client = new ApolloClient({
   link: link,
   cache: new InMemoryCache({
     addTypename: true
   })
 });

 const apolloProvider = new VueApollo({
  defaultClient: client,
})

let app = '';

const config = {
  apiKey: "AIzaSyC9esMn7nKGVYK0cGYk9KyY0Y_T9a78OxA",
  authDomain: "authentication-2d44d.firebaseapp.com",
  databaseURL: "https://authentication-2d44d.firebaseio.com",
  projectId: "authentication-2d44d",
  storageBucket: "authentication-2d44d.appspot.com",
  messagingSenderId: "187523728989"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      apolloProvider,
      render: h => h(App)
    }).$mount('#app');
  }
});
