const baseUrl = "https://platzi-avo.vercel.app"
const appNode = document.querySelector("#app")
//Conectarnos al servidor
//usando promesas
// window.fetch(url)
//     .then((respuesta) => respuesta.json())
//     .then(data => {
//         console.log(data)
//     }) 
const formatPrice = (price) =>{

    const newPrice = new window.Intl.NumberFormat("en-En", {
        style: "currency",
        currency: "USD"
    }).format(price)

    return newPrice
}


async function fetchData(url){
    try{
        const response = await fetch(url)
        const data = await response.json()
    
        const items = data.data
        console.log(items)

        //array de nodos
        const allItems = []
        
        items.forEach(item => {

        //crear titulo
        const title = document.createElement("h2")
        title.textContent = item.name
        // title.style.fontSize = "2rem"
        title.className = "text-xl"

        //crear imagen
        const image = document.createElement("img")
        console.log(item.image)
        image.src = `${baseUrl}${item.image}`
        image.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"

        //crear precio
        const price = document.createElement("div")
        price.textContent = formatPrice(item.price)
        price.className = 'text-gray-600'

        const priceAndTitle = document.createElement('div')
            priceAndTitle.className = 'text-center md:text-left'
            priceAndTitle.append(title, price)

        //contenedor
        const card = document.createElement('div')
        card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300"
        card.append(image, priceAndTitle)

        allItems.push(card)
    })

    appNode.append(...allItems)
    }catch(error){
        console.log(error)
    }
    
}

fetchData(`${baseUrl}/api/avo`)
