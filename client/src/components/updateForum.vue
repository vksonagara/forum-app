<template>
	<v-flex xs8 offset-xs2>
    <div class="white elevation-2">
      <v-toolbar flat dark color="cyan">
        <v-toolbar-title>
          Update Forum
        </v-toolbar-title>
      </v-toolbar>
      <v-flex class="pl-4 pr-4 pt-4 pb-4 text-xs-left">
      	<v-form v-model="valid" ref="form" lazy-validation>
      		<v-text-field label="Title" v-model="title" :rules="titleRule" required>
	        </v-text-field>
	        <v-text-field label="Description" v-model="description" :rules="descriptionRule" multi-line required>
	        </v-text-field>
	        <v-btn @click="update" :disabled="!valid" color="cyan" dark>Update</v-btn>
	        <v-alert type="success" v-show="isSuccess">Forum updated successfully!</v-alert>
	        <v-alert type="error" v-show="isError">Some error occured while Updating forum!</v-alert>
      	</v-form>
      </v-flex>
    </div>
  </v-flex>
</template>

<script>
import ForumServices from '@/services/ForumServices'

export default {
  data () {
    return {
    	title: '',
    	description: '',
    	valid: true,
    	titleRule: [
    		v => !!v || 'Title is required'
    	],
    	descriptionRule: [
    		v => !!v || 'Description is required'
    	],
    	isError: false,
    	isSuccess: false
    }
  },
  methods: {
  	update() {
  		var vm = this
  		if(this.$refs.form.validate()) {
  			var data = {
          id: this.$route.params.id,
  				title: this.title,
  				description: this.description
  			}
  			ForumServices.update(data, function(err, response) {
  				if(err) {
  					vm.isError = true
  					vm.$refs.form.reset()
  				} else {
  					vm.isSuccess = true
  				}
  			})
  		}
  	}
  },
  created() {
    var forumId = this.$route.params.id
    var vm = this
    ForumServices.get(forumId, function(err, response) {
      if(err) {
        console.log(err)
      } else {
        vm.title = response.data.title
        vm.description = response.data.description
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
