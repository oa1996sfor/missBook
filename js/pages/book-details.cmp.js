import bookDescription from '../cmp/book-description.cmp.js';
import { bookService } from '../services/book-service.js';
import { eventBus } from '../services/event-bus-service.js';
import reviewAdd from '../cmp/review-add.cmp.js';


export default {
    template: `
        <section v-if="book" class="book-details">
        <fieldset class="details">
        <legend>Book Details:</legend>
            <router-link :to="'/book/'" class="close-a">x</router-link>
        <ul>
            <li><span>Book Title: </span>{{book.title}}</li>
            <li><span>Book Authors: </span>{{book.authors.join()}}</li>
            <li><span>Published Date: </span>{{publishedDate}}</li>
            <li><book-description></book-description></li>
            <li><span>Reading: </span>{{pageCounts}}</li>
            <li v-if="book.listPrice.isOnSale"><span>This book is on Sale! </span></li>
            <li><span>Price:</span><span :class="colorChange">{{book.listPrice.amount}}{{pricesSigns}}</span></li>
            <router-link :to="'/book/'+prevBookId">< Previous Book </router-link>
            <router-link :to="'/book/'+nextBookId">Next Book ></router-link>
            
        </ul>
    <review-add :book="book" @review="saveReview"/>
    </fieldset>
    <fieldset class="reviews">
        <legend>Book Reviews:</legend>
<div class="review-display"  v-for="(review, idx) in book.reviews" :key="review.id">
<p><span>Review: </span>{{review.txt}}</p>
<a class="close-btn" @click="removeReview(idx)">x</a>
<p><span>Published date:</span> {{review.date}}</p>
<p><span>Full Name: </span>{{review.fullName}}</p>
<p><span>Rate: </span>{{review.rate}}</p>
</div>
</fieldset >
        </section>
    `,
    data() {
        return {
            book: null,
            nextBookId: null,
            prevBookId: null
        }
    },
    created() {
        const { bookId } = this.$route.params
        bookService.getById(bookId)
            .then(book => this.book = book)
    },
    methods: {
        saveReview(review) {
            bookService.addReview(review, this.book.id)
                .then(book => this.book = book)
                .then(() => {
                    const msg = {
                        txt: `The review on book: ${this.book.id}  was Added!`,
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                })
                .catch(err => {
                    console.log('err', err);
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                });
        },

        removeReview(idx) {
            this.book.reviews.splice(idx, 1)
            bookService.save(this.book)
                .then(() => {
                    const msg = {
                        txt: `Review was remove`,
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                })
                .catch(err => {
                    console.log('err', err);
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                });
        }


    },
    computed: {
        colorChange() {
            if (this.book.listPrice.amount > 150) return 'red'
            if (this.book.listPrice.amount < 20) return 'green'
        },
        pageCounts() {
            const pages = this.book.pageCount
            if (pages > 500) return 'Long Reading'
            if (pages > 200) return 'Decent Reading'
            if (pages < 100) return 'Light Reading'
        },
        publishedDate() {
            const datePublished = this.book.publishedDate
            if (new Date().getFullYear() - datePublished > 10) return 'Veteran Book'
            if (new Date().getFullYear() - datePublished < 1) return 'New'
            else return datePublished
        },
        pricesSigns() {
            const currency = this.book.listPrice.currencyCode
            if (currency === 'EUR') return '€'
            if (currency === 'ILS') return '₪'
            else return '$'
        },
    },
    watch: {
        '$route.params.bookId': {
            handler() {
                const { bookId } = this.$route.params;
                bookService.getById(bookId)
                    .then(book => this.book = book);
                bookService.getNextBookId(bookId)
                    .then(bookId => this.nextBookId = bookId);
                bookService.getPrevBookId(bookId)
                    .then(bookId => this.prevBookId = bookId);
            },
            immediate: true
        }
    },
    components: {
        bookDescription,
        reviewAdd,
        eventBus
    }
}