README

1) CLONAR
2) cd proyecto
3) npm install
4) DEBUG=express-test:* npm start
y ver el puerto en www
5) Definir rutas en app.js (indexm login y restricted)
6) Definir las plantillas ejs, porque en nav hacer una lista desornada, 

header.ejs



<nav>
                        <ul>
                            <li> <a href="/"> HOME</a></li>
                            <%if (user) { %>
                                <li> <a href= "/restricted">  Restricted</a> </li>
                                <li> <a href="/logout"> Logout</a></li>

                            <% } else { %> 
                                <li> <a href="/login"> Login</a></li>
                            <% } %>
                        </ul>

                    </nav>






cuando usar JavaScript incrustado, para ver si el user se ha registrado

<%if (user) { %>
<li> <a href= "/restricted">
<% } else { %> 

<li> <a href="/login"> Login</a></li>



7) Si en tu aplicación estas usando, en este caso, en header usas una variable defindia en las plantillas ejs, por je, user, necesitas declarar un middleware  dentro de app.js para protege rutas restringidas solo para usuarios que han iniciado sesión
para ello, en app.js añades configuración adecuada del middleware de sesiones en tu aplicación, es decir, 

const session = require('express-session');

app.use(session({
  secret: 'your_secret_key', // Cambia esto por una clave segura
  resave: false,
  saveUninitialized: false,
}));

PARA RESOLVER EL ERROR DE QUE UNA VARIABLE NO ESTE  DEFINIDA DENTRO DE ALGUNA PLANTILLA EJS, poner res.render( {user: req.session.user}), esto ponerlo  en el get

si no encuentra el modulo: npm install express-session

8) En login.js, diseñar la ruta del post correspondiente al formulario de la plantilla login.ejs, es decir, la validación de si el usario esta registrdo

router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Validar credenciales (simulación)
  if (username === 'admin' && password === '1234') {
    req.session.user = { username };
    res.redirect('/restricted');
  } else {
    req.session.error = "Usuario o contraseña incorrectas";
    res.redirect('login');
  }
});


9) Para el logout, añadir en app.js 

app.use('/logout', (req,res) => {
  req.session.destroy();
  res.redirect('/');
});

o mejor,
app.use('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar la sesión:', err);
      res.status(500).send('Error al cerrar la sesión');
    } else {
      res.redirect('/'); // Redirige al home o al login
    }
  });
});
10) Para el caso de un registro fallido, login fallido,


} else {
    req.session.error = "Usuario o contraseña incorrectas";
    res.redirect('login');
  }

o también, 

res.render('login', { title: 'Login', user: req.session.user, error: req.session.error/** asigna mensaje de error a la sesion de  usuario La sesión (req.session) ,
      es un objeto persistente que se mantiene entre las solicitudes HTTP de un client*/  });



render lo utilizas para cargar el html de una pagina, y normalmente cuando  renderizas la plantilla , esta se corresponde a la  de la ruta, mientras que redirect, lo utilizar para redirigir a otra ruta en la que se renderiza otro HTML




CSS:

a la hora de declarar una lista desorndenada, para que no aparezcan los puntos y esten las rutas alineadas


ul {
  list-style-type: none;
  display: flex;
}



para que halla espacio entre las rutas del nav
li {
  margin-right: 20px;
}


para centrar el div que cubre todo el formulario de login

.login-container {
  display: flex;
  width: 30%;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  border: 3px solid black;
  width: 300px;
  position: fixed;/** Asegura que el contenedor se posicione en relación con la ventana del navegador*/
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
}


espacio entre username y password

.form-group {
  margin-bottom: 15px;
}


para tocar los labels de las etiquetas
.form-group label {
  display: block; /** poner labels arriba de la caja */ 
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 14px;
}


para hacer mas grande el input
.form-group input {
  width: 100%;
  padding: 10px;
  background-color: aquamarine; /* Color aquamarino */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
}

ajustar el botón con color, texto centrado
.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
}



CSS PARRAFOS

.container {
  display: flex;
  justify-content: space-between;
  background-color: gray;
  padding: 20px;
  border: 5px solid black;
}

.card {
  flex: 1; /** los tres div tienen el mismo tamaño, no va por parrafo*/ 
  margin: 20px;  /**distancia entre cards */
  padding: 20px; /*  grosor de la caja blanca*/ 
  background-color: #eee;
  border-radius: 5px; /**  borde secciones blancas mas suave ne vez de cuadrado, esquinas del div*/
  
}



selector universal

* {
  margin: 0;/*Elimina todos los márgenes predeterminados */
  padding: 0; /* Elimina todo el relleno predeterminado */
  box-sizing: border-box; /* ancho y alto incluyan el contenido, el relleno y los bordes. */
} 

para el selector universal, importante paddig: 0 en el body

body {
  padding: 0;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}


