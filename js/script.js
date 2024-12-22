const btnEnviar= document.getElementById("enviar")
btnEnviar.addEventListener('click',verificarFormulario);

function verificarFormulario(){
    const nombre = document.getElementById("name").value;
    const correo = document.getElementById("email").value;
    const comentario= document.getElementById("comments").value;
    let respuesta = hayCamposVacio(nombre, correo, comentario);
    imprimirConsola(respuesta);

}

function hayCamposVacio(name, email, coments){
let respuesta= false;
if (name ==="" || email ==="" || coments === "") {
    respuesta = true;
}
return respuesta
}

function imprimirConsola(dato){
    if(dato)
    {
        console.log("Por Favor completa los datos de los campos de este formulario")
    }else
    {
    console.log("Campos del formulario completados correctamente")
    }
}

const productos = 
[
    { nombre: "Esfera del Dragon", precio: 1500 },
     { nombre: "Arroz", precio: 2500 },
     { nombre: "dragon", precio: 800 },
     { nombre: "nube", precio: 100 },
     { nombre: "kit", precio: 50 }
];

function mostrarProductos(productos) 
{ 
    for (let i = 0; i < productos.length; i++)
        { 
            console.log(`Articulo: ${productos[i].nombre}, Precio: $${productos[i].precio}`); 
        } 
    }

mostrarProductos(productos)

// URL de la API de videojuegos (RAWG API)
const apiURL = 'https://api.rawg.io/api/games?key=c4e9e139d69f4e13a9b27388b7963684';

const obtenerDatosVideojuegos = async () => {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const cardContainer = document.getElementById('cardContainer');

        data.results.forEach(videojuego => {
            const card = document.createElement('div');
            card.className = 'col-md-3 col-sm-6'; // Controla el ancho de la tarjeta en diferentes pantallas

            card.innerHTML = `
                <div class="card-game">
                    <img src="${videojuego.background_image}" class="card-img-top img-fluid" alt="${videojuego.name}">
                    <div>
                        <h5 class="card-title">${videojuego.name}</h5>
                        <p class="card-text">Lanzamiento: ${videojuego.released}</p>
                        <p class="card-text">Rating: ${videojuego.rating}/5</p>
                        <p>Precio: $59.99</p>
                        <button class="button-game" onclick="agregarCarrito('${videojuego.name}', 59.99)">Añadir al Carrito</button>
                    </div>
                </div>
            `;
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error al obtener videojuegos:', error);
    }
};

// Función para añadir videojuegos al carrito
const agregarCarrito = (videojuegoName, price) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(product => product.name === videojuegoName);

    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ name: videojuegoName, price: price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    actualizarCarrito();
    mostrarCarrito();
};

 // Función para mostrar los productos del carrito
 const mostrarCarrito = () => {
     const cart = JSON.parse(localStorage.getItem('cart')) || [];
     const carritoContainer = document.getElementById('carritoContainer');
     const cartTotal = document.getElementById('cart-total');
     let total = 0;
     
     carritoContainer.innerHTML = '';

     cart.forEach(product => {
         total += product.price * product.quantity;
         const productDiv = document.createElement('div');
         productDiv.className = 'row mb-3';
         productDiv.innerHTML = `
             <div class="col-md-6">
                 <h5>${product.name}</h5>
             </div>
             <div class="col-md-2">
                 <input type="number" class="form-control" value="${product.quantity}" min="1" onchange="actualizarCantidad('${product.name}', this.value)">
             </div>
             <div class="col-md-2">
                 <button class="btn btn-danger" onclick="removerArticulo('${product.name}')">Eliminar</button>
             </div>
         `;
         carritoContainer.appendChild(productDiv);
     });

     cartTotal.textContent = total;
 };

 // Función para actualizar la cantidad de un producto en el carrito
 const actualizarCantidad = (productName, quantity) => {
     let cart = JSON.parse(localStorage.getItem('cart')) || [];
     const productIndex = cart.findIndex(product => product.name === productName);

     if (productIndex > -1) {
         cart[productIndex].quantity = parseInt(quantity);
     }

     localStorage.setItem('cart', JSON.stringify(cart));
     mostrarCarrito();
 };

 const removerArticulo = (productName) => {
     let cart = JSON.parse(localStorage.getItem('cart')) || [];
     cart = cart.filter(product => product.name !== productName);

     localStorage.setItem('cart', JSON.stringify(cart));
     actualizarCarrito();
     mostrarCarrito();
 };

 const actualizarCarrito = () => {
     const cart = JSON.parse(localStorage.getItem('cart')) || [];
     const cartCount = cart.reduce((acc, product) => acc + product.quantity, 0);
     document.getElementById('cart-count').textContent = cartCount;
 };

window.onload = () => {
    obtenerDatosVideojuegos();
    actualizarCarrito();
    mostrarCarrito();
};

 document.querySelector('.cart-icon').addEventListener('click', () => {
     $('#cartModal').modal('show');
 });
