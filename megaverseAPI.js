const axios = require('axios');

class MegaverseAPI {
    constructor(candidateId) {
        this.candidateId = candidateId;
        this.baseURL = 'https://challenge.crossmint.io/api';
    }

    // I continuing encounter 429 too many request error, so I add the delay
    async createPolyanet(row, column, delay = 10000) {
        await this.delay(delay);
        const url = `${this.baseURL}/polyanets`;
        const payload = { row, column, candidateId: this.candidateId };
        try {
            const response = await axios.post(url, payload);
            return response.data;
        } catch (error) {
            console.error('Error creating Polyanet:', error);
        }
    }

    async deletePolyanet(row, column) {
        const url = `${this.baseURL}/polyanets`;
        const payload = { row, column, candidateId: this.candidateId };
        try {
            const response = await axios.delete(url, { data: payload });
            return response.data;
        } catch (error) {
            console.error('Error deleting Polyanet:', error);
        }
    }

    async createSoloon(row, column, color, delay = 10000) {
        await this.delay(delay);
        const url = `${this.baseURL}/soloons`;
        const payload = { row, column, color, candidateId: this.candidateId };
        try {
            const response = await axios.post(url, payload);
            return response.data;
        } catch (error) {
            console.error('Error creating Soloon:', error);
            throw error;
        }
    }

    async deleteSoloon(row, column) {
        const url = `${this.baseURL}/soloons`;
        const payload = { row, column, candidateId: this.candidateId };
        try {
            const response = await axios.delete(url, { data: payload });
            return response.data;
        } catch (error) {
            console.error('Error deleting Soloon:', error);
        }
    }

    async createCometh(row, column, direction, delay = 10000) {
        await this.delay(delay);
        const url = `${this.baseURL}/comeths`;
        const payload = { row, column, direction, candidateId: this.candidateId };
        try {
            const response = await axios.post(url, payload);
            return response.data;
        } catch (error) {
            console.error('Error creating Cometh:', error);
            throw error;
        }
    }

    async deleteCometh(row, column) {
        const url = `${this.baseURL}/comeths`;
        const payload = { row, column, candidateId: this.candidateId };
        try {
            const response = await axios.delete(url, { data: payload });
            return response.data;
        } catch (error) {
            console.error('Error deleting Comeths:', error);
        }
    }

    async retrieveGoalMap() {
        const url = `${this.baseURL}/map/${this.candidateId}/goal`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error retrieving goal map:', error);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = MegaverseAPI;
