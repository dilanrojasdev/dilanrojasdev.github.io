/* =========================================================
   Interacciones del sitio (archivo compartido por todas las páginas)
   ========================================================= */

// 1. Menú para celular: muestra u oculta la lista de enlaces
const botonMenu = document.querySelector(".boton-menu");
const menu = document.querySelector(".menu");

if (botonMenu && menu) {
  botonMenu.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    botonMenu.setAttribute("aria-expanded", abierto);
  });
}

// 2. Tema oscuro (por defecto) o claro, recordado entre visitas
const botonTema = document.querySelector(".boton-tema");
const raiz = document.documentElement;

function aplicarTema(tema) {
  if (tema === "claro") raiz.setAttribute("data-tema", "claro");
  else raiz.removeAttribute("data-tema");
  if (botonTema) {
    botonTema.textContent = tema === "claro" ? "☾" : "☀";
    botonTema.setAttribute("aria-label", tema === "claro" ? "Cambiar a tema oscuro" : "Cambiar a tema claro");
  }
}

let temaGuardado = "oscuro";
try { temaGuardado = localStorage.getItem("tema") || "oscuro"; } catch (e) { /* sin almacenamiento */ }
aplicarTema(temaGuardado);

if (botonTema) {
  botonTema.addEventListener("click", () => {
    const nuevo = raiz.getAttribute("data-tema") === "claro" ? "oscuro" : "claro";
    aplicarTema(nuevo);
    try { localStorage.setItem("tema", nuevo); } catch (e) { /* sin almacenamiento */ }
  });
}

// 3. Animación de entrada: cada bloque aparece al llegar a la pantalla
const bloques = document.querySelectorAll(".revelar");
if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });
  bloques.forEach((b) => observador.observe(b));
} else {
  bloques.forEach((b) => b.classList.add("visible"));
}

// 4. Año actual en el pie de página
const anio = document.querySelector("#anio");
if (anio) anio.textContent = new Date().getFullYear();

// 5. Página de gracias: lee los datos que el formulario envió por GET
const saludo = document.querySelector("#saludo-gracias");
if (saludo) {
  const datos = new URLSearchParams(window.location.search);
  const nombre = datos.get("nombre");
  if (nombre) {
    saludo.textContent = `¡Gracias, ${nombre}!`;
  }
  const detalle = document.querySelector("#detalle-envio");
  if (detalle && datos.toString()) {
    detalle.textContent = `Datos recibidos por el método GET: ${decodeURIComponent(datos.toString()).replaceAll("+", " ")}`;
  }
}
