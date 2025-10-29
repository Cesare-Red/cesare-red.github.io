// Gestione della schermata di vittoria
class VictoryManager {
    constructor() {
        this.victoryData = this.loadVictoryData();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.displayVictoryStats();
        this.startVictoryCelebration();
        this.createVictoryCertificate();
    }

    loadVictoryData() {
        const savedGame = GameUtils.loadFromLocalStorage('electricBus0Game');
        const gameTime = GameUtils.loadFromLocalStorage('gameTime') || 0;
        
        return {
            character: savedGame?.selectedCharacter || 'vincenzo',
            playTime: gameTime,
            enemiesDefeated: savedGame?.enemiesDefeated || 0,
            level: savedGame?.playerStats?.level || 1,
            completionDate: new Date().toLocaleDateString('it-IT'),
            quizScore: savedGame?.quizScore || 0
        };
    }

    setupEventListeners() {
        const playAgainBtn = document.getElementById('play-again');
        const shareBtn = document.getElementById('share-victory');

        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => this.restartGame());
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareVictory());
        }
    }

    displayVictoryStats() {
        // Aggiorna le statistiche finali
        const enemiesDefeated = document.getElementById('enemies-defeated');
        const playTime = document.getElementById('play-time');
        const playerLevel = document.getElementById('player-level');

        if (enemiesDefeated) {
            enemiesDefeated.textContent = this.victoryData.enemiesDefeated;
        }

        if (playTime) {
            playTime.textContent = GameUtils.formatTime(this.victoryData.playTime);
        }

        if (playerLevel) {
            playerLevel.textContent = this.victoryData.level;
        }

        // Mostra il personaggio principale
        this.displayMainCharacter();
    }

    displayMainCharacter() {
        const mainCharacter = document.getElementById('main-character');
        if (mainCharacter) {
            mainCharacter.className = `celebrating-character ${this.victoryData.character}`;
            mainCharacter.innerHTML = this.getCharacterVictoryMessage();
        }
    }

    getCharacterVictoryMessage() {
        const messages = {
            valentina: `
                <div class="victory-speech">
                    <h3>Valentina - La Vittoria del Tutto-Tranne</h3>
                    <p>"Ho giocato a tutto... tranne a perdere! Forse."</p>
                </div>
            `,
            vincenzo: `
                <div class="victory-speech">
                    <h3>Vincenzo - L'Artificiere Trionfante</h3>
                    <p>"Il codice è stato compilato senza errori! Finalmente."</p>
                </div>
            `,
            federica: `
                <div class="victory-speech">
                    <h3>Federica - L'Assenza Strategica Pagata</h3>
                    <p>"Ero via, ma ho vinto ugualmente. Strategia!"</p>
                </div>
            `,
            bardo: `
                <div class="victory-speech">
                    <h3>Il Tardo Bardo - Il Trionfo in Ritardo</h3>
                    <p>"Questa vittoria arriverà... tra due turni!"</p>
                </div>
            `,
            paladina: `
                <div class="victory-speech">
                    <h3>Paladina del Buffet - La Vittoria Sazia</h3>
                    <p>"In nome del carboidrato, abbiamo vinto! Ora si mangia!"</p>
                </div>
            `,
            william: `
                <div class="victory-speech">
                    <h3>William - La Redistribuzione della Vittoria</h3>
                    <p>"Non ho rubato la vittoria... l'ho solo redistribuita geograficamente!"</p>
                </div>
            `
        };

        return messages[this.victoryData.character] || messages.vincenzo;
    }

    startVictoryCelebration() {
        const victoryEffects = document.querySelector('.victory-effects');
        if (victoryEffects) {
            // Fuochi d'artificio
            setInterval(() => {
                GameUtils.createFireworks(victoryEffects, 3);
            }, 2000);

            // Coriandoli
            setInterval(() => {
                GameUtils.createConfetti(victoryEffects, 20);
            }, 1000);

            // Effetti sonori (placeholder)
            this.playVictoryMusic();
        }

        // Animazione personaggi
        this.animatePartyCelebration();
    }

    playVictoryMusic() {
        // In un'implementazione reale, qui si riprodurrebbe la musica di vittoria
        GameUtils.playSound('victory_fanfare', 0.7);
    }

    animatePartyCelebration() {
        const partyMembers = document.querySelectorAll('.party-member');
        
        partyMembers.forEach((member, index) => {
            setTimeout(() => {
                member.style.animation = 'bounce 1s ease-in-out';
                setTimeout(() => {
                    member.style.animation = '';
                }, 1000);
            }, index * 300);
        });
    }

    createVictoryCertificate() {
        // Il certificato è già nell'HTML, qui possiamo personalizzarlo ulteriormente
        const diploma = document.querySelector('.diploma');
        if (diploma) {
            diploma.style.animation = 'certificateAppear 2s ease-out';
        }
    }

    restartGame() {
        if (confirm('Vuoi davvero ricominciare una nuova avventura?')) {
            GameUtils.clearLocalStorage('electricBus0Game');
            GameUtils.clearLocalStorage('gameTime');
            window.location.href = 'index.html';
        }
    }

    shareVictory() {
        const shareText = `🎉 Ho completato l'Avventura di Laurea di Electric Bus0! 🎓\n` +
                         `Tempo: ${GameUtils.formatTime(this.victoryData.playTime)}\n` +
                         `Nemici sconfitti: ${this.victoryData.enemiesDefeated}\n` +
                         `Livello raggiunto: ${this.victoryData.level}\n` +
                         `Congratulazioni Vincenzo! 🥳`;

        if (navigator.share) {
            navigator.share({
                title: 'Victory - Electric Bus0 Adventure',
                text: shareText,
                url: window.location.href
            }).catch(() => {
                this.fallbackShare(shareText);
            });
        } else {
            this.fallbackShare(shareText);
        }
    }

    fallbackShare(text) {
        // Copia negli appunti
        navigator.clipboard.writeText(text).then(() => {
            GameUtils.showNotification('Testo della vittoria copiato negli appunti!', 'success');
        }).catch(() => {
            // Fallback per browser più vecchi
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            GameUtils.showNotification('Testo della vittoria copiato!', 'success');
        });
    }
}

