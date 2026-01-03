// --- רשימת מתכונים מלאה ---
const initialRecipes = [
    {id: 1, title: "שוקו חם מפנק ☕", ingredients: "כוס חלב, 2 כפיות שוקולית, מרשמלו קטן", steps: "מחממים חלב במיקרו. מוסיפים שוקולית ומערבבים. מפזרים מרשמלו מלמעלה."},
    {id: 2, title: "פיצה טורטייה 🍕", ingredients: "טורטייה, רסק עגבניות, גבינה צהובה, זיתים", steps: "מורחים רסק על הטורטייה. מפזרים גבינה ותוספות. מכניסים לתנור ל-5 דקות."},
    {id: 3, title: "פנקייק בננה 🥞", ingredients: "בננה בשלה, 2 ביצים, קצת קינמון", steps: "מועכים בננה, מערבבים עם ביצים. מטגנים במחבת עם מעט שמן משני הצדדים."},
    {id: 4, title: "טוסט גבינה משודרג 🥪", ingredients: "2 פרוסות לחם, גבינה צהובה, עגבניה, חמאה", steps: "מורחים חמאה על הלחם. שמים גבינה ועגבניה. מכניסים לטוסטר עד שמוכן."},
    {id: 5, title: "סלט פירות צבעוני 🍓", ingredients: "תפוח, בננה, תותים, ענבים, מיץ תפוזים", steps: "חותכים את כל הפירות לקוביות קטנות. שמים בקערה ושופכים מיץ תפוזים."},
    {id: 6, title: "כדורי שוקולד 🥥", ingredients: "ביסקוויטים מרוסקים, קקאו, סוכר, חלב, קוקוס", steps: "מערבבים הכל לעיסה אחידה. יוצרים כדורים ומגלגלים בקוקוס."},
    {id: 7, title: "חביתה עם הפתעות 🍳", ingredients: "2 ביצים, גבינה בולגרית, תירס, מלח", steps: "טורפים את הביצים בקערה. מוסיפים את התוספות. מטגנים במחבת."},
    {id: 8, title: "מילקשייק תות 🥤", ingredients: "כוס חלב, 5 תותים, כדור גלידה וניל", steps: "שמים הכל בבלנדר. מערבבים עד שנהיה חלק. שופכים לכוס גבוהה."},
    {id: 9, title: "פסטה ברוטב אדום 🍝", ingredients: "חבילת פסטה, רסק עגבניות, מים, תבלינים", steps: "מבשלים פסטה במים רותחים. בסיר נפרד מכינים רוטב. מערבבים יחד."},
    {id: 10, title: "עוגיות שוקולד צ'יפס 🍪", ingredients: "חמאה, סוכר, קמח, ביצה, שוקולד צ'יפס", steps: "מערבבים חומרים לבצק. יוצרים עיגולים על תבנית. אופים בתנור 10 דקות."},
    {id: 11, title: "סושי כריך 🍙", ingredients: "פרוסת לחם בלי קשה, גבינת שמנת, מלפפון", steps: "משטחים את הלחם עם מערוך. מורחים גבינה, שמים מלפפון ומגלגלים כמו סושי."},
    {id: 12, title: "המבורגר ביתי 🍔", ingredients: "לחמניה, קציצה, חסה, קטשופ", steps: "מחממים את הקציצה. שמים בלחמניה עם ירקות ורטבים שאוהבים."},
    {id: 13, title: "צ'יפס בתנור 🍟", ingredients: "תפוחי אדמה, שמן זית, מלח", steps: "חותכים תפו\"א למקלות. מערבבים עם שמן ומלח. אופים בתנור עד שזה זהוב."},
    {id: 14, title: "שיפודי פירות 🍡", ingredients: "שיפודים, ענבים, מרשמלו, קוביות מלון", steps: "משחילים על השיפוד פרי, ואז מרשמלו, ואז פרי נוסף. מגישים קר."},
    {id: 15, title: "ברד ביתי 🍧", ingredients: "קרח, סירופ פטל, מעט מים", steps: "טוחנים את הקרח בבלנדר חזק (עם עזרת מבוגר). מוסיפים סירופ ומערבבים."}
];

const musicTracks = {
    'none': '',
    'calm': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'happy': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    'electronic': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    'piano': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    'jazz': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3'
};

let currentUser = null;
let currentRecipe = null;
let isMusicPlaying = false;

window.onload = () => {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([{user:'admin', pass:'123', xp: 0}]));
    }
    
    const savedRecipes = JSON.parse(localStorage.getItem('recipes'));
    if (!savedRecipes || savedRecipes.length < 10) {
        localStorage.setItem('recipes', JSON.stringify(initialRecipes));
        location.reload(); return;
    }
    
    createFloatingBackground();
    loadSettings();
};

function createFloatingBackground() {
    const container = document.getElementById('floating-container');
    const icons = ['🍕', '🍩', '🍦', '🍓', '🍭', '🧁', '🍪', '🍟', '🤸', '🤾', '👧', '🧒', '🎈', '🎁', '✨', '🍔', '🎸'];
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) { 
        const span = document.createElement('span');
        span.classList.add('float-item');
        span.innerText = icons[Math.floor(Math.random() * icons.length)];
        span.style.left = Math.random() * 100 + 'vw';
        span.style.animationDuration = (Math.random() * 8 + 5) + 's';
        span.style.animationDelay = (Math.random() * 5) + 's';
        span.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
        container.appendChild(span);
    }
}

