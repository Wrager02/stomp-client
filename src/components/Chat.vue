<template>
  <div class="chat">
    <div class="header">
      <div class="dummy"></div>
      <h1>Willkommen {{username}}!</h1>
      <button class="logout" @click="logout"><i class="fas fa-sign-out-alt"></i></button>
    </div>
    <div class="messages">
      <message v-for="m in messages" :key="m.timestamp" :message="m"></message>
    </div>
    <div class="input">
      <input id="message-input" type="text" v-model="message" required placeholder="Nachricht"
             @keypress.enter="sendMessage">
      <button id="message-button"><i class="fas fa-paper-plane" @click="sendMessage"></i></button>
    </div>
  </div>
</template>

<script>
import Message from "@/components/Message";

export default {

  name: "Chat",
  components: {
    Message
  },
  data() {
    return {
      message: "",
      username: this.$store.getters.getUsername
    }
  },
  computed: {
    messages() {
      return this.$store.getters.getMessages
    }
  },
  methods: {
    sendMessage() {
      if (this.message.length) {
        this.$store.commit('sendMessage', {text: this.message})
        this.message = "";
      }
    },
    logout() {
      this.$store.commit('logout');
      this.$router.push('/login')
    }
  },
  created() {
    if (!this.username.length) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: #23272a;

  justify-content: space-between;

  padding: 1%;

  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0 0 19px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 19px 1px rgba(0, 0, 0, 0.75);

  font-size: 1.5rem;
}

.logout {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.5rem;
  color: white;
  justify-self: flex-start;
  align-self: flex-end;
  transition: 0.2s ease;
}

.logout:hover {
  color: #7289da;
}

.chat {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #2C2F33;
}

.input {
  background-color: #23272a;

  padding: 1%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0 0 19px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 19px 1px rgba(0, 0, 0, 0.75);
}

.messages {
  display: flex;
  flex-direction: column;
  align-items: center;

  flex-grow: 1;
  margin: 1% 0 1% 0;
  overflow: auto;
}

#message-input {
  flex-grow: 1;
  outline: 0;
  height: 3rem;
  border-radius: 1.5rem;
  padding-left: 1.5rem;
  border: 3px #99aab5 solid;
  color: #7289da;
  transition: 0.2s ease;
}

#message-input:active, #message-input:focus {
  border-color: #7289da;
}

#message-button {
  display: flex;
  justify-content: center;
  align-items: center;

  outline: 0;
  margin-left: 1%;
  height: 3rem;
  width: 3rem;
  border-radius: 1.5rem;
  border: 3px #7289da solid;
  color: #7289da;
  transition: 0.2s ease;
}

#message-button:hover {
  background-color: #7289da;
  color: white;
}

#message-button:active {
  transform: scale(1.1);
}

.messages::-webkit-scrollbar {
  width: 1rem;
  margin-left: 5%;
}

.messages::-webkit-scrollbar-track {
  background: #23272a;
  border-radius: 0.5rem;
}

.messages::-webkit-scrollbar-thumb {
  background-color: #7289da;
  border-radius: 0.5rem;
}

</style>