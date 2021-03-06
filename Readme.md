# Nodepop APIv1 Instrucciones de uso

## Aplicación desplegada

La aplicación se encuentra desplegada en la siguiente URL:

*http://fjhonrubia.cloudapp.net*

Para poder realizar las pruebas de una forma más sencilla para el ejercicio 1, puede usarse el fichero *nodepop.json* para *iodocs* que se encuentra ubicado en el directorio *nodepop/iodocs/*

Para poder recuperar una imagen, primero hay que autentificarse con un usuario que se encuentre registrado por ejemplo:

*fjhonrubia.cloudapp.net/apiv2/autenticacion?mail=fjhonrubia@mail.com&password=fjhonrubia*

Esto proporcionará un token que hay que utilizar en la llamada de la recuperación de la imagen que será de la siguiente forma:

*fjhonrubia.cloudapp.net/apiv2/anuncios/images/iphone.jpeg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjI5MTM2Mjc5NmQ2N2Q2NTRlN2E4ZWEiLCJub21icmUiOiJmamhvbnJ1YmlhIiwibWFpbCI6ImZqaG9ucnViaWFAbWFpbC5jb20iLCJwYXNzIjoiNWQ5NDFhMzYwNGUwYzc0MzFiY2Q2ZmY5ODYzN2M4MjBlMWE5ODljNGZiNzI4YzMyZDlkYzY4ZmZiNGI3MjExYSIsIl9fdiI6MH0.pEoYM3CK0MLaQfPJA5ipwCCgIliSYqGKp0FC4bkGsLk*

Existen dos imágenes para poder recuperar:

iphone.jpeg
bicicleta.jpeg


Para comprobar el ejercicio 2, es posible acceder a la siguiente dirección IP:

*http://23.99.213.192/*

## Instalación

Para llevar a cabo la instalación de Nodepop hace falta ejecutar el siguiente comando:

*npm install nodepop*

## Comprobación del código con JSHIT

Se ha creado un script dentro de Nodepop para poder ejecutar jshit dentro del proyecto excluyendo el directorio ./node_modules. Para pasarlo, se deberá ejecutar el siguiente comando:

*npm run jshint*

Esto llevará a cabo al instalación del API junto con todos los módulos que necesita

## Comprobación del código con JSCS

Se ha creado un script dentro de Nodepop para poder ejecutar jscs. Las excepciones se han incluido en el fichero .jscsignore. Para pasar estas validaciones hay que ejecutar el siguiente comando:

*npm run jscs*

## Creación de la base de datos y publicación de datos de ejemplo

Una vez que se ha instalado nodepop, es posible crear la base de datos MongoDB junto con sus colecciones y documentos mediante el siguiente comando:

*npm run installDB*

Esto creará, o eliminará y volverá a crear nuevamente la siguiente estructura de colecciones y documentos en MongoDB:

nodepop (colección)  
|   
|--anuncios (documento)  
|--usuarios (documento)  
|--pushtokens (documento)  

## Ejecución de nodepop (Producción y Desarrollo)

Para poner en ejecución nodepop en producción, hay que ejecutar el siguiente comando:

*npm start*

Es posible ejecutar nodepop en modo desarrollo de la siguiente forma:

*npm run dev*

## Llamadas al API

A continuación se indicará las distintas operaciones y resultados que pueden realizarse y obtenerse en nodepop.

Todas las llamadas al API **deben** tener un parámetro pasado en la cabecera que se denomine **idioma** para seleccionar el idioma de los mensajes de error. Sus posibles valores son: **es** (Español) o **en** (inglés).

### Registro de usuarios

Para poder registrar un nuevo usuario, se debe ejecutar la siguiente llamada de tipo POST como en el siguiente ejemplo:

*http://localhost:3001/apiv2/usuarios/registrarUsuario?nombre=usr1&mail=mail@usr1.com&password=passUsr1*

En esta llamada existen los siguientes parámetros:

**nombre-->** Indica el nombre con el que se registra el usuario.

**mail-->** Indica la dirección de correo con la que se registra el usuario. Se comprueba que se trata de un mail correcto y bien formado.

**password-->** Indica el password para el usuario. Se almacenará encriptado en base de datos.

Las posibles salidas de esta llamada son:

A. Si no ocurre ningún error se retorna un objeto json con la siguiente estructura:

{usuario: {
	nombre: <Nombre del usuario dado de alta>,
	mail: <Mail del usuario dado de alta>,
	pass: <Password del usuario encriptado y almacenado en BD>
	}
}

B. Si hay algún error se retorna un objeto json con el siguiente formato:

{ ok: false,
error: {
	code: <Código del error>
	msg: <Descripción del error en función del idioma pasado como parámetro>
	}
}

### Autenticación de usuarios

Para poder realizar una autenticación de un usuario, hay que hacer una llamada de tipo POST como en el siguiente ejemplo:

*http://localhost:3001/apiv2/autenticacion?mail=mail@usr1.com&password=passUsr1*

En esta llamada existen los siguientes parámetros:

**mail-->** Indica la dirección de correo con la que se ha registrado el usuario. 

**password-->** Indica el password para el usuario.

Las posibles salidas de esta llamada son:

A. Si no ocurre ningún error se retorna un objeto json con la siguiente estructura:

{ok: true,
token: <token para las peticiones que necesitan autenticación>
}

B. Si hay algún error se retorna un objeto json con el siguiente formato:

{ ok: false,
error: {
	code: <Código del error>
	msg: <Descripción del error en función del idioma pasado como parámetro>
	}
}

### Almacenamiento de tokens push

Para poder llevar a cabo un almacenamiento de tokens push, hay que hacer una llamada de tipo PUT como en el siguiente ejemplo:

*http://localhost:3001/apiv2/tokens/registrarToken?token=pushtoken&usuario=usr1*

En esta llamada existen los siguientes parámetros:

**token-->** Indica el token push que se desea almacenar en la base de datos.

**usuario-->** Indica el usuario que asociado al token a almacenar.

Las posibles salidas de esta llamada son:

A. Si no ocurre ningún error se retorna un objeto json con la siguiente estructura:

{
token: <token push almacenado en la base de datos>
}

B. Si hay algún error se retorna un objeto json con el siguiente formato:

{ ok: false,
error: {
	code: <Código del error>
	msg: <Descripción del error en función del idioma pasado como parámetro>
	}
}

### Anuncios 

A continuación se listarán todas las operaciones que pueden llevarse a cabo con anuncios. Para todas ellas hay que especificar el siguiente parámetro:

**token-->**Indica el valor del token del usuario.

#### Listado de anuncios

Para poder listar los anuncios almacenados, hay que hacer una llamada de tipo GET como la del siguiente ejemplo:

*http://localhost:3001/apiv2/anuncios/listaAnuncios?nombre=articulo1&venta=true&precio=10-50&tag=work&start=1&limit=2&sort=nombre&token=tokenusuario*

En esta llamada existen los siguientes parámetros:

**nombre-->** Indica la cadena de texto por la que debe comenzar el nombre del artículo.

**venta-->** Puede tener los valores TRUE (se trata de un artículo de venta) o FALSE (se trata de un artículo de compra).

**precio-->** Indica el rango de precios del artículo que se está buscando. Los posibles usos que puede tener son:

				<Número1>-<Número2> : Busca los artículos cuyo precio es mayor que Número1 y menor que Número2.
				-<Número2> : Busca los artículos cuyo precio máximo es Número2
				<Número1>- : Busca los artículos cuyo precio mínimo es Número1
				
**tag-->** Indica el tag que tiene que contener el artículo.

*Opciones de paginación*

**star-->** Indica en que artículo comienza el listado devuelto.

**limit-->** Indica el número máximo de artículos que se tiene que retornar.

**sort-->** Indica el campo por el que tienen que ordenarse los resultados obtenidos.

Las posibles salidas de esta llamada son:

A. Si no ocurre ningún error se retorna un objeto json con la siguiente estructura:

{
anuncios: <lista de anuncios devueltas como resultado>
}

B. Si hay algún error se retorna un objeto json con el siguiente formato:

{ ok: false,
error: {
	code: <Código del error>
	msg: <Descripción del error en función del idioma pasado como parámetro>
	}
}

#### Listado de tags

Para poder listar los tags almacenados, hay que hacer una llamada de tipo GET como la del siguiente ejemplo:

*http://localhost:3001/apiv2/anuncios/listaTags?token=tokenusuario*

En esta llamada existen los siguientes parámetros:

Las posibles salidas de esta llamada son:

A. Si no ocurre ningún error se retorna un objeto json con la siguiente estructura:

{
tags: <lista de tags devueltos como resultado>
}

B. Si hay algún error se retorna un objeto json con el siguiente formato:

{ ok: false,
error: {
	code: <Código del error>
	msg: <Descripción del error en función del idioma pasado como parámetro>
	}
}

#### Recuperación de imágenes

Para poder recuperar una imagen, hay que hacer una llamada de tipo GET como la del siguiente ejemplo:

*http://localhost:3001/apiv2/anuncios/images/iphone.jpeg?token=tokenusuario*

En esta llamada existen los siguientes parámetros:

**es-->**  Indica el idioma de los mensajes de error que se obtienen. En este caso solamente son posibles los valores **es** (español) o **en** (inglés).

**imagen-->**  Indica el nombre de la imagen que se quiere recuperar.

Las posibles salidas de esta llamada son:

A. Si no ocurre ningún error se retorna la imagen que se ha solicitado. Estas, deben estar ubicadas en el directorio **/public/images**.

B. Si hay algún error se retorna un objeto json con el siguiente formato:

{ ok: false,
error: {
	code: <Código del error>
	msg: <Descripción del error en función del idioma pasado como parámetro>
	}
}
