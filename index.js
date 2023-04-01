// formulario
const formulario = document.getElementById('formulario')
const inputNombre = document.getElementById('nombre')
const inputApellido = document.getElementById('apellido')
const titulo = document.getElementById('titulo')
const sub = document.getElementById('sub')
const divProductos = document.getElementById('divProductos')
// boton ingresar
formulario.onsubmit = (e)=>{
  e.preventDefault()
  const usuarioInfo = {
    nombre:inputNombre.value,
    apellido:inputApellido.value
  }
  localStorage.setItem('usuarioInfo',JSON.stringify(usuarioInfo))
  formulario.remove()
  sub.remove()
  titulo.innerText = `Bienvenido a Black-Wolf! ${usuarioInfo.nombre} ${usuarioInfo.apellido}`
}

//mirar si en store existe usuarioInfo 
const usuarioInfo = JSON.parse(localStorage.getItem('usuarioInfo'))
if(usuarioInfo){
    formulario.remove()
    sub.remove()
    titulo.innerText = `Bienvenido a Black-Wolf! ${usuarioInfo.nombre} ${usuarioInfo.apellido}`
}

//Productos
class Producto {
    constructor(id,nombre,precio,stock,img){
        this.id = id
        this.nombre = nombre 
        this.precio = precio
        this.stock = stock
        this.img = img
    }
}

const productos = [
    new Producto(1, "Memoria RAM", 20000, 10,"img/memoria-ram.jpg"),
    new Producto(2, "Fuente 600wts", 5500, 20,"img/fuente.jpg"),
    new Producto(3, "Disco Duro", 16000, 30,"img/disco-duro.jpg"),
    new Producto(4, "Mouse", 3000, 40,"img/mouse.jpg"),
    new Producto(5, "Notebook", 175000, 50,"img/notebook.jpg"),
    new Producto(6, "Microfono", 9000, 60,"img/microfono.jpg"),
    new Producto(7, "Cooler", 6500, 70,"img/cooler.jpg"),
    new Producto(8, "Motherboard", 45000, 80,"img/motherboard.jpg"),
    new Producto(9, "Teclado", 75000, 90,"img/teclado.jpg"),
    new Producto(10, "Auriculares", 13000, 100,"img/teclado.jpg"),
    new Producto(11, "Computadora", 189000, 100,"img/computadora.jpg"),
    new Producto(12, "Gabinete", 20000, 100,"img/gabinete.jpg"),
  ]

  productos.forEach(prod=>{
    divProductos.innerHTML +=`<div class="card cardProducto" style="width: 18rem;">
    <img src="${prod.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${prod.nombre}</h5>
      <p class="card-text">${prod.precio}</p>
      <button id=${prod.id} class="btn btn-danger">Agregar</button>
    </div>
  </div>`
  })

  //carrito de compras guardar producto
  const carrito = []

  const botonesAgregar = document.querySelectorAll(".btn-danger")
  botonesAgregar.forEach(boton=>{
    boton.onclick = ()=>{
       const producto = productos.find((prod) => prod.id === parseInt(boton.id))

       const prodCarrito = {
        id: producto.id,
        nombre: producto.nombre,
        precio : producto.precio,
        cantidad: 1,
       }

       const prodEnCarrito = carrito.find(prod=>prod.id===prodCarrito.id)
       if(!prodEnCarrito){
        carrito.push(prodCarrito)
       } else{
        prodEnCarrito.cantidad++
       }
    }
  })

  // boton finalizar comprar
  const botonFinalizar = document.querySelector('#finalizar')
  const thead = document.querySelector('#thead')
  const tbody = document.querySelector('#tbody')
  const alertTotal = document.querySelector('#total')

  botonFinalizar.onclick = ()=>{
  divProductos.remove()
  botonFinalizar.remove()
  thead.innerHTML = `<tr>
  <th scope="col">Productos</th>
  <th scope="col">Cantidad</th>
  <th scope="col">Total</th>
  </tr>`
  let totalCompra = 0
  carrito.forEach(prod=>{
    totalCompra+=prod.cantidad*prod.precio
    tbody.innerHTML+=`
    <tr>
    <td>${prod.nombre}</td>
    <td>${prod.cantidad}</td>
    <td>${prod.cantidad*prod.precio}</td>
    </tr>
    `
  })
  alertTotal.innerHTML = ` El total de tu compra es ${totalCompra}`
  }

 