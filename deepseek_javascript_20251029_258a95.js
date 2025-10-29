// Sistema principale del gioco
class Game {
    constructor() {
        this.currentLevel = 1;
        this.selectedCharacter = null;
        this.gameState = 'character_select';
        this.combatSystem = null;
        this.party = [];
        this.inventory = [];
        this.gold = 100;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.showCharacterSelection();
    }

    bindEvents() {
        document.getElementById('start-game').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('next-level').addEventListener('click', () => {
            this.nextLevel();
        });
    }

    showCharacterSelection() {
        const container = document.getElementById('character-selection');
        container.innerHTML = '';

        Object.values(characters).forEach(char => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.innerHTML = `
                <h3>${char.name} - ${char.title}</h3>
                <p><em>"${char.quote}"</em></p>
                <div class="character-stats">
                    ${Object.entries(char.stats).map(([stat, value]) => `
                        <div class="stat">
                            <strong>${stat}:</strong> ${value}
                        </div>
                    `).join('')}
                </div>
                <h4>Equipaggiamento:</h4>
                <ul>
                    <li>🎒 ${char.equipment.base}</li>
                    <li>⚔️ ${char.equipment.weapon}</li>
                    <li>🧰 ${char.equipment.special}</li>
                    <li>🪄 ${char.equipment.magical}</li>
                </ul>
                <p>✨ ${char.equipment.effect}</p>
            `;

            card.addEventListener('click', () => {
                document.querySelectorAll('.character-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.selectedCharacter = char;
            });

            container.appendChild(card);
        });
    }

