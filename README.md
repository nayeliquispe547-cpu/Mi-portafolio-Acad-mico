# Portafolio Académico

Sitio estático con inicio de sesión, para llevar el registro semanal (16 semanas)
de los cursos **Algoritmos y Estructuras de Datos** y **Desarrollo de Aplicaciones**,
y subir tus trabajos como enlace (recomendado) o archivo zip.

## Archivos

```
portafolio/
├── index.html            → pantalla de inicio de sesión
├── portafolio.html        → cursos, semanas y carga de trabajos
├── style.css               → estilos
├── script.js               → configuración, datos de los cursos y lógica
└── assets/
    ├── logo-universidad.svg  → reemplázalo por el logo real
    └── foto-estudiante.svg   → reemplázalo por tu foto
```

## 1. Personaliza tus datos

Abre `script.js` y edita el bloque `CONFIG` al inicio del archivo:

```js
const CONFIG = {
  usuario: "estudiante",       // tu usuario para iniciar sesión
  clave: "1234",                // tu contraseña
  nombreEstudiante: "Tu Nombre Apellido",
  codigoEstudiante: "20XX-XXXXX",
  universidad: "Tu Universidad",
};
```

> El inicio de sesión es solo del lado del navegador (no hay servidor detrás,
> porque GitHub Pages solo aloja archivos estáticos). Es suficiente para que
> el portafolio no quede abierto a la vista de cualquiera, pero no uses una
> contraseña sensible: cualquiera que revise el código fuente puede verla.

Si quieres cambiar los temas de cada semana, edita `TEMAS_POR_DEFECTO` en el
mismo archivo. También puedes dejarlos así y editarlos directamente haciendo
clic sobre el tema dentro del portafolio (se guardan en tu navegador).

## 2. Reemplaza el logo y tu foto

- Sustituye `assets/logo-universidad.svg` por el logo real de tu universidad
  (puede ser `.svg`, `.png` o `.jpg` — si cambias el formato, actualiza también
  la ruta en `index.html` y `portafolio.html`).
- Sustituye `assets/foto-estudiante.svg` por tu foto.

## 3. Sube el proyecto a GitHub

1. Crea un repositorio nuevo en GitHub (por ejemplo `portafolio-academico`).
2. En tu computadora, dentro de la carpeta `portafolio`, ejecuta:
   ```bash
   git init
   git add .
   git commit -m "Primer commit: portafolio académico"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/portafolio-academico.git
   git push -u origin main
   ```

## 4. Activa GitHub Pages

1. En tu repositorio, ve a **Settings → Pages**.
2. En "Build and deployment", elige **Deploy from a branch**.
3. Selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda. Después de un par de minutos, tu portafolio estará disponible en:
   `https://TU-USUARIO.github.io/portafolio-academico/`

## 5. Cómo subir tus trabajos semana a semana

Dentro del portafolio, cada semana tiene dos formas de entregar:

- **Enlace (recomendado):** sube tu carpeta o código a un repositorio de
  GitHub (o Google Drive) y pega aquí el enlace. Es la forma permanente,
  porque no depende de tu navegador.
- **Archivo zip/carpeta comprimida:** puedes adjuntarlo directamente, pero
  al ser un sitio estático sin servidor, el archivo solo se recuerda en tu
  navegador mientras dure la sesión — úsalo como respaldo rápido, no como
  entrega definitiva.

Para una entrega 100 % permanente, la recomendación es: comprime tu trabajo,
súbelo a una carpeta dentro de tu mismo repositorio (por ejemplo
`entregas/algoritmos/semana-01.zip`), haz commit y push, y pega el enlace a
ese archivo (o a la carpeta) en el portafolio.

## Notas

- El progreso (temas editados y entregas) se guarda en el `localStorage` de
  tu navegador, así que si abres el portafolio desde otro dispositivo o
  navegador, no verás lo que agregaste antes. Para mantener todo en un solo
  lugar, sigue usando enlaces a tu repositorio de GitHub como fuente de verdad.
- Puedes agregar más cursos copiando la estructura del arreglo `CURSOS` y
  `TEMAS_POR_DEFECTO` en `script.js`.
