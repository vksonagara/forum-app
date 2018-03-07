import axios from 'axios'

export default {

	register(credentials, callback) {
		axios.post('http://localhost:8081/register', credentials)
		.then(function(response) {
			callback(response)
		})
		.catch(function(err) {
			console.log(err)
		})
	},

	login(credentials, callback) {
		axios.post('http://localhost:8081/login', credentials)
		.then(function(response) {
			callback(response)
		})
		.catch(function(err) {
			console.log(err)
		})
	}

}
