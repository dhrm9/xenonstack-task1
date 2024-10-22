import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileImage from '../Images/photo.jpeg';
import './Dashboard.css'; // Optional, for additional custom styles
import { houseData } from './dummyData'; // Assuming this file contains the initial dummy data
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');

  // State for filtering
  const [filter, setFilter] = useState('');
  const [region, setRegion] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState(''); // Changed to string for easier handling with empty input
  const [items, setItems] = useState([...houseData]);

  useEffect(() => {
    const token = localStorage.getItem('auth');
    if (!token) {
      navigate('/');  // Redirect to login page
    }
    setUser(JSON.parse(token).user.name);
  }, [navigate]);

  // Fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/getDummy/data');
        setItems(res.data); // Set the fetched data to items state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">RealEstate</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile">Profile</a>
            </li>
            <Logout />
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        {/* Profile Section */}
        <div className="d-flex align-items-center mb-4">
          <img
            src={ProfileImage}
            alt="Profile"
            className="rounded-circle mr-3"
            style={{ width: '80px', height: '80px' }}
          />
          <div className='m-3'>
            <h4>Welcome, {user}</h4>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section mb-4">
          <h5>Filter Properties</h5>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label>Price Range</label>
              <input
                type="number"
                className="form-control"
                value={minPrice}
                onChange={handleMinPriceChange}
                placeholder="Min Price"
              />
              <input
                type="number"
                className="form-control mt-2"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                placeholder="Max Price"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Region</label>
              <input
                type="text"
                className="form-control"
                value={region}
                onChange={handleRegionChange}
                placeholder="Search by region"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Property Type</label>
              <select className="form-control" value={filter} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="low">Below $300,000</option>
                <option value="mid">Between $300,000 and $600,000</option>
                <option value="high">Above $600,000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Section with Cards */}
        <div className="row">
          {items
            .filter(item => {
              // Price filtering
              const price = parseFloat(item.price.replace(/[^0-9.-]+/g,"")); // Convert price to a number
              const isPriceInRange = (minPrice === '' || price >= parseFloat(minPrice)) &&
                                      (maxPrice === '' || price <= parseFloat(maxPrice));

              // Region filtering
              const isRegionMatch = region ? item.region.toLowerCase().includes(region.toLowerCase()) : true;

              return isPriceInRange && isRegionMatch;
            })
            .map(item => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div className="card h-100 shadow">
                  <img src={item.image} className="card-img-top" alt={item.title} />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text text-primary">{item.price}</p>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-primary btn-block">View Details</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
