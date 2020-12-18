import React from 'react';
import NewPostForm from '../components/NewPostForm';

function NewPost({ NewPostFunction }) {
    return (
        <div> 
            <h1>New Post</h1>
            <NewPostForm NewPostFunction={NewPostFunction} />

        </div>
    );
}

export default NewPost;