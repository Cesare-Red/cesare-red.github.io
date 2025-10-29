// Utility functions per il gioco

class GameUtils {
    static formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    static calculateDamage(attacker, defender, ability = null) {
        let baseDamage = attacker.stats.strength || 10;
        
        if (ability && ability.damage) {
            baseDamage = ability.damage;
        }

        // Considera l'intelligenza per i danni magici
        if (ability && ability.type === 'magic') {
            baseDamage += (attacker.stats.intelligence || 0) * 0.5;
        }

        // Riduzione danni per la difesa
        const defenseReduction = (defender.stats.defense || 0) * 0.1;
        const finalDamage = Math.max(1, Math.floor(baseDamage - defenseReduction));

        // Possibilità di colpo critico
        const critChance = (attacker.stats.luck || 5) / 100;
        const isCritical = Math.random() < critChance;

        return {
            damage: isCritical ? finalDamage * 2 : finalDamage,
            isCritical: isCritical
        };
    }

    static applyStatusEffect(target, effect, duration = 2) {
        if (!target.statusEffects) {
            target.statusEffects = [];
        }

        const existingEffect = target.statusEffects.find(e => e.type === effect);
        if (existingEffect) {
            existingEffect.duration = duration;
        } else {
            target.statusEffects.push({
                type: effect,
                duration: duration
            });
        }

        return this.getStatusEffectDescription(effect);
    }

    static getStatusEffectDescription(effect) {
        const descriptions = {
            'burn': 'Scotty? - Subisci danni a fine turno',
            'shock': 'Scossa? - Danno residuo all\'inizio del turno',
            'bleed': 'Sanguinamento - Perdi 2 PV per azione',
            'confusion': 'Confusione - -20% precisione, 33% di attaccare alleati',
            'slow': 'Lentezza - Agisci per ultimo, -10% danni',
            'stun': 'Stordito - Salta il turno',
            'poison': 'Veleno - Danni continui ogni turno',
            'defense_down': 'Difesa Ridotta - -25% difesa',
            'attack_up': 'Attacco Potenziato - +25% attacco'
        };

        return descriptions[effect] || 'Effetto sconosciuto';
    }

    static processTurnEffects(character) {
        if (!character.statusEffects || character.statusEffects.length === 0) {
            return [];
        }

        const effectsLog = [];
        const remainingEffects = [];

        character.statusEffects.forEach(effect => {
            effect.duration--;

            // Applica l'effetto per questo turno
            switch(effect.type) {
                case 'burn':
                    const burnDamage = Math.ceil(character.stats.maxHealth / 15);
                    character.stats.currentHealth -= burnDamage;
                    effectsLog.push(`🔥 Scotty? infligge ${burnDamage} danni`);
                    break;
                
                case 'shock':
                    const shockDamage = Math.ceil(character.stats.maxHealth / 20);
                    character.stats.currentHealth -= shockDamage;
                    effectsLog.push(`⚡ Scossa? infligge ${shockDamage} danni`);
                    break;
                
                case 'bleed':
                    character.stats.currentHealth -= 2;
                    effectsLog.push(`💉 Sanguinamento infligge 2 danni`);
                    break;
                
                case 'poison':
                    const poisonDamage = Math.ceil(character.stats.maxHealth / 10);
                    character.stats.currentHealth -= poisonDamage;
                    effectsLog.push(`☠️ Veleno infligge ${poisonDamage} danni`);
                    break;
            }

            // Mantieni l'effetto se non è scaduto
            if (effect.duration > 0) {
                remainingEffects.push(effect);
            } else {
                effectsLog.push(`✅ ${this.getStatusEffectDescription(effect.type)} è terminato`);
            }
        });

        character.statusEffects = remainingEffects;
        return effectsLog;
    }

    static createDamagePopup(element, damage, isCritical = false) {
        const popup = document.createElement('div');
        popup.className = `damage-popup ${isCritical ? 'critical' : ''}`;
        popup.textContent = isCritical ? `CRITICO! ${damage}` : damage;
        popup.style.left = `${Math.random() * 100 + 50}px`;
        popup.style.top = `${Math.random() * 50 + 50}px`;

        element.appendChild(popup);

        // Rimuovi il popup dopo l'animazione
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 1000);
    }

    static playSound(soundName, volume = 0.5) {
        // Placeholder per la riproduzione audio
        // In un'implementazione reale, qui si caricherà e riprodurrà l'audio
        console.log(`Playing sound: ${soundName} at volume ${volume}`);
    }

    static showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#4ecdc4' : '#ffe66d'};
            color: #333;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }

    static animateElement(element, animationName, duration = 500) {
        element.style.animation = `${animationName} ${duration}ms ease-in-out`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }

    static createConfetti(container, count = 50) {
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: hsl(${Math.random() * 360}, 100%, 50%);
                top: -10px;
                left: ${Math.random() * 100}%;
                animation: fall ${Math.random() * 3 + 2}s linear forwards;
            `;

            container.appendChild(confetti);

            // Rimuovi il confetto dopo l'animazione
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }
    }

    static createFireworks(container, count = 10) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #fff;
                    border-radius: 50%;
                    bottom: 0;
                    left: ${Math.random() * 100}%;
                    --x: ${(Math.random() - 0.5) * 200}px;
                    --y: ${Math.random() * -300 - 100}px;
                    animation: explode 1s ease-out forwards;
                `;

                container.appendChild(firework);

                setTimeout(() => {
                    if (firework.parentNode) {
                        firework.parentNode.removeChild(firework);
                    }
                }, 1000);
            }, i * 200);
        }
    }

    static saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Errore nel salvataggio:', error);
            return false;
        }
    }

    static loadFromLocalStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Errore nel caricamento:', error);
            return null;
        }
    }

    static clearLocalStorage(key = null) {
        try {
            if (key) {
                localStorage.removeItem(key);
            } else {
                localStorage.clear();
            }
            return true;
        } catch (error) {
            console.error('Errore nella pulizia:', error);
            return false;
        }
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Aggiungi gli stili CSS per le animazioni
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes explode {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(var(--y)) translateX(var(--x)) scale(0);
            opacity: 0;
        }
    }
    
    .damage-popup.critical {
        color: #ffd93d;
        font-size: 1.8rem;
        text-shadow: 2px 2px 4px rgba(255, 0, 0, 0.8);
    }
`;
document.head.appendChild(style);