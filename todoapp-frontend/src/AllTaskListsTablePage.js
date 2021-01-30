import React, {useEffect} from 'react';
import {getTaskLists} from "./ApiRepository";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {useHistory} from "react-router";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const {row, onOpenClick} = props;
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">
                    <Button variant="contained" color="secondary" onClick={() => onOpenClick()}>Open</Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const AllTaskListsTablePage = (props) => {
    const [open, setOpen] = React.useState(false);
    const [taskLists, setTaskLists] = React.useState([]);
    const [taskListToOpen, setTaskListToOpen] = React.useState('');
    const history = useHistory();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function fetchTaskLists() {
            let data = await getTaskLists()
            setTaskLists(data)
        }

        fetchTaskLists()
    }, [])

    function onOpenTaskListClick(taskList) {
        history.push("/taskLists/" + taskList.taskListId);
        // setTaskListToOpen(taskList);
        // setOpen(true);

    }

    return (
        <div style={{paddingLeft: 650, paddingTop: 50, height: 400, width: 200}}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align={"right"}>OpenButton</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskLists.map((taskList) => (
                            <Row key={taskList.name} row={taskList} onOpenClick={() => onOpenTaskListClick(taskList)}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Name: {taskListToOpen.name}<br/>Goal: {taskListToOpen.goal}</DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AllTaskListsTablePage
