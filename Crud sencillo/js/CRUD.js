export class CRUD{ // se crea una clase llamada CRUD
    #tableName = null; // se crea una variable privada llamada "#tableName"
    #data = null; // se crea una variable privada llamada "#data"

    constructor(tableName){ // se usa el metodo constructor para crear e inicializar el objeto "tableName"
        this.#setTableName(tableName); // se indica con la palabra reservada "this" que el objeto "tableName" puede ser diferente cada que se invoque y se especifica con la palabra reservada "set" que el objeto se actualizara y sera unica siempre
        this.#setData(); //se indica con la palabra reservada "this" que el objeto "Data" puede ser diferente cada que se invoque
    }

    #setTableName(tableName){ // se crea el metodo llamado "setTableName" y se toma como argumento "tableName"
        this.#tableNameValidate(tableName); //se crea el metodo "tabbleNameValidate" que toma como parametro "tabbleName" indicandole con "this" que puede cambiar su contenido
        this.tableName = tableName; // se le asigna el valor de "tableName" a la variable privada "#tableName" indicandole con "this" que puede cambiar
    }

    #setData(){// se crea el metodo llamado "setData" 
        let dataRepository = this.#get(this.tableName); // se declara la variable "dataRepository" de manera local con la palabra reservada "let", se especifica que el contenido de la variable puede cambiar con la pablabra reservada "this" y se obtiene con la palabra reservada "get"  el argumento "key"
        this.#data = dataRepository === null ? [] : dataRepository;
    }

    #tableNameValidate(tableName){ //se crea el metodo "tabbleNameValidate" que toma como parametro "tabbleName"
        if (tableName == undefined) throw new Error("Nombre de la tabla requerido"); //se indica con una condicion que "si,'tableName' no esta definido, enviara  una 'exception' con la palabra reservada throw ('new Error' es la excepton)"
    }

    #save(){ // se crea el metodo "save"
        let dataToSave = JSON.stringify(this.#data); 
        sessionStorage.setItem(this.#tableName, dataToSave);
    }

    #get(key){ // se crea el metodo "get" con el parametro "key"
        let data = sessionStorage.getItem(key); // se declara la variable data de manera local con "let" , se accede al objeto actual y se obtiene el item key con la palabra reservada "sessionStorage" y "getItem" respectivamente 
        return JSON.parse(data); // analiza el texto la cadena de texto transformada anteriormente por "JSON.stringgify" y con la palabra reservada JSON.parse se le da el formato de texto obtenido
    }

    #existElementWithId(){  // se crea el metodo "existElementWithId"
        return this.#data[id] === undefined ? false : true; //si el id ya existe el metodo "existElementwithId" retorna "false" y si el id no existe retorna true
    }

    #checkExistElementWithId(){ // se crea un metodo llamado "chekExistElementWithId"
        if(!this.#existElementWithId(id)) // si el elemento con el id ya existe retorna una exception
        throw new Error("Este elemento no existe");
    }

    create(data){
        this.#data.push(data);
        this.#save();
        return this.#data.length;
    }

    read(id){
        this.#checkExistElementWithId(id);
        return this.#data[id];
    }

    readAll(){
        return this.#data;
    }
    
    update(id,data){
        this.#checkExistElementWithId(id);
        this.#data[id] = data;
        this.#save();
        return true;
    }

    delete(id){
        this.#checkExistElementWithId(id);
        this.#data.splice(id, 1);
        this.#save();
        return true;
    }
}