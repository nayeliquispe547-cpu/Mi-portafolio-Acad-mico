const CONFIG = {
  nombreEstudiante: "Nayeli Quispe Tica",
  codigoEstudiante: "U00057H",
  universidad: "Universidad Peruana Los Andes"
};

const CURSOS = [
  {
    id: "algoritmo",
    codigo: "332141",
    nombre: "Algoritmo y Estructura de Datos",
    unidades: 4,          // 4 unidades
    semanasPorUnidad: 4,  // 4 semanas cada una (16 semanas en total)
    totalSemanas: 16
  },
  {
    id: "taller",
    codigo: "IS-102",
    nombre: "Taller de Apps",
    unidades: 2,          // 2 unidades exactas
    semanasPorUnidad: 8,  // 8 semanas cada unidad (16 semanas en total)
    totalSemanas: 16
  }
];

// Temas oficiales extraídos del sílabo UPLA para Algoritmos y Estructuras de Datos
const TEMAS_INICIALES_ALGORITMO = {
  1: "Arreglos Bidimensionales, representación y aplicaciones",
  2: "Arreglos paralelos, representación y uso de arreglos de objetos",
  3: "Clase ArrayList y Vector (Operaciones básicas)",
  4: "Clase Linked List y sus operaciones",
  5: "Pilas: TDA pila, definición, representación y operaciones",
  6: "Pilas de objetos y aplicaciones con pilas (Clase Stack)",
  7: "Colas: TDA cola, representación, operaciones y aplicaciones de colas",
  8: "Recursividad: Algoritmos de programación recursiva y múltiple",
  9: "Listas Simplemente Enlazadas (LSE): TDA, representación y operaciones",
  10: "Listas Circulares Simples (LCS): definición, representación y objetos",
  11: "Listas Doblemente Enlazadas (LDE): TDA, representación y operaciones",
  12: "Listas Circulares Dobles (LCD): TDA, representación y aplicaciones",
  13: "Árboles: TDA árbol, árboles generales, binarios y recorridos",
  14: "Grafos: TDA grafo, definición, representación y conexiones",
  15: "Métodos de ordenación, Búsqueda secuencial y Búsqueda binaria",
  16: "Exposición de trabajo final y evaluación de desempeño final"
};

// Temas oficiales del sílabo UPLA - Desarrollo de Aplicaciones I (Taller de Apps)
const TEMAS_INICIALES_TALLER = {
  1: "Inicialización del Proyecto y Ventanas Principales (JFrame)",
  2: "Organización del Espacio con Contenedores (JPanel, JScrollPane)",
  3: "Implementación de Menús de Navegación (JMenuBar, JMenu, JMenuItem)",
  4: "Integración de Componentes Básicos y Validación Visual",
  5: "Gestión de Archivos y Persistencia de Datos Locales (JFileChooser)",
  6: "Personalización Visual Avanzada e Identidad del Proyecto (Look and Feel)",
  7: "Diseño de Interfaces Complejas con Tablas y Listas (JTable, JList, JComboBox)",
  8: "Orquestación de Mensajes, Diálogos de Usuario y Cierre de Fase (JOptionPane)",
  9: "Conectividad y Configuración del Driver de Base de Datos (JDBC)",
  10: "Operaciones de Persistencia: Inserción y Lectura de Datos (CRUD: Insert/Select)",
  11: "Operaciones de Persistencia II: Actualización, Eliminación y Transacciones",
  12: "Vinculación Dinámica y Cierre de la Capa de Datos",
  13: "Migración a Arquitectura Cliente-Servidor e Hilos",
  14: "Depuración, Manejo de Excepciones y Pruebas del Sistema",
  15: "Compilación y Generación del Archivo Ejecutable (.jar)",
  16: "Sustentación del Proyecto Final y Cierre de Curso"
};

