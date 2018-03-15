import axios from 'axios'

export default {
	register(credentials, callback) {
		axios.post('http://localhost:8081/register', credentials)
		.then(function(res) {
			callback(null, res)
		})
		.catch(function(err) {
			callback(err)
		})
	},
	login(credentials, callback) {
		axios.post('http://localhost:8081/login', credentials)
		.then(function(res) {
			callback(null, res)
		})
		.catch(function(err) {
			callback(err)
		})
	}
}
