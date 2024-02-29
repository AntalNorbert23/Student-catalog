
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
    const storedStudents = localStorage.getItem("students");
    students = storedStudents ? JSON.parse(storedStudents) : [];
    studentscontainer.innerHTML=localStorage.getItem("indstudent");
}

function isIdNumberUnique(id) {
    // Check if the ID number already exists in the students array
    const isUnique = students.some(student => student.id === id);

    return isUnique;
}

addstudent.addEventListener("click",(event)=>{
    event.preventDefault();

    //verify id so it can be assigned an unique id for every student
    if (isIdNumberUnique(idnr.value)) {
        errortext.textContent = "ID number must be unique!";
        return;
    }

    errortext.textContent = "";

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
    const anchordiv=document.createElement("div");
    anchordiv.classList.add("anchordiv");
    studentslist.appendChild(anchordiv);

   //create student link
    const anchor=document.createElement("a");
    anchor.setAttribute("href","#"+lastname.value+"_"+firstname.value);
    const anchorvalue=document.createTextNode(lastname.value+" "+firstname.value);
    anchordiv.appendChild(anchor);
    anchor.classList.add(idnr.value);
    anchor.appendChild(anchorvalue); 

    //create card of the student
    const studentcard=document.createElement("div");
    studentcard.classList.add("studentcard");
    studentcard.setAttribute("id", lastname.value + "_" + firstname.value);

    const studname=document.createElement("p");
    studname.classList.add("studname");
    studname.innerText=idnr.value+" "+lastname.value+" "+firstname.value;
    studname.setAttribute("id",lastname.value+"_"+firstname.value)
    studentcard.appendChild(studname);

    const outerinputdiv=document.createElement("div");
    outerinputdiv.classList.add("outerinputdiv");
    studentcard.appendChild(outerinputdiv);


    //create the inputs for the subjects
    const inputdiv=document.createElement("div");
    inputdiv.classList.add("inputdiv");

    const math=document.createElement("input");
    math.setAttribute("placeholder", "Math grade");
    const eng=document.createElement("input");
    eng.setAttribute("placeholder","English grade")
    const biology=document.createElement("input");
    biology.setAttribute("placeholder","Biology grade")
    const physics=document.createElement("input");
    physics.setAttribute("placeholder","Physics grade")
    const geography =document.createElement("input");
    geography.setAttribute("placeholder","Geography grade")
  
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

    //create the table of grades for each student
    const tablediv=document.createElement("div");
    tablediv.classList.add("tablediv");

    const mathcol=document.createElement("div");
    const engcol=document.createElement("div");
    const biocol=document.createElement("div");
    const physicscol=document.createElement("div");
    const geogcol=document.createElement("div");

    let columns=[mathcol,engcol,biocol,physicscol,geogcol];

    columns.forEach(element=>{
        element.classList.add("subjectcolumns");
        tablediv.appendChild(element);
    })

    //create texnodes for each of the columns titles
    const mathtitle=document.createElement("p");
    const engtitle=document.createElement("p");
    const biotitle=document.createElement("p");
    const physicstitle=document.createElement("p");
    const geogtitle=document.createElement("p");
    
    let titles=[mathtitle,engtitle,biotitle,physicstitle,geogtitle];
    titles.forEach(element=>{
        element.classList.add("title");
        if(mathcol){
            mathtitle.innerText="Math";
            mathcol.appendChild(mathtitle);
        } if(engcol){
            engtitle.innerText="English";
            engcol.appendChild(engtitle);
        } if(biocol){
            biotitle.innerText="Biology";
            biocol.appendChild(biotitle);
        } if(physicscol){
            physicstitle.innerText="Physics";
            physicscol.appendChild(physicstitle);
        }if (geogcol){
            geogtitle.innerText="Geography";
            geogcol.appendChild(geogtitle);
        }
    })


    //create the delete button for studentcard and append to studentscontainer
    const deletebutton=document.createElement("span");
    deletebutton.classList.add("deletebtn");
    deletebutton.innerText="🗑";
    studentcard.appendChild(deletebutton);

    //append the content containers to the main container and create subcontainer
    const subcontainer=document.createElement("div");
    subcontainer.classList.add("subcontainer")
    subcontainer.appendChild(inputdiv);
    subcontainer.appendChild(buttondiv);

    studentscontainer.appendChild(studentcard);
    const studentcardcomponents=[subcontainer,tablediv];

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
 studentscontainer.addEventListener("click", function (event) {
    const clickedElement = event.target;

    // check if the clicked element is a delete button in the card
    if (clickedElement.tagName === "SPAN") {
        const studentCard = clickedElement.parentElement;

        // remove the corresponding object from the students array
       students = students.filter((student) =>{
           return `${student.lastname}_${student.firstname}` !== studentCard.id;
        });
       
        // remove the student card
        studentCard.remove();

        // remove the corresponding anchor tag
        const studentAnchor = studentslist.querySelector(`a[href="#${studentCard.id}"]`);
        if (studentAnchor) {
            studentAnchor.parentElement.remove();
        }

        saveData();
        location.reload();
    }
});

//create the add grade button event listener for every button
//add the event listener too every button and then sort them based on their class like event tagname has button and if button has class bla bla then do that if not do else
//verify if the button has that class if yes then add the eventlistener

showData();