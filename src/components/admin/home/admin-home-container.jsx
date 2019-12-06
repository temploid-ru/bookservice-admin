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

export function updateCompanyInfo(companyInfo,setAction, token){
    setDataToServer(companyInfo,token);
    setAction(companyInfo);
}

function setDataToServer(companyInfo, token){

    const id = companyInfo.id;

    delete companyInfo.id;

    const body = {
        method: "CompanyEdit",
        token,
        id,
        item: companyInfo
    };

    fetch(API_POINT + "/companies", {method:'post',body:JSON.stringify(body)})
        .then(res=>res.json()).then(json=>console.log("companies update result", json));
}
