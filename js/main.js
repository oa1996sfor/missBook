import appHeader from './cmp/app-header.cmp.js';
import appFooter from './cmp/app-footer.cmp.js';
import userMsg from './cmp/msg.cmp.js'
import { router } from './routs.js';


const options = {
    el: '#app',
    router,
    template: `
        <section>
        <user-msg />
            <app-header />
            <router-view />
            <app-footer />
             </section>
    `,
    components: {
        appHeader,
        appFooter,
        userMsg
    }
};

new Vue(options)