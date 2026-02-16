function registerUser() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration Successful!");
    window.location.href = "index.html";
}
function loginUser() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
        alert("Login Successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Wrong Email or Password");
    }
}
function addCourse() {
    let courseName = document.getElementById("courseName").value;
    let instructor = document.getElementById("instructor").value;
    let progress = document.getElementById("progress").value;

    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    let course = {
        name: courseName,
        instructor: instructor,
        progress: progress
    };

    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));

    displayCourses();
}

function displayCourses() {
    let courses = JSON.parse(localStorage.getItem("courses")) || [];
    let list = document.getElementById("courseList");
    list.innerHTML = "";

    courses.forEach((course, index) => {
        let div = document.createElement("div");
        div.className = "course-item";

        div.innerHTML = `
            <strong>${course.name}</strong> - ${course.instructor}
            <button onclick="editCourse(${index})">✏ Edit</button>
            <button onclick="deleteCourse(${index})">❌ Delete</button>
            <div class="progress-bar">
                <div class="progress-fill" style="width:${course.progress}%">
                    ${course.progress}%
                </div>
            </div>
        `;

        list.appendChild(div);
    });
}


function deleteCourse(index) {
    let courses = JSON.parse(localStorage.getItem("courses")) || [];
    courses.splice(index, 1); // remove selected course
    localStorage.setItem("courses", JSON.stringify(courses));
    displayCourses(); // refresh list
}

function editCourse(index) {
    let courses = JSON.parse(localStorage.getItem("courses")) || [];
    let newProgress = prompt("Enter new progress %:", courses[index].progress);

    if (newProgress !== null && newProgress !== "") {
        courses[index].progress = newProgress;
        localStorage.setItem("courses", JSON.stringify(courses));
        displayCourses();
    }
}
