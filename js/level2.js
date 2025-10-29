// Gestione specifica del Livello 2 (Breaking Bad)
class Level2 {
    constructor() {
        this.currentPhase = 1;
        this.enemies = this.generateEnemies();
        this.specialEvents = this.generateSpecialEvents();
        this.quizQuestions = this.generateQuiz();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startPhase(1);
        this.updateUI();
    }

    generateEnemies() {
        return {
            phase1: [
                {
                    name: "Tuco Salamanca",
                    type: "human",
                    level: 6,
                    stats: {
                        health: 120,
                        maxHealth: 120,
                        attack: 25,
                        defense: 8,
                        speed: 7
                    },
                    abilities: [
                        {
                            name: "Soffio di Metanfetamina",
                            damage: 20,
                            effect: "confusion",
                            description: "Danno fisico + effetto confusione"
                        },
                        {
                            name: "Rage Mode",
                            damage: 40,
                            effect: "self_damage",
                            description: "Danno ×2, poi si autodanneggia di 10 HP"
                        }
                    ],
                    drops: [
                        { name: "Denti d'Oro", type: "accessory", effect: "+10 Carisma", chance: 1.0 }
                    ],
                    sprite: "tuco"
                },
                {
                    name: "Los Pollos Guerreros",
                    type: "animal",
                    level: 5,
                    stats: {
                        health: 80,
                        maxHealth: 80,
                        attack: 18,
                        defense: 5,
                        speed: 9
                    },
                    abilities: [
                        {
                            name: "Beccata BBQ",
                            damage: 15,
                            effect: "burn",
                            description: "Danno calorico, bruciatura 10%"
                        },
                        {
                            name: "Volata di Salsa Piccante",
                            damage: 12,
                            effect: "area_damage",
                            description: "Colpisce tutto il party"
                        }
                    ],
                    drops: [
                        { name: "Ali di Fring", type: "material", chance: 0.8 }
                    ],
                    sprite: "pollo"
                },
                {
                    name: "Camion del Cartello",
                    type: "vehicle",
                    level: 7,
                    stats: {
                        health: 200,
                        maxHealth: 200,
                        attack: 30,
                        defense: 15,
                        speed: 4
                    },
                    abilities: [
                        {
                            name: "Investimento Coordinato",
                            damage: 25,
                            effect: "double_damage",
                            description: "Danni doppi a chi è nella prima fila"
                        }
                    ],
                    drops: [
                        { name: "Banconote di dubbia provenienza", type: "gold", value: 1000, chance: 1.0 }
                    ],
                    sprite: "camion",
                    weakness: "lightning"
                }
            ],
            phase2: [
                {
                    name: "Meth Golem",
                    type: "construct",
                    level: 8,
                    stats: {
                        health: 150,
                        maxHealth: 150,
                        attack: 28,
                        defense: 12,
                        speed: 3
                    },
                    abilities: [
                        {
                            name: "Cristallo Infiammato",
                            damage: 22,
                            effect: "poison",
                            description: "Danni + veleno per 2 turni"
                        },
                        {
                            name: "Fumo del Caos",
                            damage: 15,
                            effect: "confusion",
                            description: "Rende confusi i personaggi per 1 turno"
                        }
                    ],
                    drops: [
                        { name: "Cristallo Puro", type: "magic", chance: 0.6 }
                    ],
                    sprite: "meth_golem"
                }
            ],
            bosses: [
                {
                    name: "Gus Fring",
                    type: "boss",
                    level: 10,
                    stats: {
                        health: 250,
                        maxHealth: 250,
                        attack: 35,
                        defense: 18,
                        speed: 8
                    },
                    abilities: [
                        {
                            name: "Taglio Chirurgico",
                            damage: 30,
                            effect: "precision",
                            description: "Colpisce con precisione chirurgica (ignora 50% difesa)"
                        },
                        {
                            name: "Pollo della Morte",
                            damage: 0,
                            effect: "summon",
                            description: "Invoca 2 Pollos Guerreros rinforzati"
                        }
                    ],
                    drops: [
                        { name: "Cravatta della Professionalità", type: "accessory", effect: "+15 Intelligenza", chance: 1.0 }
                    ],
                    sprite: "gus",
                    weakness: "sound"
                },
                {
                    name: "Skyler White",
                    type: "final_boss",
                    level: 12,
                    stats: {
                        health: 350,
                        maxHealth: 350,
                        attack: 40,
                        defense: 20,
                        speed: 6
                    },
                    abilities: [
                        {
                            name: "Modulo 730 Magico",
                            damage: 0,
                            effect: "stun",
                            description: "Obliga tutti i personaggi a 'ricompilare' le loro abilità → skip di turno"
                        },
                        {
                            name: "Sguardo del Giudizio Fiscale",
                            damage: 0,
                            effect: "defense_down",
                            description: "Abbassa la Difesa del team del 20% per due turni"
                        },
                        {
                            name: "Audit Totale",
                            damage: 0,
                            effect: "item_steal",
                            description: "Rimuove un oggetto casuale dall'inventario"
                        },
                        {
                            name: "Tono Passivo-Aggressivo",
                            damage: 25,
                            effect: "confusion",
                            description: "Infligge Danno Emotivo ad area + confusione"
                        },
                        {
                            name: "Divorzio Epico",
                            damage: 50,
                            effect: "single_target",
                            description: "Infligge danni enormi al personaggio maschile con più HP"
                        }
                    ],
                    drops: [
                        { name: "Manuale della Coerenza Domestica", type: "legendary", effect: "Riduce del 50% il caos magico", chance: 1.0 }
                    ],
                    sprite: "skyler",
                    phases: 2
                }
            ]
        };
    }

