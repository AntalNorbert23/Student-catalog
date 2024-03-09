
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
    }else if(firstname.value.length>15 || lastname.value.length>15){
        errortext.textContent="Name can't be that long";
    }else if(firstname.value.length<3 || lastname.value.length<3){
        errortext.textContent="Name can't be that short";
    }else{
        errortext.textContent="";
        
        //create students array of objects
        students.push({firstname:firstname.value.trim(),
                    lastname:lastname.value.trim(),
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
                    },
                    totalaverage:""
        });
                    
                    console.log(students);

        //create student list aside navbar 
        const anchordiv=document.createElement("div");
        anchordiv.classList.add("anchordiv");
        studentslist.appendChild(anchordiv);

        //create student link
        const anchor=document.createElement("a");
        anchor.setAttribute("href","#"+lastname.value.trim()+"_"+firstname.value.trim());
        const anchorvalue=document.createTextNode(lastname.value.trim()+" "+firstname.value.trim());
        anchordiv.appendChild(anchor);
        anchor.classList.add(idnr.value);
        anchor.appendChild(anchorvalue); 

        //create card of the student
        const studentcard=document.createElement("div");
        studentcard.classList.add("studentcard");
        studentcard.setAttribute("id", lastname.value.trim() + "_" + firstname.value.trim());

        //create a subcontainer for studentcard
        const studentnamecontainer=document.createElement("div");
        studentnamecontainer.classList.add("studentnamecontainer");
        studentcard.appendChild(studentnamecontainer);
        
        //create the name of the student
        const studname=document.createElement("p");
        studname.classList.add("studname");
        studname.innerText=idnr.value+" "+lastname.value+" "+firstname.value;
        studentnamecontainer.appendChild(studname);

        //create button for average
        const totalaverage=document.createElement("button");
        totalaverage.classList.add("totalaverage");
        totalaverage.innerText="Total average";
        studentnamecontainer.appendChild(totalaverage);

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
            gradebtn.textContent="Add";
            buttondiv.appendChild(gradebtn);

            //create get average button 
            const averagebtn=document.createElement("button");
            averagebtn.classList.add("averagebtn");
            averagebtn.textContent="Get average";
            averagebtndiv.appendChild(averagebtn);

            //create the columns for each subject
            const column=document.createElement("div");
            column.classList.add("subjectcolumns",subject);
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

        //create the reset button for studentcard and append to studentscontainer
        const resetBtn=document.createElement("span");
        resetBtn.classList.add("resetbutton");
        resetBtn.innerText="⟲";
        studentcard.appendChild(resetBtn);

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
    if (clickedElement.classList.contains("deletebtn")) {
        const studentCard = clickedElement.parentElement;

        // remove the corresponding object from the students array
        students = students.filter((student) =>{
            return `${student.lastname}_${student.firstname}` !== studentCard.id;
        });
       
        // remove the student card
        studentCard.remove();

        // remove the corresponding anchor tag
        const studentAnchor = studentslist.querySelector(`a[href="#${studentCard.id}"]`);
        if (studentAnchor){
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

                // add a div element for the grade
                const gradeElement = document.createElement("div");
                gradeElement.innerText = grade;
                gradeElement.classList.add("grade");

                //add delete icon to every grade 
                const deleteIcon=document.createElement("span");
                deleteIcon.classList.add("deleteicon");
                deleteIcon.innerText="🗑";
                gradeElement.appendChild(deleteIcon);

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
                setTimeout(()=>{
                    inputField.value="";
                },1000)
            }else if(grade < 0){
                inputField.value="Can't be negative!";
                setTimeout(()=>{
                    inputField.value="";
                },1000)
            }else if(grade > 10){
                inputField.value="Can't be > than 10!";
                setTimeout(()=>{
                    inputField.value="";
                },1000)
            }else if(grade == 0){
                inputField.value="Can't be 0!";
                setTimeout(()=>{
                    inputField.value="";
                },1000)
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
            }else {
                const averageElement = studentCard.querySelector(`.tablediv .subjectcolumns:nth-child(${averageIndex + 1}) .averagegrade`);
                averageElement.innerText="No marks";

                //set the text of the average "p element" to none
                setTimeout(()=>{
                    averageElement.innerText="";
                },3000)
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

            //verify if the deleted grade was the last grade
            if (student.grades[subjectKey].length === 0){

                // if it was the last grade set it to an empty string
                student.averages[averages[subjects.indexOf(subjectKey)]] = "";

                //select the p element that has the corresponding subject class and set the element's text to an empty string
                const averageElement = studentCard.querySelector(`.tablediv .subjectcolumns.${subjectKey} .averagegrade`);
                averageElement.innerText = "";

                //delete totalaverage from the students array (original)
                student.totalaverage="";

                //set back the totalaverage button's initial text
                const totalAverageBtn=document.querySelector(`.studentcard#${studentCard.id} .totalaverage`);
                totalAverageBtn.innerText="Total average";
                
            }else{

                //recalculate the new average if the grade was deleted
                const gradesValues = student.grades[subjectKey].map(grade => {return grade.value});
                const newsum = gradesValues.reduce((accumulator, currentvalue) => Number(accumulator) + Number(currentvalue));
                const newaverage=newsum/gradesValues.length;

                //set the new average in the students array
                student.averages[averages[subjects.indexOf(subjectKey)]] = Number(newaverage.toFixed(1));
            
                //get the proper p element that holds the average value and set the new average
                const averageElement = studentCard.querySelector(`.tablediv .subjectcolumns.${subjectKey} .averagegrade`);
                averageElement.innerText = `Av:${newaverage.toFixed(1)}`;
            }
            saveData();
        }
    }else if (clickedElement.classList.contains("resetbutton")){
        const studentCard=clickedElement.closest(".studentcard");
        clickedElement.innerText="⟲";
        clickedElement.style.fontSize="1.2em";

        //find the corresponding student
        const student=students.find((student)=>`${student.lastname}_${student.firstname}` === studentCard.id);

        // check if its the corresponding student with corresponding grades
        if (student && student.grades) {
            subjects.forEach((subject)=>{
                //empty the students grades array
                student.grades[subject] = []; 
                
                //select the studentcard of the corresponding student whose mark element has grade
                //class with the attribute of data subject() so the actual subject
                const gradeElements = document.querySelectorAll(`.studentcard#${studentCard.id} .grade[data-subject="${subject}"]`);

                //select the averages (p elements)
                const averages=document.querySelectorAll(`.studentcard#${studentCard.id} .averagegrade`);

                //get the total average button 
                const totalAverageBtn=document.querySelector(`.studentcard#${studentCard.id} .totalaverage`);

                //delete all marks for the student from the DOM
                gradeElements.forEach((gradeElement)=>{
                    gradeElement.remove();
                });

                //delete averages text and set totalaverage btn text
                averages.forEach((average)=>{
                    average.innerText="";
                    totalAverageBtn.innerText="Total average";
                })

                //delete average from the students (original) array (for each subject) 
                Object.keys(student.averages).forEach((subject)=>{
                    student.averages[subject] = "";
                });

                //delete totalaverage from the students array (original)
                student.totalaverage="";
            });
        }
        saveData();
    }else if(clickedElement.classList.contains("totalaverage")){
        const studentCard=clickedElement.closest(".studentcard");

        //find the corresponding student
        const student=students.find((student)=>`${student.lastname}_${student.firstname}` === studentCard.id);

        if(student && Object.keys(student.averages).length === subjects.length){
            //get the totalaverage button
           const totalAverageBtn=document.querySelector(`.studentcard#${studentCard.id} .totalaverage`);

           //make an array from the subjects averages 
           const averages=[student.averages.Mathaverage,
                           student.averages.Englishaverage,
                           student.averages.Biologyaverage,
                           student.averages.Physicsaverage,
                           student.averages.Geographyaverage];

            if (averages.every(average => typeof average === 'number' && !isNaN(average))) {
                //calculate the sum of the averages
                const totalaveragesum=averages.reduce((accumulator,currentvalue)=>{
                    return accumulator+currentvalue;
                })

                //calculate the totalaverages
                const totalaverage=(totalaveragesum/subjects.length).toFixed(2);
            
                //set the text for the total avergage button
                totalAverageBtn.innerText=`Total Av: ${totalaverage}`;

                //set the value of the students array totalaverage key
                student.totalaverage=totalaverage;
            }else{
                setTimeout(()=>{
                    totalAverageBtn.innerText="Not enough averages";
                },10)
               
                //set the text of the button to initial text
                setTimeout(()=>{
                    totalAverageBtn.innerText="Total average";
                },3000)

                totalAverageBtn.innerText="Total average";
            }
        }
        saveData();
    }
});

