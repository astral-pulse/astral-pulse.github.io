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

    const zodiacDataMap = {
        "Aries": { element: "Fire", quality: "Cardinal" },
        "Taurus": { element: "Earth", quality: "Fixed" },
        "Gemini": { element: "Air", quality: "Mutable" },
        "Cancer": { element: "Water", quality: "Cardinal" },
        "Leo": { element: "Fire", quality: "Fixed" },
        "Virgo": { element: "Earth", quality: "Mutable" },
        "Libra": { element: "Air", quality: "Cardinal" },
        "Scorpio": { element: "Water", quality: "Fixed" },
        "Sagittarius": { element: "Fire", quality: "Mutable" },
        "Capricorn": { element: "Earth", quality: "Cardinal" },
        "Aquarius": { element: "Air", quality: "Fixed" },
        "Pisces": { element: "Water", quality: "Mutable" }
    };

    const s1 = zodiacDataMap[sign1];
    const s2 = zodiacDataMap[sign2];

    if (!s1 || !s2) return;

    titleElement.innerText = `${sign1} & ${sign2} Synastry Analysis`;

    let score = 70;
    let overviewText = "";
    let loveText = "";
    let communicationText = "";
    let challengeText = "";

    if (sign1 === sign2) {
        score = 85;
        overviewText = `A powerful mirror relationship. ${sign1} meets another ${sign2}, creating immediate familiarity and deep understanding of shared traits.`;
        loveText = `Romance is highly empathetic because you both desire the same atmosphere and love language.`;
        communicationText = `You speak the exact same emotional and mental dialect, making alignment effortless.`;
        challengeText = `Beware of magnifying each other's flaws or blind spots. Double the same energy can lead to stagnation.`;
    } else if (s1.element === s2.element) {
        score = 94;
        if (s1.element === "Fire") {
            overviewText = `A high-octane cosmic match! ${sign1} and ${sign2} share the Fire element, radiating boundless passion, enthusiasm, and courage.`;
            loveText = `Romance is adventurous, bold, and full of mutual encouragement and spontaneous energy.`;
            communicationText = `Direct, spirited, and transparent. You express thoughts immediately without passive-aggression.`;
            challengeText = `Managing two big egos requires turns in the spotlight to avoid competitive friction.`;
        } else if (s1.element === "Earth") {
            overviewText = `An rock-solid, enduring connection. ${sign1} and ${sign2} share the Earth element, prioritizing loyalty, security, and material stability.`;
            loveText = `Affection is sensual, grounded, and deeply reliable. You build a safe sanctuary together.`;
            communicationText = `Practical, calm, and goal-oriented. You work through problems with steady logic.`;
            challengeText = `Avoiding overly predictable routines is key to keeping romantic sparks alive over time.`;
        } else if (s1.element === "Air") {
            overviewText = `An extraordinary intellectual bond! Sharing the Air element, ${sign1} and ${sign2} connect through sparkling conversation and mental freedom.`;
            loveText = `Love is lighthearted, playful, and built on profound friendship and deep curiosity.`;
            communicationText = `Effortless and unending. You bounce ideas off each other and understand unspoken thoughts easily.`;
            challengeText = `Remember to ground your mental connection with physical presence and emotional vulnerability.`;
        } else if (s1.element === "Water") {
            overviewText = `A deeply intuitive, soulmate-level bond. ${sign1} and ${sign2} navigate emotional currents with innate empathy and spiritual depth.`;
            loveText = `Romance is poetic, protective, and emotionally transformative. You feel inherently safe together.`;
            communicationText = `Telepathic and unspoken. You feel each other's shifts in mood before words are spoken.`;
            challengeText = `Establishing healthy emotional boundaries prevents taking on each other's stress.`;
        }
    } else if (
        (s1.element === "Fire" && s2.element === "Air") || (s1.element === "Air" && s2.element === "Fire") ||
        (s1.element === "Earth" && s2.element === "Water") || (s1.element === "Water" && s2.element === "Earth")
    ) {
        score = 88;
        if (s1.element === "Fire" || s2.element === "Fire") {
            overviewText = `Air fuels Fire, creating an exhilarating and inspiring synergy between ${sign1} and ${sign2}.`;
            loveText = `Filled with creative chemistry, exciting dates, and continuous personal growth.`;
            communicationText = `Quick-witted and stimulating. Air provides vision, while Fire brings passionate execution.`;
            challengeText = `Grounding your ambitious collective ideas into tangible reality requires patience.`;
        } else {
            overviewText = `Water nourishes Earth, while Earth gives form and security to Water in this deeply supportive union.`;
            loveText = `Warm, devoted, and nurturing. Earth grounds Water's deep feelings, while Water softens Earth's pragmatic heart.`;
            communicationText = `Comfortable and respectful. You balance logical advice with tender empathy.`;
            challengeText = `Matching Earth's practical timing with Water's emotional pacing keeps harmony steady.`;
        }
    } else if (
        (s1.element === "Fire" && s2.element === "Water") || (s1.element === "Water" && s2.element === "Fire")
    ) {
        score = 48;
        overviewText = `Steam & Storms! Fire (${sign1}) and Water (${sign2}) represent fundamental elemental tension. Water can extinguish Fire's momentum, while Fire can boil Water's sensitive emotions.`;
        loveText = `Initial attraction is intense and magnetic, but sustained romance requires constant emotional calibration.`;
        communicationText = `Prone to misunderstandings. Fire's blunt directness can accidentally wound Water, while Water's emotional retreats leave Fire frustrated.`;
        challengeText = `Major adjustments are needed: Fire must cultivate gentleness, and Water must learn not to take Fire's fiery nature personally.`;
    } else if (
        (s1.element === "Fire" && s2.element === "Earth") || (s1.element === "Earth" && s2.element === "Fire")
    ) {
        score = 52;
        overviewText = `Volcanic Friction. Fire's (${sign1}) desire for rapid action clashes with Earth's (${sign2}) need for caution and methodical planning.`;
        loveText = `Fire finds Earth too restrictive, while Earth finds Fire reckless and overly impulsive.`;
        communicationText = `Debates revolve around speed vs. safety. Finding common ground takes conscious effort.`;
        challengeText = `Fire needs to respect Earth's practical timelines, and Earth must allow Fire room to take bold leaps.`;
    } else if (
        (s1.element === "Air" && s2.element === "Earth") || (s1.element === "Earth" && s2.element === "Air")
    ) {
        score = 58;
        overviewText = `Abstract vs. Concrete. Air (${sign1}) lives in the realm of theory and possibilities, whereas Earth (${sign2}) focuses strictly on tangible reality.`;
        loveText = `Earth seeks tangible commitment and structure, while Air values intellectual freedom and flexibility.`;
        communicationText = `Air may view Earth as too rigid, while Earth sees Air's ideas as impractical daydreams.`;
        challengeText = `Bridging the gap requires Air to bring practical results and Earth to open up to new ideas.`;
    } else {
        score = 62;
        overviewText = `Logic vs. Emotion. Air (${sign1}) analyzes life through intellect, while Water (${sign2}) processes the world through deep gut feelings.`;
        loveText = `A complex dynamic where Air tries to rationalize feelings that Water simply needs to experience and validate.`;
        communicationText = `Air seeks objective debate, while Water seeks deep emotional reassurance, leading to mismatched conversations.`;
        challengeText = `Air must practice heartfelt empathy without over-analyzing, and Water needs to express needs directly.`;
    }

    scoreElement.innerText = `${score}%`;

    descElement.innerHTML = `
        <div style="margin-bottom: 16px;">
            <strong style="color: #d4af37; font-family: 'Cinzel', serif; display: block; margin-bottom: 6px; font-size: 1.05rem;">✨ Overview & Cosmic Alignment</strong>
            <p style="margin: 0; line-height: 1.6; color: #d6c7eb;">${overviewText}</p>
        </div>
        <div style="margin-bottom: 16px;">
            <strong style="color: #d4af37; font-family: 'Cinzel', serif; display: block; margin-bottom: 6px; font-size: 1.05rem;">💖 Love & Romance Dynamics</strong>
            <p style="margin: 0; line-height: 1.6; color: #d6c7eb;">${loveText}</p>
        </div>
        <div style="margin-bottom: 16px;">
            <strong style="color: #d4af37; font-family: 'Cinzel', serif; display: block; margin-bottom: 6px; font-size: 1.05rem;">🗣️ Communication & Intellectual Flow</strong>
            <p style="margin: 0; line-height: 1.6; color: #d6c7eb;">${communicationText}</p>
        </div>
        <div>
            <strong style="color: #d4af37; font-family: 'Cinzel', serif; display: block; margin-bottom: 6px; font-size: 1.05rem;">⚡ Growth, Harmony & Challenges</strong>
            <p style="margin: 0; line-height: 1.6; color: #d6c7eb;">${challengeText}</p>
        </div>
    `;

    resultBox.classList.add('active');
}

