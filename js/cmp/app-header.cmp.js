export default {
    template: `
        <header class="app-header">
            <div>
            <h3 class="logo">MissBooks</h3>
            </div>
        <nav>
                <router-link to="/" exact>Home</router-link> |
                <router-link to="/book">Books</router-link> |
                <router-link active-class="active" to="/about">About</router-link>
            </nav>
            </header>
    `,
}