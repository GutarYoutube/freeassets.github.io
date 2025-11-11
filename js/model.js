export class Model {
    constructor() {
        this.data = [];
        this.filterData = [];
    }

    async loadingData() {
        return new Promise((resolve, reject) => {
            fetch("data.json")
               .then((res) => res.json())
               .then((data) => {
                  this.data = data;
                  this.filterData = [...this.data];

                  resolve();
               })
               .catch((err) => {
                console.error("Ошибка загрузки данных", err);
                reject(err);
               });
        });
    }

    sortingProducts(sortingValue) {
        const { sortType, sortOrder, sortCategory } = sortingValue;

        let filterData;

        if (sortCategory !== "all") {
            filterData = this.filterData.filter((request) => {
                return request.category === sortCategory;
            });
        } else {
            filterData = [...this.filterData];
        }
        return filterData.sort((a,b) => {
            switch (sortType)
            {
                case 'date':
                    return sortOrder === 'desc' 
                       ? Date.parse(a.date) - Date.parse(b.date)
                       : Date.parse(b.date) - Date.parse(a.date);

                case 'alphabet':
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();

                    if (sortOrder === 'desc') {
                        if (nameA < nameB) {
                            return 1;
                        }
                        else if (nameA > nameB) {
                            return -1;
                        }
                        else {
                            return 0;
                        }
                    }

                    else if (sortOrder === 'asc') {
                        if (nameA > nameB) {
                            return 1;
                        }
                        else if (nameA < nameB) {
                            return -1;
                        }
                        else {
                            return 0;
                        }
                    }

                case 'fileWeight':
                    const fileWeightA = a.fileWeight;
                    const fileWeightB = b.fileWeight;

                    return sortOrder === 'desc' 
                       ? fileWeightA - fileWeightB
                       : fileWeightB - fileWeightA;
            
                default:
                    return 0;
            }
        });

    }

    filterSearch(value) {
        if (value === ""){
            this.filterData = [...this.data]
        }
        else
        {
            this.filterData = this.data.filter((product) => 
                product.name.toLowerCase().includes(value)
            );
        }
    }
}