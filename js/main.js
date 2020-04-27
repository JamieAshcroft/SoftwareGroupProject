const objStudents = [
  {
    username: "Test",
    password: "hello"
  }
], objLecturers = [
  {
    username: "Admin",
    password: "ormskirk"
  }
];

function getInfo() {
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  for(i = 0; i < objStudents.length; i++) {
    if(username == objStudents[i].username && password == objStudents[i].password){
      console.log(username + " is logged in!");
      sessionStorage.setItem('loggedInAs', 'student');
      location.href = "students.html";
      return;
    }
  }

  for(i = 0; i < objLecturers.length; i++) {
    if(username == objLecturers[i].username && password == objLecturers[i].password){
      console.log(username + " is logged in!")
      sessionStorage.setItem('loggedInAs', 'lecturer');
      location.href = "lecturers.html";
      return;
    }
  }
}

