document.addEventListener("DOMContentLoaded", main);
window.addEventListener("resize", onResize);

function main(){
    initializeCSSVariables();
    positionHiddenLinks();

    let body = document.getElementsByTagName("body")[0],
        headingPartsArray = document.querySelectorAll(".heading-cont > h1"),
        eventHandleDivs = document.querySelectorAll(".event-handle-divs > div");

    eventHandleDivs.forEach(function(h){ 
        if(h.innerHTML !== "'"){
            h.addEventListener("pointerenter",onHeadingEnter);
            h.addEventListener("pointerleave",onHeadingLeave);
        }
    });

    body.addEventListener("click",onLinkClick);
}

function initializeCSSVariables(){
    let body = document.getElementsByTagName("body")[0],
        heading = document.getElementsByClassName("heading-cont")[0],
        contentPagesArray = [...document.getElementsByClassName("content")];

    body.style.setProperty("--body-width", `${window.innerWidth}px`);
    body.style.setProperty("--body-height", `${window.innerHeight}px`);

    contentPagesArray.forEach(function(c){
        c.style.setProperty("--content-width", `${c.getBoundingClientRect().width}px`);
        c.style.setProperty("--content-height", `${c.getBoundingClientRect().height}px`);
    })
    heading.style.setProperty("--heading-width", `${heading.getBoundingClientRect().width}px`);
    heading.style.setProperty("--heading-height", `${heading.getBoundingClientRect().height}px`);
}

function onResize(){
    initializeCSSVariables();
    positionHiddenLinks();
}

function positionHiddenLinks() {
    let hiddenLinksArray = document.querySelectorAll(".hidden-links > h1"),
        headingPartsArray = document.querySelectorAll(".heading-cont > h1");
    /* David */
    hiddenLinksArray[0].style.setProperty("--link-top", `${headingPartsArray[0].getBoundingClientRect().top}px`);
    hiddenLinksArray[0].style.setProperty("--heading-part-width", `${hiddenLinksArray[0].getBoundingClientRect().width}px`);
    hiddenLinksArray[0].style.setProperty("--link-left", `${headingPartsArray[0].getBoundingClientRect().left + headingPartsArray[0].getBoundingClientRect().width - hiddenLinksArray[0].getBoundingClientRect().width}px`);
    /* art */
    hiddenLinksArray[1].style.setProperty("--link-top", `${headingPartsArray[2].getBoundingClientRect().top}px`);
    hiddenLinksArray[1].style.setProperty("--heading-part-width", `${hiddenLinksArray[1].getBoundingClientRect().width}px`);
    hiddenLinksArray[1].style.setProperty("--link-left", `${headingPartsArray[2].getBoundingClientRect().left}px`);
    /* Design */
    hiddenLinksArray[2].style.setProperty("--link-top", `${headingPartsArray[3].getBoundingClientRect().top}px`);
    hiddenLinksArray[2].style.setProperty("--link-left", `${headingPartsArray[3].getBoundingClientRect().left}px`);

    positionEventHandleDivs()
}

function positionEventHandleDivs(){
    let eventHandleDivs = document.querySelectorAll(".event-handle-divs > div"),
        hiddenLinksArray = document.querySelectorAll(".hidden-links > h1"),
        headingPartsArray = [...document.querySelectorAll(".heading-cont > h1")].reduce((prev,c,i) => i === 1 ? prev : [...prev, c], []);
    
    headingPartsArray.forEach(function(link,i){
        eventHandleDivs[i].style.zIndex = `100`;
        eventHandleDivs[i].style.top = `${link.getBoundingClientRect().top}px`;
        eventHandleDivs[i].style.left = `${link.getBoundingClientRect().left}px`;
        eventHandleDivs[i].style.width = `${link.getBoundingClientRect().width}px`;
        eventHandleDivs[i].style.height = `${link.getBoundingClientRect().height}px`;
    })
}