    startGame() {
        if (!this.selectedCharacter) {
            alert('Seleziona un personaggio!');
            return;
        }

        this.gameState = 'playing';
        this.party = [this.createPlayerCharacter(this.selectedCharacter)];
        
        document.getElementById('start-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        
        this.startLevel(1);
    }

    createPlayerCharacter(charData) {
        return {
            ...charData,
            level: 1,
            currentStats: { ...charData.stats },
            statusEffects: [],
            abilities: {
                starting: [...charData.abilities.starting],
                unlocked: [],
                unlockable: [...charData.abilities.unlockable]
            },
            equipmentTurns: 0
        };
    }

    startLevel(levelNumber) {
        this.currentLevel = levelNumber;
        const level = gameLevels[`level${levelNumber}`];
        
        document.getElementById('level-info').textContent = level.name;
        this.showStoryIntroduction(level);
    }

    showStoryIntroduction(level) {
        const storyText = document.getElementById('story-text');
        
        let introduction = '';
        switch(level.theme) {
            case 'minecraft':
                introduction = `
                    <h2>Livello 1: Avventura Minecraft</h2>
                    <p>Ti risvegli in un mondo cubico, circondato da blocchi di erba e alberi pixelati. 
                    L'aria profuma di terra e avventura. Davanti a te si estende una vasta pianura, 
                    ma attenzione: quando cala la notte, le creature ostili escono allo scoperto!</p>
                    <p>Il tuo obiettivo: esplorare le caverne, sconfiggere il Wither e trovare la Stella del Nether.</p>
                `;
                break;
            case 'breaking_bad':
                introduction = `
                    <h2>Livello 2: ALBUQUERQUE - CRYSTAL QUEST</h2>
                    <p>Il caldo torrido del deserto del New Mexico ti avvolge. Davanti a te, un camper arrugginito 
                    emana strani fumi blu. Questa è la terra della Metacristallina del Caos, una sostanza che 
                    potenzia le magie ma distrugge lentamente la mente di chi la usa.</p>
                    <p>Attraversa il deserto, affronta i cartelli della droga e sconfiggi Skyler White per 
                    ottenere il prezioso cristallo!</p>
                `;
                break;
            case 'harry_potter':
                introduction = `
                    <h2>Livello 3: La Bacchetta della Verità</h2>
                    <p>Hai ricevuto una lettera da Hogwarts! Ma questa non è una storia comune... 
                    Lord Voldemort ha rubato la Bacchetta della Verità e sta cercando di dominare tutti i mondi.</p>
                    <p>Viaggia attraverso la scuola di magia, la Foresta Proibita e il Ministero della Magia 
                    per sconfiggere l'Oscuro Signore una volta per tutte!</p>
                `;
                break;
        }

        storyText.innerHTML = introduction;
        this.showLevelChoices(level);
    }

    showLevelChoices(level) {
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = '';

        const choices = [
            { text: "Esplora l'area", action: () => this.exploreArea(level) },
            { text: "Cerca nemici", action: () => this.startRandomEncounter(level) },
            { text: "Controlla inventario", action: () => this.showInventory() }
        ];

        choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.addEventListener('click', choice.action);
            choicesContainer.appendChild(button);
        });
    }

    exploreArea(level) {
        const randomEvent = level.events[Math.floor(Math.random() * level.events.length)];
        const storyText = document.getElementById('story-text');
        
        switch(randomEvent.type) {
            case 'chest':
                storyText.innerHTML = `
                    <h3>📦 Forziere Trovato!</h3>
                    <p>${randomEvent.description}</p>
                    <p>Contiene: ${randomEvent.rewards.join(', ')}</p>
                `;
                this.inventory.push(...randomEvent.rewards);
                break;
                
            case 'merchant':
                storyText.innerHTML = `
                    <h3>👨‍🌾 Mercante Villager</h3>
                    <p>${randomEvent.description}</p>
                    <p>Scambia i tuoi oggetti con lui!</p>
                `;
                // Qui si potrebbe implementare un sistema di trading
                break;
                
            case 'puzzle':
                storyText.innerHTML = `
                    <h3>🧩 Enigma Misterioso</h3>
                    <p>${randomEvent.description}</p>
                    <p>Risolvi l'enigma per procedere!</p>
                `;
                this.showPuzzle(randomEvent);
                break;
        }

        this.showContinueButton();
    }

    startRandomEncounter(level) {
        const enemyKeys = Object.keys(level.enemies);
        const randomEnemyKey = enemyKeys[Math.floor(Math.random() * enemyKeys.length)];
        const enemyData = level.enemies[randomEnemyKey];
        
        const enemy = {
            ...enemyData,
            currentStats: { ...enemyData.stats },
            statusEffects: []
        };

        this.startCombat([enemy]);
    }

    startCombat(enemies) {
        document.getElementById('combat-interface').classList.remove('hidden');
        this.combatSystem = new CombatSystem(this.party[0], enemies);
        
        this.updateCombatUI();
        this.executeCombatTurn();
    }

    updateCombatUI() {
        const enemyInfo = document.getElementById('enemy-info');
        const playerActions = document.getElementById('player-actions');
        const combatLog = document.getElementById('combat-log');

        // Aggiorna info nemici
        enemyInfo.innerHTML = this.combatSystem.enemies.map(enemy => `
            <div class="enemy">
                <h4>${enemy.name} ${enemy.type ? `(${enemy.type})` : ''}</h4>
                <div class="health-bar">
                    <div class="health-fill" style="width: ${(enemy.currentStats.vitality / enemy.stats.vitality) * 100}%"></div>
                </div>
                <p>HP: ${enemy.currentStats.vitality}/${enemy.stats.vitality}</p>
                ${enemy.statusEffects.length > 0 ? `
                    <p>Status: ${enemy.statusEffects.map(e => `<span class="status-effect ${e.name.toLowerCase()}">${e.name}</span>`).join(' ')}</p>
                ` : ''}
            </div>
        `).join('');

        // Aggiorna azioni giocatore
        playerActions.innerHTML = '';
        const player = this.combatSystem.player;
        
        // Azione base
        const basicAttackBtn = document.createElement('button');
        basicAttackBtn.className = 'action-btn';
        basicAttackBtn.textContent = 'Attacco Base';
        basicAttackBtn.addEventListener('click', () => {
            const target = this.combatSystem.enemies[0]; // Per semplicità
            this.combatSystem.playerAction({ name: 'Attacco' }, target);
        });
        playerActions.appendChild(basicAttackBtn);

        // Abilità speciali
        player.abilities.starting.forEach(ability => {
            const abilityBtn = document.createElement('button');
            abilityBtn.className = 'action-btn';
            abilityBtn.textContent = ability.name;
            abilityBtn.title = `${ability.description}\nCosto: ${ability.cost} MP\nEffetto: ${ability.effect}`;
            
            abilityBtn.addEventListener('click', () => {
                const target = this.combatSystem.enemies[0];
                this.combatSystem.playerAction(ability, target);
            });
            
            playerActions.appendChild(abilityBtn);
        });

        // Aggiorna log combattimento
        combatLog.innerHTML = this.combatSystem.combatLog.slice(-5).map(log => `
            <div>${log}</div>
        `).join('');
    }

    async executeCombatTurn() {
        if (this.combatSystem.combatEnded) {
            this.endCombat();
            return;
        }

        const currentCombatant = this.combatSystem.turnOrder[this.combatSystem.currentTurn];
        
        if (currentCombatant === this.combatSystem.player) {
            // Aspetta l'input del giocatore
            this.updateCombatUI();
        } else {
            // Esegui turno nemico
            await this.combatSystem.executeTurn();
            this.updateCombatUI();
            
            if (!this.combatSystem.combatEnded) {
                setTimeout(() => this.executeCombatTurn(), 1000);
            } else {
                this.endCombat();
            }
        }
    }

    endCombat() {
        document.getElementById('combat-interface').classList.add('hidden');
        
        if (this.combatSystem.player.currentStats.vitality > 0) {
            this.showVictoryMessage();
        } else {
            this.showDefeatMessage();
        }
    }

    showVictoryMessage() {
        const storyText = document.getElementById('story-text');
        storyText.innerHTML = `
            <h2>🎉 Vittoria!</h2>
            <p>Hai sconfitto tutti i nemici! Sei un passo più vicino alla vittoria finale.</p>
            <p>Preparati per la prossima sfida!</p>
        `;
        
        this.showContinueButton();
    }

    showDefeatMessage() {
        const storyText = document.getElementById('story-text');
        storyText.innerHTML = `
            <h2>💀 Sconfitta</h2>
            <p>Sei stato sconfitto... ma non arrenderti!</p>
            <p>Riprova con una strategia diversa.</p>
        `;
        
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = '';
        
        const retryBtn = document.createElement('button');
        retryBtn.className = 'choice-btn';
        retryBtn.textContent = 'Riprova';
        retryBtn.addEventListener('click', () => {
            this.startLevel(this.currentLevel);
        });
        choicesContainer.appendChild(retryBtn);
    }

    showContinueButton() {
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = '';
        
        const continueBtn = document.createElement('button');
        continueBtn.className = 'choice-btn';
        continueBtn.textContent = 'Continua';
        continueBtn.addEventListener('click', () => {
            this.showLevelChoices(gameLevels[`level${this.currentLevel}`]);
        });
        choicesContainer.appendChild(continueBtn);
    }

    showInventory() {
        const storyText = document.getElementById('story-text');
        storyText.innerHTML = `
            <h2>🎒 Inventario</h2>
            <p>Oro: ${this.gold}</p>
            <ul>
                ${this.inventory.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p>Equipaggiamento di ${this.party[0].name}:</p>
            <ul>
                <li>🎒 ${this.party[0].equipment.base}</li>
                <li>⚔️ ${this.party[0].equipment.weapon}</li>
                <li>🧰 ${this.party[0].equipment.special}</li>
                <li>🪄 ${this.party[0].equipment.magical}</li>
            </ul>
        `;
        
        this.showContinueButton();
    }

    nextLevel() {
        this.currentLevel++;
        
        if (this.currentLevel > 3) {
            this.completeGame();
        } else {
            document.getElementById('level-complete-screen').classList.remove('active');
            document.getElementById('game-screen').classList.add('active');
            this.startLevel(this.currentLevel);
        }
    }

    completeGame() {
        document.getElementById('game-screen').classList.remove('active');
        document.getElementById('game-complete-screen').classList.add('active');
        
        const finalMessage = document.getElementById('final-message');
        finalMessage.innerHTML = `
            <h3>🎓 Congratulazioni, Vincenzo!</h3>
            <p>Hai completato con successo la tua Avventura di Laurea!</p>
            <p>Sei riuscito a superare tutte le sfide nei tre mondi:</p>
            <ul>
                <li>✅ Il mondo cubico di Minecraft</li>
                <li>✅ I pericoli del deserto di Breaking Bad</li>
                <li>✅ La magia di Harry Potter</li>
            </ul>
            <p>Ora sei pronto per affrontare qualsiasi sfida la vita reale ti presenterà!</p>
            <p><strong>Complimenti per la laurea! 🎉</strong></p>
            <p><em>Da: I tuoi amici - Cesare, Carmela, William, Federica, Valentina</em></p>
        `;
    }

    showPuzzle(puzzleEvent) {
        // Implementa qui la logica per gli enigmi
        // Per semplicità, mostriamo un messaggio fisso
        const storyText = document.getElementById('story-text');
        storyText.innerHTML += `
            <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                <h4>🧩 Quiz Speciale!</h4>
                <p>Domanda: In Rocket League, qual è il nome dell'arena principale?</p>
                <button class="choice-btn" onclick="game.answerPuzzle(0)">Mannfield</button>
                <button class="choice-btn" onclick="game.answerPuzzle(1)">Salt Lake</button>
                <button class="choice-btn" onclick="game.answerPuzzle(2)">Urban Central</button>
                <button class="choice-btn" onclick="game.answerPuzzle(3)">Beckwith Park</button>
            </div>
        `;
    }

    answerPuzzle(answerIndex) {
        const correctAnswer = 0; // Mannfield
        const storyText = document.getElementById('story-text');
        
        if (answerIndex === correctAnswer) {
            storyText.innerHTML = `
                <h3>✅ Risposta Corretta!</h3>
                <p>Complimenti! Hai risolto l'enigma.</p>
                <p>Ricevi un bonus speciale: tutti i personaggi guadagnano +5 a tutte le statistiche per i prossimi 4 incontri!</p>
            `;
        } else {
            storyText.innerHTML = `
                <h3>❌ Risposta Errata</h3>
                <p>La risposta corretta era: Mannfield</p>
                <p>Non preoccuparti, puoi comunque continuare l'avventura!</p>
            `;
        }
        
        this.showContinueButton();
    }
}

// Inizializza il gioco quando la pagina è caricata
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new Game();
});