# Simulador de Entrevistas Técnicas 🚀

Una plataforma web interactiva diseñada para ayudar a los desarrolladores a prepararse para entrevistas técnicas de programación. Los usuarios pueden resolver retos algorítmicos en tiempo real con evaluación de código automatizada.

## ✨ Características Principales

- **Evaluación de Código en Múltiples Lenguajes**: Soporte integrado para JavaScript, Python, Java, C++ y C# gracias a la integración con la API de Judge0 CE.
- **Interfaz Moderna y Oscura (Dark Theme)**: Un diseño profesional e inmersivo basado en tonos "Slate" para reducir la fatiga visual durante largas sesiones de código.
- **Gestión de Retos y Casos de Prueba**: Sistema para crear, editar y categorizar retos técnicos, incluyendo la ejecución de casos de prueba visibles y ocultos.
- **Sistema de Categorías (Badges)**: Etiquetas visuales limpias para clasificar los retos por dificultad o tema.
- **Optimizado para Entornos Gratuitos**: Configuración del Pool de MySQL ajustada (límite de 4 conexiones simultáneas) para mantenerse dentro de los límites de plataformas de hosting gratuito de bases de datos como Filess.io.

## 🛠️ Stack Tecnológico

- **Backend**: Node.js, Express.js.
- **Motor de Plantillas (Frontend)**: EJS (Embedded JavaScript templating).
- **Base de Datos**: MySQL (manejado vía `mysql2`).
- **Ejecución de Código Remoto**: Judge0 API.
- **Estilos**: CSS Puro (Custom Slate Dark Theme).

## 🗂️ Estructura del Proyecto

```text
├── public/                 # Archivos estáticos (CSS, JS cliente, imágenes)
│   └── css/style.css       # Estilos principales de la interfaz
├── src/
│   ├── config/             # Configuración del entorno (ej. db.js para la conexión MySQL)
│   ├── controllers/        # Lógica de negocio (auth, retos, bancos)
│   ├── models/             # Modelos de datos y consultas SQL
│   ├── routes/             # Definición de endpoints y rutas de Express
│   └── views/              # Vistas EJS (home, login, lista de retos, resolver reto)
├── .env                    # Variables de entorno (No incluido en el repo)
├── app.js                  # Punto de entrada de la aplicación
└── package.json            # Dependencias y scripts del proyecto
```

## ⚙️ Requisitos Previos

- [Node.js](https://nodejs.org/es/) (v14 o superior)
- [MySQL](https://www.mysql.com/) (Local o alojado en la nube como Filess.io o Clever Cloud)

## 🚀 Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd simulador-entrevistas
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto y agrega tus credenciales de base de datos siguiendo este formato:
   ```env
   DB_HOST=tu_host_mysql
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_de_bd
   DB_PORT=3306
   ```

4. **Ejecutar la aplicación**:
   ```bash
   npm start
   ```
   *Alternativamente, usar `npm run dev` si tienes configurado nodemon.*

5. **Acceder en el navegador**:
   Abre [http://localhost:3000](http://localhost:3000) (o el puerto configurado).

## 🧠 Funcionamiento del Editor Remoto (Judge0)

Al abrir la vista de un reto (`resolver.ejs`), el código provisto por el usuario pasa por un sistema de *wrappers*. Esto significa que, dependiendo del lenguaje (Java, C++, JS, Python), la plataforma inyecta dinámicamente configuraciones previas y manejo de dependencias de entradas/salidas (STDIN/STDOUT) en segundo plano antes de enviarlo por medio de HTTP POST a la API pública de Judge0. Una vez evaluado, el servidor devuelve el veredicto en tiempo real al panel lateral de la consola del usuario.