function cargarDatos() {
  const claves = ["portafolio_datos_v11", "portafolio_datos_v10", "portafolio_datos_v9", "portafolio_datos_v8"];

  for (const clave of claves) {
    const guardado = localStorage.getItem(clave);
    if (guardado) {
      try {
        const parsed = JSON.parse(guardado);
        if (parsed && typeof parsed === "object" && Object.keys(parsed).length > 0) {
          return parsed;
        }
      } catch (e) {
        console.warn("Datos guardados inválidos en", clave, e);
      }
    }
  }

  let datosIniciales = {};
  CURSOS.forEach(curso => {
    datosIniciales[curso.id] = { semanas: {} };
    for (let i = 1; i <= curso.totalSemanas; i++) {
      let unidadActual = Math.ceil(i / curso.semanasPorUnidad);

      let temaSugerido = "";
      if (curso.id === "algoritmo" && TEMAS_INICIALES_ALGORITMO[i]) {
        temaSugerido = TEMAS_INICIALES_ALGORITMO[i];
      } else if (curso.id === "taller" && TEMAS_INICIALES_TALLER[i]) {
        temaSugerido = TEMAS_INICIALES_TALLER[i];
      }

      datosIniciales[curso.id].semanas[i] = {
        unidad: unidadActual,
        tema: temaSugerido,
        entregas: []
      };
    }
  });
  return datosIniciales;
}

function guardarDatos(datos) {
  try {
    const datosLigeros = JSON.parse(JSON.stringify(datos));
    localStorage.setItem("portafolio_datos_v11", JSON.stringify(datosLigeros));
  } catch (error) {
    console.warn("Almacenamiento local al límite:", error);
  }
}

function leerArchivoComoDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });
}

function comprimirImagen(file, maxWidth = 900, quality = 0.65) {
  if (!file || !file.type || !file.type.startsWith("image/")) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = Math.min(1, maxWidth / Math.max(img.width, img.height));
        canvas.width = Math.max(1, Math.round(img.width * ratio));
        canvas.height = Math.max(1, Math.round(img.height * ratio));

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("No se pudo cargar la imagen."));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
    reader.readAsDataURL(file);
  });
}

async function crearEntregaDesdeArchivo(file) {
  try {
    let resultadoUrl = "";

    if (file.type && file.type.startsWith("image/")) {
      const imagenComprimida = await comprimirImagen(file);
      resultadoUrl = imagenComprimida || (await leerArchivoComoDataUrl(file));
    } else {
      resultadoUrl = await leerArchivoComoDataUrl(file);
    }

    return {
      tipo: "archivo",
      nombre: file.name,
      tipoMime: file.type || "application/octet-stream",
      tamanio: Math.round(file.size / 1024) + " KB",
      dataUrl: resultadoUrl,
      blobUrl: resultadoUrl,
      urlPublica: resultadoUrl
    };
  } catch (error) {
    console.error("Error al procesar el archivo:", error);
    alert("Hubo un error al adjuntar el archivo: " + error.message);
    throw error;
  }
}

// Función global segura para abrir o descargar evidencias guardadas al hacer clic en "Ver"
window.abrirEvidencia = function(url, nombre) {
  if (!url) {
    alert("No hay archivo disponible para mostrar.");
    return;
  }
  
  if (url.startsWith("data:")) {
    // Si es un archivo en Base64, abrimos una nueva pestaña y escribimos el visor/descargador
    const ventana = window.open();
    if (ventana) {
      ventana.document.write(`
        <html>
          <head><title>Visualizar: ${nombre || 'Evidencia'}</title></head>
          <body style="margin:0; background:#111; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif;">
            <div style="background:#222; color:#fff; padding:10px 20px; width:100%; display:flex; justify-content:space-between; align-items:center; box-sizing:border-box;">
              <span style="font-size:14px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:70%;">${nombre || 'Archivo adjunto'}</span>
              <a href="${url}" download="${nombre || 'archivo'}" style="background:#4f46e5; color:#fff; padding:8px 16px; text-decoration:none; border-radius:4px; font-size:14px;">Descargar Archivo</a>
            </div>
            <iframe src="${url}" style="width:100%; height:calc(100vh - 50px); border:none; background:#fff;"></iframe>
          </body>
        </html>
      `);
      ventana.document.close();
    } else {
      // Si el navegador bloquea la ventana emergente, forzamos la descarga directa
      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.download = nombre || "archivo";
      document.body.appendChild(enlace);
      enlace.click();
      document.body.removeChild(enlace);
    }
  } else {
    window.open(url, "_blank");
  }
};
