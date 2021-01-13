import React, {useEffect} from 'react';
import {useParams} from "react-router";
import {addTask, getStatuses, getTaskList, updateTask, updateTaskList} from "./ApiRepository";
import {DataGrid} from "@material-ui/data-grid";
import {
    Container,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid, InputLabel,
    makeStyles, MenuItem, Select,
    TextField
} from "@material-ui/core";
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
        tasks: []
    }
    const [taskList, setTaskList] = React.useState(initialTaskList);
    const [tasks, setTasks] = React.useState([]);
    const [task, setTask] = React.useState({
        taskListId: id
    });
    const [statuses, setStatuses] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);

    const [name, setName] = React.useState('Add task');

    const handleClose = () => {
        setOpen(false);
        setEdit(false);
        setName('Add task')
    };

    const handleEdit = () => {
        setEdit(true);
        setName('Edit task')
    };

    async function handleSave() {
        if (edit === false) {
            addTask(task);
            //taskList.tasks += task
            // updateTaskList(taskList, id);
        } else {
            updateTask(task)
        }
        setOpen(false);
        setEdit(false);
        setName('Add task');
        await fetchTaskList()
    }

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

    async function fetchTaskList() {
        let data = await getTaskList(id)
        setTaskList(data)
        setTasks(data.tasks);

        console.log(taskList);
    }

    async function fetchStatuses() {
        let data = await getStatuses()
        setStatuses(data)

        console.log(statuses);
    }

    useEffect(() => {
        fetchTaskList()
        fetchStatuses()
    }, [])

    function onAddTaskButtonClick() {
        setOpen(true);
    }

    return (
        <Container maxWidth="lg" component="main" className={classes.content}>
            <div>
                <Grid container>
                    <Grid item xl style={{height: 500, width: 650}}>
                        <DataGrid rows={tasks} columns={columns} rowsPerPageOptions={[]}/>
                    </Grid>
                    <Grid item xs>
                        <Button
                            style={{marginTop: 200, marginLeft: 100}}
                            variant="contained"
                            color="primary"
                            onClick={() => onAddTaskButtonClick()}
                        >
                            Add/Edit task
                        </Button>
                    </Grid>
                </Grid>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{name}</DialogTitle>
                    <DialogContent>
                        {edit ?
                            <FormControl>
                                <InputLabel id="select-id-label">Id</InputLabel>
                                <Select style={{minWidth: 70}}
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={task.id}
                                        onChange={(event, newValue) => setTask({
                                            ...task,
                                            id: event.target.value
                                        })}>

                                    {renderOptions1()}

                                </Select>
                            </FormControl> : <div/>}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            onChange={e => setTask({...task, name: e.target.value})}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            label="Description"
                            onChange={e => setTask({...task, description: e.target.value})}
                            fullWidth
                        />
                        <form noValidate>
                            <TextField
                                id="datetime-local"
                                label="Deadline"
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}

                                onChange={e => setTask({...task, deadline: e.target.value})}
                            />
                        </form>
                        <FormControl>
                            <InputLabel id="select-id-label">Status</InputLabel>
                            <Select style={{minWidth: 70}}
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={task.status}
                                    onChange={(event, newValue) => setTask({
                                        ...task,
                                        status: event.target.value
                                    })}>

                                {renderOptions()}

                            </Select>
                        </FormControl>
                        <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEdit} color="primary">
                            Edit
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </Container>
    );

    function renderOptions() {
        return statuses.map((dt, i) => {
            return (
                <MenuItem
                    label="Select status"
                    value={dt.name}
                    key={i} name={dt.name}>{dt.name}
                </MenuItem>
            );
        });
    }

    function renderOptions1() {
        return taskList.tasks.map((dt, i) => {
            return (
                <MenuItem
                    label="Select id"
                    value={dt.id}
                    key={i} name={dt.id}>{dt.id}
                </MenuItem>
            );
        });
    }
}

export default TaskListPage;