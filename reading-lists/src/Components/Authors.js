import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Button, ButtonBase, CircularProgress, FormGroup, IconButton } from "@material-ui/core"
import AddCircle from "@material-ui/icons/AddCircle";

function Authors() {
    const navigate = useNavigate();
    const [authorsData, setAuthorsData] = useState({
        data: {},
        loading: false,
        loaded: false,
    });

    async function fetchAuthors() {
        setAuthorsData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch("http://localhost:8080/api/sequelize/get-authors/");
            const data = await response.json();
            setAuthorsData({ data: data, loading: false, loaded: true });
            console.log(data);
        } catch (err) {
            setAuthorsData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });

            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!authorsData.loaded) {
            fetchAuthors();
        }
    }, [authorsData.loaded]);

    return (
        <Fragment>
            <div className="items">
                Authors </div>
                <Button
                startIcon={<AddCircle></AddCircle>}
                color="secondary"
                onClick={function onClick() {
                    navigate("/authors/newAuthor");
                }}>
            </Button>
            {authorsData.loading && <CircularProgress />}
            {authorsData.loaded && authorsData.data.map(function
                renderAuthors(author) {
                return (
                    <h4 key={author.authorId}>
                        <FormGroup>
                        {author.authorName}
                        <ButtonBase
                            color="secondary"
                            onClick={function onClick() {
                            navigate(`/authors/${author.authorId}`);
                        }}>
                        Details </ButtonBase>
                        </FormGroup>
                    </h4>
                );
            })}
        </Fragment>
    );
}

export default Authors;