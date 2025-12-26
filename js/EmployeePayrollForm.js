let isUpdated = false;
let empPayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
   const name = document.querySelector('#name');
   name.addEventListener('input', () => {
        if (name.value.length == 0) {
            setTextValue('.text-error', '');
            return;
        }
        try {
            checkName(name);
            setTextValue('.text-error', '');
        } catch (e) {
            setTextValue('.text-error', e);
        }
   }); 

   const salary = document.querySelector('#salary');
   const output = document.querySelector('.salary-output');
   output.textContent = salary.value;
   salary.addEventListener('input', () => {
        output.textContent = salary.value;
   });

   const date = document.querySelector('#date');
   date.addEventListener('input', () => {
    let startDate = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
    getInputValueById('#year');
    try {
        checkStartDate(startDate);
        setTextValue('.date-error', '');
    } catch (e) {
        setTextValue('.date-error', e);
    }
   });

   checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObj();

        createAndUpdateStorage();
        resetForm();
        window.location.replace(siteProperties.home_page);
    } catch (e) {
        return;
    }
};

const setEmployeePayrollObj = () => {
    if (!isUpdated && siteProperties.use_local_storage.match("true")){
        empPayrollObj.id = createNewEmployeeId();
    }
    empPayrollObj._name = getInputValueById('#name');
    empPayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    empPayrollObj._gender = getSelectedValues('[name=gender]').pop();
    empPayrollObj._department = getSelectedValues('[name=department]');
    empPayrollObj._salary = getInputValueById('#salary');
    empPayrollObj._note = getInputValueById('#note');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
    getInputValueById('#year');
    empPayrollObj._startDate = date;
}

function createAndUpdateStorage() {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList) {
        let empPayrollData = employeePayrollList.find(empData => empData.id == empPayrollObj.id);
    
        if (!empPayrollData) employeePayrollList.push(empPayrollObj); 
        else {
            const index = employeePayrollList
                            .map(empData => empData.id)
                            .indexOf(empPayrollData.id);
            employeePayrollList.splice(index, 1, empPayrollObj);
        }
    } else {
        employeePayrollList = [empPayrollObj];
    }
    // alert(employeePayrollData.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

// const createEmployeePayrollData = (id) => {
//     let employeePayrollData = new EmployeePayrollData();
//     if (!id) employeePayrollData.id = createNewEmployeeId();
//     else employeePayrollData.id = id;
//     setEmployeePayrollData(employeePayrollData);
//     return employeePayrollData;
// };

// const setEmployeePayrollData = (employeePayrollData) => {
//     try {
//         employeePayrollData.name = empPayrollObj._name;
//     }
//     catch (e) {
//         setValue('.text-error', e);
//         throw e;
//     }
//     employeePayrollData.profilePic = empPayrollObj._profilePic;
//     employeePayrollData.gender = empPayrollObj._gender;
//     employeePayrollData.department = empPayrollObj._department;
//     employeePayrollData.salary = empPayrollObj._salary;
//     employeePayrollData.note = empPayrollObj._note;
//     try {
//         employeePayrollData.startDate = 
//             new Date(Date.parse(empPayrollObj._startDate));
//     } catch (e) {
//         setTextValue('.date-error', e);
//         throw e;
//     }
// };

const createNewEmployeeId = () => {
    let empId = localStorage.getItem('EmployeeId');
    empId = !empId ? 1 : (parseInt(empId)+1).toString();
    localStorage.setItem('EmployeeId', empId);
    return empId;
};

const createEmployeePayroll = () => {
    // localStorage.removeItem('EmployeePayrollList');
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    // employeePayrollData.id = Date.now();
    employeePayrollData.profilePic = getSelectedValues('[name=profile]')[0];
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#note');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') +
    " " + getInputValueById('#year');
    employeePayrollData.startDate = Date.parse(date);
    // alert(employeePayrollData.toString());
    // console.log('Data created with id: ' + employeePayrollData.id);
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const setForm = () => {
    // console.log("setForm called");
    // console.log("empPayrollObj:", empPayrollObj);
    setValue('#name', empPayrollObj._name);
    setSelectedValues('[name=profile]', empPayrollObj._profilePic);
    setSelectedValues('[name=gender]', empPayrollObj._gender);
    setSelectedValues('[name=department]', empPayrollObj._department);
    setValue('#salary', empPayrollObj._salary);
    setTextValue('.salary-output', empPayrollObj._salary);
    setValue('#note', empPayrollObj._note);
    const date = new Date(empPayrollObj._startDate);
    setValue('#day', date.getDate().toString());
    setValue('#month', date.toLocaleString('en-GB', { month: 'short' }));
    setValue('#year', date.getFullYear().toString());
};

const resetForm = () => {
    setValue('#name','');
    unSetSelectedValues('[name=profile]');
    unSetSelectedValues('[name=gender]');
    unSetSelectedValues('[name=department]');
    setValue('#salary','400000');
    setValue('#note','');
    setSelectedIndex('#day', 0);
    setSelectedIndex('#month', 0);
    setSelectedIndex('#year', 0);
};

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value) {
            item.checked = true;
        }
    })
};

const unSetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
};

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
};

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
};

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

const checkForUpdate = () => {
    let empPayrollJson = localStorage.getItem('editEmp');
    isUpdated = empPayrollJson ? true : false;
    if (!isUpdated) return;
    empPayrollObj = JSON.parse(empPayrollJson);
    setForm();
};