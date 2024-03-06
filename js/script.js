var productName = document.getElementById('productNameInput');
var productCategory = document.getElementById('productCategoryInput');
var productPrice = document.getElementById('productPriceInput');
var productDescripiton = document.getElementById('productDescripitonTextarea');
var productSearch = document.getElementById('productSearchInput');
var addProduct = document.getElementById('productAddButton');
var pNameAlert = document.getElementById('pNameAlert');
var currentIndex = 0;

if (localStorage.getItem('allProduct') == null) {
  var productContainer = []
} else {
  var productContainer = JSON.parse(localStorage.getItem('allProduct'))
  displayProduct()
}

function createProduct() {
  var product = {
    pName: productName.value,
    category: productCategory.value,
    price: productPrice.value,
    descripiton: productDescripiton.value
  }
  productContainer.push(product)

}

function clearForm() {
  productName.value = '';
  productCategory.value = '';
  productPrice.value = '';
  productDescripiton.value = '';
}

function displayProduct() {
  var trs = ''
  for (var i = 0; i < productContainer.length; i++) {
    trs += `
    <tr>
    <td>${i + 1}</td>
    <td>${productContainer[i].pName}</td>
    <td>${productContainer[i].category}</td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].descripiton}</td>
    <td><button onclick="getProductInfo(${i})" class="btn btn-warning"><i class="fa fa-solid fa-edit"></i></button></td>
    <td><button onclick="deleteProduct(${i})" class="btn btn-danger"><i class="fa fa-solid fa-trash"></i></button></td>
    </tr>
    `
  }
  document.getElementById('tableBody').innerHTML = trs;
}

function deleteProduct(index) {
  productContainer.splice(index, 1);
  localStorage.setItem('allProduct', JSON.stringify(productContainer))
  displayProduct();
}

function searchProduct() {
  var trs = ''
  for (var i = 0; i < productContainer.length; i++) {
    if (productContainer[i].pName.toLowerCase().includes(productSearch.value.toLowerCase()) || productContainer[i].category.toLowerCase().includes(productSearch.value.toLowerCase())) {
      trs += `
      <tr>
      <td>${i + 1}</td>
      <td>${productContainer[i].pName}</td>
      <td>${productContainer[i].category}</td>
      <td>${productContainer[i].price}</td>
      <td>${productContainer[i].descripiton}</td>
      <td><button onclick="getProductInfo(${i})" class="btn btn-warning"><i class="fa fa-solid fa-edit"></i></button></td>
      <td><button onclick="deleteProduct(${i})" class="btn btn-danger"><i class="fa fa-solid fa-trash"></i></button></td>
      </tr>
      `
    }
    document.getSelection(productContainer[i].pName)
  }
  document.getElementById('tableBody').innerHTML = trs;
}

function getProductInfo(index) {
  productName.value = productContainer[index].pName;
  productCategory.value = productContainer[index].category;
  productPrice.value = productContainer[index].price;
  productDescripiton.value = productContainer[index].descripiton;
  addProduct.innerHTML = 'Update Product';
  currentIndex = index;
}

addProduct.onclick = function () {
  if (validateProduct() == true
    && productName.value != ""
    && productCategory.value != ""
    && productPrice.value != ""
    && productDescripiton.value != "") {
    if (addProduct.innerHTML == 'Add Product') {
      createProduct()
    } else {
      updateProduct()
    }
    localStorage.setItem('allProduct', JSON.stringify(productContainer))
    clearForm();
    displayProduct();
  } else {
    alert('Not Valid');
  }
}

function updateProduct() {
  var product = {
    pName: productName.value,
    category: productCategory.value,
    price: productPrice.value,
    descripiton: productDescripiton.value
  }
  productContainer[currentIndex] = product
  addProduct.innerHTML == 'Add Product'
}

function validateProduct() {
  var pNameRegex = /^[A-Z][a-z]{3,10}$/;
  var pname = productName.value;
  pNameRegex.test(pname);
  if (/^[A-Z]/.test(pname)) {
    if (/[a-z]{3,10}$/.test(pname)) {
      pNameAlert.classList.add('d-none');
      productName.classList.add('is-valid')
      productName.classList.remove('is-invalid')
      return true
    }else{
      pNameAlert.classList.remove('d-none');
      productName.classList.remove('is-valid')
      productName.classList.add('is-invalid')
      pNameAlert.innerHTML = "Product Name Must contain at Least 3 small letters"
      return false

    }
  } else {
    pNameAlert.innerHTML = "Please Start With Capital Letter"
    pNameAlert.classList.remove('d-none');
      productName.classList.remove('is-valid')
      productName.classList.add('is-invalid')
  }
}

// minakaram13@gmail.com
