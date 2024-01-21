import GlobalVar from "../../../GlobalVar/GlobalVar";



const Read = () => {


    const handleRead = async (endpoint) => {
        const response = await fetch(GlobalVar.backendAPI + endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await response.json()
    }

    return{
        handleRead
    }
}
export default Read;