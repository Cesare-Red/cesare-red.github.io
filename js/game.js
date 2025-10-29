// Gestione principale del gioco - VERSIONE CORRETTA
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
        console.log('Gioco Dark Souls inizializzato!');
    }

    loadGameData() {
        // Carica dati personaggi COMPLETI con tutti e 6 i personaggi
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
                            description: "Lancia una palla di fuoco che può infliggere lo status 'Scotty?'.",
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
                // ... resto delle proprietà
            },
            cesare: {  // CORRETTO: da federica a cesare
                name: "Cesare",
                class: "Araldo dell'Assenza Strategica",
                quote: "Io non faccio tardi, non mi presento.",
                stats: {
                    vitality: 65,
                    mana: 70,
                    charisma: 75,
                    luck: 80,
                    intelligence: 60,
                    dexterity: 55,
                    strength: 45,
                    maxHealth: 65,
                    maxMana: 70,
                    currentHealth: 65,
                    currentMana: 70
                },
                equipment: {
                    hat: "Cappello dell'Inutilità Regale",
                    weapon: "Trombetta del Nulla", 
                    special: "Calendario dei Forse",
                    magical: "Clessidra che scorre all'indietro"
                },
                abilities: {
                    basic: [
                        {
                            name: "Annuncio in Ritardo",
                            description: "Infligge confusione a tutti i nemici per 2 turni e ai membri del party per 1.",
                            cost: 25,
                            type: "debuff",
                            effect: "confusion"
                        },
                        {
                            name: "Scomparsa Scenica",
                            description: "Diventa intangibile per 2 turno, ma non può eseguire altre azioni.",
                            cost: 30,
                            type: "defense",
                            effect: "invulnerability"
                        },
                        {
                            name: "Rinvio Eroico",
                            description: "Posticipa a fine turno l'attacco di un nemico.",
                            cost: 20,
                            type: "control",
                            effect: "delay_attack"
                        }
                    ],
                    unlockable: [
                        {
                            name: "Assenza Totale",
                            description: "Scompare per 2 turni, al suo ritorno tutti gli alleati recuperano 50HP.",
                            cost: 40,
                            type: "support",
                            effect: "mass_heal",
                            unlocked: false
                        },
                        {
                            name: "Richiamo del Silenzio",
                            description: "Disattiva tutte le abilità degli avversari per questo turno.",
                            cost: 50,
                            type: "control", 
                            effect: "silence",
                            unlocked: false
                        }
                    ]
                }
            },
            bardo: {
                name: "Il Tardo Bardo",
                class: "Maestro del Ritardo Armonico",
                quote: "Non stono, invento nuove note.",
                stats: {
                    vitality: 60,
                    mana: 90,
                    charisma: 95,
                    luck: 70,
                    intelligence: 65,
                    dexterity: 75,
                    strength: 40,
                    maxHealth: 60,
                    maxMana: 90,
                    currentHealth: 60,
                    currentMana: 90
                },
                // ... resto delle proprietà
            },
            paladina: {
                name: "Paladina del Buffet",
                class: "Eroina del Carboidrato", 
                quote: "In nome del carboidrato, io ti assolvo!",
                stats: {
                    vitality: 90,
                    mana: 50,
                    charisma: 80,
                    luck: 65,
                    intelligence: 55,
                    dexterity: 45,
                    strength: 85,
                    maxHealth: 90,
                    maxMana: 50,
                    currentHealth: 90,
                    currentMana: 50
                },
                // ... resto delle proprietà
            },
            william: {
                name: "William",
                class: "Ladro Immigrato",
                quote: "Io non rubo, redistribuisco... geograficamente.",
                stats: {
                    vitality: 65,
                    mana: 60,
                    charisma: 70,
                    luck: 90,
                    intelligence: 75,
                    dexterity: 95,
                    strength: 55,
                    maxHealth: 65,
                    maxMana: 60,
                    currentHealth: 65,
                    currentMana: 60
                },
                // ... resto delle proprietà
            }
        };

        // Dati dei livelli
        this.levels = {
            1: {
                theme: "minecraft",
                name: "Anello del Blocco Perduto",
                enemies: ["Zombie", "Skeleton", "Creeper", "Warden", "Wither"],
                boss: "Wither",
                quiz: "minecraft_quiz",
                completed: false
            },
            2: {
                theme: "breaking_bad",
                name: "Città della Cristallina Corrotta", 
                enemies: ["Tuco Salamanca", "Los Pollos Guerreros", "Meth Golem", "Gus Fring", "Skyler White"],
                boss: "Skyler White",
                quiz: "breaking_bad_quiz",
                completed: false
            },
            3: {
                theme: "harry_potter", 
                name: "Archidragon di Hogwarts",
                enemies: ["Dementor", "Death Eater", "Basilisk", "Bellatrix", "Voldemort"],
                boss: "Voldemort",
                quiz: "harry_potter_quiz",
                completed: false
            }
        };

        // Inventario iniziale
        this.inventory = [
            { name: "Fiala di Estus", type: "consumable", effect: "heal", value: 30, count: 3 },
            { name: "Fiala di Estus Azzurra", type: "consumable", effect: "mana", value: 25, count: 2 },
            { name: "Erba Medicinale", type: "consumable", effect: "cleanse", value: 0, count: 1 }
        ];
    }

    setupEventListeners() {
        // Listener per il pulsante di inizio nella home
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                window.location.href = 'characters.html';
            });
        }

        // Listener per selezione personaggi - CORRETTO
        const characterButtons = document.querySelectorAll('.select-character');
        characterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const character = e.target.dataset.character;
                this.selectCharacter(character);
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

    // METODO CORRETTO per selezionare il personaggio
    selectCharacter(character) {
        console.log('Selezionato personaggio:', character);
        this.selectedCharacter = character;
        this.party = [this.characters[character]];
        this.currentLevel = 1;
        
        // Salva e naviga
        this.saveGame();
        this.navigateToLevel(1);
        
        // Effetto visivo di conferma
        const button = document.querySelector(`[data-character="${character}"]`);
        if (button) {
            button.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                button.style.animation = '';
            }, 500);
        }
    }

    navigateToLevel(level) {
        console.log('Navigazione al livello:', level);
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
        const characters = ['valentina', 'vincenzo', 'cesare', 'bardo', 'paladina', 'william'];
        const currentElement = document.querySelector('.character-detail.active');
        if (!currentElement) return;
        
        const current = currentElement.dataset.character;
        const currentIndex = characters.indexOf(current);
        const nextIndex = (currentIndex + 1) % characters.length;
        this.showCharacter(characters[nextIndex]);
    }

    showPreviousCharacter() {
        const characters = ['valentina', 'vincenzo', 'cesare', 'bardo', 'paladina', 'william'];
        const currentElement = document.querySelector('.character-detail.active');
        if (!currentElement) return;
        
        const current = currentElement.dataset.character;
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
        console.log('Gioco salvato:', gameData);
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
            Object.keys(character.stats).forEach(stat => {
                if (typeof character.stats[stat] === 'number' && stat !== 'maxHealth' && stat !== 'maxMana') {
                    character.stats[stat] = Math.floor(character.stats[stat] * 1.05);
                }
            });
        }
    }

    victory() {
        window.location.href = 'victory.html';
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