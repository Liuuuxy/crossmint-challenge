const MegaverseAPI = require('./megaverseAPI');

const candidateId = '73c64d58-0923-4c99-ae02-10c78273037f';
const api = new MegaverseAPI(candidateId);

async function getGoalMap() {
    try {
        const goalMapResponse = await api.retrieveGoalMap();
        console.log('Goal Map:', goalMapResponse);
        return goalMapResponse.goal;
    } catch (error) {
        console.error('Failed to retrieve goal map:', error);
    }
}

async function createLogoFromGoalMap(api, goalMap) {
    if (!goalMap) {
        console.log("Goal map is undefined.");
        return;
    }

    for (let row = 0; row < goalMap.length; row++) {
        for (let col = 0; col < goalMap[row].length; col++) {
            const entity = goalMap[row][col];

            if (entity === 'SPACE') continue;

            if (entity === 'POLYANET') {
                await api.deletePolyanet(row, col);
                await api.createPolyanet(row, col);
            } else if (entity.endsWith('_SOLOON')) {
                const color = entity.split('_')[0].toLowerCase();
                await api.deleteSoloon(row, col);
                await api.createSoloon(row, col, color);
            } else if (entity.endsWith('_COMETH')) {
                const direction = entity.split('_')[0].toLowerCase();
                await api.deleteSoloon(row, col);
                await api.createCometh(row, col, direction);
            }
        }
    }
}

async function initiateLogoCreation() {
    const goalMap = await getGoalMap();
    if (goalMap) {
        await createLogoFromGoalMap(api, goalMap);
    } else {
        console.log("Could not retrieve goal map. Logo creation aborted.");
    }
}

initiateLogoCreation();
