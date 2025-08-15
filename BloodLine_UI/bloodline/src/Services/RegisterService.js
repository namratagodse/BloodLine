// src/Services/RegisterService.js
const API_URL = process.env.REACT_APP_API_URL || 'https://bloodlinecdac-aya6f2gja8emghg2.canadacentral-01.azurewebsites.net';

export const registerUser = async (formData) => {
  const payload = {
    action: "INSERT",
    fullName: formData.fullName,
    email: formData.email,
    passwordHash: formData.password,
    phoneNumber: formData.phone,
    gender: formData.gender,
    dateOfBirth: formData.dob,
    bloodGroup: formData.bloodGroup,
    address: formData.address,
    city: formData.city,
    district: formData.district,
    state: formData.state,
    pincode: formData.pincode,
    role: formData.role,
    isActive: true,
    aadhaarNumber: formData.aadhaarNumber
  };

  try {
    const response = await fetch(`${API_URL}/api/User/Register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
