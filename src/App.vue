<template>
  <div id="app" >
    <b-navbar toggleable="md" type="dark" variant="dark" class="mb-4">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/">
        <img src="./assets/logo.png" alt="YarnRowsCounter" width="50" height="50">
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <router-link to="/" class="nav-item nav-link" active-class="active">Projects</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view class="container"/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
