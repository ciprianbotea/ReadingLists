import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, ButtonGroup, MenuList } from "@material-ui/core"

function Navigation() {
    const navStyleState = useState({ color: "black" });
    const navigate = useNavigate();
    return (
        <Fragment>
            <AppBar style={{ position: "relative" }}>
                <MenuList>
                    <Button
                        style={navStyleState[0]}
                        onClick={function onClick() {
                        navigate("/");
                        }}
                        >HOME</Button>
                </MenuList>
            </AppBar>
            <MenuList>
                <ButtonGroup>
                    <Button
                        style={navStyleState[0]}
                        onClick={function onClick() {
                        navigate("/books");
                        }}
                        >Books</Button>
                    <Button
                        style={navStyleState[0]}
                        onClick={function onClick() {
                        navigate("/authors");
                        }}
                        >Authors</Button>
                    <Button
                        style={navStyleState[0]}
                        onClick={function onClick() {
                        navigate("/publishers");
                        }}
                        >Publishers</Button>
                </ButtonGroup>
            </MenuList> 
        </Fragment>
    );
}

export default Navigation;