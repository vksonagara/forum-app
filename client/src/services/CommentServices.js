import axios from 'axios'
import app from '../main'

export default {
	getForumComments(forumId, callback) {
		axios({
			method: 'get',
			url: 'http://localhost:8081/comments/' + forumId,
		})
		.then((resposne) => {
			callback(null, resposne.data)
		})
		.catch((err) => {
			callback(err)
		})
	},
	create(forumId, comment, callback) {
		axios({
			method: 'post',
			url: 'http://localhost:8081/comments/create',
			headers: {
				'Authorization': 'Bearer ' + app.$store.state.token
			},
			data: {
				forum_id: forumId,
				comment_text: comment
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