studentscontainer.addEventListener("mouseover", function (event) {
    const targetElement = event.target;

    if (targetElement.classList.contains("grade")){
        const deleteIcon = targetElement.querySelector(".deleteicon");
        if (deleteIcon){
            deleteIcon.style.display = "inline";
        }
    }
    if (targetElement.classList.contains("resetbutton")){

        targetElement.innerText="Reset all";
        targetElement.style.fontSize="0.6em";
    }
});

studentscontainer.addEventListener("mouseout",function(event){
    const targetElement=event.target;

    if (targetElement.classList.contains("grade")){
        const deleteIcon=targetElement.querySelector(".deleteicon");
        if(deleteIcon){
            deleteIcon.style.display="none";
        }
    }
    if (targetElement.classList.contains("resetbutton")){
        
        targetElement.innerText="⟲";
        targetElement.style.fontSize="1.2em";
}
})

const getRanking = document.getElementById("studentranking");

getRanking.addEventListener("click", function () {
    // check wether there are students with totalaverages calculated
    const studentsWithAverages = students.filter(student => student.totalaverage !== "");

    if (studentsWithAverages.length > 0) {
        //create a table
        const table = document.createElement("table");
        table.classList.add("rankingtable");

        // create the titles
        const headerRow = table.insertRow(0);
        const nameTitle = headerRow.insertCell(0);
        nameTitle.innerText = "Name";
        const totalAverageTitle = headerRow.insertCell(1);
        totalAverageTitle.innerText = "Total Average";

        // add rows for each student along with his/her total average
        studentsWithAverages.forEach((student, index) => {
            const row = table.insertRow(index + 1);
            const nameCell = row.insertCell(0);
            nameCell.textContent = `${student.lastname} ${student.firstname}`;
            const totalAverageCell = row.insertCell(1);
            totalAverageCell.textContent = student.totalaverage;
        });

        //append the table to the body
        document.body.appendChild(table);
    } else {
        //if there are no totalaverages
        getRanking.innerText="No students with total averages available.";
        setTimeout(() => {
            getRanking.innerText="Student ranking";
        }, 2500);
    }
});

showData();