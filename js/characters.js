// Gestione personaggi con sistema statistiche avanzato
class CharacterManager {
    constructor() {
        this.currentCharacter = 'valentina';
        this.statPoints = 50;
        this.characterStats = {
            valentina: this.loadCharacterStats('valentina'),
            vincenzo: this.loadCharacterStats('vincenzo'),
            cesare: this.loadCharacterStats('cesare'),
            bardo: this.loadCharacterStats('bardo'),
            paladina: this.loadCharacterStats('paladina'),
            william: this.loadCharacterStats('william')
        };
        this.init();
    }

    init() {
        console.log('🔄 Inizializzazione gestione personaggi avanzata...');
        this.setupCharacterNavigation();
        this.setupCharacterSelection();
        this.setupStatControls();
        this.loadCharacterData();
        this.createSoulParticles();
        console.log('✅ Gestione personaggi avanzata inizializzata!');
    }

    loadCharacterStats(character) {
        const saved = localStorage.getItem(`charStats_${character}`);
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Statistiche di default per ogni personaggio
        const defaultStats = {
            valentina: { vitality: 70, mana: 100, charisma: 85, luck: 60, intelligence: 90, dexterity: 65, strength: 50 },
            vincenzo: { vitality: 75, mana: 80, charisma: 70, luck: 65, intelligence: 95, dexterity: 75, strength: 60 },
            cesare: { vitality: 65, mana: 70, charisma: 75, luck: 80, intelligence: 60, dexterity: 55, strength: 45 },
            bardo: { vitality: 60, mana: 90, charisma: 95, luck: 70, intelligence: 65, dexterity: 75, strength: 40 },
            paladina: { vitality: 90, mana: 50, charisma: 80, luck: 65, intelligence: 55, dexterity: 45, strength: 85 },
            william: { vitality: 65, mana: 60, charisma: 70, luck: 90, intelligence: 75, dexterity: 95, strength: 55 }
        };
        
        return {
            stats: defaultStats[character],
            pointsUsed: 0
        };
    }

    saveCharacterStats(character) {
        localStorage.setItem(`charStats_${character}`, JSON.stringify(this.characterStats[character]));
    }

