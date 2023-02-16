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
        })
    
    function loadInfo(dataJSON) {
        let studentInfo = dataJSON.SheridanData;
    
        student = new Student(studentInfo.FullName, studentInfo.StudentID, 
                    studentInfo.UserName, studentInfo.Program);

        let authors = dataJSON.Authors;
        for(let author of authors) {
            let au = new Author(author.authorName, author.picture);
            console.log(au);
            console.log(authorArray);
            authorArray.push(au);
        }
    
        cite = dataJSON.Reference;
    }

    function loadHeader(student) {
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
            <b>${cite}</b>
        `
    }
}








