const MegaverseAPI = require('./megaverseAPI');

const candidateId = '73c64d58-0923-4c99-ae02-10c78273037f';
const api = new MegaverseAPI(candidateId);

async function createXShape(api) {
    const n = 11;
    for (let i = 2; i < n - 2; i++) {
        await api.createPolyanet(i, i);
        if (i !== n - i - 1) {
            await api.createPolyanet(i, n - i - 1);
        }
    }
}

async function run() {
    try {
        await createXShape(api);
        console.log('X-shape created successfully.');
    } catch (error) {
        console.error('Error creating X-shape:', error);
    }
}

run();
