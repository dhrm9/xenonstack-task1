import React from 'react';
import { userData } from './dummyUserData'; // Import dummy user data
import Logout from './Logout';

const ProfilePage = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          {/* Profile Picture */}
          <div className="card shadow-sm text-center">
            <img
              src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt={userData.name}
              className="card-img-top rounded-circle mx-auto mt-4"
              style={{ width: '150px', height: '150px' }}
            />
            <div className="card-body">
              <h4 className="card-title">{userData.name}</h4>
              <p className="card-text text-muted">{userData.email}</p>
              <p className="card-text">{userData.location}</p>
              <button className="btn btn-primary btn-block mt-3">Edit Profile</button>
              <button className="btn btn-danger btn-block mt-2"><Logout></Logout></button>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          {/* User Details Section */}
          <div className="card shadow-sm">
            <div className="card-header">
              <h5>User Details</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Name:</strong>
                </div>
                <div className="col-sm-9">{userData.name}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Email:</strong>
                </div>
                <div className="col-sm-9">{userData.email}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Phone:</strong>
                </div>
                <div className="col-sm-9">{userData.phone}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Location:</strong>
                </div>
                <div className="col-sm-9">{userData.location}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Member Since:</strong>
                </div>
                <div className="col-sm-9">January 2021</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
