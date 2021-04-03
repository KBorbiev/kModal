const fruits = [
    {id: 1, title: 'Apple', price: 30},
    {id: 2, title: 'Banana', price: 25},
    {id: 3, title: 'Mango', price: 55}
]

const modal = $.modal({
    title: 'Kairat Modal',
    closable: true,
    content: `
        <h4>Modal is working</h4>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
    `,
    width: '400px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            console.log('Primary btn clicked');
        }},
        {text: 'Cancel', type: 'danger', handler() {
            console.log('Danger btn clicked');
        }}
    ]
})
