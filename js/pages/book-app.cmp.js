import { bookService } from '../services/book-service.js';
import bookList from '../cmp/book-list.cmp.js';
import bookFilter from '../cmp/book-filter.cmp.js';
// import bookDetails from './book-details.cmp.js';


export default {
    template: `
<section class="book-app">
<book-filter @filtered="setFilter" />
<book-list  :books="booksToShow"/>
</section>
`,
    data() {
        return {
            books: null,
            filterBy: null,
        }
    },
    created() {
        this.loadBooks()
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books)
        },
        closeDetails() {
            this.selectedBook = null

        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            const { title, toPrice, fromPrice } = this.filterBy
            const searchStr = title.toLowerCase()
            const booksToShow = this.books.filter((book) => {
                return book.title.toLowerCase().includes(searchStr) &&
                    book.listPrice.amount >= fromPrice &&
                    book.listPrice.amount <= toPrice || !toPrice

            });
            return booksToShow;
        }
    },
    components: {
        bookList,
        bookFilter,
    }
}




