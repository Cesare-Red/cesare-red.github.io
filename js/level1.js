// Gestione specifica del Livello 1 (Minecraft)
class Level1 {
    constructor() {
        this.enemies = this.generateEnemies();
        this.currentEnemy = null;
        this.merchants = this.generateMerchants();
        this.quizQuestions = this.generateQuiz();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startExploration();
        this.updateUI();
    }

    generateEnemies() {
        return [
            {
                name: "Zombie",
                type: "undead",
                level: 1,
                stats: {
                    health: 50,
                    maxHealth: 50,
                    attack: 15,
                    defense: 5,
                    speed: 3
                },
                abilities: [
                    {
                        name: "Morso",
                        damage: 10,
                        effect: null
                    },
                    {
                        name: "Graffio",
                        damage: 8,
                        effect: "sanguinamento"
                    }
                ],
                drops: [
                    { name: "Carne Marcia", type: "consumable", chance: 0.7 },
                    { name: "Pepita di Ferro", type: "material", chance: 0.4 }
                ],
                sprite: "zombie"
            },
            {
                name: "Skeleton",
                type: "undead",
                level: 2,
                stats: {
                    health: 40,
                    maxHealth: 40,
                    attack: 20,
                    defense: 3,
                    speed: 6
                },
                abilities: [
                    {
                        name: "Freccia",
                        damage: 12,
                        effect: null
                    },
                    {
                        name: "Pioggia di Frecce",
                        damage: 8,
                        effect: "area_damage"
                    }
                ],
                drops: [
                    { name: "Osso", type: "material", chance: 0.8 },
                    { name: "Arco", type: "weapon", chance: 0.3 }
                ],
                sprite: "skeleton"
            },
            {
                name: "Creeper",
                type: "explosive",
                level: 3,
                stats: {
                    health: 35,
                    maxHealth: 35,
                    attack: 25,
                    defense: 2,
                    speed: 4
                },
                abilities: [
                    {
                        name: "Esplosione",
                        damage: 30,
                        effect: "self_destruct",
                        special: "Infligge 10 danni a tutti quando muore"
                    }
                ],
                drops: [
                    { name: "Polvere da Sparo", type: "material", chance: 1.0 },
                    { name: "Testa di Creeper", type: "trophy", chance: 0.1 }
                ],
                sprite: "creeper"
            },
            {
                name: "Warden",
                type: "boss",
                level: 5,
                stats: {
                    health: 200,
                    maxHealth: 200,
                    attack: 35,
                    defense: 15,
                    speed: 2
                },
                abilities: [
                    {
                        name: "Ruggito Sismico",
                        damage: 20,
                        effect: "stun"
                    },
                    {
                        name: "Colpo Sonico",
                        damage: 25,
                        effect: "confusion"
                    },
                    {
                        name: "Furia delle Profondità",
                        damage: 40,
                        effect: "area_damage",
                        special: "Usabile sotto il 50% di HP"
                    }
                ],
                drops: [
                    { name: "Catalizzatore delle Profondità", type: "magic", chance: 1.0 },
                    { name: "Cuore del Warden", type: "trophy", chance: 0.5 }
                ],
                sprite: "warden"
            },
            {
                name: "Wither",
                type: "final_boss",
                level: 8,
                stats: {
                    health: 300,
                    maxHealth: 300,
                    attack: 40,
                    defense: 20,
                    speed: 5
                },
                abilities: [
                    {
                        name: "Skull Barrage",
                        damage: 15,
                        effect: "multi_hit"
                    },
                    {
                        name: "Wither Aura",
                        damage: 10,
                        effect: "poison",
                        special: "Danno continuo ogni turno"
                    },
                    {
                        name: "Apocalypse",
                        damage: 50,
                        effect: "area_damage",
                        special: "Attacco finale sotto il 25% di HP"
                    }
                ],
                drops: [
                    { name: "Stella Nether", type: "legendary", chance: 1.0 },
                    { name: "Teschio del Wither", type: "trophy", chance: 1.0 }
                ],
                sprite: "wither"
            }
        ];
    }

