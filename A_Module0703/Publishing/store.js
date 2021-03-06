window.addEventListener("load", () => {
    $.getJSON("./resources/store.json", (data) => {
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
        this.main();
        this.productList = [];
    }

    main() {
        this.product.forEach((x) => {
            let item = this.item(x);
            document.querySelector(".productContainer").appendChild(item);
            $(item).draggable({
                containment: ".StoreCenter",
                helper: "clone",
                cursor: "pointer",
                cancel: ".productInfo",
                revert: true,

                drag() {
                    $(".Goal").css("border", "3px dotted red");
                    $(".Goal").css("height", "300px");
                },
                stop() {
                    $(".Goal").css("border", "3px dotted black");
                    $(".Goal").css("height", "100px");
                }
            });
            $(".Goal").droppable({
                accept: ".pd",
                drop: (e, ui) => {
                    let id = ui.draggable[0].dataset.id;
                    let item = this.product[id - 1];
                    let find = this.productList.find(function (x) {
                        return x.id == item.id;
                    });
                    if (find === undefined) this.dropItem(item);
                    else alert("이미 장바구니에 담긴 상품입니다.");
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
            $(".final").fadeOut();
        });

        buyBtn.addEventListener("click", (e) => {
            
            $(".Buying").fadeOut();
            if ($.trim($(".buyName").val()) == "") {
                alert("구매자 이름을 입력해주세요.");
                return;
            }
            if ($.trim($(".buyAddress").val()) == "") {
                alert("주소를 입력해주세요.");
                return;
            }
            $(".final").fadeIn();
            
            let canvas = document.createElement("canvas");
            let width = 460;
            let height = 500;
            canvas.width = width;
            canvas.height = height;
            let total = 0;
            let tot = 0;
            let ctx = canvas.getContext("2d");
            ctx.fillStyle = "transparent";
            ctx.fillRect(0, 0, width, height);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#48b9a0";
            ctx.textAlign = "center";
            ctx.fillText("구매 내역서", width / 2, 50);
            ctx.fillStyle = "#000";
            let date = new Date();
            let day = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
            this.productList.forEach((x) => {
                total = x.cnt * unComma(x.price);
                let txt = `${x.product_name} ${x.price}원 ${x.cnt}개 ${total.toLocaleString()}원`;
                ctx.fillText(txt, width / 2, 60 + x.id * 20);
            });
            ctx.font = "20px Arial";
            ctx.fillText("총합계", width / 2, 400);
            this.productList.forEach((x) => {
                tot += x.cnt * unComma(x.price);
            });
            ctx.fillText(tot.toLocaleString() + "원", width / 2, 450);
            ctx.fillText(day, width / 2, 480);
            document.querySelector(".final").appendChild(canvas);
            this.productList = [];
            $(".buyName").val("");
            $(".buyAddress").val("");
        });

    }

    item(x) {
        let div = document.createElement("div");
        div.classList.add("pd");
        div.dataset.id = x.id;
        div.innerHTML = `
            <div class="productCase">
                <img src="/Publishing/resources/b_img/${x.photo}" alt="">  
                <div class="productInfo">
                    <h4>${x.brand} </h4> 
                    ${x.product_name} <br>
                    ${x.price}
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
        <img src="/Publishing/resources/b_img/${x.photo}" alt="">  
        <div class="cartInfo">
        <h4>${x.brand} <input type="number" max="999" min="1" value="${x.cnt}" class="pCnt"></h4> 
        ${x.product_name} <div class="nomal">원가격 : ${x.price}</div>
        <div class="pPrice">
        ${x.price} 원
        </div>
        </div>                  
        </div>
        `;
        document.querySelector(".carts").appendChild(div);
        if (document.querySelector(".allTotal").innerHTML == "0원") {
            document.querySelector(".allTotal").innerHTML = x.price + "원";
        } else {
            let tot = 0;
            this.productList.forEach((x) => {
                tot += x.cnt * unComma(x.price);
            });
            document.querySelector(".allTotal").innerHTML = tot.toLocaleString() + "원";
        }
        div.querySelector(".pCnt").addEventListener("input", (e) => {
            let cnt = div.querySelector(".pCnt").value;
            x.cnt = cnt;
            let total = cnt * unComma(x.price);
            div.querySelector(".pPrice").innerHTML = total.toLocaleString() + "원";

            let allTot = 0;
            this.productList.forEach((x) => {
                allTot += x.cnt * unComma(x.price);
            });
            document.querySelector(".allTotal").innerHTML = allTot.toLocaleString() + "원";
        });
        document.querySelector(".buyBtn").addEventListener("click", (e) => {
            
            $(div).remove();
            document.querySelector(".allTotal").innerHTML = "0원";
            $(".cartProduct").show();
        });

    }


}