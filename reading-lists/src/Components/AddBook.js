import { Fragment, useState } from "react";
import { useNavigate } from "react-router";

function AddBook() {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');

    async function addBook() {
        const newBook = {
            Title: title,
            AuthorName: authorName

        }

        try {
            const addNewBook = await fetch("http://localhost:8080/api/sequelize/create-book",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newBook)
                }).then((response) => {
                    response.json().then((response))

                    if (response.status === 200) {
                        navigate("/books");
                    }
                })
        } catch (err) {
            console.error(err);
        }
    }

    function cancel() {
        navigate("/books");
    }

    return (
        <Fragment>
            <div className="forms">
                Add a new book
            </div>
            <div>
                <div>
                    <input type="text" placeholder="Title" onChange={(event) => setTitle(event.target.value)}></input> 
                </div>
                <div>
                    <input type="text" placeholder="Author" onChange={(event) => setAuthorName(event.target.value)}></input>
                </div>
                <div>
                    <input type="button" value="OK" onClick={addBook} />
                    <input type="button" value="Cancel" onClick={cancel} />
                </div>
            </div>
        </Fragment>
    );
}

export default AddBook;