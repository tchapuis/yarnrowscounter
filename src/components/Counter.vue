<template>
  <div class="d-flex">
        <b-button variant="primary" v-on:click="remove">MOINS</b-button>
        <h2>{{count}}</h2>
        <b-button variant="primary" v-on:click="add">PLUS</b-button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  data: function () {
      return {
        count: 0
      }
  },
  methods: {
    add: function () {
      this.count = this.count + 1 
    },
    remove: function() {
        if(this.count > 0) {
            this.count = this.count - 1 
        }
    }
  }
}
</script>

<style scoped>

</style>
