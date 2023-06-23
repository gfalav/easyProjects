const pv = (zona, d, v) => {
    let k = 0
    let c = 0
    switch (zona) {
        case 6: 
            if (v>0) {
                return 0.05 * d
            } else {
                return 0
            }
        default:
            if (v<=110) {
                k = 0.85
            } else {
                k = 0.75
            }
        
            if (d <= 12.5) {
                c = 1.2
            } else if (d <= 15.8) {
                c = 1.1
            } else {
                c = 1
            }

            return k * c * (v/3.6) ** 2 / 16000 * d
    }

}

const ph = (zona, d, e) => {
    switch (zona) {
        case 6:
            if (e !== 0) {
                return 0.18 * Math.sqrt(d)
            } else {
                return 0
            }
        default:
            return 0.0029845 * e * (e + d)
    }
}

const newton = (k2,k3) => {
    let n=0
    let x0 = 500
    let x

    do {
        n++
        x = x0- (x0**3 + k2 * x0**2 - k3) / (3 * x0**2 + 2 * k2 * x0)
        x0 = x
    }
    while (n<500)
    return x
}

const calcMecanico = (zona, condClimas, cond, vano, tiroMax) => {
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
    let fMax = 0

    for (let c1 of arrConds1) {
        const pv1 = pv(zona.id, D, c1.viento)
        const ph1 = ph(zona.id, D, c1.hielo)
        const pt1 = Math.sqrt( Math.pow(P + ph1, 2) + pv1 * pv1)
        const ang1 = Math.atan(pv1/(P+ph1)) / Math.PI * 180
        const T1 = R
        const f1 = v * v * pt1 / 8 / T1
        fMax = f1
        const f1h = f1 * Math.sin(ang1 / 180 * Math.PI)
        const f1v = f1 * Math.cos(ang1 / 180 * Math.PI)
        const k1 = v * v * pt1 * pt1 / 24 / T1 / T1 - ct * c1.temp - T1 / ce / S
        calculo.push({
            condId: c1.id,
            vanoId: vano.id,
            condicion: c1.nombre,
            temp: c1.temp,
            viento: c1.viento,
            hielo: c1.hielo,
            tension: T1/S,
            tiro: T1,
            ftotal: f1,
            fhoriz: f1h,
            fvert: f1v,
            angulo: ang1
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
                    if (f2 > fMax) {
                        fMax = f2
                    }
                    calculo.push({
                        condId: c2.id,
                        vanoId: vano.id,
                        condicion: c2.nombre,
                        temp: c2.temp,
                        viento: c2.viento,
                        hielo: c2.hielo,
                        tension: T2/S,
                        tiro: T2,
                        ftotal: f2,
                        fhoriz: f2h,
                        fvert: f2v,
                        angulo: ang2
                    })      
                }
            }                
        }
        if (calculo.length === arrConds1.length) {
            const ttesado = tesado(cond, vano, calculo[0], zona)
            const cmecanico = calculo.sort( (a,b)=>(a.condId - b.condId))
            vano.tiroMax = T1
            vano.flechaMax = fMax
            return { calculoMecanico: cmecanico, tablaTesado: ttesado, vano: vano }
        }
    }
}

const tesado = ( cond, vano, calcMec, zona) => {
    const D = cond.diametro
    const S = cond.seccion
    const P = cond.peso/1000
    const ct = cond.coef_t
    const ce = cond.coef_e
    const v = vano.longitud
    const R = calcMec.tiro
    const viento = calcMec.viento
    const temp = calcMec.temp
    const hielo = calcMec.hielo
    let calculo = []

        const pv1 = pv(zona.id, D, viento)
        const ph1 = ph(zona.id, D, hielo)
        const pt1 = Math.sqrt( Math.pow(P + ph1, 2) + pv1 * pv1)
        const T1 = R
        const k1 = v * v * pt1 * pt1 / 24 / T1 / T1 - ct * temp - T1 / ce / S
        for (let t = -15; t<=55; t = t + 5) {
            const pt2 = P
            const k2 = ( k1 + ct * t) * ce * S
            const k3 = v * v * pt2 * pt2 * ce * S / 24
            const T2 = newton(k2,k3)
            const f2 = v * v * pt2 / 8 / T2
            calculo.push({
                vanoId: vano.id,
                temp: t,
                tiro: T2,
                flecha: f2
            })                    
        }
        return calculo.sort( (a,b)=>(a.temp - b.temp) )

}


export { pv, ph, newton, calcMecanico, tesado}