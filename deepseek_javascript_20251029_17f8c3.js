// Sistema di combattimento
class CombatSystem {
    constructor(player, enemies) {
        this.player = player;
        this.enemies = enemies;
        this.turnOrder = [];
        this.currentTurn = 0;
        this.combatLog = [];
        this.initCombat();
    }

    initCombat() {
        // Determina l'ordine di turno basato sulla velocità
        this.turnOrder = this.calculateTurnOrder();
        this.currentTurn = 0;
        this.log(`Inizia il combattimento! ${this.player.name} vs ${this.enemies.map(e => e.name).join(', ')}`);
    }

    calculateTurnOrder() {
        const combatants = [this.player, ...this.enemies];
        return combatants.sort((a, b) => b.currentStats.speed - a.currentStats.speed);
    }

    log(message) {
        this.combatLog.push(message);
        console.log(message);
    }

    async executeTurn() {
        const currentCombatant = this.turnOrder[this.currentTurn];
        
        if (currentCombatant.currentStats.vitality <= 0) {
            this.nextTurn();
            return;
        }

        // Gestisci effetti di status all'inizio del turno
        this.processStatusEffects(currentCombatant, 'start');

        if (currentCombatant === this.player) {
            // Turno del giocatore - attende input
            return await this.playerTurn();
        } else {
            // Turno del nemico - AI
            await this.enemyTurn(currentCombatant);
            this.nextTurn();
        }
    }

    async playerTurn() {
        // Questa funzione sarà chiamata dall'UI quando il giocatore seleziona un'azione
        return new Promise((resolve) => {
            this.resolvePlayerAction = resolve;
        });
    }

    playerAction(action, target = null) {
        if (this.resolvePlayerAction) {
            this.resolvePlayerAction({ action, target });
            this.resolvePlayerAction = null;
        }
    }

    async enemyTurn(enemy) {
        // AI semplice per i nemici
        const abilities = enemy.abilities.filter(ability => 
            !ability.cooldown || ability.cooldown === 0
        );

        let chosenAbility;
        if (abilities.length > 0 && Math.random() > 0.6) {
            // Usa un'abilità speciale
            chosenAbility = abilities[Math.floor(Math.random() * abilities.length)];
        } else {
            // Attacco base
            chosenAbility = { 
                name: "Attacco", 
                effect: `Infligge ${enemy.currentStats.strength} danni` 
            };
        }

        const target = this.getRandomAlivePlayer();
        if (!target) return;

        this.useAbility(enemy, chosenAbility, target);
        
        // Applica cooldown se presente
        if (chosenAbility.cooldown) {
            chosenAbility.currentCooldown = chosenAbility.cooldown;
        }
    }

    useAbility(user, ability, target) {
        this.log(`${user.name} usa ${ability.name} su ${target.name}!`);
        
        let damage = 0;
        let statusEffect = null;

        // Calcola il danno base
        if (ability.name === "Attacco") {
            damage = user.currentStats.strength;
        } else {
            // Logica per abilità speciali
            damage = this.calculateAbilityDamage(user, ability);
            statusEffect = ability.statusEffect;
        }

        // Applica il danno
        if (damage > 0) {
            const finalDamage = this.applyDamage(target, damage);
            this.log(`Infligge ${finalDamage} danni a ${target.name}!`);
        }

        // Applica effetti di status
        if (statusEffect) {
            this.applyStatusEffect(target, statusEffect);
        }

        // Gestisci effetti speciali dell'equipaggiamento
        this.processEquipmentEffects(user, ability);
    }

    calculateAbilityDamage(user, ability) {
        let baseDamage = user.currentStats.strength;
        
        // Modificatori basati sul tipo di abilità
        switch(ability.type) {
            case 'magic':
                baseDamage += user.currentStats.intelligence * 0.5;
                break;
            case 'ranged':
                baseDamage += user.currentStats.dexterity * 0.3;
                break;
            case 'stealth':
                baseDamage += user.currentStats.luck * 0.2;
                break;
        }

        // Variabilità del danno (±20%)
        const variance = 0.8 + (Math.random() * 0.4);
        return Math.floor(baseDamage * variance);
    }

    applyDamage(target, damage) {
        // Calcola la riduzione del danno basata sulla difesa
        const defenseReduction = target.currentStats.strength * 0.1;
        const finalDamage = Math.max(1, Math.floor(damage - defenseReduction));
        
        target.currentStats.vitality -= finalDamage;
        
        if (target.currentStats.vitality <= 0) {
            target.currentStats.vitality = 0;
            this.log(`💀 ${target.name} è stato sconfitto!`);
        }

        return finalDamage;
    }

    applyStatusEffect(target, effectType) {
        const effect = statusEffects[effectType];
        if (effect) {
            target.statusEffects.push({
                ...effect,
                duration: effect.duration,
                turnsRemaining: effect.duration
            });
            this.log(`⚡ ${target.name} è affetto da ${effect.name}!`);
        }
    }

    processStatusEffects(combatant, phase) {
        const effectsToRemove = [];
        
        combatant.statusEffects.forEach((effect, index) => {
            if (phase === 'start' && effect.onTurnStart) {
                const message = effect.onTurnStart(combatant);
                this.log(message);
            }
            
            effect.turnsRemaining--;
            
            if (effect.turnsRemaining <= 0) {
                effectsToRemove.push(index);
                this.log(`✅ ${combatant.name} non è più affetto da ${effect.name}`);
            }
        });

        // Rimuovi effetti scaduti
        effectsToRemove.reverse().forEach(index => {
            combatant.statusEffects.splice(index, 1);
        });
    }

