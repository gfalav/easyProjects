import { Avatar, Box, Button, TextField, Typography } from "@mui/material"
import { purple } from '@mui/material/colors'
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder'
import { useFormik } from "formik"
import { Link, useParams } from "react-router-dom"
import * as Yup from 'yup'
import React from "react"
import { ProjectBlank } from "./ProjectNew"
import supabase from "../../comps/sb/Sb"


const ProjectShow = () => {
    const projectId = useParams().projectId
    const [project, setProject] = React.useState(ProjectBlank())
    const [show, setShow] = React.useState(true)
  
    React.useEffect( () => {
        getProyect(projectId).then( (value)=>setProject(value))
    },[])

    const validateSchema = Yup.object().shape({
        //id: Yup.string(),
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

    const formik = useFormik({
        initialValues: project,
        enableReinitialize: true,
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            const result = await supabase
                .from('projects')
                .update([values])
                .eq('id', projectId)
            if (result.error){
                alert('Error updating project: ' + result.error )
            }
            setShow(true)
        }
    })

    const handleShow = () => {
        setShow(true) 
        getProyect(projectId).then( (value)=>setProject(value))
    }

    return(

        <Box maxWidth={850}
            mt={2}
            display='flex'
            flexDirection='column'
            flexWrap='nowrap'
            alignItems='center'>
            <Avatar sx={{ mb: 2, bgcolor: purple[500]}}><SnippetFolderIcon /></Avatar>
            <Typography variant="h4" sx={{ mb: 2}}>Información del Proyecto</Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField  type="text" id="name" name="name" label="Nombre del Proyecto"
                    fullWidth required
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    inputProps={{ readOnly: show}}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    sx={{ mt: 1.5 }}
                />
                <TextField  type="text" id="description" name="description" label="Descripción"
                    fullWidth required
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    inputProps={{ readOnly: show}}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    sx={{ mt: 1.5 }}
                />
                <TextField  type="text" id="comitente" name="comitente" label="Comitente"
                        fullWidth required
                        value={formik.values.comitente}
                        onChange={formik.handleChange}
                        inputProps={{ readOnly: show}}
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
                        inputProps={{ readOnly: show}}
                        error={formik.touched.proymanager && Boolean(formik.errors.proymanager)}
                        helperText={formik.touched.proymanager && formik.errors.proymanager}
                        sx={{ mt: 1.5 }}
                    />
                    <TextField  type="text" id="contratista" name="contratista" label="Contratista"
                        fullWidth required
                        value={formik.values.contratista}
                        onChange={formik.handleChange}
                        inputProps={{ readOnly: show}}
                        error={formik.touched.contratista && Boolean(formik.errors.contratista)}
                        helperText={formik.touched.contratista && formik.errors.contratista}
                        sx={{ mt: 1.5 }}
                    />
                    <TextField  type="text" id="expediente" name="expediente" label="Expediente"
                        fullWidth required
                        value={formik.values.expediente}
                        onChange={formik.handleChange}
                        inputProps={{ readOnly: show}}
                        error={formik.touched.expediente && Boolean(formik.errors.expediente)}
                        helperText={formik.touched.expediente && formik.errors.expediente}
                        sx={{ mt: 1.5 }}
                    />
                </Box>
                <TextField  type="text" id="ubicacion" name="ubicacion" label="Ubicación"
                    fullWidth required
                    value={formik.values.ubicacion}
                    onChange={formik.handleChange}
                    inputProps={{ readOnly: show}}
                    error={formik.touched.ubicacion && Boolean(formik.errors.ubicacion)}
                    helperText={formik.touched.ubicacion && formik.errors.ubicacion}
                    sx={{ mt: 1.5 }}
                />
                <TextField  type="date" id="fproyecto" name="fproyecto" label="Fecha"
                    fullWidth required
                    value={formik.values.fproyecto}
                    onChange={formik.handleChange}
                    inputProps={{ readOnly: show}}
                    error={formik.touched.fproyecto && Boolean(formik.errors.fproyecto)}
                    helperText={formik.touched.fproyecto && formik.errors.fproyecto}
                    sx={{ mt: 1.5 }}
                />
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row'}}>
                    { !show && <Button type="submit" variant="contained" color="error" sx={{ mr: 1 }} >Send</Button>}
                    { show && <Button variant="contained" color="warn" sx={{ mr: 1 }} onClick={()=> setShow(false)}>Edit</Button>}
                    { !show && <Button variant="contained" sx={{ mr: 1 }} onClick={handleShow}>Show</Button>}
                    <Button component={Link} to='/projectlist' variant="contained" color="back" sx={{color: 'white'}}>Back</Button>
                    <Box sx={{ flexGrow: 1}}/>
                    { show && <Button variant="contained" color="adv" sx={{ mr: .7, width: 70 }} component={Link} to={'/tramos/'+projectId}>Tramos</Button>}
                    { show && <Button variant="contained" color="adv" sx={{ mr: .7, width: 70 }} component={Link} to={'/vanos/'+projectId}>Vanos</Button>}
                    { show && <Button variant="contained" color="adv" sx={{ mr: .7, width: 70 }}>Apoyos</Button>}
                    { show && <Button variant="contained" color="adv" sx={{ width: 70 }}>Bases</Button>}
                </Box>
            </form>
        </Box>
    )
}

async function getProyect (proyecto) {
    const result = await supabase
        .from('projects')
        .select()
        .limit(1)
        .single()
    if (result.data) {
        return {
            //id: docProy.id,
            name: result.data.name,
            description: result.data.description,
            comitente: result.data.comitente,
            proymanager: result.data.proymanager,
            contratista: result.data.contratista,
            expediente: result.data.expediente,
            ubicacion: result.data.ubicacion,
            fproyecto: result.data.fproyecto,
            userId: result.data.userId
        }
    } else {
        return ProjectBlank()
    }
}

export default ProjectShow