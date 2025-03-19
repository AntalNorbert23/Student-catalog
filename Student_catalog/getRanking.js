const getRanking = document.getElementById("studentranking");
let rankingTable = null; 

getRanking.addEventListener("click", function () {
    const studentsWithAverages = students.filter(student => student.totalaverage !== "");

    if (studentsWithAverages.length > 0) {
        // Add animation
        getRanking.classList.add("animate__animated", "animate__bounceOutDown");
        setTimeout(() => {
            getRanking.classList.remove("animate__animated", "animate__bounceOutDown");
        }, 1000);

        // if the table doesn't exist, create it
        if (!rankingTable) {
            rankingTable = document.createElement("table");
            rankingTable.classList.add("rankingtable");

            // create the headers
            const headerRow = rankingTable.insertRow(0);
            const nameTitle = headerRow.insertCell(0);
            nameTitle.innerText = "Name";
            const totalAverageTitle = headerRow.insertCell(1);
            totalAverageTitle.innerText = "Total Average";

            // append the table to the body
            document.body.appendChild(rankingTable);
        } else {
            // clear previous student rows (keep headers)
            rankingTable.innerHTML = rankingTable.rows[0].outerHTML;
        }

        // add new rows for students
        studentsWithAverages.forEach((student, index) => {
            const row = rankingTable.insertRow(index + 1);
            const nameCell = row.insertCell(0);
            nameCell.textContent = `${student.lastname} ${student.firstname}`;
            const totalAverageCell = row.insertCell(1);
            
            // highlight failed students
            if (Number(student.totalaverage) < 5) {
                totalAverageCell.textContent = `${student.totalaverage} - Failed`;
                totalAverageCell.style.color = "red"; 
            } else {
                totalAverageCell.textContent = student.totalaverage;
            }
        });

    } else {
        // Add animation
        getRanking.classList.add("animate__animated", "animate__zoomIn");
        setTimeout(() => {
            getRanking.classList.remove("animate__animated", "animate__zoomIn");
        }, 1000);

        // If no students with total averages
        getRanking.innerText = "No students with total averages available.";
        setTimeout(() => {
            getRanking.innerText = "Student ranking";
        }, 2500);
    }
});
