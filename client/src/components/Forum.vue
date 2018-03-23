<template>
  <v-flex xs8 offset-xs2>
    <div class="white elevation-2">
      <v-toolbar flat dark color="cyan">
        <v-toolbar-title>
          {{ forum.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span><strong>Author: </strong>{{ forum.user.email }}, <strong>Created At: </strong>{{ forum.updated_at }}</span>
        <v-btn color="white" flat icon @click="bookmark(forum.title, forum._id)" v-if="isLoggedIn">
          <v-icon>{{ bookmarkType }}</v-icon>
        </v-btn>
      </v-toolbar>
      <v-flex class="pl-4 pr-4 pt-4 pb-4 text-xs-left" v-html="forum.description">
      </v-flex>
      <v-divider></v-divider>
      <Comments></Comments>
    </div>
  </v-flex>
</template>

<script>
import ForumServices from '@/services/ForumServices'
import Comments from '@/components/Comments'
import BookmarksServices from '@/services/BookmarksServices'

export default {
  name: 'Forum',
  data () {
    return {
      forum: {},
      bookmarkType: 'bookmark_border'
    }
  },
  created () {
    var vm = this
    ForumServices.get(vm.$route.params.id, function (err, res) {
      if (err) {
        console.log(err)
      } else {
        vm.forum = res.data
      }
    })
  },
  components: {
    Comments
  },
  methods: {
    bookmark (title, forumId) {
      let vm = this
      BookmarksServices.create(title, forumId, function(err, res) {
        if(err) {
          console.log(err)
        } else {
          vm.bookmarkType = 'bookmark'
        }
      })
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
