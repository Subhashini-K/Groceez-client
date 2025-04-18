import { useState, useEffect } from 'react';
import { CATEGORIES } from '../../utils/constants';

const ProductForm = ({ product, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    unit: '',
    stock: '',
    imageUrl: '',
    nutrition: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) errors.price = 'Valid price is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.unit.trim()) errors.unit = 'Unit is required';
    if (!formData.stock || formData.stock < 0) errors.stock = 'Valid stock is required';
    if (!formData.imageUrl.trim()) errors.imageUrl = 'Image URL is required';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 input-field ${
              formErrors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            }`}
          />
          {formErrors.name && (
            <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`mt-1 input-field ${
              formErrors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            }`}
          >
            <option value="">Select Category</option>
            {CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {formErrors.category && (
            <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`mt-1 input-field ${
              formErrors.price ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            }`}
          />
          {formErrors.price && (
            <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>
          )}
        </div>

        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
            Unit (e.g., kg, piece)
          </label>
          <input
            type="text"
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className={`mt-1 input-field ${
              formErrors.unit ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            }`}
          />
          {formErrors.unit && (
            <p className="mt-1 text-sm text-red-600">{formErrors.unit}</p>
          )}
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            className={`mt-1 input-field ${
              formErrors.stock ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            }`}
          />
          {formErrors.stock && (
            <p className="mt-1 text-sm text-red-600">{formErrors.stock}</p>
          )}
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={`mt-1 input-field ${
              formErrors.imageUrl ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
            }`}
          />
          {formErrors.imageUrl && (
            <p className="mt-1 text-sm text-red-600">{formErrors.imageUrl}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={`mt-1 input-field ${
            formErrors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          }`}
        />
        {formErrors.description && (
          <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="nutrition" className="block text-sm font-medium text-gray-700">
          Nutrition Information (Optional)
        </label>
        <textarea
          id="nutrition"
          name="nutrition"
          value={formData.nutrition}
          onChange={handleChange}
          rows="3"
          className="mt-1 input-field"
          placeholder="Enter nutrition facts..."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
