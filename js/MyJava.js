let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let parentInput = document.querySelector('.parent-input');
let mood = 'create';
let tmp;
// Get Total
parentInput.addEventListener('keyup', getTotal);
function getTotal() {
  price.value !== ''
    ? ((total.innerHTML =
        +price.value + +taxes.value + +ads.value - +discount.value),
      (total.style.background = '#040'))
    : ((total.innerHTML = ''), (total.style.background = '#a00d02'));
}
// Create ProducT, Where can I save The Data,???
//? ===== Local Storage Down Below
let dataPro = [];
if (localStorage.product != null) {
  if (localStorage.product) {
    dataPro = JSON.parse(localStorage.product);
  }
}
submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: Number(price.value),
    taxes: Number(taxes.value),
    ads: Number(ads.value),
    discount: Number(discount.value),
    total: Number(total.innerHTML),
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value !== '' && category.value !== '' && newPro.count < 100) {
    if (mood === 'create') {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
          clearData();
        }
      } else {
        dataPro.push(newPro);
        clearData();
      }
    } else {
      dataPro[tmp] = newPro;
      mood = 'create';
      submit.innerHTML = 'Create';
      count.style.display = 'block';
      [title,price,taxes,ads,discount,total,category].forEach(e=> e.value = "")
    }
  }
  localStorage.setItem('product', JSON.stringify(dataPro));
  showData();
};
//Clear Inputs
function clearData() {
  [title, price, taxes, ads, discount, count, category].forEach(
    (e) => (e.value = ''),
  );
  total.innerHTML = '';
}
//Read
function showData() {
  getTotal();
  let table = '';
  for (let i = 0; i < dataPro.length; i++) {
    table += `
<tr>
<td>${i + 1}</td>
 <td>${dataPro[i].title.toLowerCase()}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
 <td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category.toLowerCase()}</td>
<td><button id="update" onclick="updateData(${i})">Update</button></td>
<td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
 </tr>
   `;
  }
  document.getElementById('tbody').innerHTML = table;
  let btnDelete = document.getElementById('deleteALL');
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `<button id="btn-delete" onclick="deleteALL()">Delete ALL (${dataPro.length})</button>`;
  } else {
    btnDelete.innerHTML = '';
  }
  

}
showData();
//Delete,

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
//DeletE ALL
function deleteALL() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

//count Done
//update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = 'none';
  category.value = dataPro[i].category;
  submit.innerHTML = 'Update';
  mood = 'update';
  tmp = i;
  scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  title.focus();
}
//Search MOOD
let SearchMood = 'title';
function getSearchMood(id) {
  let search = document.getElementById('search');
  id === 'searchTitle' ? (SearchMood = 'title') : (SearchMood = 'category');
  search.placeholder = 'Search By ' + SearchMood;
  search.focus();
  search.value = '';
  showData();
}
function searchData(value) {
  let newX = '';
  for (let i = 0; i < dataPro.length; i++) {
    if (SearchMood === 'title') {
      if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
        newX += `
      <tr>
<td>${i}</td>
 <td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
 <td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button id="update" onclick="updateData(${i})">Update</button></td>
<td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
 </tr>
      `;
      }
    } else {
      if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
        newX += `
      <tr>
<td>${i}</td>
 <td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
 <td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button id="update" onclick="updateData(${i})">Update</button></td>
<td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
 </tr>
      `;
      }
    }
  }
  document.getElementById('tbody').innerHTML = newX;
}


