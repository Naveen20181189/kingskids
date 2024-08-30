const viewbtn = document.querySelector("#view-button")
const closebtn = document.querySelector("#close-button")
const cont = document.querySelector(".matter")
const delbtn = document.querySelector("#delete-button")
const head = document.querySelector("header")
const data = document.querySelector(".stu-data")
const conformDel = document.querySelector("#conf-del")

viewbtn.addEventListener("click",function(){
    cont.style.display = "block"
})
closebtn.addEventListener("click",function(){
    cont.style.display = "none"
})
delbtn.addEventListener("click",function(){
    data.style.display = "none"
    head.style.display = "flex"
    head.style.transitionProperty = "ease"
    head.style.transitionDelay = "5s"
})
conformDel.addEventListener("click",function(){
    data.style.display = "flex"
    head.style.display = "none"
})
