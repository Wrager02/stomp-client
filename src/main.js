import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App.vue'
import Chat from "./components/Chat";
import Login from "./components/Login";
import { Client } from '@stomp/stompjs';

Vue.use(Vuex);
Vue.use(VueRouter);

function getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getStompClient() {
    let stompClient;

    const stompConfig = {
        // Typically login, passcode and vhost
        // Adjust these for your broker
        connectHeaders: {
            login: "",
            passcode: ""
        },

        // Broker URL, should start with ws:// or wss:// - adjust for your broker setup
        brokerURL: "ws://localhost:8080/chat",

        // Keep it off for production, it can be quit verbose
        // Skip this key to disable
        debug: function (str) {
            console.log('STOMP: ' + str);
        },

        // If disconnected, it will retry after 200ms
        reconnectDelay: 200,

        // Subscriptions should be done inside onConnect as those need to reinstated when the broker reconnects
        onConnect: function () {
            // The return object has a method called `unsubscribe`
            stompClient.subscribe('/topic/messages', function (reply) {
                let message = JSON.parse(reply.body);
                store.commit('addMessage', {message: message})
            });
        }
    };

    // Create an instance
    stompClient = new Client(stompConfig);

    return stompClient
}

const store = new Vuex.Store({
    state: {
        username: "",
        uuid: getUuid(),
        messages: [],
        client: getStompClient()
    },
    mutations: {
        setUsername(state, payload) {
            state.username = payload.username
        },
        logout(state) {
            state.username = "";
            state.uuid = getUuid();
        },
        sendMessage(state, payload) {
            state.client.publish({
                destination: '/topic/messages',
                body: JSON.stringify({
                    text: payload.text,
                    username: state.username,
                    uuid: state.uuid,
                    timestamp: Date.now()
                })
            });
        },
        addMessage(state, payload) {
            console.log(payload.message)
            state.messages.push(payload.message)
        }
    },
    getters: {
        getUsername(state) {
            return state.username
        },
        getUuid(state) {
            return state.uuid
        },
        getMessages(state) {
            return state.messages
        }
    }
});

store.state.client.activate();


const routes = [
    {
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        component: Login
    }, {
        path: '/chat',
        component: Chat
    }
]

const router = new VueRouter({
    routes
});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')