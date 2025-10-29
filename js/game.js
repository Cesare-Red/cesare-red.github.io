// Gestione principale del gioco
class Game {
    constructor() {
        this.currentLevel = 1;
        this.selectedCharacter = null;
        this.party = [];
        this.inventory = [];
        this.gameState = 'menu';
        this.playerStats = {
            level: 1,
            exp: 0,
            gold: 100
        };
        this.gameTime = 0;
        this.enemiesDefeated = 0;
        this.quizScore = 0;
    }

    init() {
        this.loadGameData();
        this.setupEventListeners();
        this.startGameTimer();
        console.log('Gioco inizializzato!');
    }

    loadGameData() {
        // Carica dati personaggi
        this.characters = {
            valentina: {
                name: "Valentina",
                class: "Maga del Tutto-Tranne",
                quote: "Gioco a tutto, tranne a quello.",
                stats: {
                    vitality: 70,
                    mana: 100,
                    charisma: 85,
                    luck: 60,
                    intelligence: 90,
                    dexterity: 65,
                    strength: 50,
                    maxHealth: 70,
                    maxMana: 100,
                    currentHealth: 70,
                    currentMana: 100
                },
                equipment: {
                    cloak: "Mantello del Multigioco",
                    weapon: "Bacchetta del Caos Ordinato",
                    special: "Joystick Arcano",
                    magical: "Tomo del Tutto-Tranne"
                },
                abilities: {
                    basic: [
                        {
                            name: "Multicast",
                            description: "Lancia due incantesimi, ma a caso. Uno funziona, l'altro al 50% di potenza.",
                            cost: 40,
                            type: "magic",
                            effect: "multi_target"
                        },
                        {
                            name: "Palla di Fuoco",
                            description: "Lancia una palla di fuoco che può infliggere lo status 'Scotta?'.",
                            cost: 25,
                            type: "fire",
                            effect: "damage_burn"
                        },
                        {
                            name: "Firewall di Guacamole",
                            description: "Crea una barriera che riduce del 50% i danni magici per 2 turni.",
                            cost: 30,
                            type: "defense",
                            effect: "party_shield"
                        }
                    ],
                    unlockable: [
                        {
                            name: "Grande Invocazione",
                            description: "Evoca miniature di altri universi videoludici che attaccano tutti i nemici.",
                            cost: 60,
                            type: "summon",
                            effect: "area_damage",
                            unlocked: false
                        },
                        {
                            name: "Liberazione del Tutto-Tranne",
                            description: "Cura tutti gli alleati da condizioni negative, ma applica nuovi malus casuali.",
                            cost: 50,
                            type: "support",
                            effect: "mass_cleanse",
                            unlocked: false
                        }
                    ]
                }
            },
            vincenzo: {
                name: "Vincenzo",
                class: "Artificiere Digitale",
                quote: "Se non funziona, lo ricompilo.",
                stats: {
                    vitality: 75,
                    mana: 80,
                    charisma: 70,
                    luck: 65,
                    intelligence: 95,
                    dexterity: 75,
                    strength: 60,
                    maxHealth: 75,
                    maxMana: 80,
                    currentHealth: 75,
                    currentMana: 80
                },
                equipment: {
                    gloves: "Guanti del Debug",
                    weapon: "Chiave inglese quantistica",
                    special: "Zaino con mini-server",
                    magical: "Visore a Realtà Mista"
                },
                abilities: {
                    basic: [
                        {
                            name: "Scarica Neurale",
                            description: "Infligge danni a tutti i nemici in base all'Intelligenza.",
                            cost: 35,
                            type: "lightning",
                            effect: "area_damage"
                        },
                        {
                            name: "Hack del Sistema",
                            description: "Riduce del 25% la difesa di tutti i nemici per 2 turni.",
                            cost: 40,
                            type: "debuff",
                            effect: "defense_down"
                        },
                        {
                            name: "Compilazione d'Emergenza",
                            description: "Cura un alleato di 20 HP e rimuove un malus.",
                            cost: 30,
                            type: "support",
                            effect: "heal_cleanse"
                        }
                    ],
                    unlockable: [
                        {
                            name: "Overclock Finale",
                            description: "Potenzia tutto il team (+50% Forza e Magia per 3 turni).",
                            cost: 70,
                            type: "buff",
                            effect: "party_boost",
                            unlocked: false
                        },
                        {
                            name: "Virus Empatico",
                            description: "Duplica il danno subito e lo restituisce a chi l'ha inflitto.",
                            cost: 45,
                            type: "counter",
                            effect: "damage_reflect",
                            unlocked: false
                        }
                    ]
                }
            }
            // Altri personaggi con struttura simile...
        };

        // Dati dei livelli
        this.levels = {
            1: {
                theme: "minecraft",
                name: "Dimensione Minecraft",
                enemies: ["Zombie", "Skeleton", "Creeper", "Warden", "Wither"],
                boss: "Wither",
                quiz: "minecraft_quiz",
                completed: false
            },
            2: {
                theme: "breaking_bad",
                name: "ALBUQUERQUE - CRYSTAL QUEST",
                enemies: ["Tuco Salamanca", "Los Pollos Guerreros", "Meth Golem", "Gus Fring", "Skyler White"],
                boss: "Skyler White",
                quiz: "breaking_bad_quiz",
                completed: false
            },
            3: {
                theme: "harry_potter",
                name: "Hogwarts - La Bacchetta della Verità",
                enemies: ["Dementor", "Death Eater", "Basilisk", "Bellatrix", "Voldemort"],
                boss: "Voldemort",
                quiz: "harry_potter_quiz",
                completed: false
            }
        };

        // Inventario iniziale
        this.inventory = [
            { name: "Pozione di Cura", type: "consumable", effect: "heal", value: 30, count: 3 },
            { name: "Pozione di Mana", type: "consumable", effect: "mana", value: 25, count: 2 },
            { name: "Antidoto", type: "consumable", effect: "cleanse", value: 0, count: 1 }
        ];
    }

