window.addEventListener("load", ()=>{
    let app = new App();
});
class App{
    constructor(){
        this.main();
    }
    main(){
        let register = document.querySelector(".register");
        let login = document.querySelector(".login");
        let wrapper = document.querySelector(".wrapper");
        register.addEventListener("click", (e)=>{
            $(".wrapper").fadeIn();
            $(".registerContainer").fadeIn();
            let arr = ["Fa2ke","Pra2y","M5rga","Chob2","Gor2l","Sktt1","Geng2","Drx55","YYdh2","CHoi2","Anj2n","J2onj","je5nG","w5nJu","suJ7n"]
            let idx = Math.floor(Math.random()*arr.length);
            console.log(idx);   
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            let width = 300;
            let height = 100;
            canvas.width = width;
            canvas.height = height;
            ctx.fillStyle = "#000";
            ctx.fillRect(0,0,width,height);
            ctx.fillStyle = "#fff";
            ctx.font = "22px arial";
            ctx.textAlign = "center";
            ctx.fillText(arr[idx], width/2, height/2);
            document.querySelector(".capchaContainer").appendChild(canvas);
            $(".caps").val(arr[idx]);
        });
        login.addEventListener("click",(e)=>{
            $(".wrapper").fadeIn();
            $(".loginContainer").fadeIn();
        });
        wrapper.addEventListener("click", (e)=>{
            $(".wrapper").fadeOut();
            $(".registerContainer").fadeOut();
            $(".loginContainer").fadeOut();
            $("canvas").fadeOut();
            $(".regiInput").val("");
            $(".logiInput").val("");
        });
        
    }
}