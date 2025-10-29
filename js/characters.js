// Gestione specifica della pagina dei personaggi - VERSIONE CORRETTA
class CharacterManager {
    constructor() {
        this.currentCharacter = 'valentina';
        this.init();
    }

    init() {
        this.setupCharacterNavigation();
        this.setupCharacterSelection();
        this.loadCharacterData();
        this.createSoulParticles();
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
                detail.style.animation = 'fadeIn 0.5s ease-in';
                detail.classList.add('active');
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
    }

    showPreviousCharacter() {
        const characters = ['valentina', 'vincenzo', 'cesare', 'bardo', 'paladina', 'william'];
        const currentIndex = characters.indexOf(this.currentCharacter);
        const prevIndex = (currentIndex - 1 + characters.length) % characters.length;
        this.showCharacter(characters[prevIndex]);
    }

    showNextCharacter() {
        const characters = ['valentina', 'vincenzo', 'cesare', 'bardo', 'paladina', 'william'];
        const currentIndex = characters.indexOf(this.currentCharacter);
        const nextIndex = (currentIndex + 1) % characters.length;
        this.showCharacter(characters[nextIndex]);
    }

    updateCharacterDisplay() {
        const character = game.characters[this.currentCharacter];
        if (!character) return;

        this.updateStatBars(character.stats);
        this.updateAbilities(character.abilities);
    }

    updateStatBars(stats) {
        const statBars = document.querySelectorAll('.stat-bar');
        statBars.forEach(bar => {
            const statType = bar.querySelector('.fill').classList[1];
            const valueElement = bar.querySelector('.stat-value');
            const fillBar = bar.querySelector('.fill');
            
            if (stats[statType] && valueElement && fillBar) {
                valueElement.textContent = stats[statType];
                fillBar.style.width = `${stats[statType]}%`;
            }
        });
    }

    updateAbilities(abilities) {
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
        console.log('Tentativo di selezione:', character);
        
        // Usa il sistema di gioco principale per selezionare
        game.selectCharacter(character);
    }

    createSoulParticles() {
        const container = document.querySelector('.character-detail-container');
        if (!container) return;

        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                this.createSoulParticle(container);
            }, i * 300);
        }
    }

    createSoulParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'soul-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
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

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createSoulParticle(activeDetail);
            }, i * 100);
        }
    }
}

// Inizializzazione quando la pagina è caricata
document.addEventListener('DOMContentLoaded', () => {
    new CharacterManager();
});