//eventos
/SIEMPRE
document.getElementById('myForm')

click: e ejecuta cuando haces clic en un botón
submit:Este evento se dispara cuando un formulario es enviado
	ej:  myForm

 keydown :  presionar una tecla, ojo:
		document.addEventListener('keydown', async (e) => {
		este no tiene get_id

keyup:Se ejecuta al soltar una tecla, 
change: Se ejecuta cuando cambias el valor de un campo de entrada o un select.

input: Se ejecuta cada vez que el usuario modifica un campo de entrada.

dblclick: Puedes usarlo para realizar acciones con un doble clic.

mouseover: Se ejecuta al pasar el cursor sobre un elemento
.

Puedes enviar datos automáticamente después de un período de tiempo.
setInterval(async () => {
  const data = { timestamp: Date.now() };
  await fetch('/heartbeat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  console.log('Datos enviados automáticamente');
}, 5000); // Cada 5 segundos
	



Ejemplo completo:

<form id="userForm">
  <input type="text" id="username" placeholder="Nombre de usuario" required>
  <button type="submit">Enviar</button>
</form>

<script>
  const form = document.getElementById('userForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

    const username = document.getElementById('username').value;

    try {
      const response = await fetch('/addUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();
      console.log('Respuesta del servidor:', result);
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  });
</script>


//formatos:

JSON 

{
  "name": "Alice",
  "age": 25,
  "skills": ["JavaScript", "Node.js"]
}

fetch('/api', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', age: 25, skills: ['JavaScript', 'Node.js'] }),
});


CSV 


const csvData = `name,age,skills
Alice,25,JavaScript|Node.js
Bob,30,Python|Django`;

fetch('/uploadCSV', {
  method: 'POST',
  headers: { 'Content-Type': 'text/csv' },
  body: csvData,
});




XML 

const xmlData = `
<users>
  <user>
    <name>Alice</name>
    <age>25</age>
    <skills>
      <skill>JavaScript</skill>
      <skill>Node.js</skill>
    </skills>
  </user>
</users>`;

fetch('/uploadXML', {
  method: 'POST',
  headers: { 'Content-Type': 'application/xml' },
  body: xmlData,
});


Formulario Codificado


name=Alice&age=25&skills=JavaScript|Node.js


const formData = new URLSearchParams();
formData.append('name', 'Alice');
formData.append('age', 25);
formData.append('skills', 'JavaScript|Node.js');

fetch('/submitForm', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: formData.toString(),
});



Texto Plano



const plainText = 'Hello, this is plain text.';

fetch('/uploadText', {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain' },
  body: plainText,
});


YAML 

const yamlData = `
name: Alice
age: 25
skills:
  - JavaScript
  - Node.js
`;

fetch('/uploadYAML', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-yaml' },
  body: yamlData,
});


JSON-LD


{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Alice",
  "age": 25,
  "skills": ["JavaScript", "Node.js"]
}



fetch('/uploadJSONLD', {
  method: 'POST',
  headers: { 'Content-Type': 'application/ld+json' },
  body: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alice",
    age: 25,
    skills: ["JavaScript", "Node.js"],
  }),
});





ENVIAR FICHEROS

CSV

<form id="uploadCsvForm">
  <input type="file" id="csvFileInput" accept=".csv">
  <button type="submit">Subir CSV</button>
</form>

<script>
  document.getElementById('uploadCsvForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

    const fileInput = document.getElementById('csvFileInput');
    if (!fileInput.files.length) {
      alert('Por favor, selecciona un archivo CSV');
      return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]); // Añadir el archivo al FormData

    try {
      const response = await fetch('/uploadCSV', {
        method: 'POST',
        body: formData, // Enviar FormData directamente
      });

      const result = await response.json();
      console.log('Respuesta del servidor:', result);
    } catch (error) {
      console.error('Error al enviar el archivo CSV:', error);
    }
  });
</script>



BACKEND 



const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Carpeta para guardar los archivos

// Ruta para subir el archivo CSV
app.post('/uploadCSV', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No se envió ningún archivo' });
  }

  console.log('Archivo recibido:', file.originalname);

  // Leer el contenido del archivo (opcional)
  const filePath = path.join(__dirname, file.path);
  const content = fs.readFileSync(filePath, 'utf8');
  console.log('Contenido del CSV:', content);

  res.json({ message: 'Archivo CSV procesado correctamente', content });
});

// Iniciar el servidor
app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));



XML







<form id="uploadXmlForm">
  <input type="file" id="xmlFileInput" accept=".xml">
  <button type="submit">Subir XML</button>
</form>

<script>
  document.getElementById('uploadXmlForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('xmlFileInput');
    if (!fileInput.files.length) {
      alert('Por favor, selecciona un archivo XML');
      return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
      const response = await fetch('/uploadXML', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Respuesta del servidor:', result);
    } catch (error) {
      console.error('Error al enviar el archivo XML:', error);
    }
  });
