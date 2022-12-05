Para esta tercera práctica se pide que desarrolléis una API REST para una librería. 

Se deberá crear un .env con los siguientes campos
  URL_MONGO = con la url al servidor de mongo
  PORT = con el puerto para que corra el servidor
  NO se puede subir el .env al repositorio, en este caso se deberá subir un .env.sample

La base de datos debera ser OBLIGATORIAMENTE con MongoDB y tendra las siguientes colecciones:

User
  name
  email
  password (debe estar cifrada)
  createdAt
  cart (array de ids de los libros)

Books
  title
  author
  pages
  ISBN: creado usando una libreria que cree IDs únicos (ex: uuid )

Author
  name
  books (array de ids de los libros)

Todas las colecciones usarán como ID el ID que genera Mongo

Como endpoints debera tener lo siguientes

addUser -> Post = añadirá un usuario a la bbdd
  name
  email
  password
  
addAuthor -> Post = añadirá un autor a la bbdd
  name
  
addBook -> Post = añadira un libro a la bbdd
  title
  author
  pages

deleteUser -> Delete = eliminará un usuario
  _id (id mongo)

updateCart -> Put = añadirá un libro al carrito
  id_book
  id_user

getBooks -> Get = devolvera una lista paginada de como maximo 10 libros. Los parametros se deberan pasar por url.
  page: indicando la pagina que queremos (empezara por 0)
  title: campo opcional indicando el titulo que queremos
  http://localhost:PORT/getBooks?page=1&title=prueba

getUser/id -> Get = devolverá un usuario 
  se usuará el _id de Mongo
