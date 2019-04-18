<template>
  <div id="app">

    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" to="/">
          <img width="100"
               src="http://www.freelogovectors.net/wp-content/uploads/2018/09/toptal-logo.png"
               alt="Toptal logo">
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/">Find Developers</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/resources">Resources</router-link>
            </li>
          </ul>

          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#loginModal">
            <i class="fas fa-sign-in-alt mr-1"></i>Login
          </button>

          <!-- Modal -->
          <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel"
               aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="loginModalLabel">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  ...
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <div class="subheader">

      <!-- Breadcrumbs -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item"><a href="#">Why Top 3%</a></li>
          <li class="breadcrumb-item active" aria-current="page">Find Developers</li>
        </ol>
      </nav>

    </div>


    <router-view/>

  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
  }
</style>
