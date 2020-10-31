window.addEventListener("load",()=>{
    $.getJSON("./resources/store.json",(data)=>{
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
        this.product.forEach((f)=>{
            let item = this.item(f);
            document.querySelector(".productContainer").appendChild(item);
            $(item).draggable({
                containment : ".storeCenter",
                helper : "clone",
                cancel : ".productInfo",
                cursor : "pointer",
                revert : true,
                drag(){

                },
                stop(){

                }
            });
            $(".Goal").droppable({
                accept : ".pd",
                drop : (e,ui)=>{
                    let id = ui.draggable[0].dataset.id;
                    let item = this.product[id -1];
                    let find = this.productList.find(function (f){
                        return f.id == item.id;
                    });
                    if(find === undefined) this.dropItem(item);
                    else alert("이미 장바구니에 담긴 상품입니다.")
                }
            });
        });
        let btn = document.querySelector(".buy");
        let cancel = document.querySelector(".BuyContainer");
        let buyBtn = document.querySelector(".buyBtn");
        btn.addEventListener("click", (e) => {
            $(".BuyContainer").fadeIn();
            $(".Buying").fadeIn();

        });
        cancel.addEventListener("click", (e) => {
            $(".BuyContainer").fadeOut();
            $(".Buying").fadeOut();
            $(".final > canvas").fadeOut();
            $(".final").fadeOut();
            $(".buyName").val("");
            $(".buyAddress").val("");

        });
        buyBtn.addEventListener("click" ,(e)=>{
            if ($.trim($(".buyName").val()) == "") {
                alert("구매자 이름을 입력해주세요.");
                return;
            }
            if ($.trim($(".buyAddress").val()) == "") {
                alert("주소를 입력해주세요.");
                return;
            }

            $(".Buying").fadeOut();
            $(".final").fadeIn();

            let canvas = document.createElement("canvas");
            let width = 460;
            let height = 800;
            canvas.width = width;
            canvas.height = height;
            let total = 0;
            let tot = 0;
            let idx = 1;
            let ctx = canvas.getContext("2d");
            ctx.fillStyle = "#fff";
            ctx.fillRect (0, 0, width, height);
            ctx.fillStyle = "#48b9a0";
            ctx.fillText("구매내역서", width/2, 50);
            ctx.fillStyle = "#000";
            let date = new Date();
            let day = `${(date.getFullYear)}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
            this.productList.forEach((f)=>{
                total = f.cnt * unComma(f.price);
                let txt = `${x.product_name} ${x.price}원 ${x.cnt}개 ${total.toLocaleString()}원`;
                ctx.fillText(txt, width/2, 60 + idx * 25);
                idx++;
            });
            ctx.fillText("총합계", width/2 , 700);
            this.productList.forEach((x) => {
                tot += x.cnt * unComma(x.price);
            });
            ctx.fillText(tot.toLocaleString() + "원", width / 2, 750);
            ctx.fillText(day, width / 2, 780);
            document.querySelector(".final").appendChild(canvas);
        });

    }
    item(item){
        let div = document.createElement("div");
        div.dataset.id = item.id;
        div.classList.add("pd");
        div.innerHTML = `
        <div class="productCase">
                <img src="/Publishing/resources/b_img/${item.photo}" alt="">  
                <div class="productInfo">
                    <h4>${item.brand} </h4> 
                    ${item.product_name} <br>
                    ${item.price}
                </div>                  
            </div>
        `;
        return div;
    }
    dropItem(item){
        this.productList.push(item);
        let div = document.createElement("div");
        div.classList.add("cd");
        div.innerHTML = `
        <div class="cartCase">
        <img src="/Publishing/resources/b_img/${item.photo}" alt="">  
        <div class="cartInfo">
        <h4>${item.brand}</h4> 
        ${item.product_name} <div class="nomal">원가격 : ${item.price} </div>
        <div class="pPrice">
        ${item.price} 원
        </div>
        <input type="number" max="999" min="1" value="${item.cnt}" class="pCnt">
        <div class="delete">삭제</div>
        </div>                  
        </div>
        `;
        document.querySelector(".carts").appendChild(div);
        if(document.querySelector(".allTotal").innerHTML == "0원"){
            document.querySelector(".allTotal").innerHTML = item.price + "원";
        }else{
            let tot = 0;
            this.productList.forEach((x)=>{
                tot += x.cnt * unComma(x.price);
            });
            document.querySelector(".allTotal").innerHTML = tot.toLocaleString() + "원";
        }
        div.querySelector(".pCnt").addEventListener("input",(e)=>{
            if(div.querySelector(".pCnt").value >= 1){
                let cnt = div.querySelector(".pCnt").value;
                item.cnt = cnt;
                let total = cnt * unComma(x.price);
                div.querySelector(".pPrice").innerHTML = total.toLocaleString() + "원";
    
                let allTot = 0;
                this.productList.forEach((f)=>{
                    allTot += f.cnt * unComma(f.price);
                });
                document.querySelector(".allTotal").innerHTML = allTot.toLocaleString() + "원";

            }else{
                alert("상품의 갯수는 1개 이상입니다")
            }
        });
        document.querySelector(".buyBtn").addEventListener("click",(e)=>{
            if($.trim($(".buyName")).val() != "" && $.trim($(".buyAddress")).val() != ""){
                let list = this.productList.findIndex((f)=>{
                    return f.id === item.id;
                });
                this.productList.splice(list, 1);
            $(div).remove();
            document.querySelector(".allTotal").innerHTML = "0원";
            }
        });
        div.querySelector(".delete").addEventListener("click", (e)=>{
            let cnt = div.querySelector(".pCnt").value;
            item.cnt = cnt ;
            let total = cnt * unComma(item.price);
            let allTot = 0;
            this.productList.forEach((f)=>{
                allTot += f.cnt + unComma(f.price);
            }) ;
            let allTotal = allTot - total;
            document.querySelector(".allTotal").innerHTML = allTotal.toLocaleString() + "원";
            let list = this.productList.findIndex((f)=>{
                return f.id === item.id;
            }); 
            if(list != -1){
                this.productList.splice(list , 1);
                $(div).remove();
            }
        });

    }
}