//button that creates student card and ancor tag in studentdiv
const addstudent=document.getElementById("addstud");
const firstname=document.getElementById("firstname");
const lastname=document.getElementById("lastname");
const idnr=document.getElementById("idnr");
const errortext=document.getElementById("errortext");

function isIdNumberUnique(id) {
    // check if the ID number already exists in the students array
    const isUnique = students.some(student => student.id === id);
    
    return isUnique;
}
const addStudentEvent = function () {

    if (isIdNumberUnique(idnr.value)) {
        errortext.textContent = "ID number must be unique!";
        return;
    }

    errortext.textContent = "";

    if (firstname.value === "" || lastname.value === "" || idnr.value === "") {
        errortext.textContent = "Please fill in everything!";
    } else if (!isNaN(firstname.value) || !isNaN(lastname.value)) {
        errortext.textContent = "Name can't be a number!";
    } else if (firstname.value.length > 15 || lastname.value.length > 15) {
        errortext.textContent = "Name can't be that long!";
    } else if (firstname.value.length < 3 || lastname.value.length < 3) {
        errortext.textContent = "Name can't be that short!";
    } else if (isNaN(idnr.value)) {
        errortext.textContent = "ID must be a number!";
    } else {
        errortext.textContent = "";

        // Add student to the array
        students.push({
            firstname: firstname.value.trim(),
            lastname: lastname.value.trim(),
            id: idnr.value, 
            grades: {
                Math: [],
                English: [],
                Biology: [],
                Physics: [],
                Geography: [],
            },
            averages: {
                Mathaverage: "",
                Englishaverage: "",
                Biologyaverage: "",
                Physicsaverage: "",
                Geographyaverage: "",
            },
            totalaverage: ""
        });

        // Sort students array by ID
        students.sort((a, b) => a.id - b.id);

        // Re-render student list & cards
        renderStudents();

        // Save updated data
        saveData();

        // Clear input fields
        firstname.value = "";
        lastname.value = "";
        idnr.value = "";
    }
};

function renderStudents() {
    studentslist.innerHTML = "";  // Clear aside list
    studentscontainer.innerHTML = ""; // Clear student cards

    students.forEach(student => {
        // Create student link (aside list)
        const anchordiv = document.createElement("div");
        anchordiv.classList.add("anchordiv");
        studentslist.appendChild(anchordiv);

        const anchor = document.createElement("a");
        anchor.setAttribute("href", "#" + student.lastname + "_" + student.firstname);
        anchor.textContent = student.lastname + " " + student.firstname;
        anchor.classList.add(student.id);
        anchor.classList.add("studentanchor");
        anchordiv.appendChild(anchor);

        // Create student card
        const studentcard = document.createElement("div");
        studentcard.classList.add("studentcard");
        studentcard.setAttribute("id", student.lastname + "_" + student.firstname);

        const studentnamecontainer = document.createElement("div");
        studentnamecontainer.classList.add("studentnamecontainer");
        studentcard.appendChild(studentnamecontainer);

        const studname = document.createElement("p");
        studname.classList.add("studname");
        studname.innerText = student.id + " " + student.lastname + " " + student.firstname;
        studentnamecontainer.appendChild(studname);

        //create button for total average
        const totalaverage=document.createElement("button");
        totalaverage.classList.add("totalaverage");
        totalaverage.innerText="Total average";
        studentnamecontainer.appendChild(totalaverage);

        // Append other elements (buttons, inputs, etc.)
        const outerinputdiv = document.createElement("div");
        outerinputdiv.classList.add("outerinputdiv");
        studentcard.appendChild(outerinputdiv);

        const inputdiv = document.createElement("div");
        inputdiv.classList.add("inputdiv");

        const buttondiv = document.createElement("div");
        buttondiv.classList.add("buttondiv");

        const averagebtndiv = document.createElement("div");
        averagebtndiv.classList.add("averagebtndiv");

        const tablediv = document.createElement("div");
        tablediv.classList.add("tablediv");

        subjects.forEach(subject => {
            const input = document.createElement("input");
            input.classList.add("noteinput");
            input.setAttribute("type", "text");
            input.setAttribute("placeholder", `${subject} grade`);
            inputdiv.appendChild(input);

            const gradebtn = document.createElement("button");
            gradebtn.classList.add("addnote");
            gradebtn.textContent = "Add";
            buttondiv.appendChild(gradebtn);

            const averagebtn = document.createElement("button");
            averagebtn.classList.add("averagebtn");
            averagebtn.textContent = "Get average";
            averagebtndiv.appendChild(averagebtn);

            const column = document.createElement("div");
            column.classList.add("subjectcolumns", subject);
            tablediv.appendChild(column);

            const average = document.createElement("p");
            average.classList.add("averagegrade");
            column.appendChild(average);

            const title = document.createElement("p");
            title.classList.add("title");
            title.innerText = subject;
            column.appendChild(title);
        });

        // Append student card elements
        const deletebutton = document.createElement("span");
        deletebutton.classList.add("deletebtn");
        deletebutton.innerText = "🗑";
        studentcard.appendChild(deletebutton);

        const resetBtn = document.createElement("span");
        resetBtn.classList.add("resetbutton");
        resetBtn.innerText = "⟲";
        studentcard.appendChild(resetBtn);

        const subcontainer = document.createElement("div");
        subcontainer.classList.add("subcontainer");
        subcontainer.appendChild(inputdiv);
        subcontainer.appendChild(buttondiv);
        subcontainer.appendChild(averagebtndiv);

        studentscontainer.appendChild(studentcard);
        outerinputdiv.appendChild(subcontainer);
        outerinputdiv.appendChild(tablediv);
    });
}

addstudent.addEventListener("click",(event)=>{
    addStudentEvent(event);
    event.preventDefault();
});
window.addEventListener("keydown",(event)=>{
    if(event.key==="Enter" && document.activeElement !== inputsearch && document.activeElement.tagName !=="INPUT"){
        addStudentEvent();
        event.preventDefault();
}});