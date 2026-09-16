/* =========================================================
   CONFIGURACIÓN — edita aquí tus datos
   ========================================================= */
const CONFIG = {
  usuario: "U00057H",
  clave: "1234",
  nombreEstudiante: "Nayeli Quispe Tica",
  codigoEstudiante: "U00057H",
  universidad: "Universidad Peruana Los Andes",
};

const CURSOS = [
  {
    id: "algoritmos",
    codigo: "Curso 1",
    nombre: "Algoritmos y Estructuras de Datos",
  },
  {
    id: "desarrollo",
    codigo: "Curso 2",
    nombre: "Desarrollo de Aplicaciones",
  },
];

const TOTAL_SEMANAS = 16;

/* =========================================================
   Almacenamiento local (por navegador del estudiante)
   ========================================================= */
const STORAGE_KEY = "portafolio_academico_v1";

function cargarDatos() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch (e) { /* sigue abajo */ }
  }
  const inicial = {};
  CURSOS.forEach((c) => {
    inicial[c.id] = { semanas: {} };
    for (let i = 1; i <= TOTAL_SEMANAS; i++) {
      inicial[c.id].semanas[i] = {
        tema: "",
        entregas: [],
      };
    }
  });
  return inicial;
}

function guardarDatos(datos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
}

/* =========================================================
   Sesión
   ========================================================= */
function estaLogueado() {
  return sessionStorage.getItem("portafolio_sesion") === "activa";
}

function cerrarSesion() {
  sessionStorage.removeItem("portafolio_sesion");
  window.location.href = "index.html";
}

function protegerPagina() {
  if (!estaLogueado()) {
    window.location.href = "index.html";
  }
}
