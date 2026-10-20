/* ==========================================================================
   AstralPulse - Main Script (Nihai Betik)
   ========================================================================== */

// 1. Toggle Tarot Cards
function toggleCard(cardContainer, detailId) {
    cardContainer.classList.toggle('flipped');
    cardContainer.classList.toggle('selected');

    const selectedDetail = document.getElementById(detailId);
    if (selectedDetail) {
        selectedDetail.classList.toggle('active');
    }
}

// 2. Horoscope Selection & Display Logic
const horoscopeData = {
    aries: { name: "Aries", symbol: "♈", date: "Mar 21 - Apr 19", daily: "Bold initiative and vibrant momentum guide your steps today. Take charge of new ventures.", weekly: "A rewarding phase for launching creative projects and expanding your professional network.", monthly: "Your leadership qualities shine brightly this month, attracting influential allies and new opportunities." },
    taurus: { name: "Taurus", symbol: "♉", date: "Apr 20 - May 20", daily: "Grounded stability brings inner serenity and strength to handle sudden shifts.", weekly: "Financial clarity improves as you streamline your long-term investment goals.", monthly: "Patience and steady persistence lay the foundation for enduring personal comfort and security." },
    gemini: { name: "Gemini", symbol: "♊", date: "May 21 - Jun 20", daily: "Curiosity opens unexpected doors of mental clarity and exciting conversations.", weekly: "Multitasking peaks, helping you resolve pending tasks with remarkable agility.", monthly: "Social connections flourish, bringing inspiring collaborations and fresh perspectives." },
    cancer: { name: "Cancer", symbol: "♋", date: "Jun 21 - Jul 22", daily: "Intuitive waters run deep; trust your gut feelings regarding personal matters.", weekly: "Creating sanctuary at home restores your emotional energy and peace of mind.", monthly: "Deep emotional bonds strengthen, fostering genuine harmony within your inner circle." },
    leo: { name: "Leo", symbol: "♌", date: "Jul 23 - Aug 22", daily: "Radiant light shines upon your unique talents. Step confidently into the spotlight.", weekly: "Your natural charisma wins over key decision-makers in collaborative projects.", monthly: "A thrilling month for romance, creative self-expression, and joyful recognition." },
    virgo: { name: "Virgo", symbol: "♍", date: "Aug 23 - Sep 22", daily: "Thoughtful organization leads to peaceful progress and clears mental clutter.", weekly: "A meticulous approach resolves a lingering logistical challenge at work.", monthly: "Prioritizing self-care and daily wellness routines brings sustained vitality." },
    libra: { name: "Libra", symbol: "♎", date: "Sep 23 - Oct 22", daily: "Harmonious balance elevates your spirit. Diplomacy resolves minor tensions.", weekly: "Partnerships take center stage, opening doors to fruitful compromises.", monthly: "A wonderful cycle for cultivating beauty, aesthetic projects, and balanced relationships." },
    scorpio: { name: "Scorpio", symbol: "♏", date: "Oct 23 - Nov 21", daily: "Transformative insights unlock deep personal power and sharp focus.", weekly: "Strategic planning behind the scenes yields powerful advantages.", monthly: "Emotional depth and intuition guide you through a major, positive life transition." },
    sagittarius: { name: "Sagittarius", symbol: "♐", date: "Nov 22 - Dec 21", daily: "Adventurous optimism leads to inspiring discoveries and uplifting interactions.", weekly: "Exploring new philosophies or travel ideas invigorates your enthusiasm.", monthly: "Horizons expand as you embrace new learning experiences and bold visions." },
    capricorn: { name: "Capricorn", symbol: "♑", date: "Dec 22 - Jan 19", daily: "Disciplined focus brings long-term professional goals closer to reality.", weekly: "Your unwavering commitment earns respect from authority figures.", monthly: "A milestone month for structural growth, career milestones, and material success." },
    aquarius: { name: "Aquarius", symbol: "♒", date: "Jan 20 - Feb 18", daily: "Innovative vision inspires those around you to think outside the box.", weekly: "Group collaborations spark genius solutions to community or work hurdles.", monthly: "Breakthrough ideas and progressive changes redefine your personal path." },
    pisces: { name: "Pisces", symbol: "♓", date: "Feb 19 - Mar 20", daily: "Dreamy imagination fuels your artistic and spiritual awareness today.", weekly: "Creative expression flows effortlessly, offering profound emotional release.", monthly: "Spiritual renewal and heightened empathy guide you toward inspiring dreams." }
};

