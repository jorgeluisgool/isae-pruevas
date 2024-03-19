export const getProyectos = async (api, userAuth)=>{

    // console.log(userAuth[0].idusuario);

    const url = `${api}/obtener/proyectos/asignados/${userAuth[0].idusuario}`;
    const options = {
        method: "GET",
        cache: "no-cache",
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
    }
    const resp = await fetch(url,options);
    const data = await resp.json();
    // console.log(data);

    return data;
}