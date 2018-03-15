<template>
	<v-flex xs8 offset-xs2>
    <div class="white elevation-2">
      <v-toolbar flat dark color="cyan">
        <v-toolbar-title>
          Create Forum
        </v-toolbar-title>
      </v-toolbar>
      <v-flex class="pl-4 pr-4 pt-4 pb-4 text-xs-left">
      	<v-form v-model="valid" ref="form" lazy-validation>
      		<v-text-field label="Title" v-model="title" :rules="titleRule" required>
	        </v-text-field>
	        <v-text-field label="Description" v-model="description" :rules="descriptionRule" multi-line required>
	        </v-text-field>
	        <v-btn @click="create" :disabled="!valid" color="cyan" dark>Create</v-btn>
	        <v-alert type="success" v-show="isSuccess">Forum created successfully!</v-alert>
	        <v-alert type="error" v-show="isError">Some error occured while creating forum!</v-alert>
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
  	create() {
  		var vm = this
  		if(this.$refs.form.validate()) {
  			var data = {
  				title: this.title,
  				description: this.description
  			}
  			ForumServices.create(data, function(err, response) {
  				if(err) {
  					vm.isError = true
  					vm.$refs.form.reset()
  				} else {
  					vm.isSuccess = true
  					vm.$refs.form.reset()
  				}
  			})
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
