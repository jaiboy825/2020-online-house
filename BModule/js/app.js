window.addEventListener("load", () => {
    $.getJSON("./store/store.json", (data) => {
        let app = new App(data);
        data.forEach((x) => {
            x.cnt = 1;
        });
    });
});

function unComma(str) {
    n = parseInt(str.replace(/,/g, ""));
    return n;
}
class App {
    constructor(product) {
        this.product = product;
        this.productList = [];
        this.main();
    }
    main() {
        this.product.forEach((x) => {
            let item = this.item(x);
            document.querySelector(".productContainer").appendChild(item);
            $(item).draggable({
                containment: ".storeCenter",
                helper: "clone",
                cursor: "pointer",
                cancel: "productInfo",
                revert: true,
                drag() {
                    $(".Goal").css("height", "300px");
                    $(".Goal").css("color", "red");
                    $(".Goal").css("border", "3px dotted red");
                },
                stop() {
                    $(".Goal").css("height", "150px");
                    $(".Goal").css("color", "#212121");
                    $(".Goal").css("border", "3px dotted #212121");
                }
            });
            $(".Goal").droppable({

                accept: ".pd",
                drop: (e, ui) => {
                    let id = ui.draggable[0].dataset.id;
                    let item = this.product[id - 1];
                    let find = this.productList.find(function (f) {
                        return f.id == item.id;
                    });
                    if (find === undefined) this.dropItem(item);
                    else alert("이미 장바구니에 담긴 상품입니다.");
                }
            })
        }); 
        let buy = document.querySelector(".buyBtn");
        let wrapper = document.querySelector(".wrapper");
        let buyIn = document.querySelector(".buySuc");
        buy.addEventListener("click", (e)=>{
            $(".wrapper").fadeIn();
            $(".buyContainer").fadeIn();
        });
        wrapper.addEventListener("click" , (e)=>{
            $(".wrapper").fadeOut();
            $(".buyContainer").fadeOut();
            $(".buyAddress").val("");
            $(".buyName").val("");
            $(".final > canvas").fadeOut();
        });
        buyIn.addEventListener("click", (e)=>{

            if($.trim($(".buyName").val()) == ""){
                alert("이름을 입력해주세요");
                return;
            }
            if($.trim($(".buyAddress").val()) == ""){
                alert("주소를 입력해주세요");
                return;
            }
            $(".buyContainer").fadeOut();
            let canvas = document.createElement("canvas");
            let width = 480;
            let height = 800;
            let tot = 0;
            let total = 0;
            let idx = 1;
            canvas.fill = "#fff";
            canvas.fillRect = (0, 0, width, height);
            canvas.width = width;
            canvas.height = height;
            let ctx = canvas.getContext("2d");
            ctx.fill = "#000";
            ctx.textAlign= "center";
            ctx.font = "30px Arial";
            ctx.fillText("주문서" , width / 2, 70 );
            ctx.font = "20px Arial";
            this.productList.forEach((f)=>{
                total += f.cnt * unComma(f.price);
                tot = f.cnt * unComma(f.price);
                ctx.fillText(f.product_name + " : "+f.cnt + " 개, " + tot.toLocaleString() +"원", width/2, 100 + idx * 25);
                idx++;
            });
            ctx.fillText("총합계 : " + total.toLocaleString()+"원" , width/2, 700);
            let date = new Date();
            ctx.fillText(date.getFullYear() + "-" + (date.getMonth() + 1 ) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() +":"+ date.getSeconds(), width / 2, 740);
            document.querySelector(".final").appendChild(canvas);
            $(".final").fadeIn();
        });
    }
    item(x) {
        let div = document.createElement("div");
        div.dataset.id = x.id;
        div.classList.add("pd");
        div.innerHTML = `
        <div class="case">
        <div class="productImg">
            <img src="store/상품사진/${x.photo}" alt="사진" class="productImgs" title="상품사진">
        </div>
        <div class="productInfo">
            <h4>${x.brand}</h4>
            <div>${x.product_name}</div>
            <div class="price">${x.price} 원</div>
        </div>
        </div>
        `;
        return div;
    }
    dropItem(x) {
        this.productList.push(x);
        let div = document.createElement("div");
        div.classList.add("cd");
        div.innerHTML = `
        <div class="cartCase">
        <div class="cartImg">
            <img src="store/상품사진/${x.photo}" alt="사진" title="상품사진" class="cartImgs">
        </div>
        <div class="cartInfo">
            <h4>${x.brand}</h4>
            <p>${x.product_name}</p>
            <p>원 가격 : ${x.price} 원</p>
            <div class = "realPrice">
            <input type="number" max ="999" min ="1" value="${x.cnt}" class="pCnt">
            <p class="pPrice">${x.price} 원</p>
            </div>
            <div class = "delete">삭제</div>
        </div>
        </div>
        `;
        document.querySelector(".carts").appendChild(div);  
        if(document.querySelector(".allTotal").innerHTML == "0원"){
            document.querySelector(".allTotal").innerHTML = x.price + "원";
        }else{
            let tot = 0;
            this.productList.forEach((f)=>{
                tot += f.cnt * unComma(f.price); 
            })
            document.querySelector(".allTotal").innerHTML = tot.toLocaleString() + "원";
        }
        div.querySelector(".pCnt").addEventListener("input", (e)=>{
                let pTot = 0;
                let cnt = div.querySelector(".pCnt").value;
                x.cnt = cnt;
                pTot += x.cnt * unComma(x.price);
                div.querySelector(".pPrice").innerHTML =  pTot.toLocaleString() + " 원";
    
    
                let total = 0;
                this.productList.forEach((f)=>{
                    total += f.cnt * unComma(f.price);
                });
                document.querySelector(".allTotal").innerHTML = total.toLocaleString() + " 원"

        });
        div.querySelector(".delete").addEventListener("click", (e)=>{
            let pTot = 0;
            let cnt = div.querySelector(".pCnt").value;
            x.cnt = cnt;
            pTot += x.cnt * unComma(x.price);
            let total = 0;
            this.productList.forEach((f)=>{
                total += f.cnt * unComma(f.price);
            });
            let allTotal = total - pTot;
            document.querySelector(".allTotal").innerHTML = allTotal.toLocaleString() + " 원";
            let list = this.productList.findIndex(function(f){
                return x.id === f.id;
            });
            this.productList.splice(list, 1);
            div.remove();
        });
        document.querySelector(".buySuc").addEventListener("click", (e)=>{
            if($.trim($(".buyName").val()) != "" && $.trim($(".buyAddress").val()) != ""){
                document.querySelector(".allTotal").innerHTML = "0원";
                let list =  this.productList.findIndex(function(f){
                    return x.id === f.id;
                });
                if(list >= -1) this.productList.splice(list, 1);
                div.remove();
            }
        });
    }
}
