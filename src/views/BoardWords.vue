<template>
  <div class="view">
    <div class="searchBox">
      <input
        type="text"
        class="search"
        placeholder="e.g. search word or radical"
        @input="showResult"
        @blur="checkEmpty"
        v-model="value"
      />
      <ul class="search-list" v-if="show">
        <li
          v-for="(value, index) in searchList"
          :key="index"
          @click="display(value)"
        >
          <template v-if="value.radical">
            <span>
              {{ value.radical }}
            </span>
            <span>
              {{ value.word }}
            </span>
          </template>
          <template v-else>
            <span>
              {{ value }}
            </span>
          </template>
        </li>
      </ul>
    </div>
    <div class="result-box">
      <div class="result-view" v-for="(res, index) in result" :key="index">
        <label>Radical: </label>
        <span> {{ res.radical }} </span>
        <label>Word: </label>
        <span> {{ res.word }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      value: '',
      show: false,
      result: []
    }
  },
  computed: mapState(['searchList']),
  methods: {
    showResult() {
      this.show = true
      this.$store.dispatch('addResult', this.value)
    },
    checkEmpty() {
      if (!this.value) {
        this.show = false
      }
    },
    display(value) {
      if (value.radical) {
        let res = {}
        res['radical'] = value.radical
        res['word'] = value.word
        this.result.push(res)
      }
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 599px) {
  .view {
    @apply w-full;
  }
}

@media screen and (max-width: 601px) {
  .view {
    @apply w-150 flex justify-start;
  }
}

.view {
  @apply mt-8;
}

.searchBox {
  @apply w-150 h-auto mx-auto my-0 flex justify-center relative;
}

.search {
  @apply w-96 h-12 pl-2 py-4 text-base bg-transparent border rounded-lg border-gray-500 outline-none block box-border;
}

ul.search-list {
  @apply w-32 h-auto absolute;
  left: 6.75rem;
  top: 3rem;
}

ul.search-list li {
  @apply h-9 border border-blue-500 pl-2 py-1 flex justify-around items-center cursor-pointer;
}

ul.search-list li span {
  @apply text-base p-0 m-0;
}

.result-box {
  @apply w-150 h-auto mx-auto mt-48;
}

.result-view {
  @apply w-96 h-12 flex justify-between border-b border-gray-500 mx-auto;
}

.result-view label,
span {
  @apply leading-12 text-lg;
}
</style>
