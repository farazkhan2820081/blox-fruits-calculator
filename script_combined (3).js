
// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Mobile menu toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Calculator Functions
function calculateStats() {
    const levelInput = document.getElementById('playerLevel');
    const fruitTypeInput = document.getElementById('fruitType');
    const combatStyleInput = document.getElementById('combatStyle');
    const gameModeInput = document.getElementById('gameMode');
    
    // Check if elements exist before getting values
    if (!levelInput || !fruitTypeInput || !combatStyleInput || !gameModeInput) {
        console.log('Calculator elements not found on this page');
        return;
    }
    
    const level = parseInt(levelInput.value) || 2550;
    const fruitType = fruitTypeInput.value;
    const combatStyle = combatStyleInput.value;
    const gameMode = gameModeInput.value;
    
    // Calculate available stat points (level - 1) * 3
    const totalPoints = (level - 1) * 3;
    
    // Initialize stat distribution
    let stats = {
        melee: 0,
        defense: 0,
        sword: 0,
        gun: 0,
        fruit: 0
    };
    
    // Base defense allocation based on game mode
    const baseDefense = gameMode === 'pvp' ? Math.floor(totalPoints * 0.25) : 
                       gameMode === 'pve' ? Math.floor(totalPoints * 0.15) :
                       gameMode === 'raid' ? Math.floor(totalPoints * 0.35) :
                       Math.floor(totalPoints * 0.20); // balanced
    
    stats.defense = Math.min(baseDefense, 2550);
    let remainingPoints = totalPoints - stats.defense;
    
    // Allocate points based on combat style
    switch (combatStyle) {
        case 'fruit':
            stats.fruit = Math.min(remainingPoints, 2550);
            remainingPoints -= stats.fruit;
            break;
            
        case 'sword':
            stats.sword = Math.min(remainingPoints, 2550);
            remainingPoints -= stats.sword;
            break;
            
        case 'melee':
            stats.melee = Math.min(remainingPoints, 2550);
            remainingPoints -= stats.melee;
            break;
            
        case 'gun':
            stats.gun = Math.min(remainingPoints, 2550);
            remainingPoints -= stats.gun;
            break;
            
        case 'hybrid':
            // Split between two main stats
            const primaryStat = Math.floor(remainingPoints * 0.6);
            const secondaryStat = Math.floor(remainingPoints * 0.4);
            
            if (fruitType !== 'none') {
                stats.fruit = Math.min(primaryStat, 2550);
                stats.sword = Math.min(secondaryStat, 2550);
            } else {
                stats.sword = Math.min(primaryStat, 2550);
                stats.melee = Math.min(secondaryStat, 2550);
            }
            remainingPoints = totalPoints - stats.defense - stats.fruit - stats.sword - stats.melee;
            break;
    }
    
    // Distribute any remaining points
    if (remainingPoints > 0) {
        const mainStat = combatStyle === 'fruit' ? 'fruit' :
                        combatStyle === 'sword' ? 'sword' :
                        combatStyle === 'melee' ? 'melee' :
                        combatStyle === 'gun' ? 'gun' : 'defense';
        
        if (combatStyle !== 'hybrid') {
            stats[mainStat] = Math.min(stats[mainStat] + remainingPoints, 2550);
        }
    }
    
    // Update UI
    updateStatsDisplay(stats, totalPoints);
    updateBuildDescription(stats, combatStyle, fruitType, gameMode);
    
    // Add animation
    const resultsElement = document.getElementById('results');
    if (resultsElement) {
        resultsElement.classList.add('fade-in');
    }
}

// Update stats display
function updateStatsDisplay(stats, totalPoints) {
    const maxStat = 2550;
    
    // Update stat values and bars
    Object.keys(stats).forEach(stat => {
        const valueElement = document.getElementById(stat + 'Points');
        const fillElement = document.getElementById(stat + 'Fill');
        
        if (valueElement && fillElement) {
            valueElement.textContent = stats[stat];
            const percentage = (stats[stat] / maxStat) * 100;
            fillElement.style.width = percentage + '%';
        }
    });
}

// Update build description
function updateBuildDescription(stats, combatStyle, fruitType, gameMode) {
    const buildDescElement = document.getElementById('buildDescription');
    if (!buildDescElement) return;
    
    let description = `<strong>Build Type:</strong> ${combatStyle.charAt(0).toUpperCase() + combatStyle.slice(1)} ${gameMode.toUpperCase()}<br>`;
    
    if (fruitType !== 'none') {
        description += `<strong>Fruit Category:</strong> ${fruitType.charAt(0).toUpperCase() + fruitType.slice(1)}<br>`;
    }
    
    description += `<strong>Main Focus:</strong> `;
    
    const highestStat = Object.keys(stats).reduce((a, b) => stats[a] > stats[b] ? a : b);
    const recommendations = {
        melee: "Excellent for Fighting Style users. Focus on combat mastery and close-range damage.",
        defense: "Tanky build perfect for raids and survivability. Great for supporting teams.",
        sword: "Optimal for sword users. High damage output with good versatility.",
        gun: "Specialized ranged combat. Effective for kiting and long-range engagements.",
        fruit: "Devil Fruit mastery build. Maximum ability damage and fruit potential."
    };
    
    description += recommendations[highestStat] || "Balanced approach for versatile gameplay.";
    
    // Add gameplay tips
    description += `<br><br><strong>Gameplay Tips:</strong><br>`;
    
    if (gameMode === 'pvp') {
        description += "• Focus on combo potential and mobility<br>";
        description += "• Practice timing and prediction<br>";
        description += "• Consider awakened fruits for maximum damage";
    } else if (gameMode === 'pve') {
        description += "• Prioritize AoE damage for mob clearing<br>";
        description += "• Use elemental fruits for immunity<br>";
        description += "• Focus on farming efficiency";
    } else if (gameMode === 'raid') {
        description += "• High defense for boss damage<br>";
        description += "• Coordinate with team members<br>";
        description += "• Use fruits with good crowd control";
    } else {
        description += "• Versatile build for all content<br>";
        description += "• Good starting point for new players<br>";
        description += "• Easy to adjust as you progress";
    }
    
    buildDescElement.innerHTML = description;
}

// Leveling Calculator Function
function calculateLeveling() {
    const level = parseInt(document.getElementById('playerLevel').value);
    const fruit = document.getElementById('fruitType').value;
    const grindMethod = document.getElementById('grindMethod').value;
    let location = '';
    let tips = '';

    if (level >= 1 && level <= 100) {
        location = 'Starter Island, Pirate Village';
        tips = 'Focus on completing early quests and clearing lower-level enemies. For group grinding, team up with others to clear mobs faster.';
    } else if (level > 100 && level <= 500) {
        location = 'Jungle, Desert, Frozen Village';
        tips = 'You can now start farming more advanced mobs. Utilize AoE abilities for faster grinding.';
    } else if (level > 500 && level <= 1000) {
        location = 'Second Sea for tougher mobs';
        tips = 'Join a group to farm the tougher mobs in the Second Sea. Use fast fruits like Light or Magma for mobility.';
    } else {
        location = 'Third Sea or Raids';
        tips = 'Now is the time to tackle difficult bosses and elite mobs. Focus on efficient farming with high damage output and survivability.';
    }

    // Display results
    document.getElementById('farmingLocation').textContent = `Best Farming Location: ${location}`;
    document.getElementById('grindTips').textContent = `Grinding Tips: ${tips}`;
    document.getElementById('results').style.display = 'block';
}
