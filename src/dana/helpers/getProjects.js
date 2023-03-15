export const getProyectos = async ()=>{
    const url = `https://danae.com.mx:8443/web-0.0.1-SNAPSHOT/obtener/proyectos`;
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