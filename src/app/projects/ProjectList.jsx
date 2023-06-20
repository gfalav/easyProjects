import { Box, Button, Card, CardActionArea, CardContent, Typography } from "@mui/material"
import React from "react"
import { blue } from "@mui/material/colors"
import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { drawerWidth, user } from "../../comps/recoil/recoil"
import supabase from "../../comps/sb/Sb"

const ProjectList = () => {
    const [projects, setProjects] = React.useState([])
    const usr = useRecoilValue(user)
    const dw = useRecoilValue(drawerWidth)
    const windowWidth = window.innerWidth - dw - 40

    async function getProjects() {
        if (usr) {
            const result = await supabase
                    .from('projects')
                    .select()
                    .eq('userId', usr)
            const arrResult = result.data.map( (doc)=> {
                return {
                    id: doc.id,
                    nombre: doc.name,
                    description: doc.description,
                    comitente: doc.comitente,
                    proymanager: doc.proymanager,
                    contratista: doc.contratista,
                    expediente: doc.expediente,
                    ubicacion: doc.ubicacion,
                    fproyecto: doc.fproyecto,
                    userId: doc.userId
                }
            })
            setProjects(arrResult)
        }
    }

    React.useEffect( ()=> {
        getProjects()
    },[usr])

    return (
        <Box mt={2}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent:'center',
                m: 2,
                width: windowWidth,
                minWidth: {sm:400, md: 800}
            }}>
                <Box sx={{ flexGrow: 1}}>
                    <Typography variant="h5"><b>Proyectos</b></Typography>
                </Box>
                <Button component={Link} to='/project' variant="contained">Nuevo Proyecto</Button>
            </Box>
            {
                projects.map( (p)=>{
                    return(
                        <Card key={p.id} sx={{
                            minWidth: {
                                sm: 400,
                                md: 800
                            }, 
                            m:1,
                            bgcolor: blue[100]
                        }}>
                            <CardActionArea component={Link} to={'/project/' + p.id}>
                                <CardContent>
                                    <Box sx={{
                                        p: 1
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent:'center'
                                        }}>
                                            <Typography variant="subtitle2" sx={{ pl: 2, flexGrow: 1}}>{p.expediente}</Typography>
                                            <Typography variant="subtitle2" sx={{ pr: 2}}><b>{p.fproyecto}</b></Typography>
                                        </Box>
                                        <Typography variant="h6" sx={{pt: 0, pl: 2}}><b>{p.nombre}</b></Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent:'center'
                                        }}>
                                            <Typography sx={{ pl: 2, flexGrow: 1}}>Proyectista: {p.proymanager}</Typography>
                                            <Typography sx={{ pr: 2}}>Contratista: <b>{p.contratista}</b></Typography>
                                        </Box>
                                        <Typography variant="subtitle2" sx={{ pl: 2}}>Comitente: <b>{p.comitente}</b></Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>                        
                    )
                })
            }
            

        </Box>
    )
}

export default ProjectList