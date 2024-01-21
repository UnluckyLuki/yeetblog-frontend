import GlobalVar from "../../../GlobalVar/GlobalVar";



const TRead = () => {


    const handleRead = async (token, endpoint) => {
        const response = await fetch(GlobalVar.backendAPI + endpoint, {
            method: 'GET',
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
        handleRead
    }
}
export default TRead;