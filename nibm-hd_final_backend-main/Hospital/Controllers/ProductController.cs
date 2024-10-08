using Hospital.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _productContext;

        public ProductController(ApplicationDbContext productContext)
        {
            _productContext = productContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            if (_productContext.Products == null)
            {
                return NotFound();
            }

            return await _productContext.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productContext.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromForm] ProductCreateDto productDto)
        {
            var product = new Product
            {
                Product_Name = productDto.Product_Name,
                Product_Description = productDto.Product_Description,
                Product_Price = productDto.Product_Price
            };

            if (productDto.Product_Image != null && productDto.Product_Image.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await productDto.Product_Image.CopyToAsync(memoryStream);
                    product.Product_Image = memoryStream.ToArray();
                }
            }

            _productContext.Products.Add(product);
            await _productContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromForm] ProductCreateDto productDto)
        {
            var existingProduct = await _productContext.Products.FindAsync(id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            existingProduct.Product_Name = productDto.Product_Name;
            existingProduct.Product_Description = productDto.Product_Description;
            existingProduct.Product_Price = productDto.Product_Price;

            if (productDto.Product_Image != null && productDto.Product_Image.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await productDto.Product_Image.CopyToAsync(memoryStream);
                    existingProduct.Product_Image = memoryStream.ToArray();
                }
            }

            _productContext.Entry(existingProduct).State = EntityState.Modified;

            try
            {
                await _productContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _productContext.Products.Remove(product);
            await _productContext.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _productContext.Products.Any(e => e.Id == id);
        }
    }

    public class ProductCreateDto
    {
        public string Product_Name { get; set; }
        public string Product_Description { get; set; }
        public string Product_Price { get; set; }
        public IFormFile Product_Image { get; set; }
    }
}
