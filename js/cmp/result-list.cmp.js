import resultPreview from './result-preview.cmp.js';


export default {
    props: ['results'],
    template: `
        <ul class="result-list">
            <li v-for="result in results" v-if="result" :key="result.id" class="result-container" >
                <div class="actions">
                <resultPreview :result="result"/> <button class="addBtn" @click="select(result)">+</button>
                    
                </div>
            </li>
        </ul>
    `,
    methods: {
        select(book) {
            this.$emit('selected', book);
        },
    },
    computed:{

    },
    components:{
        resultPreview
    }

}
