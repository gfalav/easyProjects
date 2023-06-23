import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const TablaTesado = ({ttesado}) => {
    const ttesado1 = ttesado.slice(0,5)
    const ttesado2 = ttesado.slice(5,10)
    const ttesado3 = ttesado.slice(10,15)

    const Tabla = ({ttesado}) => {
        return(
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow className="classes.root">
                            <TableCell align="center">Temp [°C]</TableCell>
                            <TableCell align="center">Tiro [kg]</TableCell>
                            <TableCell align="center">Flecha [m]</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ttesado && ttesado.map( (c)=> {
                            return <TableRow key={c.temp}>
                                <TableCell align="center">{c.temp}</TableCell>
                                <TableCell align="center">{c.tiro.toFixed(2)}</TableCell>
                                <TableCell align="center">{c.flecha.toFixed(2)}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return(
        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
            <Box sx={{ mr: 2, mb: 2}}>
                <Tabla ttesado={ttesado1}/>
            </Box>
            <Box sx={{ mr: 2}}>
                <Tabla ttesado={ttesado2}/>
            </Box>
            <Box>
                <Tabla ttesado={ttesado3}/>
            </Box>
        </Box>
    )
}

export default TablaTesado