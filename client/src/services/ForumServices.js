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
	},
	getEmail(callback) {
		axios({
			method: 'get',
			url: 'http://localhost:8081/email',
			headers: {
				'Authorization': 'Bearer ' + app.$store.state.token
			}
		})
		.then(function(response) {
			callback(null, response)
		})
		.catch(function(err) {
			callback(err)
		})
	},
	getMyForums(callback) {
		axios({
			method: 'get',
			url: 'http://localhost:8081/me/forums',
			headers: {
				'Authorization': 'Bearer ' + app.$store.state.token
			}
		})
		.then(function(response) {
			callback(null, response)
		})
		.catch(function(err) {
			callback(err)
		})
	},
	update(data, callback) {
		axios({
			method: 'post',
			url: 'http://localhost:8081/forums/update',
			headers: {
				'Authorization': 'Bearer ' + app.$store.state.token
			},
			data: {
				id: data.id,
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
	},
	delete(id, callback) {
		axios({
			method: 'delete',
			url: 'http://localhost:8081/forums/delete',
			headers: {
				'Authorization': 'Bearer ' + app.$store.state.token
			},
			data: {
				id: id
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
