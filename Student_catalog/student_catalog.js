
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

    //create student list aside navbar and the delete button for it
    const anchordiv=document.createElement("div");
    anchordiv.classList.add("anchordiv");
    studentslist.appendChild(anchordiv);

    const deletestudent=document.createElement("span");
    deletestudent.classList.add("deletestudent");
    deletestudent.innerText="🗑";
    anchordiv.appendChild(deletestudent);

    const anchor=document.createElement("a");
    anchor.setAttribute("href","#"+lastname.value+"_"+firstname.value);
    const anchorvalue=document.createTextNode(lastname.value+" "+firstname.value);
    anchordiv.appendChild(anchor);
    anchor.classList.add(idnr.value);
    anchor.appendChild(anchorvalue); 

    //create card of the student
    const studentcard=document.createElement("div");
    studentcard.classList.add("studentcard");

    const studname=document.createElement("p");
    studname.classList.add("studname");
    studname.innerText=lastname.value+" "+firstname.value;
    studname.setAttribute("id",lastname.value+"_"+firstname.value)
    studentcard.appendChild(studname);

    const outerinputdiv=document.createElement("div");
    outerinputdiv.classList.add("outerinputdiv");
    studentcard.appendChild(outerinputdiv);


    //create the inputs for the subjects
    const inputdiv=document.createElement("div");
    inputdiv.classList.add("inputdiv");

    const math=document.createElement("input");
    const eng=document.createElement("input");
    const biology=document.createElement("input");
    const physics=document.createElement("input");
    const geography =document.createElement("input");
  
    //add the inputs the type attribute and append to its container
    const notes=[math,eng,biology,physics,geography];
    notes.forEach((element)=>{
        element.classList.add("noteinput");
        element.setAttribute("type","text");
        inputdiv.appendChild(element);
    });

    //create the submit buttons for inputs
    const buttondiv=document.createElement("div");
    buttondiv.classList.add("buttondiv");


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

    //create the delete button for studentcard and append to studentscontainer
    const deletebutton=document.createElement("span");
    deletebutton.classList.add("deletebtn");
    deletebutton.innerText="🗑";
    studentcard.appendChild(deletebutton);

    //append the content containers to the main container 
    studentscontainer.appendChild(studentcard);
    const studentcardcomponents=[inputdiv,buttondiv];

    studentcardcomponents.forEach(element=>{
        outerinputdiv.appendChild(element);
    })
    saveData();

    //initialize the values of inputs with an empty string after a student was added
    firstname.value="";
    lastname.value="";
    idnr.value="";
    }
})

 //create the delete event listener for the card
 studentscontainer.addEventListener("click",function(event){
   if(event.target.tagName==="SPAN"){
    event.target.parentElement.remove();
    saveData();
   }
})

//create the delete event liistener for the student name in the aside bar
studentslist.addEventListener("click",function(event){
    if(event.target.tagName==="SPAN"){
        event.target.parentElement.remove();
        saveData();
    }
})

showData();