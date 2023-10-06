import { CRUD } from "./CRUD.js";

function app(){
    let nombre = new CRUD("ejemplo");
    nombre.create(["juan","carlos","alberto"]);
    nombre.create({ message : "hola mundo"});

    let crud2 = new CRUD("ejemplo");
    console.log(nombre.readAll());
}
app();