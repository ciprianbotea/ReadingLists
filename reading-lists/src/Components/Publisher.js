import { Fragment, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Button} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit";
import ArrowBack from "@material-ui/icons/ArrowBack";

function Publisher() {
    const publisher = useParams();
    const location = useLocation();
    const navigate = useNavigate();

const [publisherData, setPublisherData] = useState({
    data: '',
    loading: false,
    loaded: false
})

const [publisherId, setPublisherId] = useState('');
const [publisherName, setPublisherName] = useState('');
const [country, setCountry] = useState('');

async function fetchPublisher() {
    setPublisherData(function setState(prevState) {
        return { ...prevState, loading: true };
    });

    try {
        const response = await fetch(`http://localhost:8080/api/sequelize/get-publisher-by-id/${publisher.publisherId}`);

        const data = await response.json();

        setPublisherData({ data: data, loading: false, loaded: true });
        console.log(data);

    } catch (err) {
        setPublisherData(function setState(prevState) {
            return { ...prevState, loading: false, loaded: false };
        });

        console.error(err);
    }
}

useEffect(function insideEffect() {
    if (!publisherData.loaded) {
        fetchPublisher();
    }
}, [publisherData.loaded]);

async function deletePublisher() {
    await fetch(`http://localhost:8080/api/sequelize/delete-publisher/${publisher.publisherId}`, {

        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => {
        response.json().then((res) => {
            navigate("/publishers");
        })
    })
}

function setNewPublisher(publisherData) {
    setPublisherId(publisherData.data.PublisherId);
    setPublisherName(publisherData.data.PublisherName);
    setCountry(publisherData.data.Country);
   
}

async function updatePublisher() {
    const updatePublisher = {
        publisherName: publisherName,
        country: country,
    }

    try {
        const addNewPublisher = await fetch(`http://localhost:8080/api/sequelize/update-publisher/${publisher.publisherId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatePublisher)
            }).then((response) => {
                response.json().then((res) => {
                    setPublisherId(-1);
                    setPublisherName('');
                    setCountry('');
                    navigate('/publishers');
                });
            })
    } catch (err) {
        console.error(err);
    }
}

return (<Fragment>
    <h3 src={location?.state} alt={""}>
    </h3>
    {publisherData.loading && <CircularProgress />}
    {publisherData.loaded &&
        <div className="forms">
        <h4>
            {`ID: ${publisherData.data.publisherId}`}
        </h4>
        <div>   
            {`Name`}
        </div>
        <div>
            <input type="text" defaultValue={publisherData.data.publisherName}
                onChange={(ev) => setPublisherName(ev.target.value)}></input>
        </div>
        <div>
            {`Country`}
        </div>
        <div>    
            <input type="text" defaultValue={publisherData.data.country}
                onChange={(ev) => setCountry(ev.target.value)}></input>   
        </div>
    </div>
}

<Button color="primary"
        startIcon={<DeleteIcon></DeleteIcon>}
        onClick={function onClick() {
            deletePublisher();
        }}>
        </Button>
    <Button color="primary"
        startIcon={<EditIcon></EditIcon>}
        onClick={function onClick() {
            updatePublisher();
        }}>
        </Button>
        <Button color="primary"
        startIcon={<ArrowBack></ArrowBack>}
        onClick={function onClick() {
            navigate("/publishers");
        }}>
        </Button>
</Fragment>
);

}

export default Publisher;