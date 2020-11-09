<template>
  <div class="message" v-bind:class="changeAlignment()">

    <p class="publisher">{{ message.username }}</p>
    <div class="message-body">
      <p class="text">{{ message.text }}</p>
      <p class="time">{{
          new Date(message.timestamp).toLocaleString('de-AT', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    message: Object
  },
  methods: {
    changeAlignment() {
      if (this.message.uuid === this.$store.getters.getUuid) {
        return "own"
      }
    }
  }
}
</script>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  padding: 0.5%;
  margin: 0.5%;
  background-color: #99aab5;
  width: 80%;

  border-radius: 0.5rem;

  font-weight: normal;
}

.message-body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.time {
  font-weight: 300;
  font-size: 0.8rem;
  align-self: flex-end;
}

.own {
  background-color: #7289da;
}

.publisher {
  font-weight: 600;
  margin-bottom: 0.2rem;
}
</style>