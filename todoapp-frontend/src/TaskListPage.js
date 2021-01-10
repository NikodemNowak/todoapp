import React, {useEffect} from 'react';
import {useParams} from "react-router";
import {getTaskList} from "./ApiRepository";
import {DataGrid} from "@material-ui/data-grid";
import {Container, Grid, makeStyles} from "@material-ui/core";
import Moment from 'moment';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    content: {
        padding: theme.spacing(8, 0, 6),
    },
}));

const TaskListPage = (props) => {
    const classes = useStyles();
    let {id} = useParams();

    const initialTaskList = {
        tasks : []
    }
    const [taskList, setTaskList] = React.useState(initialTaskList);

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width: 130},
        {field: 'description', headerName: 'Description', width: 130},
        {
            field: 'deadline ',  // spacja potrzebna
            headerName: 'Deadline',
            width: 170,
            valueGetter: (params) => Moment(params.getValue('deadline')).format("HH:mm:ss DD-MM-YYYY")
        },
        {field: 'status', headerName: 'Status', width: 130},
    ];

    useEffect(() => {
        async function fetchTaskList() {
            let data = await getTaskList(id)
            setTaskList(data)

            console.log(taskList);
        }

        fetchTaskList()
    }, [])

    return (
        <Container maxWidth="sm" component="main" className={classes.content}>
            <div>
                <Grid container>
                    <Grid item xs>
                        <DataGrid rows={taskList.tasks} columns={columns} pageSize={5} checkboxSelection />
                    </Grid>
                    <Grid item xs>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Add task
                        </Button>
                    </Grid>
                </Grid>
            </div>

        </Container>
    );
}

export default TaskListPage;