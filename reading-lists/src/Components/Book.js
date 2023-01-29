import { Fragment, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Button} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit";
import ArrowBack from "@material-ui/icons/ArrowBack";

function Book() {
    const book = useParams();
    const location = useLocation();
    const navigate = useNavigate();

const [bookData, setBookData] = useState({
    data: '',
    loading: false,
    loaded: false
})

const [bookId, setBookId] = useState('');
const [title, setTitle] = useState('');
const [authorName, setAuthorName] = useState('');
const [publisherName, setPublisherName] = useState('');
const [publicationYear, setPublicationYear] = useState('');

async function fetchBook() {
    setBookData(function setState(prevState) {
        return { ...prevState, loading: true };
    });

    try {
        const response = await fetch(`http://localhost:8080/api/sequelize/get-book-by-id/${book.bookId}`);

        const data = await response.json();

        setBookData({ data: data, loading: false, loaded: true });
        console.log(data);

    } catch (err) {
        setBookData(function setState(prevState) {
            return { ...prevState, loading: false, loaded: false };
        });

        console.error(err);
    }
}

useEffect(function insideEffect() {
    if (!bookData.loaded) {
        fetchBook();
    }
}, [bookData.loaded]);

async function deleteBook() {
    await fetch(`http://localhost:8080/api/sequelize/delete-book/${book.bookId}`, {

        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => {
        response.json().then((res) => {
            navigate("/books");
        })
    })
}

function setNewBook(bookData) {
    setBookId(bookData.data.BookId);
    setTitle(bookData.data.Title);
    setAuthorName(bookData.data.AuthorName);
    setPublisherName(bookData.data.PublisherName);
    setPublicationYear(bookData.data.PublicationYear);
}

async function updateBook() {
    const updateBook = {
        bookId: bookId,
        title: title,
        authorName: authorName,
        publisherName: publisherName,
        publicationYear: publicationYear,
    }

    try {
        const addNewBook = await fetch(`http://localhost:8080/api/sequelize/update-book/${book.bookId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateBook)
            }).then((response) => {
                response.json().then((res) => {
                    setBookId(-1);
                    setTitle('');
                    setAuthorName('');
                    setPublisherName('');
                    setPublicationYear('');
                    navigate('/books');
                });
            })
    } catch (err) {
        console.error(err);
    }
}

return (<Fragment>
    <h3 src={location?.state} alt={""}>
    </h3>
    {bookData.loading && <CircularProgress />}
    {bookData.loaded &&
        <div className="forms">
            <h4>
                {`ID: ${bookData.data.bookId}`}
            </h4>
            <div>
                {`Title`}
            </div>
            <div>
                <input type="text" defaultValue={bookData.data.title}
                    onChange={(ev) => setTitle(ev.target.value)}></input>
            </div>
            <div>
                {`Author`}
                </div>
            <div>
                <input type="text" defaultValue={bookData.data.authorName}
                    onChange={(ev) => setAuthorName(ev.target.value)}></input>
            </div>
            <div>
                {`Publisher`}            
            </div>
            <div>
                <input type="text" defaultValue={bookData.data.publisherName}
                    onChange={(ev) => setPublisherName(ev.target.value)}></input>
            </div>
            <div>
                {`Year`}
            </div>
            <div>
                <input type="number" defaultValue={bookData.data.publicationYear}
                    onChange={(ev) => setPublicationYear(ev.target.value)}></input>
            </div>    
        </div>
    }

<Button color="primary"
        startIcon={<DeleteIcon></DeleteIcon>}
        onClick={function onClick() {
            deleteBook();
        }}>
        </Button>
    <Button color="primary"
        startIcon={<EditIcon></EditIcon>}
        onClick={function onClick() {
            updateBook();
        }}>
        </Button>
        <Button color="primary"
        startIcon={<ArrowBack></ArrowBack>}
        onClick={function onClick() {
            navigate('/books');
        }}>
        </Button>
</Fragment>
);

}

export default Book;