    processEquipmentEffects(user, ability) {
        // Effetti speciali dell'equipaggiamento
        switch(user.name) {
            case 'Valentina':
                if (Math.random() < 0.5) { // 50% di probabilità
                    this.log(`✨ ${user.name}: Incantesimo fallito ma infligge 5 danni per puro carisma!`);
                    this.enemies.forEach(enemy => {
                        if (enemy.currentStats.vitality > 0) {
                            enemy.currentStats.vitality -= 5;
                        }
                    });
                }
                break;
            case 'Vincenzo':
                user.equipmentTurns = (user.equipmentTurns || 0) + 1;
                if (user.equipmentTurns >= 3) {
                    this.log(`🔄 ${user.name} riavvia il sistema! Tutti i buff e malus vengono azzerati!`);
                    user.statusEffects = [];
                    user.equipmentTurns = 0;
                }
                break;
            // Aggiungi altri effetti di equipaggiamento qui
        }
    }

    getRandomAlivePlayer() {
        const alivePlayers = [this.player].filter(p => p.currentStats.vitality > 0);
        return alivePlayers.length > 0 ? alivePlayers[0] : null;
    }

    nextTurn() {
        this.currentTurn = (this.currentTurn + 1) % this.turnOrder.length;
        
        // Riduci cooldown delle abilità
        this.turnOrder.forEach(combatant => {
            combatant.abilities?.forEach(ability => {
                if (ability.currentCooldown > 0) {
                    ability.currentCooldown--;
                }
            });
        });

        // Controlla se il combattimento è finito
        if (this.checkCombatEnd()) {
            this.endCombat();
        }
    }

    checkCombatEnd() {
        const playerAlive = this.player.currentStats.vitality > 0;
        const enemiesAlive = this.enemies.some(enemy => enemy.currentStats.vitality > 0);
        
        return !playerAlive || !enemiesAlive;
    }

    endCombat() {
        const playerWon = this.player.currentStats.vitality > 0;
        
        if (playerWon) {
            this.log('🎉 Vittoria! Hai sconfitto tutti i nemici!');
            // Calcola ricompense
            const rewards = progressionSystem.calculateRewards(
                this.enemies[0], 
                this.player.level
            );
            this.log(`Ricompense: ${rewards.xp} XP, ${rewards.gold} oro`);
        } else {
            this.log('💀 Sconfitta... Meglio fortuna la prossima volta!');
        }

        this.combatEnded = true;
    }

    getCombatState() {
        return {
            player: { ...this.player },
            enemies: this.enemies.map(e => ({ ...e })),
            turnOrder: this.turnOrder.map(c => c.name),
            currentTurn: this.turnOrder[this.currentTurn]?.name,
            combatLog: [...this.combatLog],
            ended: this.combatEnded
        };
    }
}

// Gestione delle sinergie tra personaggi
const synergySystem = {
    checkSynergy: (party, currentLevel) => {
        const synergies = [];
        
        // Valentina + Vincenzo
        if (party.includes('valentina') && party.includes('vincenzo')) {
            synergies.push({
                name: "Crash Chimico",
                description: "Attacco combinato che manda in tilt nemici tecnologici/chimici",
                effect: "Danno extra a nemici di tipo tecnologico o chimico"
            });
        }
        
        // Cesare + Federica
        if (party.includes('cesare') && party.includes('federica')) {
            synergies.push({
                name: "Ritardo Corale",
                description: "Entrambi saltano il turno, ma i nemici ridono troppo per attaccare",
                effect: "Nemici saltano il turno successivo"
            });
        }
        
        // Carmela + William
        if (party.includes('carmela') && party.includes('william')) {
            synergies.push({
                name: "Buffet del Contrabbando",
                description: "Recuperano HP rubando razioni",
                effect: "Recuperano 20 HP ciascuno"
            });
        }

        return synergies;
    },

    executeSynergy: (synergy, combatSystem) => {
        switch(synergy.name) {
            case "Crash Chimico":
                combatSystem.log(`💥 Sinergia attivata: ${synergy.name}!`);
                combatSystem.enemies.forEach(enemy => {
                    if (enemy.type === 'technological' || enemy.type === 'chemical') {
                        const damage = 25;
                        enemy.currentStats.vitality -= damage;
                        combatSystem.log(`${enemy.name} subisce ${damage} danni extra!`);
                    }
                });
                break;
                
            case "Ritardo Corale":
                combatSystem.log(`🎭 Sinergia attivata: ${synergy.name}!`);
                combatSystem.log("I nemici sono troppo divertiti per attaccare!");
                combatSystem.enemies.forEach(enemy => {
                    enemy.skipNextTurn = true;
                });
                break;
                
            case "Buffet del Contrabbando":
                combatSystem.log(`🍗 Sinergia attivata: ${synergy.name}!`);
                const carmela = combatSystem.turnOrder.find(c => c.name === 'Carmela');
                const william = combatSystem.turnOrder.find(c => c.name === 'William');
                
                if (carmela) carmela.currentStats.vitality += 20;
                if (william) william.currentStats.vitality += 20;
                
                combatSystem.log("Carmela e William recuperano 20 HP ciascuno!");
                break;
        }
    }
};