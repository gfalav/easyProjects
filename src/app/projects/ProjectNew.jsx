import { Avatar, Box, Button, TextField, Typography } from "@mui/material"
import { purple } from '@mui/material/colors'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import {format} from 'date-fns'
import React from "react"
import { useRecoilValue } from "recoil"
import { user } from "../../comps/recoil/recoil"
import supabase from "../../comps/sb/Sb"

const ProjectNew = () => {
    const navigate = useNavigate()
    const usr = useRecoilValue(user)

    const validateSchema = Yup.object().shape({
        id: Yup.string(),
        name: Yup.string().max(50,'Too long').required('Is Required'),
        description: Yup.string().max(100,'Too long').required('Is Required'),
        comitente: Yup.string().max(50,'Too long').required('Is Required'),
        proymanager: Yup.string().max(40,'Too long').required('Is Required'),
        contratista: Yup.string().max(40,'Too long').required('Is Required'),
        expediente: Yup.string().max(25,'Too long').required('Is Required'),
        ubicacion: Yup.string().max(40,'Too long').required('Is Required'),
        fproyecto: Yup.date(),
        userId: Yup.string().required()
    })

    React.useEffect( ()=>{
        ProjectBlank(usr)
    },[usr])

    const formik = useFormik({
        initialValues: ProjectBlank(usr),
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            const result = await supabase
                .from('projects')
                .insert([values])
                .select()
            console.log(result.data[0].id)
            navigate('/project/' + result.data[0].id)
        }
    })

    return(
        <Box maxWidth={850}
            mt={2}
            display='flex'
            flexDirection='column'
            flexWrap='nowrap'
            alignItems='center'>
            <Avatar sx={{ mb: 2, bgcolor: purple[500]}}><CreateNewFolderIcon /></Avatar>
            <Typography variant="h4" sx={{ mb: 2}}>Nuevo Proyecto</Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField  type="text" id="name" name="name" label="Nombre del Proyecto"
                    fullWidth required
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                    helperText={formik.touched.nombre && formik.errors.nombre}
                    sx={{ mt: 1.5 }}
                />
                <TextField  type="text" id="description" name="description" label="Descripción"
                    fullWidth required
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    sx={{ mt: 1.5 }}
                />
                <TextField  type="text" id="comitente" name="comitente" label="Comitente"
                        fullWidth required
                        value={formik.values.comitente}
                        onChange={formik.handleChange}
                        error={formik.touched.comitente && Boolean(formik.errors.comitente)}
                        helperText={formik.touched.comitente && formik.errors.comitente}
                        sx={{ mt: 1.5 }}
                    />
                <Box display='flex'
                    flexDirection='row'
                    flexWrap='nowrap'
                    alignItems='center'>
                    <TextField  type="text" id="proymanager" name="proymanager" label="Proyect Manager"
                        fullWidth required
                        value={formik.values.proymanager}
                        onChange={formik.handleChange}
                        error={formik.touched.proymanager && Boolean(formik.errors.proymanager)}
                        helperText={formik.touched.proymanager && formik.errors.proymanager}
                        sx={{ mt: 1.5 }}
                    />
                    <TextField  type="text" id="contratista" name="contratista" label="Contratista"
                        fullWidth required
                        value={formik.values.contratista}
                        onChange={formik.handleChange}
                        error={formik.touched.contratista && Boolean(formik.errors.contratista)}
                        helperText={formik.touched.contratista && formik.errors.contratista}
                        sx={{ mt: 1.5 }}
                    />
                    <TextField  type="text" id="expediente" name="expediente" label="Expediente"
                        fullWidth required
                        value={formik.values.expediente}
                        onChange={formik.handleChange}
                        error={formik.touched.expediente && Boolean(formik.errors.expediente)}
                        helperText={formik.touched.expediente && formik.errors.expediente}
                        sx={{ mt: 1.5 }}
                    />
                </Box>
                <TextField  type="text" id="ubicacion" name="ubicacion" label="Ubicación"
                    fullWidth required
                    value={formik.values.ubicacion}
                    onChange={formik.handleChange}
                    error={formik.touched.ubicacion && Boolean(formik.errors.ubicacion)}
                    helperText={formik.touched.ubicacion && formik.errors.ubicacion}
                    sx={{ mt: 1.5 }}
                />
                <TextField  type="date" id="fproyecto" name="fproyecto" label="Fecha"
                    fullWidth required
                    value={formik.values.fproyecto}
                    onChange={formik.handleChange}
                    error={formik.touched.fproyecto && Boolean(formik.errors.fproyecto)}
                    helperText={formik.touched.fproyecto && formik.errors.fproyecto}
                    sx={{ mt: 1.5 }}
                />
                <Box sx={{ mt: 2}}>
                    <Button type="submit" variant="contained" sx={{ mr: 1 }}>Send</Button>
                    <Button component={Link} to='/projectlist' variant="contained" color="back" sx={{color: 'white'}}>Back</Button>
                </Box>
            </form>
        </Box>
    )
}

function ProjectBlank(user) {

    return {
        name: '',
        description: '',
        comitente: '',
        proymanager: '',
        contratista: '',
        expediente: '',
        ubicacion: '',
        fproyecto: format(Date.now(),'yyyy-MM-dd'),
        userId: user
    }
}


export {ProjectNew, ProjectBlank}