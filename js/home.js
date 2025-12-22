let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
  // empPayrollList = getEmployeePayrollDataFromStorage();
  // document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
  // localStorage.removeItem('editEmp');
});

const createInnerHtml = () => {
  const headerHtml = `<tr>
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start date</th>
    <th>Actions</th>
  </tr>`;
  let innerHtml = `${headerHtml}`;
  let empPayrollDataList = createEmployeePayrollJSON();
  for (empPayrollData of empPayrollDataList) {
    innerHtml = `
      ${innerHtml}
      <tr>
        <td><img src="${empPayrollData._profilePic}" alt="" class="profile">
        </td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${empPayrollData._startDate}</td>
        <td>
          <div class="actions">
            <img name=${empPayrollData._id} onclick="remove(this)" src="../assets/icons/icons8-delete.svg" alt="delete">
            <img name=${empPayrollData._id} onclick="update(this)" src="../assets/icons/edit.png" alt="edit">
          </div>
        </td>
      </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
};

const createEmployeePayrollJSON = () => {
  let empPayrollListLocal = [
    {
      _name: 'abi',
      _gender: 'male',
      _department: ['HR'],
      _salary: '10000',
      _startDate: '27 Dec 2021',
      _note: '',
      _id: new Date().getTime(),
      _profilePic: '../assets/happy-young-man-laughing_23-2148911860.avif'
    },
    {
      _name: 'BLEEP',
      _gender: 'female',
      _department: ['HR', 'Finance'],
      _salary: '251000',
      _startDate: '27 Dec 2021',
      _note: '',
      _id: new Date().getTime(),
      _profilePic: '../assets/portrait-beautiful-redhead-woman_23-2148339229.avif'
    }
  ];
  return empPayrollListLocal;
};

const getDeptHtml = (deptList) => {
  let deptHtml = '';
  for (const dept of deptList) {
    deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
  }
  return deptHtml;
};