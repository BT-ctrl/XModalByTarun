import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });

  const modalRef = useRef();

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ username: '', email: '', phone: '', dob: '' });
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = formData;

    if (
      !username.trim() &&
      !email.trim() &&
      !phone.trim() &&
      !dob.trim()
    ) {
      alert('Please fill out the Username field.');
      return;
    }

    if (email && !email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    if (dob) {
      const today = new Date().toISOString().split('T')[0];
      if (dob > today) {
        alert('Invalid date of birth. Date of birth cannot be in the future.');
        return;
      }
    }

    if (!username.trim()) {
      alert('Please fill out the Username field.');
      return;
    }

    closeModal();
  };

  return (
    <div className="app-container" id="root">
      <h1 className="app-heading">User Details Modal</h1>
      {!isModalOpen && (
        <button onClick={openModal}>Open Form</button>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
