
function calculateStats() {
    const playerLevel = document.getElementById('playerLevel').value;
    const fruitType = document.getElementById('fruitType').value;
    const combatStyle = document.getElementById('combatStyle').value;
    const gameMode = document.getElementById('gameMode').value;

    let meleePoints = 0;
    let defensePoints = 0;
    let swordPoints = 0;
    let gunPoints = 0;
    let fruitPoints = 0;

    // Calculate points based on the player's level
    if (playerLevel >= 1000) {
        fruitPoints = Math.floor(playerLevel * 0.4);
        meleePoints = Math.floor(playerLevel * 0.3);
        defensePoints = Math.floor(playerLevel * 0.2);
        swordPoints = Math.floor(playerLevel * 0.1);
    } else {
        fruitPoints = Math.floor(playerLevel * 0.5);
        meleePoints = Math.floor(playerLevel * 0.3);
        defensePoints = Math.floor(playerLevel * 0.1);
        swordPoints = Math.floor(playerLevel * 0.1);
    }

    // Adjust points based on fruit type and combat style
    if (fruitType === 'logia') {
        fruitPoints *= 1.2;
    } else if (fruitType === 'paramecia') {
        fruitPoints *= 1.1;
    }

    if (combatStyle === 'fruit') {
        fruitPoints += Math.floor(playerLevel * 0.2);
    } else if (combatStyle === 'melee') {
        meleePoints += Math.floor(playerLevel * 0.3);
    }

    // Display results in the page
    document.getElementById('meleePoints').textContent = meleePoints;
    document.getElementById('defensePoints').textContent = defensePoints;
    document.getElementById('swordPoints').textContent = swordPoints;
    document.getElementById('gunPoints').textContent = gunPoints;
    document.getElementById('fruitPoints').textContent = fruitPoints;

    // Update stat bars
    document.getElementById('meleeFill').style.width = meleePoints + '%';
    document.getElementById('defenseFill').style.width = defensePoints + '%';
    document.getElementById('swordFill').style.width = swordPoints + '%';
    document.getElementById('gunFill').style.width = gunPoints + '%';
    document.getElementById('fruitFill').style.width = fruitPoints + '%';

    // Summary description
    let summaryText = "Your build is a " + gameMode + " focused build.";
    document.getElementById('buildDescription').textContent = summaryText;
}