    generateMerchants() {
        return [
            {
                name: "Villager",
                type: "general",
                trades: [
                    {
                        give: { name: "Smeraldo", quantity: 1 },
                        get: { name: "Pozione di Cura", quantity: 1 }
                    },
                    {
                        give: { name: "Carne", quantity: 3 },
                        get: { name: "Freccia", quantity: 5 }
                    },
                    {
                        give: { name: "Pepita di Ferro", quantity: 5 },
                        get: { name: "Spada di Ferro", quantity: 1 }
                    }
                ],
                dialogue: [
                    "Hmm...",
                    "Trade?",
                    "Good deal!",
                    "Hrrrm..."
                ]
            }
        ];
    }

    generateQuiz() {
        return [
            {
                question: "In Rocket League, qual è il punteggio massimo che si può raggiungere in una partita?",
                options: [
                    "Infinito - le partite continuano finché non si segna",
                    "10 goal - poi la partita finisce automaticamente",
                    "Non c'è un limite massimo di punteggio",
                    "100 goal - raggiunti i 100 finisce la partita"
                ],
                correctAnswer: 2,
                explanation: "In Rocket League non c'è un limite massimo di punteggio! Le partite durano 5 minuti e possono finire con qualsiasi punteggio."
            },
            {
                question: "In Dark Souls, qual è il primo boss che incontri nell'Asylum?",
                options: [
                    "Gwyn, Signore della Cenere",
                    "Ornstein lo Spadaccino",
                    "Asylum Demon",
                    "Il Grande Lupo Sif"
                ],
                correctAnswer: 2,
                explanation: "Asylum Demon è il primo boss che tutti i giocatori incontrano all'inizio del loro viaggio a Lordran!"
            },
            {
                question: "Crash Bandicoot è stato creato da quale azienda?",
                options: [
                    "Nintendo",
                    "Sega", 
                    "Naughty Dog",
                    "Ubisoft"
                ],
                correctAnswer: 2,
                explanation: "Crash Bandicoot è stato creato da Naughty Dog, che all'epoca sviluppava per PlayStation!"
            },
            {
                question: "In Hollow Knight, come si chiama il protagonista muto?",
                options: [
                    "The Knight",
                    "Hollow Knight",
                    "Ghost",
                    "Little Bug"
                ],
                correctAnswer: 2,
                explanation: "Il protagonista è conosciuto come 'The Knight' o 'Ghost', mentre 'Hollow Knight' è un boss importante!"
            }
        ];
    }

