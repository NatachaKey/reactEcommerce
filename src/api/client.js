import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://ecommerce-6kwa.onrender.com/api/v1',
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    withCredentials: true
});

const stringify = (object) => JSON.stringify(object, null, 2);

// Common logging and error handling for all endpoints (kinda like middleware in Express backend)
const requestMiddleware = (request) => {
    console.debug(`Log: Sending request. Path=${request.url} RequestParams=${stringify(request.params)} RequestData=${stringify(request.data)}`)
    return request
}

const responseMiddleware = (response) => {
    console.dir(response)
    console.debug(`Log: Received response. URL=${response.request.responseURL} ResponseStatus=${response.status} ResponseData=${stringify(response.data)}`)
    return response;
}

const errorMiddleware = (error) => {
    if (error.response && error.request && error.toJSON) {
        console.error("Log: Error fetching: ", error.toJSON());
    } else {
        console.error("Log: Error fetching: ", error)
    }
    // return the rejected promise / re-raise the error so that the caller can handle it in a try-catch and do any logic they want there (like redirecting to home page or showing a message)
    return Promise.reject(error);
}

apiClient.interceptors.request.use(requestMiddleware)
apiClient.interceptors.response.use(responseMiddleware, errorMiddleware)

export default apiClient