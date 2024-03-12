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
}
const photographerData = {
    id: 1,
    name: "John Doe",
    city: "Paris",
    country: "France",
    tagline: "Capturing moments",
    price: 100,
    portrait: "url/to/portrait.jpg"
  };
  
  const photographer = new PhotographerModel(photographerData);
  console.log(photographer);