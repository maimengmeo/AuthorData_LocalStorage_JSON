async function startUp() {
    class Student {
        constructor(FullName, StudentID, UserName, Program) {
            this.FullName = FullName;
            this.StudentID = StudentID;
            this.UserName = UserName;
            this.Program = Program;
        }
    }

    class Author {
        constructor(authorName, picture) {
            this.authorName = authorName;
            this.picture = picture;
        }
    }

    let student = new Student();
    let authorArray = new Array();
    let cite = "";
    let index = 0;


    await fetch("data/A2-JSON.json")
        .then (res => res.json())
        .then (dataJSON => {
            loadInfo(dataJSON);
            console.log(student);
            loadHeader(student);
            loadFooter(cite);
            loadAuthors(authorArray);
        })
    
    function loadInfo(dataJSON) {
        let studentInfo = dataJSON.SheridanData;
    
        student = new Student(studentInfo.FullName, studentInfo.StudentID, 
                    studentInfo.UserName, studentInfo.Program);

        let authors = dataJSON.Authors;
        for(let [index, author] of authors) {
            let au = new Author(author.authorName, author.picture);
            authorArray.push(au);

            //create div container for each author
            let authorContainer = document.createElement("div");
            authorContainer.classList.add("author-container");
            
            //create author thumbnail image
            let authorImg = document.createElement("img");
            authorImg.src = author.picture;
            authorImg.classList.add("author-thumbnail-img");

            //create anchor tag with author's name
            let authorNameLink = document.createElement("a");
            authorNameLink.href = "otherPages/author-info.html";
            authorNameLink.innerText = author.authorName;
            authorNameLink.onclick = `selectAuthor(${index}, ${authorArray})`;

            let linebreak = document.createElement("br");

            authorContainer.appendChild(authorImg);
            authorContainer.appendChild(linebreak);
            authorContainer.appendChild(authorNameLink);

            document.querySelector(".author-list").appendChild(authorContainer);

        }
    
        cite = dataJSON.Reference;
    }

    function loadHeader(student) {
        document.querySelector('#header-text').innerHTML = 
        `
            <h4>Assignment #2/ Winter 2023<br>
            My Name: ${student.FullName}/ Student ID: ${student.StudentID}/ 
                My Login: ${student.UserName}/ My Program: ${student.Program}</h4>
        `
    }
    
    function loadFooter(cite) {
        document.querySelector('footer').innerHTML = 
        `
            <b>${cite}</b>
        `
    }

    function selectAuthor(index, authorArray) {
        localStorage.setItem("rowID", index);
        localStorage.setItem("authorArray", JSON.stringify(authorArray));
    }
}








