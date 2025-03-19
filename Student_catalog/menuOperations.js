
//sidebar menu toggle
const menuicon=document.getElementById("menuicon");
const closebtn=document.getElementById("closebtn");
const studentdiv=document.getElementById("studentdiv");

//function to close sidebar menu
function closeMenu(){
    studentdiv.classList.remove("visible");
    studentdiv.classList.add("hidden");
    studentdiv.style.width="0em";
}

menuicon.addEventListener("click",()=>{
    if(!studentdiv.classList.contains("visible")){
        studentdiv.classList.remove("hidden");
        studentdiv.classList.add("visible");
        if(screen.width<=768){
            studentdiv.style.width=`${screen.width}px`;
        }else if(screen.width<=1024){
            studentdiv.style.width="11em";
        }else{
            studentdiv.style.width="14.6em";
        }
     }
});

//event listener to close sidebar menu on clicking X icon
closebtn.addEventListener('click',closeMenu);
//close menu with ESC key
window.addEventListener('keyup',function(event){
    if(event.key === "Escape"){
        closeMenu();
    }
})

studentdiv.addEventListener("click",(event)=>{
    const clickedElement=event.target;
    
    if(clickedElement.classList.contains("studentanchor")){
        closeMenu();
    }
});