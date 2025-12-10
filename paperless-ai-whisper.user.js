// ==UserScript==
// @name         Paperless-AI Voice Input (Groq Whisper)
// @namespace    https://github.com/KaiserUndGott/PPL-AI-Whisper
// @version      1.2.0
// @description  Spracheingabe für Paperless-AI RAG Chat via Groq Whisper API
// @author       KaiserUndGott
// @match        http://192.168.128.2:8086/*
// @match        http://192.168.128.*:*/*
// @icon         data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🎤</text></svg>
// @grant        none
// @updateURL    https://raw.githubusercontent.com/KaiserUndGott/PPL-AI-Whisper/main/paperless-ai-whisper.user.js
// @downloadURL  https://raw.githubusercontent.com/KaiserUndGott/PPL-AI-Whisper/main/paperless-ai-whisper.user.js
// @supportURL   https://github.com/KaiserUndGott/PPL-AI-Whisper/issues
// ==/UserScript==

(function() {
    'use strict';

    // ============================================================================
    // KONFIGURATION - Hier anpassen!
    // ============================================================================
    
    const GROQ_API_KEY = 'gsk_YOUR_API_KEY_HERE'; // <-- WICHTIG: Hier deinen Groq API Key eintragen!
    const WHISPER_MODEL = 'whisper-large-v3-turbo'; // Modell: whisper-large-v3 oder whisper-large-v3-turbo
    const LANGUAGE = 'de'; // Sprache: de, en, fr, es, it, etc.
    
    // ============================================================================
    // GLOBALE VARIABLEN
    // ============================================================================
    
    let mediaRecorder;
    let audioChunks = [];
    let isRecording = false;
    let voiceButton;
    
    // ============================================================================
    // HAUPTFUNKTION: Mikrofon-Button hinzufügen
    // ============================================================================
    
    function addVoiceButton() {
        // Finde Chat-Input-Feld (spezifisch für Paperless-AI)
        const inputArea = document.querySelector('textarea#message-input, textarea.message-input');
        if (!inputArea) {
            console.log('[PPL-AI-Whisper] Chat-Input nicht gefunden, erneuter Versuch in 1s...');
            setTimeout(addVoiceButton, 1000);
            return;
        }
        
        // Prüfe ob Button bereits existiert
        if (document.getElementById('ppl-ai-whisper-btn')) {
            console.log('[PPL-AI-Whisper] Button bereits vorhanden');
            return;
        }
        
        console.log('[PPL-AI-Whisper] Chat-Input gefunden, füge Mikrofon-Button hinzu...');
        
        // Button erstellen
        voiceButton = document.createElement('button');
        voiceButton.id = 'ppl-ai-whisper-btn';
        voiceButton.innerHTML = '🎤';
        voiceButton.title = 'Klicken um Sprachaufnahme zu starten/stoppen';
        voiceButton.type = 'button';
        
        // FIXED Position mit maximaler Sichtbarkeit
        voiceButton.style.cssText = `
            display: block !important;
            position: fixed !important;
            right: 30px !important;
            bottom: 30px !important;
            width: 56px !important;
            height: 56px !important;
            background: #3b82f6 !important;
            border: none !important;
            border-radius: 50% !important;
            font-size: 28px !important;
            cursor: pointer !important;
            z-index: 2147483647 !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
            transition: all 0.3s ease !important;
        `;
        
        // Hover-Effekt
        voiceButton.addEventListener('mouseenter', () => {
            if (!isRecording) {
                voiceButton.style.transform = 'scale(1.1)';
            }
        });
        voiceButton.addEventListener('mouseleave', () => {
            if (!isRecording) {
                voiceButton.style.transform = 'scale(1)';
            }
        });
        
        // Click-Handler
        voiceButton.addEventListener('click', toggleRecording);
        
        // Button direkt an body anhängen (nicht an Parent-Container)
        document.body.appendChild(voiceButton);
        console.log('[PPL-AI-Whisper] Mikrofon-Button erfolgreich hinzugefügt!');
    }
    
    // ============================================================================
    // AUFNAHME STARTEN/STOPPEN
    // ============================================================================
    
    async function toggleRecording() {
        if (!GROQ_API_KEY || GROQ_API_KEY === 'gsk_YOUR_API_KEY_HERE') {
            alert('⚠️ Bitte trage deinen Groq API Key im Tampermonkey Script ein!\n\nÖffne das Script und ersetze "gsk_YOUR_API_KEY_HERE" mit deinem echten Key.');
            return;
        }
        
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    }
    
    async function startRecording() {
        try {
            console.log('[PPL-AI-Whisper] Starte Aufnahme...');
            
            // Mikrofon-Zugriff anfragen
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
            
            // MediaRecorder initialisieren
            mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm'
            });
            audioChunks = [];
            
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    audioChunks.push(e.data);
                }
            };
            
            mediaRecorder.onstop = sendToGroq;
            
            mediaRecorder.start();
            isRecording = true;
            
            // Button-Zustand ändern
            voiceButton.innerHTML = '⏹️';
            voiceButton.style.background = '#ef4444 !important';
            voiceButton.style.animation = 'pulse 1.5s infinite';
            voiceButton.title = 'Klicken um Aufnahme zu stoppen';
            
            // Pulse-Animation hinzufügen
            if (!document.getElementById('ppl-ai-whisper-style')) {
                const style = document.createElement('style');
                style.id = 'ppl-ai-whisper-style';
                style.textContent = `
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.15); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            console.log('[PPL-AI-Whisper] Aufnahme läuft...');
            
        } catch (error) {
            console.error('[PPL-AI-Whisper] Fehler beim Mikrofonzugriff:', error);
            alert('⚠️ Mikrofonzugriff verweigert!\n\nBitte erlaube dem Browser den Zugriff auf dein Mikrofon.');
            resetButton();
        }
    }
    
    function stopRecording() {
        console.log('[PPL-AI-Whisper] Stoppe Aufnahme...');
        
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
        
        isRecording = false;
        
        // Button-Zustand: Verarbeitung läuft
        voiceButton.innerHTML = '⏳';
        voiceButton.style.background = '#f59e0b !important';
        voiceButton.style.animation = 'none';
        voiceButton.title = 'Transkribiere Audio...';
        voiceButton.disabled = true;
    }
    
    // ============================================================================
    // AUDIO AN GROQ WHISPER API SENDEN
    // ============================================================================
    
    async function sendToGroq() {
        console.log('[PPL-AI-Whisper] Sende Audio an Groq Whisper API...');
        
        // Audio-Blob erstellen
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        console.log(`[PPL-AI-Whisper] Audio-Größe: ${(audioBlob.size / 1024).toFixed(2)} KB`);
        
        // FormData für API-Request
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.webm');
        formData.append('model', WHISPER_MODEL);
        formData.append('language', LANGUAGE);
        formData.append('response_format', 'json');
        
        try {
            // API-Request
            const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`API Fehler: ${response.status} ${response.statusText}`);
            }
            
            const result = await response.json();
            console.log('[PPL-AI-Whisper] Transkription erfolgreich:', result.text);
            
            // Text in Chat-Input einfügen
            const inputField = document.querySelector('textarea#message-input, textarea.message-input');
            if (inputField) {
                inputField.value = result.text;
                inputField.focus();
                
                // Trigger input event (damit Paperless-AI es bemerkt)
                inputField.dispatchEvent(new Event('input', { bubbles: true }));
                inputField.dispatchEvent(new Event('change', { bubbles: true }));
            }
            
            resetButton();
            
        } catch (error) {
            console.error('[PPL-AI-Whisper] Transkriptionsfehler:', error);
            
            let errorMsg = '⚠️ Transkription fehlgeschlagen!\n\n';
            
            if (error.message.includes('401')) {
                errorMsg += 'Fehler: API Key ungültig oder fehlt.\nBitte prüfe deinen Groq API Key!';
            } else if (error.message.includes('429')) {
                errorMsg += 'Fehler: Rate Limit erreicht.\nBitte warte 1 Minute und versuche es erneut.';
            } else if (error.message.includes('400')) {
                errorMsg += 'Fehler: Audio-Format nicht unterstützt.\nBitte versuche es erneut.';
            } else {
                errorMsg += `Fehler: ${error.message}`;
            }
            
            alert(errorMsg);
            resetButton();
        }
    }
    
    // ============================================================================
    // BUTTON ZURÜCKSETZEN
    // ============================================================================
    
    function resetButton() {
        voiceButton.innerHTML = '🎤';
        voiceButton.style.background = '#3b82f6 !important';
        voiceButton.style.animation = 'none';
        voiceButton.title = 'Klicken um Sprachaufnahme zu starten';
        voiceButton.disabled = false;
        voiceButton.style.transform = 'scale(1)';
        isRecording = false;
    }
    
    // ============================================================================
    // INITIALISIERUNG
    // ============================================================================
    
    console.log('[PPL-AI-Whisper] Script geladen, warte auf Seiten-Inhalt...');
    
    // Button nach Seitenlade hinzufügen (mit Retry-Logik)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(addVoiceButton, 1000);
        });
    } else {
        setTimeout(addVoiceButton, 1000);
    }
    
    // Beobachte DOM-Änderungen für dynamisch geladene Inhalte
    const observer = new MutationObserver(() => {
        if (!document.getElementById('ppl-ai-whisper-btn')) {
            addVoiceButton();
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('[PPL-AI-Whisper] Initialisierung abgeschlossen!');
    
})();
