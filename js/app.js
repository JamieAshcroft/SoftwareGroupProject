const objStudents = [
    {
      username: 'Test',
      password: 'hello',
    },
  ],
  objLecturers = [
    {
      username: 'Admin',
      password: 'ormskirk',
    },
  ];

function getInfo() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  for (i = 0; i < objStudents.length; i++) {
    if (
      username == objStudents[i].username &&
      password == objStudents[i].password
    ) {
      console.log(username + ' is logged in!');
      sessionStorage.setItem('loggedInAs', 'student');
      location.href = 'students.html';
      return;
    }
  }

  for (i = 0; i < objLecturers.length; i++) {
    if (
      username == objLecturers[i].username &&
      password == objLecturers[i].password
    ) {
      console.log(username + ' is logged in!');
      sessionStorage.setItem('loggedInAs', 'lecturer');
      location.href = 'lecturers.html';
      return;
    }
  }
}

function loadJSON(callback) {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', 'studentData.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == '200') {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
function buildHtml(studentsData) {
  console.log(studentsData);
  let i;
  for (i = 0; i < studentsData.bandA.length; i++) {
    // Write HTML to the page
    console.log(studentsData.bandA[i]);
  }
  for (i = 0; i < studentsData.bandB.length; i++) {
    // Write HTML to the page
    console.log(studentsData.bandB[i]);
  }
  for (i = 0; i < studentsData.bandC.length; i++) {
    // Write HTML to the page
    console.log(studentsData.bandC[i]);
  }
  for (i = 0; i < studentsData.bandD.length; i++) {
    // Write HTML to the page
    console.log(studentsData.bandD[i]);
  }
}
function sortStudents(studentsData) {
  const newStudentData = {
    bandA: (array = []),
    bandB: (array = []),
    bandC: (array = []),
    bandD: (array = []),
  };
  let i;
  for (i = 0; i < studentsData.length; i++) {
    if (studentsData[i].score <= 50) {
      newStudentData.bandD.push(studentsData[i]);
    }
    if (studentsData[i].score <= 50 && studentsData[i].score <= 50) {
      newStudentData.bandC.push(studentsData[i]);
    }
    if (studentsData[i].score <= 50 && studentsData[i].score <= 50) {
      newStudentData.bandB.push(studentsData[i]);
    }
    if (studentsData[i].score >= 90) {
      newStudentData.bandA.push(studentsData[i]);
    }
  }
  buildHtml(newStudentData);
}
function studentsInit() {
  loadJSON(function (response) {
    // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    sortStudents(actual_JSON.students);
  });
}
function lecturerInit() {}

function logOut() {
  sessionStorage.clear();
  location.href = 'index.html';
}
