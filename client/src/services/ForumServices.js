import axios from 'axios'
import app from '../main'

export default {
	getAll(callback) {
		axios.get('http://localhost:8081/forums')
		.then(function(res) {
			callback(null, res)
		})
		.catch(function(err) {
			callback(err)
		})
	},
	get(id, callback) {
		axios.get('http://localhost:8081/forums/'+id)
		.then(function(res) {
			callback(null, res)
		})
		.catch(function(err) {
			callback(err)
		})
	},
	create(data, callback) {
		axios({
			method: 'post',
			url: 'http://localhost:8081/forums/create',
			headers: {
				'Authorization': 'Bearer ' + app.$store.state.token
			},
			data: {
				title: data.title,
				description: data.description
			}
		})
		.then(function(response) {
			callback(null, response)
		})
		.catch(function(err) {
			callback(err)
		})
	}
}
