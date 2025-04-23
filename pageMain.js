const THashStorage=(()=>{
    const listOfRecipe={}
    
    return class{
        constructor(){
            this.list=listOfRecipe;
        }
        reset() {
            this.list={}
        }
        addValue(key,value){
            this.list[key]=value;
        }
        getValue(key){
            return this.list[key]
        }
        deleteValue(key){
            if (key in this.list) {
                delete this.list[key];
                return true;
            }
            return false;
        }
        getKey(){
            console.log( Object.keys(this.list).map(key => `${key}`).join("\n"))
        }
        getList(){
            console.log( Object.keys(this.list).map(key => `${key}: ${this.list[key]}`).join("\n"))
        }
    }

})()
const storage = new THashStorage();

function addRecipe() {
    let key = prompt("Введите название рецепта:");
    let value = prompt("Введите описание рецепта:");
    storage.addValue(key,value)
    
}

function deleteRecipe() {
    let key = prompt("Введите название рецепта для удаления:");
    if (storage.deleteValue(key)) {
        alert("Рецепт удален.");
    } else {
        alert("Рецепт не найден.");
    }
}

function getRecipeInfo() {
    let key = prompt("Введите название рецепта для получения информации:");
    let info = storage.getValue(key);
    if (info !== undefined) {
        alert(info);
    } else {
        alert("Рецепт не найден.");
    }
}
function listRecipes(){
    storage.getList()
    
}
function onlyKeys(){
    storage.getKey()
    
}
function cleareList(){
    storage.reset();
    alert("Список рецептов очищен.");
}