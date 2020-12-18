import React from 'react';
import UserProfileComponent from "../components/UserProfileComponent";


function UserProfile({ userAuthInfo }) {
    return (
        <div>
            <h1>User Profile</h1>
            <UserProfileComponent userAuthInfo={userAuthInfo} />
            
        </div>
        );
    }
    

export default UserProfile;