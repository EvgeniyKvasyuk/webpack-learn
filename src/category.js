export class Category {
  category = {};

  setCategory(name){
    this.category.name = name;
  }

  getCategory() {
    console.log(this.category);
  }

}