function spinRoulette() {
    const cards = document.querySelectorAll('.recipe-card');
    if (cards.length === 0) return;

    let jumps = 0;
    const maxJumps = 20 + Math.floor(Math.random() * 20); 

    const interval = setInterval(() => {
        cards.forEach(c => c.classList.remove('highlight-card'));
        const randomIdx = Math.floor(Math.random() * cards.length);
        const selectedCard = cards[randomIdx];
        selectedCard.classList.add('highlight-card');
        selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        jumps++;
        if (jumps >= maxJumps) {
            clearInterval(interval);
            setTimeout(() => {
                createConfetti(); 
                alert("הפור נפל על: " + selectedCard.querySelector('h3').innerText + "! 😋");
                selectedCard.click();
            }, 500);
        }
    }, 100);
}

function finishCooking() {
    let users = JSON.parse(localStorage.getItem('users'));
    let userIndex = users.findIndex(u => u.user === currentUser.user);
    
    if (!users[userIndex].xp) users[userIndex].xp = 0;
    users[userIndex].xp += 10;
    
    localStorage.setItem('users', JSON.stringify(users));
    currentUser = users[userIndex];

    createConfetti(); 
    alert("כל הכבוד! סיימת להכין וקיבלת 10 נקודות! 🎉");
    
    showScreen('recipe-list-screen'); 
}

function updateUserRankUI() {
    if (!currentUser) return;
    const xp = currentUser.xp || 0;
    let rank = "טבח מתחיל 🥚";
    if (xp >= 30) rank = "טבח חובב 👨‍🍳";
    if (xp >= 100) rank = "שף מוכשר 🧑‍🍳";
    if (xp >= 200) rank = "מאסטר שף 👑";
    
    document.getElementById('rank-display').innerText = "דרגה: " + rank;
    document.getElementById('xp-display').innerText = xp + " נק'";
}

function createConfetti() {
    const colors = ['#ff00de', '#00f2ff', '#ffd700', '#ffffff'];
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        document.body.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 10;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;

        let posX = window.innerWidth / 2;
        let posY = window.innerHeight / 2;
        let opacity = 1;

        const animation = setInterval(() => {
            posX += x;
            posY += y;
            opacity -= 0.02;
            confetti.style.left = posX + 'px';
            confetti.style.top = posY + 'px';
            confetti.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(animation);
                confetti.remove();
            }
        }, 20);
    }
}

function changeMusicSource() {
    const select = document.getElementById('music-select');
    const audio = document.getElementById('bg-music');
    if (select.value === 'none') {
        audio.pause(); isMusicPlaying = false; updateMusicIcon(); return;
    }
    audio.src = musicTracks[select.value];
    audio.load();
    if (isMusicPlaying) audio.play().catch(e => console.log("Autoplay blocked"));
    localStorage.setItem('bgMusicPreference', select.value);
}

function toggleMusic() {
    const audio = document.getElementById('bg-music');
    if (!audio.src || audio.src === window.location.href) changeMusicSource();

    if (isMusicPlaying) {
        audio.pause(); isMusicPlaying = false;
    } else {
        const select = document.getElementById('music-select');
        if (select.value === 'none') {
            alert("בחרי סוג מוזיקה בהגדרות 🎵"); showScreen('settings-screen'); return;
        }
        audio.play().catch(e => alert("לחצי על המסך!")); isMusicPlaying = true;
    }
    updateMusicIcon();
}

function updateMusicIcon() {
    const btnIcon = document.querySelector('#music-btn i');
    if (isMusicPlaying) {
        btnIcon.className = 'fas fa-volume-up'; btnIcon.style.color = 'var(--main-color)';
    } else {
        btnIcon.className = 'fas fa-volume-mute'; btnIcon.style.color = 'white';
    }
}

// --- ניווט רגיל (ללא הרחבה) ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active', 'hidden'));
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    
    document.getElementById(screenId).classList.remove('hidden');
    document.getElementById(screenId).classList.add('active');

    const header = document.getElementById('app-header');
    if (screenId === 'login-screen' || screenId === 'register-screen') header.classList.add('hidden');
    else header.classList.remove('hidden');

    if (screenId === 'recipe-list-screen') {
        renderRecipes();
        updateUserRankUI(); 
    }
    if (screenId === 'shopping-list-screen') renderShoppingList();
}

function handleLogin() {
    const userIn = document.getElementById('username').value;
    const passIn = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users'));
    const validUser = users.find(u => u.user === userIn && u.pass === passIn);

    if (validUser) {
        currentUser = validUser;
        showScreen('recipe-list-screen');
    } else {
        alert("שם משתמש או סיסמה שגויים! 🔒");
    }
}

