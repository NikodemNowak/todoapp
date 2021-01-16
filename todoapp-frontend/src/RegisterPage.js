import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from 'react-hook-form';

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
}));

export default function Register() {
    const classes = useStyles();
    const { control, errors: fieldsErrors } = useForm();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        repeatPassword: '',
        email: ''
    })

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
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
                                        helperText={fieldsErrors.firstName ? fieldsErrors.firstName.message : null}
                                        label="First Name"
                                        onChange={e => setUser({...user, firstName: e.target.value})}
                                        error={fieldsErrors.firstName}
                                    />
                                }
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
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
                                        helperText={fieldsErrors.lastName ? fieldsErrors.lastName.message : null}
                                        onChange={e => setUser({...user, lastName: e.target.value})}
                                        error={fieldsErrors.lastName}
                                    />
                                }
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
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
                                        helperText={fieldsErrors.email ? fieldsErrors.email.message : null}
                                        onChange={e => setUser({...user, email: e.target.value})}
                                        error={fieldsErrors.email}
                                    />
                                }
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
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
                                        helperText={fieldsErrors.username ? fieldsErrors.username.message : null}
                                        onChange={e => setUser({...user, username: e.target.value})}
                                        error={fieldsErrors.username}
                                    />
                                }
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
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
                                        onChange={e => setUser({...user, password: e.target.value})}
                                        error={fieldsErrors.password}
                                    />
                                }
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="password2"
                                as={
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="password2"
                                        label="Repeat password"
                                        type="password"
                                        id="password2"
                                        autoComplete="repeat-current-password"
                                        helperText={fieldsErrors.password2 ? fieldsErrors.password2.message : null}
                                        onChange={e => setUser({...user, repeatPassword: e.target.value})}
                                        error={fieldsErrors.password2}
                                    />
                                }
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(event) => onSubmitButtonClick(event)}
                    >
                        Register
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="http://localhost:3000/login" variant="body2">
                                Already have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );

    function onSubmitButtonClick(event)
    {
        console.log(user)
    }
}