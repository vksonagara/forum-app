<template>
	<v-flex xs6 offset-xs3>
		<div class="white elevation-2">
			<v-toolbar flat dark color="cyan">
				<v-toolbar-title>
					Login
				</v-toolbar-title>
			</v-toolbar>
			<v-flex class="pl-4 pr-4 pt-4 pb-4">
				<v-text-field
			          label="Email"
			          v-model="user.email"
			          type="email"
			    ></v-text-field>
			    <v-text-field
			          label="Password"
			          v-model="user.password"
			          type="password"
			    ></v-text-field>
			    <v-btn color="cyan" dark @click="login">Login</v-btn>
			</v-flex>
			<v-alert color="error" :value="isError">
		      {{ error }}
		    </v-alert>
		</div>
	</v-flex>
</template>

<script>
import AuthServices from '@/services/AuthServices'

export default {
	data() {
		return {
			user: {
				email: null,
				password: null
			},
			error: null,
			isError: false,
			isSubmitted: false
		}
	},
	methods: {
		login() {
			var vm = this
			vm.isSubmitted = true
			AuthServices.login(this.user, function(err, res) {
				if(err) {
					vm.error = 'Incorrect credentials!'
					vm.isError = true
					vm.user.email = null
					vm.user.password = null
				}
				else {
					vm.$store.commit('setToken', res.data.token)
					vm.$store.commit('logUser')
					vm.$router.push('/')
				}
			})	
		}
	},
	computed: {
		token() {
			return this.$store.state.token;
		}
	},
	created() {
		if(this.$store.state.isLoggedIn) {
			this.$router.push('/')
		}
	}
}
</script>

<style scoped>
	
</style>
