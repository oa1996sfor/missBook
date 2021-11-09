import bookAdd from '../cmp/book-add.cmp.js';

export default {
    template: `
        <section class="home-page app-main">
            <h3>Welcome to miss bookshop info.</h3>
            <div class="speech-bubble">
                <h5>get the latest info on your favorite books!
                <br>
                ENJOY!
                </h5>
            </div>    
            <img src="img/read.png">
            <bookAdd/>
        </section>
    `,
    components: {
        bookAdd
    }
}