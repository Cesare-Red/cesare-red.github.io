// Gestione specifica della pagina dei personaggi
class CharacterManager {
    constructor() {
        this.currentCharacter = 'valentina';
        this.init();
    }

    init() {
        this.setupCharacterNavigation();
        this.setupCharacterSelection();
        this.loadCharacterData();
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

    loadCharacterData() {
        // I dati dei personaggi sono già caricati in game.js
        // Qui possiamo aggiungere logica specifica per il display
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
    }

    showPreviousCharacter() {
        const characters = ['valentina', 'vincenzo', 'federica', 'bardo', 'paladina', 'william'];
        const currentIndex = characters.indexOf(this.currentCharacter);
        const prevIndex = (currentIndex - 1 + characters.length) % characters.length;
        this.showCharacter(characters[prevIndex]);
    }

    showNextCharacter() {
        const characters = ['valentina', 'vincenzo', 'federica', 'bardo', 'paladina', 'william'];
        const currentIndex = characters.indexOf(this.currentCharacter);
        const nextIndex = (currentIndex + 1) % characters.length;
        this.showCharacter(characters[nextIndex]);
    }

    updateCharacterDisplay() {
        // Aggiorna le statistiche visualizzate per il personaggio corrente
        const character = game.characters[this.currentCharacter];
        if (!character) return;

        // Aggiorna le barre delle statistiche
        this.updateStatBars(character.stats);
        
        // Aggiorna le abilità
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
        abilityDiv.className = `ability ${isUnlockable ? 'unlockable' : ''}`;
        
        abilityDiv.innerHTML = `
            <h4>${ability.name}</h4>
            <p>${ability.description}</p>
            ${ability.cost ? `<span class="ability-cost">Costo: ${ability.cost} MP</span>` : ''}
            ${isUnlockable ? `<span class="ability-info">Da sbloccare</span>` : ''}
        `;

        return abilityDiv;
    }

    selectCharacter(character) {
        // Salva la selezione e passa al primo livello
        game.startGame(character);
        
        // Effetto visivo di conferma
        const button = document.querySelector(`[data-character="${character}"]`);
        if (button) {
            button.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                button.style.animation = '';
            }, 500);
        }
    }
}

// Inizializzazione quando la pagina è caricata
document.addEventListener('DOMContentLoaded', () => {
    new CharacterManager();
});