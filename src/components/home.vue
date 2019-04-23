<template>
  <main id="main">

    <!-- Search form -->
    <form class="">
      <div class="form-group">
        <select class="form-control" v-model="chosenCountry">
          <option v-for="country in sortedCountries">{{ country }}</option>
        </select>
      </div>
    </form>
    <div class="container-fluid">
      <div class="row">

        <div class="col-md-4">
          <div class="c-filters">
            <div class="c-skills shadow p-3 mb-5 bg-white rounded">
              <h3>Developer type:</h3>
              <ul class="c-specialisations-list">
                <li v-for="specialisation in specialisations" class="c-specialisation">
                  <label>
                    <input type="checkbox" v-model="checkedSpecialisations" :value="specialisation.title"/> {{
                    specialisation.title }}
                  </label>
                </li>
              </ul>
            </div>
            <div class="c-skills shadow p-3 mb-5 bg-white rounded">
              <h3>Skills:</h3>
              <ul class="c-skills-list">
                <li v-for="skill in skills" class="c-skill">
                  <label><input type="checkbox" v-model="checkedSkills" :value="skill.title"/> {{ skill.title }}</label>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <h3 v-if="checkedSpecialisations.length > 0">
            Top
            <ul class="c-checked-specialisations-list">
              <li v-for="(checkedSpecialisation, index) in checkedSpecialisations" class="c-checked-specialisation">
                <span v-if="index != 0"> and </span><strong>{{ checkedSpecialisation }}s</strong>
              </li>
            </ul>
            <span v-if="chosenCountry != ''">in {{ chosenCountry }}</span>
          </h3>
          <ul class="c-developers-list">
            <li v-for="(developer, index) in filteredDevelopers" :key="index"
                class="c-developer media shadow p-3 mb-4 bg-white border rounded">
              <div class="c-developer__img mr-3">
                <img :src="developer.photoUrl" class="img-thumbnail">
              </div>
              <div class="media-body">
                <h3 class="c-developer__first-name">{{ developer.first_name }} {{ developer.last_name }}</h3>
                <div class="c-developer__category text-muted mb-0">{{ developer.category }}</div>
                <div class="c-developer__country">{{ developer.country }}</div>
                <div class="c-developer__general-bio">{{ developer.generalBio }}</div>
              </div>
              <button type="button" class="btn btn-outline-primary" @click="goTodetail(developer.id)">View profile{{
                developer.id }}
              </button>
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
        checkedSpecialisation: '',
        checkedSpecialisations: [],
        checkedSkills: [],
        chosenCountry: ''
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
        this.$http.get('http://private-anon-31573f97e2-toptalui.apiary-mock.com/categories/specialisations').then(function (response) {
          this.specialisations = response.data;
        }, function (error) {
          console.log(error.statusText);
        });
        this.$http.get('http://private-anon-31573f97e2-toptalui.apiary-mock.com/categories/skills').then(function (response) {
          this.skills = response.data;
        }, function (error) {
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
    },
    computed: {
      filteredDevelopers: function () {
        var filterDevelopers = this.developers;

        // if specialisations are chosen
        if (this.checkedSpecialisations.length > 0) {
          filterDevelopers = filterDevelopers.filter(developer => {
            return this.checkedSpecialisations.includes(developer.category);
          })
        }

        // if skills are chosen
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

        // if country is chosen
        if (this.chosenCountry != '') {
          filterDevelopers = filterDevelopers.filter(developer => {
            return this.chosenCountry == developer.country;
          });
        }
        else {
          return filterDevelopers;
        }
        return filterDevelopers;
      },
      uniqueCountries: function () {
        var filtered_array = [];
        for (var i = 0; i < this.developers.length; i++) {
          if (filtered_array.indexOf(this.developers[i].country) === -1) {
            filtered_array.push(this.developers[i].country);
          }
        }
        return filtered_array;
      },
      sortedCountries: function () {
        function compare(a, b) {
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        }
        return this.uniqueCountries.sort(compare);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .c-developers-list {
    list-style: none;
    padding: 0;
  }

  .c-specialisations-list {
    list-style: none;
    padding: 0;
  }

  .c-skills-list {
    list-style: none;
    padding: 0;
  }

  .c-checked-specialisations-list {
    display: inline;
    list-style: none;
    padding: 0;
  }

  .c-checked-specialisation {
    display: inline;
  }

</style>