function onHeadingEnter(e){
    let target = e.target,
        hiddenLinksArray = document.querySelectorAll(".hidden-links > h1"),
        eventHandleDivs = document.querySelectorAll(".event-handle-divs > div"),
        headingPartsArray = document.querySelectorAll(".heading-cont > h1");

    hiddenLinksArray.forEach(function(link,i){
        eventHandleDivs[i].style.top = `${link.getBoundingClientRect().top}px`;
        eventHandleDivs[i].style.left = `${link.getBoundingClientRect().left}px`;
        eventHandleDivs[i].style.width = `${link.getBoundingClientRect().width}px`;
        eventHandleDivs[i].style.height = `${link.getBoundingClientRect().height}px`;
    })

    headingPartsArray.forEach(function(h){
            h.style.opacity = "0%";
    });
    hiddenLinksArray[parseInt(target.dataset.index)].style.opacity = "100%";
    hiddenLinksArray[parseInt(target.dataset.index)].style.color = "orangered";
}

function onHeadingLeave(e){
    let target = e.target,
        hiddenLinksArray = document.querySelectorAll(".hidden-links > h1"),
        eventHandleDivs = document.querySelectorAll(".event-handle-divs > div"),
        headingPartsArray = document.querySelectorAll(".heading-cont > h1");

    [...headingPartsArray].reduce((prev,c,i) => i === 1 ? prev : [...prev, c], [])
        .forEach(function(link,i){
            eventHandleDivs[i].style.top = `${link.getBoundingClientRect().top}px`;
            eventHandleDivs[i].style.left = `${link.getBoundingClientRect().left}px`;
            eventHandleDivs[i].style.width = `${link.getBoundingClientRect().width}px`;
            eventHandleDivs[i].style.height = `${link.getBoundingClientRect().height}px`;
        })

    headingPartsArray.forEach(function(h){
            h.style.opacity = "100%";
    });
    hiddenLinksArray[parseInt(target.dataset.index)].style.opacity = "0%";
}

function onLinkClick(e){
    let target = e.target;
    if(!target.dataset.index) return;
    
    let body = document.getElementsByTagName("body")[0],
        eventHandleDivs = document.querySelectorAll(".event-handle-divs > div"),
        hiddenLinksArray = document.querySelectorAll(".hidden-links > h1"),
        contentPagesArray = document.getElementsByClassName("content"),
        exitButton = contentPagesArray[parseInt(target.dataset.index)].getElementsByClassName("exit")[0];

    
    eventHandleDivs.forEach(function(p){
        if(p.innerHTML !== "'"){
            p.removeEventListener("pointerenter",onHeadingEnter);
            p.removeEventListener("pointerleave",onHeadingLeave);
        }
    })
    body.removeEventListener("click",onLinkClick);
    hiddenLinksArray[parseInt(target.dataset.index)].removeEventListener("pointerleave",onHeadingLeave);
    
    hiddenLinksArray[parseInt(target.dataset.index)].style.color = "black";
    hiddenLinksArray[parseInt(target.dataset.index)].classList.add("active-heading");
    contentPagesArray[parseInt(target.dataset.index)].classList.add("active");
    exitButton.addEventListener("click",onExitClick);
}

function onExitClick(e){
    e.stopPropagation();
    let body = document.getElementsByTagName("body")[0],
        eventHandleDivs = document.querySelectorAll(".event-handle-divs > div"),
        hiddenLinksArray = document.querySelectorAll(".hidden-links > h1"),
        headingPartsArray = document.querySelectorAll(".heading-cont > h1"),
        contentPagesArray = document.querySelectorAll(".content");
    
    eventHandleDivs.forEach(function(h){ 
        if(h.innerHTML !== "'"){
            h.addEventListener("pointerenter",onHeadingEnter);
            h.addEventListener("pointerleave",onHeadingLeave);
        }
        h.style.opacity = "100%";
    });
    headingPartsArray.forEach(function(h){ 
        h.style.opacity = "100%";
    });
    hiddenLinksArray.forEach(function(h){ 
        h.style.opacity = "0%";
        h.style.zIndex = "0";
        h.classList.remove("active-heading");
    });
    body.addEventListener("click",onLinkClick);
    contentPagesArray.forEach(function(p){
        p.classList.remove("active");
    })
    e.target.removeEventListener("click",onExitClick)
}