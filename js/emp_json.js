let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
  // empPayrollList = getEmployeePayrollDataFromStorage();
  // document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
  // localStorage.removeItem('editEmp');
});

const createInnerHtml = () => {
  const innerHtml = `
  <tr>
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start date</th>
    <th>Actions</th>
  </tr>
  <tr>
    <td><img src="../assets/very-random-pose-asian-men-260nw-2423213779.webp" alt="" class="profile">
    </td>
    <td>Abi</td>
    <td>Male</td>
    <td><div class="dept-label">HR</div>
    <div class="dept-label">Finance</div></td>
    <td>350000</td>
    <td>1 Jan 2021</td>
    <td>
      <div class="actions">
        <img onclick="remove(this)" src="../assets/icons/icons8-delete.svg" alt="delete">
        <img onclick="update(this)" src="../assets/icons/edit.png" alt="edit">
      </div>
    </td>
  </tr>`;
  document.querySelector('#table-display').innerHTML = innerHtml;
};