async function loadAuthorPage() {
    let cite = localStorage.getItem("cite");
    let index = localStorage.getItem("rowID");
    let student = JSON.parse(localStorage.getItem("student"));
    let authorArray = JSON.parse(localStorage.getItem("authorArray"));
    
    let localAuthorData = authorArray[index];
    
    let param = localAuthorData.authorName.replace(/\.\s?/g, '%20').toLowerCase();
    let query = `https://openlibrary.org/search/authors.json?q=${param}`;

    loadHeader(student);
    loadFooter(cite);

    LoadAuthorPic(localAuthorData.picture);

    await fetch(query)
        .then (res => res.json())
        .then ((externalAuthorData) => {
            console.log(externalAuthorData);
            loadAuthorInfo(externalAuthorData);
        })
}

function loadHeader(student) {
    console.log(student);
    document.querySelector('header').innerHTML = 
        `
            <h4>Assignment #2/ Winter 2023<br>
            My Name: ${student.FullName}/ Student ID: ${student.StudentID}/ 
                My Login: ${student.UserName}/ My Program: ${student.Program}</h4>
        `
}

function loadFooter(cite) {
    document.querySelector('footer').innerHTML = 
    `
        <b>Reference: <a href="${cite}">${cite}</a></b>
    `;
}

function loadAuthorInfo(externalAuthorData) {
    let authorInfo = document.querySelector('.right-panel');
    let table = 
    `
        <table>
        <tbody>
            <tr>
                <td><b>Author Name:</b></td>
                <td>${externalAuthorData.docs[0].name}</td>
            </tr>
            <tr>
                <td><b>Birth Date:</b></td>
                <td>${externalAuthorData.docs[0].birth_date}</td>
            </tr>
    `;

    if(externalAuthorData.docs[0].death_date) {
        table += 
        `
            <tr>
                <td><b>Death Date:</b></td>
                <td>${externalAuthorData.docs[0].death_date}</td>
            </tr>
        `
    } else {
        table += 
        `
            <tr>
                <td><b>Death Date:</b></td>
                <td>Undefined</td>
            </tr>
        `
    }

    table += 
        `
            <tr>
                <td><b>Top Work:</b></td>
                <td>${externalAuthorData.docs[0].top_work}</td>
            </tr>
            </tbody>
            </table>
        `

    authorInfo.innerHTML = table;
}

function LoadAuthorPic(pic) {
    document.querySelector('.left-panel').innerHTML =
    `
        <img src="../${pic}" height="250">
    `;
    
}

//question:
//author list format
//dob undefined
//function scope

