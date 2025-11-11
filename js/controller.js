import { Model } from "./model.js";
import { View } from "./view.js";

const model = new Model();
const view = new View();

init();

async function init() {
  await model.loadingData();

  const sortingElements = view.sortingElements();


  sortProduct();

  addEventListeners();
}

function addEventListeners() {
  view.elements.sortTypeSelect.addEventListener("change", sortProduct);
  view.elements.sortOrderSelect.addEventListener("change", sortProduct);
  view.elements.sortCategorySelect.addEventListener("change", sortProduct);
  view.elements.filterInput.addEventListener("input", filterProduct);
}

function sortProduct() {
  const sortingValue = view.sortingElementsValue();

  const sortingData = model.sortingProducts(sortingValue);

  view.renderProducts(sortingData);

}

function filterProduct() {
  const value = this.value.toLowerCase();

  model.filterSearch(value);

  console.log(value);
  
  sortProduct();
}
