import { Box, TextField } from "@mui/material"
import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { vanoMaxSt, retMaxSt, arrPuntosSt } from "../../comps/recoil/recoil"

const Lista = () => {
    const [vanoMax, setVanoMax] = useRecoilState(vanoMaxSt)
    const [retMax, setRetMax] = useRecoilState(retMaxSt)
    const arrPuntos = useRecoilValue(arrPuntosSt)

    return(
        <Box>
            <form>
                <Box display='flex' flexDirection='row'>
                <TextField
                    type="number" id="vanoMax" nombre="vanoMax" label="Vano Máximo [m]"
                    fullWidth required sx={{ m:2}}
                    value={vanoMax}
                    onChange={(event) => setVanoMax(event.target.value)}
                    />
                <TextField
                    type="number" id="retMax" nombre="retMax" label="Dist entre Ret [m]"
                    fullWidth required sx={{ m:2}}
                    value={retMax}
                    onChange={(event)=>setRetMax(event.target.value)}
                    />
                </Box>
            </form>
            <Box>
                {arrPuntos && arrPuntos.map( (p, i)=> {
                    return <p key={i}>Tipo: {p.t} - lat: {p.lat}, lng: {p.lng}, d: {p.d}, ang: {p.ang}</p>
                })}
            </Box>
        </Box>
    )
}

export default Lista