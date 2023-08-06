const listing = document.createElement('template')

listing.innerHTML = `
    <div class="listing">
        <h1>Some Euroskills news</h1>
        <button class="random-news">Give me other news</button>
        <ul class="listing-card-info"></ul>
    </div>
`

class Listing extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'})

        this.shadowRoot.appendChild(listing.content.cloneNode(true))

        this.news;
        this.domListing = this.shadowRoot.querySelector('.listing-card-info')
        this.randomNews = this.shadowRoot.querySelector('.random-news')
        this.randomNews.addEventListener('click', this.newRandomNews)

        this.getNews('../card-infos.json')

    }

    connectedCallback(){
        console.log('mounted')
    }

    disconnectedCallback(){
        console.log('destroyed')
    }

    newRandomNews = () => {
        const random = Math.floor(Math.random() * 3);

        const urlArray = ['../card-infos.json', '../card-infos-2.json', '../card-infos-3.json']

        const cards = this.shadowRoot.querySelectorAll('app-card')

        fetch(urlArray[random])
        .then(infos => infos.json())
        .then(infos => {
            // create our cards elements
            let i = 0;
            for(const [key, value] of Object.entries(infos)){
                cards[i].setAttribute('infos', JSON.stringify(value))
                i++
            }
        })
    }

    getNews = (newsUrl) => {
        fetch(newsUrl)
        .then(infos => infos.json())
        .then(infos => {
            this.listing = []
            let i = 0;
        
            // create our cards elements
            for(const [key, value] of Object.entries(infos)){
                this.listing = [...this.listing, `<app-card data-id="${i}" infos='${JSON.stringify(value)}'></app-card>`]
                i++
            }
    
            this.domListing.innerHTML = this.listing.join('')
        })
    }
}

customElements.define('app-listing', Listing)

export {Listing}