    setupStatControls() {
        // Pulsanti +10/-10 per le statistiche
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('stat-btn')) {
                this.handleStatChange(e.target);
            }
        });

        // Pulsanti reset statistiche
        const resetButtons = document.querySelectorAll('.reset-stats');
        resetButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const character = e.target.dataset.character;
                this.resetCharacterStats(character);
            });
        });
    }

    handleStatChange(button) {
        const character = this.currentCharacter;
        const stat = button.dataset.stat;
        const change = button.classList.contains('plus-btn') ? 10 : -10;
        
        const currentValue = this.characterStats[character].stats[stat];
        const newValue = currentValue + change;
        
        // Controlla i limiti
        if (newValue < 0 || newValue > 100) {
            this.showStatError('Il valore deve essere tra 0 e 100!');
            return;
        }
        
        // Controlla i punti disponibili
        const pointsElement = document.getElementById(`stat-points-${character}`);
        const currentPoints = parseInt(pointsElement.textContent);
        
        if (change > 0 && currentPoints < 10) {
            this.showStatError('Punti insufficienti!');
            return;
        }
        
        // Aggiorna il valore
        this.characterStats[character].stats[stat] = newValue;
        this.characterStats[character].pointsUsed += change > 0 ? -10 : 10;
        
        // Aggiorna la visualizzazione
        this.updateStatDisplay(character, stat, newValue);
        this.updatePointsDisplay(character);
        
        // Salva le modifiche
        this.saveCharacterStats(character);
        
        // Effetto visivo
        this.createStatChangeEffect(button, change);
    }

    updateStatDisplay(character, stat, value) {
        const statElement = document.querySelector(`.character-detail[data-character="${character}"] .stat-value[data-stat="${stat}"]`);
        const barElement = document.querySelector(`.character-detail[data-character="${character}"] .fill.${stat}`);
        
        if (statElement) {
            statElement.textContent = value;
        }
        
        if (barElement) {
            barElement.style.width = `${value}%`;
            
            // Animazione fluida
            barElement.style.transition = 'width 0.5s ease-in-out';
            setTimeout(() => {
                barElement.style.transition = '';
            }, 500);
        }
    }

    updatePointsDisplay(character) {
        const pointsElement = document.getElementById(`stat-points-${character}`);
        const currentPoints = 50 + this.characterStats[character].pointsUsed; // 50 punti base
        
        if (pointsElement) {
            pointsElement.textContent = currentPoints;
            
            // Cambia colore se punti bassi
            if (currentPoints < 10) {
                pointsElement.style.color = '#ff6b6b';
            } else if (currentPoints < 20) {
                pointsElement.style.color = '#ffd93d';
            } else {
                pointsElement.style.color = '#4ecdc4';
            }
        }
    }

    resetCharacterStats(character) {
        if (!confirm(`Sei sicuro di voler resettare le statistiche di ${character}?`)) {
            return;
        }
        
        // Ricarica le statistiche di default
        this.characterStats[character] = this.loadCharacterStats(character);
        this.characterStats[character].pointsUsed = 0;
        
        // Aggiorna la visualizzazione
        Object.keys(this.characterStats[character].stats).forEach(stat => {
            this.updateStatDisplay(character, stat, this.characterStats[character].stats[stat]);
        });
        this.updatePointsDisplay(character);
        
        // Salva le modifiche
        this.saveCharacterStats(character);
        
        // Messaggio di conferma
        this.showStatSuccess('Statistiche resettate con successo!');
    }

    showStatError(message) {
        this.showStatMessage(message, 'error');
    }

    showStatSuccess(message) {
        this.showStatMessage(message, 'success');
    }

    showStatMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `stat-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff6b6b' : '#4ecdc4'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }

    createStatChangeEffect(button, change) {
        const effect = document.createElement('div');
        effect.className = 'stat-change-effect';
        effect.textContent = change > 0 ? '+10' : '-10';
        effect.style.cssText = `
            position: absolute;
            color: ${change > 0 ? '#4ecdc4' : '#ff6b6b'};
            font-weight: bold;
            font-size: 1.2rem;
            pointer-events: none;
            animation: floatUp 1s ease-out forwards;
        `;
        
        button.appendChild(effect);
        
        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 1000);
    }

    setupCharacterNavigation() {
        const prevBtn = document.querySelector('.prev-button');
        const nextBtn = document.querySelector('.next-button');
        const dots = document.querySelectorAll('.dot');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => this.showPreviousCharacter());
            nextBtn.addEventListener('click', () => this.showNextCharacter());
        }

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const character = e.target.dataset.character;
                this.showCharacter(character);
            });
        });

        // Navigazione da tastiera
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.showPreviousCharacter();
            } else if (e.key === 'ArrowRight') {
                this.showNextCharacter();
            } else if (e.key === 'Enter') {
                this.selectCurrentCharacter();
            }
        });
    }

    setupCharacterSelection() {
        const selectButtons = document.querySelectorAll('.select-character');
        selectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const character = e.target.dataset.character;
                this.selectCharacter(character);
            });
        });
    }

    selectCurrentCharacter() {
        this.selectCharacter(this.currentCharacter);
    }

    loadCharacterData() {
        this.updateCharacterDisplay();
    }

    showCharacter(character) {
        this.currentCharacter = character;
        this.updateCharacterDisplay();
        
        // Animazione di transizione
        const details = document.querySelectorAll('.character-detail');
        details.forEach(detail => {
            if (detail.dataset.character === character) {
                detail.style.opacity = '0';
                setTimeout(() => {
                    detail.classList.add('active');
                    detail.style.opacity = '1';
                }, 150);
            } else {
                detail.classList.remove('active');
            }
        });

        // Aggiorna i dots di navigazione
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.character === character);
        });

        // Effetto particellare
        this.createTransitionParticles();

        console.log(`✅ Personaggio ${character} visualizzato`);
    }

    showPreviousCharacter() {
        const characters = ['valentina', 'vincenzo', 'cesare', 'bardo', 'paladina', 'william'];
        const currentIndex = characters.indexOf(this.currentCharacter);
        const prevIndex = (currentIndex - 1 + characters.length) % characters.length;
        const prevCharacter = characters[prevIndex];
        
        console.log(`⬅️ Navigazione da ${this.currentCharacter} a ${prevCharacter}`);
        this.showCharacter(prevCharacter);
    }

    showNextCharacter() {
        const characters = ['valentina', 'vincenzo', 'cesare', 'bardo', 'paladina', 'william'];
        const currentIndex = characters.indexOf(this.currentCharacter);
        const nextIndex = (currentIndex + 1) % characters.length;
        const nextCharacter = characters[nextIndex];
        
        console.log(`➡️ Navigazione da ${this.currentCharacter} a ${nextCharacter}`);
        this.showCharacter(nextCharacter);
    }

    updateCharacterDisplay() {
        const character = this.currentCharacter;
        const stats = this.characterStats[character].stats;
        
        console.log(`🔄 Aggiornamento display per: ${character}`);
        
        // Aggiorna tutte le statistiche
        Object.keys(stats).forEach(stat => {
            this.updateStatDisplay(character, stat, stats[stat]);
        });
        
        // Aggiorna i punti
        this.updatePointsDisplay(character);
        
        // Aggiorna le abilità
        this.updateAbilities(character);
    }

    updateAbilities(character) {
        const abilities = game.characters[character]?.abilities;
        if (!abilities) return;

        const basicAbilitiesContainer = document.querySelector('.ability-list:not(.unlockable)');
        const unlockableAbilitiesContainer = document.querySelector('.ability-list.unlockable');

        if (basicAbilitiesContainer) {
            basicAbilitiesContainer.innerHTML = '';
            abilities.basic.forEach(ability => {
                const abilityElement = this.createAbilityElement(ability);
                basicAbilitiesContainer.appendChild(abilityElement);
            });
        }

        if (unlockableAbilitiesContainer) {
            unlockableAbilitiesContainer.innerHTML = '';
            abilities.unlockable.forEach(ability => {
                const abilityElement = this.createAbilityElement(ability, true);
                unlockableAbilitiesContainer.appendChild(abilityElement);
            });
        }
    }

    createAbilityElement(ability, isUnlockable = false) {
        const abilityDiv = document.createElement('div');
        abilityDiv.className = `ability ds-text-box ${isUnlockable ? 'unlockable locked' : ''}`;
        
        abilityDiv.innerHTML = `
            <h4>${ability.name}</h4>
            <p>${ability.description}</p>
            ${ability.cost ? `<span class="ability-cost">Costo Anima: ${ability.cost}</span>` : ''}
            ${isUnlockable ? `<span class="ability-info">${ability.unlocked ? 'Sbloccato' : 'Miracolo Proibito'}</span>` : ''}
        `;

        return abilityDiv;
    }

    selectCharacter(character) {
        console.log(`🎮 Tentativo di selezione personaggio: ${character}`);
        
        if (!game.characters[character]) {
            console.error(`❌ Personaggio ${character} non valido!`);
            alert('Personaggio non valido!');
            return;
        }

        // Mostra feedback visivo
        const button = document.querySelector(`[data-character="${character}"]`);
        if (button) {
            const originalText = button.textContent;
            button.textContent = '🎮 Selezione in corso...';
            button.disabled = true;
            
            // Animazione di caricamento
            button.style.animation = 'pulse 1s infinite';
            
            // Usa il sistema di gioco principale per selezionare
            setTimeout(() => {
                game.selectCharacter(character);
                
                // Ripristina il pulsante (solo se ancora nella pagina)
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.animation = '';
                }, 2000);
            }, 1000);
        } else {
            game.selectCharacter(character);
        }
    }

    createSoulParticles() {
        const container = document.querySelector('.character-detail-container');
        if (!container) return;

        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.createSoulParticle(container);
            }, i * 400);
        }
    }

    createSoulParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'soul-particle';
        particle.style.left = `${Math.random() * 80 + 10}%`;
        particle.style.top = `${Math.random() * 80 + 10}%`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        particle.style.background = `hsl(${Math.random() * 60 + 30}, 100%, 50%)`;
        
        container.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }

    createTransitionParticles() {
        const activeDetail = document.querySelector('.character-detail.active');
        if (!activeDetail) return;

        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                this.createSoulParticle(activeDetail);
            }, i * 120);
        }
    }
}

// Aggiungi gli stili CSS per le animazioni
const statStyles = document.createElement('style');
statStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes floatUp {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(-30px); opacity: 0; }
    }
    
    .stat-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .stat-buttons {
        display: flex;
        gap: 0.5rem;
    }
    
    .stat-btn {
        background: rgba(212, 175, 55, 0.2);
        border: 1px solid var(--ds-bronze);
        color: var(--ds-parchment);
        width: 40px;
        height: 25px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
    }
    
    .stat-btn:hover {
        background: rgba(212, 175, 55, 0.4);
        transform: scale(1.1);
    }
    
    .stat-btn:active {
        transform: scale(0.95);
    }
    
    .plus-btn {
        color: #4ecdc4;
    }
    
    .minus-btn {
        color: #ff6b6b;
    }
    
    .stat-points-display {
        text-align: center;
        margin-bottom: 1.5rem;
        padding: 0.8rem;
        background: rgba(30, 30, 30, 0.8);
        border: 1px solid var(--ds-bronze);
        border-radius: 5px;
    }
    
    .stat-points {
        font-weight: bold;
        font-size: 1.2rem;
        color: #4ecdc4;
    }
    
    .character-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
        flex-wrap: wrap;
    }
    
    .header-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1rem;
        flex-wrap: wrap;
    }
    
    .stat-change-effect {
        z-index: 10;
    }
`;
document.head.appendChild(statStyles);

// Inizializzazione quando la pagina è caricata
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Pagina personaggi caricata, inizializzazione...');
    new CharacterManager();
});