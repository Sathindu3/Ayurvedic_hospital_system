import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7255/api/Product')  // Replace with your API endpoint
      .then(response => setProducts(response.data))
      .catch(error => console.error("There was an error fetching the products!", error));
  }, []);

  const convertToImageSrc = (imageData) => {
    return `data:image/jpeg;base64,${imageData}`;
  };

  return (
    <div className="container-fluid section-products">
      <div className="container">
        <div className="row">
          <div className="products-container">
            {products.map(product => (
              <div key={product.id} className="product-card">
                {product.product_Image && (
                  <img src={convertToImageSrc(product.product_Image)} alt={product.product_Name} />
                )}
                <h2>{product.product_Name}</h2>
                <p>{product.product_Description}</p>
                <p>Price: ${product.product_Price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>


  );
};

export default ProductsPage;