    setupEventListeners() {
        // Pulsanti di esplorazione
        const exploreButtons = document.querySelectorAll('.explore-button');
        exploreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleExploration(action);
            });
        });

        // Pulsanti di combattimento
        const attackBtn = document.querySelector('.attack-button');
        const skillBtn = document.querySelector('.skill-button');
        const itemBtn = document.querySelector('.item-button');
        const fleeBtn = document.querySelector('.flee-button');

        if (attackBtn) attackBtn.addEventListener('click', () => this.playerAttack());
        if (skillBtn) skillBtn.addEventListener('click', () => this.openSkillsMenu());
        if (itemBtn) skillBtn.addEventListener('click', () => this.openInventory());
        if (fleeBtn) fleeBtn.addEventListener('click', () => this.attemptFlee());

        // Pulsante indietro nel menu abilità
        const backBtn = document.querySelector('.back-button');
        if (backBtn) backBtn.addEventListener('click', () => this.closeSkillsMenu());
    }

    startExploration() {
        const battleScene = document.querySelector('.battle-scene');
        const explorationScene = document.querySelector('.exploration-scene');
        const quizSection = document.querySelector('.quiz-section');

        if (battleScene) battleScene.classList.add('hidden');
        if (explorationScene) explorationScene.classList.remove('hidden');
        if (quizSection) quizSection.classList.add('hidden');
    }

    handleExploration(action) {
        switch(action) {
            case 'explore':
                this.randomEncounter();
                break;
            case 'merchant':
                this.findMerchant();
                break;
            case 'boss':
                this.startBossBattle();
                break;
        }
    }

    randomEncounter() {
        // 70% possibilità di incontrare un nemico normale, 30% di trovare un tesoro
        if (Math.random() < 0.7) {
            const randomEnemy = this.getRandomEnemy('normal');
            this.startBattle(randomEnemy);
        } else {
            this.findTreasure();
        }
    }

    getRandomEnemy(type) {
        let availableEnemies;
        
        switch(type) {
            case 'normal':
                availableEnemies = this.enemies.filter(e => e.type !== 'boss' && e.type !== 'final_boss');
                break;
            case 'boss':
                availableEnemies = this.enemies.filter(e => e.type === 'boss');
                break;
            case 'final_boss':
                availableEnemies = this.enemies.filter(e => e.type === 'final_boss');
                break;
            default:
                availableEnemies = this.enemies;
        }

        const randomIndex = Math.floor(Math.random() * availableEnemies.length);
        return JSON.parse(JSON.stringify(availableEnemies[randomIndex])); // Deep copy
    }

    startBattle(enemy) {
        this.currentEnemy = enemy;
        
        const battleScene = document.querySelector('.battle-scene');
        const explorationScene = document.querySelector('.exploration-scene');
        
        if (battleScene) battleScene.classList.remove('hidden');
        if (explorationScene) explorationScene.classList.add('hidden');

        this.updateBattleUI();
        this.addToBattleLog(`Un ${enemy.name} selvatico appare!`);
    }

    updateBattleUI() {
        if (!this.currentEnemy) return;

        const enemyName = document.getElementById('enemy-name');
        const enemyHealth = document.getElementById('enemy-health-text');
        const enemyHealthBar = document.getElementById('enemy-health-bar');
        const playerHealth = document.getElementById('player-health');
        const playerMana = document.getElementById('player-mana');

        if (enemyName) enemyName.textContent = this.currentEnemy.name;
        if (enemyHealth) enemyHealth.textContent = `HP: ${this.currentEnemy.stats.health}/${this.currentEnemy.stats.maxHealth}`;
        if (enemyHealthBar) enemyHealthBar.style.width = `${(this.currentEnemy.stats.health / this.currentEnemy.stats.maxHealth) * 100}%`;

        // Aggiorna statistiche giocatore
        if (game.party[0]) {
            const player = game.party[0];
            if (playerHealth) playerHealth.textContent = player.stats.currentHealth;
            if (playerMana) playerMana.textContent = player.stats.currentMana;
        }
    }

    playerAttack() {
        if (!this.currentEnemy || !game.party[0]) return;

        const player = game.party[0];
        const damage = Math.floor(player.stats.strength * (0.8 + Math.random() * 0.4));
        
        this.currentEnemy.stats.health -= damage;
        this.addToBattleLog(`${player.name} attacca e infligge ${damage} danni!`);
        
        this.updateBattleUI();
        
        if (this.currentEnemy.stats.health <= 0) {
            this.winBattle();
        } else {
            setTimeout(() => this.enemyTurn(), 1000);
        }
    }

    enemyTurn() {
        if (!this.currentEnemy || !game.party[0]) return;

        const enemy = this.currentEnemy;
        const player = game.party[0];
        
        // Scegli un'abilità casuale
        const ability = enemy.abilities[Math.floor(Math.random() * enemy.abilities.length)];
        const damage = Math.floor(ability.damage * (0.8 + Math.random() * 0.4));
        
        player.stats.currentHealth -= damage;
        this.addToBattleLog(`Il ${enemy.name} usa ${ability.name} e infligge ${damage} danni!`);
        
        this.updateBattleUI();
        
        if (player.stats.currentHealth <= 0) {
            this.gameOver();
        }
    }

    winBattle() {
        this.addToBattleLog(`Hai sconfitto il ${this.currentEnemy.name}!`);
        game.enemiesDefeated++;
        
        // Ricompense
        const expGain = this.currentEnemy.level * 10;
        const goldGain = this.currentEnemy.level * 5;
        
        game.playerStats.exp += expGain;
        game.playerStats.gold += goldGain;
        
        this.addToBattleLog(`Ottieni ${expGain} EXP e ${goldGain} oro!`);
        
        // Drop oggetti
        this.currentEnemy.drops.forEach(drop => {
            if (Math.random() < drop.chance) {
                this.addToBattleLog(`Trovi: ${drop.name}!`);
                // Aggiungi all'inventario
                game.inventory.push({...drop, count: 1});
            }
        });

        setTimeout(() => {
            this.startExploration();
            this.currentEnemy = null;
        }, 3000);
    }

    gameOver() {
        this.addToBattleLog(`Sei stato sconfitto...`);
        setTimeout(() => {
            if (confirm('Vuoi riprovare?')) {
                this.startExploration();
                // Resetta la salute del giocatore
                if (game.party[0]) {
                    game.party[0].stats.currentHealth = game.party[0].stats.maxHealth;
                    game.party[0].stats.currentMana = game.party[0].stats.maxMana;
                }
            } else {
                window.location.href = 'characters.html';
            }
        }, 2000);
    }

    addToBattleLog(message) {
        const battleLog = document.getElementById('battle-log');
        if (battleLog) {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.textContent = message;
            battleLog.appendChild(logEntry);
            battleLog.scrollTop = battleLog.scrollHeight;
        }
    }

    startBossBattle() {
        const boss = this.getRandomEnemy('final_boss');
        this.startBattle(boss);
    }

    findMerchant() {
        const merchant = this.merchants[0];
        this.addToBattleLog(`Incontri un ${merchant.name}!`);
        // Qui si potrebbe implementare un sistema di trading
        alert(`Il ${merchant.name} dice: "Hmm... Trade?"`);
    }

    findTreasure() {
        const treasures = [
            "Un forziere pieno d'oro!",
            "Una pozione magica!",
            "Una mappa del tesoro!",
            "Niente di interessante..."
        ];
        
        const found = treasures[Math.floor(Math.random() * treasures.length)];
        this.addToBattleLog(`Esplorando trovi: ${found}`);
    }

    openSkillsMenu() {
        const skillsMenu = document.querySelector('.skills-menu');
        const skillsList = document.getElementById('skills-list');
        
        if (skillsMenu && skillsList && game.party[0]) {
            skillsMenu.classList.remove('hidden');
            skillsList.innerHTML = '';
            
            const character = game.party[0];
            character.abilities.basic.forEach((ability, index) => {
                const skillButton = document.createElement('button');
                skillButton.className = 'skill-button anime-button';
                skillButton.innerHTML = `
                    <strong>${ability.name}</strong><br>
                    <small>${ability.description}</small><br>
                    <em>Costo: ${ability.cost} MP</em>
                `;
                skillButton.addEventListener('click', () => this.useSkill(index));
                skillsList.appendChild(skillButton);
            });
        }
    }

    closeSkillsMenu() {
        const skillsMenu = document.querySelector('.skills-menu');
        if (skillsMenu) {
            skillsMenu.classList.add('hidden');
        }
    }

    useSkill(skillIndex) {
        if (!game.party[0] || !this.currentEnemy) return;
        
        const character = game.party[0];
        const skill = character.abilities.basic[skillIndex];
        
        if (character.stats.currentMana < skill.cost) {
            this.addToBattleLog('Mana insufficiente!');
            return;
        }
        
        character.stats.currentMana -= skill.cost;
        this.closeSkillsMenu();
        
        // Implementa effetti dell'abilità
        this.addToBattleLog(`${character.name} usa ${skill.name}!`);
        
        // Simula danno dell'abilità
        const damage = Math.floor(character.stats.intelligence * (1 + Math.random() * 0.5));
        this.currentEnemy.stats.health -= damage;
        this.addToBattleLog(`Infligge ${damage} danni magici!`);
        
        this.updateBattleUI();
        
        if (this.currentEnemy.stats.health <= 0) {
            this.winBattle();
        } else {
            setTimeout(() => this.enemyTurn(), 1000);
        }
    }

    attemptFlee() {
        const success = Math.random() < 0.7; // 70% di successo
        if (success) {
            this.addToBattleLog('Fuga riuscita!');
            setTimeout(() => this.startExploration(), 1000);
        } else {
            this.addToBattleLog('Fuga fallita!');
            setTimeout(() => this.enemyTurn(), 1000);
        }
    }

    startQuiz() {
        const quizSection = document.querySelector('.quiz-section');
        const explorationScene = document.querySelector('.exploration-scene');
        
        if (quizSection) quizSection.classList.remove('hidden');
        if (explorationScene) explorationScene.classList.add('hidden');
        
        this.displayQuizQuestion();
    }

    displayQuizQuestion() {
        // Implementa la visualizzazione delle domande del quiz
        // Similarmente a quanto fatto per le battaglie
    }
}

// Inizializzazione del livello
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('level1.html')) {
        new Level1();
    }
});