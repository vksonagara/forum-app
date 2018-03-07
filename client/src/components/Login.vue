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
		      <li class="text-sm-left" v-for="error in errors" :key="error.msg">{{ error.msg }}</li class="text-left">
		    </v-alert>
		    <v-alert color="success" :value="isSubmitted && !isError">
		      <p>{{ success }}</p>
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
			errors: null,
			isError: false,
			success: null,
			isSubmitted: false
		}
	},
	methods: {
		login() {
			var data = this
			data.isSubmitted = true
			AuthServices.login(this.user, function(response) {
				if(response.data.errors) {
					data.errors = response.data.errors
					data.isError = true
					data.user.email = null
					data.user.password = null
				}
				else {
					data.success = "User logged in successfully with id: " + response.data.email
					data.isError = false
					data.user.email = null
					data.user.password = null
				}
			})	
		}
	}
}
</script>

<style scoped>
	
</style>