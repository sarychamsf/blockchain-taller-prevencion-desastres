pragma solidity ^0.5.1;

contract PrevencionDesastres {

    struct Fecha {
        uint day;
        uint month;
        uint year;
    }
        
    struct Registro {
        uint id;
        Fecha fecha;
        string latitud;
        string longitud;
        uint caudal;
        bool creado;
    }
    
    mapping (uint => Registro) registros;
    uint cantidadRegistros = 0;
    Registro registro;
    address administrador;
    
    event mensajeError (string error);
    
    constructor () public {
        administrador = msg.sender;
    }
    
    function hacerRegistro(uint id, uint day, uint month, uint year, string memory latitud, string memory longitud, uint caudal) public {
        if (registros[id].creado == false && administrador == msg.sender) {
            Fecha memory fecha = Fecha(day, month, year); 
            registro.id = id;
            registro.fecha = fecha;
            registro.latitud = latitud;
            registro.longitud = longitud;
            registro.caudal = caudal;
            registro.creado = true;
            registros[id] = registro;
            cantidadRegistros = cantidadRegistros+1;
        } else {
            emit mensajeError("El id ya existe.");
            revert();
        }
    }
    
   function consultarRegistro(uint id) public view returns(uint, uint , uint , uint , string memory , string memory , uint ) {
        if (registros[id].creado == true) {
            return(registros[id].id, registros[id].fecha.day, registros[id].fecha.month, registros[id].fecha.year, registros[id].latitud, registros[id].longitud, registros[id].caudal);
        } else {
            revert();
        }
    }

    function getRegistros() public view returns (uint) {
        return (cantidadRegistros);
    }

}