// Gestione specifica del Livello 2 (Breaking Bad)
class Level2 {
    constructor() {
        this.currentPhase = 1;
        this.enemies = this.generateEnemies();
        this.specialEvents = this.generateSpecialEvents();
        this.quizQuestions = this.generateQuiz();
        this.init();
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
                    game.party.forEach(member => {
                        member.stats.currentHealth = member.stats.maxHealth;
                    });
                    this.addToBattleLog("Il party è completamente curato dai tacos magici!");
                }
            },
            {
                name: "Paladina Assume Gus",
                trigger: "boss_encounter",
                condition: () => game.party.some(p => p.name === "Paladina del Buffet"),
                effect: () => {
                    this.addToBattleLog("🍗 La Paladina del Buffet: 'Gus, il tuo pollo è magnifico! Ti assumo come chef!'");
                    this.addToBattleLog("Gus Fring è confuso e salta un turno!");
                    return { boss_stun: 1 };
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
                    return { enemy_confusion: 2 };
                }
            },
            {
                name: "Ritardo Corale",
                trigger: "combat",
                condition: () => game.party.some(p => p.name === "Cesare") && 
                             game.party.some(p => p.name === "Il Tardo Bardo"),
                effect: () => {
                    this.addToBattleLog("🎭 SINERGIA: Cesare + Bardo - 'Ritardo Corale'!");
                    this.addToBattleLog("Entrambi saltano il turno, ma i nemici ridono troppo per attaccare!");
                    return { enemy_stun: 1 };
                }
            },
            {
                name: "Buffet del Contrabbando",
                trigger: "combat",
                condition: () => game.party.some(p => p.name === "Paladina del Buffet") && 
                             game.party.some(p => p.name === "William"),
                effect: () => {
                    this.addToBattleLog("🕵️ SINERGIA: Paladina + William - 'Buffet del Contrabbando'!");
                    this.addToBattleLog("Recuperano 20 HP rubando razioni dal laboratorio!");
                    game.party.forEach(member => {
                        member.stats.currentHealth = Math.min(
                            member.stats.maxHealth, 
                            member.stats.currentHealth + 20
                        );
                    });
                }
            }
        ];
    }

    // ... altri metodi per gestire il livello
}