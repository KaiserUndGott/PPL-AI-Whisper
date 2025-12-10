# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

## [1.0.0] - 2025-12-10

### Hinzugefügt
- Initial Release
- Tampermonkey/Greasemonkey Script für Spracheingabe in Paperless-AI
- Integration mit Groq Whisper API (kostenlos)
- Unterstützung für Deutsch und weitere Sprachen
- Mikrofon-Button im Paperless-AI RAG Chat Interface
- Automatische Audio-Aufnahme und -Transkription
- Fehlerbehandlung und Benutzer-Feedback
- Umfassende Dokumentation (README.md)
- Troubleshooting-Guide

### Features
- ✅ Kostenlose Spracherkennung via Groq
- ✅ Optimiert für deutsche Sprache
- ✅ Einfache Installation als Browser-Script
- ✅ Keine zusätzliche Server-Last
- ✅ VPN-kompatibel
- ✅ Responsive Button mit visuellen States
- ✅ Automatische DOM-Beobachtung für dynamische Inhalte
- ✅ Error-Handling mit hilfreichen Fehlermeldungen

### Technische Details
- Whisper Model: `whisper-large-v3-turbo` (Standard)
- Audio-Format: WebM
- Rate Limits: 20 Anfragen/Minute (Groq Free Tier)
- Browser-Support: Chrome, Firefox, Safari, Edge

---

**Legende:**
- `Hinzugefügt` für neue Features
- `Geändert` für Änderungen an bestehender Funktionalität
- `Veraltet` für Features, die bald entfernt werden
- `Entfernt` für entfernte Features
- `Behoben` für Bugfixes
- `Sicherheit` für Sicherheitsupdates
