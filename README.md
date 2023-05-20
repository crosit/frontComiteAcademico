# Documentación
En este archivo se explicará todo lo relacionado al código de Sabeeo (Frontend)

# Estructura de carpetas
Distribución de carpetas en el frontend de **Sabeeo**

**Siempre que sea posible, usar la extensión *auto-barrel* sobre las carpetas (cualquiera), esto hace más sencilla la importación de los diferentes archivos sobre la app. Más información es el apartado "*Extensiones recomendadas*"**

## Carpetas
Las carpetas serán organizadas de la siguiente manera, siguiendo un estándar en algunas de ellas (en cuestión de nombrar a archivos).

Aquellas carpetas que contengan ** es porque pueden estar en src como en cada "page" del proyecto.

### Adapters **
Esta carpeta tendrá los adaptadores necesarios para nuestra app. Esta carpeta es global, pero también puede existir una carpeta "adapters" dentro de "pages".

- Para ubicar más rápido los archivos de esta carpeta, se pretende nombrar los archivos con **.adapter**, por ejemplo: *user.adapter.ts*

### Assets
Esta carpeta contendrá todos los archivos multimedia, como lo son imágenes, gifs, etc.

### Components **
Aquí se alojarán todos aquellos componentes reutilizables, los que pueden y serán usados en toda la app.

>Esta carpeta también podrá estar presente dentro de "pages", la diferencia es, que cuando esto sea así, los componentes **solo** serán reutilizados en esa misma vista/modulo

### Hooks **
Aquí serán guardados todos nuestros custom hooks que serán reutilizados en toda la aplicación.

> Así como la carpeta *components*, la carpeta de hooks puede estar situada en una *page*, pero respetando que esos hooks solo serán usados dentro de esa vista/modulo.

### Interceptors
Los interceptores de la aplicación serán puestos aquí.

- Para ubicar más rápido los archivos de esta carpeta, se pretende nombrar los archivos con **.interceptor**, por ejemplo: *fetch.interceptor.ts*

> Esta carpeta puede estar situada en una *page*, pero respetando que esos interceptors **solo** serán usados dentro de esa vista/modulo.

### Pages
Dentro de pages, cada nuevo folder representará una vista, y dentro de este, tendrá su *index*, así como (opcionalmente) las carpetas necesarias.

Habrá una carpeta *views*, que contendrá a su vez otro folder con el nombre de la sub-vista y su respectivo index.

> Esta carpeta puede estar situada en una *page*, pero respetando que esos modelos **solo** serán usados dentro de esa vista/modulo.

### Models
Sobre esta carpeta estarán todos los modelos que serán usados en la aplicación de manera global.

> Esta carpeta puede estar situada en una *page*, pero respetando que esos modelos **solo** serán usados dentro de esa vista/modulo.

### Redux
Aquí estará toda la lógica de redux. El index será el store, mientras que cada folder será una entidad de la aplicación con sus respectivos states, reducers, etc.

### Services
Todas aquellas funciones o conexiones con servicios externos (como API's) estarán dentro de Services.

> Esta carpeta puede estar situada en una *page*, pero respetando que esos servicios **solo** serán usados dentro de esa vista/modulo.

### Styles
Los estilos globales que serán usados en toda la app estarán aquí.

> Esta carpeta puede estar situada en una *page*, pero respetando que esos estilos **solo** serán usados dentro de esa vista/modulo.

### Utilities
Las funciones que pueden ser reutilizadas en toda la aplicación, como, por ejemplo; dar formato a una fecha.

- Para ubicar más rápido los archivos de esta carpeta, se pretende nombrar los archivos con **.utility**, por ejemplo: *format-date.utility.ts*


# React-Router
Para este proyecto se uso React-Router V6.
Las rutas para navegar entre vistas se encuentran en "src/pages/router". Este archivo contiene la lógica de navegación de la app.

Path = Ruta en la app.
Element = Vista / Componente
entre otros.

Documentación: https://reactrouter.com/en/main


# Extenciones
Aquí algunas extenciones recomendadas para usar en el proyecto:
- **Autobarrel**: esta nos ayuda a crear un *index* en una carpeta. Este index exporta todo lo que yace sobre el folder, lo que facilita la exportación de todos esos archivos. Así, en lugar de tener varias líneas de importaciones de una sola carpeta, será solo una línea.
- Para ubicar más rápido los archivos de esta carpeta, se pretende nombrar los archivos con **.utility**, por ejemplo: *format-date.utility.ts*

# Internacionalización
La app será multi-idioma, y por este momento, solo se soportará Ingles y Español. La librería usada para esta característica es i18next, la cuál nos permite crear nuestros diccionarios y mediante un hook, traducir la palabra.
Dentro del folder *"src/utilities/multi-lng/languages"* se encuentran los dos archivos que fungen como "diccionarios", uno en ingles y otro en español. Es un objeto como tal; **key = palabra**, la key es lo importante, ya que debe coincidir en ambos archivos para que funcione, y su valor será la palabra en el idioma.
Dentro de la app, al escribir, no se hará en texto como tal, sino que se llamara al hook **useTranslation**, y se extrará la funcion **t**. Esta función será la que llamaremos donde querramos insertar texto. En la función pondremos la *key* a traducir, por ejemplo:

t('accept')  = 'aceptar' || 'accept' (esto dependiendo del idioma en el que estemos en la app)

El idioma actual se guarda en el localStorage, y se guarda como una key: en || es.

En los archivos de language, las key las escribiremos en ingles, no importando si estamos en el archivo de español o ingles, estos porque deben coincidir en ambos archivos, lo que cambia es el valor. 
Dentro del archivo, dividiremos en objetos las palabras según la vista/modulo donde se usarán. Si la palabra es común, como "aceptar", irán dentro de "common". Si una palabra o parrafo solo se usará en cierta vista, se crea una propiedad objeto que contenga esas palabras/textos. 
Ejemplo:

{
    common: {
        'accept': 'aceptar'.
    }
    home: {
        'Welcome': 'Bienvenido a la app'
    }
}


# SASS
Sass es el preprocesador usado en este proyecto, esto nos permite modularizar los estilos. Cada *partial* (archivo) debe tener un *underscore* (_), excepto por el archivo **main**. Y cada archivo debe tener la extensión **.scss**
La estructura que se usará es la siguiente:

-  **base**: En esta carpeta estarán las variables, mixins, etc. que se usarán en el resto de los archivos. Ejemplo: _variables, _mixins.
-  **components**: Cada archivo dentro representará los estilos de un componente, como lo puede ser un botón, un input, etc.
-  **layout**: Cada archivo representará una parte de la estructura de la web, como lo son el header, el navbar, etc.
-  **pages**: Cada archivo representa una vista (page) de la aplicación.

El archivo **main** estará en la raíz de _src/styles_ y servirá solamente para importar todos los demás archivos.