import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import Element from 'element-ui'
// import './styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)
// Vue.use(Element, { size: 'small', zIndex: 3000 });
const firebaseConfig =  {
  apiKey: "AIzaSyBW3N7a81iLPL5PsN1cMMpmtQTrh4FNJbc",
    authDomain: "testadmin-26058.firebaseapp.com",
    databaseURL: "https://testadmin-26058.firebaseio.com",
    projectId: "testadmin-26058",
    storageBucket: "testadmin-26058.appspot.com",
    messagingSenderId: "411396069240",
    appId: "1:411396069240:web:faebb8c0921cdbee"
}
Vue.prototype.$firebase = firebase.initializeApp(firebaseConfig);

new Vue({
  el: '#app',
  render: h => h(App)
})
