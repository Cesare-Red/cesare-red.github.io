// Definizione dei livelli del gioco
const gameLevels = {
    level1: {
        name: "Livello 1: Avventura Minecraft",
        theme: "minecraft",
        enemies: {
            zombie: {
                name: "Zombie",
                stats: { vitality: 40, strength: 8, dexterity: 5, speed: 6 },
                abilities: [
                    {
                        name: "Graffio Zombie",
                        description: "Attacco base che può infliggere fame",
                        effect: "Danno + possibile affamato"
                    }
                ],
                drops: ["Carne marcia", "Pepita di ferro"]
            },
            skeleton: {
                name: "Scheletro",
                stats: { vitality: 35, dexterity: 12, strength: 6, speed: 8 },
                abilities: [
                    {
                        name: "Tiro con l'Arco",
                        description: "Attacco a distanza con alta precisione",
                        effect: "Danno + possibile sanguinamento"
                    }
                ],
                drops: ["Osso", "Freccia"]
            },
            creeper: {
                name: "Creeper",
                stats: { vitality: 30, strength: 15, dexterity: 7, speed: 5 },
                abilities: [
                    {
                        name: "Esplosione",
                        description: "Si avvicina ed esplode",
                        effect: "Danno ad area, si autodistrugge"
                    }
                ],
                drops: ["Polvere da sparo"]
            },
            warden: {
                name: "Warden",
                type: "elite",
                stats: { vitality: 120, strength: 20, dexterity: 8, speed: 4 },
                abilities: [
                    {
                        name: "Ruggito Sonico",
                        description: "Attacco che infligge confusione",
                        effect: "Danno + confusione a tutti"
                    },
                    {
                        name: "Colpo Sismico",
                        description: "Attacco pesante al terreno",
                        effect: "Danno pesante + lentezza"
                    }
                ],
                drops: ["Catalizzatore profondo"]
            },
            wither: {
                name: "Wither",
                type: "boss",
                stats: { vitality: 200, strength: 18, dexterity: 10, speed: 9 },
                abilities: [
                    {
                        name: "Testa Scheletrica",
                        description: "Lancia teste esplosive",
                        effect: "Danno ad area + Scotta?"
                    },
                    {
                        name: "Aura della Corruzione",
                        description: "Danneggia tutti i nemici ogni turno",
                        effect: "Danno continuo a tutti"
                    },
                    {
                        name: "Rinascita Oscura",
                        description: "Si cura quando è quasi sconfitto",
                        effect: "Rigenera 50 HP una volta"
                    }
                ],
                drops: ["Stella del Nether"]
            }
        },
        events: [
            {
                type: "chest",
                description: "Trovi un forziere nascosto! Cosa contiene?",
                rewards: ["Pozione di guarigione", "Pergamena incantata", "Mela d'oro"]
            },
            {
                type: "merchant",
                description: "Incontri un Villager che vuole commerciare",
                trades: [
                    { give: "Smeraldo", get: "Pozione di guarigione" },
                    { give: "Carne", get: "Pozione di forza" }
                ]
            },
            {
                type: "puzzle",
                description: "Una porta misteriosa richiede di risolvere un enigma...",
                solution: "minecraft"
            }
        ],
        quiz: {
            theme: ["rocket league", "dark souls", "crash bandicoot", "hollow knight"],
            questions: [
                {
                    question: "In Rocket League, qual è il nome dell'arena principale?",
                    options: ["Mannfield", "Salt Lake", "Urban Central", "Beckwith Park"],
                    answer: 0
                },
                {
                    question: "In Dark Souls, come si chiama la campana che deve essere suonata?",
                    options: ["Campana del Destino", "Campana del Risveglio", "Campana della Morte", "Campana dell'Eroe"],
                    answer: 1
                },
                {
                    question: "Quale maschera è il nemico principale in Crash Bandicoot?",
                    options: ["Aku Aku", "Uka Uka", "Brio", "Cortex"],
                    answer: 1
                },
                {
                    question: "In Hollow Knight, come si chiama la città principale?",
                    options: ["Città delle Lacrime", "Nido Sacro", "Verdeggianza Infausta", "Crocevia dimenticato"],
                    answer: 0
                }
            ],
            reward: "Tutti i giocatori ricevono refill di salute e +5 ad ogni caratteristica per 4 incontri"
        }
    },

    level2: {
        name: "Livello 2: ALBUQUERQUE - CRYSTAL QUEST",
        theme: "breaking_bad",
        enemies: {
            tuco: {
                name: "Tuco Salamanca",
                stats: { vitality: 70, strength: 14, dexterity: 9, speed: 8 },
                abilities: [
                    {
                        name: "Soffio di Metanfetamina",
                        description: "Attacco che infligge confusione",
                        effect: "Danno fisico + confusione"
                    },
                    {
                        name: "Rage Mode",
                        description: "Raddoppia il danno ma si autodanneggia",
                        effect: "Danno ×2, poi -10 HP"
                    }
                ],
                drops: ["Denti d'Oro"]
            },
            pollos: {
                name: "Los Pollos Guerreros",
                stats: { vitality: 45, strength: 10, dexterity: 11, speed: 12 },
                abilities: [
                    {
                        name: "Beccata BBQ",
                        description: "Attacco con danni calorici",
                        effect: "Danno calorico + Scotta?"
                    },
                    {
                        name: "Volata di Salsa Piccante",
                        description: "Attacco ad area",
                        effect: "Colpisce tutto il party"
                    }
                ],
                drops: ["Ali di Fring"]
            },
            camion: {
                name: "Camion del Cartello",
                type: "miniboss",
                stats: { vitality: 150, strength: 22, dexterity: 4, speed: 3 },
                abilities: [
                    {
                        name: "Investimento Coordinato",
                        description: "Attacco alla prima fila",
                        effect: "Danni doppi alla prima fila"
                    }
                ],
                weakness: "electric",
                drops: ["Banconote di dubbia provenienza"]
            },
            methGolem: {
                name: "Meth Golem",
                stats: { vitality: 85, strength: 16, dexterity: 6, speed: 5 },
                abilities: [
                    {
                        name: "Cristallo Infiammato",
                        description: "Attacco tossico",
                        effect: "Danni + veleno per 2 turni"
                    },
                    {
                        name: "Fumo del Caos",
                        description: "Nube confondente",
                        effect: "Confusione per 1 turno"
                    }
                ],
                drops: ["Cristallo puro"]
            },
            gus: {
                name: "Gus Fring",
                type: "miniboss",
                stats: { vitality: 130, strength: 12, dexterity: 14, speed: 10 },
                abilities: [
                    {
                        name: "Taglio Chirurgico",
                        description: "Attacco di precisione",
                        effect: "Alta precisione + sanguinamento"
                    },
                    {
                        name: "Pollo della Morte",
                        description: "Evoca rinforzi",
                        effect: "Invoca 2 Pollos Guerreros"
                    }
                ],
                weakness: "sonic",
                drops: ["Abito elegante"]
            },
            skyler: {
                name: "Skyler White",
                type: "boss",
                stats: { vitality: 350, strength: 15, dexterity: 16, speed: 12 },
                abilities: [
                    {
                        name: "Modulo 730 Magico",
                        description: "Costringe a ricompilare le abilità",
                        effect: "Skip di turno generale"
                    },
                    {
                        name: "Sguardo del Giudizio Fiscale",
                        description: "Riduce le difese",
                        effect: "-20% difesa team per 2 turni"
                    },
                    {
                        name: "Audit Totale",
                        description: "Rimuove oggetti casuali",
                        effect: "Rimuove oggetto casuale dall'inventario"
                    },
                    {
                        name: "Tono Passivo-Aggressivo",
                        description: "Danno emotivo",
                        effect: "25 danni + confusione ad area"
                    },
                    {
                        name: "Divorzio Epico",
                        description: "Attacco al personaggio maschile con più HP",
                        effect: "Danno enorme al maschio con più HP"
                    }
                ],
                phase2: true,
                weakness: "sonic",
                drops: ["Manuale della Coerenza Domestica"]
            }
        },
        specialEvents: [
            {
                trigger: "combat_start",
                character: "cesare",
                description: "Cesare sviene quando sente parlare di 'sangue blu'!"
            },
            {
                trigger: "ability_use",
                character: "valentina",
                description: "Valentina trasforma il camper in un food truck di tacos magici!"
            },
            {
                trigger: "combat_end",
                character: "carmela",
                description: "La Paladina assume Gus come chef personale!"
            }
        ],
        specialAllies: {
            hank: {
                name: "Hank Schrader",
                description: "Ti aiuta per due battaglie",
                ability: {
                    name: "Boom di DEA",
                    description: "Colpisce tutti i nemici",
                    effect: "20 danni di esplosione a tutti i nemici"
                }
            },
            jesse: {
                name: "Jesse Pinkman",
                description: "Può essere reclutato o affrontato",
                recruit: {
                    requirement: "persuasion",
                    ability: {
                        name: "Boom, Bitch!",
                        description: "Attacco ad area caotico",
                        effect: "Danno ad area di tipo Caos"
                    }
                }
            }
        }
    },

    level3: {
        name: "Livello 3: La Bacchetta della Verità",
        theme: "harry_potter",
        enemies: {
            dementor: {
                name: "Dissennatore",
                stats: { vitality: 60, strength: 12, dexterity: 8, speed: 7 },
                abilities: [
                    {
                        name: "Bacio del Dissennatore",
                        description: "Ruba l'anima del bersaglio",
                        effect: "Danno + possibile riduzione statistiche permanenti"
                    }
                ],
                weakness: "patronus"
            },
            mangiamorte: {
                name: "Mangiamorte",
                stats: { vitality: 75, strength: 14, dexterity: 10, speed: 9 },
                abilities: [
                    {
                        name: "Avada Kedavra",
                        description: "Maledizione mortale",
                        effect: "Danno letale se il bersaglio è sotto il 20% HP"
                    },
                    {
                        name: "Crucio",
                        description: "Maledizione del dolore",
                        effect: "Danno continuo + confusione"
                    }
                ],
                drops: ["Bacchetta spezzata"]
            },
            bellatrix: {
                name: "Bellatrix Lestrange",
                type: "miniboss",
                stats: { vitality: 140, strength: 16, dexterity: 15, speed: 12 },
                abilities: [
                    {
                        name: "Follia Magica",
                        description: "Attacco caotico e imprevedibile",
                        effect: "Danni casuali + status casuali"
                    },
                    {
                        name: "Riso Maniacale",
                        description: "Distrae e confonde i nemici",
                        effect: "Confusione a tutto il party"
                    }
                ],
                drops: ["Medaglione di Bellatrix"]
            },
            voldemort: {
                name: "Lord Voldemort",
                type: "boss",
                stats: { vitality: 400, strength: 22, dexterity: 18, speed: 16 },
                abilities: [
                    {
                        name: "Maledizione Mortale",
                        description: "Attacca tante volte quanti i membri del party",
                        effect: "Multi-attacco + possibile confusione"
                    },
                    {
                        name: "Tempesta di Magia Oscura",
                        description: "Attacco ad area devastante",
                        effect: "Danno ad area + confusione + Scossa?"
                    },
                    {
                        name: "Incantesimo della Lentezza",
                        description: "Rallenta i nemici",
                        effect: "Lentezza a tutto il party"
                    },
                    {
                        name: "Fiamme dell'Oblio",
                        description: "Attacco infuocato",
                        effect: "Danno + Scotta? persistente"
                    },
                    {
                        name: "Rinascita dell'Oscuro Signore",
                        description: "Si rigenera quando sconfitto",
                        effect: "Rigenera 100 HP una volta"
                    }
                ],
                special: "Multi-attacco per ogni membro del party",
                weakness: "expelliarmus",
                drops: ["Frammento di anima", "Bacchetta di Sambuco"]
            }
        },
        locations: [
            {
                name: "Hogwarts",
                description: "La scuola di magia e stregoneria",
                events: ["Incontro con i professori", "Lezione di pozioni", "Partita di Quidditch"]
            },
            {
                name: "Foresta Proibita",
                description: "Bosco pericoloso pieno di creature magiche",
                events: ["Incontro con i centauri", "Aragog e la sua famiglia", "Draghi nascosti"]
            },
            {
                name: "Ministero della Magia",
                description: "Sede del governo magico",
                events: ["Sfuggire ai Mangiamorte", "Battaglia nell'atrio", "Salvataggio dei prigionieri"]
            }
        ],
        finalQuiz: {
            theme: ["rocket league", "dark souls", "crash bandicoot", "hollow knight", "harry potter"],
            questions: [
                {
                    question: "Qual è il nome della maledizione che uccide istantaneamente?",
                    options: ["Crucio", "Imperius", "Avada Kedavra", "Sectumsempra"],
                    answer: 2
                },
                {
                    question: "In Dark Souls, qual è il primo boss che si incontra?",
                    options: ["Ornstein e Smough", "Asylum Demon", "Gaping Dragon", "Quelaag"],
                    answer: 1
                },
                {
                    question: "In Rocket League, qual è la massima velocità di boost?",
                    options: ["100 km/h", "230 km/h", "180 km/h", "150 km/h"],
                    answer: 1
                },
                {
                    question: "Chi è il creatore di Aku Aku in Crash Bandicoot?",
                    options: ["Dr. Neo Cortex", "Dr. N. Gin", "Uka Uka", "I vecchi della tribù"]
                    answer: 3
                }
            ],
            successMessage: "Complimenti! Hai superato tutte le prove e completato l'avventura di laurea!",
            specialReward: "Titolo: 'Campione Multiversale' - Sei pronto per qualsiasi sfida la vita ti presenterà!"
        }
    }
};

// Sistema di progressione
const progressionSystem = {
    levelUp: (character) => {
        character.level += 1;
        character.currentStats.vitality += 10;
        character.currentStats.mana += 5;
        
        // Sblocca abilità ai livelli specifici
        if (character.level === 3) {
            character.abilities.unlocked.push(character.abilities.unlockable[0]);
        }
        if (character.level === 5) {
            character.abilities.unlocked.push(character.abilities.unlockable[1]);
        }
        
        return `🎉 ${character.name} è salito al livello ${character.level}!`;
    },
    
    calculateRewards: (enemy, level) => {
        const baseXP = enemy.stats.vitality / 2;
        const baseGold = enemy.stats.strength * 5;
        
        return {
            xp: Math.floor(baseXP * (level * 0.5)),
            gold: Math.floor(baseGold * (level * 0.3)),
            items: enemy.drops || []
        };
    }
};