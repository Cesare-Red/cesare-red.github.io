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
                }
                // Altri nemici...
            ],
            bosses: [
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

    // ... resto dei metodi per gestire il livello
}