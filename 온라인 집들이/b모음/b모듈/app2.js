window.addEventListener("load",()=>{
    $.getJSON("/store/store.json", (data)=>{
        let app = new App(data);
        data.forEach((x) => {
            x.cnt = 1;
        });
    });
});


function unComma(str){
    n = parseInt(str.replace(/,/,""));
    return n;
}

class App{
    constructor(product){
        this.product = product;
        this.productList = [];
        this.main();
    }
    main(){
        this.product.forEach((x) => {
            let item = this.item(x);    
            document.querySelector(".productContainer").appendChild(item);
            $(item).draggable({
                containment : ".storeCenter",
                helper : "Clone",
                cursor : "pointer",
                cancel : ".productInfo",
                revert : true,
                drag(){

                },
                stop(){

                }
            });
            $(".Goal").droppable({
                accept : ".pd",
                drop : (e, ui)=>{
                    let id = ui.draggable[0].dataset.id;
                    let item = this.product[id - 1];
                    let find = this.productList.find(function (f){
                        return f.id == item.id;
                    });
                    if(find === undefined) this.dropItem(item);
                    else alert("이미 장바구니에 담긴 상품입니다");
                }
            });
        });
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let width = 300;
        let height = 200;
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle ="#fff";
        ctx.fillRect(0,0,width,height);
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        
        ctx.fillText = ("잉기모링", width/2, 75);
    }
    item(x){
        let div = document.createElement("div");
        div.dataset.id = x.id;
        div.classList.add("pd");
        div.innerHTML = ``;
        return div;
    }
    dropItem(x){
        let div = document.createElement("div");
        div.classList.add("cd");
        div.innerHTML = ``;
        document.querySelector(".carts").appendChild(div);
    }
}