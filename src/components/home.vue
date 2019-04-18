<template>
<main id="main">

  <!-- Search form -->
  <form class="">
    <div class="form-group">
      <select class="form-control" v-model="chosenCountry">
        <option v-bind:value="data.country" v-for="data in sortedCountries">{{ data.country }}</option>
      </select>
    </div>
  </form>
  <div class="container-fluid">
    <div class="row">

      <div class="col-sm-4">
        <div class="c-filters">
          <h3>Developer type:</h3>
          <ul class="c-specialisations-list">
            <li v-for="specialisation in specialisations">
              <label><input type="checkbox" v-model="checkedSpecialisations" :value="specialisation.title" /> {{ specialisation.title }}</label>
            </li>
          </ul>
          <h3>Skills:</h3>
          <ul class="c-skills-list">
            <li v-for="skill in skills">
              <label><input type="checkbox" v-model="checkedSkills" :value="skill.title" /> {{ skill.title }}</label>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-sm-8">
        <h3 v-if="checkedSpecialisations.length > 0">Top {{ checkedSpecialisations }}s in United States</h3>
        <ul class="c-developers-list">
          <li v-for="(developer, index) in filteredDevelopers" :key="index" class="mb-3">
            <div class="c-developer media shadow p-3 mb-4 bg-white border rounded">
              <div class="c-developer__img mr-3">
                <img :src="developer.photoUrl" class="img-thumbnail">
              </div>
              <div class="media-body">
                <h3 class="c-developer__first-name">{{ developer.first_name }} {{ developer.last_name }}</h3>
                <div class="c-developer__category text-muted mb-0">{{ developer.category }}</div>
                <div class="c-developer__country">{{ developer.country }}</div>
                <div class="c-developer__general-bio">{{ developer.generalBio }}</div>
              </div>
              <button type="button" class="btn btn-outline-primary" @click="goTodetail(developer.id)">View profile{{ developer.id }}</button>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</main>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      title: 'Home',
      developers: [],
      specialisations: [],
      skills: [],
      checkedSpecialisations: [],
      checkedSkills: [],
      chosenCountry: ''
    }
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      this.$http.get('http://private-anon-31573f97e2-toptalui.apiary-mock.com/developers').then(function(response) {
        this.developers = response.data;
      }, function(error) {
        console.log(error.statusText);
      });
      this.$http.get('http://private-anon-31573f97e2-toptalui.apiary-mock.com/categories/specialisations').then(function(response) {
        this.specialisations = response.data;
      }, function(error) {
        console.log(error.statusText);
      });
      this.$http.get('http://private-anon-31573f97e2-toptalui.apiary-mock.com/categories/skills').then(function(response) {
        this.skills = response.data;
      }, function(error) {
        console.log(error.statusText);
      });
    },
    goTodetail(prodId) {
      let proId = prodId
      this.$router.push({
        name: 'node_developer',
        params: {
          Pid: proId
        }
      })
    }
  },
  computed: {
    filteredDevelopers: function() {
      var filterDevelopers = this.developers;
      if (this.checkedSpecialisations.length > 0) {
        filterDevelopers = filterDevelopers.filter(developer => {
          return this.checkedSpecialisations.includes(developer.category);
        })
      }
      if (this.checkedSkills.length > 0) {
        filterDevelopers = filterDevelopers.filter(developer => {
          var result;
          developer.skills.find(skill => {
            if (this.checkedSkills.includes(skill.title)) {
              return result = true;
            }
          });
          return result;
        })
      }
      filterDevelopers = filterDevelopers.filter(developer => {
        if (this.chosenCountry != '') {
          return this.chosenCountry == developer.country;
        }
        else {
          return filterDevelopers;
        }
      })
      return filterDevelopers;
    },
    sortedCountries: function() {
      function compare(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }
      return this.developers.sort(compare);
    }
  },
  watch: {
    chosenCountry() {
      console.log('Chosen country has been changed!');
    },
    checkedSpecialisations() {
      console.log('Checked specialisation has been changed!');
    },
    checkedSkills() {
      console.log('Checked skills has been changed!');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
