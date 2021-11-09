import { eventBus } from '../services/event-bus-service.js';
import  resultList  from '../cmp/result-list.cmp.js';
import { bookService } from '../services/book-service.js';


export default {
    template: `
           <section class="book-search">
            <h3>search for a book</h3>
            <form  @submit.prevent="searchBook" >
                <input class="search-input" v-model="search" type="text"  placeholder="search for a book">
                <button>Search</button>
            </form>
            <resultList :results="this.results"  @selected="addBook"/>
        </section>

    `,
    data() {
        return {
           search:'',
           results:['']
        };
    },
    created() {
        
    },
    methods: {
        searchBook(){
            console.log(this.search);
            bookService.searchGoogleBook(this.search)
                .then(res => {
                    this.results = res
                    
                })
            // this.results.push(this.search);
            // this.results.splice(0,1)
            this.search = ''
        },
        addBook(book){
            const msg = {
                txt: `The  book was Added!`,
                type: 'success'
            };
            eventBus.$emit('showMsg',msg)
            bookService.addGoogleBook(book);
            
        }
      
    },
    destroyed() {
        
    },
    components:{
        resultList
    }

};