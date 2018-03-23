import axios from 'axios'
import app from '../main'

export default {
	create(title, forumId, callback) {
		axios({
			method: 'post',
			url: 'http://localhost:8081/bookmarks/create',
			headers: {
				'Authorization': 'Bearer ' + app.$store.state.token
			},
			data: {
				title,
				forumId
			}
		})
		.then((res) => {
			callback(null, res.data)
		})
		.catch((err) => {
			callback(err)
		})
	},
	get(callback) {
		axios({
			method: 'get',
			url: 'http://localhost:8081/bookmarks',
			headers: {
				'Authorization': 'Bearer ' + app.$store.state.token
			}
		})
		.then((res) => {
			callback(null, res.data)
		})
		.catch((err) => {
			callback(err)
		})
	},
	delete(bookmarkId, callback) {
		axios({
			method: 'delete',
			url: 'http://localhost:8081/bookmarks/delete',
			headers: {
				'Authorization': 'Bearer ' + app.$store.state.token
			},
			data: {
				bookmarkId
			}
		})
		.then((res) => {
			callback(null, res.data)
		})
		.catch((err) => {
			callback(err)
		})
	}
}
