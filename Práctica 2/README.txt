Para esta segunda practica se os pide que realizar la API para un banco. Para ello se piden los siguientes endpoints:

getUser/parametro -> devolvera el usuario que se le pase por parámetros. Para encontrar ese usuario se podra usar cualquier campo único

addUser -> Añadira un usuario a la base de datos del banco
  Email
  Nombre
  Apellido
  Telefono
  DNI

deleteUser/email -> eliminará un usuario de la base de datos del banco

addTransaction -> Añadira una transaccion a un usuario.

La base de datos debera constar de las siguientes colecciones

Users:
  DNI: único
  Nombre
  Apellidos
  Telefono: único
  Email: único
  IBAN: único
  ID: único

Los datos como el IBAN, email y DNI deberan asegurarse que cumple con los formatos concretos

Transactions:
  ID_Sender
  ID_Reciber
  amount

Los ID deberan ser los ID de la coleccion Users

Para la realizacion de esta practica se tendra en cuenta lo siguiente:

Se gestionen los errores, si el servidor se para por un error sera un suspenso
Siempre se devuelva una respuesta a las peticiones
Se usan los HTTP Codes correctos en cada peticion
Se usan los mètodos correctos segun lo visto en clase