// Aggiungi gli stili CSS per le animazioni della vittoria
const victoryStyle = document.createElement('style');
victoryStyle.textContent = `
    @keyframes certificateAppear {
        0% {
            transform: scale(0.8) rotate(-5deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.05) rotate(2deg);
        }
        100% {
            transform: scale(1) rotate(0);
            opacity: 1;
        }
    }
    
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-20px);
        }
    }
    
    .celebrating-character {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin: 0 auto;
        border: 5px solid gold;
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
        animation: glow 2s ease-in-out infinite alternate;
    }
    
    .valentina { background: linear-gradient(45deg, #ff6b6b, #ff8e8e); }
    .vincenzo { background: linear-gradient(45deg, #4ecdc4, #88d8d0); }
    .federica { background: linear-gradient(45deg, #ffd93d, #ffeaa7); }
    .bardo { background: linear-gradient(45deg, #a29bfe, #c8c6ff); }
    .paladina { background: linear-gradient(45deg, #fd79a8, #ff9fbe); }
    .william { background: linear-gradient(45deg, #636e72, #81ecec); }
    
    .party-member {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: inline-block;
        margin: 0 10px;
        border: 3px solid white;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }
    
    .victory-speech {
        background: rgba(255, 255, 255, 0.9);
        padding: 20px;
        border-radius: 15px;
        margin-top: 20px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    
    .diploma {
        background: linear-gradient(45deg, #f9f9f9, #ffffff);
        border: 10px solid gold;
        padding: 40px;
        text-align: center;
        margin: 20px auto;
        max-width: 600px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        position: relative;
    }
    
    .diploma::before {
        content: '';
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        border: 2px solid rgba(255, 215, 0, 0.3);
        pointer-events: none;
    }
    
    .diploma h2 {
        color: #8b4513;
        font-family: 'Times New Roman', serif;
        margin-bottom: 20px;
    }
    
    .diploma h3 {
        color: #d4af37;
        font-size: 2rem;
        margin: 20px 0;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    }
    
    .signatures {
        display: flex;
        justify-content: space-around;
        margin-top: 40px;
        border-top: 2px solid #d4af37;
        padding-top: 20px;
    }
`;

document.head.appendChild(victoryStyle);

// Inizializzazione della vittoria
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('victory.html')) {
        new VictoryManager();
    }
});