    setupEventListeners() {
        // Listener per il pulsante di inizio
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                window.location.href = 'characters.html';
            });
        }

        // Listener per selezione personaggi
        const characterButtons = document.querySelectorAll('.select-character');
        characterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const character = e.target.dataset.character;
                this.startGame(character);
            });
        });

        // Listener per navigazione tra personaggi
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        const dots = document.querySelectorAll('.dot');

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', this.showPreviousCharacter.bind(this));
            nextButton.addEventListener('click', this.showNextCharacter.bind(this));
            
            dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const character = e.target.dataset.character;
                    this.showCharacter(character);
                });
            });
        }
    }

    startGame(character) {
        this.selectedCharacter = character;
        this.party = [this.characters[character]];
        this.currentLevel = 1;
        this.saveGame();
        this.navigateToLevel(1);
    }

    navigateToLevel(level) {
        window.location.href = `level${level}.html`;
    }

    showCharacter(character) {
        const details = document.querySelectorAll('.character-detail');
        const dots = document.querySelectorAll('.dot');
        
        details.forEach(detail => {
            detail.classList.remove('active');
            if (detail.dataset.character === character) {
                detail.classList.add('active');
            }
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.character === character) {
                dot.classList.add('active');
            }
        });
    }

    showNextCharacter() {
        const characters = ['valentina', 'vincenzo', 'federica', 'bardo', 'paladina', 'william'];
        const current = document.querySelector('.character-detail.active').dataset.character;
        const currentIndex = characters.indexOf(current);
        const nextIndex = (currentIndex + 1) % characters.length;
        this.showCharacter(characters[nextIndex]);
    }

    showPreviousCharacter() {
        const characters = ['valentina', 'vincenzo', 'federica', 'bardo', 'paladina', 'william'];
        const current = document.querySelector('.character-detail.active').dataset.character;
        const currentIndex = characters.indexOf(current);
        const prevIndex = (currentIndex - 1 + characters.length) % characters.length;
        this.showCharacter(characters[prevIndex]);
    }

    startGameTimer() {
        setInterval(() => {
            this.gameTime++;
        }, 1000);
    }

    saveGame() {
        const gameData = {
            selectedCharacter: this.selectedCharacter,
            party: this.party,
            inventory: this.inventory,
            playerStats: this.playerStats,
            currentLevel: this.currentLevel,
            gameTime: this.gameTime,
            enemiesDefeated: this.enemiesDefeated,
            quizScore: this.quizScore
        };
        localStorage.setItem('electricBus0Game', JSON.stringify(gameData));
    }

    loadGame() {
        const savedGame = localStorage.getItem('electricBus0Game');
        if (savedGame) {
            const gameData = JSON.parse(savedGame);
            this.selectedCharacter = gameData.selectedCharacter;
            this.party = gameData.party;
            this.inventory = gameData.inventory;
            this.playerStats = gameData.playerStats;
            this.currentLevel = gameData.currentLevel;
            this.gameTime = gameData.gameTime;
            this.enemiesDefeated = gameData.enemiesDefeated;
            this.quizScore = gameData.quizScore;
            return true;
        }
        return false;
    }

    completeLevel() {
        this.levels[this.currentLevel].completed = true;
        this.playerStats.exp += 100;
        this.playerStats.gold += 50;
        
        // Check for level up
        if (this.playerStats.exp >= this.playerStats.level * 100) {
            this.playerStats.level++;
            this.playerStats.exp = 0;
            // Migliora statistiche del personaggio
            this.improveCharacterStats();
        }
        
        this.currentLevel++;
        this.saveGame();
        
        if (this.currentLevel <= 3) {
            this.navigateToLevel(this.currentLevel);
        } else {
            this.victory();
        }
    }

    improveCharacterStats() {
        if (this.selectedCharacter && this.party[0]) {
            const character = this.party[0];
            // Migliora tutte le statistiche del 5%
            Object.keys(character.stats).forEach(stat => {
                if (typeof character.stats[stat] === 'number') {
                    character.stats[stat] = Math.floor(character.stats[stat] * 1.05);
                }
            });
        }
    }

    victory() {
        window.location.href = 'victory.html';
    }

    // Metodo per il combattimento
    battle(enemy) {
        const battle = new Battle(this.party, enemy);
        return battle.start();
    }

    // Metodo per i quiz
    takeQuiz(quizType) {
        const quiz = new Quiz(quizType);
        return quiz.start();
    }
}

// Inizializzazione del gioco
const game = new Game();
document.addEventListener('DOMContentLoaded', () => {
    game.init();
    
    // Carica il gioco salvato se esiste
    if (game.loadGame()) {
        console.log('Gioco caricato con successo!');
    }
});