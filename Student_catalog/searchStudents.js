
//create search for name feature
const searchForStudent=function(){
    const searchedStudent= inputsearch.value.trim().toLowerCase();

    if (searchedStudent !== "") {
        // find if the searched student has a matching student
        const matchingStudent = students.find(student => 
            (student.lastname && student.lastname.toLowerCase()) === searchedStudent || 
            (student.firstname && student.firstname.toLowerCase())  === searchedStudent ||
            (student.lastname.toLowerCase() + " " + student.firstname.toLowerCase()) === searchedStudent
        );
        if(matchingStudent){
            const studentCardId=`${matchingStudent.lastname}_${matchingStudent.firstname}`;
            const studentCard=document.getElementById(studentCardId);

            if(studentCard){
                setTimeout(()=>{
                    inputsearch.value="";
                },2000)
                studentCard.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }else{
            inputsearch.value = "";
            console.log(inputsearch)
            inputsearch.placeholder = "No student found";

            setTimeout(()=>{
                inputsearch.placeholder="Search for student";
            },2000)
        }
    }
}
//add event listeners to the search name funcitonality
searchbtn.addEventListener("click",searchForStudent);
inputsearch.addEventListener("keyup",(event)=>{
    if(event.key==="Enter"){
        searchForStudent();
    }
})