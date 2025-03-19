
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