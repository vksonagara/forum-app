<template>
  <v-flex xs8 offset-xs2>
    <div class="white elevation-2">
      <v-toolbar flat dark color="cyan">
        <v-toolbar-title>
          {{ forum.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span><strong>Author: </strong>{{ forum.user.email }}, <strong>Created At: </strong>{{ forum.updated_at }}</span>
      </v-toolbar>
      <v-flex class="pl-4 pr-4 pt-4 pb-4 text-xs-left">
        {{ forum.description }}
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
      forum: {}
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
