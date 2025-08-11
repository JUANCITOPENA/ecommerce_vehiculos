# 🚗 GarageOnline - Ecommerce de Vehículos

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![GitHub stars](https://img.shields.io/github/stars/TU-USUARIO/ecommerce-vehiculos?style=social)

Bienvenido a **GarageOnline**, un sofisticado y altamente interactivo sitio de comercio electrónico para la venta de vehículos. Este proyecto fue desarrollado como una demostración de habilidades en desarrollo frontend, utilizando tecnologías web modernas para crear una experiencia de usuario fluida, adaptativa y accesible.

[➡️ **Ver el Sitio en Vivo**](https://juancitopena.github.io/ecommerce_vehiculos/)  *(¡Reemplaza este enlace con tu URL de GitHub Pages!)*

---

## 🌟 Características Principales

-   **Interfaz Dinámica y Adaptativa**: Diseño 100% responsivo que se adapta a cualquier dispositivo (escritorio, tablet, móvil) gracias a Bootstrap 5.
-   **Carga Asíncrona de Datos**: Los vehículos se cargan dinámicamente desde un archivo JSON externo usando la `Fetch API` y `async/await`, sin recargar la página.
-   **Búsqueda y Filtrado en Tiempo Real**: Un buscador interactivo que filtra el catálogo de vehículos por marca, modelo o categoría al instante.
-   **Carrito de Compras Completo**:
    -   🛒 Añadir productos especificando la cantidad.
    -   🛍️ Visualización del carrito en un modal con desglose de ítems y total.
    -   🔢 Contador de ítems en tiempo real en la barra de navegación con una sutil animación.
-   **Simulación de Proceso de Pago**: Un flujo de pago que culmina con la generación y descarga de una **factura en formato PDF** 📄 utilizando `jsPDF`.
-   **Accesibilidad (A11y)**: Implementación de HTML semántico y atributos ARIA para garantizar la compatibilidad con lectores de pantalla y cumplir con las pautas WCAG (Nivel AA).
-   **Experiencia de Usuario (UX) Mejorada**:
    -    spinners de carga para indicar procesos asíncronos.
    -   Efectos `hover` suaves en las tarjetas de productos.
    -   Imágenes con carga diferida (`loading="lazy"`) para optimizar el rendimiento.

---

## 🛠️ Tecnologías y Herramientas Utilizadas

Este proyecto fue construido utilizando únicamente tecnologías del lado del cliente, sin necesidad de un backend.

| Tecnología           | Icono                                                                    | Propósito                                      |
| -------------------- | ------------------------------------------------------------------------ | ---------------------------------------------- |
| **HTML5**            | ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) | Estructura semántica y accesible.              |
| **CSS3**             | ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) | Estilos personalizados, animaciones y diseño.  |
| **JavaScript (ES6+)**| ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) | Lógica de la aplicación, interactividad y DOM. |
| **Bootstrap 5**      | ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) | Framework CSS para diseño adaptativo y componentes UI. |
| **Font Awesome**     | ![Font Awesome](https://img.shields.io/badge/Font%20Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white) | Iconografía moderna y consistente.             |
| **jsPDF**            | ![PDF](https://img.shields.io/badge/jsPDF-library-red?style=for-the-badge) | Generación de facturas en PDF en el cliente.   |
| **Git & GitHub**     | ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) | Control de versiones y despliegue con GitHub Pages. |

---

## 🚀 Instalación y Uso Local

Para ejecutar este proyecto en tu máquina local, sigue estos sencillos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/TU-USUARIO/ecommerce-vehiculos.git
    ```

2.  **Navega a la carpeta del proyecto:**
    ```bash
    cd ecommerce-vehiculos
    ```

3.  **Abre `index.html` en tu navegador:**
    Puedes hacer doble clic en el archivo `index.html` directamente desde tu explorador de archivos, o si usas VSCode, puedes usar la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para una mejor experiencia de desarrollo.

¡Y eso es todo! No se requiere compilación ni instalación de dependencias.

---

## 📂 Estructura del Proyecto

El proyecto está organizado de manera clara y modular para facilitar su mantenimiento y escalabilidad.

/
├── 📄 index.html # Archivo principal con la estructura del sitio.
├── 🎨 style.css # Hoja de estilos personalizados.
└── ⚙️ script.js # Lógica de JavaScript (carga de datos, carrito, etc.).
└── 📖 README.md # Este archivo.

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

Creado con ❤️ por **[Tu Nombre]**.
