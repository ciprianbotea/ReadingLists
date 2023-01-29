import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Button, ButtonBase, CircularProgress, FormGroup } from "@material-ui/core"
import AddCircle from "@material-ui/icons/AddCircle";

function Publishers() {
    const navigate = useNavigate();
    const [publishersData, setPublishersData] = useState({
        data: {},
        loading: false,
        loaded: false,
    });

    async function fetchPublishers() {
        setPublishersData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch("http://localhost:8080/api/sequelize/get-publishers/");
            const data = await response.json();
            setPublishersData({ data: data, loading: false, loaded: true });
            console.log(data);
        } catch (err) {
            setPublishersData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });

            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!publishersData.loaded) {
            fetchPublishers();
        }
    }, [publishersData.loaded]);

    return (
        <Fragment>
            <div className="items">
                Publishers</div>
                <Button
                startIcon={<AddCircle></AddCircle>}
                color="secondary"
                onClick={function onClick() {
                    navigate("/publishers/newPublisher");
                }}>
            </Button>
            {publishersData.loading && <CircularProgress />}
            {publishersData.loaded && publishersData.data.map(function
                renderPublishers(publisher) {
                    return (
                        <h4 key={publisher.publisherId}>
                        <FormGroup>
                        {publisher.publisherName}
                        <ButtonBase
                            color="secondary"
                            onClick={function onClick() {
                            navigate(`/publishers/${publisher.publisherId}`);
                        }}>
                        Details </ButtonBase>
                        </FormGroup>
                    </h4>
                    );
                })}
        </Fragment>
    );
}

export default Publishers;