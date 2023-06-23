import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material"

const TablaCalcMec = ({calcMec}) => {

    return(
        <Box sx={{ mb: 2}}>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow className="classes.root">
                            <TableCell align="center">Condición</TableCell>
                            <TableCell align="center">Temp [°C]</TableCell>
                            <TableCell align="center">Viento [km/h]</TableCell>
                            <TableCell align="center">Hielo [mm]</TableCell>
                            <TableCell align="center">Tensión [kg/mm2]</TableCell>
                            <TableCell align="center">Tiro [kg]</TableCell>
                            <TableCell align="center">Flecha T [m]</TableCell>
                            <TableCell align="center">Flecha H [m]</TableCell>
                            <TableCell align="center">Flecha V [m]</TableCell>
                            <TableCell align="center">Ángulo [°]</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {calcMec && calcMec.map( (c)=> {
                            return <TableRow key={c.condId}>
                                <TableCell align="center">{c.condicion}</TableCell>
                                <TableCell align="center">{c.temp}</TableCell>
                                <TableCell align="center">{c.viento}</TableCell>
                                <TableCell align="center">{c.hielo}</TableCell>
                                <TableCell align="center">{c.tension.toFixed(2)}</TableCell>
                                <TableCell align="center">{c.tiro.toFixed(2)}</TableCell>
                                <TableCell align="center">{c.ftotal.toFixed(2)}</TableCell>
                                <TableCell align="center">{c.fhoriz.toFixed(2)}</TableCell>
                                <TableCell align="center">{c.fvert.toFixed(2)}</TableCell>
                                <TableCell align="center">{c.angulo.toFixed(2)}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    )
}

export default TablaCalcMec