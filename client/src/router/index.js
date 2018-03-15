import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Forum from '@/components/Forum'
import createForum from '@/components/createForum'
import app from '../main'

Vue.use(Router)

const router =  new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/forum/:id',
			name: 'Forum',
			component: Forum
		},
		{
			path: '/forums/create',
			name: 'createForum',
			component: createForum,
			beforeEnter: (to, from, next) => {
				if(!app.$store.state.isLoggedIn) {
					next('/')
				} else {
					next()
				}
			}
		}
	]
})

export default router
