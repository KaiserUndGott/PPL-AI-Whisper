# 🎤 PPL-AI-Whisper

**Voice Input Integration für Paperless-AI mit Groq Whisper API**

Füge Spracheingabe zu deiner Paperless-AI Installation hinzu - komplett kostenlos und ohne zusätzliche Server-Ressourcen!

## 🌟 Features

- ✅ **Kostenlose Spracherkennung** via Groq Whisper API
- ✅ **Optimiert für Deutsch** (und weitere Sprachen)
- ✅ **Einfache Installation** als Tampermonkey/Greasemonkey Script
- ✅ **Keine Server-Last** - läuft komplett im Browser
- ✅ **Schnell** - Transkription in < 2 Sekunden
- ✅ **Privatsphäre** - Audio wird nur zur Transkription an Groq gesendet
- ✅ **VPN-kompatibel** - funktioniert auch über Fernzugriff

## 📋 Voraussetzungen

1. **Paperless-AI Installation** (clusterzx/paperless-ai)
2. **Groq Account** (kostenlos) → [console.groq.com](https://console.groq.com)
3. **Browser-Extension:**
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Safari, Edge)
   - Oder [Violentmonkey](https://violentmonkey.github.io/) als Alternative

## 🚀 Schnellstart

### 1. Groq API Key erstellen

1. Gehe zu [console.groq.com](https://console.groq.com)
2. Erstelle einen kostenlosen Account
3. Navigiere zu **API Keys**
4. Klicke auf **"Create API Key"**
5. Kopiere den Key (beginnt mit `gsk_`)

### 2. Tampermonkey installieren

**macOS/Safari:**
- [Tampermonkey im App Store](https://apps.apple.com/app/tampermonkey/id1482490089)

**Chrome/Edge:**
- [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

**Firefox:**
- [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/tampermonkey/)

### 3. Script installieren

#### Option A: Direktinstallation (empfohlen)

**Klicke hier:** [paperless-ai-whisper.user.js](https://raw.githubusercontent.com/KaiserUndGott/PPL-AI-Whisper/main/paperless-ai-whisper.user.js)

Tampermonkey erkennt das Script automatisch und bietet Installation an.

#### Option B: Manuelle Installation

1. Klicke auf das Tampermonkey Icon in deinem Browser
2. Wähle **"Create a new script"**
3. Kopiere den Inhalt von [paperless-ai-whisper.user.js](paperless-ai-whisper.user.js)
4. Füge ihn ein und speichere (Cmd/Ctrl+S)

### 4. Konfiguration

Öffne das installierte Script in Tampermonkey und passe diese Zeilen an:

```javascript
// Zeile 24: Dein Groq API Key
const GROQ_API_KEY = 'gsk_DEIN_KEY_HIER';

// Zeile 7-8: Deine Paperless-AI URL (wenn nötig anpassen)
// @match        http://192.168.1.100:8000/*
// @match        https://paperless.deinedomain.de/*
```

**Wichtig:** Die `@match` Zeile muss zu deiner Paperless-AI URL passen!

### 5. Nutzung

1. Öffne Paperless-AI im Browser
2. Navigiere zum **RAG Chat**
3. Ein **🎤 Mikrofon-Button** erscheint rechts neben dem Input-Feld
4. **Klicke auf 🎤** um Aufnahme zu starten
5. **Sprich deine Frage** (z.B. "Zeige mir alle Rechnungen von 2024")
6. **Klicke erneut** um Aufnahme zu stoppen
7. Der transkribierte Text erscheint automatisch im Input-Feld
8. **Enter drücken** um die Frage an Paperless-AI zu senden

## ⚙️ Erweiterte Konfiguration

### Sprache ändern

```javascript
// Zeile 26: Sprache ändern
const LANGUAGE = 'de'; // de, en, fr, es, it, etc.
```

### Whisper-Modell ändern

```javascript
// Zeile 25: Modell wählen
const WHISPER_MODEL = 'whisper-large-v3-turbo'; // Standard
// oder
const WHISPER_MODEL = 'whisper-large-v3'; // Höhere Genauigkeit
```

## 🔧 Troubleshooting

### "Mikrofon-Button erscheint nicht"

**Lösung:** `@match` URL prüfen und an deine Paperless-AI URL anpassen

### "API Fehler: 401 Unauthorized"

**Lösung:** Groq API Key prüfen - muss mit `gsk_` beginnen

### "API Fehler: 429 Too Many Requests"

**Lösung:** Groq Rate Limit erreicht (20/Min) - 1 Minute warten

### "Mikrofon-Zugriff verweigert"

**Lösung:** Browser-Einstellungen → Mikrofon-Zugriff erlauben

## 📊 Groq API Limits (Free Tier)

| Metrik | Limit |
|--------|-------|
| Anfragen pro Minute | 20 |
| Anfragen pro Tag | ~14.400 |
| Kosten | ✅ **Kostenlos** |

## 🛡️ Datenschutz

- ✅ Audio wird nur zur Transkription an Groq gesendet
- ✅ Groq speichert keine Audio-Dateien dauerhaft
- ✅ Transkribierter Text bleibt in deinem Paperless-AI

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE)

## 🙏 Credits

- [Paperless-AI](https://github.com/clusterzx/paperless-ai) von clusterzx
- [Groq](https://groq.com) für die kostenlose Whisper API
- [OpenAI Whisper](https://github.com/openai/whisper) für das Sprachmodell

## 💬 Support

Bei Fragen oder Problemen:
- 🐛 [Issue erstellen](https://github.com/KaiserUndGott/PPL-AI-Whisper/issues)

---

**Viel Spaß mit Spracheingabe in Paperless-AI!** 🎤📄