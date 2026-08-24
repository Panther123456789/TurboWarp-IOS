# TurboWarp iOS

Eine optimierte PWA-Version von [TurboWarp](https://turbowarp.org/) für iOS, installierbar via TrollStore als `.ipa`.

## Features

✅ **PWA optimiert** - Funktioniert als native-ähnliche App  
✅ **Offline-Unterstützung** - Service Worker mit Caching  
✅ **iOS optimiert** - Apple Mobile Web App Features  
✅ **Fullscreen** - Nutzt den gesamten Bildschirm  
✅ **Schnell** - Schneller Zugriff auf TurboWarp  

## Installation auf iOS via TrollStore

### Vorbereitung
1. **TrollStore** auf deinem iPhone installieren ([TrollStore Guide](https://github.com/straight-tamago/TrollStore))
2. Diese PWA als `.ipa` konvertieren

### Schritte

#### Option 1: PWA zu IPA mit PWABuilder
1. Geh zu [PWABuilder](https://www.pwabuilder.com/)
2. Gib die URL deines Hosting ein (z.B. `https://yourdomain.com`)
3. Konfiguriere die App-Details
4. Lade die iOS `.ipa` herunter
5. Öffne TrollStore → Install IPA → Wähle die `.ipa` → Install

#### Option 2: Selbst hosten
1. Pushe diese Dateien auf einen Webserver
2. Stelle sicher, dass `HTTPS` aktiviert ist
3. Verwende PWABuilder zum Konvertieren

## Dateistruktur

```
├── index.html          # Hauptseite mit PWA-Features
├── manifest.json       # PWA-Manifest
├── service-worker.js   # Offline-Unterstützung & Caching
├── offline.html        # Fallback-Seite
└── README.md          # Diese Datei
```

## Anforderungen für Icons

Füge diese Bilder im Root-Verzeichnis hinzu (für PWABuilder):

- `icon-192.png` - 192×192px
- `icon-512.png` - 512×512px  
- `icon-180.png` - 180×180px (Apple Touch Icon)
- `icon-96.png` - 96×96px
- `screenshot-540.png` - 540×720px (optional)
- `screenshot-1280.png` - 1280×720px (optional)

## Konfiguration

### Sprache ändern
Ändere in `index.html` und `manifest.json`:
```html
<html lang="de">  <!-- Ändere "de" zu deiner Sprache -->
```

### App-Name ändern
In `manifest.json`:
```json
"name": "TurboWarp Editor",
"short_name": "TurboWarp"
```

## Fehlerbehandlung

- **Offline?** → Die App zeigt eine Offline-Meldung
- **Langsam?** → Service Worker cached automatisch
- **Nicht geladen?** → Überprüfe HTTPS und CORS

## Kompatibilität

- ✅ iOS 13+
- ✅ iPadOS 13+
- ✅ Safari auf iOS
- ✅ Chrome/Brave auf iOS

## Support

- [TurboWarp GitHub](https://github.com/TurboWarp/TurboWarp)
- [PWABuilder Docs](https://docs.pwabuilder.com/)
- [Apple PWA Docs](https://developer.apple.com/pwa/)

## Lizenz

Diese PWA-Wrapper ist kostenlos und Open Source. Siehe TurboWarp für deren Lizenz.
