let productCounter = 1;
let editingRow = null;

const form = document.getElementById('product-form');
const tableBody = document.getElementById('product-table-body');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading the page
    const formData = Array.from(new FormData(form)).reduce((obj, [key, value]) => (obj[key] = value, obj), {});

    if (editingRow) {
        updateRow(editingRow, formData);
        editingRow = null;
    } else {
        addRow(formData);
        productCounter++;
    }

    form.reset(); // Reset the form
});

function addRow(data) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${productCounter}</td>
        <td>${data['kode-produk']}</td>
        <td>${data['nama-produk']}</td>
        <td>${data['harga-produk']}</td>
        <td>${data['satuan']}</td>
        <td>${data['kategori']}</td>
        <td>${data['stok-awal']}</td>
        <td><a href="${data['url-gambar']}" target="_blank">Link</a></td>
        <td><button onclick="editProduct(this)">Edit</button></td>
        <td><button onclick="deleteProduct(this)">Delete</button></td>
    `;
    tableBody.appendChild(newRow);
}

function updateRow(row, data) {
    const cells = row.querySelectorAll('td');
    cells[1].textContent = data['kode-produk'];
    cells[2].textContent = data['nama-produk'];
    cells[3].textContent = data['harga-produk'];
    cells[4].textContent = data['satuan'];
    cells[5].textContent = data['kategori'];
    cells[6].textContent = data['stok-awal'];
    cells[7].querySelector('a').href = data['url-gambar'];
    cells[7].querySelector('a').textContent = 'Link';
}

function editProduct(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');

    form['kode-produk'].value = cells[1].textContent;
    form['nama-produk'].value = cells[2].textContent;
    form['harga-produk'].value = cells[3].textContent;
    form['satuan'].value = cells[4].textContent;
    form['kategori'].value = cells[5].textContent;
    form['url-gambar'].value = cells[7].querySelector('a').href;
    form['stok-awal'].value = cells[6].textContent;

    editingRow = row;
}

function deleteProduct(button) {
    button.closest('tr').remove();
}