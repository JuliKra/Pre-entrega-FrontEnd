// Asegúrate de enlazar este script en tu archivo HTML
// <script src="js/script.js"></script>

document.addEventListener("DOMContentLoaded", () => {
    // Validar si los campos del formulario están completos
    const formulario = document.getElementById("gamerForm");
  
    formulario.addEventListener("submit", (event) => {
      event.preventDefault(); // Evita el envío del formulario para verificar campos
  
      const nombre = document.getElementById("nombre").value.trim();
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();
  
      if (!nombre || !username || !email || !mensaje) {
        console.log("Por favor, completa todos los campos del formulario.");
      } else {
        console.log("Todos los campos del formulario están completos.");
        formulario.submit(); // Enviar formulario si todo está completo
      }
    });
  
    // Generar dinámicamente una lista de productos disponibles
    const productos = [
      { nombre: "Phasmophobia", precio: "$120.00" },
      { nombre: "PUBG", precio: "$40.00" },
      { nombre: "Fall Guys", precio: "$1000.00" },
      { nombre: "Raft", precio: "$100.00" },
      { nombre: "Rainbow Six", precio: "$100.00" },
      { nombre: "Terraria", precio: "$100.00" },
    ];
  
    console.log("Lista de productos disponibles:");
  
    productos.forEach((producto, index) => {
      console.log(`${index + 1}. ${producto.nombre} - Precio: ${producto.precio}`);
    });
  });
  