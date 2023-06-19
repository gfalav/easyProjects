import { Box } from "@mui/material"
import { GoogleMap, Marker, Polyline, useLoadScript } from "@react-google-maps/api"
import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { arrPuntosSt, centerMapSt } from "../../comps/recoil/recoil"
import { angle, distance } from "./Utils"

const Mapa = () => {
    const mapHeignt = window.innerHeight - 80
    const centerMap = useRecoilValue(centerMapSt)
    const [arrPuntos, setArrPuntos] = useRecoilState(arrPuntosSt)
    const plineOpts = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 7,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        zIndex: 1
      };
    
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: 'AIzaSyCS0O2bJ1gdSqA5nlOUhBQKoVnLAMqFL2U'
    })
    if (!isLoaded) return <div>Loading...</div>

    const handleClick = (event) => {
        let p1 = null
        let arrAux = arrPuntos.map( (p)=> p)
        arrAux.push({lat: event.latLng.lat(), lng: event.latLng.lng()})

        const arrTramos = arrAux.map( (p,i) => {
            switch (i) {
                case 0:
                    p1 = p
                    return ({t: 'Arranque', lat: p.lat, lng: p.lng, d:0 ,ang: 0})
                case arrAux.length-1:
                    return ({t: 'Terminal', lat: p.lat, lng: p.lng, d: distance(p,p1), ang: 0})
                default: 
                    let d = distance(p,p1)
                    let ang = angle(arrAux[i+1],arrAux[i],arrAux[i-1])
                    p1 = p
                    return ({t: 'Desvío', lat: p.lat, lng: p.lng, d: d, ang: ang })
            }
        })
        console.log(arrTramos)
        setArrPuntos(arrTramos)
    }

    return(
        <Box sx={{ height: mapHeignt}} >
            <GoogleMap mapContainerClassName="mapClass"
                draggableCursor="default"
                onClick={handleClick}
                center={centerMap}
                zoom={16}>
                {arrPuntos && arrPuntos.map( (p,i) => {
                    return <Marker key={i} position={{lat: p.lat, lng: p.lng}} />
                })}
                <Polyline options={plineOpts} path={arrPuntos} />
            </GoogleMap>
        </Box>
    )
}

export default Mapa