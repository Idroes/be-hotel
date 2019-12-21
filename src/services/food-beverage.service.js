export default class FoodBeverageService {
  setRepository(repo) {
    this.repo = repo;
    return this;
  }

  async getListFoodBeverageActive() {
    return await this.repo.listFoodBeverageActive();
  }

  async getListFoodBeverage() {
    return await this.repo.listFoodBeverage();
  }

  async addFoodBeverageServ(entity) {
    let temp = entity.foodBeverageName.split(" ");
    let countRows = await this.repo.listFoodBeverage();
    let foodBeverageCode = "";
    for (let i = 0; i < temp.length; i++) {
      foodBeverageCode = foodBeverageCode + temp[i].charAt(0).toUpperCase();
    }
    foodBeverageCode = foodBeverageCode + (countRows.length + 1);

    entity = {
      ...entity,
      foodBeverageCode: foodBeverageCode,
      statusFoodBeverage: 1
    };
    return await this.repo.addFoodBeverage(entity);
  }

  async updateFoodBeverageServ(entity) {
    await this.repo.updateFoodBeverage(entity);
    return await this.repo.findFoodBeverageById(entity.idFoodBeverage);
  }

  async deleteFoodBeverageServ(entity) {
    entity = {
      ...entity,
      statusFoodBeverage: 0
    };
    await this.repo.deleteFoodBeverage(entity);
    return await this.repo.findFoodBeverageById(entity.idFoodBeverage);
  }

  async uploadFoodBeverageImages(listImageFoodBeverage) {
    return await this.repo.addImageFoodBeverage(listImageFoodBeverage);
  }

  async getListImagesFoodBeverageByFoodBeverageId(id) {
    return await this.repo.findFoodBeverageImageByFoodBeverageId(id);
  }

  async deleteFoodBeverageImageServ(id) {
    return await this.repo.deleteImageFoodBeverage(id);
  }
}
