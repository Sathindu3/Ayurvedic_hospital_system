import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    productName: '',
    productDescription: '',
    productPrice: '',
    productImage: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7255/api/Product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.productName) errors.productName = 'Product name is required.';
    if (!formData.productDescription) errors.productDescription = 'Product description is required.';
    if (!formData.productPrice || isNaN(formData.productPrice)) errors.productPrice = 'Product price must be a valid number.';
    if (formData.productImage && formData.productImage.size > 2 * 1024 * 1024) errors.productImage = 'Image size should be less than 2MB.';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenModal = (product = null) => {
    setIsEditing(!!product);
    setCurrentProduct(product);
    setFormData({
      id: product ? product.id : '',
      productName: product ? product.productName : '',
      productDescription: product ? product.productDescription : '',
      productPrice: product ? product.productPrice : '',
      productImage: null,
    });
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { id, productName, productDescription, productPrice, productImage } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append('Product_Name', productName);
    formDataToSend.append('Product_Description', productDescription);
    formDataToSend.append('Product_Price', productPrice);
    if (productImage) {
      formDataToSend.append('Product_Image', productImage);
    }

    try {
      if (isEditing) {
        await axios.put(`https://localhost:7255/api/Product/${id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('https://localhost:7255/api/Product', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7255/api/Product/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="products-container">
      <h1>Products List</h1>
      <Button variant="primary" onClick={() => handleOpenModal()}>Add New Product</Button>
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>{product.productPrice}</td>
              <td>
                {product.productImage && (
                  <img src={`data:image/jpeg;base64,${product.productImage}`} alt={product.productName} style={{ width: '100px' }} />
                )}
              </td>
              <td>
                <Button variant="warning" onClick={() => handleOpenModal(product)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding/Editing Products */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                isInvalid={!!errors.productName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.productName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product description"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                isInvalid={!!errors.productDescription}
              />
              <Form.Control.Feedback type="invalid">
                {errors.productDescription}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product price"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleInputChange}
                isInvalid={!!errors.productPrice}
              />
              <Form.Control.Feedback type="invalid">
                {errors.productPrice}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="productImage"
                onChange={handleInputChange}
                isInvalid={!!errors.productImage}
              />
              <Form.Control.Feedback type="invalid">
                {errors.productImage}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update Product' : 'Add Product'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductsPage;
