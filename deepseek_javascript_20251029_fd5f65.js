// Statistiche di base per tutti i personaggi
const baseStats = {
    vitality: 50,
    mana: 30,
    charisma: 10,
    luck: 10,
    intelligence: 10,
    dexterity: 10,
    strength: 10,
    precision: 80,
    speed: 10
};

// Definizione dei personaggi
const characters = {
    valentina: {
        name: "Valentina",
        title: "Maga del Tutto-Tranne",
        quote: "Gioco a tutto, tranne a quello.",
        class: "maga",
        stats: {
            ...baseStats,
            mana: 60,
            intelligence: 15,
            charisma: 12,
            vitality: 45
        },
        equipment: {
            base: "Mantello del Multigioco",
            weapon: "Bacchetta del Caos Ordinato",
            special: "Joystick Arcano",
            magical: "Tomo del Tutto-Tranne",
            effect: "Incantesimi falliti infliggono 5 danni"
        },
        abilities: {
            starting: [
                {
                    name: "Multicast",
                    description: "Lancia due incantesimi, ma a caso",
                    cost: 40,
                    effect: "Uno funziona, l'altro al 50% di potenza",
                    type: "active"
                },
                {
                    name: "Palla di Fuoco",
                    description: "Lancia una palla di fuoco che può infliggere 'Scotta?'",
                    cost: 25,
                    effect: "Danno + possibile Scotta?",
                    type: "attack"
                },
                {
                    name: "Firewall di Guacamole",
                    description: "Crea una barriera verde impenetrabile",
                    cost: 30,
                    effect: "Riduce danni magici del 50% per 2 turni",
                    type: "defense"
                }
            ],
            unlockable: [
                {
                    name: "Grande Invocazione",
                    description: "Evoca miniature di altri universi videoludici",
                    cost: 60,
                    effect: "20 danni ad area a tutti i nemici",
                    type: "summon"
                },
                {
                    name: "Liberazione del Tutto-Tranne",
                    description: "Cura tutti gli alleati ma applica nuovi malus",
                    cost: 50,
                    effect: "Rimuove tutti i malus, poi applica nuovi malus per 1 turno in meno",
                    type: "special"
                }
            ]
        }
    },

    vincenzo: {
        name: "Vincenzo",
        title: "Artificiere Digitale",
        quote: "Se non funziona, lo ricompilo.",
        class: "artificiere",
        stats: {
            ...baseStats,
            intelligence: 18,
            dexterity: 12,
            vitality: 55,
            mana: 40
        },
        equipment: {
            base: "Guanti del Debug",
            weapon: "Chiave inglese quantistica",
            special: "Zaino con mini-server portatile",
            magical: "Visore a Realtà Mista",
            effect: "Ogni 3 turni azzera tutti i buff e malus"
        },
        abilities: {
            starting: [
                {
                    name: "Scarica Neurale",
                    description: "Infligge danni a tutti i nemici in base alla Magia",
                    cost: 30,
                    effect: "Danno magico ad area",
                    type: "attack"
                },
                {
                    name: "Hack del Sistema",
                    description: "Riduce la difesa dei nemici",
                    cost: 25,
                    effect: "-25% difesa nemici per 2 turni",
                    type: "debuff"
                },
                {
                    name: "Compilazione d'Emergenza",
                    description: "Cura un alleato e rimuove un malus",
                    cost: 35,
                    effect: "Cura 20 HP + rimuove 1 malus",
                    type: "support"
                }
            ],
            unlockable: [
                {
                    name: "Overclock Finale",
                    description: "Potenzia tutto il team",
                    cost: 50,
                    effect: "+50% Forza e Magia per 3 turni",
                    type: "buff"
                },
                {
                    name: "Virus Empatico",
                    description: "Duplica il danno subito e lo restituisce",
                    cost: 40,
                    effect: "Restituisce il danno subito",
                    type: "counter"
                }
            ]
        }
    },

    cesare: {
        name: "Cesare",
        title: "Araldo dell'Assenza Strategica",
        quote: "Io non faccio tardi, non mi presento.",
        class: "araldo",
        stats: {
            ...baseStats,
            charisma: 14,
            luck: 12,
            dexterity: 8,
            vitality: 50
        },
        equipment: {
            base: "Cappello dell'Inutilità Regale",
            weapon: "Trombetta del Nulla",
            special: "Calendario dei Forse",
            magical: "Clessidra che scorre all'indietro",
            effect: "30% probabilità di sparire per un turno"
        },
        abilities: {
            starting: [
                {
                    name: "Annuncio in Ritardo",
                    description: "Infligge confusione a tutti",
                    cost: 20,
                    effect: "Confusione a nemici (2 turni) e alleati (1 turno)",
                    type: "debuff"
                },
                {
                    name: "Scomparsa Scenica",
                    description: "Diventa intangibile",
                    cost: 15,
                    effect: "Intangibile per 2 turni, ma non può agire",
                    type: "defense"
                },
                {
                    name: "Rinvio Eroico",
                    description: "Posticipa l'attacco di un nemico",
                    cost: 25,
                    effect: "Nemico salta il turno",
                    type: "control"
                }
            ],
            unlockable: [
                {
                    name: "Assenza Totale",
                    description: "Scompare completamente",
                    cost: 40,
                    effect: "Scompare per 2 turni, al ritorno cura 50 HP a tutti",
                    type: "special"
                },
                {
                    name: "Richiamo del Silenzio",
                    description: "Disattiva tutte le abilità nemiche",
                    cost: 35,
                    effect: "Nemici non possono usare abilità per 1 turno",
                    type: "control"
                }
            ]
        }
    },

    federica: {
        name: "Federica",
        title: "Il Tardo Bardo",
        quote: "Non stono, invento nuove note.",
        class: "bardo",
        stats: {
            ...baseStats,
            charisma: 16,
            dexterity: 11,
            vitality: 48,
            mana: 35
        },
        equipment: {
            base: "Liuto del Ritardo Armonico",
            weapon: "Pugnale d'Ottava Bassa",
            special: "Cappa del Pubblico Vuoto",
            magical: "Tamburello dell'Imprevisto",
            effect: "Se un alleato sbaglia un tiro, cura metà del danno"
        },
        abilities: {
            starting: [
                {
                    name: "Canzone Stonata",
                    description: "Riduce precisione e infligge confusione",
                    cost: 20,
                    effect: "-15% precisione + confusione a un nemico",
                    type: "debuff"
                },
                {
                    name: "Assolo Improvvisato",
                    description: "Cura un alleato con melodia casuale",
                    cost: 25,
                    effect: "Cura 20 HP a un alleato",
                    type: "heal"
                },
                {
                    name: "Ritmo Ritardato",
                    description: "Attacco che si attiva dopo 1 turno",
                    cost: 30,
                    effect: "30 danni puri dopo 1 turno",
                    type: "attack"
                }
            ],
            unlockable: [
                {
                    name: "Sinfonia del Caos",
                    description: "Potenzia tutto il team",
                    cost: 45,
                    effect: "+5 a tutte le statistiche per 2 turni",
                    type: "buff"
                },
                {
                    name: "Bis del Fallimento",
                    description: "Replica l'ultima azione di un alleato morto",
                    cost: 0,
                    effect: "Usa l'ultima abilità dell'alleato morto",
                    type: "special"
                }
            ]
        }
    },

    carmela: {
        name: "Carmela",
        title: "Paladina del Buffet",
        quote: "In nome del carboidrato, io ti assolvo!",
        class: "paladina",
        stats: {
            ...baseStats,
            strength: 15,
            vitality: 65,
            dexterity: 8,
            charisma: 12
        },
        equipment: {
            base: "Armatura in Alluminio Dorato",
            weapon: "Forchetta +5 della Giustizia",
            special: "Scudo-vassoio sacro",
            magical: "Coppa della Maionese Eterna",
            effect: "Rigenera 5 HP agli alleati sotto il 50% HP"
        },
        abilities: {
            starting: [
                {
                    name: "Pugno Proteico",
                    description: "Attacco fisico con danni calorici",
                    cost: 20,
                    effect: "Danno +10 Forza + danni calorici extra",
                    type: "attack"
                },
                {
                    name: "Preghiera al Forno",
                    description: "Cura tutti gli alleati",
                    cost: 30,
                    effect: "Cura 15 HP a tutti gli alleati",
                    type: "heal"
                },
                {
                    name: "Difesa Panata",
                    description: "Riduce i danni subiti",
                    cost: 25,
                    effect: "-30% danni subiti per 2 turni",
                    type: "defense"
                }
            ],
            unlockable: [
                {
                    name: "Banchetto Benedetto",
                    description: "Rigenera tutto il team",
                    cost: 40,
                    effect: "Cura HP + bonus Forza temporaneo",
                    type: "buff"
                },
                {
                    name: "Dieta dell'Apocalisse",
                    description: "Attacco finale devastante",
                    cost: 50,
                    effect: "50 danni a tutti i nemici, -2 Agilità per 3 turni",
                    type: "attack"
                }
            ]
        }
    },

    william: {
        name: "William",
        title: "Ladro Immigrato",
        quote: "Io non rubo, redistribuisco... geograficamente.",
        class: "ladro",
        stats: {
            ...baseStats,
            dexterity: 16,
            luck: 14,
            strength: 11,
            vitality: 52
        },
        equipment: {
            base: "Zaino da Frontiera",
            weapon: "Coltello del Contrabbando",
            special: "Mantello dell'Invisibilità Burocratica",
            magical: "Documento di Viaggio Falso +3",
            effect: "+15% chance di trovare oggetti rari"
        },
        abilities: {
            starting: [
                {
                    name: "Colpo Transfrontaliero",
                    description: "Attacco rapido che ignora le difese",
                    cost: 25,
                    effect: "Danno diretto +10",
                    type: "attack"
                },
                {
                    name: "Passaporto Falso",
                    description: "Evita effetti di blocco o trappole",
                    cost: 15,
                    effect: "Immunità a blocco/trappole per 2 turni",
                    type: "utility"
                },
                {
                    name: "Furto Solidale",
                    description: "Ruba HP o Mana al nemico",
                    cost: 20,
                    effect: "Ruba 10 HP o 5 Mana e li trasferisce a un alleato",
                    type: "steal"
                }
            ],
            unlockable: [
                {
                    name: "Espatrio Istantaneo",
                    description: "Teletrasporto dietro al nemico",
                    cost: 35,
                    effect: "Doppio danno critico",
                    type: "attack"
                },
                {
                    name: "Rete di Contatti Oscuri",
                    description: "Evoca mercanti o alleati ombra",
                    cost: 40,
                    effect: "Oggetti casuali per tutto il team",
                    type: "summon"
                }
            ]
        }
    }
};

