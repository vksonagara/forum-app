import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: null,
		isLoggedIn: false
	},
	mutations: {
		setToken(state, token) {
			state.token = token
		},
		logUser(state) {
			state.isLoggedIn = !state.isLoggedIn
		},
		unsetToken(state) {
			state.token = null
		}
	}
})
