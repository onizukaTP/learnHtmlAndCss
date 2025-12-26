let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
  if (siteProperties.use_local_storage.match("true")) {
    getEmployeePayrollDataFromStorage();
  } else getEmployeePayrollDataFromServer();
});

const processEmployeePayrollDataResponse = () => {
  document.querySelector('.emp-count').textContent = empPayrollList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp')
}

const getEmployeePayrollDataFromStorage = () => {
  empPayrollList =  localStorage.getItem('EmployeePayrollList') ? 
  JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
  processEmployeePayrollDataResponse();
}

const getEmployeePayrollDataFromServer = () => {
  makeServiceCall("GET", siteProperties.server_url, true)
    .then(responseText => {
      empPayrollList = JSON.parse(responseText);
      processEmployeePayrollDataResponse();
    })
    .catch(error => {
      console.log("GET Error status: " + JSON.stringify(error));
      empPayrollList = [];
      processEmployeePayrollDataResponse();
    });
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
  if (siteProperties.use_local_storage.match("true")) {
    localStorage.setItem('EmployeePayrollList', JSON.stringify(empPayrollList));
    createInnerHtml();
  } else {
    const deleteUrl = siteProperties.server_url + empPayrollData.id.toString();
    makeServiceCall("DELETE", deleteUrl, false)
      .then(responseText => {
        createInnerHtml();
        console.log(responseText);
      })
      .catch(err => {
        console.log("DELETE error sts: " + JSON.stringify(err));
      });
  }
  document.querySelector(".emp-count").textContent = empPayrollList.length;
};

function update(node){
  let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
  if(!empPayrollData) return;
  localStorage.setItem('editEmp', JSON.stringify(empPayrollData));
  window.location.replace(siteProperties.add_emp_payroll_page);
};