function handleRegister() {
    const userIn = document.getElementById('reg-username').value;
    const passIn = document.getElementById('reg-password').value;

    if (userIn && passIn) {
        const users = JSON.parse(localStorage.getItem('users'));
        if (users.find(u => u.user === userIn)) { alert("משתמש קיים!"); return; }
        
        users.push({ user: userIn, pass: passIn, xp: 0 }); 
        localStorage.setItem('users', JSON.stringify(users));
        
        createConfetti(); 
        alert("נרשמת בהצלחה! ✨");
        showScreen('login-screen');
    } else { alert("חובה למלא הכל"); }
}

function renderRecipes() {
    const recipes = JSON.parse(localStorage.getItem('recipes'));
    const list = document.getElementById('recipes-list');
    const search = document.getElementById('search-input').value.toLowerCase();
    list.innerHTML = '';

    recipes.forEach(r => {
        if(r.title.toLowerCase().includes(search)) {
            const div = document.createElement('div');
            div.className = 'recipe-card';
            const emoji = r.title.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/) || '🍽️'; 
            div.innerHTML = `<div><h3 style="margin:0">${r.title}</h3></div><div class="recipe-emoji">${emoji}</div>`;
            div.onclick = () => loadRecipeDetail(r);
            list.appendChild(div);
        }
    });
}
function filterRecipes() { renderRecipes(); }

function loadRecipeDetail(recipe) {
    currentRecipe = recipe;
    document.getElementById('detail-title').innerText = recipe.title;
    document.getElementById('detail-ingredients').innerHTML = recipe.ingredients.split(',').map(i => `<li>${i.trim()}</li>`).join('');
    document.getElementById('detail-instructions').innerHTML = recipe.steps.split('.').filter(s=>s.trim()).map((s, i) => `<div style="margin-bottom:10px"><b>${i+1}.</b> ${s.trim()}</div>`).join('');
    showScreen('recipe-detail-screen');
}

function addToShoppingListFromRecipe() {
    if (!currentRecipe) return;
    let list = JSON.parse(localStorage.getItem('shoppingList')) || [];
    list = [...list, ...currentRecipe.ingredients.split(',').map(i => i.trim())];
    localStorage.setItem('shoppingList', JSON.stringify(list));
    alert("נוסף לעגלה! 🛒"); showScreen('shopping-list-screen');
}

function renderShoppingList() {
    const list = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const ul = document.getElementById('shopping-items');
    ul.innerHTML = list.length ? list.map(i => `<li><input type="checkbox"> ${i}</li>`).join('') : '<p style="text-align:center">העגלה ריקה... 🤷‍♀️</p>';
}
function clearShoppingList() { localStorage.removeItem('shoppingList'); renderShoppingList(); }

function showAddModal() { document.getElementById('add-modal').classList.remove('hidden'); }
function closeModal() { document.getElementById('add-modal').classList.add('hidden'); }
function saveNewRecipe() {
    const title = document.getElementById('new-title').value;
    const ingredients = document.getElementById('new-ingredients').value;
    const steps = document.getElementById('new-steps').value;
    if(title && steps) {
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        recipes.push({ id: Date.now(), title, ingredients, steps });
        localStorage.setItem('recipes', JSON.stringify(recipes));
        closeModal(); renderRecipes();
    }
}

function changeTheme() {
    const theme = document.getElementById('theme-select').value;
    const r = document.documentElement.style;
    r.setProperty('--bg-color', '#000000');
    if(theme === 'neon-pink') { r.setProperty('--main-color', '#ff00de'); r.setProperty('--accent-color', '#00f2ff'); }
    else if(theme === 'neon-blue') { r.setProperty('--main-color', '#00f2ff'); r.setProperty('--accent-color', '#ff00de'); }
    else if(theme === 'dad-cool') { r.setProperty('--bg-color', '#0a192f'); r.setProperty('--main-color', '#64ffda'); r.setProperty('--accent-color', '#ff9f1c'); }
    else if(theme === 'chef-pro') { r.setProperty('--bg-color', '#1a1a1a'); r.setProperty('--main-color', '#ffffff'); r.setProperty('--accent-color', '#bdc3c7'); }
    else if(theme === 'rainbow') { r.setProperty('--main-color', '#e74c3c'); r.setProperty('--accent-color', '#f1c40f'); }
    localStorage.setItem('appTheme', theme);
}

function loadSettings() {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) { document.getElementById('theme-select').value = savedTheme; changeTheme(); }
    const savedMusic = localStorage.getItem('bgMusicPreference');
    if (savedMusic) { document.getElementById('music-select').value = savedMusic; if (savedMusic !== 'none') document.getElementById('bg-music').src = musicTracks[savedMusic]; }
}
function saveSettings() { changeTheme(); alert("ההגדרות נשמרו! ✨"); showScreen('recipe-list-screen'); }

const synth = window.speechSynthesis;
let utterance;
function toggleSpeech() {
    if(synth.speaking) { synth.cancel(); return; }
    const text = document.getElementById('detail-title').innerText + ". " + document.getElementById('detail-instructions').innerText;
    utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = document.getElementById('voice-speed').value; utterance.lang = 'he-IL';
    synth.speak(utterance);
}
function stopSpeech() { synth.cancel(); }