// Load All Students
async function loadStudents() {
    const response = await fetch('http://localhost:5000/students');
    const students = await response.json();
    const list = document.getElementById('student-list');
    list.innerHTML = '';

    students.forEach(student => {
        const item = document.createElement('li');
        item.innerHTML = `
            <strong>${student.Roll_No}</strong> - ${student.Name_students}, Age: ${student.Age}, Year: ${student.Studing_year}, Course: ${student.Course}, Mobile: ${student.Mobile_no || 'N/A'}, Address: ${student.Address || 'N/A'}
            <button onclick="editStudent('${student._id}', '${student.Roll_No}', '${student.Name_students}', ${student.Age}, '${student.Studing_year}', '${student.Course}', '${student.Mobile_no}', '${student.Address}')">Edit</button>
            <button onclick="deleteStudent('${student._id}')">Delete</button>
        `;
        list.appendChild(item);
    });
}

// Add a New Student
document.getElementById('student-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const roll_no = document.getElementById('roll_no').value;
    const name_students = document.getElementById('name_students').value;
    const age = document.getElementById('age').value;
    const studing_year = document.getElementById('studing_year').value;
    const course = document.getElementById('course').value;
    const mobile_no = document.getElementById('mobile_no').value;
    const address = document.getElementById('address').value;
    const response = await fetch('http://localhost:5000/students');
    await fetch('http://localhost:5000/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Roll_No: roll_no, Name_students: name_students, Age: age, Studing_year: studing_year, Course: course, Mobile_no: mobile_no, Address: address })
    });

    loadStudents();
});

// Edit a Student
async function editStudent(id, roll_no, name_students, age, studing_year, course, mobile_no, address) {
    const newRollNo = prompt('Edit Roll No:', roll_no);
    const newName = prompt('Edit Name:', name_students);
    const newAge = prompt('Edit Age:', age);
    const newYear = prompt('Edit Studying Year:', studing_year);
    const newCourse = prompt('Edit Course:', course);
    const newMobile = prompt('Edit Mobile No:', mobile_no);
    const newAddress = prompt('Edit Address:', address);

    if (newRollNo && newName && newAge && newYear && newCourse) {
        await fetch(`http://localhost:5000/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Roll_No: newRollNo, Name_students: newName, Age: newAge, Studing_year: newYear, Course: newCourse, Mobile_no: newMobile, Address: newAddress })
        });
        loadStudents();
    }
}

// Delete a Student
async function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        await fetch(`http://localhost:5000/students/${id}`, {
            method: 'DELETE'
        });
        loadStudents();
    }
}

// Load Students on Page Load
document.addEventListener('DOMContentLoaded', loadStudents);