    generateSpecialEvents() {
        return [
            {
                name: "Cesare Svine",
                trigger: "combat_start",
                condition: () => Math.random() < 0.3,
                effect: () => {
                    this.addToBattleLog("😵 Cesare sviene per il caldo! Salta un turno.");
                    return { player_stun: 1 };
                }
            },
            {
                name: "William Contrabbanda",
                trigger: "exploration",
                condition: () => Math.random() < 0.4,
                effect: () => {
                    const extraGold = Math.floor(Math.random() * 50) + 20;
                    game.playerStats.gold += extraGold;
                    this.addToBattleLog(`🎒 William contrabbanda provviste! Ottieni ${extraGold} oro extra.`);
                }
            },
            {
                name: "Valentina Food Truck",
                trigger: "merchant",
                condition: () => game.selectedCharacter === "valentina" && Math.random() < 0.25,
                effect: () => {
                    this.addToBattleLog("🌮 Valentina sbaglia un incantesimo e trasforma il camper in un food truck di tacos magici!");
                    // Cura tutto il party
                    game.party.forEach(member => {
                        member.stats.currentHealth = member.stats.maxHealth;
                    });
                    this.addToBattleLog("Il party è completamente curato dai tacos magici!");
                }
            },
            {
                name: "Sinergia Chimica",
                trigger: "combat",
                condition: () => game.party.some(p => p.name === "Valentina") && 
                             game.party.some(p => p.name === "Vincenzo"),
                effect: () => {
                    this.addToBattleLog("💥 SINERGIA: Valentina + Vincenzo - 'Crash Chimico'!");
                    this.addToBattleLog("Tutti i nemici di tipo tecnologico o chimico vanno in tilt!");
                    // Applica confusione a tutti i nemici
                    return { enemy_confusion: 2 };
                }
            }
        ];
    }

    generateQuiz() {
        return [
            {
                question: "Qual è il vero nome di Heisenberg nella serie Breaking Bad?",
                options: [
                    "Walter White",
                    "Jesse Pinkman", 
                    "Gustavo Fring",
                    "Saul Goodman"
                ],
                correctAnswer: 0,
                explanation: "Heisenberg è l'alter ego di Walter White, il professore di chimica che diventa un produttore di metanfetamina!"
            },
            {
                question: "Cosa significa 'Los Pollos Hermanos'?",
                options: [
                    "I Polli Eroici",
                    "I Fratelli Pollo",
                    "Il Pollo Magico",
                    "Il Ristorante del Pollo"
                ],
                correctAnswer: 1,
                explanation: "'Los Pollos Hermanos' significa letteralmente 'I Fratelli Pollo', la catena di fast food di Gus Fring!"
            },
            {
                question: "Qual è la specialità chimica di Walter White?",
                options: [
                    "Cristallografia",
                    "Chimica organica",
                    "Chimica dei cristalli blu",
                    "Tutte le precedenti"
                ],
                correctAnswer: 2,
                explanation: "Walter White è famoso per la sua metanfetamina di colore blu puro, al 99.1%!"
            }
        ];
    }

