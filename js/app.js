'use strict';
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

let studentsData;
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
  const xObj = new XMLHttpRequest();
  xObj.overrideMimeType('application/json');
  xObj.open('GET', 'studentData.json', true); // Replace 'my_data' with the path to your file
  xObj.onreadystatechange = function () {
    if (xObj.readyState == 4 && xObj.status == '200') {
      callback(xObj.responseText);
    }
  };
  xObj.send(null);
}
function addRow(isLecturer = false, name, preferredRole, score) {
  if (!document.getElementsByTagName) return;
  let tabBody = document.getElementById('students');
  let row = document.createElement('tr');
  let cell1 = document.createElement('td');
  let cell2 = document.createElement('td');
  let textNode1 = document.createTextNode(name);
  let textNode2 = document.createTextNode(preferredRole);
  cell1.appendChild(textNode1);
  cell2.appendChild(textNode2);
  row.appendChild(cell1);
  row.appendChild(cell2);
  if (isLecturer) {
    let cell3 = document.createElement('td');
    let textNode3 = document.createTextNode(score);
    cell3.appendChild(textNode3);
    row.appendChild(cell3);
  }

  tabBody.appendChild(row);
}
function buildStudentList(studentsData, isLecturer = false) {
  studentsData.forEach((studentData) => {
    addRow(
      isLecturer,
      studentData.name,
      studentData.preferredRole,
      studentData.score
    );
  });
}
function studentsInit() {
  loadJSON(function (response) {
    const JSONData = JSON.parse(response);
    buildStudentList(JSONData.students);
  });
}
function lecturerInit() {
  loadJSON(function (response) {
    const JSONData = JSON.parse(response);
    buildStudentList(JSONData.students, true);
    studentsData = JSONData.students;
  });
}
function createGroup() {
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
  }
  console.log('studentsData', studentsData);
  console.log('create the groups you lazy fuck');
}

function logOut() {
  sessionStorage.clear();
  location.href = 'index.html';
}
