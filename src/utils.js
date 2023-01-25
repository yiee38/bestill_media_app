export function filepath(artname, filename){
    let artnamelow = artname.toLowerCase();
    artnamelow = artnamelow.replace(/ /g, "_");
    artnamelow = artnamelow.replace(/'/g, "");
    artnamelow = artnamelow.replace(/,/g, "");
    artnamelow = artnamelow.replace(/!/g, "");
    artnamelow = artnamelow.replace(/:/g, "");
    artnamelow = artnamelow.replace(/\?/g, "");
    const f = '/Assets/files/' + artnamelow + '/' + filename;
    return  f;
}

export function convertArtName(artname){
    let artnamelow = artname.toLowerCase();
    artnamelow = artnamelow.replace(/ /g, "_");
    artnamelow = artnamelow.replace(/'/g, "");
    artnamelow = artnamelow.replace(/,/g, "");
    artnamelow = artnamelow.replace(/!/g, "");
    artnamelow = artnamelow.replace(/:/g, "");
    artnamelow = artnamelow.replace(/\?/g, "");
    return artnamelow;
}