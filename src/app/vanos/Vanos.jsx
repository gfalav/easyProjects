import React from "react"
import supabase from "../../comps/sb/Sb"
import { Link, useParams } from "react-router-dom"
import { blue } from "@mui/material/colors"
import { Box, Button, IconButton, MenuItem, TextField, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import CalculateIcon from "@mui/icons-material/Calculate"
import { useRecoilValue } from "recoil"
import { drawerWidth } from "../../comps/recoil/recoil"

const Vanos = () => {
    const projectId = useParams().projectId
    const dw = useRecoilValue(drawerWidth)    
    const [vanos, setVanos] = React.useState([])
    const [conductors, setConductors] = React.useState([])
    const [zonas, setZonas] = React.useState([])
    const vanosWidth = window.innerWidth - dw - 40

    const getVanos = async () => {
        const resVanos = await supabase
            .from('vanos')
            .select()
            .order('orden')
            .eq( 'projectId', projectId)
        if (resVanos.error) {
            alert('Error fetch vanos')
            return []
        }
        if (resVanos.data) {
            return resVanos.data
        }
    }

    const getCondutors = async () => {
        const resConds = await supabase
            .from('conductors')
            .select()
        if (resConds.error) {
            alert('Error fetch conductors'+resConds.error.message)
        }
        if (resConds.data) {
            return resConds.data
        }
    }

    const getZonas = async () => {
        const resZonas = await supabase
            .from('zonas')
            .select()
        if (resZonas.error) {
            alert('Error fetch zonas'+resZonas.error.message)
        }
        if (resZonas.data) {
            return resZonas.data
        }
    }

    React.useEffect( () => {

        Promise.all([getVanos(), getCondutors(), getZonas()]).then( (results) => {
            setConductors(results[1])
            setZonas(results[2])
            setVanos(results[0])
        })
    }, [])

    const handleCHOrden = (event, index, vanoId) => {
        let arrAux = [...vanos]
        arrAux[index].orden = event.target.value
        setVanos(arrAux)
        updVano(vanoId, arrAux[index])
    }

    const handleCHLongitud = (event, index, vanoId) => {
        let arrAux = [...vanos]
        arrAux[index].longitud = event.target.value
        setVanos(arrAux)
        updVano(vanoId, arrAux[index])
    }

    const handleCHConductor = (event, index, vanoId) => {
        let arrAux = [...vanos]
        arrAux[index].conductor = event.target.value
        setVanos(arrAux)
        updVano(vanoId, arrAux[index])
    }

    const handleCHZona = (event, index, vanoId) => {
        let arrAux = [...vanos]
        arrAux[index].zona = event.target.value
        setVanos(arrAux)
        updVano(vanoId, arrAux[index])
    }

    const handleAddVano = () => {
        const insVano = async () => {
            const resInsVano = await supabase
                .from('vanos')
                .insert([VanoBlank(projectId)])
                .select()
            if (resInsVano.error) {
                alert('Error insert vano'+ resInsVano.error.message)
            }
            if (resInsVano.data) {
                getVanos().then( (data)=>setVanos(data))
            }
        }

        insVano()
    }

    const updVano = async (vanoId, vano) => {
        const resUpdVano = await supabase
            .from('vanos')
            .update(vano)
            .eq('id', vanoId)
        if (resUpdVano.error) {
            alert('Error Update vano'+resUpdVano.error.message)
        }
    }

    const handleDelete = (vanoId) => {
        const deleteVano = async (vanoId) => {
            const resDelVano = await supabase
                .from('vanos')
                .delete()
                .eq('id', vanoId)
            if (resDelVano.error) {
                alert('Error delete Vano'+resDelVano.error.message)
            } else {
                getVanos().then( (data)=> setVanos(data))
            }
        }

        deleteVano(vanoId)
    }

    return(
        <Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent:'center',
                m: 2,
                width: vanosWidth,
                minWidth: {sm:400, md: 800}
            }}>
                <Box sx={{ flexGrow: 1}}>
                    <Typography variant="h5"><b>Vanos del Proyecto</b></Typography>
                </Box>
                <Button variant="contained" onClick={handleAddVano}>Nuevo Vano</Button>
            </Box>
            {vanos.map( (v, index) => {
                return (
                    <Box key={v.id} sx={{ 
                            display: 'flex', flexDirection: 'row',
                            m: 1, pt: 1.5, pb: 1.5, borderRadius: 1 ,bgcolor: blue[100]
                    }}>
                        <TextField id="orden" label='Orden' value={v.orden} sx={{ width: 60, mr: 0.5, ml: 1 }} size="small" onChange={(event) => handleCHOrden(event, index, v.id)}/>
                        <TextField id="longitud" label='Longitud' value={v.longitud} sx={{ width: 60, mr: 0.5 }} size="small" onChange={(event) => handleCHLongitud(event, index, v.id)}/>
                        <TextField id="conductor" label='Conductor' value={v.conductor} sx={{ width: 130, mr: 0.5 }} size="small" select  onChange={(event) => handleCHConductor(event, index, v.id)}>
                            {
                                conductors.map( (c) => {
                                    return <MenuItem key={c.id} value={c.id}>{c.nombre}</MenuItem>
                                })
                            }
                        </TextField>
                        <TextField id="zona" label='Zona' value={v.zona} sx={{ width: 100, mr: 0.5 }} size="small" select  onChange={(event) => handleCHZona(event, index, v.id)}>
                            {
                                zonas.map( (c) => {
                                    return <MenuItem key={c.id} value={c.id}>{c.nombre}</MenuItem>
                                })
                            }
                        </TextField>
                        <Box sx={{ flexGrow: 1}}/>
                        <IconButton component={Link} to={'/vanocalc/'+v.id}><CalculateIcon /></IconButton>
                        <IconButton onClick={() => handleDelete(v.id)}><DeleteIcon /></IconButton>
                    </Box>
                )
            })}
        </Box>
    )
}

const VanoBlank = (projectId) => {
    return {
        orden: 0,
        longitud: 0,
        conductor: 2,
        zona: 1,
        projectId: projectId
    }
}
export default Vanos