export class PhotographerModel {
    constructor(datas) {
        const { id, name, city, country, tagline, price , portrait}=datas;

        this.id=id;
        this.name=name;
        this.city=city;
        this.country=country;
        this.tagline=tagline;
        this.price=price;
        this.portrait=portrait;
    }

    getFirstName(){
    
        
        return (this.name.split(' ')[0]).replace('-',' ');
       

    }
}
