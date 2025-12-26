let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
  empPayrollList = getEmployeePayrollDataFromStorage();
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
  return localStorage.getItem('EmployeePayrollList') ? 
  JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
  if (empPayrollList.length === 0) return;
  const headerHtml = `
    <tr>
      <th></th>
      <th>Name</th>
      <th>Gender</th>
      <th>Department</th>
      <th>Salary</th>
      <th>Start date</th>
      <th>Actions</th>
    </tr>`;
  let innerHtml = headerHtml;
  for (const empPayrollData of empPayrollList) {
    innerHtml += `
      <tr>
        <td>
          <img src="${empPayrollData._profilePic}" class="profile">
        </td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${stringifyDate(empPayrollData._startDate)}</td>
        <td>
          <div class="actions">
            <img id="${empPayrollData.id}"
                 onclick="remove(this)"
                 src="../assets/icons/icons8-delete.svg"
                 alt="delete">
            <img id="${empPayrollData.id}"
                 onclick="update(this)"
                 src="../assets/icons/edit.png"
                 alt="edit">
          </div>
        </td>
      </tr>`;
  }

  document.querySelector('#table-display').innerHTML = innerHtml;
};

const getDeptHtml = (deptList) => {
  if (!deptList) return '';
  if (!Array.isArray(deptList)) {
    return `<div class="dept-label">${deptList}</div>`;
  }
  let deptHtml = '';
  for (const dept of deptList) {
    deptHtml += `<div class="dept-label">${dept}</div>`;
  }
  return deptHtml;
};

function remove(node) {
  // console.log("Clicked id:", node.id, typeof node.id);
  let empPayrollData = empPayrollList.find(data => data.id == node.id);
  if(!empPayrollData) return;
  const index = empPayrollList.map(empData => empData.id)
                              .indexOf(empPayrollData.id);
  empPayrollList.splice(index, 1);
  localStorage.setItem('EmployeePayrollList', JSON.stringify(empPayrollList));
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
};

function update(node){
  let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
  if(!empPayrollData) return;
  localStorage.setItem('editEmp', JSON.stringify(empPayrollData));
  window.location.replace(siteProperties.add_emp_payroll_page);
};