import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import React from "react"
import { useParams } from "react-router-dom"
import supabase from "../../../comps/sb/Sb"
import { newton, ph, pv } from "./VanosAux"

const VanosCalc = () => {
    const vanoId = useParams().vanoId
    const [vano, setVano] = React.useState(null)
    const [cond, setCond] = React.useState(null)
    const [zona, setZona] = React.useState(null)
    const [condClimas, setCondClimas] = React.useState([])
    const [tiroMax, setTiroMax] = React.useState(1)
    const [calcMec, setCalcMec] = React.useState([])

    React.useEffect( () => {
        const getVano = async () => {
            const resVano = await supabase
                .from('vanos')
                .select()
                .eq('id', vanoId)
                .limit(1)
                .single()
            if (resVano.error) {
                alert('Error fetch vano'+resVano.error.message)
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

        Promise.all([getVano(), getCond(), getZona(), getCondClimas()])
            .then( (results) => {
                setVano(results[0])
                setCond(results[1].filter( cond => cond.id === results[0].conductor)[0])
                setZona(results[2].filter( zona => zona.id === results[0].zona)[0])
                setCondClimas(results[3].filter( condclima => condclima.zonaId === results[0].zona))
            })
    })

    const handleTiro = (e) => {
        if (e.target.value >= 0) {
            setTiroMax(Number(e.target.value))
        } else {
            setTiroMax(0)
        }
    }

    const calcMecanico = () => {
        const arrConds1 = condClimas
        const arrConds2 = condClimas
        const D = cond.diametro
        const S = cond.seccion
        const P = cond.peso/1000
        const R = tiroMax
        const ct = cond.coef_t
        const ce = cond.coef_e
        const v = vano.longitud
        let calculo = []

        for (let c1 of arrConds1) {
            const pv1 = pv(zona.id, D, c1.viento)
            const ph1 = ph(zona.id, D, c1.hielo)
            const pt1 = Math.sqrt( Math.pow(P + ph1, 2) + pv1 * pv1)
            const ang1 = Math.atan(pv1/(P+ph1)) / Math.PI * 180
            const T1 = R
            const f1 = v * v * pt1 / 8 / T1
            const f1h = f1 * Math.sin(ang1 / 180 * Math.PI)
            const f1v = f1 * Math.cos(ang1 / 180 * Math.PI)
            const k1 = v * v * pt1 * pt1 / 24 / T1 / T1 - ct * c1.temp - T1 / ce / S
            calculo.push({
                id: c1.id,
                condicion: c1.nombre,
                temp: c1.temp,
                viento: c1.viento,
                hielo: c1.hielo,
                PT: T1/S,
                T: T1,
                FT: f1,
                FH: f1h,
                FV: f1v
            })
            for (let c2 of arrConds2) {
                if (c1.id !== c2.id) {
                    const pv2 = pv(zona.id, D, c2.viento)
                    const ph2 = ph(zona.id, D, c2.hielo)
                    const pt2 = Math.sqrt( Math.pow(P + ph2, 2) + pv2 * pv2)
                    const ang2 = Math.atan(pv2/(P+ph2)) / Math.PI * 180
                    const k2 = ( k1 + ct * c2.temp) * ce * S
                    const k3 = v * v * pt2 * pt2 * ce * S / 24
                    const T2 = newton(k2,k3)
                    const f2 = v * v * pt2 / 8 / T2
                    const f2h = f2 * Math.sin(ang2 / 180 * Math.PI)
                    const f2v = f2 * Math.cos(ang2 / 180 * Math.PI)
                    if (T2 >= T1) {
                        calculo = []
                        break
                    } else {
                        calculo.push({
                            id: c2.id,
                            condicion: c2.nombre,
                            temp: c2.temp,
                            viento: c2.viento,
                            hielo: c2.hielo,
                            PT: T2/S,
                            T: T2,
                            FT: f2,
                            FH: f2h,
                            FV: f2v
                        })      
                    }
                }                
            }
            if (calculo.length === arrConds1.length) {
                setCalcMec(calculo.sort( (a,b)=>(a.id - b.id)))
                break
            }
        }
    }

    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            mt: 2, ml: 2, width: '100%'
            
        }}>
            <Box sx={{
                display:' flex',
                flexDirection: 'row'
            }}>
                {cond && <Box sx={{ m: 5}}>
                    <Box sx={{ mb: 1}}><b>Datos del conductor: {cond.nombre}</b></Box>
                    <Box>Sección: <b>{cond.seccion}</b></Box>
                    <Box>Diametro: <b>{cond.diametro}</b></Box>
                    <Box>Peso: <b>{cond.peso}</b></Box>
                    <Box>Rotura: <b>{cond.rmec}</b></Box>
                    <Box>Módulo de Young E: <b>{cond.coef_e}</b></Box>
                    <Box>Coef de Dilatación Temp: <b>{cond.coef_t}</b></Box>
                </Box>}
                <Box sx={{ m: 5 }}>
                    <Box sx={{ mb: 1}}><b>Zona Climática: {zona && zona.nombre}</b></Box>
                    <Box sx={{ mb: 1}}><b>Longitud del Vano: {vano && vano.longitud}</b></Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TextField id="maxTiro" label="Tiro máximo" size="small" type="number" value={tiroMax} sx={{ mt: 2 }} onChange={handleTiro} />
                        <Button onClick={calcMecanico}>Calcular</Button>
                    </Box>
                </Box>
            </Box>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow className="classes.root">
                            <TableCell align="center">Condición</TableCell>
                            <TableCell align="center">Temperatura</TableCell>
                            <TableCell align="center">Viento</TableCell>
                            <TableCell align="center">Hielo</TableCell>
                            <TableCell align="center">Tensión</TableCell>
                            <TableCell align="center">Tiro</TableCell>
                            <TableCell align="center">Flecha T</TableCell>
                            <TableCell align="center">Flecha H</TableCell>
                            <TableCell align="center">Flecha V</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {calcMec && calcMec.map( (c)=> {
                            return <TableRow key={c.id}>
                                <TableCell align="center">{c.condicion}</TableCell>
                                <TableCell align="center">{c.temp}</TableCell>
                                <TableCell align="center">{c.viento}</TableCell>
                                <TableCell align="center">{c.hielo}</TableCell>
                                <TableCell align="center">{c.PT.toFixed(2)}</TableCell>
                                <TableCell align="center">{c.T.toFixed(2)}</TableCell>
                                <TableCell align="center">{c.FT.toFixed(2)}</TableCell>
                                <TableCell align="center">{c.FH.toFixed(2)}</TableCell>
                                <TableCell align="center">{c.FV.toFixed(2)}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default VanosCalc