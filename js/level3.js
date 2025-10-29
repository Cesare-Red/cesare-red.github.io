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
    }

    generateEnemies() {
        return {
            'great-hall': [
                {
                    name: "Dementor",
                    type: "dark",
                    level: 10,
                    stats: {
                        health: 100,
                        maxHealth: 100,
                        attack: 30,
                        defense: 5,
                        speed: 6
                    },
                    abilities: [
                        {
                            name: "Bacio del Dementor",
                            damage: 25,
                            effect: "fear",
                            description: "Infligge paura (salta turno)"
                        },
                        {
                            name: "Aura della Disperazione",
                            damage: 15,
                            effect: "attack_down",
                            description: "Riduce l'attacco di tutti"
                        }
                    ],
                    weakness: "patronus",
                    sprite: "dementor"
                }
            ],
            'library': [
                {
                    name: "Death Eater",
                    type: "dark_wizard",
                    level: 12,
                    stats: {
                        health: 120,
                        maxHealth: 120,
                        attack: 35,
                        defense: 8,
                        speed: 7
                    },
                    abilities: [
                        {
                            name: "Avada Kedavra",
                            damage: 40,
                            effect: "instant_kill",
                            description: "Può uccidere istantaneamente (bassa probabilità)"
                        },
                        {
                            name: "Crucio",
                            damage: 20,
                            effect: "stun",
                            description: "Dolore torturante (stun per 1 turno)"
                        }
                    ],
                    sprite: "death_eater"
                }
            ],
            'potions-class': [
                {
                    name: "Basilisk",
                    type: "magical_beast",
                    level: 15,
                    stats: {
                        health: 200,
                        maxHealth: 200,
                        attack: 45,
                        defense: 15,
                        speed: 5
                    },
                    abilities: [
                        {
                            name: "Sguardo Mortale",
                            damage: 50,
                            effect: "petrify",
                            description: "Petrificazione (salta 2 turni)"
                        },
                        {
                            name: "Morso Velenoso",
                            damage: 30,
                            effect: "poison",
                            description: "Veleno che infligge 10 danni/turno"
                        }
                    ],
                    weakness: "sound",
                    sprite: "basilisk"
                }
            ],
            'forbidden-forest': [
                {
                    name: "Bellatrix Lestrange",
                    type: "dark_wizard",
                    level: 18,
                    stats: {
                        health: 180,
                        maxHealth: 180,
                        attack: 40,
                        defense: 12,
                        speed: 8
                    },
                    abilities: [
                        {
                            name: "Follia Magica",
                            damage: 35,
                            effect: "confusion",
                            description: "Danno + confusione per 2 turni"
                        },
                        {
                            name: "Danza della Morte",
                            damage: 25,
                            effect: "multi_hit",
                            description: "Attacca 2-3 volte in un turno"
                        }
                    ],
                    sprite: "bellatrix"
                }
            ],
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

    generateSpells() {
        return {
            'expelliarmus': {
                name: "Expelliarmus",
                type: "charm",
                cost: 20,
                effect: "disarm",
                description: "Disarma il nemico, riducendo il suo attacco del 50% per 1 turno",
                damage: 15
            },
            'protego': {
                name: "Protego",
                type: "defense",
                cost: 25,
                effect: "shield",
                description: "Crea uno scudo che assorbe 30 danni per 2 turni",
                damage: 0
            },
            'expecto-patronum': {
                name: "Expecto Patronum",
                type: "charm",
                cost: 40,
                effect: "patronus",
                description: "Scaccia i Dementor e infligge danni extra ai nemici oscuri",
                damage: 35,
                requirement: "Sbloccato dopo aver sconfitto un Dementor"
            },
            'stupefy': {
                name: "Stupefy",
                type: "charm",
                cost: 30,
                effect: "stun",
                description: "Stordisce il nemico, facendogli saltare il turno",
                damage: 20,
                requirement: "Trovato nella Biblioteca"
            },
            'incendio': {
                name: "Incendio",
                type: "curse",
                cost: 35,
                effect: "burn",
                description: "Incendia il nemico, infliggendo danni continui",
                damage: 25,
                requirement: "Appreso nell'Aula Pozioni"
            }
        };
    }

    generateQuiz() {
        return [
            {
                question: "Quale di questi NON è uno degli Horcrux di Voldemort?",
                options: [
                    "Il Diario di Tom Riddle",
                    "La Coppa di Tassorosso",
                    "La Spada di Grifondoro",
                    "Il Medaglione di Serpeverde"
                ],
                correctAnswer: 2,
                explanation: "La Spada di Grifondoro non è un Horcrux! È stata usata per distruggere alcuni Horcrux."
            },
            {
                question: "Come si chiama il gioco di South Park che parodia i giochi RPG come questo?",
                options: [
                    "The Stick of Truth",
                    "The Fractured But Whole", 
                    "The Book of Mormon: The Game",
                    "Both 1 and 2"
                ],
                correctAnswer: 3,
                explanation: "South Park ha due giochi RPG: 'The Stick of Truth' e 'The Fractured But Whole'!"
            },
            {
                question: "Qual è l'incantesimo per creare luce?",
                options: [
                    "Lumos",
                    "Nox",
                    "Incendio",
                    "Expecto Lumosum"
                ],
                correctAnswer: 0,
                explanation: "Lumos è l'incantesimo che fa illuminare la punta della bacchetta!"
            },
            {
                question: "Quale casa di Hogwarts era nota per il suo valore e coraggio?",
                options: [
                    "Tassorosso",
                    "Corvonero",
                    "Grifondoro",
                    "Serpeverde"
                ],
                correctAnswer: 2,
                explanation: "Grifondoro, fondata da Godric Grifondoro, è la casa del coraggio!"
            }
        ];
    }

    setupEventListeners() {
        // Navigazione mappa
        const mapLocations = document.querySelectorAll('.map-location');
        mapLocations.forEach(location => {
            location.addEventListener('click', (e) => {
                const newLocation = e.target.dataset.location;
                this.moveToLocation(newLocation);
            });
        });

        // Azioni di esplorazione
        const actionButtons = document.querySelectorAll('.explore-button');
        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleLocationAction(action);
            });
        });

        // Incantesimi
        const spellItems = document.querySelectorAll('.spell-item');
        spellItems.forEach(spell => {
            spell.addEventListener('click', (e) => {
                if (!e.target.classList.contains('locked')) {
                    const spellName = e.target.dataset.spell;
                    this.prepareSpell(spellName);
                }
            });
        });
    }

    startAtLocation(location) {
        this.currentLocation = location;
        this.updateLocationDisplay();
        this.updateMapNavigation();
    }

    moveToLocation(newLocation) {
        if (newLocation === 'final-battle' && !this.canAccessFinalBattle()) {
            this.addToBattleLog("⚡ Devi sconfiggere tutti i nemici principali prima di affrontare Voldemort!");
            return;
        }

        this.currentLocation = newLocation;
        this.updateLocationDisplay();
        this.updateMapNavigation();

        // Eventi speciali per location
        this.triggerLocationEvent(newLocation);
    }

    canAccessFinalBattle() {
        const requiredEnemies = ['Dementor', 'Death Eater', 'Basilisk', 'Bellatrix Lestrange'];
        return requiredEnemies.every(enemy => 
            this.enemiesDefeated.includes(enemy)
        );
    }

    updateLocationDisplay() {
        const locationTitle = document.querySelector('#location-title');
        const locationDesc = document.querySelector('#location-description');

        if (!locationTitle || !locationDesc) return;

        const locations = {
            'great-hall': {
                title: "Salone Grande di Hogwarts",
                description: "Il maestoso salone con il soffitto incantato. I tavoli delle case sono apparecchiati, ma l'atmosfera è inquietante. Dei Dementor si aggirano nell'ombra."
            },
            'library': {
                title: "Biblioteca di Hogwarts",
                description: "Polverosi tomi di magia riempiono gli scaffali infiniti. Madame Pince sarebbe furiosa nello stato in cui si trova. Death Eater cercano antichi incantesimi proibiti."
            },
            'potions-class': {
                title: "Aula di Pozioni",
                description: "Calderoni bollenti e ingredienti misteriosi. L'odore di zolfo e fiele di drago riempie l'aria. Un terribile sibilo proviene dalle fogne..."
            },
            'forbidden-forest': {
                title: "Foresta Proibita",
                description: "Alberi secolari creano un'oscurità quasi totale. Strani versi echeggiano tra gli alberi. Bellatrix Lestrange si nasconde qui, pronta a tendere un'imboscata."
            },
            'final-battle': {
                title: "Scontro Finale - Atrio di Hogwarts",
                description: "Lord Voldemort ti attende, la sua bacchetta pronta a scagliare le maledizioni più oscure. Lo scontro finale per il destino del mondo magico è qui!"
            }
        };

        const currentLoc = locations[this.currentLocation];
        if (currentLoc) {
            locationTitle.textContent = currentLoc.title;
            locationDesc.textContent = currentLoc.description;
        }
    }

    updateMapNavigation() {
        const mapLocations = document.querySelectorAll('.map-location');
        mapLocations.forEach(location => {
            location.classList.remove('active');
            if (location.dataset.location === this.currentLocation) {
                location.classList.add('active');
            }
        });
    }

    handleLocationAction(action) {
        switch(action) {
            case 'search-spells':
                this.searchForSpells();
                break;
            case 'find-allies':
                this.findMagicalAllies();
                break;
            case 'face-voldemort':
                if (this.currentLocation === 'final-battle') {
                    this.startFinalBattle();
                } else {
                    this.addToBattleLog("Devi prima raggiungere l'Atrio di Hogwarts per affrontare Voldemort!");
                }
                break;
        }
    }

    searchForSpells() {
        const spellFindChance = Math.random();
        
        if (spellFindChance < 0.4) {
            // Trova un nuovo incantesimo
            const availableSpells = Object.keys(this.spells).filter(spell => 
                !this.learnedSpells.includes(spell) && 
                this.spells[spell].requirement
            );

            if (availableSpells.length > 0) {
                const foundSpell = availableSpells[Math.floor(Math.random() * availableSpells.length)];
                this.learnSpell(foundSpell);
                this.addToBattleLog(`📖 Trovi il libro per l'incantesimo: ${this.spells[foundSpell].name}!`);
            } else {
                this.addToBattleLog("Cerchi incantesimi ma trovi solo libri di astronomia...");
            }
        } else if (spellFindChance < 0.7) {
            // Incontro nemico
            this.randomEncounter();
        } else {
            // Trova pozione
            this.findPotion();
        }
    }

    learnSpell(spellKey) {
        if (!this.learnedSpells.includes(spellKey)) {
            this.learnedSpells.push(spellKey);
            
            // Aggiorna il libro degli incantesimi
            const spellList = document.querySelector('.spell-list');
            const spellItem = document.querySelector(`[data-spell="${spellKey}"]`);
            
            if (spellItem) {
                spellItem.classList.remove('locked');
            }
            
            this.addToBattleLog(`✨ Hai imparato: ${this.spells[spellKey].name}!`);
        }
    }

    prepareSpell(spellKey) {
        if (!this.learnedSpells.includes(spellKey)) return;

        const spell = this.spells[spellKey];
        this.addToBattleLog(`🔮 Prepari l'incantesimo: ${spell.name}`);
        // Qui si potrebbe implementare un sistema di casting
    }

    findMagicalAllies() {
        const allies = [
            "Il Fantasma Nearly Headless Nick",
            "Filius Vitious, maestro di Incantesimi",
            "Un Ippogrifo amichevole",
            "I Gemelli Weasley con i loro scherzetti magici"
        ];

        const foundAlly = allies[Math.floor(Math.random() * allies.length)];
        this.addToBattleLog(`👥 Incontri: ${foundAlly}`);

        // Effetti degli alleati
        if (foundAlly.includes("Weasley")) {
            this.addToBattleLog("I gemelli danno al party scherzetti magici che confondono i nemici!");
            // Bonus temporaneo
        }
    }

    findPotion() {
        const potions = [
            { name: "Pozione Polisucco", effect: "Trasforma temporaneamente in un nemico" },
            { name: "Felix Felicis", effect: "Aumenta fortuna per 3 turni" },
            { name: "Pozione della Vita", effect: "Cura completa" },
            { name: "Pozione di Forgetfulness", effect: "Nemici dimenticano le abilità" }
        ];

        const foundPotion = potions[Math.floor(Math.random() * potions.length)];
        this.addToBattleLog(`🧪 Trovi una fiala di: ${foundPotion.name}`);
        this.addToBattleLog(`Effetto: ${foundPotion.effect}`);
    }

    randomEncounter() {
        const locationEnemies = this.enemies[this.currentLocation];
        if (locationEnemies && locationEnemies.length > 0) {
            const randomEnemy = locationEnemies[Math.floor(Math.random() * locationEnemies.length)];
            this.startBattle(randomEnemy);
        }
    }

    startBattle(enemy) {
        this.currentEnemy = enemy;
        this.showBattleScene();
        
        if (enemy.name === "Lord Voldemort") {
            this.showBossWarning();
        }
        
        this.addToBattleLog(`⚡ Incontri: ${enemy.name}!`);
    }

    startFinalBattle() {
        const voldemort = this.enemies['final-battle'][0];
        this.startBattle(voldemort);
    }

    showBossWarning() {
        const warning = document.getElementById('boss-warning');
        if (warning) {
            warning.classList.remove('hidden');
            
            // Rimuovi il warning dopo 5 secondi
            setTimeout(() => {
                warning.classList.add('hidden');
            }, 5000);
        }
    }

    showBattleScene() {
        // Implementazione simile ai livelli precedenti
        const battleScene = document.querySelector('.battle-scene');
        const explorationScene = document.querySelector('.exploration-scene');
        
        if (battleScene) battleScene.classList.remove('hidden');
        if (explorationScene) explorationScene.classList.add('hidden');
    }

    addToBattleLog(message) {
        // Implementazione simile ai livelli precedenti
        console.log(message); // Placeholder
    }

    // Metodi per gestire il combattimento con Voldemort
    handleVoldemortTurn() {
        if (this.currentEnemy.name === "Lord Voldemort") {
            // Voldemort può attaccare più volte
            const attackCount = game.party.length;
            
            for (let i = 0; i < attackCount; i++) {
                setTimeout(() => {
                    this.voldemortAttack();
                }, i * 1000);
            }
        }
    }

    voldemortAttack() {
        if (!this.currentEnemy || !game.party[0]) return;

        const abilities = this.currentEnemy.abilities;
        const randomAbility = abilities[Math.floor(Math.random() * abilities.length)];
        
        // Implementa l'attacco di Voldemort
        this.addToBattleLog(`💀 Voldemort usa: ${randomAbility.name}!`);
        
        // Applica effetti speciali
        this.applyVoldemortEffect(randomAbility.effect);
    }

    applyVoldemortEffect(effect) {
        switch(effect) {
            case 'scossa':
                this.addToBattleLog("⚡ Scossa? applicata! Danno residuo ogni turno.");
                break;
            case 'slow':
                this.addToBattleLog("🐌 Lentezza applicata! Agisci per ultimo e -10% danno.");
                break;
            case 'scotta':
                this.addToBattleLog("🔥 Scotta? applicata! Subisci danni a fine turno.");
                break;
            case 'confusion_scossa':
                this.addToBattleLog("🌀 Tempesta di Male! Confusione e Scossa? a tutto il party.");
                break;
        }
    }

    triggerLocationEvent(location) {
        const events = {
            'great-hall': () => {
                if (Math.random() < 0.3) {
                    this.addToBattleLog("🎭 I ritratti sulle pareti prendono vita e danno consigli magici!");
                }
            },
            'library': () => {
                this.addToBattleLog("📚 I libri sussurrano antichi segreti magici...");
            },
            'potions-class': () => {
                if (Math.random() < 0.4) {
                    this.addToBattleLog("🧪 Una pozione esplode casualmente! Il party perde 10 HP.");
                    game.party.forEach(member => {
                        member.stats.currentHealth -= 10;
                    });
                }
            },
            'forbidden-forest': () => {
                this.addToBattleLog("🌳 Creature magiche ti osservano dagli alberi...");
            }
        };

        if (events[location]) {
            events[location]();
        }
    }
}

// Inizializzazione del livello
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('level3.html')) {
        new Level3();
    }
});