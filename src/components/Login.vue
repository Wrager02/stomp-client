<template>
  <div class="login">
    <div class="login-form">
      <h1 class="headline">Willkomen!</h1>
      <div class="login-group">
        <div class="input-group">
          <label for="login-input">Wie möchtest du heißen?</label>
          <input autofocus id="login-input" v-model="username" type="text" placeholder="Benutzername" @keypress.enter="setUsername">
        </div>
        <button id="login-button" @click="setUsername">Los</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: ""
    }
  },
  methods: {
    setUsername() {
      if (this.username.length) {
        this.$store.commit('setUsername', {username: this.username});
        this.$router.push('/chat');
      }
    }
  }
}
</script>

<style scoped>
.headline {
  font-size: 1.8rem;
}

.login {
  background-color: #2C2F33;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 30%;
  height: 70%;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 3rem;
  padding: 3%;

  background-color: #23272a;

  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0 0 19px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 19px 1px rgba(0, 0, 0, 0.75);
}

.login-group {
  margin-top: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
}

.input-group {
  display: flex;
  flex-direction: column;
}

#login-input {
  margin-top: 0.5em;
  outline: 0;
  height: 3rem;
  border-radius: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  border: 3px #7289da solid;
  color: #7289da;
}

#login-button {
  outline: 0;
  height: 3rem;
  border-radius: 1.5rem;
  border: 3px #7289da solid;
  color: #7289da;
  transition: 0.2s ease;
}

#login-button:hover {
  background-color: #7289da;
  color: white;
}
</style>