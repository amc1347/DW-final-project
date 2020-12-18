import React from 'react';

function Header({ loggedIn, LogoutFunction}) {
    return (
        <header className="Header">
            <nav>
                {loggedIn ? (
                <>
                {/* <a href="/user-profile">User Profile</a> */}
                <a href="/new-post">New Post</a>
                <a href="/home">Home</a>

                <a onClick={() => LogoutFunction()} > Logout</a>
                </>
                 ) : (
                <>
                    <a href="/login">Login</a>
                    <a href="/create-account">Create Account</a>
                    <a href="/home">Home</a>
                </>
                 )}
            </nav>
        </header>
    );
}

export default Header;