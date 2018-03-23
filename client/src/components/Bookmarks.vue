<template>
  <v-flex xs4>
    <div class="white elevation-2">
        <v-toolbar flat dark color="cyan">
          <v-toolbar-title>
            Bookmarks
          </v-toolbar-title>
        </v-toolbar>
        <v-flex class="pl-4 pr-4 pt-4 pb-4">
          <span v-if="bookmarks.length == 0">No bookmarks added yet!</span>
          <v-list v-else>
            <v-list-tile v-for="bookmark in bookmarks" :key="bookmark._id">
              <v-list-tile-content>
                <v-list-tile-title><a @click="navigateToForumId(bookmark.forum)">{{ bookmark.title }}</a></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn @click="deleteBookmark(bookmark._id)" color="cyan" dark flat icon>
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>
      </div>
  </v-flex>
</template>

<script>
import BookmarksServices from '@/services/BookmarksServices'

export default {
  data () {
    return {
      bookmarks: []
    }
  },
  created() {
    let vm = this
    BookmarksServices.get((err, res) => {
      if(!err) {
        vm.bookmarks = res
      }
    })
  },
  methods: {
    navigateToForumId(forumId) {
      this.$router.push('/forum/' + forumId)
    },
    deleteBookmark(bookmarkId) {
      let vm = this
      BookmarksServices.delete(bookmarkId, (err, res) => {
        if(!err) {
          vm.bookmarks = res
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
