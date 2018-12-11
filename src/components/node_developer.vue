<template>
<div class="node_developer">
  <div class="col-md-12" v-for="developer in developers">
    <div v-if="proId == developer.id">
      <h1>{{developer.first_name}} {{developer.last_name}}</h1>
      <div class="c-developer">
        <div class="c-developer__fullname"></div>
        <div class="c-developer__info text-muted">
          <ul class="c-developer__skills">
            <li v-for="skill in developer.skills">{{ skill.title }}</li>
          </ul>
          {{ developer.category }} {{ developer.city }}, {{ developer.country }}
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
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      this.$http.get('https://private-anon-490e6aa13e-toptalui.apiary-mock.com/developers').then(function(response) {
        this.developers = response.data;
      }, function(error) {
        console.log(error.statusText);
      });
    }
  }
}
</script>
