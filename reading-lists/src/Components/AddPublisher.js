import { Fragment, useState } from "react";
import { useNavigate } from "react-router";

function AddPublisher() {

    const navigate = useNavigate();
    const [publisherName, setPublisherName] = useState('');
    const [country, setCountry] = useState('');

    async function addPublisher() {
        const newPublisher = {
            PublisherName: publisherName,
            Country: country            
        }

        try {
            const addNewPublisher = await fetch("http://localhost:8080/api/sequelize/create-publisher",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newPublisher)
                }).then((response) => {
                    response.json().then((response))

                    if (response.status === 200) {
                        navigate("/publishers");
                    }
                })
        } catch (err) {
            console.error(err);
        }
    }

    function cancel() {
        navigate("/publishers");
    }

    return (
        <Fragment>
            <div className="forms">
                Add a new publisher
            </div>
            <div>
                <div>
                    <input type="text" placeholder="Name" onChange={(event) => setPublisherName(event.target.value)}></input>   
                </div>
                <div>
                    <input type="text" placeholder="Country" onChange={(event) => setCountry(event.target.value)}></input>
                </div>
                <div>
                    <input type="button" value="OK" onClick={addPublisher} />
                    <input type="button" value="Cancel" onClick={cancel} />
                </div>    
            </div>
        </Fragment>
    );
}

export default AddPublisher;