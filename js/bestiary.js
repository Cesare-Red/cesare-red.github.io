// Gestione del manuale dei mostri
class BestiaryManager {
    constructor() {
        this.monsters = this.loadMonstersData();
        this.init();
    }

    init() {
        console.log('🔄 Inizializzazione manuale mostri...');
        this.setupFilters();
        this.displayAllMonsters();
        console.log('✅ Manuale mostri inizializzato!');
    }

    loadMonstersData() {
        return {
            // Mostri Livello 1 - Minecraft
            'zombie': {
                name: 'Zombie',
                type: 'Non Morto',
                cr: '1/4',
                level: 1,
                hp: 22,
                ac: 8,
                stats: { str: 13, dex: 6, con: 16, int: 3, wis: 6, cha: 5 },
                abilities: [
                    { name: 'Morso', description: '+3 per colpire, 1d6+1 danni perforanti' },
                    { name: 'Graffio', description: '+3 per colpire, 1d4+1 danni da taglio' }
                ],
                lore: 'Gli zombie di Minecraft sono creature corrotte che vagano nelle caverne oscure. Si riproducono esponenzialmente se non fermati in tempo.',
                drops: ['Carne Marcia (50%)', 'Pepita di Ferro (25%)'],
                sprite: 'zombie-pixel'
            },
            'creeper': {
                name: 'Creeper',
                type: 'Elementale',
                cr: '1',
                level: 1,
                hp: 20,
                ac: 11,
                stats: { str: 8, dex: 14, con: 12, int: 6, wis: 10, cha: 6 },
                abilities: [
                    { name: 'Esplosione', description: 'Quando muore, esplode infliggendo 3d6 danni da fuoco a tutte le creature entro 1.5 metri' },
                    { name: 'Furtività', description: 'Advantage nei tiri per nascondersi' }
                ],
                lore: 'I Creeper sono creature misteriose che si avvicinano silenziosamente alle loro prede per poi esplodere. La loro origine è sconosciuta, ma si dice siano il risultato di un incantesimo fallito.',
                drops: ['Polvere da Sparo (100%)', 'Testa di Creeper (5%)'],
                sprite: 'creeper-pixel'
            },
            'wither': {
                name: 'Wither',
                type: 'Boss Leggendario',
                cr: '15',
                level: 1,
                hp: 300,
                ac: 18,
                stats: { str: 22, dex: 12, con: 24, int: 18, wis: 16, cha: 20 },
                abilities: [
                    { name: 'Skull Barrage', description: 'Lancia 3 teschi che infliggono 2d8+6 danni necrotici ciascuno' },
                    { name: 'Wither Aura', description: 'Tutte le creature entro 3 metri subiscono 1d6 danni necrotici all\'inizio del loro turno' },
                    { name: 'Apocalypse', description: '(Sotto 25% PF) Infligge 8d10 danni da fuoco a tutte le creature nella stanza' }
                ],
                lore: 'Il Wither è una creatura di pura distruzione, creata dalla fusione di anime corrotte e magia oscura. È il guardiano finale delle miniere abbandonate.',
                drops: ['Stella Nether (100%)', 'Teschio del Wither (100%)'],
                sprite: 'wither-pixel'
            },
            // Mostri Livello 2 - Breaking Bad
            'tuco': {
                name: 'Tuco Salamanca',
                type: 'Umano',
                cr: '5',
                level: 2,
                hp: 110,
                ac: 14,
                stats: { str: 18, dex: 12, con: 16, int: 10, wis: 8, cha: 14 },
                abilities: [
                    { name: 'Soffio di Metanfetamina', description: 'Soffia polvere cristallina che infligge 2d8 danni veleno + confusione per 1 turno' },
                    { name: 'Rage Mode', description: 'Raddoppia i danni per 2 turni, poi subisce 1d10 danni da stress' }
                ],
                lore: 'Tuco è un pericoloso spacciatore del cartello messicano, noto per la sua imprevedibilità e violenza. Controlla le rotte del deserto con pugno di ferro.',
                drops: ['Denti d\'Oro (+10 Carisma)', 'Cristallo Puro (75%)'],
                sprite: 'tuco-pixel'
            },
            // Mostri Livello 3 - Harry Potter
            'voldemort': {
                name: 'Lord Voldemort',
                type: 'Lich',
                cr: '20',
                level: 3,
                hp: 400,
                ac: 18,
                stats: { str: 16, dex: 20, con: 22, int: 24, wis: 20, cha: 22 },
                abilities: [
                    { name: 'Tempesta di Male', description: 'Attacco ad area che infligge confusione e Scossa?' },
                    { name: 'Incanto della Lentezza', description: 'Infligge Lentezza a un bersaglio' },
                    { name: 'Palla di Fuoco Oscuro', description: 'Infligge Scotta? a un bersaglio' }
                ],
                lore: 'Lord Voldemort, il Signore Oscuro, è il mago più pericoloso di tutti i tempi. Ha diviso la sua anima in diversi Horcrux per ottenere l\'immortalità.',
                drops: ['Cappello di Laurea Magico', 'Frammento di Horcrux'],
                sprite: 'voldemort-pixel'
            }
        };
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const level = e.target.dataset.level;
                
                // Aggiorna i pulsanti attivi
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Filtra i mostri
                this.filterMonsters(level);
            });
        });
    }

    filterMonsters(level) {
        const monsterCards = document.querySelectorAll('.monster-card');
        
        monsterCards.forEach(card => {
            if (level === 'all' || card.dataset.level === level) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }

    displayAllMonsters() {
        const monsterGrid = document.querySelector('.monster-grid');
        if (!monsterGrid) return;

        // I mostri sono già nell'HTML, quindi basta abilitare i filtri
        this.filterMonsters('all');
    }
}

// Inizializzazione quando la pagina è caricata
document.addEventListener('DOMContentLoaded', () => {
    console.log('📖 Manuale mostri caricato, inizializzazione...');
    new BestiaryManager();
});