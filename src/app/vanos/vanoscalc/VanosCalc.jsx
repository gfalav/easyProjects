import { Box, Button, TextField, Typography } from "@mui/material"
import React from "react"
import { Link, useParams } from "react-router-dom"
import supabase from "../../../comps/sb/Sb"
import { calcMecanico } from "./VanosAux"
import { useRecoilValue } from "recoil"
import { drawerWidth } from "../../../comps/recoil/recoil"
import TablaCalcMec from "./TablaCalcMec"
import TablaTesado from "./TablaTesado"

const VanosCalc = () => {
    const vanoId = useParams().vanoId
    const dw = useRecoilValue(drawerWidth)
    const windowWidth = window.innerWidth - dw - 40
    const [vano, setVano] = React.useState(null)
    const [cond, setCond] = React.useState(null)
    const [zona, setZona] = React.useState(null)
    const [condClimas, setCondClimas] = React.useState([])
    const [tiroMax, setTiroMax] = React.useState('')
    const [tensionMax, setTensionMax] = React.useState('')
    const [flechaMax, setFlechaMax] = React.useState('')
    const [calcMec, setCalcMec] = React.useState([])
    const [tTesado, setTTesado] = React.useState([])

    React.useEffect( () => {
        const getVano = async () => {
            const resVano = await supabase
                .from('vanos')
                .select()
                .eq('id', vanoId)
                .limit(1)
                .single()
            if (resVano.error) {
                alert('Error fetch vano: '+resVano.error.message)
            }
            if (resVano.data) {
                return resVano.data
            }
        }

        const getCond = async () => {
            const resCond = await supabase
                .from('conductors')
                .select()
            if (resCond.error) {
                alert('Error fetch vano'+resCond.error.message)
            }
            if (resCond.data) {
            return resCond.data
            }
        }

        const getZona = async () => {
            const resZona = await supabase
                .from('zonas')
                .select()
            if (resZona.error) {
                alert('Error fetch zona'+resZona.error.message)
            }
            if (resZona.data) {
                return resZona.data
            }
        }

        const getCondClimas = async (zonaId) => {
            const resCondClimas = await supabase
                .from('condclimas')
                .select()
                if (resCondClimas.error) {
                    alert('Error fetch zona'+resCondClimas.error.message)
                }
                if (resCondClimas.data) {
                    return resCondClimas.data
                }
        }

        const getCalcMecanico = async (vanoId) => {
            const resCalcMecanico = await supabase
                .from('calcvanos')
                .select()
                .eq('vanoId', vanoId)
                if( resCalcMecanico.error) {
                    alert('Error fetch calcvanos' + resCalcMecanico.error.message)
                }
                if (resCalcMecanico.data) {
                    return resCalcMecanico.data
                }
        }

        const getTesado = async (vanoId) => {
            const resTesado = await supabase
                .from('tesados')
                .select()
                .eq('vanoId', vanoId)
                if( resTesado.error) {
                    alert('Error fetch calcvanos' + resTesado.error.message)
                }
                if (resTesado.data) {
                    return resTesado.data
                }
        }

        Promise.all([getVano(), getCond(), getZona(), getCondClimas(), getCalcMecanico(vanoId), getTesado(vanoId)])
            .then( (results) => {
                setVano(results[0])
                setCond(results[1].filter( cond => cond.id === results[0].conductor)[0])
                setZona(results[2].filter( zona => zona.id === results[0].zona)[0])
                setCondClimas(results[3].filter( condclima => condclima.zonaId === results[0].zona))
                setCalcMec(results[4])
                setTTesado(results[5])
                setFlechaMax(results[0].flechaMax)
                setTiroMax(results[0].tiroMax)
                setTensionMax(results[0].tiroMax/results[1].filter( cond => cond.id === results[0].conductor)[0].seccion)
            })
    }, [vanoId])

    const handleTiro = (e) => {
        if (e.target.value >= 0) {
            setTiroMax(Number(e.target.value))
            setTensionMax((Number(e.target.value)/cond.seccion))
        } else {
            setTiroMax(0)
        }
    }

    const handleTension = (e) => {
        if (e.target.value >= 0) {
            setTensionMax(Number(e.target.value))
            setTiroMax((Number(e.target.value*cond.seccion)))
        } else {
            setTensionMax(0)
            setTiroMax(0)
        }
    }

    const saveCalc = async () => {
        await supabase
            .from('vanos')
            .update(vano)
            .eq('id', vanoId)
        await supabase
            .from('calcvanos')
            .delete()
            .eq('vanoId',vanoId)
            .then( async () => {
                await supabase
                    .from('calcvanos')
                    .insert(calcMec)
            })
            await supabase
            .from('tesados')
            .delete()
            .eq('vanoId',vanoId)
            .then( async () => {
                await supabase
                    .from('tesados')
                    .insert(tTesado)
            })

    }

    const calculaVano = () => {
        if (tiroMax) {
        const calculos = calcMecanico(zona, condClimas, cond, vano, tiroMax)
        setCalcMec(calculos.calculoMecanico)
        setTTesado(calculos.tablaTesado)
        setVano(calculos.vano)
        setFlechaMax(calculos.vano.flechaMax)
        } else {
            alert('Debe indicar Tiro o Tensión Máximos')
        }
    }


    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            mt: 1, ml: 2, width: windowWidth
            
        }}>
            <Typography variant="h5" sx={{ ml: 4}}>Cálculo del vano: <b>{vano && vano.orden}</b></Typography>
            <Box sx={{
                display:' flex',
                flexDirection: 'row',
                mt: 2, mb: 1
            }}>
                {cond && <Box sx={{ ml: 4 }}>
                    <Box sx={{ mb: 1}}><b>Datos del conductor: {cond.nombre}</b></Box>
                    <Box>Sección [mm2]: <b>{cond.seccion}</b></Box>
                    <Box>Diametro [mm]: <b>{cond.diametro}</b></Box>
                    <Box>Peso [kg/km]: <b>{cond.peso}</b></Box>
                    <Box>Rotura [kg]: <b>{cond.rmec}</b></Box>
                    <Box>Módulo de Young E [kg/mm2]: <b>{cond.coef_e}</b></Box>
                    <Box>Coef de Dilatación Temp [1/°C]: <b>{cond.coef_t}</b></Box>
                </Box>}
                <Box sx={{ ml: 16 }}>
                    <Box sx={{ mb: 1}}><b>Zona Climática: {zona && zona.nombre}</b></Box>
                     <Box sx={{ mb: 1}}><b>Longitud del Vano [m]: {vano && vano.longitud}</b></Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TextField id="maxTiro" label="Tiro máx [kg]" size="small" type="number" value={tiroMax && tiroMax.toFixed(3)} sx={{ mt: 1, mr:1, width: 120 }} onChange={handleTiro} />
                        <TextField id="maxTension" label="Tensión máx [kg/mm2]" size="small" type="number" value={tensionMax && tensionMax.toFixed(3)} sx={{ mt: 1, mr:1, width: 120 }} onChange={handleTension} />
                        <TextField id="maxFlecha" label="FLecha máx [m]" size="small" type="number" value={flechaMax && flechaMax.toFixed(3)} sx={{ mt: 1, width: 120 }} onChange={handleTension} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Button variant="contained" onClick={calculaVano} sx={{ m: 1.5, width: 70}}>Calcular</Button>
                        <Button variant="contained" color="error" onClick={saveCalc} sx={{ m: 1.5, width: 70}}>Guardar</Button>
                    </Box>
                </Box>
            </Box>
            { calcMec && <TablaCalcMec calcMec={calcMec} />}
            <Typography sx={{ ml: 4 }}><b>Tabla de Tesado</b></Typography>
            { tTesado && <TablaTesado ttesado={tTesado} />}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Button component={Link} to={'/vanos/'+(vano && vano.projectId)} variant="contained" color="back" onClick={saveCalc} sx={{ m: 1.5, width: 70, color: 'white'}}>Vanos</Button>
                <Button component={Link} to={'/project/'+(vano && vano.projectId)} variant="contained" color="back" onClick={saveCalc} sx={{ m: 1.5, width: 70, color: 'white'}}>Proyecto</Button>
            </Box>
        </Box>
    )
}

export default VanosCalc