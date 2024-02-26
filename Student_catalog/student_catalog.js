
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
const studentscontainer=document.getElementById("studentscardcontainer");
let students=[];


    //save function but it should be in Backend/database
function saveData(){
    localStorage.setItem("data", studentslist.innerHTML);
    localStorage.setItem("students",JSON.stringify(students));
    localStorage.setItem("indstudent",studentscontainer.innerHTML);
};

    //show function
function showData(){
    studentslist.innerHTML=localStorage.getItem("data");
    studentscontainer.innerHTML=localStorage.getItem("indstudent");
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

    //create card of the student
    const studentcard=document.createElement("div");

    //create the inputs for the subjects
    const inputdiv=document.createElement("div");

    const math=document.createElement("input");
    const eng=document.createElement("input");
    const biology=document.createElement("input");
    const physics=document.createElement("input");
    const geography =document.createElement("input");
  
    //add the inputs the type attribute and append to its container
    const notes=[math,eng,biology,physics,geography];
    notes.forEach((element)=>{
        element.setAttribute("type","text");
        inputdiv.appendChild(element);
    });

    //create the submit buttons for inputs
    const buttondiv=document.createElement("div")

    const mathbtn=document.createElement("button");
    const engbtn=document.createElement("button");
    const biologybtn=document.createElement("button");
    const physicsbtn=document.createElement("button");
    const geographybtn=document.createElement("button");

    //add to the buttons the addnote id and add grade text and append to its container
    let buttons=[mathbtn,engbtn,biologybtn,physicsbtn,geographybtn];
    buttons.forEach(element=>{
        element.classList.add("addnote");
        element.textContent="Add grade";
        buttondiv.appendChild(element);
    });

    //append the content containers to the main container 
    studentscontainer.appendChild(studentcard);
    const studentcardcomponents=[inputdiv,buttondiv];

    studentcardcomponents.forEach(element=>{
        studentcard.appendChild(element);
    })
    saveData();
    firstname.value="";
    lastname.value="";
    idnr.value="";
    }
})

showData();