export class Registro {

    id: number;
    day: number;
    month: number;
    year: number;
    latitud: string;
    longitud: string;
    caudal: string;

    constructor(id: number, day: number, month: number, year: number, latitud: string, longitud: string, caudal: string) {
        this.id=id;
        this.day=day;
        this.month=month;
        this.year=year;
        this.latitud=latitud;
        this.longitud=longitud;
        this.caudal=caudal;
    }

}