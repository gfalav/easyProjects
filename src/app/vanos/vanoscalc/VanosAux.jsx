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

export { pv, ph, newton}