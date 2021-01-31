import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ListIcon from '@material-ui/icons/List';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import {getUsername} from "./ApiRepository";
import Typography from "@material-ui/core/Typography";

const open = (url) => {
    const newWindow = window.open(url, "_self")
    if (newWindow) newWindow.opener = null
}

const style = {
    margin: 15,
};

function Home() {
    return (
        <div>
            {localStorage.length > 0 ?
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={() => open('http://localhost:3000/')}>
                    <HomeIcon/>
                </Button> : <div/>}
        </div>
    );
}

function ChangeTheme() {
    const [dark, setDark] = React.useState(false);
    const [icon, setIcon] = React.useState(<Brightness5Icon/>);

    const handleClick = (event) => {
        if (dark) {
            setDark(false)
            setIcon(<Brightness5Icon/>)
        } else {
            setDark(true)
            setIcon(<Brightness3Icon/>)
        }
    };

    return (
        <div>
            {localStorage.length > 0 ?
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    {icon}
                </Button> : <div/>}
        </div>
    )
}

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <PersonIcon/>
            </Button>

            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={style}
            >
                {localStorage.length === 0 ?
                    <MenuItem onClick={() => open('http://localhost:3000/login')}>Login</MenuItem> :
                    <MenuItem onClick={() => open('http://localhost:3000/panel')}>Panel</MenuItem>}
                {localStorage.length === 0 ?
                    <MenuItem onClick={() => open('http://localhost:3000/register')}>Register</MenuItem> :
                    <MenuItem onClick={() => {
                        localStorage.clear()
                        window.location.reload(false);
                        open('http://localhost:3000/login')
                    }}>Log out</MenuItem>}
            </Menu>
        </div>
    );
}

function TaskListMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {localStorage.length > 0 ?
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <ListIcon/>
                </Button> : <div/>}

            <Menu
                id="task-list-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={style}
            >
                <MenuItem onClick={() => open('http://localhost:3000/addTaskList')}>Add</MenuItem>
                <MenuItem onClick={() => open('http://localhost:3000/taskLists')}>Table</MenuItem>
            </Menu>
        </div>
    );
}

function Welcome() {
    const [username, setUsername] = useState('');
    {localStorage.length > 0 ?
    useEffect(() => {
        async function fetchUsername() {
            let data = await getUsername()
            setUsername(data)
        }

        fetchUsername()
    }, []) : <div/>}

    return (
        <div>
            {localStorage.length > 0 ?
                <Typography variant="h6" component="h2">
                    Welcome {username}
                </Typography> : <div/>}
        </div>
    )
}

export {Home, UserMenu, TaskListMenu, ChangeTheme, Welcome}