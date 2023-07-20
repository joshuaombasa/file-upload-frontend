

import React, { useState } from 'react';

const ImageForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    imageFile: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, imageFile: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('image', formData.imageFile);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        // Handle non-successful responses here
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload image.');
      }

      const data = await response.json();
      console.log('Upload successful!', data);
      // Handle success or show a success message to the user.
    } catch (error) {
      console.error('Error uploading the image:', error.message);
      // Handle error or show an error message to the user.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ImageForm;

