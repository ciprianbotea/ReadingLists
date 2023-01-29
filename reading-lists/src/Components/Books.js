import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Button, ButtonBase, CircularProgress, FormGroup } from "@material-ui/core"
import AddCircle from "@material-ui/icons/AddCircle";

function Books() {
    const navigate = useNavigate();
    const [booksData, setBooksData] = useState({
        data: {},
        loading: false,
        loaded: false,
    });

    async function fetchBooks() {
        setBooksData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch("http://localhost:8080/api/sequelize/get-books/");
            const data = await response.json();
            setBooksData({ data: data, loading: false, loaded: true });
            console.log(data);
        } catch (err) {
            setBooksData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });

            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!booksData.loaded) {
            fetchBooks();
        }
    }, [booksData.loaded]);

    return (
        <Fragment>
            <div className="items">
                Books</div>
                <Button
                startIcon={<AddCircle></AddCircle>}
                color="secondary"
                onClick={function onClick() {
                    navigate("/books/newBook");
                }}>
            </Button>
            {booksData.loading && <CircularProgress />}
            {booksData.loaded && booksData.data.map(function
                renderBooks(book) {
                return (
                    <h4 key={book.bookId}>
                    <FormGroup>
                    {book.title}
                    <ButtonBase
                        color="secondary"
                        onClick={function onClick() {
                        navigate(`/books/${book.bookId}`);
                    }}>
                    Details </ButtonBase>
                    </FormGroup>
                </h4>
                );
            })}
        </Fragment>
    );
}

export default Books;