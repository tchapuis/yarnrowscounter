<template>
  <div id="app" >
    <div>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
      <b-navbar toggleable="md" type="dark" variant="dark" class="mb-4">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="/">
          <img src="./assets/logo.png" alt="YarnRowsCounter" width="50" height="50">
        </b-navbar-brand>
        <b-collapse is-nav id="nav_collapse" v-if="showNavigation">
          <b-navbar-nav>
            <router-link to="/" class="nav-item nav-link" active-class="active"><i class="fas fa-home mr-2"></i>Projects</router-link>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item @click="logout()">Logout</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view class="container"/>
  </div>
</template>

<script>
  const firebase = require('./firebaseConfig.js');
  export default {
    methods: {
      logout: function() {
          firebase.auth.signOut()
            .then(() => {
              this.$store.dispatch('clearData')
              this.$router.push('/login')
            })
            .catch(err => {
              // eslint-disable-next-line
              console.log(err)
            });
      }
    },
    computed: {
      showNavigation() {
        return this.$store.state.isAuthenticated;
      }
    }
  }
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
