import axios from 'axios';

export class API {
    url: string

    constructor(url: string | undefined) {
        if (url === undefined || url === "") {
            url = process.env.API_BASE_URL ?? "http://localhost:3030";
        }
        if (url.endsWith("/")) {
            url = url.slice(0, url.length - 1)
        }
        this.url = url
    }

    withPath(path: string) {
        if (!path.startsWith("/")) {
            path = "/" + path
        }
        return `${this.url}${path}`
    }

    generateAuthToken() {
        return "Bearer " + new Date().toISOString()
    }

    async getAllAnimals() {
        return axios.get(this.withPath("/v2/animals"), {
            headers: {
                "Authorization": this.generateAuthToken(),
            }
        });
    }

    async getAnimal(id: number) {
        return axios.get(this.withPath("/v2/animals/id/" + id), {
            headers: {
                "Authorization": this.generateAuthToken()
            }
        })
    }
}

const apiInstance = new API(process.env.API_BASE_URL);
export default apiInstance;