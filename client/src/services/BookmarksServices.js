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
	}
}
