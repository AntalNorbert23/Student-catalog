
const inputsearch=document.getElementById("searchbar");
const searchbtn=document.getElementById("searchicon");
const studentslist=document.getElementById("students");
const studentscontainer=document.getElementById("studentscardcontainer");
let students=[];
const subjects=["Math","English","Biology","Physics","Geography"];
const averages=["Mathaverage","Englishaverage","Biologyaverage","Physicsaverage","Geographyaverage"];

//event listener for click events on student operations
 studentscontainer.addEventListener("click", function (event) {
    const clickedElement = event.target;
    
    //create the delete event listener for the card
    if (clickedElement.classList.contains("deletebtn")) {
        handleDeleteStudent(clickedElement);
    } else if (clickedElement.classList.contains("addnote")) {
        handleAddNote(clickedElement);
    } else if (clickedElement.classList.contains("averagebtn")) {
        handleCalculateAverage(clickedElement);
    } else if (clickedElement.classList.contains("grade")) {
        handleDeleteGrade(clickedElement);
    } else if (clickedElement.classList.contains("resetbutton")) {
        handleResetStudent(clickedElement);
    } else if (clickedElement.classList.contains("totalaverage")) {
        handleTotalAverage(clickedElement);
    }
    saveData();
});

//event listeners to shape delete / reset buttons
studentscontainer.addEventListener("mouseover", function (event) {
    const targetElement = event.target;

    if (targetElement.classList.contains("grade")){
        const deleteIcon = targetElement.querySelector(".deleteicon");
        if (deleteIcon){
            deleteIcon.style.display = "inline";
        }
    }
    if (targetElement.classList.contains("resetbutton") && screen.width>1024){

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
    if (targetElement.classList.contains("resetbutton") && window.innerWidth>1024){
        
        targetElement.innerText="⟲";
        targetElement.style.fontSize="1.2em";
}
})

//event listener to add note on enter
document.addEventListener("keydown", function (event) {
    const clickedElement = event.target
    if (event.target.classList.contains("noteinput") && event.key === "Enter") {
        const studentCard = clickedElement.closest(".studentcard");

        const student = students.find(student => `${student.lastname}_${student.firstname}` === studentCard.id);
        if (!student) return;
        
        const subjectIndex = Array.from(clickedElement.parentElement.children).indexOf(clickedElement);
        // Find the corresponding "Add" button inside the same student card
        const inputField = studentCard.querySelector(`.inputdiv .noteinput:nth-child(${subjectIndex + 1})`);
        
        if (inputField) {
            handleAddNote(inputField);
        }
    }
    saveData();
});

//function to delete student
function handleDeleteStudent(clickedElement) {
    const studentCard = clickedElement.parentElement;
    // remove the corresponding object from the students array
    students = students.filter(student => `${student.lastname}_${student.firstname}` !== studentCard.id);
    // remove the student card
    studentCard.remove();
    
    // remove the corresponding anchor tag
    const studentAnchor = studentslist.querySelector(`a[href="#${studentCard.id}"]`);
    if (studentAnchor) {
        studentAnchor.parentElement.remove();
    }
    location.reload();
}

//function to handle mark addition
function handleAddNote(clickedElement) {
    //get the parent element of this clicked element (the closest studentcard)
    const studentCard = clickedElement.closest(".studentcard");
    // get the corresponding student in the students array
    const student = students.find(student => `${student.lastname}_${student.firstname}` === studentCard.id);
    if (!student) return;
    
    // find the subject index based on the button's position within the buttondiv
    const subjectIndex = Array.from(clickedElement.parentElement.children).indexOf(clickedElement);
    // find the corresponding input box in the inputdiv and get the grade
    const inputField = studentCard.querySelector(`.inputdiv .noteinput:nth-child(${subjectIndex + 1})`);
    const grade = (inputField.value).trim();
    
    // check if the user entered a grade and append it to the table if it is a valid one
    if (grade === "" || grade <= 0 || grade > 10 || isNaN(grade)) {
        handleInvalidGrade(inputField, grade);
        return;
    }
    
    // select the corresponding column in the tablediv
    const column = studentCard.querySelector(`.tablediv .subjectcolumns:nth-child(${subjectIndex + 1})`);
     // add a div element for the grade
    const gradeElement = document.createElement("div");
    gradeElement.innerText = grade;
    gradeElement.classList.add("grade");
    
    //add delete icon to every grade 
    const deleteIcon = document.createElement("span");
    deleteIcon.classList.add("deleteicon");
    deleteIcon.innerText = "🗑";
    gradeElement.appendChild(deleteIcon);
    
    const gradeId = Date.now().toString();
    //set attribute with the name of the subject
    gradeElement.setAttribute("data-subject", subjects[subjectIndex]);
    //set attribute with the unique id 
    gradeElement.setAttribute("data-id", gradeId);
    
    column.appendChild(gradeElement);
     // add the grade to the corresponding array and corresponding subject
    student.grades[subjects[subjectIndex]].push({ id: gradeId, value: grade });
    inputField.value = "";

    // //if  we would like automated average calculation
    // handleCalculateAverage(clickedElement)
}

//function to validate grade
function handleInvalidGrade(inputField, grade) {
    let errorMessage = "";
    if (isNaN(grade)) errorMessage = "Add a valid grade!";
    else if (grade < 0) errorMessage = "Can't be negative!";
    else if (grade > 10) errorMessage = "Can't be > than 10!";
    else if (grade == 0) errorMessage = "Can't be 0!";
    
    inputField.value = errorMessage;
    setTimeout(() => inputField.value = "", 1000);
}

//function to calculate the average of a subject
function handleCalculateAverage(clickedElement) {
    const studentCard = clickedElement.closest(".studentcard");
    const student = students.find(student => `${student.lastname}_${student.firstname}` === studentCard.id);
    if (!student) return;
    
     //get the index of the button on which the click was done
    const averageIndex = Array.from(clickedElement.parentElement.children).indexOf(clickedElement);
    //selects the corresponding subjects grades
    const subjectGrades = student.grades[subjects[averageIndex]].map(grade => Number(grade.value));
    
    //get the corresponding p element that contains averagegrade class of the corresponding column
    const averageElement = studentCard.querySelector(`.tablediv .subjectcolumns:nth-child(${averageIndex + 1}) .averagegrade`);
    
    //get the average of the student from an individual subject if the subjectGrades array isn't empty
    if (subjectGrades.length > 0) {
        //get the sum of the grades
        const sum = subjectGrades.reduce((acc, val) => acc + val, 0);
        //get the actual average of the grades
        const average = sum / subjectGrades.length;
         //assign the average to the averages array of the students
        student.averages[averages[averageIndex]] = average;
        averageElement.innerText = `Av:${average.toFixed(1)}`;
    } else {
        averageElement.classList.add("animate__bounceIn");
        setTimeout(() => averageElement.classList.remove("animate__bounceIn"), 1000);
        averageElement.innerText = "No marks";
        setTimeout(() => averageElement.innerText = "", 3000);
    }
}

//function to delete grade
function handleDeleteGrade(clickedElement) {
    const studentCard = clickedElement.closest(".studentcard");
    // get subject and grade from data attributes
    const subjectKey = clickedElement.getAttribute("data-subject");
    const gradeId = clickedElement.getAttribute("data-id");

    const student = students.find(student => `${student.lastname}_${student.firstname}` === studentCard.id);
    if (!student) return;
    
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
}

//function to reset the student ( including marks and averages )
function handleResetStudent(clickedElement) {
    const studentCard = clickedElement.closest(".studentcard");
    clickedElement.innerText="⟲";
    if(screen.width>1024){
        clickedElement.style.fontSize="1.2em";
    }
    const student = students.find(student => `${student.lastname}_${student.firstname}` === studentCard.id);
    if (!student) return;
    
    subjects.forEach(subject => {
        student.grades[subject] = [];
        //select the studentcard of the corresponding student whose mark element has grade
        //class with the attribute of data subject() so the actual subject
        const gradeElements = studentCard.querySelectorAll(`.grade[data-subject="${subject}"]`);
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

//function to calculate the totalaverage of the averages of subjects
function handleTotalAverage(clickedElement) {
    const studentCard = clickedElement.closest(".studentcard");
    const student = students.find(student => `${student.lastname}_${student.firstname}` === studentCard.id);
    if (!student) return;
    
    const averagesArray = Object.values(student.averages).filter(avg => typeof avg === 'number' && !isNaN(avg));
    //get the totalaverage button
    const totalAverageBtn = studentCard.querySelector(".totalaverage");
    
    if (averagesArray.length === subjects.length) {
        //calculate the averages of the subjects from the previously constructed averagesArray
        const totalAverage = (averagesArray.reduce((sum, avg) => sum + avg, 0) / subjects.length).toFixed(2);
        totalAverageBtn.innerText = `Total Av: ${totalAverage}`;
        student.totalaverage = totalAverage;
    } else {
        setTimeout(()=>{
            totalAverageBtn.innerText="Not enough averages";
            totalAverageBtn.classList.add("animate__animated","animate__fadeInUp");
        },10)
       
        //set the text of the button to initial text
        setTimeout(()=>{
            totalAverageBtn.classList.remove("animate__animated","animate__fadeInUp");
            totalAverageBtn.innerText="Total average";
        },3000)

        totalAverageBtn.innerText="Total average";
    }
}

showData();