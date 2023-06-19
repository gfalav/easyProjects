import supabase from "../../comps/sb/Sb"

const zonas = () =>  {

    return([
        { id: 1, nombre: 'Zona A'},
        { id: 2, nombre: 'Zona B'},
        { id: 3, nombre: 'Zona C'},
        { id: 4, nombre: 'Zona D'},
        { id: 5, nombre: 'Zona E'},
        { id: 6, nombre: 'Zona Espanola B'}
    ])
}

const setZonas = async () => {
    const result = await supabase
        .from('zonas')
        .insert(zonas())
    if (result.error) {
        alert('Error insert zonas' + result.error)
    }
}

export { zonas, setZonas }