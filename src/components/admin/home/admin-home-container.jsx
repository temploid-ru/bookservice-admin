import {API_POINT} from "../../../constants";

export default function getDataFromServer(token,setAction){

    fetch(API_POINT + '/companies', {
        method:'post',
        body: JSON.stringify({
            method: "CompaniesList",
            token
        })
    }).then(res=>res.json()).then(json => setAction(json.items[0]));

}

export function updateCompanyInfo(companyInfo,setStateAction, token){
    console.log('!!!!!!',companyInfo.id);
    setDataToServer(companyInfo,token);
    setStateAction(companyInfo);
}

function setDataToServer(companyInfo, token){
    let item = {...companyInfo};

    const id = item.id;

    delete item.id;

    const body = {
        method: "CompanyEdit",
        token,
        id,
        item
    };

    fetch(API_POINT + "/companies", {method:'post',body:JSON.stringify(body)})
        .then(res=>res.json()).then(json=>console.log("companies update result", json));
}

