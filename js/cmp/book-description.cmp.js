import { bookService } from '../services/book-service.js';



export default {
     template: `
        <div v-if="book" class="book-description">
             <p v-if="isFullLength"><span>Description:</span> {{bookDescription}}</p>
            <button :class="showBtn" @click="isShown=!isShown" >{{showTxt}}</button>
            </div>
    `,
    data() {
        return {
            isShown: false,
            isFullLength: true,
            book: null
        }
    },
    created() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId)
            .then(book => {
                this.book = book
            
            });
    },
    computed: {
        bookDescription() {
            if (this.book.description.length > 100 && !this.isShown) {
                return this.book.description.slice(0, 100)
            }
            else {
                return this.book.description
            }
        },
        showTxt() {
            return (this.isShown) ? 'Show Less' : 'Show More'
        },
        showBtn() {
            return (this.book.description.length > 100) ? 'shown' : 'hidden'
        }
    }
}