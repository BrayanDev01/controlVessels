export const MockLocations ={
    getData(){
        return [
            { name: 'CT 1'},
            { name: 'CT 2'},
            { name: 'CT 3'},
            { name: 'CT 4'},
            { name: 'CT 5'},
            { name: 'CT 6'},
            { name: 'CT 9'},
            { name: 'CT 10'},
            { name: 'CT 11'},
            { name: 'CT 15'},
            { name: 'CITY XVI'},
            { name: 'CT 18'},
            { name: 'CT 20'},
            { name: 'CT 21'},
            { name: 'CITY XXII'},
            { name: 'CT 23'},
            { name: 'CITY XXV'},
            { name: 'CT 30'},
            { name: 'CITY XXXII'},
            { name: 'CITY XXXIII'},
            { name: 'CT 34'},
            { name: 'CT 35'},
            { name: 'CT 39'},
            { name: 'CT 40'},
            { name: 'CT 41'},
            { name: 'CT 42'},
            { name: 'CT 43'},
            { name: 'CT 44'},
            { name: 'CT 45'},
            { name: 'CT 47'},
            { name: 'CT 48'},
            { name: 'CT 49'},
            { name: 'CITY LI'},
            { name: 'CT 53'},
            { name: 'CT 54'},
            { name: 'CT 55'},
            { name: 'CT 56'},
            { name: 'CT 58'},
            { name: 'CT 59'},
            { name: 'CT 60'},
            { name: 'CT 61'},
            { name: 'CT 63'},
            { name: 'CT 64'},
            { name: 'CT 66'},
            { name: 'CT 67'},
            { name: 'CT 69'},
            { name: 'CT 70'},
            { name: 'CT 71'},
            { name: 'CT 72'},
            { name: 'CT 73'},
            { name: 'CT 74'},
            { name: 'CT 75'},
            { name: 'CT 79'},
            { name: 'CT 80'},
            { name: 'CT 81'},
            { name: 'CT 82'},
            { name: 'CT 86'},
            { name: 'CT 87'},
            { name: 'CT 88'},
            { name: 'CT 89'},
            { name: 'EUDOCIA'},
            { name: 'ITL I'},
            { name: 'ITL II'},
            { name: 'PRECIOSA DE DEUS'}, 
            { name: 'PRECIOSA DE DEUS I'},
            { name: 'GLORIA DE DEUS I'},
            { name: 'ABI-01'},
            { name: 'GALO DA SERRA LXII'},
            { name: 'GALO DA SERRA XLIII'},
            { name: 'GALO DA SERRA 63'},
            { name: 'NOSSA SENHORA DE NAZARÉ'},
            { name: 'BEATRIZ FARIAS II'},
            { name: 'REBECCA GISLAINE'},
            { name: 'CT 62'},
            {name: 'Navegação'},
            {name: 'Inspeção'},
            {name: 'Manutenção'},
            {name: 'SESMT'}
        ]
    },
    getLocations(){
        return Promise.resolve(this.getData())
    }
}