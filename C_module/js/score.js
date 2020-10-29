const log = console.log;
window.addEventListener("load", () => {
    let app = new App();
});


class App {
    constructor() {
        this.main();
    }
    main() {
        let score = document.querySelector(".score")
        addEventListener("click",(e)=>{
            $(".wrapper").fadeIn();
            $(".scorePop").fadeIn();
            $(".scoreHidden").val(e.dataset.id);
        });
        
    }


}