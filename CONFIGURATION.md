# 📝 Konfigurations-Anleitung

Diese Datei hilft dir beim Konfigurieren des Tampermonkey-Scripts.

## 1. Groq API Key eintragen

```javascript
// Zeile 24 im Script:
const GROQ_API_KEY = 'gsk_DEIN_KEY_HIER';
```

**So erhältst du deinen Key:**
1. Gehe zu: https://console.groq.com
2. Erstelle einen Account (kostenlos)
3. Navigiere zu "API Keys"
4. Klicke "Create API Key"
5. Kopiere den Key (beginnt mit `gsk_`)

## 2. Paperless-AI URL anpassen

```javascript
// Zeile 7-8 im Script:
// @match        http://192.168.1.100:8000/*
// @match        https://paperless.meinedomain.de/*
```

**Beispiele für verschiedene Setups:**

### Lokales Netzwerk (Unraid)
```javascript
// @match        http://192.168.178.50:8080/*
```

### Mit Domain und HTTPS
```javascript
// @match        https://paperless.example.com/*
```

### Mit Subdomain
```javascript
// @match        https://docs.home.local/*
```

### Mehrere URLs (wenn du verschiedene Installationen hast)
```javascript
// @match        http://192.168.1.100:8000/*
// @match        https://paperless.example.com/*
// @match        http://localhost:8080/*
```

### Wildcard für alle URLs (nicht empfohlen aus Sicherheitsgründen)
```javascript
// @match        *://*/*
```

## 3. Sprache ändern

```javascript
// Zeile 26 im Script:
const LANGUAGE = 'de';  // Deutsch (Standard)
```

**Andere Sprachen:**
```javascript
const LANGUAGE = 'en';  // Englisch
const LANGUAGE = 'fr';  // Französisch
const LANGUAGE = 'es';  // Spanisch
const LANGUAGE = 'it';  // Italienisch
const LANGUAGE = 'nl';  // Niederländisch
const LANGUAGE = 'pl';  // Polnisch
const LANGUAGE = 'pt';  // Portugiesisch
```

## 4. Whisper-Modell wählen

```javascript
// Zeile 25 im Script:
const WHISPER_MODEL = 'whisper-large-v3-turbo';  // Standard (empfohlen)
```

**Verfügbare Modelle:**

| Modell | Geschwindigkeit | Genauigkeit | Empfehlung |
|--------|----------------|-------------|------------|
| `whisper-large-v3-turbo` | ⚡ Sehr schnell | ✅ Gut | **Standard** |
| `whisper-large-v3` | 🐢 Langsamer | ⭐ Besser | Für wichtige Dokumente |

## 5. Button-Position anpassen

Wenn der Mikrofon-Button an der falschen Stelle erscheint:

```javascript
// Zeile 71-74 im Script:
voiceButton.style.cssText = `
    position: absolute;
    right: 10px;        // Abstand von rechts (erhöhen für weiter links)
    top: 50%;           // Vertikale Position (50% = mittig)
```

**Beispiele:**

### Button weiter links
```javascript
    right: 60px;
```

### Button weiter oben
```javascript
    top: 10px;
    transform: none;  // Zeile 75 auch anpassen
```

### Größeren Button
```javascript
    width: 50px;
    height: 50px;
    font-size: 24px;
```

## 6. Timeout anpassen

Wenn der Button nicht erscheint, erhöhe das Timeout:

```javascript
// Zeile 304 im Script:
setTimeout(addVoiceButton, 1000);  // Standard: 1 Sekunde
```

**Für langsamere Verbindungen:**
```javascript
setTimeout(addVoiceButton, 2000);  // 2 Sekunden
```

## 7. Debug-Modus aktivieren

Alle Console-Logs sind bereits aktiviert. Öffne die Browser-Console (F12) um sie zu sehen:

```
[PPL-AI-Whisper] Script geladen...
[PPL-AI-Whisper] Input-Feld gefunden...
[PPL-AI-Whisper] Mikrofon-Button hinzugefügt!
[PPL-AI-Whisper] Starte Aufnahme...
[PPL-AI-Whisper] Audio-Größe: 45.23 KB
[PPL-AI-Whisper] Transkription erfolgreich: "Zeige mir alle Rechnungen"
```

## Häufige Probleme

### Button erscheint nicht
1. `@match` URL prüfen
2. Timeout erhöhen (siehe oben)
3. Browser-Console auf Fehler prüfen

### API-Fehler
1. API Key korrekt eingetragen?
2. Key beginnt mit `gsk_`?
3. Internet-Verbindung vorhanden?

### Mikrofon funktioniert nicht
1. Browser-Berechtigung erteilt?
2. Mikrofon an anderem Ort funktioniert?
3. HTTPS verwenden (manche Browser blockieren HTTP)

## Support

Bei weiteren Fragen:
- 🐛 [Issue erstellen](https://github.com/KaiserUndGott/PPL-AI-Whisper/issues)
- 📖 [README lesen](README.md)
