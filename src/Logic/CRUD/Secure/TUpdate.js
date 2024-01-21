
import GlobalVar from "../../../GlobalVar/GlobalVar";


const TUpdate = () => {
    const handleUpdate = async (token, body, endpoint) => {

        const response = await fetch(GlobalVar.backendAPI + endpoint, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (response.status === 401){
            await window.location.replace("/login");
        }
        return await response.json()

    }

    return {
        handleUpdate
    }
}
export default TUpdate;