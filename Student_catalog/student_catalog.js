
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
const subjects=["Math","English","Biology","Physics","Geography"];
const averages=["Mathaverage","Englishaverage","Biologyaverage","Physicsaverage","Geographyaverage"];


    //save function but it should be in Backend/database
function saveData(){
    localStorage.setItem("data", studentslist.innerHTML);
    localStorage.setItem("students",JSON.stringify(students));
    localStorage.setItem("indstudent",studentscontainer.innerHTML);
}

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

    //check if inputs are empty or it is a number 
    if(firstname.value==="" || lastname.value==="" || idnr.value==="" ){
        errortext.textContent="Please fill in everything!";
    }else if(!isNaN(firstname.value)||!isNaN(lastname.value)){
        errortext.textContent="Name can't be a number!"
    }else{
    errortext.textContent="";
    
    //create students array of objects
    students.push({firstname:firstname.value,
                   lastname:lastname.value,
                   id:idnr.value,
                   grades:{
                    Math:[],
                    English:[],
                    Biology:[],
                    Physics:[],
                    Geography:[],
                   },
                   averages:{
                    Mathaverage:"",
                    Englishaverage:"",
                    Biologyaverage:"",
                    Physicsaverage:"",
                    Geographyaverage:"",
                   }
                   
                });
                   
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
    studentcard.appendChild(studname);


    //create the outerinputdiv(holder of the student marks and buttons/inputs)
    const outerinputdiv=document.createElement("div");
    outerinputdiv.classList.add("outerinputdiv");
    studentcard.appendChild(outerinputdiv);

    //create the input container for the subjects
    const inputdiv=document.createElement("div");
    inputdiv.classList.add("inputdiv");

    //create the submit buttons container for inputs
    const buttondiv=document.createElement("div");
    buttondiv.classList.add("buttondiv");

    //create the get average buttons container for notes
    const averagebtndiv=document.createElement("div");
    averagebtndiv.classList.add("averagebtndiv");

     //create the table container of grades for each student
     const tablediv=document.createElement("div");
     tablediv.classList.add("tablediv");


    //create buttons and add the addnote class and grade text then append to its container
    subjects.forEach((subject)=>{
        //create inputs
        const input=document.createElement("input");
        input.classList.add("noteinput");
        input.setAttribute("type","text");
        input.setAttribute("placeholder",`${subject} grade`); 
        inputdiv.appendChild(input);

        //create buttons for the inputs
        const gradebtn=document.createElement("button");
        gradebtn.classList.add("addnote");
        gradebtn.textContent="Add grade";
        buttondiv.appendChild(gradebtn);

        //create get average button 
        const averagebtn=document.createElement("button");
        averagebtn.classList.add("averagebtn");
        averagebtn.textContent="Get average";
        averagebtndiv.appendChild(averagebtn);

        //create the columns for each subject
        const column=document.createElement("div");
        column.classList.add("subjectcolumns");
        tablediv.appendChild(column);

        //create p element for the average
        const average=document.createElement("p");
        average.classList.add("averagegrade");
        column.appendChild(average);
       
        //create the titles for each subject
        const title = document.createElement("p");
        title.classList.add("title");
        title.innerText = subject; // Set the title text to the subject
        column.appendChild(title);
    });



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
    subcontainer.appendChild(averagebtndiv);

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
        
         // check if the clicked element has the "addnote" class 
    }else if (clickedElement.classList.contains("addnote")) {

        //get the parent element of this clicked element (the closest studentcard)
        const studentCard = clickedElement.closest(".studentcard");
        
        // get the corresponding student in the students array
        const student = students.find((student) => `${student.lastname}_${student.firstname}` === studentCard.id);

        if (student) {
            // find the subject index based on the button's position within the buttondiv
            const subjectIndex = Array.from(clickedElement.parentElement.children).indexOf(clickedElement);
           
            // find the corresponding input box in the inputdiv and get the grade
            const inputField = studentCard.querySelector(`.inputdiv .noteinput:nth-child(${subjectIndex + 1})`);
            const grade = (inputField.value).trim();

            // check if the user entered a grade and append it to the table if it is a valid one
           if (grade !== ""  && grade > 0 && grade <= 10) {
               
                // find the corresponding column in the tablediv
                const column = studentCard.querySelector(`.tablediv .subjectcolumns:nth-child(${subjectIndex + 1})`);

                // add a p element for the grade
                const gradeElement = document.createElement("p");
                gradeElement.innerText = grade;
                gradeElement.classList.add("grade");

                //give a unique id 
                const gradeId = Date.now().toString();

                //set attribute with the name of the subject
                gradeElement.setAttribute("data-subject", subjects[subjectIndex]); 

                //set attribute with the unique id 
                gradeElement.setAttribute("data-id", gradeId); 
                

                // append the grade to the column 
                column.appendChild(gradeElement);
                

                // add the grade to the corresponding array and corresponding subject
                student.grades[subjects[subjectIndex]].push({ id: gradeId, value: grade })

            
                inputField.value = "";
                saveData();
            //check if user entered a valid grade
            } else if(isNaN(grade)){
                inputField.value="Add a valid grade!";
            }else if(grade < 0){
                inputField.value="Can't be negative!";
            }else if(grade > 10){
                inputField.value="Can't be > than 10!";
            }else if(grade == 0){
                inputField.value="Can't be 0!"
            }
        }
        
        // check if the clicked element classlist contains averagebtn class if so do the following:
    }else if(clickedElement.classList.contains("averagebtn")){

        //select the closest element that has studentcard class ( which is the clickedelement parent)
        const studentCard=clickedElement.closest(".studentcard");

        //check the corresponding student so it gets added to the corrent student
        const student=students.find((student)=>`${student.lastname}_${student.firstname}` === studentCard.id);

        //if the student is found then:
        if(student){
            //get the index of the button on which the click was done
            const averageIndex=Array.from(clickedElement.parentElement.children).indexOf(clickedElement);
          
            //selects the corresponding subjects grades
            const subjectGrades=student.grades[subjects[averageIndex]].map((grade)=>{return grade.value});

            //get the average of the student from an individual subject if the subjectGrades array isn't empty
            if(subjectGrades.length>0){
                //get the sum of the grades
                const sum=subjectGrades.reduce((accumulator,currentvalue)=>{
                return (Number(accumulator)+Number(currentvalue));
            })
            //get the actual average of the grades
            const average=sum/subjectGrades.length;

            //assign the average to the averages array of the students
            student.averages[averages[averageIndex]]=average;

            //get the corresponding p element that contains averagegrade class of the corresponding column
            const averageElement = studentCard.querySelector(`.tablediv .subjectcolumns:nth-child(${averageIndex + 1}) .averagegrade`);

            //set the text of the averagelement to be the average calculated before
            averageElement.innerText=`Av:${average.toFixed(1)}`;
            
            saveData();
        }
        }
    } else if (clickedElement.classList.contains("grade")) {
        const studentCard = clickedElement.closest(".studentcard");

        // get subject and grade from data attributes
        const subjectKey = clickedElement.getAttribute("data-subject");
        const gradeId = clickedElement.getAttribute("data-id");

        // get the corresponding student
        const student = students.find((student) => `${student.lastname}_${student.firstname}` === studentCard.id);
        
        if (student) {
            //get the index of the mark in the students grades array
            const gradeIndex = student.grades[subjectKey].findIndex((grade) => grade.id === gradeId);
            
            // remove the grade from the student's grades array
            student.grades[subjectKey].splice(gradeIndex, 1);

            //remove the clicked element
            clickedElement.remove();

            saveData();
        }
    }
});

showData();