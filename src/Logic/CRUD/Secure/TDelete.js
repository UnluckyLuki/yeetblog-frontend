
import GlobalVar from "../../../GlobalVar/GlobalVar";



const TDelete = () => {
    const handleDelete = async (token, endpoint) => {
        const response = await fetch(GlobalVar.backendAPI + endpoint, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 401){
            await window.location.replace("/login");
        }
        return await response.json()
    }
    return{
        handleDelete
    }
}
export default TDelete;