// 4. Birth Chart Calculation Logic
function calculateBirthChart() {
    const nameInput = document.getElementById('birth-name').value.trim();
    const dateInput = document.getElementById('birth-date').value;
    const timeInput = document.getElementById('birth-time').value;
    const placeInput = document.getElementById('birth-place').value.trim();

    const resultBox = document.getElementById('birthchart-result');
    const titleElement = document.getElementById('chart-result-title');
    const sunDesc = document.getElementById('sun-desc');
    const moonDesc = document.getElementById('moon-desc');
    const risingDesc = document.getElementById('rising-desc');

    if (!resultBox) return;

    if (!dateInput || !placeInput) {
        alert("Please provide at least your birth date and birth place.");
        return;
    }

    // Safely parse YYYY-MM-DD directly without timezone shift bugs
    const [year, monthStr, dayStr] = dateInput.split('-');
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    // 1. Calculate Real Sun Sign Based on Tropical Zodiac Dates
    let sunSign = "";
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sunSign = "Aries";
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sunSign = "Taurus";
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sunSign = "Gemini";
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sunSign = "Cancer";
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sunSign = "Leo";
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sunSign = "Virgo";
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sunSign = "Libra";
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sunSign = "Scorpio";
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sunSign = "Sagittarius";
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sunSign = "Capricorn";
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sunSign = "Aquarius";
    else sunSign = "Pisces";

    const zodiacOrder = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    const sunIndex = zodiacOrder.indexOf(sunSign);

    // 2. Calculate Rising Sign (Ascendant) Based on Birth Time
    let hour = 12;
    if (timeInput) {
        const timeParts = timeInput.split(':');
        hour = parseInt(timeParts[0], 10);
    }

    const hoursFromSunrise = (hour - 6 + 24) % 24;
    const risingOffset = Math.floor(hoursFromSunrise / 2);
    const risingSign = zodiacOrder[(sunIndex + risingOffset) % 12];

    // 3. Calculate Moon Sign Based on Day & Time Seed
    let seed = 0;
    const seedStr = dateInput + (timeInput || "12:00") + placeInput;
    for (let i = 0; i < seedStr.length; i++) {
        seed = seedStr.charCodeAt(i) + ((seed << 5) - seed);
    }
    const moonSign = zodiacOrder[Math.abs(seed) % 12];

    const interpretations = {
        Aries: "pioneering energy, fiery drive, courageous action, and a bold pursuit of personal independence.",
        Taurus: "grounded stability, unshakeable patience, sensual appreciation, and a commitment to material security.",
        Gemini: "intellectual agility, vibrant curiosity, expressive communication, and an adaptable approach to life.",
        Cancer: "deep intuitive sensitivity, protective instincts, emotional depth, and a strong devotion to sanctuary.",
        Leo: "radiant warmth, creative confidence, natural leadership charisma, and a heart-centered desire to inspire.",
        Virgo: "meticulous discernment, practical wisdom, dedicated service, and a devotion to continuous self-improvement.",
        Libra: "harmonious grace, diplomatic balance, aesthetic appreciation, and a strong focus on meaningful partnership.",
        Scorpio: "transformative intensity, emotional depth, strategic focus, and a powerful instinct for truth.",
        Sagittarius: "adventurous optimism, philosophical wisdom, love for freedom, and a lifelong search for expansion.",
        Capricorn: "disciplined ambition, structural foresight, unwavering resilience, and a focus on enduring mastery.",
        Aquarius: "visionary originality, humanitarian ideals, progressive thinking, and an independent spirit.",
        Pisces: "poetic imagination, spiritual empathy, intuitive awareness, and a profound connection to the mystical."
    };

    titleElement.innerText = nameInput ? `${nameInput}'s Celestial Blueprint` : "Your Celestial Blueprint";

    sunDesc.innerHTML = `<strong style="color: #d4af37;">Sun in ${sunSign}:</strong> Governs your core identity, vital ego, and primary life purpose. With your Sun in ${sunSign}, you are guided by ${interpretations[sunSign]}`;

    moonDesc.innerHTML = `<strong style="color: #d4af37;">Moon in ${moonSign}:</strong> Reflects your emotional subconscious, instinctual needs, and inner sanctuary. Having your Moon in ${moonSign} reveals that emotional security comes through ${interpretations[moonSign]}`;

    risingDesc.innerHTML = `<strong style="color: #d4af37;">Ascendant (Rising) in ${risingSign}:</strong> Shapes your outer aura, first impressions, and how you navigate the physical world. Your ${risingSign} Ascendant projects ${interpretations[risingSign]}`;

    resultBox.classList.add('active');
}