    setupEventListeners() {
        // Pulsanti di fase
        const phaseButtons = document.querySelectorAll('.explore-button');
        phaseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handlePhaseAction(action);
            });
        });

        // Eventi speciali
        const eventItems = document.querySelectorAll('.event-item');
        eventItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const event = e.target.dataset.event;
                this.triggerSpecialEvent(event);
            });
        });
    }

    startPhase(phaseNumber) {
        this.currentPhase = phaseNumber;
        
        // Aggiorna l'indicatore di fase
        const phases = document.querySelectorAll('.phase');
        phases.forEach(phase => {
            phase.classList.remove('active');
            if (parseInt(phase.dataset.phase) === phaseNumber) {
                phase.classList.add('active');
            }
        });

        // Aggiorna la descrizione della location
        this.updatePhaseDescription();
    }

    updatePhaseDescription() {
        const locationTitle = document.querySelector('#location-title');
        const locationDesc = document.querySelector('#location-description');

        if (!locationTitle || !locationDesc) return;

        switch(this.currentPhase) {
            case 1:
                locationTitle.textContent = "Deserto del New Mexico";
                locationDesc.textContent = "Il caldo è opprimente. Davanti a te un camper arrugginito emana fumo blu. Cesare sviene ogni 10 metri e William cerca di contrabbandare acqua.";
                break;
            case 2:
                locationTitle.textContent = "Laboratorio del Camper";
                locationDesc.textContent = "L'interno del camper è un dungeon claustrofobico pieno di vapori blu e provette instabili. Vincenzo trova formule chimico-magiche incise sul pavimento.";
                break;
            case 3:
                locationTitle.textContent = "Ufficio di Skyler White";
                locationDesc.textContent = "Skyler White, circondata da pile di documenti contabili magici, è la vera mente dietro il caos. Vuole mettere tutti 'in regola'.";
                break;
        }
    }

    handlePhaseAction(action) {
        switch(action) {
            case 'explore-desert':
                this.exploreDesert();
                break;
            case 'investigate-camper':
                this.investigateCamper();
                break;
            case 'find-ally':
                this.findAlly();
                break;
        }
    }

    exploreDesert() {
        const encounterChance = Math.random();
        
        if (encounterChance < 0.6) {
            // Incontro nemico
            const enemies = this.enemies.phase1;
            const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
            this.startBattle(randomEnemy);
        } else if (encounterChance < 0.8) {
            // Evento speciale
            this.triggerRandomEvent();
        } else {
            // Trova oggetto
            this.findDesertItem();
        }
    }

    investigateCamper() {
        if (this.currentPhase === 1) {
            this.addToBattleLog("🔬 Esamini il camper... Trovi il laboratorio segreto!");
            this.startPhase(2);
        } else {
            this.addToBattleLog("Hai già esplorato il camper. C'è altro da fare nel deserto.");
        }
    }

    findAlly() {
        const allyChance = Math.random();
        
        if (allyChance < 0.5) {
            this.addToBattleLog("🕵️ Incontri Hank Schrader della DEA!");
            this.addToBattleLog("Hank: 'Minerali, non pietre!' Ti aiuta per due battaglie.");
            // Implementa l'alleato temporaneo
            this.gainTemporaryAlly();
        } else {
            this.addToBattleLog("Cerchi alleati ma trovi solo cactus e sabbia...");
        }
    }

    triggerSpecialEvent(eventName) {
        const event = this.specialEvents.find(e => e.name.replace(/\s+/g, '-').toLowerCase() === eventName);
        
        if (event) {
            event.effect();
        }
    }

    triggerRandomEvent() {
        const availableEvents = this.specialEvents.filter(event => {
            if (event.condition) {
                return event.condition();
            }
            return true;
        });

        if (availableEvents.length > 0) {
            const randomEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
            randomEvent.effect();
        }
    }

    gainTemporaryAlly() {
        // Aggiungi Hank Schrader come alleato temporaneo
        const hank = {
            name: "Hank Schrader",
            type: "ally",
            stats: {
                health: 100,
                maxHealth: 100,
                attack: 25,
                defense: 10
            },
            abilities: [
                {
                    name: "Boom di DEA",
                    damage: 20,
                    effect: "area_damage",
                    description: "Colpisce tutti i nemici con 20 danni di esplosione"
                }
            ],
            duration: 2 // Battaglie
        };

        game.party.push(hank);
        this.addToBattleLog("Hank Schrader si unisce al party temporaneamente!");
    }

    findDesertItem() {
        const items = [
            "Una bottiglia d'acqua magica che ripristina 30 HP",
            "Mappe del deserto che aumentano la fortuna",
            "Occhiali da sole che proteggono dalla confusione",
            "Niente di utile..."
        ];

        const foundItem = items[Math.floor(Math.random() * items.length)];
        this.addToBattleLog(`🏜️ Nel deserto trovi: ${foundItem}`);
        
        // Implementa l'effetto dell'oggetto trovato
        if (foundItem.includes("bottiglia")) {
            game.party.forEach(member => {
                member.stats.currentHealth = Math.min(member.stats.maxHealth, member.stats.currentHealth + 30);
            });
        }
    }

    // Metodi di combattimento simili a Level1
    startBattle(enemy) {
        this.currentEnemy = enemy;
        // Mostra scena di battaglia (simile a Level1)
        this.showBattleScene();
        this.addToBattleLog(`Incontri ${enemy.name}!`);
    }

    showBattleScene() {
        const battleScene = document.querySelector('.battle-scene');
        const explorationScene = document.querySelector('.exploration-scene');
        
        if (battleScene) battleScene.classList.remove('hidden');
        if (explorationScene) explorationScene.classList.add('hidden');
    }

    addToBattleLog(message) {
        // Implementazione simile a Level1
        console.log(message); // Placeholder
    }

    // Altri metodi necessari per il funzionamento del livello...
}

// Inizializzazione del livello
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('level2.html')) {
        new Level2();
    }
});