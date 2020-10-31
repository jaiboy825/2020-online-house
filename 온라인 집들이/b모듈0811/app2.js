function cho(str){
    let arr = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"]
    let result = [];
    for(let i = 0; i < str.length; i++){
        let idx = Math.floor((str[i].charCodeAt() - 44032) / 588);
        result.push(arr[idx] || str[i]);
    }
    return result.join('');
}
function match(keyword , data){
    let keyCho = cho(keyword);
    let dataCho = cho(data);
    let result = [];
    let index = -1;
    do{
        index = dataCho.indexOf(keyCho, index + 1);
        if(index > -1) result.push(index);
    }while(index > -1);
    return result;
}
function search(keyword, data){
    let indexes = match(keyword, data);
    let dataCho = cho(data);
    let result = [];
    let keyLen = keyword.length;
    for (let i = 0; i < indexes.length; i++) {
        let index = indexes[i];        
        let flag = false;
        for(let j = 0; j < keyLen; j++){
            let keyChar = keyword[j];
            let dataChar = (keyChar.match(/[ㄱ,ㅎ]/) ? dataCho : data)[index + j];
            if(dataChar !== keyChar) flag= true;
        }
        if(!flag) result.push(index);
    }
    return result;
}
function highlight(keyword , data , indexes){
    let result = [];
    let length = keyword.length;

    result.push(data.substring(0, indexes[0]));
    for(let i = 0; i < indexes.length; i++){
        let index = indexes[i];
        let string = data.substring(index, index+length);
        result.push(`<mark>${string}</mark>`);
        let rms = data.substring(index+ length, indexes[i + 1]);
        result.push(rms);
    }
    return result.join('');
}
class App{
    constructor(product){
        this.product = product;
        this.productList = [];
        this.main();
        this.addEvent();
    }
    addEvent(){
        document.querySelector("#search").addEventListener("input", e=>{
            let value = e.currentTarget.value; 
            if(value == 0){
                document.querySelector(".productContainer").innerHTML = "";
                this.product.forEach(f=>{
                    this.itemAppend(x,null);
                });
            }
            if(value.trim() == "") return;

            let list = this.product.filter(x =>{
                let arr = search(value, x.brand);
                return arr.length > 0;
            });
            document.querySelector(".productContainer").innerHTML = "";
            list.forEach(f=>{
                let searched = search(value, f.brand);
                let text = highlight(value, f.brand, searched);
                this.itemAppend(f, text);
            });
        });
    }
    itemAppend(x, high = false){
        let item = this.item(x, high);
        document.querySelector(".productContainer").appendChild(item);
    }
    main(){
        this.product.forEach(x => {
            this.itemAppend(x);
        });
    }
    item(x, high){

    }
    dropItem(x){

    }
}