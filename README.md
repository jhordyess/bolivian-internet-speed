# Velocidad de Internet en Bolivia

Representación de la velocidad de Internet en Bolivia con un interactivo Choropleth Map.

## Descripción

No es ningún secreto que la velocidad de Internet en Bolivia no esta entre las mejores, entonces este mapa ayuda a explorar los diferentes resultados obtenidos, tomando en cuenta la velocidad de descarga y dispositivos conectados a Internet fijo del año 2021.

La información requerida para representar el Choropleth fue consultada gracias a un archivo GEOJSON existente en el repositorio: [velocidad_internet_BO](https://github.com/lab-tecnosocial/velocidad_internet_BO/) de [@lab-tecnosocial](https://github.com/lab-tecnosocial).

### Tecnologías usadas

- Librerías de JS: [Leaflet](https://leafletjs.com/)
- Librerías de CSS: [TailwindCSS](https://tailwindcss.com/)
- Lenguaje de Programación: [TypeScript](https://www.typescriptlang.org/)
- Build tool: [Vite](https://vitejs.dev/)
- Hosting: [GitHub Pages](https://pages.github.com/)
- Entorno de desarrollo: [VSCode](https://code.visualstudio.com/) con [dev containers](https://code.visualstudio.com/docs/remote/containers) en [Zorin OS](https://zorinos.com/)

### Online

Visita la página funcionando: <https://jhordyess.github.io/bolivian-internet-speed>

## Cómo usar

1. Clonar el repositorio:

```bash
git clone git@github.com:jhordyess/bolivian-internet-speed.git
```

2. Abrir el proyecto:

```bash
cd bolivian-internet-speed
```

3. Instalar las dependencias:

```bash
yarn
```

4. Iniciar el proyecto:

```bash
yarn dev
```

5. Abrir el navegador en <http://localhost:5173/bolivian-internet-speed/>

## Cómo usar con VSCode Dev Containers

Puedes usar los dev containers de VSCode para ejecutar el proyecto en un contenedor de Docker.

Necesitas tener instalado [Docker](https://www.docker.com/) y [VSCode](https://code.visualstudio.com/), y la extensión [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

1. Clonar el repositorio:

```bash
git clone git@github.com:jhordyess/bolivian-internet-speed.git
```

2. Abrir el proyecto con VSCode:

```bash
code bolivian-internet-speed
```

3. Abrir la paleta de comandos y seleccionar la opción `Dev Containers: Reopen in Container`.

4. Esperar a que se construya el contenedor y se inicie el proyecto.

5. Abrir la terminal en VSCode e iniciar el proyecto:

```bash
yarn dev
```

6. Abrir el navegador en <http://localhost:5173/bolivian-internet-speed/>

## TO-DO

- Añadir información para las escalas usadas.
- Tomar en cuenta velocidad de subida.
- El repo [velocidad_internet_BO](https://github.com/lab-tecnosocial/velocidad_internet_BO/), tiene también información respecto a la velocidad de dispositivos móviles.
- Añadir una barra de buscador 🤔
- etc

## Contribución

Si quieres contribuir al proyecto, abre una issue o haz un pull request al repositorio.

## License

© 2023> [Jhordyess](https://github.com/jhordyess). Under the [MIT](https://choosealicense.com/licenses/mit/) license. See the [LICENSE](./LICENSE) file for more details.

---

Made with 💪 by [Jhordyess](https://www.jhordyess.com/)
