
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using ProductApi.Models;
using System.Collections.Generic;


namespace ProductApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]


    public class ProductsController : ControllerBase
    {
        private static List<Product> _products = new List<Product>
    {
        new Product { Id = 1, Nombre = "Producto 1", Descripcion = "Descripción del Producto 1", Precio = 100.00m, Cantidad = 10 },
        new Product { Id = 2, Nombre = "Producto 2", Descripcion = "Descripción del Producto 2", Precio = 50.00m, Cantidad = 20 },
        new Product { Id = 3, Nombre = "Producto 3", Descripcion = "Descripción del Producto 3", Precio = 20.00m, Cantidad = 30 }
    };

        [HttpGet]// Endpoint para obtener todos los productos (GET /api/products)
        public ActionResult<IEnumerable<Product>> Get()
        {
            return Ok(_products);// Devuelve todos los productos en formato JSON con código de estado 200 OK
        }


        [HttpGet("{name}")]
        public ActionResult<Product> GetByName(string name)
        {
            var product = _products.FirstOrDefault(p => p.Nombre.ToLower() == name.ToLower());
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        //[HttpGet("{id}")]// Endpoint para obtener un producto por su ID (GET /api/products/{id})
        public ActionResult<Product> GetById(int id)
        {
            var product = _products.FirstOrDefault(p => p.Id == id);// Busca el producto por su ID en la lista
            if (product == null)
            {
                return NotFound();// Si no se encuentra el producto, devuelve código de estado 404 Not Found
            }
            return Ok(product);// Si se encuentra el producto, lo devuelve en formato JSON con código de estado 200 OK
        }

        [HttpPost] // Endpoint para agregar un nuevo producto (POST /api/products)
        public ActionResult<Product> Post(Product product)
        {
            product.Id = _products.Count + 1; // Simulación de generación de ID
            _products.Add(product);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }
    }
}
