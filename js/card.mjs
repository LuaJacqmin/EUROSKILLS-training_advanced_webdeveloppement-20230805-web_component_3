const card = document.createElement('template')

card.innerHTML = `
<style>
.card{
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 0 4px 0 #cccccc;
}
</style>
    <div class="card">
        <h2><slot class="title"></slot></h2>
        <p><slot class="content"></slot></p>
        <ul class="labels"></ul>
        <button class="delete">Delete this news</button>
    </div>
`

class Card extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'})

        this.shadowRoot.appendChild(card.content.cloneNode(true))

        if(this.hasAttribute('infos')){
            this.insertInfos(JSON.parse(this.getAttribute('infos')))
        }

        this.id = null;

        if(this.hasAttribute('data-id')){
            this.id = this.getAttribute('data-id')
        }

        this.shadowRoot.querySelector('.delete').addEventListener('click', this.deleteNew(this.id))
    }

    static get observedAttributes(){
        return ['infos']
    }

    connectedCallback(){
        console.log('mounted')
    }

    disconnectedCallback(){
        console.log('destroyed')
    }

    attributeChangedCallback(){
        this.insertInfos(JSON.parse(this.getAttribute('infos')))
    }

    insertInfos = (infos) => {
        this.shadowRoot.querySelector('.title').innerHTML = infos.title
        this.shadowRoot.querySelector('.content').innerText = infos.content
        
        var labels = []

        infos.labels.forEach(label => {
            labels = [...labels, `<li>${label}</li>`]
        });

        this.shadowRoot.querySelector('.labels').innerHTML = labels.join('')
    }

    deleteNew = (id) => {
        console.log('want to delete ', id)
    }
}

customElements.define('app-card', Card)

export {Card}