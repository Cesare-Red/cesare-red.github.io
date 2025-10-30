// Gestione specifica del Livello 3 (Harry Potter)
class Level3 {
    constructor() {
        this.currentLocation = 'great-hall';
        this.learnedSpells = [];
        this.voldemortPhase = 1;
        this.enemies = this.generateEnemies();
        this.spells = this.generateSpells();
        this.quizQuestions = this.generateQuiz();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startAtLocation('great-hall');
        this.learnSpell('expelliarmus');
        this.learnSpell('protego');
        this.updateUI();
        
        // Messaggio di introduzione alla storia
        this.addToBattleLog("🎓 BENVENUTO AD HOGWARTS!");
        this.addToBattleLog("Il Cappello di Laurea Magico di Vincenzo è stato rubato da Voldemort!");
        this.addToBattleLog("Devi recuperarlo per completare il viaggio di laurea!");
    }

    generateEnemies() {
        return {
            'final-battle': [
                {
                    name: "Lord Voldemort",
                    type: "final_boss",
                    level: 25,
                    stats: {
                        health: 500,
                        maxHealth: 500,
                        attack: 60,
                        defense: 25,
                        speed: 10
                    },
                    abilities: [
                        {
                            name: "Maledizione Mortale",
                            damage: 45,
                            effect: "scossa",
                            description: "Infligge Scossa? (danno residuo)"
                        },
                        {
                            name: "Incanto della Lentezza",
                            damage: 30,
                            effect: "slow",
                            description: "Infligge Lentezza"
                        },
                        {
                            name: "Palla di Fuoco Oscuro",
                            damage: 40,
                            effect: "scotta",
                            description: "Infligge Scotta? (danno continuo)"
                        },
                        {
                            name: "Tempesta di Male",
                            damage: 35,
                            effect: "confusion_scossa",
                            description: "Attacco ad area che infligge Confusione e Scossa?"
                        },
                        {
                            name: "Furia dell'Oscuro Signore",
                            damage: 25,
                            effect: "multi_attack",
                            description: "Attacca tante volte quanti sono i membri del party"
                        }
                    ],
                    special: "Può attaccare più volte per turno in base al numero di personaggi",
                    phases: 2,
                    sprite: "voldemort"
                }
            ]
        };
    }

    handleVoldemortTurn() {
        if (this.currentEnemy.name === "Lord Voldemort") {
            // Voldemort può attaccare tante volte quanti sono i membri del party
            const attackCount = game.party.length;
            
            this.addToBattleLog(`💀 Voldemort si prepara ad attaccare ${attackCount} volte!`);
            
            for (let i = 0; i < attackCount; i++) {
                setTimeout(() => {
                    this.voldemortAttack();
                    
                    // Messaggio finale dopo l'ultimo attacco
                    if (i === attackCount - 1) {
                        setTimeout(() => {
                            this.addToBattleLog("⚡ Voldemort: 'Nessuno può fermare il Signore Oscuro!'");
                        }, 1000);
                    }
                }, i * 1500);
            }
        }
    }

    completeLevel() {
        // Messaggio di vittoria finale
        this.addToBattleLog("🎉 HAI SCONFITTO VOLDEMORT!");
        this.addToBattleLog("📜 Il Cappello di Laurea Magico è stato recuperato!");
        this.addToBattleLog("😴 Vincenzo, stanco dalla mirabolante avventura, si assopisce...");
        
        setTimeout(() => {
            this.addToBattleLog("🌅 ...per poi risvegliarsi nel mondo reale!");
            this.addToBattleLog("🎓 La laurea è finalmente completa! Il viaggio è terminato!");
            
            // Mostra il quiz finale
            setTimeout(() => {
                this.startFinalQuiz();
            }, 3000);
        }, 2000);
    }

    startFinalQuiz() {
        // Quiz finale con domande sui temi dei livelli precedenti
        const finalQuiz = [
            {
                question: "Qual è il vero significato del viaggio di Electric Bus0?",
                options: [
                    "Recuperare ricordi di gaming perduti",
                    "Superare sfide impossibili",
                    "Celebrare il traguardo della laurea",
                    "Tutte le precedenti"
                ],
                correctAnswer: 3,
                explanation: "Esatto! Il viaggio rappresenta tutto il percorso di studi, le sfide superate e la celebrazione finale!"
            }
        ];
        
        // Implementazione del quiz finale...
    }
}