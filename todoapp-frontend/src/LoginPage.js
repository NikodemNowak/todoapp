import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Grid, Link, Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {addUser} from "./ApiRepository";
import {Controller, useForm} from "react-hook-form";

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
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
    const classes = useStyles();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const {control, handleSubmit, errors: fieldsErrors} = useForm();

    const submitLoginForm = (loginData) => {
        console.log(loginData);
    }

    function onSnackbarClose() {
        setSnackbarOpen(false);
    }

    React.useEffect(() => {
        setSnackbarOpen(true)
    }, [fieldsErrors])

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(submitLoginForm)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="username"
                                    as={
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            autoComplete="username"
                                            helperText={fieldsErrors.username ? fieldsErrors.username.message : null}
                                            error={fieldsErrors.username}
                                        />
                                    }
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "You must specify username",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="password"
                                    as={
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            helperText={fieldsErrors.password ? fieldsErrors.password.message : null}
                                            error={fieldsErrors.password}
                                        />
                                    }
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "You must specify a password",
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        }
                                    }}
                                />
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                type="submit"
                            >
                                Login
                            </Button>
                        </Grid>
                    </form>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="http://localhost:3000/register" variant="body2">
                                {"Don't have an account? Register"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Container>

            {JSON.stringify(fieldsErrors).length > 2
                ? <Snackbar
                    open={snackbarOpen}
                    onClose={onSnackbarClose}
                    autoHideDuration={3000}
                >
                    <Alert severity="error">
                        <div style={{
                            display: 'flex',
                            flexFlow: 'column',
                            alignItems: 'center'
                        }}>
                            Correct incorrect fields
                        </div>
                    </Alert>
                </Snackbar>
                : null
            }

        </div>
    );

    function onSubmitButtonClick(event) {
        console.log(user)
    }
}
export default Login