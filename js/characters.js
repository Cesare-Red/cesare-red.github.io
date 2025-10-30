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
        
        // Effetto visivo migliorato
        this.createEnhancedStatChangeEffect(button, change);
    }

    createEnhancedStatChangeEffect(button, change) {
        const effect = document.createElement('div');
        effect.className = `stat-change-effect ${change > 0 ? 'positive' : 'negative'}`;
        effect.textContent = change > 0 ? '+10' : '-10';
        effect.style.cssText = `
            position: absolute;
            color: ${change > 0 ? '#4ecdc4' : '#ff6b6b'};
            font-weight: bold;
            font-size: 1.2rem;
            pointer-events: none;
            z-index: 100;
            animation: enhancedFloatUp 1.2s ease-out forwards;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        `;
        
        const rect = button.getBoundingClientRect();
        effect.style.left = `${rect.width / 2 - 15}px`;
        effect.style.top = `${rect.height / 2 - 10}px`;
        
        button.style.position = 'relative';
        button.appendChild(effect);
        
        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 1200);
    }

    updateStatDisplay(character, stat, value) {
        const statElement = document.querySelector(`.character-detail[data-character="${character}"] .stat-value[data-stat="${stat}"]`);
        const barElement = document.querySelector(`.character-detail[data-character="${character}"] .fill.${stat}`);
        
        if (statElement) {
            statElement.textContent = value;
            // Animazione del numero
            statElement.style.animation = 'pulseGlow 0.6s ease-in-out';
            setTimeout(() => {
                statElement.style.animation = '';
            }, 600);
        }
        
        if (barElement) {
            barElement.style.width = `${value}%`;
            
            // Animazione fluida della barra
            barElement.style.transition = 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            setTimeout(() => {
                barElement.style.transition = '';
            }, 800);
        }
    }

    // ... altri metodi mantenuti
}

// Stili CSS migliorati per le animazioni
const enhancedStatStyles = document.createElement('style');
enhancedStatStyles.textContent = `
    @keyframes enhancedFloatUp {
        0% { 
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        50% { 
            transform: translateY(-25px) scale(1.2);
            opacity: 0.9;
        }
        100% { 
            transform: translateY(-50px) scale(0.8);
            opacity: 0;
        }
    }
    
    @keyframes pulseGlow {
        0% { 
            text-shadow: 0 0 5px rgba(212, 175, 55, 0.5);
            transform: scale(1);
        }
        50% { 
            text-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
            transform: scale(1.1);
        }
        100% { 
            text-shadow: 0 0 5px rgba(212, 175, 55, 0.5);
            transform: scale(1);
        }
    }
    
    .stat-change-effect.positive {
        color: #4ecdc4 !important;
        text-shadow: 0 2px 10px rgba(78, 205, 196, 0.5) !important;
    }
    
    .stat-change-effect.negative {
        color: #ff6b6b !important;
        text-shadow: 0 2px 10px rgba(255, 107, 107, 0.5) !important;
    }
    
    .stat-btn {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .stat-btn:active {
        transform: scale(0.95);
    }
    
    .stat-btn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(212, 175, 55, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
    }
    
    .stat-btn:active::after {
        width: 100px;
        height: 100px;
    }
`;
document.head.appendChild(enhancedStatStyles);