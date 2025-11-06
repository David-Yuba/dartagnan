let headingCont;
let david, art, design;
let d, ap, agnan;

let davidContent, artContent, designContent;

let root;
let windowWidth, windowHeight;

window.addEventListener("load", main);
window.addEventListener("resize", position);

function main(){
    root = document.getElementsByTagName("body")[0];
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    headingCont = document.getElementsByClassName("heading-cont")[0];
    initCSSVariables();

    david = document.getElementById("david");
    art = document.getElementById("art");
    design = document.getElementById("design");

    headingCont.addEventListener("pointerover", onHover);
    david.addEventListener("click",onHeadingClick);
    art.addEventListener("click",onHeadingClick);
    design.addEventListener("click",onHeadingClick);

    davidContent = document.getElementById("david-content");
    artContent = document.getElementById("art-content");
    designContent = document.getElementById("design-content");

    position();
}

function position(){
    d = document.getElementById("d"), ap = document.getElementById("ap"), art = document.getElementById("art"), agnan = document.getElementById("agnan");

    david.style.setProperty("--left-pos", `${-david.getBoundingClientRect().width + d.getBoundingClientRect().width}px`);
    design.style.setProperty("--left-pos", `${d.getBoundingClientRect().width + ap.getBoundingClientRect().width + art.getBoundingClientRect().width}px`);
    
    /*david.style.setProperty("--left-pos", `${d.getBoundingClientRect().left - david.clientWidth + d.clientWidth}px`);
    design.style.setProperty("--left-pos", `${agnan.getBoundingClientRect().left}px`); */
}

function onHover(e){
    let target = e.target;
    let id = target.id === "d" ? 0 : target.id === "art" ? 1 : target.id === "agnan" ? 2 : -1
    
    switch(id){
        case 0:{ // david
            david.className = ("pos hover");

            d.className = ("not-hover");
            ap.className = ("not-hover");
            art.className = ("not-hover");
            agnan.className = ("not-hover");

            david.addEventListener("pointerleave",handleLeave);
            
            function handleLeave(){
                david.className = ("pos not-hover");

                d.className = ("hover");
                ap.className = ("hover");
                art.className = ("hover");
                agnan.className = ("hover");

                david.removeEventListener("pointerleave",handleLeave);
            }

            break;
        }
        case 1:{ // art
            art.className = ("hover");

            d.className = ("not-hover");
            ap.className = ("not-hover");
            agnan.className = ("not-hover");

            art.addEventListener("pointerleave",handleLeave);
            
            function handleLeave(){
                art.className = ("pos not-hover");

                d.className = ("hover");
                ap.className = ("hover");
                art.className = ("hover");
                agnan.className = ("hover");

                art.removeEventListener("pointerleave",handleLeave);
            }
            
            break;
        }
        case 2:{ // design
            design.className = ("pos hover");

            d.className = ("not-hover");
            ap.className = ("not-hover");
            art.className = ("not-hover");
            agnan.className = ("not-hover");

            design.addEventListener("pointerleave",handleLeave);
            
            function handleLeave(){
                design.className = ("pos not-hover");

                d.className = ("hover");
                ap.className = ("hover");
                art.className = ("hover");
                agnan.className = ("hover");

                design.removeEventListener("pointerleave",handleLeave);
            }

            break;
        }
        default : 
            break;
    }
}

function onHeadingClick(e){
    let headingId = e.target.id;
    switch(headingId){
        case "david":
            davidContent.classList.toggle("active-content");
            artContent.classList.remove("active-content-art");
            designContent.classList.remove("active-content");
            
            headingCont.classList.toggle("active-heading-david");
            headingCont.classList.remove("active-heading-art");
            headingCont.classList.remove("active-heading-design");

            if(d.style.color === "black" || d.style.color === "") 
                d.style.color="orangered";
            else d.style.color="black";
            art.style.color="black";
            agnan.style.color="black";
            break;
        case "art":
            davidContent.classList.remove("active-content");
            artContent.classList.toggle("active-content-art");
            designContent.classList.remove("active-content");
            
            headingCont.classList.remove("active-heading-david");
            headingCont.classList.toggle("active-heading-art");
            headingCont.classList.remove("active-heading-design");

            d.style.color="black";
            console.log(art.style.color)
            if(art.style.color === "black" || art.style.color === "") 
                art.style.color="orangered";
            else art.style.color="black";
            agnan.style.color="black";
            break;
        case "design":
            davidContent.classList.remove("active-content");
            artContent.classList.remove("active-content-art");
            designContent.classList.toggle("active-content");

            headingCont.classList.remove("active-heading-david");
            headingCont.classList.remove("active-heading-art");
            headingCont.classList.toggle("active-heading-design");
            
            d.style.color="black";
            art.style.color="black";
            if(agnan.style.color === "black" || agnan.style.color === "") 
                agnan.style.color="orangered";
            else agnan.style.color="black";
            break;
    }
}

function initCSSVariables(){
    root.style.setProperty("--screen-width", `${windowWidth}px`);
    root.style.setProperty("--screen-height", `${windowHeight}px`);
    root.style.setProperty("--heading-height", `${headingCont.getBoundingClientRect().height}px`);
    root.style.setProperty("--heading-width", `${headingCont.getBoundingClientRect().width}px`);
}