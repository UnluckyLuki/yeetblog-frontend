import GlobalVar from "../../../GlobalVar/GlobalVar";
function TCreate() {
    const handleCreate = async (data, endpoint, token) => {
        const response = await fetch(GlobalVar.backendAPI + endpoint, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.status === 401){
            await window.location.replace("/login");
        }
        return await response.json()
    }

    return {
        handleCreate
    }
}

export default TCreate;