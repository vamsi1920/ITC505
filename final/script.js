const grid = [];
const gridSize = 5;
let presetPattern;

function initializeGrid(level) {
    const container = document.querySelector('.container');
    container.innerHTML = ''; 

    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            const light = document.createElement('div');
            light.classList.add('light');
            light.dataset.row = i;
            light.dataset.col = j;

            if (level === 'easy') {
                light.classList.toggle('on', Math.random() < 0.5);
                light.addEventListener('click', toggleLightEasy);
            } else {
                light.classList.toggle('on', presetPattern[i][j] === 1);
                light.addEventListener('click', toggleLight);
            }

            container.appendChild(light);
            grid[i][j] = light;
        }
    }

    document.getElementById('currentLevel').textContent = level.charAt(0).toUpperCase() + level.slice(1);
}

function toggleLightEasy(event) {
    const light = event.target;
    light.classList.toggle('on');
    playSound(light.classList.contains('on') ? 'onSound' : 'offSound');
    checkWin();
}

function toggleLight(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    toggleState(row, col);
    toggleState(row - 1, col); 
    toggleState(row + 1, col); 
    toggleState(row, col - 1); 
    toggleState(row, col + 1); 

    playSound('offSound'); 
    checkWin();
}

function toggleState(row, col) {
    if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
        const light = grid[row][col];
        light.classList.toggle('on');
    }
}

function checkWin() {
    const allLightsOff = grid.every(row => row.every(light => !light.classList.contains('on')));
    if (allLightsOff) {
        alert('You Win!');
    }
}

function resetGame() {
    initializeGrid('easy');
}

function setLevel(level) {
    if (level === 'hard') {
        presetPattern = generateRandomPattern();
    }
    initializeGrid(level);
}

function generateRandomPattern() {
    const pattern = [];
    for (let i = 0; i < gridSize; i++) {
        pattern[i] = [];
        for (let j = 0; j < gridSize; j++) {
            pattern[i][j] = Math.random() < 0.5 ? 0 : 1; 
        }
    }
    return pattern;
}

function toggleAddendum() {
    const addendumContainer = document.getElementById('addendumContainer');
    addendumContainer.classList.toggle('hidden');
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0; 
    sound.play();
}

document.getElementById('addendumButton').addEventListener('click', toggleAddendum);

window.onload = resetGame;

function toggleAddendum() {
    const addendum = document.getElementById('addendum');
    addendum.classList.toggle('hidden');
}
document.getElementById('addendumButton').addEventListener('click', toggleAddendum);