</script>



Backend








const express = require('express');
const multer = require('multer');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Ruta para subir y procesar el archivo XML
app.post('/uploadXML', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No se envió ningún archivo' });
  }

  console.log('Archivo recibido:', file.originalname);

  const filePath = path.join(__dirname, file.path);
  const xmlContent = fs.readFileSync(filePath, 'utf8');

  // Analizar el contenido XML
  xml2js.parseString(xmlContent, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al procesar el XML', error: err });
    }

    console.log('Contenido XML parseado:', result);
    res.json({ message: 'Archivo XML procesado correctamente', data: result });
  });
});

// Iniciar el servidor
app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));



CABECERAS



Content-Length: Indica el tamaño del cuerpo de la respuesta en bytes.


Content-Length: 123

Expires: Indica cuándo expira la respuesta en caché.
Expires: Wed, 21 Oct 2025 07:28:00 GMT


Set-Cookie: Envia cookies al cliente

Set-Cookie: sessionId=abc123; HttpOnly; Secure



Strict-Transport-Security: Obliga al cliente a usar HTTPS.

Strict-Transport-Security: max-age=31536000; includeSubDomains

Content-Security-Policy: default-src 'self'














MOVER CSS ENCAPSULADO EN UN DIV 

Centrar el origen

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plano Cartesiano</title>

  <style>

    /* Plano cartesiano que ocupa toda la pantalla */
#cartesianPlane {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(90deg, #ccc 1px, transparent 1px),
              linear-gradient(0deg, #ccc 1px, transparent 1px);
  background-size: 50% 50%; /* Divide la pantalla en cuadrantes */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Elemento que queremos mover */
#movableElement {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: red;
  color: white;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
}

  </style>


</head>
<body>
  <!-- Contenedor del plano cartesiano -->
  <div id="cartesianPlane">
    <!-- Elemento que queremos mover -->
    <div id="movableElement">Div</div>
  </div>
</body>
</html>


Mover el elemento dinámicamente usando coordenadas 



/* Estilos base para el elemento */
#movableElement {
  position: absolute;
  transform: translate(-50%, -50%); /* Centra el elemento en su posición */
}

/* Movimientos hacia los cuadrantes */
.q1 {
  transform: translate(100px, -100px); /* Cuadrante I: (+x, -y) */
}

.q2 {
  transform: translate(-100px, -100px); /* Cuadrante II: (-x, -y) */
}

.q3 {
  transform: translate(-100px, 100px); /* Cuadrante III: (-x, +y) */
}

.q4 {
  transform: translate(100px, 100px); /* Cuadrante IV: (+x, +y) */
}



//FCIHEROS



Crear y Escribir en un Archiv

const fs = require('fs');

// Contenido del archivo
const content = 'Hola, este es el contenido del archivo.';

// Crear y escribir en un archivo
fs.writeFile('archivo.txt', content, (err) => {
  if (err) {
    console.error('Error al escribir en el archivo:', err);
    return;
  }
  console.log('Archivo creado y contenido escrito correctamente.');
});


Leer un Archivo
fs.readFile('archivo.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }
  console.log('Contenido del archivo:', data);
});



 Añadir Contenido a un Archivo


const additionalContent = '\nEste es contenido adicional.';
fs.appendFile('archivo.txt', additionalContent, (err) => {
  if (err) {
    console.error('Error al añadir contenido:', err);
    return;
  }
  console.log('Contenido añadido correctamente.');
});



Eliminar un Archivo



fs.unlink('archivo.txt', (err) => {
  if (err) {
    console.error('Error al eliminar el archivo:', err);
    return;
  }
  console.log('Archivo eliminado correctamente.');
});







Crear y Leer Directorios


Crear un Directorio

fs.mkdir('nueva_carpeta', (err) => {
  if (err) {
    console.error('Error al crear el directorio:', err);
    return;
  }
  console.log('Directorio creado correctamente.');
});


Leer un Directorio


fs.readdir('.', (err, files) => {
  if (err) {
    console.error('Error al leer el directorio:', err);
    return;
  }
  console.log('Archivos en el directorio:', files);
});


Copiar Archivos

fs.copyFile('archivo.txt', 'archivo_copia.txt', (err) => {
  if (err) {
    console.error('Error al copiar el archivo:', err);
    return;
  }
  console.log('Archivo copiado correctamente.');
});



ESCRIBIR ARCHIVOS JSON

const data = { name: 'Alice', age: 25 };

fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
  if (err) {
    console.error('Error al escribir el JSON:', err);
    return;
  }
  console.log('Archivo JSON creado correctamente.');
});


fs.readFile('data.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.error('Error al leer el JSON:', err);
    return;
  }
  const data = JSON.parse(jsonString);
  console.log('Datos JSON:', data);
});



