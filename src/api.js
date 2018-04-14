export default {
    search(keyword) {
        return fetch(`/api/search/${keyword}`)
               .then((response) => {

                   if (response.ok) {
                       return response.json();
                   }
               })
               .then((data) => {
                   return data;
               });
    },

    getStation(id) {
        return fetch(`/api/getstation/${id}`)
            .then((response) => {

                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                return data;
            });
    }
}
