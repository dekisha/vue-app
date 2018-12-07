new Vue({
    el: "#app",
    data: {
        developers: [],
        specialisations: [],
        skills: [],
        checkedSpecialisations: [],
        checkedSkills: []
    },
    created: function () {
        this.fetchData();
    },
    methods: {
        fetchData: function () {
            var self = this;
            self.$http.get('https://private-anon-490e6aa13e-toptalui.apiary-mock.com/developers', function (data) {
                self.developers = data;
            });
            self.$http.get('https://private-anon-490e6aa13e-toptalui.apiary-mock.com/categories/specialisations', function (data) {
                self.specialisations = data;
            });
            self.$http.get('https://private-anon-490e6aa13e-toptalui.apiary-mock.com/categories/skills', function (data) {
                self.skills = data;
            });
        }
    },
    computed: {
        filteredDevelopers: function () {
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
            return filterDevelopers;
        }
    },
    watch: {
        checkedSpecialisations() {
            console.log('Checked specialisation has changed!');
        },
        checkedSkills() {
            console.log('Checked skills has changed!');
        }
    }
});
