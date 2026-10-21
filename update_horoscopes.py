import os
import json
import datetime
import urllib.request

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

def generate_horoscopes():
    if not GEMINI_API_KEY:
        print("Error: GEMINI_API_KEY environment variable not set.")
        return

    today_str = datetime.date.today().strftime("%Y-%m-%d")

    prompt = f"""
    You are an expert, professional astrologer for the celestial web portal AstralPulse.
    Today's date is {today_str}.
    
    Generate comprehensive, detailed, and rich horoscope readings in English for all 12 zodiac signs.
    For each sign, provide:
    - "daily": A detailed daily guidance of at least 3-4 rich sentences covering career, emotional state, and love.
    - "weekly": A deep, insightful weekly forecast spanning energy shifts, challenges, and upcoming opportunities.
    - "monthly": A thorough monthly alignment review discussing long-term cosmic influences, personal growth, and major planetary themes.
    
    CRITICAL: Respond ONLY with valid JSON matching this exact structure (no markdown formatting, no code block backticks):
    {{
      "lastUpdated": "{today_str}",
      "signs": {{
        "aries": {{
          "name": "Aries",
          "dates": "Mar 21 - Apr 19",
          "element": "Fire",
          "symbol": "♈",
          "daily": "...",
          "weekly": "...",
          "monthly": "..."
        }},
        "taurus": {{
          "name": "Taurus",
          "dates": "Apr 20 - May 20",
          "element": "Earth",
          "symbol": "♉",
          "daily": "...",
          "weekly": "...",
          "monthly": "..."
        }},
        "gemini": {{
          "name": "Gemini",
          "dates": "May 21 - Jun 20",
          "element": "Air",
          "symbol": "♊",
          "daily": "...",
          "weekly": "...",
          "monthly": "..."
        }},
        "cancer": {{
          "name": "Cancer",
          "dates": "Jun 21 - Jul 22",
          "element": "Water",
          "symbol": "♋",
          "daily": "...",
          "weekly": "...",
          "monthly": "..."
        }},
        "leo": {{
          "name": "Leo",
          "dates": "Jul 23 - Aug 22",
          "element": "Fire",
          "symbol": "♌",
          "daily": "...",
          "weekly": "...",
          "monthly": "..."
        }},
        "virgo": {{
          "name": "Virgo",
          "dates": "Aug 23 - Sep 22",
          "element": "Earth",
          "symbol": "♍",
          "daily": "...",
          "weekly": "...",
          "monthly": "..."
        }},
        "libra": {{
          "name": "Libra",
          "dates": "Sep 23 - Oct 22",
          "element": "Air",
          "symbol": "♎",
          "daily": "...",
          "weekly": "...",
          "monthly": "..."
        }},
        "scorpio": {{
          "name": "Scorpio",
          "dates": "Oct 23 - Nov 21",
          "element": "Water",
          "symbol": "♏",
          "daily": "...",
          "weekly": "...",
          "monthly": "..."
        }},
        "sagittarius": {{
          "name": "Sagittarius",
          "dates": "Nov 22 - Dec 21",
          "element": "Fire",
          "symbol": "♐",
          "daily": "...",
          "weekly": "...",
          "monthly": "..."
        }},
        "capricorn": {{
          "name": "Capricorn",
          "dates": "Dec 22 - Jan 19",
          "element": "Earth",
          "symbol": "♑",
          "daily": "...",
          "weekly": "...",
          "monthly": "..."
        }},
        "aquarius": {{
          "name": "Aquarius",
          "dates": "Jan 20 - Feb 18",
          "element": "Air",
          "symbol": "♒",
          "daily": "...",
          "weekly": "...",
          "monthly": "..."
        }},
        "pisces": {{
          "name": "Pisces",
          "dates": "Feb 19 - Mar 20",
          "element": "Water",
          "symbol": "♓",
          "daily": "...",
          "weekly": "...",
          "monthly": "..."
        }}
      }}
    }}
    """

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }

    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers)
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            text_response = result['candidates'][0]['content']['parts'][0]['text'].strip()
            
            if text_response.startswith("```json"):
                text_response = text_response[7:]
            if text_response.startswith("```"):
                text_response = text_response[3:]
            if text_response.endswith("```"):
                text_response = text_response[:-3]
            
            text_response = text_response.strip()

            parsed_json = json.loads(text_response)
            
            os.makedirs("data", exist_ok=True)
            
            with open("data/horoscopes.json", "w", encoding="utf-8") as f:
                json.dump(parsed_json, f, ensure_ascii=False, indent=2)
                
            print(f"Horoscopes updated successfully for {today_str}!")

    except Exception as e:
        print(f"Failed to generate horoscopes: {e}")

if __name__ == "__main__":
    generate_horoscopes()