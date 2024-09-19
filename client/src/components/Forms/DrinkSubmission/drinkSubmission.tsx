import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DrinkSubmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    image: null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Add your Cloudinary integration or other logic here
    console.log(formData);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Submit a New Drink Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Drink Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            className="form-control"
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            className="form-control"
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit Drink
        </button>
      </form>
    </div>
  );
};

export default DrinkSubmissionForm;
