import { Fragment, useState } from "react";
import { useNavigate } from "react-router";

function AddAuthor() {

    const navigate = useNavigate();
    const [authorName, setAuthorName] = useState('');
    const [nationality, setNationality] = useState('');

    async function addAuthor() {
        const newAuthor = {
            authorName: authorName,
            nationality: nationality
        }

        try {
            const addNewAuthor = await fetch("http://localhost:8080/api/sequelize/create-author",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newAuthor)
                }).then((response) => {
                    response.json().then((response))

                    if (response.status === 200) {
                        navigate("/authors");
                    }
                })
        } catch (err) {
            console.error(err);
        }
    }

    function cancel() {
        navigate("/authors");
    }

    return (
        <Fragment>
            <div className="forms">
                Add a new author
            </div>
            <div>
                <div>
                    <input type="text" placeholder="Name" onChange={(event) => setAuthorName(event.target.value)}></input>
                </div>
                <div>
                    <input type="text" placeholder="Nationality" onChange={(event) => setNationality(event.target.value)}></input>
                </div>
                <div>
                    <input type="button" value="OK" onClick={addAuthor} />
                    <input type="button" value="Cancel" onClick={cancel} />
                </div>
            </div>
        </Fragment>
    );
}

export default AddAuthor;