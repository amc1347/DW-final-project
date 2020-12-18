import React from 'react';

function NewPostForm({ NewPostFunction }) {
    return (
        <div>
            <form className="NewPostForm" onSubmit={e => NewPostFunction(e) }>
                <label htmlFor="createName">Author</label>
                <input type="author" name="createAuthor"/>
                <label htmlFor="createTitle">Title</label>
                <input type="title" name="createTitle" />
                <label htmlFor="createPoem">Poem</label>
                <input type="text" name="createText" />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default NewPostForm;