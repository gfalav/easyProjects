const distance = (punto1, punto2) => {
    const lat1 = punto1.lat * Math.PI /180
    const lat2 = punto2.lat * Math.PI /180
    const lng1 = punto1.lng * Math.PI /180
    const lng2 = punto2.lng * Math.PI /180
    const dlat = lat1 - lat2
    const dlng = lng1 - lng2
    const R = 6371000

    const a = (Math.sin(dlat/2))**2 + Math.cos(lat1) * Math.cos(lat2) * (Math.sin(dlng/2))**2
    const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a))
    const d = R * c

    return d
}

const angle = (punto1, punto2, punto3) => {
    const d12 = distance(punto1, punto2)
    const d23 = distance(punto2, punto3)
    const d13 = distance(punto1, punto3)
    const ang = Math.acos( (d13**2-d12**2-d23**2)/(-2)/d23/d12 )* 180/Math.PI
    return ang
}

export {distance, angle}