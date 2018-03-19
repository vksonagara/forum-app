<template>
  <v-flex xs8 offset-xs2>
    <div class="white elevation-2">
      <v-toolbar flat dark color="cyan">
        <v-toolbar-title>
          Forums
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dark small fab color="cyan accent-3" @click="navigateTo('/forums/create')" v-if="isLoggedIn">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
      <v-flex class="pl-4 pr-4 pt-4 pb-4">
        <v-card v-for="forum in forums" :key="forum._id" class="mt-4 mb-4">
          <v-card-title primary-title>
            <h3 class="headline mb-0">{{ forum.title }}</h3>
            <v-spacer></v-spacer>
            <span><strong>Author</strong>: {{ forum.user.email }}, <strong>Created At</strong>: {{ forum.updated_at }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text-xs-left" v-html="forum.description">
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="cyan" @click="navigateToId(forum._id)">Explore</v-btn>
            <v-badge right color="cyan">
              <span slot="badge">{{ forum.total_comments }}</span>
              <v-icon large color="grey lighten-1">comment</v-icon>
            </v-badge>
            <v-spacer></v-spacer>
            <v-btn color="cyan" flat icon @click="bookmark(forum.title, forum._id)">
              <v-icon>{{ bookmarkType }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </div>
  </v-flex>
</template>

<script>
import ForumServices from '@/services/ForumServices'
import BookmarksServices from '@/services/BookmarksServices'

export default {
  name: 'Home',
  data () {
    return {
      forums: [],
      bookmarkType: 'bookmark_border'
    }
  },
  created () {
    var vm = this
    ForumServices.getAll(function (err, res) {
      if (err) {
        console.log(err)
      } else {
        vm.forums = res.data
      }
    })
  },
  methods: {
    navigateToId (id) {
      this.$router.push('/forum/' + id)
    },
    navigateTo (path) {
      this.$router.push('/forums/create')
    },
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
