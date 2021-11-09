export default {
    template: `
          <div class="book-filter">
              <fieldset class="search">
          <legend>Your search Area:</legend>
            <input class="txt" @input="filter" v-model="filterBy.title" type="text" placeholder="Search By Book Title...">
            <input @input="filter" v-model.number="filterBy.fromPrice" type="number" placeholder="Min price">
            <input @input="filter" v-model.number="filterBy. toPrice" type="number" placeholder="Max price">
        </fieldset>
    </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: '',
                toPrice: Infinity,
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy });
        }
    }
}