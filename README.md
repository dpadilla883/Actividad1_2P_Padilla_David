# Nombre: David Padilla
# NRC: 1406

# Aplicación Web de Gestión Hotelera - Hotel Manager  

## Instrucciones para Ejecutar Localmente 

Pasos para clonar, instalar y ejecutar la aplicación:

1.  **Clonar el repositorio desde GitHub:**
    
    git clone https://github.com/dpadilla883/Actividad1_2P_Padilla_David.git
    
    cd Actividad1_2P_Padilla_David
    

3.  **Instalar las dependencias del proyecto:**
    
    npm install react-router-dom
    

4.  **Iniciar la aplicación en modo de desarrollo:**
    
    npm run dev   
    

## Descripción General

**Hotel Manager** es una aplicación web moderna y eficiente diseñada para simplificar la gestión de un hotel. Desarrollada con **ReactJS** y **TypeScript**, esta aplicación nos permite administrar de manera intuitiva clientes, habitaciones y reservas, todo con persistencia de datos gracias a `localStorage`.

La aplicación nos ofrece una interfaz de usuario limpia y responsiva, estilizada con **Tailwind CSS**, facilitando la navegación y el uso en diferentes dispositivos. Es una herramienta ideal para la gestión básica de un hotel o alojamiento, permitiendo a los usuarios centrarse en brindar el mejor servicio a sus huéspedes.

## Funcionalidades Principales 

*   **Gestión Integral de Clientes :**
    *   Visualización clara de listado de clientes con información relevante (ID, Nombre Completo, Correo Electrónico).
    *   Funcionalidad para **agregar nuevos clientes** con validación de campos (correo electrónico válido, nombre no vacío).
    *   Capacidad para **editar y actualizar** la información de clientes existentes.
    *   **Persistencia de datos** utilizando `localStorage`, asegurando que la información se guarde incluso después de cerrar o recargar la página.

*   **Administración Eficiente de Habitaciones :**
    *   Listado detallado de habitaciones, incluyendo tipo (individual, doble, suite, etc.) y precio por noche.
    *   Formulario intuitivo para **agregar nuevas habitaciones** al inventario.
    *   Opción para **editar y actualizar** la información de las habitaciones existentes.
    *   Almacenamiento de datos de habitaciones en `localStorage` para una gestión persistente.

*   **Gestión de Reservas Inteligente :**
    *   Visualización consolidada de todas las reservas, mostrando cliente, habitación(es) reservada(s), fechas de inicio y fin.
    *   Proceso simplificado para **crear nuevas reservas**, permitiendo seleccionar clientes existentes, habitaciones disponibles y fechas de estancia.
    *   **Validación robusta de fechas** para asegurar que las reservas sean válidas y lógicas (fecha de inicio anterior a la fecha de fin).
    *   **Prevención de solapamiento de reservas**, garantizando que una misma habitación no pueda ser reservada para fechas que se crucen con reservas existentes.
    *   Persistencia de la información de reservas en `localStorage`.

*   **Navegación Fluida y Amigable :**
    *   Implementación de **navegación basada en rutas** con `react-router-dom`, facilitando el acceso a las diferentes secciones de la aplicación (Clientes, Habitaciones, Reservas).

## Tecnologías Utilizadas 

*   **Frontend:**
    *   **ReactJS:**  Librería de JavaScript para construir interfaces de usuario interactivas.
    *   **TypeScript:**  Superset de JavaScript que añade tipado estático, mejorando la mantenibilidad y detección de errores.
    *   **react-router-dom:**  Para la gestión de rutas y navegación dentro de la aplicación React.
    *   **Tailwind CSS:**  Framework de CSS utility-first para un diseño rápido y responsivo.

*   **Persistencia de Datos:**
    *   **localStorage:**  API del navegador para almacenar datos de forma persistente en el lado del cliente.

*   **Herramientas de Desarrollo:**
    *   **Vite:**  Herramienta de construcción rápida para el desarrollo frontend.
    *   **npm :**  Gestor de paquetes de JavaScript.

# Actividad1_2P_Padilla_David
