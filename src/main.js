import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUsersCog } from '@fortawesome/free-solid-svg-icons'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app'
import "@firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBjCoARz4iyw_Za3TJ74lSc-EK4aof5VWg",
  authDomain: "vue-clientpanel.firebaseapp.com",
  databaseURL: "https://vue-clientpanel.firebaseio.com",
  projectId: "vue-clientpanel",
  storageBucket: "vue-clientpanel.appspot.com",
  messagingSenderId: "556116117261",
  appId: "1:556116117261:web:03679e0ff70baad8351244"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faUsersCog)

Vue.config.productionTip = false

let app = null

// wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
export { timestamp }
export default firebaseApp.firestore()

