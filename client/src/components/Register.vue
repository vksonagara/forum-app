<template>
	<v-flex xs6 offset-xs3>
		<div class="white elevation-2">
			<v-toolbar flat dark color="cyan">
				<v-toolbar-title>
					Register
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
			    <v-btn color="cyan" dark @click="register">Register</v-btn>
			</v-flex>
			<v-alert color="error" :value="isError">
		      {{ error }}
		    </v-alert>
		    <v-alert color="success" :value="isSubmitted && !isError">
		      <p>{{ success }} - Now Login</p>
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
			success: null,
			isSubmitted: false,
		}
	},
	methods: {
		register() {
			var vm = this
			vm.isSubmitted = true
			AuthServices.register(this.user, function(err, res) {
				if(err) {
					vm.error = "Bad request!"
					vm.isError = true
					vm.user.email = null
					vm.user.password = null
				}
				else {
					vm.success = 'Registered Successfully!'
					vm.isError = false
					vm.user.email = null
					vm.user.password = null
				}
			})	
		}
	},
	computed: {
		count() {
			return this.$store.state.count;
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