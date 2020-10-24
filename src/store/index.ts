import { createStore } from 'vuex'

export interface State {
  name: string;
  cards: any[];
}
const state: State = {
  name: 'Test Vuex',
  cards: []
}
export default createStore({
  state,
  mutations: {
    changeName: (state, name) => {
      state.name = name;
    },
    setCards: (state, cards) => {
      state.cards = cards;
    }
  },
  actions: {
  },
  modules: {
  }
})
