export default {
    props: ['result'],
    template: `
        <section class="result-preview">
            <span> {{result.volumeInfo.title}}</span>
        </section>
    `,
}