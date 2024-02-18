
//menu toggle
const menuicon=document.getElementById("menuicon");
const studentdiv=document.getElementById("studentdiv");
const closebtn=document.getElementById("closebtn");

menuicon.addEventListener("click",()=>{
    if(!studentdiv.classList.contains("visible")){
        studentdiv.classList.remove("hidden");
        studentdiv.classList.add("visible");
        studentdiv.style.width="15em";
    }else{
        studentdiv.classList.remove("visible");
        studentdiv.classList.add("hidden");
        studentdiv.style.width="0em";
    }
});


//close the menu with X
closebtn.addEventListener("click",()=>{
    studentdiv.classList.remove("visible");
    studentdiv.classList.add("hidden");
    studentdiv.style.width="0em";
});


//button that creates student card and ancor tag in studentdiv
const addstudent=document.getElementById("addstud");
const firstname=document.getElementById("firstname");
const lastname=document.getElementById("lastname");
const idnr=document.getElementById("idnr");
const studentslist=document.getElementById("students");
const errortext=document.getElementById("errortext");
let students=[];


    //save function but it should be in Backend/database
function saveData(){
    localStorage.setItem("data", studentslist.innerHTML);
    localStorage.setItem("students",JSON.stringify(students));
};

    //show function
function showData(){
    studentslist.innerHTML=localStorage.getItem("data");
}

addstudent.addEventListener("click",(event)=>{
    event.preventDefault();

    //check if inputs are empty
    if(firstname.value==="" || lastname.value==="" || idnr.value===""){
        errortext.textContent="Please fill in everything!";
    }else{
    errortext.textContent="";
    
    //create students array of objects
    students.push({firstname:firstname.value,
                   lastname:lastname.value,
                   id:idnr.value});
                   
                   console.log(students);

    //create student list aside navbar
    const anchor=document.createElement("a");
    anchor.setAttribute("href",lastname.value+"_"+firstname.value);
    const anchorvalue=document.createTextNode(lastname.value+" "+firstname.value);
    studentslist.appendChild(anchor);
    anchor.appendChild(anchorvalue); 
    saveData();
    }
})

showData();