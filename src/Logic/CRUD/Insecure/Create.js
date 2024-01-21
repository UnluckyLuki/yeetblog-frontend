import GlobalVar from "../../../GlobalVar/GlobalVar";


const Create = () => {
    const handleCreate = async (data, endpoint) => {
        const response = await fetch(GlobalVar.backendAPI + endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.status === 401){
            return {error: true}
        }
        return await response.json()
    }
    return {
        handleCreate
    }
}
export default Create;