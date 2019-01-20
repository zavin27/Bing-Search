import http from '../Http';


/**
 * Search API
 */
class SearchAPI {
    /**
     * Search request
     * @param value
     */
    search = (value: string) => {
        return dispatch => {
            // @ts-ignore
            return new Promise((resolve, reject) => {
                http.post('/search', {search: value}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        ContentType: 'application/json'
                    }
                })
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error);
                        console.log(error);
                    })
            })
        }
    };
    /**
     * get Recently searched
     */
    searchHistory = () => {
        return dispatch => {
            // @ts-ignore
            return new Promise((resolve, reject) => {
                http.get('/search-history', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    }
                })
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error);
                        console.log(error);
                    })
            })
        }
    }

}

export const searchAPI = new SearchAPI();
