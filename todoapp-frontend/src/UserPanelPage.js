import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import MuiAlert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, Snackbar,
    TextField
} from "@material-ui/core";
import {changeData, deleteUser, resetPassword} from "./ApiRepository";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
}));

const UserPanel = () => {

    const {control, handleSubmit, errors: fieldsErrors} = useForm();
    const [image, setImage] = useState('https://cdn.employear.com/uploads/2018/09/toshi-1072056-unsplash-517x345.jpg')
    const classes = useStyles();
    const [openChangeData, setOpenChangeData] = useState(false);
    const [openPasswords, setOpenPasswords] = useState(false);
    const [openDeleteAccounts, setOpenDeleteAccounts] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [passwordSnackbarOpen, setPasswordSnackbarOpen] = useState(false);

    const handleCloseChangeData = () => {
        setOpenChangeData(false);
    };

    const handleClosePasswords = () => {
        setOpenPasswords(false);
    };

    const handleCloseDeleteAccounts = () => {
        setOpenDeleteAccounts(false);
    };

    const handleSaveChangeData = (data) => {
        setOpenChangeData(false);
        console.log(data)
        changeData(data)
    }

    const handleSavePasswords = (data) => {
        if (data.newPassword === data.newPassword2){
            resetPassword(data)
            setOpenPasswords(false)
        } else {
            setPasswordSnackbarOpen(true)
        }
    }

    function handleDeleteAccount() {
        setOpenDeleteAccounts(false);
        deleteUser()
    }

    const handleOpenChangeData = () => {
        setOpenChangeData(true);
    }

    const handleOpenPasswords = () => {
        setOpenPasswords(true);
    }

    const handleOpenDeleteAccount = () => {
        setOpenDeleteAccounts(true);
    }

    function onSnackbarClose() {
        setSnackbarOpen(false);
    }

    function onPasswordSnackbarClose() {
        setPasswordSnackbarOpen(false);
    }

    React.useEffect(() => {
        setSnackbarOpen(true)
    }, [fieldsErrors])

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Grid item>
                        <Avatar alt="username" className={classes.large} src={image}/>
                    </Grid>
                    <Typography component="h1" variant="h5">
                        Panel
                    </Typography>
                    <form className={classes.form}>
                        <Grid container justify="center">
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={() => handleOpenChangeData()}
                                >
                                    Change your data
                                </Button>
                                <Dialog open={openChangeData} onClose={handleCloseChangeData}>
                                    <DialogTitle id="form-dialog-title">Change your data</DialogTitle>
                                    <DialogContent>
                                        <form className={classes.form} onSubmit={handleSubmit(handleSaveChangeData)}>
                                            <FormControl fullWidth variant="outlined">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Controller
                                                            name="firstName"
                                                            as={
                                                                <TextField
                                                                    autoFocus
                                                                    autoComplete="fname"
                                                                    name="firstName"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    id="firstName"
                                                                    helperText={fieldsErrors.firstName
                                                                        ? fieldsErrors.firstName.message : null}
                                                                    label="First Name"
                                                                    error={fieldsErrors.firstName}
                                                                />
                                                            }
                                                            control={control}
                                                            defaultValue=""
                                                            rules={{
                                                                required: "You must specify first name",
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Controller
                                                            name="lastName"
                                                            as={
                                                                <TextField
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    id="lastName"
                                                                    label="Last Name"
                                                                    name="lastName"
                                                                    autoComplete="lname"
                                                                    helperText={fieldsErrors.lastName
                                                                        ? fieldsErrors.lastName.message : null}
                                                                    error={fieldsErrors.lastName}
                                                                />
                                                            }
                                                            control={control}
                                                            defaultValue=""
                                                            rules={{
                                                                required: "You must specify last name",
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Controller
                                                            name="email"
                                                            as={
                                                                <TextField
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    id="email"
                                                                    label="Email Address"
                                                                    name="email"
                                                                    autoComplete="email"
                                                                    helperText={fieldsErrors.email
                                                                        ? fieldsErrors.email.message : null}
                                                                    error={fieldsErrors.email}
                                                                />
                                                            }
                                                            control={control}
                                                            defaultValue=""
                                                            rules={{
                                                                required: "You must specify email",
                                                                pattern: {
                                                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                                                                    message: "password pattern example@gmail.com"
                                                                }
                                                            }}
                                                        />
                                                    </Grid>
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
                                                                    helperText={fieldsErrors.username
                                                                        ? fieldsErrors.username.message : null}
                                                                    error={fieldsErrors.username}
                                                                />
                                                            }
                                                            control={control}
                                                            defaultValue=""
                                                            rules={{
                                                                required: "You must specify username",
                                                                minLength: {
                                                                    value: 3,
                                                                    message: "min 3 marks"
                                                                }
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Button onClick={handleCloseChangeData} color="primary">
                                                        Cancel
                                                    </Button>
                                                    <Button type="submit" variant="contained"
                                                            color="primary"
                                                            className={classes.submit}>
                                                        Save
                                                    </Button>

                                                </Grid>
                                            </FormControl>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={() => handleOpenPasswords()}
                                >
                                    Reset password
                                </Button>
                                <Dialog open={openPasswords} onClose={handleClosePasswords}>
                                    <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
                                    <DialogContent>
                                        <form className={classes.form} onSubmit={handleSubmit(handleSavePasswords)}>
                                            <FormControl fullWidth variant="outlined">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Controller
                                                            name="oldPassword"
                                                            as={
                                                                <TextField
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    name="oldPassword"
                                                                    label="Password"
                                                                    type="password"
                                                                    id="oldPassword"
                                                                    autoComplete="current-password"
                                                                    helperText={fieldsErrors.oldPassword ? fieldsErrors.oldPassword.message : null}
                                                                    error={fieldsErrors.oldPassword}
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
                                                    <Grid item xs={12} sm={6}>
                                                        <Controller
                                                            name="newPassword"
                                                            as={
                                                                <TextField
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    name="newPassword"
                                                                    label="New Password"
                                                                    type="password"
                                                                    id="newPassword"
                                                                    autoComplete="new-password"
                                                                    helperText={fieldsErrors.newPassword ? fieldsErrors.newPassword.message : null}
                                                                    error={fieldsErrors.newPassword}
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
                                                    <Grid item xs={12} sm={6}>
                                                        <Controller
                                                            name="newPassword2"
                                                            as={
                                                                <TextField
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    name="newPassword2"
                                                                    label="Repeat New Password"
                                                                    type="password"
                                                                    id="newPassword2"
                                                                    autoComplete="new-password"
                                                                    helperText={fieldsErrors.newPassword2 ? fieldsErrors.newPassword2.message : null}
                                                                    error={fieldsErrors.newPassword2}
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
                                                    <br/>

                                                    <Button onClick={handleClosePasswords} color="primary">
                                                        Cancel
                                                    </Button>
                                                    <Button type="submit" variant="contained"
                                                            color="primary"
                                                            className={classes.submit}>
                                                        Save
                                                    </Button>
                                                </Grid>
                                            </FormControl>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={() => handleOpenDeleteAccount()}
                                >
                                    Delete account
                                </Button>
                                <Dialog open={openDeleteAccounts} onClose={handleCloseDeleteAccounts}>
                                    <DialogTitle>Delete Account</DialogTitle>
                                    <DialogActions>
                                        <Button onClick={handleCloseDeleteAccounts} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={handleDeleteAccount} color="secondary">
                                            Delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                        </Grid>
                    </form>
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

            <Snackbar
                open={passwordSnackbarOpen}
                onClose={onPasswordSnackbarClose}
                autoHideDuration={3000}
            >
                <Alert severity="error">
                    <div style={{
                        display: 'flex',
                        flexFlow: 'column',
                        alignItems: 'center'
                    }}>
                        Password don't match
                    </div>
                </Alert>
            </Snackbar>

        </div>
    );
}
export default UserPanel