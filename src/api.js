export default {
    async search(keyword) {
        let response = await fetch(`/api/search/${keyword}`);

        if (response.ok) {
            return response.json();
        }
    },

    async getStation(id) {
        let response = await fetch(`/api/getstation/${id}`);

        if (response.ok) {
            return response.json();
        }
    }
}
