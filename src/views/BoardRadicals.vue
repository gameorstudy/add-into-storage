<template>
  <div class="view">
    <div class="group-box">
      <ul class="first">
        <li class="first" v-for="(group, index) in groups" :key="index">
          {{ group.radical }}
          <ul class="second">
            <li
              class="second"
              v-for="(word, index) in group.words"
              :key="index"
              @click="addIntoGroup(word.word, group.radical, word.id)"
            >
              {{ word.word }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="cell-box">
      <transition-group name="bloom">
        <div class="cell" v-for="(word, index) in showWords" :key="index">
          <label>word:</label>
          <span>{{ word.word }}</span>
          <label>radical:</label>
          <span>{{ word.radical }}</span>
          <button class="remove" @click="deleteWord(word.id)">delete</button>
        </div>
      </transition-group>
    </div>
    <div class="notification-box">
      <NotificationContainer
        v-for="(msg, index) in notification"
        :key="index"
        :msg="msg"
      >
      </NotificationContainer>
    </div>
  </div>
</template>

<script>
// import Velocity from 'velocity-animate'

import NotificationContainer from '@/components/NotificationContainer'
import { mapState } from 'vuex'

export default {
  components: {
    NotificationContainer
  },
  data() {
    return {
      msg: 'The word has already existed.',
      notificationActive: false
    }
  },
  computed: mapState(['groups', 'showWords', 'notification']),
  methods: {
    addIntoGroup(word, radical, id) {
      this.notificationActive = false
      this.check_duplication(id)
      if (!this.notificationActive) {
        this.$store.commit('ADD_INTO_GROUP', { word, radical, id })
      }
    },
    check_duplication(id) {
      for (const group of this.showWords) {
        if (id === group['id']) {
          this.$store.commit('ADD_NOTIFICATION', this.msg)
          this.notificationActive = true
        }
      }
    },
    deleteWord(id) {
      this.$store.commit('DELETE_WORD', id)
    }
  },
  created() {
    this.$store.dispatch('fetchGroups')
  }
  // leave(el, done) {
  //   Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
  //   Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
  //   Velocity(
  //     el,
  //     { rotateZ: '45deg', translateY: '30px', translateX: '30px', opacity: 0 },
  //     { complete: done }
  //   )
  // }
}
</script>

<style scoped>
@media screen and (max-width: 633px) {
  .view {
    @apply w-150 m-0 border-none flex justify-start;
  }
}

@media screen and (min-width: 631px) {
  .view {
    @apply w-full m-0 border-none;
  }
}

.view {
  @apply mt-8;
}

.group-box {
  @apply border-none my-4 flex justify-center items-center w-150 mx-auto;
}

ul.first {
  @apply w-32 h-12 border-none h-auto;
  font-family: 'Kaiti';
}

ul.first > li.first {
  @apply border-solid border-blue-500 border-r border-l text-xl text-gray-700 leading-12 text-center box-border;
  position: relative;
}

ul.first > li.first::before {
  content: '';
  position: absolute;
  left: 100%;
  top: 0.75rem;
  width: 0;
  height: 0;
  border-top: 0.5rem solid transparent;
  border-bottom: 0.5rem solid transparent;
  border-right: 0.5rem solid mistyrose;
  visibility: hidden;
}

ul.first > li.first:nth-child(1) {
  @apply border-t border-b rounded-t-lg;
}

ul.first > li.first:not(:nth-child(1)) {
  @apply border-b;
}

ul.first > li.first:hover {
  @apply border-none bg-green-300 text-snow;
}

ul.first > li.first:hover::before {
  visibility: visible;
}

ul.first > li.first:hover ul.second {
  visibility: visible;
}

ul.second {
  @apply w-20;
  position: absolute;
  top: 0;
  left: 8.5rem;
  visibility: hidden;
}

ul.second li.second {
  @apply h-12 m-0 text-lime text-center leading-12 text-xl bg-mistyRose_a border-solid border-mistyRose_a border-r border-l cursor-pointer;
}

ul.second li.second:nth-child(1) {
  @apply rounded-t-lg border-t border-b;
}

ul.second li.second:not(:nth-child(1)) {
  @apply border-b;
}

ul.second li.second:last-child {
  @apply rounded-b-lg border-b;
}

ul.second li.second:hover {
  @apply bg-snow text-black border-teal-500;
}

.cell-box {
  @apply w-150 h-auto mt-8 mx-auto;
}

.cell {
  @apply w-70 h-12 mx-auto border-b border-gray-500 my-0 flex justify-between px-1;
}

.cell span,
label {
  @apply text-center leading-12 text-black;
}

.cell label {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cell span {
  font-family: 'Kaiti';
}

.remove {
  @apply w-auto h-8 bg-gray-500 text-sm my-auto text-white font-bold py-1 px-2 rounded;
}

.remove:hover {
  @apply bg-gray-700;
}

.bloom-enter-active {
  opacity: 1;
  transform: translateY(10px);
}

.bloom-enter {
  transition: all ease-out 1.2s;
}

.notification-box {
  @apply w-80 h-auto mt-8 pr-4 mx-auto fixed bottom-0 right-0;
}
</style>
