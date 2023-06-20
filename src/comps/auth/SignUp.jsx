import { Avatar, Box, Button, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import * as Yup from 'yup'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { purple } from '@mui/material/colors'
import { Link, useNavigate } from 'react-router-dom'
import supabase from "../sb/Sb"

const SignUp = () => {

    const navigate = useNavigate()

    const validateSchema = Yup.object().shape({
        name: Yup.string().max(25,'Too long'),
        lastname: Yup.string().max(35,'Too long').required('Is required'),
        email: Yup.string().email('Enter a valid email').required('Is required'),
        password: Yup.string().min(8,'Too short').required('Is required'),
        passconf: Yup.string().required('Is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    const formik = useFormik({
        initialValues: {
            name: 'Gustavo',
            lastname: 'Falavigna',
            email: 'gfalav@yahoo.com',
            password: 'pppppppp',
            passconf: 'pppppppp'
        },
        validationSchema: validateSchema,
        onSubmit:  async (values) => {
            const { data, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password
            })
            if (data.user) {
                await supabase
                    .from('userdata')
                    .insert([{
                        name: values.name,
                        lastname: values.lastname,
                        email: values.email,
                        userId: data.user.id
                    }])
                navigate('/')
            }
            if (error) {
                alert('Error: '+error)
            }
        }
    })

    return(
        <Box id="SignUpRoot"
            maxWidth={450}
            m={2}
            display='flex'
            flexDirection='column'
            flexWrap='nowrap'
            alignItems='center'
            >
            <Avatar sx={{ mb: 2, bgcolor: purple[500]}}><LockOpenIcon /></Avatar>
            <Typography variant="h4" sx={{ mb: 4}}>Sign Up</Typography>
            <form onSubmit={formik.handleSubmit}>
                <Box display='flex'
                    flexDirection='row'
                    flexWrap='nowrap'
                    alignItems='center'>
                    <TextField  type="text" id="name" name="name" label="First Name"
                                fullWidth required
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                sx={{ mr: 0.5 }}
                    />
                    <TextField  type="text" id="lastname" name="lastname" label="Last Name"
                                fullWidth required
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                helperText={formik.touched.lastname && formik.errors.lastname}
                                sx={{ ml: 0.5 }}
                    />
                </Box>
                <TextField  type="email" id="email" name="email" label="email"
                            fullWidth required
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{ mt: 1.5 }}
                />
                <TextField  type="password" id="password" name="password" label="password"
                            fullWidth required
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            sx={{ mt: 1.5 }}
                />
                <TextField  type="password" id="passconf" name="passconf" label="conf password"
                            fullWidth required
                            value={formik.values.passconf}
                            onChange={formik.handleChange}
                            error={formik.touched.passconf && Boolean(formik.errors.passconf)}
                            helperText={formik.touched.passconf && formik.errors.passconf}
                            sx={{ mt: 1.5 }}
                />
                <Button type="submit" variant="contained" sx={{ mt: 2}}>Send</Button>
            </form>
            <Box m={2}
                display='flex'
                flexDirection='row'
                flexWrap='nowrap'
                alignItems='center'>
                <Button component={Link} to='/auth/signin' variant="outlined" sx={{ mr: 1}}>Already have an account? Sign In</Button>
            </Box>
            
        </Box>
    )
}

export default SignUp