function selectZodiac(signKey) {
    const grid = document.getElementById('zodiac-grid');
    const view = document.getElementById('selected-horoscope-view');
    const focusDisplay = document.getElementById('focus-card-display');

    const data = horoscopeData[signKey];
    if (!data || !grid || !view) return;

    grid.style.display = 'none';
    view.classList.add('active');

    focusDisplay.innerHTML = `
        <div class="zodiac-symbol">${data.symbol}</div>
        <h3 style="font-family: 'Cinzel', serif; color: #d4af37; font-size: 1.4rem; margin-bottom: 5px;">${data.name}</h3>
        <span style="color: #a594fd; font-size: 0.9rem;">${data.date}</span>
    `;

    document.getElementById('text-daily').innerText = data.daily;
    document.getElementById('text-weekly').innerText = data.weekly;
    document.getElementById('text-monthly').innerText = data.monthly;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetHoroscopeView() {
    const grid = document.getElementById('zodiac-grid');
    const view = document.getElementById('selected-horoscope-view');

    if (!grid || !view) return;

    view.classList.remove('active');
    grid.style.display = 'grid';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Zodiac Compatibility Calculation Logic
function checkCompatibility() {
    const sign1 = document.getElementById('sign1').value;
    const sign2 = document.getElementById('sign2').value;

    const resultBox = document.getElementById('compatibility-result');
    const scoreElement = document.getElementById('match-score');
    const descElement = document.getElementById('match-desc');
    const titleElement = document.getElementById('match-title');

    if (!resultBox) return;

    let hash = 0;
    const combined = sign1.length > sign2.length ? sign1 + sign2 : sign2 + sign1;
    for (let i = 0; i < combined.length; i++) {
        hash = combined.charCodeAt(i) + ((hash << 5) - hash);
    }

    const score = 65 + Math.abs(hash % 34);

    titleElement.innerText = `${sign1} & ${sign2} Harmony`;
    scoreElement.innerText = `${score}%`;

    if (score >= 88) {
        descElement.innerText = `An extraordinary soulmate connection! ${sign1} and ${sign2} share deep elemental synergy, passionate communication, and mutual understanding.`;
    } else if (score >= 78) {
        descElement.innerText = `A powerful and dynamic partnership. ${sign1} and ${sign2} complement each other's strengths and bring inspiring balance into the relationship.`;
    } else {
        descElement.innerText = `An unique learning connection. While ${sign1} and ${sign2} have different perspectives, their contrast sparks fascination and personal growth.`;
    }

    resultBox.classList.add('active');
}

// 4. Birth Chart Calculation Logic
function calculateBirthChart() {
    const name = document.getElementById('birth-name').value.trim();
    const date = document.getElementById('birth-date').value;
    const time = document.getElementById('birth-time').value;
    const place = document.getElementById('birth-place').value.trim();

    const resultBox = document.getElementById('birthchart-result');
    const titleElement = document.getElementById('chart-result-title');
    const sunDesc = document.getElementById('sun-desc');
    const moonDesc = document.getElementById('moon-desc');
    const risingDesc = document.getElementById('rising-desc');

    if (!resultBox) return;

    if (!date || !place) {
        alert("Please provide at least your birth date and birth place.");
        return;
    }

    // Deterministic pseudo-astrology mapping based on inputs
    const signsList = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    let seed = 0;
    const str = date + time + place;
    for (let i = 0; i < str.length; i++) {
        seed = str.charCodeAt(i) + ((seed << 5) - seed);
    }

    const sun = signsList[Math.abs(seed) % 12];
    const moon = signsList[Math.abs(seed >> 2) % 12];
    const rising = signsList[Math.abs(seed >> 4) % 12];

    titleElement.innerText = `${name ? name + "'s" : "Your"} Celestial Blueprint`;
    sunDesc.innerText = `Your Sun is in ${sun}. This represents your core essence, ego expression, vitality, and lifelong purpose in this incarnation.`;
    moonDesc.innerText = `Your Moon is in ${moon}. This reflects your emotional inner world, subconscious patterns, intuition, and what makes you feel secure.`;
    risingDesc.innerText = `Your Ascendant is in ${rising}. This governs your outer persona, physical appearance, and how you instinctively greet the world.`;

    resultBox.classList.add('active');
}

// 5. Mystic Oracle Chat Logic
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    if (!inputField || !chatMessages) return;

    const userText = inputField.value.trim();
    if (userText === '') return;

    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'message user-msg';
    userMsgDiv.innerHTML = `<p>${escapeHtml(userText)}</p>`;
    chatMessages.appendChild(userMsgDiv);

    inputField.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        const oracleMsgDiv = document.createElement('div');
        oracleMsgDiv.className = 'message oracle-msg';
        oracleMsgDiv.innerHTML = `<p>${getOracleResponse(userText)}</p>`;
        chatMessages.appendChild(oracleMsgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function getOracleResponse(question) {
    const responses = [
        "The celestial alignment indicates a period of profound transformation. Trust your inner voice.",
        "A hidden opportunity in your professional path will soon reveal itself. Keep your eyes open.",
        "The stars suggest patience in matters of the heart. True harmony takes time to blossom.",
        "Your energy is shifting toward abundance. Embrace the upcoming changes with an open spirit.",
        "An unexpected message from someone in your past may bring closure and peace."
    ];
    const index = Math.abs(question.length) % responses.length;
    return responses[index];
}