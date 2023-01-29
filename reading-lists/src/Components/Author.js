import { Fragment, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Button} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBack from "@material-ui/icons/ArrowBack";

function Author() {
    const author = useParams();
    const location = useLocation();
    const navigate = useNavigate();

const [authorData, setAuthorData] = useState({
    data: '',
    loading: false,
    loaded: false
})

const [authorId, setAuthorId] = useState(0);
const [authorName, setAuthorName] = useState('');
const [nationality, setNationality] = useState('');

async function fetchAuthor() {
    setAuthorData(function setState(prevState) {
        return { ...prevState, loading: true };
    });

    try {
        const response = await fetch(`http://localhost:8080/api/sequelize/get-author-by-id/${author.authorId}`);

        const data = await response.json();

        setAuthorData({ data: data, loading: false, loaded: true });
        console.log(data);

    } catch (err) {
        setAuthorData(function setState(prevState) {
            return { ...prevState, loading: false, loaded: false };
        });

        console.error(err);
    }
}

useEffect(function insideEffect() {
    if (!authorData.loaded) {
        fetchAuthor();
    }
}, [authorData.loaded]);

async function deleteAuthor() {
    await fetch(`http://localhost:8080/api/sequelize/delete-author/${author.authorId}`, {

        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => {
        response.json().then((res) => {
            navigate("/authors");
        })
    })
}

function setNewAuthor(authorData) {
    setAuthorId(authorData.data.AuthorId);
    setAuthorName(authorData.data.AuthorName);
    setNationality(authorData.data.Nationality);
}

async function updateAuthor() {
    const updateAuthor = {
        authorName: authorName,
        nationality: nationality,
    }

    try {
        const addNewAuthor = await fetch(`http://localhost:8080/api/sequelize/update-author/${author.authorId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateAuthor)
            }).then((response) => {
                response.json().then((res) => {
                    setAuthorId(-1);
                    setAuthorName('');
                    setNationality('');
                    navigate('/authors');
                });
            })
    } catch (err) {
        console.error(err);
    }
}

return (<Fragment>
    <h3 src={location?.state} alt={""}>
    </h3>
    {authorData.loading && <CircularProgress />}
    {authorData.loaded &&
        <div className="forms">
            <h4>
                {`ID: ${authorData.data.authorId}`}
            </h4>
            <div>
                {`Name`}
            </div>
            <div>
                <input type="text" defaultValue={authorData.data.authorName}
                    onChange={(ev) => setAuthorName(ev.target.value)}></input>
            </div>
            <div>
                {`Nationality`}
            </div>
            <div>
                <input type="text" defaultValue={authorData.data.nationality}
                    onChange={(ev) => setNationality(ev.target.value)}></input>
            </div>
        </div>
    }

    <Button color="primary"
        startIcon={<DeleteIcon></DeleteIcon>}
        onClick={function onClick() {
            deleteAuthor();
        }}>
        </Button>
    <Button color="primary"
        startIcon={<EditIcon></EditIcon>}
        onClick={function onClick() {
            updateAuthor();
        }}>
        </Button>
        <Button color="primary"
        startIcon={<ArrowBack></ArrowBack>}
        onClick={function onClick() {
            navigate("/authors");
        }}>
        </Button>
</Fragment>
);

}

export default Author;