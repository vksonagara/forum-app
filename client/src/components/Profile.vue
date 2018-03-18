<template>
  <v-flex xs8 offset-xs2>
    <div class="white elevation-2">
      <v-toolbar flat dark color="cyan">
        <v-toolbar-title>
          Forums Created by You
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-chip color="cyan accent-3" text-color="white">
          <v-avatar>
            <v-icon>account_circle</v-icon>
          </v-avatar>
          {{ email }}
        </v-chip>
        <v-btn dark small fab color="cyan accent-3" @click="navigateTo('/forums/create')" v-if="isLoggedIn">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
      <v-flex class="pl-4 pr-4 pt-4 pb-4">
        <v-card v-for="forum in forums" :key="forum._id" class="mt-4 mb-4">
          <v-card-title primary-title>
            <h3 class="headline mb-0">{{ forum.title }}</h3>
            <v-spacer></v-spacer>
            <span><strong>Created At</strong>: {{ forum.updated_at }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text-xs-left" v-html="forum.description">
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="cyan" @click="navigateToId(forum._id)">Explore</v-btn>
            <v-btn flat color="cyan" @click="navigateToUpdateId(forum._id)">Edit</v-btn>
            <v-btn flat color="cyan" @click="dialog = true; id = forum._id">Delete</v-btn>
          </v-card-actions>
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="headline">Are you sure to delete?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Cancel</v-btn>
                <v-btn color="green darken-1" flat="flat" @click.native="deletePost">Yes</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-flex>
    </div>
  </v-flex>
</template>

<script>
import ForumServices from '@/services/ForumServices'

export default {
  name: 'Forum',
  data () {
    return {
      email: '',
      forums: [],
      dialog: false,
      id: null
    }
  },
  created () {
    var vm = this
    ForumServices.getEmail(function(err, res) {
      if(err) {
        console.log(err)
      } else {
        vm.email = res.data
      }
    })
    ForumServices.getMyForums(function(err, res) {
      if(err) {
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
    navigateToUpdateId (id) {
      this.$router.push('/forums/update/' + id)
    },
    deletePost () {
      var vm = this
      this.dialog = false
      ForumServices.delete(this.id, function(err, response) {
        if(err) {
          console.log(err)
        } else {
          console.log(vm.forums)
          vm.forums = vm.forums.filter(function(forum) {
            return forum._id !== vm.id
          })
        }
      })
    },
    navigateTo (path) {
      this.$router.push('/forums/create')
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
