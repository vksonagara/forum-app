import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Forum from '@/components/Forum'
import createForum from '@/components/createForum'
import app from '../main'
import Profile from '@/components/Profile'
import updateForum from '@/components/updateForum'

Vue.use(Router)

const router =  new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			children: [
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
							next('/login')
						} else {
							next()
						}
					}
				},
				{
					path: '/forums/update/:id',
					name: 'updateForum',
					component: updateForum,
					beforeEnter: (to, from, next) => {
						if(!app.$store.state.isLoggedIn) {
							next('/login')
						} else {
							next()
						}
					}
				}
			]
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
			path: '/profile',
			name: 'Profile',
			component: Profile,
			beforeEnter: (to, from, next) => {
				if(!app.$store.state.isLoggedIn) {
					next('/login')
				} else {
					next()
				}
			}
		}
	]
})

export default router
