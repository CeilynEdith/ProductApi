$(document).ready(function () {
    // Función para cargar los productos al cargar la pagina
    loadProducts();

    // Evento  boton de búsqueda
    $('#searchButton').on('click', function () {
        var searchTerm = $('#searchInput').val().trim(); // Obtener el producto por el nombre 
        if (searchTerm !== '') {
            searchProducts(searchTerm);
        } else {
            alert('Ingrese un nombre para buscar.');
        }
    });

    // Evento para agregar productos
    $('#addProductForm').on('submit', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe por defecto

        var formData = {
            nombre: $('#nombre').val(),
            descripcion: $('#descripcion').val(),
            precio: parseFloat($('#precio').val()),
            cantidad: parseInt($('#cantidad').val())
        };

        addProduct(formData);
    });

    // Cargar los productos desde la API
    function loadProducts() {
        $.get('/api/products', function (data) {
            displayProducts(data);
        });
    }

    // buscar productos por nombre usando la API
    function searchProducts(name) {
        $.get(`/api/products/${name}`, function (data) {
            displaySearchResults(data);
        }).fail(function () {
            alert('No se encontró ningún producto con ese nombre.');
            clearSearchResults();
        });
    }

    // Agregar un nuevo producto usando la API
    function addProduct(productData) {
        $.ajax({
            url: '/api/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(productData),
            success: function (data) {
                alert('Producto agregado correctamente.');
                $('#addProductForm')[0].reset(); // Limpiar el formulario
                loadProducts(); // Recargar la lista de productos
            },
            error: function () {
                alert('Error al agregar el producto. Por favor, inténtelo de nuevo.');
            }
        });
    }

    // Mostrar los productos en la tabla principal
    function displayProducts(products) {
        var tableBody = $('#productTable tbody');
        tableBody.empty();
        products.forEach(function (product) {
            var row = `<tr>
                        <td>${product.id}</td>
                        <td>${product.nombre}</td>
                        <td>${product.descripcion}</td>
                        <td>${product.precio}</td>
                        <td>${product.cantidad}</td>
                    </tr>`;
            tableBody.append(row);
        });
    }

    // Mostrar los resultados de búsqueda 
    function displaySearchResults(product) {
        var searchResultBody = $('#searchResultBody');
        searchResultBody.empty();
        var row = `<tr>
                    <td>${product.id}</td>
                    <td>${product.nombre}</td>
                    <td>${product.descripcion}</td>
                    <td>${product.precio}</td>
                    <td>${product.cantidad}</td>
                </tr>`;
        searchResultBody.append(row);
        $('#searchResultContainer').show(); // Mostrar el contenedor de resultados de bUsqueda
    }

    // Limpiar los resultados de busqueda
    function clearSearchResults() {
        $('#searchResultBody').empty();
        $('#searchResultContainer').hide();
    }
});