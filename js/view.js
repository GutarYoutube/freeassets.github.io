export class View {
    constructor() {}
    elements = {
        productList: document.querySelector(".productList"),
        sortTypeSelect: document.querySelector("#sortType"),
        sortCategorySelect: document.querySelector("#sortCategory"),
        sortOrderSelect: document.querySelector("#sortOrder"),

        filterInput: document.querySelector("#filterInput"),
        
    };

    renderProducts(arrData)
    {

        this.elements.productList.innerHTML = "";
        //this.elements.productList.querySelectorAll("li").forEach((el) => el.remove());
        arrData.forEach((product) => {
           const li = document.createElement("li");
           li.innerHTML = `
               <span>${product.subtitle}</span>
               <img src=${product.imageFile} class="imageProduct" alt=""/>
               <h3>${product.name}</h3>
               <p>Вес файла: ${product.fileWeight}</p>
               <p>Дата добавления: ${product.date}</p>
               <a href="${product.pathFile}" download="${product.pathFile}">Скачать файл</a>
            `;
            const img = li.querySelector("img");
            img.addEventListener("click", () => this.FullView(img.src));
            this.elements.productList.appendChild(li);
        });
    }

    FullView(ImgLink) {
        console.log("button image");

        
        document.getElementById("FullImage").src = ImgLink;
        document.getElementById("FullImageView").style.display = "block";
    }
        
    

    sortingElementsValue() 
    {
        return{
            sortType: this.elements.sortTypeSelect.value,
            sortOrder: this.elements.sortOrderSelect.value,
            sortCategory: this.elements.sortCategorySelect.value,
        }
    }

    sortingElements() {
      return {    
        sortType: this.elements.sortTypeSelect,
      
        sortOrder: this.elements.sortOrderSelect,
      
        sortCategory: this.elements.sortCategorySelect,
    };
  }
}