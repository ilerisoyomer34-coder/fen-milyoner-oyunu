# Fen Bilimleri Milyoner Oyunu

5, 6 ve 7. sınıf Fen Bilimleri konularına göre hazırlanmış, Milyoner formatında çalışan web tabanlı bilgi yarışması.

## Özellikler

- 5, 6 ve 7. sınıf için ayrı konu havuzları
- Konu seçildiğinde yalnızca seçilen konudan 15 soru
- Karışık modda sınıf seviyesine göre karma tur
- 15 soruluk para merdiveni
- Jokerler: 50:50, seyirci, telefon, süre dondurma, soru değiştirme
- Oyun sonu doğru/yanlış ve kazanılan para ekranı
- Yerel depolama ile toplam para ve rozet takibi

## Soru Kaynağı

Soru bankası şu kaynak dosyalardan dönüştürülmüştür:

- `sorular_5sinif.py`
- `sorular_6sinif.py`
- `sorular_7sinif.py`

Dağılım:

- 5. sınıf: 120 soru
- 6. sınıf: 106 soru
- 7. sınıf: 105 soru

Konu modunda her tur `6 kolay + 6 orta + 3 zor` olmak üzere 15 sorudan oluşur.

## Çalıştırma

Projeyi bir yerel HTTP sunucusuyla aç:

```bash
python3 -m http.server 4173
```

Sonra tarayıcıda şu adresi aç:

```text
http://localhost:4173/
```

## Dosya Yapısı

```text
.
├── index.html
├── Fen Milyoner Oyunu.html
├── data/questions.js
├── sound.js
├── src/
│   ├── app.jsx
│   ├── components.jsx
│   ├── game.jsx
│   └── screens.jsx
├── styles.css
├── ui.css
└── uploads/
```
