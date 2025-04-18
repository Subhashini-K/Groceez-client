import { useState } from 'react';
import { StarIcon } from '@heroicons/react/outline';

const ReviewForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!formData.comment.trim()) {
      errors.comment = 'Review comment is required';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
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
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Rating Stars */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
              className="focus:outline-none"
            >
              <StarIcon
                className={`h-6 w-6 ${
                  star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Review Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Review Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Summarize your experience"
          className={`mt-1 input-field ${
            formErrors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          }`}
        />
        {formErrors.title && (
          <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
        )}
      </div>

      {/* Review Comment */}
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Your Review
        </label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows="4"
          placeholder="Share your thoughts about the product"
          className={`mt-1 input-field ${
            formErrors.comment ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
          }`}
        />
        {formErrors.comment && (
          <p className="mt-1 text-sm text-red-600">{formErrors.comment}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
