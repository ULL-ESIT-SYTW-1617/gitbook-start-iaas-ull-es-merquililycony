# Práctica 4: Nueva funcionalidad para el paquete npm
## Paquete: gitbook-start-iaas-ull-es.merquililycony


# Objetivo:
*El objetivo de esta práctica es extender el package NodeJS publicado en npm en una práctica anterior con una nueva*
*funcionalidad que permita que los usuarios realizar un despliegue automatico en el servidor de IAAS*

## Instalación

### Instalar el paquete gitbook-start
~~~
    $ npm install -g nueva-funcionalidad-para-el-paquete-npm-merquililycony
~~~

### Construir el libro con el paquete instalado

~~~
    $ gitbook-start  -d <directorio> --name <nombre_gitbook> --author <nombre del autor> --url <url del repositorio> --version
~~~

### Situarse dentro de la carpeta en donde creamos el libro e instalar dependencias

~~~
    $ cd <dir>
    $ npm install

### Instalamos el plugin con --save

~~~
    $ npm install --save gitbook-start-iaas-ull-es-merquililycony
~~~

### Ejecutar el plugin

~~~
    gitbook-start --deploy iaas-ull-es --IP <ip> --usuario <usuario> --path<ruta>
~~~

    
## Enlaces :

 **Enlace al campus virtual**

 * [Enunciado](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicaplugin.html)

 **Repositorio GitHuB donde se realizó la práctica**

 * [Organización](https://github.com/ULL-ESIT-SYTW-1617/gitbook-start-iaas-ull-es-merquililycony/)
 **Enlace a Gh-pages**

 * [gh-pages](https://ull-esit-sytw-1617.github.io/nueva-funcionalidad-para-el-paquete-npm-plugins-merquililycony/)

 * [npm](https://www.npmjs.com/package/gitbook-start-iaas-ull-es-merquililycony)

 **Página de los autores**

 * [Constanza](http://alu0100673647.github.io)
 * [Merquis](http://merquis.github.io)
 * [Liliana](https://alu0100762846.github.io)


