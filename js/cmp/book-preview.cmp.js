export default {
    props: ['book'],
    template: `
        <div class="book-preview">
            <p><span> Title :</span> {{book.title}}</p>
            <p><span> Author:</span> {{book.authors.join()}}</p>
            <img :src="book.thumbnail">
        </div>
    `,
}