<template>
  <div class="node_developer">
    <div class="c-developer" v-for="developer in chosenDeveloper">
      <h1 class="c-developer__fullname">{{developer.first_name}} {{developer.last_name}}</h1>
      <div class="c-developer__info text-muted">
        <ul class="c-developer__skills">
          <li v-for="skill in developer.skills">{{ skill.title }}</li>
        </ul>
        {{ developer.category }} {{ developer.city }}, <i class="fas fa-map-marker-alt mr-1"></i>{{ developer.country
        }}
      </div>
      <div class="media">
        <div class="c-developer__img mr-3">
          <img :src="developer.photoUrl" class="img-thumbnail">
        </div>
        <div class="media-body">
          <div class="c-developer__bio">{{ developer.bio }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'node_developer',
    data() {
      return {
        proId: this.$route.params.Pid,
        title: 'node_developer',
        developers: []
      }
    },
    created: function () {
      this.fetchData();
    },

    methods: {
      fetchData: function () {
        this.$http.get('http://private-anon-31573f97e2-toptalui.apiary-mock.com/developers').then(function (response) {
          this.developers = response.data;
        }, function (error) {
          console.log(error.statusText);
        });
      }
    },
    computed: {
      chosenDeveloper: function () {
        var vm = this;
        return vm.developers.filter(function (theDeveloper) {
          return vm.proId == theDeveloper.id;
        })
      }
    }
  }
</script>
