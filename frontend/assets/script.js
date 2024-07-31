// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
    const viewStudentsButton = document.getElementById('view-students');
    const viewFeesButton = document.getElementById('view-fees');
    const studentsSection = document.getElementById('students-section');
    const feesSection = document.getElementById('fees-section');
    const studentForm = document.getElementById('student-form');
    const feeForm = document.getElementById('fee-form');
    const studentsList = document.getElementById('students-list');
    const feesList = document.getElementById('fees-list');
    const studentSelect = document.getElementById('student-select');

    viewStudentsButton.addEventListener('click', () => {
        studentsSection.classList.add('active');
        feesSection.classList.remove('active');
    });

    viewFeesButton.addEventListener('click', () => {
        feesSection.classList.add('active');
        studentsSection.classList.remove('active');
    });

    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const studentName = document.getElementById('student-name').value;

        const student = {
            id: Date.now().toString(),
            name: studentName
        };

        await fetch('http://localhost:3000/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });

        fetchStudents();
        studentForm.reset();
    });

    feeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const studentId = studentSelect.value;
        const amount = document.getElementById('amount').value;

        const fee = {
            id: Date.now().toString(),
            studentId,
            amount
        };

        await fetch('http://localhost:3000/api/fees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fee)
        });

        fetchFees();
        feeForm.reset();
    });

    async function fetchStudents() {
        const res = await fetch('http://localhost:3000/api/students');
        const students = await res.json();

        studentsList.innerHTML = '';
        studentSelect.innerHTML = '';
        students.forEach(student => {
            const li = document.createElement('li');
            li.textContent = student.name;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                await fetch(`http://localhost:3000/api/students/${student.id}`, {
                    method: 'DELETE'
                });
                fetchStudents();
            });
            li.appendChild(deleteButton);
            studentsList.appendChild(li);

            const option = document.createElement('option');
            option.value = student.id;
            option.textContent = student.name;
            studentSelect.appendChild(option);
        });
    }

    async function fetchFees() {
        const res = await fetch('http://localhost:3000/api/fees');
        const fees = await res.json();

        feesList.innerHTML = '';
        fees.forEach(fee => {
            const li = document.createElement('li');
            const studentName = studentsList.querySelector(`li[data-id="${fee.studentId}"]`).textContent;
            li.textContent = `${studentName} - $${fee.amount}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                await fetch(`http://localhost:3000/api/fees/${fee.id}`, {
                    method: 'DELETE'
                });
                fetchFees();
            });
            li.appendChild(deleteButton);
            feesList.appendChild(li);
        });
    }

    fetchStudents();
    fetchFees();
});
