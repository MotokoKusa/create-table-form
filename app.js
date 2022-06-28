(() => {
  function createTable(arr) {
    if (document.querySelector('.table-body')) {
      document.querySelector('.table-body')
        .remove();
    }
    const form = document.getElementById('tableStudents');
    const tableBody = document.createElement('tbody');
    const now = new Date();
    tableBody.classList.add('table-body');
    form.append(tableBody);

    arr.forEach((el) => {
      const tableItem = document.createElement('tr');
      tableItem.classList.add('table-item');
      tableBody.append(tableItem);
      const itemName = document.createElement('td');
      itemName.textContent = `${el.surname} ${el.name} ${el.secName}`;
      tableItem.append(itemName);
      const itemDate = document.createElement('td');
      const itemDateBirth = new Date(el.date);
      let itemAge = now.getFullYear() - itemDateBirth.getFullYear();
      if (now.getTime() < itemDateBirth.getTime()) {
        itemAge--;
      }

      itemDate.textContent = `${`${el.date}(${itemAge}лет)`}`;
      tableItem.append(itemDate);
      const itemYear = document.createElement('td');
      const itemYearCheck = new Date(el.year);
      const fourYears = new Date(el.year);
      fourYears.setFullYear(fourYears.getFullYear() + 4);
      if (fourYears.getTime() < now.getTime()) {
        itemYear.textContent = `${`${itemYearCheck.getFullYear()}-${itemYearCheck.getFullYear() + 4} (Уже закончил)`}`;
      } else {
        const countYear = itemYearCheck.getFullYear() - now.getFullYear();
        itemYear.textContent = `${`${itemYearCheck.getFullYear()}-${itemYearCheck.getFullYear() + 4} ${countYear}курс`}`;
      }
      tableItem.append(itemYear);
      const itemClass = document.createElement('td');
      itemClass.textContent = `${el.class}`;
      tableItem.append(itemClass);
    });
  }

  function appValueForm() {
    let itemStudent = {};
    let listStudents = [];
    const form = document.getElementById('addStudentsForm');
    const inputName = document.getElementById('name');
    const inputSurname = document.getElementById('surname');
    const inputSecName = document.getElementById('secName');
    const inputDate = document.getElementById('date');
    const inputYear = document.getElementById('year');
    const inputClass = document.getElementById('class');
    const fioFilter = document.getElementById('fioFilter');
    const dateFilter = document.getElementById('dateFilter');
    const yearFilter = document.getElementById('yearFilter');
    const classFilter = document.getElementById('classFilter');
    const inputFilterFio = document.getElementById('inputFilterFio');
    const inputFilterClasses = document.getElementById('inputFilterClasses');
    const inputFilterStart = document.getElementById('inputFilterStart');
    const inputFilterEnd = document.getElementById('inputFilterEnd');

    let today = new Date();
    const day = today.getDate();
    const month = (today.getMonth() + 1).length === 2 ? today.getMonth() : `0${today.getMonth()}`;
    const year = today.getFullYear();
    today = `${year}-${month}-${day}`;

    inputDate.setAttribute('min', '1900-01-01');
    inputDate.setAttribute('max', `${today}`);
    inputYear.setAttribute('min', '2000-01-01');
    inputYear.setAttribute('max', `${today}`);

    form.addEventListener('submit', (el) => {
      el.preventDefault();
      const hasName = inputName.value.trim();
      const hasSurname = inputSurname.value.trim();
      const hasSecName = inputSecName.value.trim();
      const hasDate = inputDate.value >= '1900-01-01' && inputDate.value <= today;
      const hasYear = inputYear.value >= '2000-01-01' && inputYear.value <= today;
      const hasClass = inputClass.value.trim();

      el.preventDefault();
      if (hasName && hasSurname && hasSecName && hasDate && hasYear && hasClass) {
        itemStudent.name = inputName.value.trim();
        inputName.value = null;
        itemStudent.surname = inputSurname.value.trim();
        inputSurname.value = null;
        itemStudent.secName = inputSecName.value.trim();
        inputSecName.value = null;
        itemStudent.date = inputDate.value;
        inputDate.value = null;
        itemStudent.year = inputYear.value;
        inputYear.value = null;
        itemStudent.class = inputClass.value.trim();
        inputClass.value = null;
        listStudents.push(itemStudent);
        itemStudent = {};
        createTable(listStudents);
      }

      if (hasName) {
        document.querySelector('.form-name').innerHTML = '';
      } else {
        document.querySelector('.form-name').innerHTML = 'Введите имя';
      }
      if (hasSurname) {
        document.querySelector('.form-surname').innerHTML = '';
      } else {
        document.querySelector('.form-surname').innerHTML = 'Введите фамилию';
      }
      if (hasSecName) {
        document.querySelector('.form-sec-name').innerHTML = '';
      } else {
        document.querySelector('.form-sec-name').innerHTML = 'Введите отчество';
      }
      if (hasDate) {
        document.querySelector('.form-date').innerHTML = '';
      } else {
        document.querySelector('.form-date').innerHTML = 'Введите коректную дату';
      }
      if (hasYear) {
        document.querySelector('.form-year').innerHTML = '';
      } else {
        document.querySelector('.form-year').innerHTML = 'Введите коректный год';
      }
      if (hasClass) {
        document.querySelector('.form-class').innerHTML = '';
      } else {
        document.querySelector('.form-class').innerHTML = 'Введите факультет';
      }
    });

    fioFilter.addEventListener('click', () => {
      listStudents = listStudents.sort((a, b) => {
        const itemA = `${a.surname} ${a.name} ${a.secName}`;
        const itemB = `${b.surname} ${b.name} ${b.secName}`;
        if (itemA > itemB) {
          return 1;
        }
        if (itemA < itemB) {
          return -1;
        }
        if (itemA === itemB) {
          return 0;
        }
      });
      createTable(listStudents);
    });
    dateFilter.addEventListener('click', () => {
      listStudents = listStudents.sort((a, b) => {
        const itemA = new Date(a.date);
        const itemB = new Date(b.date);
        if (itemA > itemB) {
          return 1;
        }
        if (itemA < itemB) {
          return -1;
        }
        if (itemA === itemB) {
          return 0;
        }
      });
      createTable(listStudents);
    });
    classFilter.addEventListener('click', () => {
      listStudents = listStudents.sort((a, b) => {
        const itemA = a.class;
        const itemB = b.class;
        if (itemA > itemB) {
          return 1;
        }
        if (itemA < itemB) {
          return -1;
        }
        if (itemA === itemB) {
          return 0;
        }
      });
      createTable(listStudents);
    });
    yearFilter.addEventListener('click', () => {
      listStudents = listStudents.sort((a, b) => {
        const itemA = new Date(a.year);
        const itemB = new Date(b.year);
        if (itemA > itemB) {
          return 1;
        }
        if (itemA < itemB) {
          return -1;
        }
        if (itemA === itemB) {
          return 0;
        }
      });
      createTable(listStudents);
    });
    let filteredArr = [];

    inputFilterFio.addEventListener('input', (val) => {
      filteredArr = listStudents.filter((el) => {
        const fio = `${el.name} ${el.secName} ${el.surname}`;
        return fio.includes(val.target.value);
      });
      createTable(filteredArr);

      if (val.target.value.length === 0) {
        createTable(listStudents);
      }
    });
    inputFilterClasses.addEventListener('input', (val) => {
      filteredArr = listStudents.filter((el) => {
        return el.class.includes(val.target.value);
      });
      createTable(filteredArr);

      if (val.target.value.length === 0) {
        createTable(listStudents);
      }
    });
    inputFilterStart.addEventListener('input', (val) => {
      filteredArr = listStudents.filter((el) => {
        let itemDate = new Date(el.year);
        itemDate = itemDate.getFullYear();
        return itemDate === +val.target.value;
      });
      createTable(filteredArr);

      if (val.target.value.length === 0) {
        createTable(listStudents);
      }
    });
    inputFilterEnd.addEventListener('input', (val) => {
      filteredArr = listStudents.filter((el) => {
        let itemDate = new Date(el.year);
        itemDate = itemDate.getFullYear() + 4;
        return itemDate === +val.target.value;
      });
      createTable(filteredArr);

      if (val.target.value.length === 0) {
        createTable(listStudents);
      }
    });

  }

  appValueForm();
})();
