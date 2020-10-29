window.addEventListener("load", ()=>{
    let app = new App();
});
class App{
    constructor(){
        this.main();
    }
    main(){
        let obtn = document.querySelector(".oWrite");
        let wrapper = document.querySelector(".wrapper");
        obtn.addEventListener("click", (e)=>{
            $(".wrapper").fadeIn();
            $(".owContainer").fadeIn();
        });
        wrapper.addEventListener("click", (e)=>{
            $(".wrapper").fadeOut();
            $(".owContainer").fadeOut();
            $(".regiInput").val("");
            $(".scorePop").fadeOut();

        });
        document.querySelectorAll(".score").forEach((x) => {
            x.addEventListener("click", (e) => {
                $(".scoreHidden").val(x.dataset.id);
                $(".wrapper").fadeIn();
                $(".scorePop").fadeIn();
            });
        });
        
    }
}