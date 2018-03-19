<template>
  <v-flex>
    <v-toolbar flat color="white">
      <v-toolbar-title>Comments:</v-toolbar-title>
    </v-toolbar>
    <v-list two-line>
      <v-list-tile v-for="comment in comments" :key="comment._id">
        <v-list-tile-avatar>
          <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ comment.user.email }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ comment.text }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-flex xs10 offset-xs1 v-if="this.$store.state.isLoggedIn">
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Comment"
          v-model="comment"
          multi-line
          :rules="commentRule"
          required
        ></v-text-field>
      </v-form>
      <v-btn flat color="cyan" @click="addComment" :disabled="!valid">Comment</v-btn>
    </v-flex>
    <v-alert type="info" :value="true" class="text-xs-left" v-if="!this.$store.state.isLoggedIn">
      Login in to comment!
    </v-alert>
  </v-flex>
</template>

<script>
import CommentServices from '@/services/CommentServices'
import ForumServices from '@/services/ForumServices'

export default {
  data () {
    return {
      comments: [],
      commentRule: [
        v => !!v || 'Write something!'
      ],
      comment: '',
      valid: true,
      email: ''
    }
  },
  created() {
    let vm = this
    CommentServices.getForumComments(this.$route.params.id, (err, res) => {
      if(err) {
        console.log(err)
      } else {
        vm.comments = res
      }
    })
    ForumServices.getEmail(function(err, res) {
      if(err) {
        console.log(err)
      } else {
        vm.email = res.data
      }
    })
  },
  methods: {
    addComment() {
      var vm = this
      if(this.$refs.form.validate()) {
        CommentServices.create(this.$route.params.id, this.comment, (err, res) => {
          if(err) {
            console.log(err)
          } else {
            vm.comments.push({
              text: vm.comment,
              user: {
                email: vm.email
              }
            })
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
