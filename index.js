let fruits = [
    {id: 1, title: 'Apple', price: 30, img: 'https://www.sagefruit.com/wp-content/uploads/2016/08/apple-grannysmith-350-x-350.png'},
    {id: 2, title: 'Banana', price: 25, img: 'https://co2living.com/wp-content/uploads/2019/07/What-is-the-carbon-footprint-of-a-banana.jpg'},
    {id: 3, title: 'Mango', price: 55, img: 'https://static.libertyprim.com/files/familles/mangue-large.jpg?1569271798'}
]

const toHtml = fruit => `
    <div class="col-4">
        <div class="card">
            <img src="${fruit.img}" alt="${fruit.title}" style="height: 300px" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Price</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = fruits.map(fruit => toHtml(fruit)).join('') // join - что бы убрать запятые
    document.querySelector('#fruits').innerHTML = html
}
render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close()
        }}
    ]
})

document.addEventListener('click',  event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if(btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Удалить фрукт: <strong>${fruit.title}</strong></p>`
        }).then(()=>{
            // console.log('resolve');
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(()=>{
            // console.log('reject');
        })
    }
})

