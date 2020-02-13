import Vue from 'vue'
import Vuex from 'vuex'
import service from '@/services/service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    groups: [],
    words: [],
    showWords: [],
    notification: [],
    nextId: 0,
    searchList: []
  },
  mutations: {
    ADD_GROUP(state, group) {
      state.words.push(group)
    },
    SET_GROUPS(state, groups) {
      state.groups = groups
    },
    ADD_INTO_GROUP(state, {
      word,
      radical,
      id
    }) {
      let wordObj = {}
      wordObj['word'] = word
      wordObj['radical'] = radical
      wordObj['id'] = id
      state.showWords.push(wordObj)
    },
    ADD_NOTIFICATION(state, notifi) {
      state.notification.push({
        notifi,
        id: state.nextId++
      })
    },
    DELETE_NOTIFICATION(state, notificationToRemove) {
      state.notification = state.notification.filter(
        notification => notification.id !== notificationToRemove.id
      )
    },
    DELETE_WORD(state, id) {
      state.showWords = state.showWords.filter(word => word.id !== id)
    },
    ADD_RESULT(state, result) {
      state.searchList.push(result)
    }
  },
  actions: {
    fetchGroups({
      commit
    }) {
      service
        .getGroups()
        .then(response => {
          commit('SET_GROUPS', response.data)
        })
        .catch(error => console.log(error))
    },
    addResult({
      state,
      commit
    }, input) {
      state.searchList = []
      for (const word of state.showWords) {
        if (input === word.word || input === word.radical) {
          let result = {}
          result['word'] = word.word
          result['radical'] = word.radical
          commit('ADD_RESULT', result)
        }
      }
      if (!state.searchList.length) {
        state.searchList.push('No result')
      }
    }
  },
  modules: {}
})