// Status effects
const statusEffects = {
    burning: {
        name: "Scotta?",
        description: "Subisci danni a fine turno (1/15 PV)",
        duration: 3,
        onTurnEnd: (target) => {
            const damage = Math.ceil(target.currentStats.vitality / 15);
            target.currentStats.vitality -= damage;
            return `${target.name} subisce ${damage} danni da Scotta?`;
        }
    },
    shocked: {
        name: "Scossa?",
        description: "Infligge danni all'inizio del turno (1/20 PV)",
        duration: 2,
        onTurnStart: (target) => {
            const damage = Math.ceil(target.currentStats.vitality / 20);
            target.currentStats.vitality -= damage;
            return `${target.name} subisce ${damage} danni da Scossa?`;
        }
    },
    bleeding: {
        name: "Sanguinamento",
        description: "Perde 2 PV per ogni azione",
        duration: 4,
        onAction: (target) => {
            target.currentStats.vitality -= 2;
            return `${target.name} perde 2 PV per sanguinamento`;
        }
    },
    confused: {
        name: "Confusione",
        description: "-20% precisione, 33% chance di attaccare alleato",
        duration: 2,
        modifier: { precision: -20 }
    },
    slowed: {
        name: "Lentezza",
        description: "Agisci per ultimo, -10% danni",
        duration: 3,
        modifier: { speed: -50, damage: -0.1 }
    }
};