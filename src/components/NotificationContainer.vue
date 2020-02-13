<template>
  <div class="notification-view">
    <p>
      {{ msg.notifi }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(this.deleteNotification, 5000)
  },
  methods: {
    deleteNotification() {
      this.$store.commit('DELETE_NOTIFICATION', this.msg)
    }
  },
  beforeDestory() {
    clearTimeout(this.timeout)
  }
}
</script>

<style scoped>
.notification-view {
  @apply w-full h-8 flex justify-end;
}

.notification-box p {
  @apply text-tomato_a leading-8;
}
</style>
