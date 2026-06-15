/* ===========================================================
   FEN BİLİMLERİ MİLYONER OYUNU — Soru Bankası

   Kaynak: Claude outputs klasöründeki sorular_5sinif.py,
   sorular_6sinif.py ve sorular_7sinif.py dosyalarından dönüştürüldü.

   YAPI: BANK[sınıf][kategori] = [ {level, text, options, answer, explain} ]
   level: 'kolay' | 'orta' | 'zor'

   Kaynak dağılımı: her konu çoğunlukla 15 soru içerir
   (6 kolay + 6 orta + 3 zor). Oyun turu da bu dağılımı korur.
   - Karışık mod: seçilen sınıfın tüm konularından 15 soru.
   - Konu modu: 15 sorunun tamamı yalnızca seçilen konudan gelir.
   =========================================================== */

(function () {
  const LADDER = [
    100, 200, 300, 500, 1000,
    2000, 4000, 8000, 16000, 32000,
    64000, 125000, 250000, 500000, 1000000
  ];
  const SAFE_POINTS = [5, 11];

  function timeFor(qIndex) { if (qIndex < 6) return 45; if (qIndex < 12) return 35; return 25; }
  function levelFor(qIndex) { if (qIndex < 6) return 'kolay'; if (qIndex < 12) return 'orta'; return 'zor'; }

  const BANK = {
  "5": {
    "Hücre – Canlının Temel Birimi": [
      {
        "level": "kolay",
        "text": "Canlıların yapı ve işlev birimi olan en küçük parçaya ne ad verilir?",
        "options": [
          "Doku",
          "Hücre",
          "Organ",
          "Sistem"
        ],
        "answer": 1,
        "explain": "Hücre, tüm canlı organizmaların yapı ve işlev birimidir; canlılığın temel taşı olarak kabul edilir."
      },
      {
        "level": "kolay",
        "text": "Hücreyi dışarıdan çeviren, madde geçişini denetleyen yapı hangisidir?",
        "options": [
          "Hücre duvarı",
          "Hücre zarı",
          "Çekirdek",
          "Mitokondri"
        ],
        "answer": 1,
        "explain": "Hücre zarı yarı geçirgen özelliğiyle hücreye giren ve çıkan maddeleri seçici biçimde kontrol eder."
      },
      {
        "level": "kolay",
        "text": "Hücrenin 'enerji santrali' olarak bilinen organeli hangisidir?",
        "options": [
          "Ribozom",
          "Koful",
          "Mitokondri",
          "Lizozom"
        ],
        "answer": 2,
        "explain": "Mitokondri, besin maddelerini oksijen yardımıyla parçalayarak ATP (enerji) üretir."
      },
      {
        "level": "kolay",
        "text": "Bitki hücrelerinde fotosentez yapan organel hangisidir?",
        "options": [
          "Mitokondri",
          "Ribozom",
          "Kloroplast",
          "Golgi cisimciği"
        ],
        "answer": 2,
        "explain": "Kloroplast, içindeki klorofil pigmenti sayesinde güneş ışığını kullanarak fotosentez yapar."
      },
      {
        "level": "kolay",
        "text": "Hücrenin kontrol merkezi görevi gören, kalıtım bilgisini barındıran organel hangisidir?",
        "options": [
          "Koful",
          "Çekirdek",
          "Golgi",
          "Hücre zarı"
        ],
        "answer": 1,
        "explain": "Çekirdek, DNA'yı içerir; hücre faaliyetlerini ve bölünmeyi yönetir."
      },
      {
        "level": "kolay",
        "text": "Protein sentezinin gerçekleştiği organel hangisidir?",
        "options": [
          "Lizozom",
          "Ribozom",
          "Koful",
          "Endoplazmik retikulum"
        ],
        "answer": 1,
        "explain": "Ribozomlar, çekirdekteki bilgiyi okuyarak amino asitleri birleştirir ve protein üretir."
      },
      {
        "level": "orta",
        "text": "Bitki ve hayvan hücreleri karşılaştırıldığında, yalnızca bitki hücresinde bulunan yapılar hangi seçenekte doğru verilmiştir?",
        "options": [
          "Hücre zarı ve mitokondri",
          "Ribozom ve çekirdek",
          "Hücre duvarı, kloroplast ve büyük merkezi koful",
          "Lizozom ve Golgi cisimciği"
        ],
        "answer": 2,
        "explain": "Hücre duvarı (selülozdan), kloroplast ve büyük merkezi koful bitki hücresine özgüdür."
      },
      {
        "level": "orta",
        "text": "Mikroskopla incelenen bir hücrede hücre duvarı, kloroplast ve büyük koful gözlemleniyor. Bu hücre hangi canlıya aittir?",
        "options": [
          "Amip",
          "Bakteri",
          "Mantar",
          "Bitki"
        ],
        "answer": 3,
        "explain": "Söz konusu üç yapı birlikte yalnızca bitki hücrelerinde bulunur."
      },
      {
        "level": "orta",
        "text": "Hücre zarının 'seçici geçirgen' olması ne anlama gelir?",
        "options": [
          "Hiçbir maddeyi geçirmez",
          "Tüm maddeleri eşit geçirir",
          "Bazı maddeleri geçirir, bazılarını geçirmez",
          "Yalnızca suyu geçirir"
        ],
        "answer": 2,
        "explain": "Seçici geçirgenlik; hücre zarının bazı molekülleri (örn. su, oksijen) kolayca geçirirken diğerlerini engellemesidir."
      },
      {
        "level": "orta",
        "text": "Golgi cisimciğinin temel görevi aşağıdakilerden hangisidir?",
        "options": [
          "Enerji üretmek",
          "DNA kopyalamak",
          "Maddeleri paketleyip hücre dışına göndermek",
          "Fotosentez yapmak"
        ],
        "answer": 2,
        "explain": "Golgi cisimciği, ribozomlarda üretilen proteinleri alır, işler ve salgı vezikülleri halinde dışarıya gönderir."
      },
      {
        "level": "orta",
        "text": "Lizozomun hücredeki görevi nedir?",
        "options": [
          "Protein sentezi",
          "Enerji üretimi",
          "Hücre içi sindirim ve zarar görmüş organelleri parçalama",
          "Madde taşıma"
        ],
        "answer": 2,
        "explain": "Lizozomlar sindirim enzimleri içerir; yabancı maddeleri ve hasar görmüş organelleri parçalar."
      },
      {
        "level": "orta",
        "text": "Hücre zarı zarar görürse öncelikle ne olur?",
        "options": [
          "Protein sentezi durur",
          "Enerji üretimi artar",
          "Hücreye giren-çıkan maddeler kontrol edilemez",
          "Fotosentez hızlanır"
        ],
        "answer": 2,
        "explain": "Hücre zarının bütünlüğü bozulunca madde geçişi denetimsiz hale gelir ve hücre işlevlerini yitirir."
      },
      {
        "level": "zor",
        "text": "Ribozom ve Golgi cisimciği birlikte çalışarak hangi işlevi yerine getirir?",
        "options": [
          "Enerji üretimi ve depolama",
          "Protein sentezi ve salgılanması",
          "DNA kopyalama ve onarım",
          "Fotosentez ve solunum"
        ],
        "answer": 1,
        "explain": "Ribozom protein sentezler; Golgi cisimciği bu proteinleri paketleyip hücre dışına ya da organellere iletir."
      },
      {
        "level": "zor",
        "text": "Mitokondrisi olmayan bir hücrede uzun vadede ne beklenebilir?",
        "options": [
          "Protein sentezi durur",
          "Hücre bölünmesi hızlanır",
          "Hücre yeterli enerji üretemeyerek ölür",
          "Fotosentez devreye girer"
        ],
        "answer": 2,
        "explain": "Mitokondri olmadan ATP üretilemez; aerobik solunum yapılamaz ve hücre yaşamını sürdüremez."
      },
      {
        "level": "zor",
        "text": "Aşağıdaki ifadelerden hangisi hücre çekirdeği için YANLIŞTIR?",
        "options": [
          "Kalıtım maddesi (DNA) içerir",
          "Hücre bölünmesini yönetir",
          "ATP üretiminin birincil merkezidir",
          "Hücre faaliyetlerini kontrol eder"
        ],
        "answer": 2,
        "explain": "ATP üretimi mitokondrinin görevidir. Çekirdek DNA'yı barındırır ve hücre bölünmesini yönetir, enerji üretmez."
      }
    ],
    "Vücudumuzdaki Sistemler": [
      {
        "level": "kolay",
        "text": "Besinlerin mekanik ve kimyasal sindiriminin başladığı organ hangisidir?",
        "options": [
          "Mide",
          "İnce bağırsak",
          "Ağız",
          "Yemek borusu"
        ],
        "answer": 2,
        "explain": "Ağızda dişler mekanik sindirimi, tükürük bezlerinin salgıladığı amilaz enzimi kimyasal sindirimi başlatır."
      },
      {
        "level": "kolay",
        "text": "Sindirilmiş besinlerin kana emildiği organ hangisidir?",
        "options": [
          "Mide",
          "Kalın bağırsak",
          "İnce bağırsak",
          "Karaciğer"
        ],
        "answer": 2,
        "explain": "İnce bağırsak duvarındaki villus yapıları yüzey alanını artırarak sindirilmiş besinlerin kana geçmesini sağlar."
      },
      {
        "level": "kolay",
        "text": "Kanı vücuda pompalayan organ hangisidir?",
        "options": [
          "Akciğer",
          "Karaciğer",
          "Böbrek",
          "Kalp"
        ],
        "answer": 3,
        "explain": "Kalp, kasılıp genişleyerek kanı atardamarlar aracılığıyla tüm vücuda pompalar."
      },
      {
        "level": "kolay",
        "text": "Solunumda oksijen ile karbondioksit değişiminin gerçekleştiği yapılar hangisidir?",
        "options": [
          "Bronşlar",
          "Alveol (hava kesecikleri)",
          "Trakea",
          "Diyafram"
        ],
        "answer": 1,
        "explain": "Akciğerlerdeki milyonlarca alveol, ince duvarları ve geniş yüzey alanı sayesinde gaz değişimini sağlar."
      },
      {
        "level": "kolay",
        "text": "Kanın içinde kırmızı rengi veren ve oksijen taşıyan hücre hangisidir?",
        "options": [
          "Akyuvar",
          "Trombosit",
          "Alyuvar",
          "Plazma"
        ],
        "answer": 2,
        "explain": "Alyuvarlar (eritrositler) içlerindeki hemoglobin proteini sayesinde oksijeni bağlar ve dokulara taşır."
      },
      {
        "level": "kolay",
        "text": "İdrarın vücuttan atılmasını sağlayan sistem hangisidir?",
        "options": [
          "Sindirim sistemi",
          "Boşaltım sistemi",
          "Dolaşım sistemi",
          "Sinir sistemi"
        ],
        "answer": 1,
        "explain": "Boşaltım sistemi; böbrekler, üreterler, mesane ve üretradan oluşur; idrar oluşturarak vücuttan atar."
      },
      {
        "level": "orta",
        "text": "Karaciğerin sindirim sistemindeki görevi nedir?",
        "options": [
          "Besinleri mekanik parçalamak",
          "Safra salgılayarak yağların sindirimini kolaylaştırmak",
          "Besinleri kana emmek",
          "Artık maddeleri dışarı atmak"
        ],
        "answer": 1,
        "explain": "Karaciğer, safra üretir ve safra kesesinde depolar; safra yağları küçük damlacıklara bölerek sindirimi kolaylaştırır."
      },
      {
        "level": "orta",
        "text": "Kan pıhtılaşmasında görev alan kan hücreleri hangisidir?",
        "options": [
          "Alyuvar",
          "Akyuvar",
          "Trombosit",
          "Plazma"
        ],
        "answer": 2,
        "explain": "Trombositler (pulcuklar), damar yaralandığında pıhtı oluşturarak kanın durmasını sağlar."
      },
      {
        "level": "orta",
        "text": "Midenin protein sindirimine katkısı nasıl gerçekleşir?",
        "options": [
          "Safra salgılayarak",
          "Pepsin enzimi ve hidroklorik asit salgılayarak",
          "Mekanik parçalama yaparak",
          "Sadece suyla seyrelterek"
        ],
        "answer": 1,
        "explain": "Mide, pepsin enzimiyle proteinleri parçalar; hidroklorik asit ortamı asitleştirerek enzimin çalışmasını sağlar."
      },
      {
        "level": "orta",
        "text": "Kas ve kemikleri birbirine bağlayan yapıya ne ad verilir?",
        "options": [
          "Tendon",
          "Ligament",
          "Kıkırdak",
          "Kemik iliği"
        ],
        "answer": 0,
        "explain": "Tendonlar, kasları kemiklere; ligamentler ise kemikleri birbirlerine bağlayan sağlam bağ dokusu yapılarıdır."
      },
      {
        "level": "orta",
        "text": "Karbondioksitin vücuttan atılmasını sağlayan sistem hangisidir?",
        "options": [
          "Boşaltım sistemi",
          "Sindirim sistemi",
          "Solunum sistemi",
          "Dolaşım sistemi"
        ],
        "answer": 2,
        "explain": "Hücrelerde üretilen CO₂ kana geçer, dolaşımla akciğerlere taşınır ve solunum sistemi aracılığıyla dışarı atılır."
      },
      {
        "level": "orta",
        "text": "Sinir sisteminin temel birimi olan hücreye ne ad verilir?",
        "options": [
          "Nöron",
          "Miyosit",
          "Kondrosit",
          "Eritrosit"
        ],
        "answer": 0,
        "explain": "Nöronlar (sinir hücreleri), elektrik sinyalleri ileterek beyin ile vücut arasında iletişimi sağlar."
      },
      {
        "level": "zor",
        "text": "Bir öğrencinin bacağına çivi batar ve bilinci açıkken anında acı hisseder. Bu olayda sinir sisteminin hangi bölümü öncelikle devreye girer?",
        "options": [
          "Merkezi sinir sistemi",
          "Çevresel sinir sistemi",
          "Otonom sinir sistemi",
          "Sadece beyin"
        ],
        "answer": 1,
        "explain": "Çevresel sinir sistemi vücuttan beyne uyarı iletir. Uyarı önce çevresel sinirler aracılığıyla omuriliğe ulaşır; refleks tepkisi omurilik düzeyinde gerçekleşir."
      },
      {
        "level": "zor",
        "text": "Kalp kasılırken oluşan basıncın atardamarlarda hissedilmesine ne denir ve nerede ölçülür?",
        "options": [
          "Nabız – Şah damarında",
          "Nabız – Bilek bölgesinde",
          "Tansiyon – Sadece kalpte",
          "Kan basıncı – Yalnızca bacakta"
        ],
        "answer": 1,
        "explain": "Nabız, kalbin her çarpmasıyla atardamarlarda oluşan ritmik genişlemedir; en kolay bilekte (radial atardamar) ölçülür."
      },
      {
        "level": "zor",
        "text": "Alyuvar, akyuvar ve trombositlerin üretildiği yer aşağıdakilerden hangisidir?",
        "options": [
          "Dalak",
          "Karaciğer",
          "Kemik iliği",
          "Lenf düğümleri"
        ],
        "answer": 2,
        "explain": "Kemik iliği kan hücrelerinin üretim merkezidir (hematopoez). Kırmızı kemik iliği, tüm kan hücrelerini üretir."
      }
    ],
    "Kuvvet ve Hareket": [
      {
        "level": "kolay",
        "text": "Kuvvetin birimi nedir?",
        "options": [
          "Joule",
          "Watt",
          "Newton",
          "Pascal"
        ],
        "answer": 2,
        "explain": "Kuvvetin SI birimi Newton'dur (N). Sir Isaac Newton'un onuruna verilmiştir."
      },
      {
        "level": "kolay",
        "text": "Bir cismin ağırlığı aşağıdakilerden hangisiyle ölçülür?",
        "options": [
          "Terazi",
          "Dinamometre",
          "Cetvel",
          "Kronometre"
        ],
        "answer": 1,
        "explain": "Dinamometre, kuvvet ölçme aletidir; ağırlık (yerçekimi kuvveti) dinamometreyle Newton cinsinden ölçülür."
      },
      {
        "level": "kolay",
        "text": "Birbirine zıt yönde ve eşit büyüklükte iki kuvvet etkisindeki cisim ne yapar?",
        "options": [
          "Hızlanır",
          "Yavaşlar",
          "Hareketsiz kalır veya sabit hızla hareket eder",
          "Döner"
        ],
        "answer": 2,
        "explain": "Dengelenen kuvvetler cisme net etki yapmaz; cisim hareketsizse öyle kalır, hareket ediyorsa sabit hızını korur."
      },
      {
        "level": "kolay",
        "text": "Sürtünme kuvveti hakkında aşağıdakilerden hangisi doğrudur?",
        "options": [
          "Her zaman harekete yardım eder",
          "Yüzeyler arasında oluşur ve hareketi engeller",
          "Yalnızca sıvılarda görülür",
          "Ağırlıkla doğrudan ilgisi yoktur"
        ],
        "answer": 1,
        "explain": "Sürtünme kuvveti, iki yüzey temas ettiğinde harekete zıt yönde oluşarak hareketi yavaşlatır."
      },
      {
        "level": "kolay",
        "text": "Dünyamızın bizi kendine doğru çektiği kuvvete ne denir?",
        "options": [
          "Sürtünme kuvveti",
          "Manyetik kuvvet",
          "Yerçekimi kuvveti",
          "Elektrostatik kuvvet"
        ],
        "answer": 2,
        "explain": "Yerçekimi kuvveti, Dünya'nın kütleçekimi nedeniyle nesneleri merkeze doğru çektiği kuvvettir."
      },
      {
        "level": "kolay",
        "text": "Aşağıdakilerden hangisi sürtünme kuvvetini AZALTIR?",
        "options": [
          "Yüzeyi pürüzlendirmek",
          "Yüzey alanını artırmak",
          "Yüzeyi yağlamak",
          "Nesnenin ağırlığını artırmak"
        ],
        "answer": 2,
        "explain": "Yağlama, iki yüzey arasına girerek temasın azalmasını sağlar ve sürtünme kuvvetini düşürür."
      },
      {
        "level": "orta",
        "text": "Bir cisim üzerine etkiyen net kuvvet sıfırdan farklı olursa cisim ne yapar?",
        "options": [
          "Hareketsiz kalır",
          "İvme kazanır (hızlanır veya yavaşlar)",
          "Sabit hızla hareket eder",
          "Döner"
        ],
        "answer": 1,
        "explain": "Newton'un 2. Yasasına göre net kuvvet sıfır değilse cisim ivme kazanır; yani hızı değişir."
      },
      {
        "level": "orta",
        "text": "Araç lastiklerine yiv (desen) açılmasının amacı nedir?",
        "options": [
          "Sürtünmeyi azaltmak",
          "Ağırlığı azaltmak",
          "Sürtünmeyi artırarak kavrayışı ve fren performansını iyileştirmek",
          "Hızı artırmak"
        ],
        "answer": 2,
        "explain": "Lastik yivleri ıslak yüzeylerde suyu uzaklaştırır ve sürtünmeyi artırır; bu güvenli frenleyiş sağlar."
      },
      {
        "level": "orta",
        "text": "Kütlesi 5 kg olan bir cisim 20 N net kuvvetle itiliyor. Cismin ivmesi kaç m/s²'dir? (F = m × a)",
        "options": [
          "2 m/s²",
          "4 m/s²",
          "10 m/s²",
          "100 m/s²"
        ],
        "answer": 1,
        "explain": "a = F/m = 20/5 = 4 m/s². Newton'un 2. Yasası: F = m × a formülüyle ivme hesaplanır."
      },
      {
        "level": "orta",
        "text": "Bir cismin kütlesi ile ağırlığı arasındaki fark nedir?",
        "options": [
          "İkisi aynı kavramdır",
          "Kütle her yerde değişirken ağırlık sabittir",
          "Kütle madde miktarını, ağırlık ise yerçekimi kuvvetini ifade eder",
          "Ağırlık madde miktarını gösterir"
        ],
        "answer": 2,
        "explain": "Kütle (kg) madde miktarı olup evrenin her yerinde aynıdır. Ağırlık (N) = kütle × yerçekimi ivmesi; konuma göre değişir."
      },
      {
        "level": "orta",
        "text": "Bir kuş tüyü ile çelik bilyenin vakumda aynı yükseklikten bırakıldığında hangisi önce düşer?",
        "options": [
          "Çelik bilye",
          "Kuş tüyü",
          "İkisi aynı anda düşer",
          "Hiçbiri düşmez"
        ],
        "answer": 2,
        "explain": "Vakumda hava direnci yoktur; her cisim yerçekimi etkisiyle aynı ivmeyle (g ≈ 9,8 m/s²) düşer."
      },
      {
        "level": "orta",
        "text": "Mıknatısın demir cisme uyguladığı kuvvet hangi tür kuvvettir?",
        "options": [
          "Yerçekimi kuvveti",
          "Sürtünme kuvveti",
          "Manyetik kuvvet",
          "Elektrostatik kuvvet"
        ],
        "answer": 2,
        "explain": "Manyetik kuvvet, mıknatıslar ve manyetik malzemeler arasında temas olmadan etki eden bir kuvvettir."
      },
      {
        "level": "zor",
        "text": "Düz yolda sabit hızla giden bir araçta motor kuvveti ile sürtünme kuvveti arasındaki ilişki nedir?",
        "options": [
          "Motor kuvveti daha büyüktür",
          "Sürtünme kuvveti daha büyüktür",
          "İkisi birbirine eşittir (dengelenmiştir)",
          "Hiçbir kuvvet yoktur"
        ],
        "answer": 2,
        "explain": "Sabit hız, net kuvvetin sıfır olduğunu gösterir. Motor kuvveti = sürtünme kuvveti; kuvvetler dengelenmiştir."
      },
      {
        "level": "zor",
        "text": "Bir cisim üzerine 30 N sağa ve 20 N sola kuvvet uygulanıyor. Net kuvvetin yönü ve büyüklüğü nedir?",
        "options": [
          "10 N sola",
          "10 N sağa",
          "50 N sağa",
          "50 N sola"
        ],
        "answer": 1,
        "explain": "Zıt yönlü kuvvetlerde net kuvvet = 30 - 20 = 10 N; büyük kuvvetin yönüne (sağa) doğrudur."
      },
      {
        "level": "zor",
        "text": "Yay dinamometresiyle ölçüm yapılırken cisim suda iken ve havadayken ölçüm değerleri farklıdır. Bu durumun nedeni nedir?",
        "options": [
          "Cismin kütlesi değişmiştir",
          "Suyun cismi yukarı iten kaldırma kuvveti ağırlığı azaltır",
          "Dinamometre hatalı çalışır",
          "Yerçekimi suda farklıdır"
        ],
        "answer": 1,
        "explain": "Archimedes ilkesi: Sıvıya daldırılan cisme, sıvı tarafından yukarı yönlü kaldırma kuvveti uygulanır; bu da görünür ağırlığı azaltır."
      }
    ],
    "Madde ve Değişim": [
      {
        "level": "kolay",
        "text": "Maddenin katı, sıvı ve gaz halleri arasındaki temel fark nedir?",
        "options": [
          "Renk",
          "Tanecikler arası mesafe ve diziliş",
          "Ağırlık",
          "Koku"
        ],
        "answer": 1,
        "explain": "Maddenin hallerini belirleyen, taneciklerin birbirine olan uzaklığı ve düzenidir; katıda sıkı, gaz halinde ise çok uzaktır."
      },
      {
        "level": "kolay",
        "text": "Aşağıdakilerden hangisi fiziksel değişime örnektir?",
        "options": [
          "Demirin paslanması",
          "Kağıdın yanması",
          "Buzun erimesi",
          "Sütün ekşimesi"
        ],
        "answer": 2,
        "explain": "Buz erimesinde yalnızca hal değişir, yeni bir madde oluşmaz; dolayısıyla fiziksel değişimdir."
      },
      {
        "level": "kolay",
        "text": "Aşağıdakilerden hangisi kimyasal değişime örnektir?",
        "options": [
          "Şekerin suda çözülmesi",
          "Camın kırılması",
          "Suyun buharlaşması",
          "Odunun yanması"
        ],
        "answer": 3,
        "explain": "Odun yanınca karbondioksit ve su gibi yeni maddeler oluşur; bu kimyasal değişimin göstergesidir."
      },
      {
        "level": "kolay",
        "text": "İki veya daha fazla maddenin kimyasal özelliklerini koruyarak bir araya gelmesiyle oluşan maddeye ne denir?",
        "options": [
          "Bileşik",
          "Element",
          "Karışım",
          "Çözelti"
        ],
        "answer": 2,
        "explain": "Karışımlarda bileşenler kimyasal özelliklerini yitirmez ve fiziksel yöntemlerle ayrılabilir."
      },
      {
        "level": "kolay",
        "text": "Saf su hangi tür maddedir?",
        "options": [
          "Element",
          "Bileşik",
          "Homojen karışım",
          "Heterojen karışım"
        ],
        "answer": 1,
        "explain": "Su (H₂O), hidrojen ve oksijen elementlerinin kimyasal olarak birleşmesiyle oluşan bir bileşiktir."
      },
      {
        "level": "kolay",
        "text": "Hava aşağıdakilerden hangisine örnektir?",
        "options": [
          "Saf madde",
          "Element",
          "Bileşik",
          "Homojen karışım"
        ],
        "answer": 3,
        "explain": "Hava, azot, oksijen ve diğer gazların homojen karışımıdır; her yerde aynı bileşimde görünür."
      },
      {
        "level": "orta",
        "text": "Aşağıdaki değişimlerden hangisi kimyasal değişimin göstergesi değildir?",
        "options": [
          "Gaz çıkışı",
          "Renk değişimi",
          "Hal değişimi",
          "Isı yayılması"
        ],
        "answer": 2,
        "explain": "Hal değişimi (erime, donma, buharlaşma) fiziksel değişimdir; yeni madde oluşmaz. Diğerleri kimyasal değişim belirtisidir."
      },
      {
        "level": "orta",
        "text": "Şeker suda çözündüğünde oluşan karışım hangi türdür?",
        "options": [
          "Heterojen karışım",
          "Element",
          "Homojen karışım (çözelti)",
          "Bileşik"
        ],
        "answer": 2,
        "explain": "Şeker-su karışımı her noktada aynı bileşimdedir; bu nedenle homojen karışım (çözelti) olarak sınıflandırılır."
      },
      {
        "level": "orta",
        "text": "Demir tozu ve kum karışımını ayırmak için hangi yöntem kullanılır?",
        "options": [
          "Damıtma",
          "Süzme",
          "Mıknatısla ayırma",
          "Kristallendirme"
        ],
        "answer": 2,
        "explain": "Demir manyetiktir; mıknatıs tutulduğunda demir tozu çekilir, kum karışımda kalır."
      },
      {
        "level": "orta",
        "text": "Özkütle (yoğunluk) hangi formülle hesaplanır?",
        "options": [
          "d = m + V",
          "d = m × V",
          "d = m / V",
          "d = V / m"
        ],
        "answer": 2,
        "explain": "Özkütle (d) = kütle (m) / hacim (V) formülüyle hesaplanır; birimi genellikle g/cm³ veya kg/m³'tür."
      },
      {
        "level": "orta",
        "text": "400 g kütlesindeki bir maddenin hacmi 200 cm³ ise özkütlesi kaç g/cm³'tür?",
        "options": [
          "0,5",
          "1",
          "2",
          "800"
        ],
        "answer": 2,
        "explain": "d = m/V = 400/200 = 2 g/cm³. Bu değer, maddenin alüminyum (2,7 g/cm³) sınırına yakın olduğunu gösterir."
      },
      {
        "level": "orta",
        "text": "Tuzlu su karışımından tuzu geri elde etmek için hangi yöntem kullanılır?",
        "options": [
          "Mıknatısla ayırma",
          "Süzme",
          "Buharlaştırma",
          "Yoğunluk farkı"
        ],
        "answer": 2,
        "explain": "Su buharlaştırıldığında tuz geride kristaller halinde kalır; bu fiziksel bir ayırma yöntemidir."
      },
      {
        "level": "zor",
        "text": "Özkütlesi 0,8 g/cm³ olan bir madde suya (d = 1 g/cm³) atılırsa ne olur?",
        "options": [
          "Batar",
          "Yüzer",
          "Çözülür",
          "Kimyasal değişim geçirir"
        ],
        "answer": 1,
        "explain": "Özkütlesi sudan küçük olan maddeler su üzerinde yüzer. d_madde < d_su → yüzer."
      },
      {
        "level": "zor",
        "text": "Kütlesi 90 g, hacmi 30 cm³ olan bir maddenin özkütlesi 3 g/cm³'tür. Bu madde suya (d=1) ve zeytinyağına (d=0,9) konulursa ne olur?",
        "options": [
          "Her ikisinde de yüzer",
          "Her ikisinde de batar",
          "Suda batar, zeytinyağında yüzer",
          "Suda yüzer, zeytinyağında batar"
        ],
        "answer": 1,
        "explain": "d_madde = 3 g/cm³ > d_su = 1 g/cm³ ve > d_zeytinyağı = 0,9 g/cm³. Her iki sıvıda da batar."
      },
      {
        "level": "zor",
        "text": "Bir madde fiziksel değişime uğrarsa kütlesi nasıl değişir?",
        "options": [
          "Artar",
          "Azalır",
          "Değişmez",
          "Önce artar sonra azalır"
        ],
        "answer": 2,
        "explain": "Kütlenin korunumu yasasına göre fiziksel değişimlerde (ve kimyasal değişimlerde) toplam kütle değişmez; yalnızca biçim ya da hal değişir."
      }
    ],
    "Işık ve Ses": [
      {
        "level": "kolay",
        "text": "Işık düz bir yüzeye çarptığında geri dönmesine ne denir?",
        "options": [
          "Kırılma",
          "Yansıma",
          "Soğurma",
          "Saçılma"
        ],
        "answer": 1,
        "explain": "Yansıma, ışığın bir yüzeye çarparak geri dönmesi olayıdır. Düzgün yüzeylerde düzenli yansıma gerçekleşir."
      },
      {
        "level": "kolay",
        "text": "Sesin yayılabilmesi için ne gereklidir?",
        "options": [
          "Işık",
          "Maddesel bir ortam",
          "Mıknatıs",
          "Isı"
        ],
        "answer": 1,
        "explain": "Ses, titreşimin bir madde (katı, sıvı, gaz) aracılığıyla iletilmesiyle yayılır. Vakumda ses yayılamaz."
      },
      {
        "level": "kolay",
        "text": "Aşağıdaki ortamların hangisinde ses en hızlı yayılır?",
        "options": [
          "Hava",
          "Su",
          "Demir",
          "Vakum"
        ],
        "answer": 2,
        "explain": "Ses, katılarda daha hızlı yayılır çünkü tanecikler birbirine yakındır ve titreşim daha çabuk iletilir. Demirde ses ~5000 m/s hızla yayılır."
      },
      {
        "level": "kolay",
        "text": "Güneş ışığı prizmadan geçirildiğinde ne oluşur?",
        "options": [
          "Karanlık oluşur",
          "Gökkuşağı renkleri ortaya çıkar",
          "Işık kaybolur",
          "Ses dalgaları oluşur"
        ],
        "answer": 1,
        "explain": "Beyaz ışık prizmadan geçerken kırılarak spektrumuna (kırmızı, turuncu, sarı, yeşil, mavi, mor) ayrılır."
      },
      {
        "level": "kolay",
        "text": "Sesin şiddetinin birimi nedir?",
        "options": [
          "Hz",
          "m/s",
          "dB (desibel)",
          "Newton"
        ],
        "answer": 2,
        "explain": "Sesin şiddeti desibel (dB) ile ölçülür. Frekans ise Hz (Hertz) birimiyle ifade edilir."
      },
      {
        "level": "kolay",
        "text": "Yansıma yasasına göre gelen ışın ile yüzeyin normali arasındaki açı (gelme açısı) ile yansıyan ışının yaptığı açı (yansıma açısı) arasındaki ilişki nedir?",
        "options": [
          "Yansıma açısı gelme açısından büyüktür",
          "Yansıma açısı gelme açısına eşittir",
          "Yansıma açısı gelme açısından küçüktür",
          "Aralarında sabit 90° fark vardır"
        ],
        "answer": 1,
        "explain": "Yansıma yasası: Gelme açısı = Yansıma açısı. Bu kural tüm yüzey türleri için geçerlidir."
      },
      {
        "level": "orta",
        "text": "Işığın bir ortamdan başka bir ortama geçişinde hızının değişmesiyle doğrultu değiştirmesine ne denir?",
        "options": [
          "Yansıma",
          "Kırılma",
          "Soğurma",
          "Dağılma"
        ],
        "answer": 1,
        "explain": "Kırılma, ışığın farklı yoğunluktaki ortamlar arasında geçişte hızının ve doğrultusunun değişmesidir."
      },
      {
        "level": "orta",
        "text": "Sesin bir engele çarparak geri dönmesine ne denir ve buna günlük hayattan bir örnek veriniz.",
        "options": [
          "Kırılma – camdan geçen ses",
          "Yankı – dağlarda sesin geri dönmesi",
          "Titreşim – tel çalgılar",
          "Soğurma – perde kullanan odalar"
        ],
        "answer": 1,
        "explain": "Yankı (eko), sesin sert bir yüzeyden yansıyarak kaynağa geri dönmesidir. Dağlarda veya büyük binalarda duyulur."
      },
      {
        "level": "orta",
        "text": "Titreşim sayısının artması sesin hangi özelliğini değiştirir?",
        "options": [
          "Şiddetini azaltır",
          "Tizliğini (perdesini) artırır",
          "Hızını yavaşlatır",
          "Tınısını değiştirir"
        ],
        "answer": 1,
        "explain": "Frekans arttıkça ses daha tiz (ince) duyulur. İnsan kulağı 20 Hz – 20.000 Hz arasını duyabilir."
      },
      {
        "level": "orta",
        "text": "Opak, saydam ve yarı saydam cisimler arasındaki fark nedir?",
        "options": [
          "Saydam cisimler ışığı yansıtır; opak geçirir",
          "Opak cisimler ışığı geçirmez; saydam tamamen geçirir",
          "Yarı saydam ışığı geçirmez",
          "Hepsinde ışık aynı davranışı gösterir"
        ],
        "answer": 1,
        "explain": "Opak cisimler ışığı geçirmez ve gölge oluşturur. Saydam cisimler (cam) ışığı tam geçirir. Yarı saydam cisimler (buzlu cam) ise kısmen geçirir."
      },
      {
        "level": "orta",
        "text": "Güneş tutulması hangi ışık olayıyla açıklanır?",
        "options": [
          "Kırılma",
          "Yansıma",
          "Gölge oluşumu",
          "Dağılma"
        ],
        "answer": 2,
        "explain": "Ay, Dünya ile Güneş arasına girdiğinde Dünya'nın bir bölümüne Güneş ışığı ulaşamaz; bu bölgede gölge (güneş tutulması) oluşur."
      },
      {
        "level": "orta",
        "text": "Sesin boşlukta (vakumda) yayılamamasının nedeni nedir?",
        "options": [
          "Işıkla çarpışır",
          "Tanecik olmadığından titreşim iletilemez",
          "Çok hızlı yayılır",
          "Çok düşük frekanslıdır"
        ],
        "answer": 1,
        "explain": "Ses mekanik bir dalgadır ve yayılmak için maddesel ortam gerektirir. Vakumda tanecik yoktur; titreşim iletilemez."
      },
      {
        "level": "zor",
        "text": "Işığın su içindeki hızı havaya göre nasıldır ve bu durum kırılmayı nasıl etkiler?",
        "options": [
          "Suda daha hızlı; kırılma olmaz",
          "Suda daha yavaş; suda normale yaklaşır",
          "Suda daha hızlı; suda normalden uzaklaşır",
          "Hız değişmez; kırılma yok"
        ],
        "answer": 1,
        "explain": "Işık yoğun ortamda (su) yavaşlar. Havadan suya geçerken normale yaklaşır; sudan havaya geçerken normalden uzaklaşır."
      },
      {
        "level": "zor",
        "text": "Keman ve flüt aynı notayı çalıyor. Her iki sesi de aynı kişi duyuyor. Hangi ses özelliği farklıdır?",
        "options": [
          "Frekans",
          "Şiddet",
          "Tınısı (tonu)",
          "Hız"
        ],
        "answer": 2,
        "explain": "Aynı nota aynı frekans demektir. Şiddet de benzer ayarlanabilir. Ancak enstrümanın yapısından kaynaklanan harmonikler tınıyı (rengi) farklı kılar."
      },
      {
        "level": "zor",
        "text": "Dalgıç balık tutmak için mızrağını nereye nişan almalıdır? (ışığın kırılması dikkate alınmalıdır)",
        "options": [
          "Gördüğü yere",
          "Gördüğünün biraz altına",
          "Gördüğünün biraz üstüne",
          "Gördüğünün tam karşısına"
        ],
        "answer": 1,
        "explain": "Işık sudan havaya çıkarken normalden uzaklaşır; bu yüzden balık göründüğünden daha yukarıda görünür. Dalgıç gerçek konumu olan biraz daha aşağıyı hedeflemelidir."
      }
    ],
    "Yaşamımızdaki Elektrik": [
      {
        "level": "kolay",
        "text": "Basit bir elektrik devresinin temel elemanları hangileridir?",
        "options": [
          "Yalnızca pil ve ampul",
          "Pil, iletken tel, anahtar ve ampul",
          "Yalnızca tel ve anahtar",
          "Pil ve mıknatıs"
        ],
        "answer": 1,
        "explain": "Basit bir devre: enerji kaynağı (pil), iletken teller, tüketici (ampul) ve anahtardan oluşur."
      },
      {
        "level": "kolay",
        "text": "Elektriği ileten maddelere ne denir? Bir örnek veriniz.",
        "options": [
          "Yalıtkan – plastik",
          "İletken – bakır tel",
          "Yalıtkan – cam",
          "İletken – tahta"
        ],
        "answer": 1,
        "explain": "İletkenler elektriği kolayca geçirir. Bakır, alüminyum ve çelik metaller iyi iletkendir."
      },
      {
        "level": "kolay",
        "text": "Elektriği geçirmeyen maddelere ne denir? Bir örnek veriniz.",
        "options": [
          "İletken – demir",
          "Yalıtkan – plastik",
          "Yarı iletken – silikon",
          "İletken – grafit"
        ],
        "answer": 1,
        "explain": "Yalıtkanlar elektriği geçirmez. Plastik, cam, kauçuk ve tahta yalıtkan maddelerdir."
      },
      {
        "level": "kolay",
        "text": "Elektrik devresinde anahtar açıkken (kesilince) ampule ne olur?",
        "options": [
          "Daha parlak yanar",
          "Söner",
          "Aynı şekilde yanar",
          "Titrer"
        ],
        "answer": 1,
        "explain": "Açık devre: Anahtar devreyi kesince akım akamaz; ampule elektrik gitmez ve söner."
      },
      {
        "level": "kolay",
        "text": "Evlerdeki elektrik priz ve kablolarında hangi metal yaygın olarak kullanılır?",
        "options": [
          "Demir",
          "Ahşap",
          "Bakır",
          "Plastik"
        ],
        "answer": 2,
        "explain": "Bakır, iyi iletkenliği ve sünekliği nedeniyle elektrik kablolarında en yaygın kullanılan metaldir."
      },
      {
        "level": "kolay",
        "text": "Elektrik çarpmalarına karşı tehlikeli durumları önlemek için ne yapılmalıdır?",
        "options": [
          "Islak elle cihaza dokunulabilir",
          "Kablolar açık bırakılabilir",
          "Priz ve anahtarlar izole (yalıtılmış) malzeme ile kaplanmalıdır",
          "Daha fazla ampul kullanılmalıdır"
        ],
        "answer": 2,
        "explain": "Yalıtkan malzemeler (plastik, kauçuk) akımı iletemedikleri için elektrik çarpmalarına karşı koruma sağlar."
      },
      {
        "level": "orta",
        "text": "İki ampulün seri bağlı olduğu bir devreden bir ampul sökülürse ne olur?",
        "options": [
          "Diğer ampul daha parlak yanar",
          "Diğer ampul söner",
          "Diğer ampul aynı şekilde yanar",
          "Pil biter"
        ],
        "answer": 1,
        "explain": "Seri devrede akım tek yoldan geçer; bir ampul çıkarılınca devre açılır ve diğer ampul de söner."
      },
      {
        "level": "orta",
        "text": "İki ampulün paralel bağlı olduğu devreden bir ampul sökülürse ne olur?",
        "options": [
          "Diğer ampul söner",
          "Diğer ampul daha parlak yanar",
          "Diğer ampul aynı parlaklıkta yanmaya devam eder",
          "Devre bozulur"
        ],
        "answer": 2,
        "explain": "Paralel devrede her kol bağımsızdır; bir ampulün sökülmesi diğer kolun çalışmasını etkilemez."
      },
      {
        "level": "orta",
        "text": "Evlerdeki elektrik tesisatı neden paralel bağlıdır?",
        "options": [
          "Daha az enerji harcar",
          "Her cihaz bağımsız çalışır, biri bozulunca diğerleri etkilenmez",
          "Kurulumu daha kolaydır",
          "Daha az kablo kullanır"
        ],
        "answer": 1,
        "explain": "Paralel bağlantıda her cihaz aynı gerilimi alır ve bağımsız çalışır; bu evlerdeki pratik kullanım açısından idealdir."
      },
      {
        "level": "orta",
        "text": "Sigorta ve kaçak akım rölesi ne işe yarar?",
        "options": [
          "Voltajı artırır",
          "Aşırı akımdan ve kaçak akımdan korur, devre keserek yangın ve çarpma riskini önler",
          "Pillerin ömrünü uzatır",
          "Ampullerin parlaklığını artırır"
        ],
        "answer": 1,
        "explain": "Sigorta aşırı akımda erir/açılır. Kaçak akım rölesi anlık kaçak akımı algılayarak devreyi keser; yangın ve çarpmayı önler."
      },
      {
        "level": "orta",
        "text": "Statik elektrik nedir? Günlük hayatta nasıl gözlemlenir?",
        "options": [
          "Hareket eden yüklerdir – kablo içinde akar",
          "Hareketsiz elektrik yüküdür – plastik cetvel kağıdı çeker",
          "Manyetik bir kuvvettir",
          "Pillerin sağladığı enerjidir"
        ],
        "answer": 1,
        "explain": "Statik elektrik, yüzeylerde biriken hareketsiz yüklerdir. Plastik cetveli saçta sürttükten sonra kağıt parçasına yaklaştırınca çekme gözlemlenir."
      },
      {
        "level": "orta",
        "text": "LED ampuller ile akkor flamanlı ampuller kıyaslandığında LED'lerin avantajı nedir?",
        "options": [
          "Daha pahalıdır",
          "Daha fazla ısı üretir",
          "Çok daha az enerji tüketir ve uzun ömürlüdür",
          "Daha az ışık verir"
        ],
        "answer": 2,
        "explain": "LED'ler, enerjinin büyük bölümünü ışığa dönüştürür; akkor ampuller ise enerjinin %90'ını ısı olarak yitirir."
      },
      {
        "level": "zor",
        "text": "3 özdeş ampul ve 1 pil bulunmaktadır. İki ampul paralel, bu grup ile üçüncü ampul seri bağlanıyor. Üçüncü ampul ile paralel gruptaki tek bir ampul karşılaştırıldığında hangisi daha parlak yanar?",
        "options": [
          "Seri bağlı (3.) ampul daha parlak",
          "Paralel gruptaki ampul daha parlak",
          "Her ikisi de eşit parlaklıkta",
          "Hiçbiri yanmaz"
        ],
        "answer": 0,
        "explain": "Seri bağlı ampul devrenin tüm akımını taşır. Paralel grup bu akımı ikiye böler; her paralel ampul yarı akım alır. Dolayısıyla seri ampul daha parlak yanar."
      },
      {
        "level": "zor",
        "text": "Elektrik enerjisi tasarrufu için aşağıdakilerden hangisi yanlış bir uygulamadır?",
        "options": [
          "Kullanılmayan odaların ışığını söndürmek",
          "Enerji verimli cihazlar tercih etmek",
          "Cihazları bekleme modunda bırakmak",
          "Gün ışığından maksimum yararlanmak"
        ],
        "answer": 2,
        "explain": "Bekleme (stand-by) modu sürekli enerji tüketir. Cihazları tamamen kapatmak veya fişi çekmek enerji tasarrufu sağlar."
      },
      {
        "level": "zor",
        "text": "Kısa devre neden tehlikelidir?",
        "options": [
          "Akımı azaltır",
          "Direnci artırır",
          "Devrenin direnci neredeyse sıfır olduğundan çok yüksek akım akar; ısınma ve yangın riski doğar",
          "Ampulleri daha parlak yakar"
        ],
        "answer": 2,
        "explain": "Kısa devreden R ≈ 0 ve I = U/R formülüne göre akım çok büyük değerlere ulaşır; kablolar aşırı ısınır ve yangın çıkabilir."
      }
    ],
    "Canlılar ve Yaşam Ortamları": [
      {
        "level": "kolay",
        "text": "Belirli bir bölgede yaşayan tüm canlılar ile bunların yaşadığı cansız ortamın birlikte oluşturduğu sisteme ne denir?",
        "options": [
          "Popülasyon",
          "Ekosistem",
          "Biyom",
          "Habitat"
        ],
        "answer": 1,
        "explain": "Ekosistem; üreticiler, tüketiciler, ayrıştırıcılar ve bunların cansız çevrelerinden oluşan bir sistemdir."
      },
      {
        "level": "kolay",
        "text": "Besin zincirinde enerji transferi hangi yönde gerçekleşir?",
        "options": [
          "Tüketicilerden üreticilere",
          "Üreticilerden tüketicilere",
          "Ayrıştırıcılardan üreticilere",
          "Rastgele"
        ],
        "answer": 1,
        "explain": "Enerji, güneşten üreticilere (bitkiler) geçer; oradan birincil tüketiciye, ikincil tüketiciye sırasıyla aktarılır."
      },
      {
        "level": "kolay",
        "text": "Fotosentez yaparak besin üreten canlılara ne ad verilir?",
        "options": [
          "Tüketici",
          "Ayrıştırıcı",
          "Üretici",
          "Parazit"
        ],
        "answer": 2,
        "explain": "Bitkiler, algler ve bazı bakteriler klorofil yardımıyla fotosentez yaparak güneş enerjisini besin enerjisine dönüştürür."
      },
      {
        "level": "kolay",
        "text": "Ölü organik maddeleri parçalayarak madde döngüsüne katkıda bulunan canlılar hangileridir?",
        "options": [
          "Üreticiler",
          "Birincil tüketiciler",
          "Ayrıştırıcılar (mantar ve bazı bakteriler)",
          "İkincil tüketiciler"
        ],
        "answer": 2,
        "explain": "Ayrıştırıcılar (mantar, bazı bakteriler) ölü organik maddeleri minerallere dönüştürerek toprağa iade eder."
      },
      {
        "level": "kolay",
        "text": "Habitat ne anlama gelir?",
        "options": [
          "Bir canlının besin zincirindeki yeri",
          "Bir canlının doğal yaşam ortamı",
          "Ekosistemde canlıların toplamı",
          "Bir bölgedeki tüm türler"
        ],
        "answer": 1,
        "explain": "Habitat, bir canlının yaşadığı ve ihtiyaçlarını karşıladığı doğal ortamdır. Örneğin balık için habitat su, kartal için dağlık ormanlık alandır."
      },
      {
        "level": "kolay",
        "text": "İnsan faaliyetlerinin biyoçeşitlilik üzerindeki olumsuz etkileri arasında hangisi yer almaz?",
        "options": [
          "Orman yangınları",
          "Doğal alan koruma",
          "Tarım ilaçları kullanımı",
          "Yapılaşma ve habitat kaybı"
        ],
        "answer": 1,
        "explain": "Doğal alan koruma (millî parklar, rezervler) biyoçeşitliliği destekler; diğerleri zarar verir."
      },
      {
        "level": "orta",
        "text": "Ot → Tavşan → Tilki → Kartal besin zincirinde tilki popülasyonu aniden azalırsa ne beklenir?",
        "options": [
          "Tavşan azalır, kartal artar",
          "Tavşan artar, kartal azalır",
          "Ot azalır, tavşan artar",
          "Kartal artar, ot azalır"
        ],
        "answer": 1,
        "explain": "Tilki azalınca tavşan üzerindeki baskı azalır; tavşan artar. Tilkiyle beslenen kartal ise besin bulmakta güçlenir, azalır."
      },
      {
        "level": "orta",
        "text": "Karasal ve sucul ekosistemler arasındaki temel fark nedir?",
        "options": [
          "Güneş enerjisi kullanımı",
          "Yaşam ortamının kara ya da su olması",
          "Üreticilerin olup olmaması",
          "Enerji akışının yönü"
        ],
        "answer": 1,
        "explain": "Karasal ekosistemlerde canlılar kara üzerinde, sucul ekosistemlerde ise tatlı veya tuzlu su içinde yaşar."
      },
      {
        "level": "orta",
        "text": "Mutualizm (karşılıklı yarar) ilişkisine örnek hangisidir?",
        "options": [
          "Aslan ve avladığı zebra",
          "Arı ve çiçek (tozlaşma + nektar)",
          "Parazit solucan ve konakçı",
          "Köpekbalığı ve vantuz balığı (yalnızca vantuz balığı yarar görür)"
        ],
        "answer": 1,
        "explain": "Arı nektar alırken çiçeğin tozlaşmasına katkıda bulunur; her iki taraf da yararlanır → Mutualizm."
      },
      {
        "level": "orta",
        "text": "Küresel iklim değişikliğinin ekosistemlere etkilerinden biri hangisidir?",
        "options": [
          "Biyoçeşitlilik artar",
          "Türlerin habitatları değişir ve bazıları yok olabilir",
          "Besin zincirleri daha güçlenir",
          "Ayrıştırıcılar çalışmaz hale gelir"
        ],
        "answer": 1,
        "explain": "İklim değişikliği sıcaklık, yağış ve mevsim düzenini bozar; türlerin göç etmesine ya da habitatlarını kaybetmesine neden olabilir."
      },
      {
        "level": "orta",
        "text": "Yabancı (istilacı) türlerin bir ekosisteme sokulması neden tehlikelidir?",
        "options": [
          "Ekosistemdeki biyoçeşitliliği artırır",
          "Yerli türlerle rekabet ederek onların azalmasına yol açar",
          "Besin zincirini güçlendirir",
          "Ayrıştırıcıların görevini kolaylaştırır"
        ],
        "answer": 1,
        "explain": "İstilacı türlerin yerli predatörü yoktur; hızla çoğalır ve besin ile yaşam alanı için yerli türlerle rekabet ederek onların yok olmasına neden olabilir."
      },
      {
        "level": "orta",
        "text": "Madde döngüsünde (karbon döngüsü) bitkiler hangi rolü üstlenir?",
        "options": [
          "Sadece CO₂ üretirler",
          "Fotosentezle CO₂'yi alıp organik madde üretirler",
          "Toprağa mineral kazandırırlar",
          "Oksijeni parçalarlar"
        ],
        "answer": 1,
        "explain": "Bitkiler fotosentezde atmosferden CO₂ alır ve organik bileşik (besin) üretir; böylece karbon döngüsünün temel halkasını oluştururlar."
      },
      {
        "level": "zor",
        "text": "Bir ekosistemde üretici bitkiler tamamen yok edilirse en uzun süre hayatta kalabilecek grup hangisidir?",
        "options": [
          "Birincil tüketiciler",
          "İkincil tüketiciler",
          "Ayrıştırıcılar",
          "Üst tüketiciler (kartallar)"
        ],
        "answer": 2,
        "explain": "Ayrıştırıcılar (mantar, bakteriler) organik ölü maddeyi parçalar. Üreticiler yok olsa bile bir süre biriken ölü organik maddelerle yaşamlarını sürdürebilirler."
      },
      {
        "level": "zor",
        "text": "Bir besin zincirinde enerji bir basamaktan diğerine aktarılırken yaklaşık ne kadarı kaybolur?",
        "options": [
          "Yaklaşık %10 kaybolur",
          "Yaklaşık %90 kaybolur, %10 aktarılır",
          "Hiç kayıp olmaz",
          "Tümü aktarılır"
        ],
        "answer": 1,
        "explain": "Enerji akışında her basamakta enerjinin yaklaşık %90'ı ısı ve metabolizma için harcanır; yalnızca %10'u bir üst basamağa aktarılır."
      },
      {
        "level": "zor",
        "text": "Tarım ilaçları (pestisitler) besin zincirine girdiğinde hangi olumsuz etki ortaya çıkabilir?",
        "options": [
          "Yalnızca zararlı böcekleri etkiler",
          "Biyolojik birikim: Üst tüketicilerde konsantrasyon artarak zehir miktarı tehlikeli düzeye ulaşır",
          "Ekosistemi güçlendirir",
          "Tüm tüketiciler eşit miktarda etkilenir"
        ],
        "answer": 1,
        "explain": "Biyolojik birikim: Pestisit her basamakta birikir. Kartal gibi üst tüketicilerde konsantrasyon en yüksek seviyeye ulaşır ve yaşamsal tehdit oluşturur."
      }
    ],
    "Sürdürülebilir Yaşam ve Geri Dönüşüm": [
          {
                "level": "kolay",
                "text": "Geri dönüşüm ne anlama gelir?",
                "options": [
                      "Kullanılmış malzemeleri çöpe atmak",
                      "Atık malzemelerin yeniden işlenerek yeni ürünlere dönüştürülmesi",
                      "Her gün yeni ürün satın almak",
                      "Malzemeleri depolamak"
                ],
                "answer": 1,
                "explain": "Geri dönüşüm; kâğıt, cam, plastik, metal gibi atıkların toplanıp fabrikada işlenerek yeniden kullanılabilir hale getirilmesidir."
          },
          {
                "level": "kolay",
                "text": "Aşağıdaki renkli çöp kutularından hangisine kâğıt ve karton atıklar atılır?",
                "options": [
                      "Mavi kutu",
                      "Sarı kutu",
                      "Yeşil kutu",
                      "Kırmızı kutu"
                ],
                "answer": 0,
                "explain": "Türkiye'de mavi renkli kumbaralar kâğıt ve karton atıkların geri dönüşümü için kullanılır."
          },
          {
                "level": "kolay",
                "text": "Sürdürülebilir yaşam için aşağıdakilerden hangisi doğru bir davranıştır?",
                "options": [
                      "Her gün tek kullanımlık plastik bardak kullanmak",
                      "Suyu gereksiz yere açık bırakmak",
                      "Market alışverişine bez çanta götürmek",
                      "Elektronik cihazları bekleme modunda bırakmak"
                ],
                "answer": 2,
                "explain": "Bez çanta, her seferinde yeni plastik poşet kullanımını önler ve plastik atık miktarını azaltır."
          },
          {
                "level": "kolay",
                "text": "Hangi madde geri dönüştürülerek en fazla enerji tasarrufu sağlar?",
                "options": [
                      "Cam",
                      "Kâğıt",
                      "Alüminyum (teneke kutu)",
                      "Plastik"
                ],
                "answer": 2,
                "explain": "Alüminyum geri dönüşümü, sıfırdan üretimle karşılaştırıldığında yaklaşık %95 enerji tasarrufu sağlar."
          },
          {
                "level": "kolay",
                "text": "3R (Üç R) kuralında hangi kavramlar yer alır?",
                "options": [
                      "Reduce – Reuse – Recycle (Azalt – Yeniden Kullan – Geri Dönüştür)",
                      "Read – Run – Rest",
                      "Repair – Remove – Replace",
                      "Refill – Refuse – Release"
                ],
                "answer": 0,
                "explain": "3R: Azalt (kullanımı azalt), Yeniden Kullan (ürünü tekrar kullan), Geri Dönüştür (atığı ham maddeye çevir). Bu hiyerarşi en önemli sıralamayı gösterir."
          },
          {
                "level": "kolay",
                "text": "Hangi enerji kaynağı yenilenebilir ve çevre dostudur?",
                "options": [
                      "Kömür",
                      "Doğal gaz",
                      "Güneş enerjisi",
                      "Petrol"
                ],
                "answer": 2,
                "explain": "Güneş enerjisi tükenmez, sera gazı salımı yok denecek kadar azdır ve sürdürülebilir yaşamın temel enerji kaynaklarından biridir."
          },
          {
                "level": "orta",
                "text": "Bir cam şişenin doğada kendiliğinden parçalanması yaklaşık kaç yıl alır?",
                "options": [
                      "5 yıl",
                      "50 yıl",
                      "1.000 yıl",
                      "Hiçbir zaman parçalanmaz"
                ],
                "answer": 2,
                "explain": "Cam çok uzun süre bozunmaz; doğada parçalanması 1.000 yıla kadar çıkabilir. Bu nedenle cam geri dönüşümü kritik önem taşır."
          },
          {
                "level": "orta",
                "text": "Kompost (organik gübre) yapmak sürdürülebilir yaşama nasıl katkıda bulunur?",
                "options": [
                      "Plastik atıkları azaltır",
                      "Sebze-meyve artıkları çöpe gitmez; toprak zenginleştirici gübreye dönüşür, çöp miktarı ve kimyasal gübre kullanımı azalır",
                      "Enerji tasarrufu sağlar",
                      "Suyu arıtır"
                ],
                "answer": 1,
                "explain": "Organik atıklar kompostlanınca hem çöp depolama alanı ihtiyacı azalır hem de kimyasal gübre yerine kullanılabilen doğal toprak iyileştirici elde edilir."
          },
          {
                "level": "orta",
                "text": "Bir plastik poşetin doğada kendiliğinden parçalanması ne kadar sürer?",
                "options": [
                      "1 yıl",
                      "10 yıl",
                      "100-500 yıl",
                      "1 ay"
                ],
                "answer": 2,
                "explain": "Plastik poşetler 100–500 yıl boyunca doğada kalır; zamanla mikroplastiklere parçalanarak toprağa, sulara ve canlılara zarar verir."
          },
          {
                "level": "orta",
                "text": "Su tasarrufu için aşağıdaki davranışlardan hangisi en etkilidir?",
                "options": [
                      "Bulaşıkları yıkarken musluğu sürekli açık bırakmak",
                      "Her gün uzun duş almak",
                      "Damlayan muslukları onartmak ve tasarruflu ekipmanlar kullanmak",
                      "Araba yıkamada hortum kullanmak"
                ],
                "answer": 2,
                "explain": "Damlayan bir musluk günde 30–200 litre su israf edebilir. Tasarruflu musluk başlıkları ve duş başlıkları su kullanımını %50'ye kadar azaltır."
          },
          {
                "level": "orta",
                "text": "Aşağıda verilen atıkların hangisi ayrı toplanarak tıbbi atık kutusuna atılmalıdır?",
                "options": [
                      "Gazete kâğıdı",
                      "Cam şişe",
                      "Pil ve akümülatör",
                      "Plastik pet şişe"
                ],
                "answer": 2,
                "explain": "Piller ve aküler cıva, kurşun, kadmiyum gibi ağır metaller içerir. Çöpe ya da doğaya atılırlarsa toprağı ve suyu ciddi biçimde kirletirler; ayrı toplamak zorunludur."
          },
          {
                "level": "orta",
                "text": "Geri dönüşümün orman kaynaklarına doğrudan katkısı nedir?",
                "options": [
                      "Ormanlar büyür",
                      "Kâğıt geri dönüşümü sayesinde daha az ağaç kesilir ve orman alanları korunur",
                      "Hayvanlar şehre gelir",
                      "Su kaynakları artar"
                ],
                "answer": 1,
                "explain": "Bir ton geri dönüştürülmüş kâğıt, ortalama 17 ağacın kesilmesini engeller. Bu, orman ekosistemlerini ve biyoçeşitliliği korur."
          },
          {
                "level": "zor",
                "text": "Tek kullanımlık plastiklerin yasaklanmasının olumlu ve olumsuz sonuçlarından hangisi doğru verilmiştir?",
                "options": [
                      "Olumlu: Daha fazla plastik üretilir; Olumsuz: Maliyetler düşer",
                      "Olumlu: Okyanus plastik kirliliği azalır ve kaynak tasarrufu sağlanır; Olumsuz: Alternatif malzemelerin ilk üretim maliyeti yükselebilir",
                      "Olumlu: Plastik sanayisi büyür; Olumsuz: Çevre kirliliği artar",
                      "Olumlu ve olumsuz etkisi yoktur"
                ],
                "answer": 1,
                "explain": "Yasak; okyanus ve toprak kirliliğini azaltır, ham madde tasarrufu sağlar. Ancak kâğıt, bambu veya biyoplastik gibi alternatiflerin üretim altyapısı kurulana dek maliyet artışı yaşanabilir."
          },
          {
                "level": "zor",
                "text": "'Döngüsel ekonomi' kavramı ne anlama gelir ve doğrusal ekonomiden farkı nedir?",
                "options": [
                      "Yalnızca geri dönüşümü kapsar",
                      "Ürünlerin tasarım aşamasından itibaren yeniden kullanım, onarım ve geri dönüşüm düşünülerek tasarlandığı; atığın en aza indirildiği sistem — 'al-üret-at' yerine 'tasarla-kullan-geri kazan'",
                      "Ekonomik büyümeyi durdurmayı hedefler",
                      "Yalnızca enerji tasarrufunu kapsar"
                ],
                "answer": 1,
                "explain": "Doğrusal ekonomi: Ham madde → Üretim → Kullanım → Çöp. Döngüsel ekonomi: Atık sıfır hedefiyle ürünler tekrar sisteme girer. Bu model doğal kaynakları korur ve uzun vadeli sürdürülebilirliği sağlar."
          },
          {
                "level": "zor",
                "text": "Bir öğrenci okulda geri dönüşüm kampanyası başlatıyor. Kampanyanın en kalıcı etkiyi yaratması için hangi yaklaşım tercih edilmelidir?",
                "options": [
                      "Yalnızca kâğıt toplama kutusu koymak",
                      "Hem davranış değişikliği eğitimi (neden geri dönüşüm?) hem fiziksel altyapı (ayrı kutular) hem de düzenli takip ve geri bildirim sağlamak",
                      "Konuyla ilgili afiş asmak",
                      "Yalnızca öğretmenleri bilgilendirmek"
                ],
                "answer": 1,
                "explain": "Araştırmalar, etkili çevre programlarının üç bileşen içermesi gerektiğini gösteriyor: Farkındalık/eğitim (neden?), altyapı (nasıl?) ve davranışın izlenmesi/ödüllenmesi. Tek başına herhangi bir bileşen yeterli değildir."
          }
    ]
  },
  "6": {
    "Üreme, Gelişme ve Ergenlik": [
      {
        "level": "kolay",
        "text": "Ergenlik döneminde vücudumuzdaki değişiklikleri kontrol eden maddeler hangisidir?",
        "options": [
          "Vitaminler",
          "Mineraller",
          "Hormonlar",
          "Enzimler"
        ],
        "answer": 2,
        "explain": "Hormonlar, endokrin bezler tarafından salgılanan kimyasal habercilerdir; ergenlik sürecindeki fiziksel değişiklikleri düzenler."
      },
      {
        "level": "kolay",
        "text": "Kız çocuklarında ergenlik döneminde estrojen hangi bezi tarafından üretilir?",
        "options": [
          "Böbrek üstü bezi",
          "Yumurtalık (over)",
          "Tiroit bezi",
          "Hipofiz bezi"
        ],
        "answer": 1,
        "explain": "Yumurtalıklar, ergenlik döneminde estrojen hormonu salgılayarak kadına özgü ikincil cinsiyet karakterlerinin gelişimini sağlar."
      },
      {
        "level": "kolay",
        "text": "Erkek çocuklarında ergenlik dönemindeki ses kalınlaşması hangi hormonun etkisiyle gerçekleşir?",
        "options": [
          "Estrojen",
          "İnsülin",
          "Testosteron",
          "Tiroksin"
        ],
        "answer": 2,
        "explain": "Testosteron, erkeklerde erbezi (testis) tarafından salgılanır; ses tellerinin kalınlaşması başta olmak üzere ikincil cinsiyet özelliklerini oluşturur."
      },
      {
        "level": "kolay",
        "text": "İnsan gelişim dönemleri sırasıyla nasıldır?",
        "options": [
          "Yetişkinlik → Bebeklik → Çocukluk → Ergenlik",
          "Bebeklik → Çocukluk → Ergenlik → Yetişkinlik",
          "Ergenlik → Çocukluk → Bebeklik → Yaşlılık",
          "Çocukluk → Ergenlik → Bebeklik → Yetişkinlik"
        ],
        "answer": 1,
        "explain": "İnsan gelişimi: Bebeklik (0-2) → Çocukluk (2-12) → Ergenlik (12-18) → Yetişkinlik (18+) → Yaşlılık şeklinde ilerler."
      },
      {
        "level": "kolay",
        "text": "Ergenlik döneminde kişisel hijyen neden daha önemli hale gelir?",
        "options": [
          "Büyüme durur",
          "Ter bezleri daha fazla salgı yapar; bakım yapılmazsa bakteri ürer ve kötü koku oluşur",
          "Saç büyümesi durur",
          "Kemikler zayıflar"
        ],
        "answer": 1,
        "explain": "Ergenlikle birlikte apokrin ter bezleri aktifleşir; düzenli temizlik yapılmazsa bakteri çoğalması ve kötü koku kaçınılmaz olur."
      },
      {
        "level": "kolay",
        "text": "Büyüme hormonu hangi bez tarafından salgılanır?",
        "options": [
          "Tiroit bezi",
          "Pankreas",
          "Hipofiz bezi",
          "Böbrek üstü bezi"
        ],
        "answer": 2,
        "explain": "Hipofiz bezi (beyin tabanında), vücuttaki birçok hormonu düzenler; büyüme hormonu da buradan salgılanır."
      },
      {
        "level": "orta",
        "text": "Menstrüasyon (adet) döngüsü ortalama kaç günde bir gerçekleşir ve hangi hormonal değişime bağlıdır?",
        "options": [
          "7 günde bir – testosteron",
          "28 günde bir – estrojen ve progesteron",
          "14 günde bir – insülin",
          "21 günde bir – tiroksin"
        ],
        "answer": 1,
        "explain": "Ortalama 28 günlük menstrüasyon döngüsü; estrojen ve progesteron hormonlarının yükselip alçalmasıyla yönetilir."
      },
      {
        "level": "orta",
        "text": "İskelet kaslarının ergenlikte gelişmesi hangi hormona bağlıdır?",
        "options": [
          "Estrojen",
          "İnsülin",
          "Testosteron",
          "Tiroksin"
        ],
        "answer": 2,
        "explain": "Testosteron, protein sentezini artırarak kas gelişimini (özellikle erkeklerde) uyarır. Bu nedenle ergenlik döneminde kas kütlesi belirgin artar."
      },
      {
        "level": "orta",
        "text": "Ergenlik döneminde cilt sorunlarının (akne) artmasının temel nedeni nedir?",
        "options": [
          "Aşırı protein tüketimi",
          "Sebum bezlerinin hormonlar etkisiyle aşırı salgı üretmesi",
          "Yetersiz uyku",
          "Güneş ışığına maruziyet"
        ],
        "answer": 1,
        "explain": "Hormonlar (özellikle androjenler) yağ (sebum) bezlerini uyarır; aşırı sebum gözenekleri tıkar ve bakteri üremesi sivilceye neden olur."
      },
      {
        "level": "orta",
        "text": "Ergenlik döneminde kemik gelişiminin hız kazanması ve sağlıklı kemik oluşumu için hangi mineral kritik önem taşır?",
        "options": [
          "Demir",
          "Kalsiyum",
          "Sodyum",
          "Potasyum"
        ],
        "answer": 1,
        "explain": "Kalsiyum, kemik ve diş sağlığı için zorunludur. Ergenlikte hızlanan kemik gelişimi nedeniyle süt ve süt ürünleri tüketimi hayati önem taşır."
      },
      {
        "level": "orta",
        "text": "Tiroit bezi yeterli hormon üretemezse büyüme ve gelişme nasıl etkilenir?",
        "options": [
          "Büyüme hızlanır",
          "Büyüme ve gelişme yavaşlar, zekâ gelişimi olumsuz etkilenebilir",
          "Kas gelişimi artar",
          "Puberte erken başlar"
        ],
        "answer": 1,
        "explain": "Tiroid hormonu (tiroksin) metabolizmayı ve büyüme-gelişme süreçlerini düzenler; eksikliğinde hipotiroidizm gelişir ve tüm büyüme yavaşlar."
      },
      {
        "level": "orta",
        "text": "Duygusal değişimlerin (ruh hali dalgalanmaları) ergenlikte artmasının nedeni nedir?",
        "options": [
          "Yetersiz beslenme",
          "Hızlı hormonal değişimler beyin kimyasını etkiler",
          "Aşırı spor yapma",
          "Okul stresi"
        ],
        "answer": 1,
        "explain": "Ergenlikte hızla değişen hormon seviyeleri, beyin kimyasını etkiler. Bu durum duygusal dalgalanmalara ve tepki değişkenliğine yol açar."
      },
      {
        "level": "zor",
        "text": "Hipofiz bezinden salgılanan LH (lüteinleştirici hormon) kadın vücudunda ne işlev görür?",
        "options": [
          "Süt üretimini başlatır",
          "Yumurtlamayı (ovülasyon) tetikler",
          "Kasların gelişmesini sağlar",
          "Kan şekerini düzenler"
        ],
        "answer": 1,
        "explain": "LH, menstrüasyon döngüsünün ortasında ani artış yaparak olgun yumurtanın yumurtalıktan salınmasını (ovülasyon) tetikler."
      },
      {
        "level": "zor",
        "text": "Erken ergenlik (precocious puberty) ne anlama gelir ve neden tıbbi dikkat gerektirir?",
        "options": [
          "Ergenliğin 18 yaşında başlaması",
          "Ergenliğin normalden önce (kızlarda <8, erkeklerde <9 yaş) başlaması; hormonal veya nörolojik sorun işareti olabilir",
          "Ergenliğin hiç yaşanmaması",
          "Ergenliğin çok yavaş ilerlemesi"
        ],
        "answer": 1,
        "explain": "Erken ergenlik, hormon salgılatıcı bir tümör veya merkezi sinir sistemi sorunu işareti olabilir; kemik yaşı ilerleyebilir ve boy kısa kalabilir."
      },
      {
        "level": "zor",
        "text": "Progesteron hormonunun görevi aşağıdakilerden hangisinde doğru açıklanmıştır?",
        "options": [
          "Yumurtlamayı tetikler",
          "Döl yatağını (rahim) döllenmiş yumurtayı tutabilecek şekilde hazırlar",
          "Testosteron üretimini artırır",
          "Büyüme hızını düzenler"
        ],
        "answer": 1,
        "explain": "Progesteron, rahim iç duvarını (endometriumu) kalınlaştırarak olası bir döllenmiş yumurtanın tutunmasına hazırlar; döllenme olmazsa seviyesi düşer ve menstrüasyon başlar."
      }
    ],
    "Madde ve Isı": [
      {
        "level": "kolay",
        "text": "Isı ve sıcaklık arasındaki temel fark nedir?",
        "options": [
          "İkisi aynı şeydir",
          "Isı aktarılan enerji miktarı, sıcaklık ise taneciklerin ortalama kinetik enerjisidir",
          "Sıcaklık enerji miktarı, ısı ise tanecik hızıdır",
          "Isı termomet reyle ölçülür"
        ],
        "answer": 1,
        "explain": "Isı (J) bir enerji türüdür ve aktarılabilir. Sıcaklık (°C veya K) ise bir maddenin 'sıcaklık derecesi'ni gösterir, enerji miktarını değil."
      },
      {
        "level": "kolay",
        "text": "Isı iletiminin katı cisimlerde gerçekleşmesi nasıl açıklanır?",
        "options": [
          "Tanecikler yer değiştirir",
          "Titreşen tanecikler komşu taneciklere enerji aktarır",
          "Sıvı akışıyla olur",
          "Işık dalgaları taşır"
        ],
        "answer": 1,
        "explain": "Katılarda ısı iletimi (kondüksiyon): Titreşen sıcak tanecikler komşu soğuk taneciklerle çarpışarak enerji iletir; tanecikler yer değiştirmez."
      },
      {
        "level": "kolay",
        "text": "Metallerin iyi ısı iletmesinin nedeni nedir?",
        "options": [
          "Renkleri koyu olduğundan",
          "Serbest elektronları sayesinde ısıyı hızla iletirler",
          "Yoğunlukları yüksek olduğundan",
          "Işığı soğurdukları için"
        ],
        "answer": 1,
        "explain": "Metallerdeki serbest (bağlı olmayan) elektronlar, enerjiyi hızla taşıyarak ısı iletimini kolaylaştırır."
      },
      {
        "level": "kolay",
        "text": "Maddeler ısıtıldığında genellikle ne olur?",
        "options": [
          "Küçülür",
          "Genleşir (büyür)",
          "Ağırlaşır",
          "Renk değiştirir"
        ],
        "answer": 1,
        "explain": "Isınan tanecikler daha hızlı titreşir ve aralarındaki mesafe artar; bu maddenin genleşmesine (boyut artışına) neden olur."
      },
      {
        "level": "kolay",
        "text": "Suyun donma noktası ve kaynama noktası sırasıyla kaç °C'dir?",
        "options": [
          "0°C ve 50°C",
          "0°C ve 100°C",
          "10°C ve 90°C",
          "5°C ve 100°C"
        ],
        "answer": 1,
        "explain": "Saf suyun donma noktası 0°C, kaynama noktası ise deniz seviyesinde 100°C'dir (normal basınçta)."
      },
      {
        "level": "kolay",
        "text": "Güneşten Dünya'ya ısı enerjisinin ulaşması hangi yöntemle gerçekleşir?",
        "options": [
          "İletim",
          "Taşınım",
          "Işıma (radyasyon)",
          "Buharlaşma"
        ],
        "answer": 2,
        "explain": "Güneş ile Dünya arasında madde olmadığından ısı, elektromanyetik dalgalar aracılığıyla ışıma yöntemiyle iletilir."
      },
      {
        "level": "orta",
        "text": "Kaynayan su üzerindeki buharın tavanda yoğunlaşması hangi ısı iletim yöntemine örnektir?",
        "options": [
          "İletim",
          "Taşınım",
          "Işıma",
          "İkisi de yoktur"
        ],
        "answer": 1,
        "explain": "Sıcak su buharı yoğunluk farkıyla yukarı çıkar (taşınım). Soğuk tavanla karşılaşınca su damlacıklarına dönüşür (yoğuşma)."
      },
      {
        "level": "orta",
        "text": "Demir rayların birleşim noktalarında boşluk bırakılmasının nedeni nedir?",
        "options": [
          "Maliyet tasarrufu için",
          "Rayların ısıyla genleşip birbiriyle çarpışmasını önlemek için",
          "Titreşimi azaltmak için",
          "Rayları kolayca değiştirmek için"
        ],
        "answer": 1,
        "explain": "Metaller ısıyla genleşir. Boşluk bırakılmazsa yaz aylarında genleşen raylar birbirine baskı yaparak kıvrılabilir, tren kazasına yol açabilir."
      },
      {
        "level": "orta",
        "text": "Q = m × c × ΔT formülünde 'c' neyi ifade eder?",
        "options": [
          "Maddenin kütlesini",
          "Özgül ısı kapasitesini",
          "Sıcaklık değişimini",
          "Isı miktarını"
        ],
        "answer": 1,
        "explain": "'c' özgül ısı kapasitesidir; 1 kg maddenin sıcaklığını 1°C artırmak için gereken enerji miktarını (J/kg·°C) gösterir."
      },
      {
        "level": "orta",
        "text": "Kütlesi 2 kg ve özgül ısısı 500 J/(kg·°C) olan madde 10°C ısıtılırsa ne kadar ısı alır?",
        "options": [
          "500 J",
          "1.000 J",
          "5.000 J",
          "10.000 J"
        ],
        "answer": 3,
        "explain": "Q = m × c × ΔT = 2 × 500 × 10 = 10.000 J. Özgül ısı formülü uygulandığında doğru sonuç 10.000 J'dür."
      },
      {
        "level": "orta",
        "text": "Hal değişimlerinde sıcaklık neden sabit kalır?",
        "options": [
          "Enerji alınmaz ya da verilmez",
          "Alınan ya da verilen enerji tanecik düzenini bozmak için kullanılır, kinetik enerjiyi değil",
          "Sıcaklık artar ama termometre hatalı gösterir",
          "Hal değişiminde enerji yoktur"
        ],
        "answer": 1,
        "explain": "Erime veya kaynama sırasında eklenen enerji bağları kırmak için harcanır; taneciklerin ortalama kinetik enerjisi (sıcaklığı) değişmez."
      },
      {
        "level": "orta",
        "text": "Termos (çift çeperli vakumlu kap) nasıl çalışır?",
        "options": [
          "İçi dondurulmuştur",
          "Çeperler arası vakum iletimiyi, yansıtıcı yüzey ışımayı azaltır; taşınım da önlenir",
          "İçi metal kaplıdır",
          "Isıyı üretir"
        ],
        "answer": 1,
        "explain": "Termoste: Vakum → iletim ve taşınımı önler. Gümüş kaplama yüzey → ışımayı yansıtır. Böylece içindeki sıcak veya soğuk sıvı uzun süre sabit kalır."
      },
      {
        "level": "zor",
        "text": "Suya kıyasla demir için özgül ısı kapasitesi daha küçüktür. Bu ne anlama gelir?",
        "options": [
          "Demiri ısıtmak su kadar enerji gerektirir",
          "Demir daha az enerjiyle aynı miktarda ısınır; su ısıtmak daha fazla enerji ister",
          "Demir hiç ısınamaz",
          "Suyun kaynama noktası daha düşüktür"
        ],
        "answer": 1,
        "explain": "Suyun özgül ısısı ≈ 4200 J/(kg·°C), demirin ≈ 450 J/(kg·°C). Demir, suya göre yaklaşık 9 kat daha az enerjiyle aynı sıcaklığa çıkar."
      },
      {
        "level": "zor",
        "text": "Terlemenin vücudu soğutma mekanizması hangi ısı aktarım ilkesine dayanır?",
        "options": [
          "İletim",
          "Işıma",
          "Buharlaşma gizli ısısı (soğurma)",
          "Taşınım"
        ],
        "answer": 2,
        "explain": "Terin buharlaşması için gerekli gizli ısı deriden alınır; bu süreç deri sıcaklığını düşürür ve vücudu soğutur."
      },
      {
        "level": "zor",
        "text": "Deniz kıyısında gece-gündüz rüzgar yönünün değişmesinin (imbat ve karayel) nedeni nedir?",
        "options": [
          "Güneşin yerinin değişmesi",
          "Kara ve denizin farklı özgül ısı kapasiteleri nedeniyle farklı ısınıp soğuması",
          "Denizin daha ağır olması",
          "Kıyı şeridinin eğimi"
        ],
        "answer": 1,
        "explain": "Kara, özgül ısısı düşük olduğundan gündüz hızla ısınır; hava yükselir, denizden serin hava akar (deniz meltemi). Gece kara hızla soğur; bu kez karadan denize doğru rüzgar eser (kara meltemi)."
      }
    ],
    "Ses ve Özellikleri": [
      {
        "level": "kolay",
        "text": "Sesin oluşumu için ne gereklidir?",
        "options": [
          "Işık",
          "Titreşim",
          "Mıknatıs",
          "Isı"
        ],
        "answer": 1,
        "explain": "Ses, titreşen cisimlerin çevresindeki maddeyi sıkıştırıp seyrelterek yayılması sonucu oluşur."
      },
      {
        "level": "kolay",
        "text": "İnsan kulağının duyabildiği frekans aralığı hangisidir?",
        "options": [
          "1 – 100 Hz",
          "20 – 20.000 Hz",
          "100 – 50.000 Hz",
          "1.000 – 100.000 Hz"
        ],
        "answer": 1,
        "explain": "İnsan kulağı 20 Hz (çok alçak bas) ile 20.000 Hz (çok tiz) arasındaki sesleri duyabilir; bu aralık yaşla birlikte daralır."
      },
      {
        "level": "kolay",
        "text": "Sesin şiddetini azaltmanın yolu nedir?",
        "options": [
          "Titreşim genliğini artırmak",
          "Titreşim frekansını artırmak",
          "Titreşim genliğini azaltmak",
          "Ses kaynağını yaklaştırmak"
        ],
        "answer": 2,
        "explain": "Sesin şiddeti titreşim genliğiyle ilgilidir; genlik azaltıldığında ses daha hafif (sessiz) duyulur."
      },
      {
        "level": "kolay",
        "text": "Ultrason nedir?",
        "options": [
          "20 Hz altındaki ses",
          "20.000 Hz üzerindeki ses",
          "Işık dalgası",
          "Ses dalgasının yansıması"
        ],
        "answer": 1,
        "explain": "Ultrason, 20.000 Hz'in üzerindeki insan kulağının duyamadığı yüksek frekanslı ses dalgasıdır."
      },
      {
        "level": "kolay",
        "text": "Ses kirliliği nedir ve sağlığa etkileri nelerdir?",
        "options": [
          "Kirli havayla yayılan ses",
          "İstenmeden duyulan yüksek şiddetli ses; işitme kaybı ve strese yol açar",
          "Düşük frekanslı ses",
          "Hayvanların çıkardığı sesler"
        ],
        "answer": 1,
        "explain": "Ses kirliliği; 85 dB üzerindeki sürekli gürültüdür. İşitme kaybı, uyku bozukluğu, stres ve kalp-damar sorunlarına neden olabilir."
      },
      {
        "level": "kolay",
        "text": "Gitar telinin kalınlaştırılması sesin hangi özelliğini değiştirir?",
        "options": [
          "Şiddetini artırır",
          "Tizliğini düşürür (daha bas bir ses çıkar)",
          "Yankı oluşturur",
          "Hızını artırır"
        ],
        "answer": 1,
        "explain": "Kalın teller daha yavaş titreşir, daha düşük frekanslı (bas) ses çıkarır. İnce teller ise yüksek frekanslı (tiz) ses üretir."
      },
      {
        "level": "orta",
        "text": "Ekolokata (yankı ölçümü) dayanarak av avlayan hayvan hangisidir?",
        "options": [
          "Kartal",
          "Timsah",
          "Yarasa",
          "Köpek balığı"
        ],
        "answer": 2,
        "explain": "Yarasalar ultrason yayar ve nesnelerden yansıyan yankıyı alarak çevrelerini ve avlarını hassas biçimde tespit eder."
      },
      {
        "level": "orta",
        "text": "Yankı (eko) ile rezonans arasındaki fark nedir?",
        "options": [
          "İkisi aynı şeydir",
          "Yankı sesin yansıması; rezonans ise bir cismin başka bir kaynağın frekansıyla titreşime katılmasıdır",
          "Yankı titreşimdir; rezonans yansımadır",
          "Rezonans yalnızca sıvılarda olur"
        ],
        "answer": 1,
        "explain": "Yankı: ses dalgasının sert yüzeyden geri dönmesi. Rezonans: bir cismin kendi doğal frekansında dışarıdan uyarılarak titreşimi artırması."
      },
      {
        "level": "orta",
        "text": "Müzik salonlarında duvarların yumuşak malzemeyle kaplanmasının nedeni nedir?",
        "options": [
          "Sesin hızlanması için",
          "Sesin soğurularak yankıyı azaltmak, akustiği iyileştirmek için",
          "Maliyeti düşürmek için",
          "Işığı yansıtmak için"
        ],
        "answer": 1,
        "explain": "Sert yüzeyler sesi yansıtır ve aşırı yankı oluşturur. Yumuşak malzemeler (sünger, kıl) sesi soğurarak yankıyı azaltır ve netliği artırır."
      },
      {
        "level": "orta",
        "text": "Tıpta kullanılan ultrasonografi (USG) hangi ilkeye dayanır?",
        "options": [
          "Işığın kırılması",
          "Ultrason dalgalarının vücut dokularından yansıması ve bu yansımaların görüntüye dönüştürülmesi",
          "X ışınlarının emilimi",
          "Manyetik kuvvet"
        ],
        "answer": 1,
        "explain": "USG cihazı ultrason dalgaları gönderir; farklı dokulardan farklı hızlarda dönen yankılar bilgisayarla görüntüye çevrilir."
      },
      {
        "level": "orta",
        "text": "Soniik patlama (ses patlaması) nedir?",
        "options": [
          "Sesin yavaşlaması",
          "Ses hızını aşan bir nesnenin oluşturduğu şok dalgası",
          "Gök gürültüsü",
          "Ultrasonun şiddetlenmesi"
        ],
        "answer": 1,
        "explain": "Bir cisim ses hızını (≈340 m/s havada) geçtiğinde şok dalgası oluşur; bu ani basınç değişimi 'sonic boom' (ses patlaması) olarak duyulur."
      },
      {
        "level": "orta",
        "text": "Gök gürültüsü ile şimşek aynı anda oluştuğu halde şimşeği önce görüp gürültüyü sonra duyarız. Neden?",
        "options": [
          "Şimşek daha güçlüdür",
          "Işık hızı (3×10⁸ m/s) ses hızından (340 m/s) çok büyük olduğundan",
          "Gök gürültüsü gecikme programlıdır",
          "Sesin frekansı düşük olduğundan"
        ],
        "answer": 1,
        "explain": "Işık hızı ≈ 300.000 km/s, ses hızı ≈ 0,34 km/s. Işık neredeyse anında ulaşırken ses gecikir. 3 saniye gecikme yaklaşık 1 km mesafeye işaret eder."
      },
      {
        "level": "zor",
        "text": "Doppler etkisi nedir? Ambulans yaklaşırken ve uzaklaşırken siren sesinin farklı duyulmasını açıklayınız.",
        "options": [
          "Sesin şiddeti değişir; ambulans yaklaşınca daha gürültülü olur",
          "Ses kaynağı hareket ettiğinde gözlemcinin duyduğu frekans değişir; yaklaşınca tiz, uzaklaşınca bas",
          "Ambulansın hızlanmasıyla ses azalır",
          "Sesin hızı değişir"
        ],
        "answer": 1,
        "explain": "Doppler etkisi: Kaynak yaklaşınca ses dalgaları sıkışır (frekans artar, ses tizleşir); uzaklaşınca dalgalar gerilir (frekans azalır, ses baslaşır)."
      },
      {
        "level": "zor",
        "text": "SONAR sistemi denizaltı tespitinde nasıl çalışır?",
        "options": [
          "Işık dalgaları göndererek",
          "Ses dalgaları gönderir, su altındaki nesnelerden gelen yankının süresini ölçerek mesafe hesaplar",
          "Manyetik alan kullanarak",
          "Termal görüntülemeyle"
        ],
        "answer": 1,
        "explain": "SONAR (Sound Navigation And Ranging): Su altına ses darbesi gönderir; nesneye çarpan ses geri döner. Gidiş-dönüş süresi ve suyun ses hızı kullanılarak mesafe hesaplanır: d = (v × t) / 2."
      },
      {
        "level": "zor",
        "text": "Müzik aletleri aynı notayı çalarken birbirinden farklı duyulurlar. Bu farklılık sesin hangi özelliğiyle açıklanır?",
        "options": [
          "Frekans",
          "Şiddet",
          "Tınısı (harmonikler)",
          "Hız"
        ],
        "answer": 2,
        "explain": "Tını (timbre), temel frekansa eklenen harmonik (üst ses) bileşenlerinden kaynaklanır. Her enstrümanın kendine özgü harmonik dizisi, onu diğerlerinden farklı kılar."
      }
    ],
    "Işık ve Görme": [
      {
        "level": "kolay",
        "text": "Işığın paralel ışınları bir noktada toplayan lens türü hangisidir?",
        "options": [
          "Konkav lens",
          "Konveks lens",
          "Düzlem ayna",
          "Prizma"
        ],
        "answer": 1,
        "explain": "Konveks (toplayıcı, yaklaştırıcı) lens, kenarları ince ortası kalın olup ışık ışınlarını odak noktasında toplar."
      },
      {
        "level": "kolay",
        "text": "Miyopi (uzağı görememe) ile hipermetropi (yakını görememe) arasındaki fark nedir?",
        "options": [
          "Miyopi ve hipermetropi aynı göz kusurudur",
          "Miyopi: görüntü retina önüne düşer; hipermetropi: retina arkasına düşer",
          "Miyopi: görüntü retina arkasına düşer",
          "İkisinde de görüntü aynı yerde oluşur"
        ],
        "answer": 1,
        "explain": "Miyopi: göz küresi uzun; görüntü retinanın önünde oluşur → konkav lens. Hipermetropi: göz küresi kısa; görüntü retinanın arkasında oluşur → konveks lens."
      },
      {
        "level": "kolay",
        "text": "Gözün en duyarlı bölgesi (renk ve keskin görme merkezini) oluşturan yapı hangisidir?",
        "options": [
          "Kornea",
          "İris",
          "Sarı nokta (fovea)",
          "Göz bebeği"
        ],
        "answer": 2,
        "explain": "Sarı nokta (makula / fovea), retina üzerinde koni hücrelerinin yoğunlaştığı ve en keskin renkli görmenin sağlandığı merkezdir."
      },
      {
        "level": "kolay",
        "text": "Gözün ışık miktarını ayarlamak için büyüyüp küçülen yapısı hangisidir?",
        "options": [
          "Kornea",
          "Lens",
          "İris (göz bebeği)",
          "Retina"
        ],
        "answer": 2,
        "explain": "İris kasılıp genişleyerek göz bebeğinin (pupil) boyutunu değiştirir; böylece gözün içine giren ışık miktarını düzenler."
      },
      {
        "level": "kolay",
        "text": "Renk körlüğü neden kaynaklanır?",
        "options": [
          "Retinadaki çubuk hücrelerinin yetersizliği",
          "Retinadaki koni hücrelerinin bazı renklere duyarsız olması",
          "Lensin bulanıklığı",
          "Göz bebeğinin küçülmesi"
        ],
        "answer": 1,
        "explain": "Koni hücreleri renk algılamasından sorumludur. Belirli konilerin eksik ya da hatalı çalışması renk körlüğüne (özellikle kırmızı-yeşil ayrımında) yol açar."
      },
      {
        "level": "kolay",
        "text": "Fotoğraf makinesinin lensi insanın gözündeki hangi yapıyla karşılaştırılabilir?",
        "options": [
          "İris",
          "Retina",
          "Göz merceği (lens)",
          "Kornea"
        ],
        "answer": 2,
        "explain": "Göz merceği, fotoğraf makinesinin lensi gibi ışığı kırarak retina üzerinde net bir görüntü oluşturur ve uzaklığa göre şeklini değiştirir (akkomodasyon)."
      },
      {
        "level": "orta",
        "text": "Katarakt nedir ve nasıl tedavi edilir?",
        "options": [
          "Retina yırtılmasıdır; ameliyatla onarılır",
          "Göz merceğinin bulanıklaşmasıdır; bulanık merceğin yapay lensle değiştirilmesiyle tedavi edilir",
          "İris renginin değişmesidir",
          "Göz tansiyonunun yükselmesidir"
        ],
        "answer": 1,
        "explain": "Katarakt, göz merceğinin zamanla bulanıklaşmasıdır (özellikle yaşlılarda veya travma sonrası). Tek tedavisi cerrahi operasyonla bulanık merceğin yapay mercekle değiştirilmesidir."
      },
      {
        "level": "orta",
        "text": "Astigmat göz kusurunu oluşturan nedir ve hangi lensle düzeltilir?",
        "options": [
          "Göz küresi fazla uzun; silindirik lens",
          "Kornea veya lensin düzgün küresel olmayan şekli; silindirik (toric) lens",
          "Göz küresi fazla kısa; konkav lens",
          "Retina hasarı; prizma lens"
        ],
        "answer": 1,
        "explain": "Astigmatta kornea veya lens farklı meridyenlerde farklı eğrilik gösterir; ışık tek noktada toplanamaz ve görüntü bulanıklaşır. Silindirik lenslerle düzeltilir."
      },
      {
        "level": "orta",
        "text": "Teleskop ve mikroskop ne için kullanılır ve hangi optik elemanları içerir?",
        "options": [
          "İkisi de küçük nesneler içindir; konkav lens içerir",
          "Teleskop uzaktaki, mikroskop küçük nesneler için; her ikisi de konveks lensler içerir",
          "Teleskop yalnızca yansıtıcı aynalar kullanır",
          "Mikroskop uzaktaki nesneler içindir"
        ],
        "answer": 1,
        "explain": "Teleskop uzaktaki nesneleri yakınlaştırır (gökyüzü gözlemi). Mikroskop çok küçük nesneleri büyütür (hücre). Her ikisi de konveks lens prensibini kullanır."
      },
      {
        "level": "orta",
        "text": "Optik yanılsama neden oluşur?",
        "options": [
          "Gözde bozukluk olduğundan",
          "Beyin görsel bilgiyi farklı yorumlar ve gerçekle uyuşmayan algı oluşturur",
          "Işık hızından dolayı",
          "Renk körlüğü nedeniyle"
        ],
        "answer": 1,
        "explain": "Optik yanılsama; gözden gelen bilgiyi beynin deneyimlerine ve bağlama dayanarak yanlış yorumlamasından kaynaklanır. Göz değil, beyin yanılır."
      },
      {
        "level": "orta",
        "text": "Lazer ışığının güneş ışığından farkı nedir?",
        "options": [
          "Lazer daha hızlıdır",
          "Lazer tek renktir (tek dalga boyu), tutarlıdır ve yönlendirilmiştir",
          "Lazer daha sıcaktır",
          "Lazer görünmezdir"
        ],
        "answer": 1,
        "explain": "Lazer: tek frekanslı (monokromatik), fazı uyumlu (koheran) ve odaklanmış ışık demetidir. Güneş ışığı ise geniş spektrumlu ve dağınıktır."
      },
      {
        "level": "orta",
        "text": "Gece görme gözlükleri hangi ışık türüne duyarlıdır?",
        "options": [
          "Ultraviyole",
          "Görünür ışık",
          "Kızılötesi (infrared)",
          "X ışını"
        ],
        "answer": 2,
        "explain": "Gece görme gözlükleri, nesnelerin yaydığı kızılötesi (ısı) radyasyonunu algılar ve görünür görüntüye dönüştürür."
      },
      {
        "level": "zor",
        "text": "Güneş gözlüğündeki polarize cam yansımaları nasıl azaltır?",
        "options": [
          "Işığı soğurarak",
          "Yalnızca belirli titreşim düzlemlerindeki ışığı geçirerek yansıyan tutarsız ışığı engeller",
          "Işığı kırarak",
          "UV'yi yansıtarak"
        ],
        "answer": 1,
        "explain": "Polarize filtre; yalnızca belirli polarizasyon yönündeki ışık dalgalarını geçirir. Su veya cam gibi yüzeylerden yansıyan ışık yatay polarize olur; polarize cam bu bileşeni engeller."
      },
      {
        "level": "zor",
        "text": "Tam iç yansıma hangi koşulda gerçekleşir ve fiber optik kabloda nasıl kullanılır?",
        "options": [
          "Işık seyrek ortamdan yoğuna geçerken her açıda",
          "Işık yoğun ortamdan seyrek ortama geçerken ve açı kritik açıdan büyükse; fiber optik ışığı sızdırmadan iletir",
          "Işık her iki durumda da aynadaki gibi yansır",
          "Yalnızca ultrason dalgalarında görülür"
        ],
        "answer": 1,
        "explain": "Yoğun→seyrek ortam geçişinde açı kritik açıyı aşarsa ışık geçemez, tamamen yansır. Fiber optik kablo bu ilkeyle ışığı bükülmüş yol boyunca kayıpsız iletir."
      },
      {
        "level": "zor",
        "text": "Gökkuşağı oluşum mekanizmasını adım adım açıklayan seçenek hangisidir?",
        "options": [
          "Güneş ışığının buluttan yansıması",
          "Güneş ışığının su damlacıklarına girerken kırılması, damla içinde yansıması ve çıkarken tekrar kırılarak renklere ayrılması",
          "Güneş ışığının tozla saçılması",
          "Işığın ısıyla genleşmesi"
        ],
        "answer": 1,
        "explain": "1. Işık su damlacığına girer → kırılır (dağılır). 2. Damla içinde yansır. 3. Çıkarken tekrar kırılır. Her renk (dalga boyu) farklı açıyla ayrılır; gökkuşağı oluşur."
      }
    ],
    "Kuvvet ve Hareket": [
      {
        "level": "kolay",
        "text": "Hız ile sürat (hız büyüklüğü) arasındaki fark nedir?",
        "options": [
          "İkisi aynıdır",
          "Hız yön ve büyüklük içerir (vektör); sürat yalnızca büyüklüktür (skaler)",
          "Sürat yön içerir",
          "Hız yalnızca büyüklüktür"
        ],
        "answer": 1,
        "explain": "Sürat (hız büyüklüğü): kaç km/h veya m/s. Hız (velocity): büyüklük + yön bilgisi (vektör). Örneğin '60 km/h kuzeye' hız; '60 km/h' sürattir."
      },
      {
        "level": "kolay",
        "text": "Bir cisim 100 m yolu 10 saniyede alıyorsa ortalama sürati kaç m/s'dir?",
        "options": [
          "1.000 m/s",
          "10 m/s",
          "1 m/s",
          "0,1 m/s"
        ],
        "answer": 1,
        "explain": "Ortalama sürat = yol / zaman = 100 m / 10 s = 10 m/s."
      },
      {
        "level": "kolay",
        "text": "Newton'un 3. Yasası (Etki-Tepki Yasası) ne demektir?",
        "options": [
          "Her kuvvetin eşit ve zıt bir tepki kuvveti vardır",
          "Net kuvvet = kütle × ivme",
          "Denge halindeki cisim durur",
          "Kuvvet olmadan hareket olmaz"
        ],
        "answer": 0,
        "explain": "Newton'un 3. Yasası: A cisminin B cismine uyguladığı kuvvet, B'nin A'ya uyguladığı kuvvete eşit ve zıt yöndedir (etki = tepki)."
      },
      {
        "level": "kolay",
        "text": "Basit makinelerin kullanım amacı nedir?",
        "options": [
          "Daha fazla iş yapmak",
          "Uygulanan kuvveti veya yönü değiştirerek işi kolaylaştırmak",
          "Enerji üretmek",
          "Sürtünmeyi artırmak"
        ],
        "answer": 1,
        "explain": "Basit makineler (kaldıraç, makara, eğik düzlem vb.) kuvvetin büyüklüğünü veya yönünü değiştirerek işi kolaylaştırır; toplam iş miktarını azaltmaz."
      },
      {
        "level": "kolay",
        "text": "Aşağıdaki araçlardan hangisi kaldıraç ilkesine dayanır?",
        "options": [
          "Çekiç sapı ile birlikte çivi sökmek",
          "Kaymak",
          "Merdivenden inmek",
          "Top atmak"
        ],
        "answer": 0,
        "explain": "Kaldıraç: destek noktası (fulcrum) ile kuvvet ve yük kollarından oluşur. Çekiçle çivi sökmek, sabitleme noktası (çivi ucu) üzerinde dönerek kuvvet çoğaltması sağlar."
      },
      {
        "level": "kolay",
        "text": "Frenleme sırasında araca karşı etkiyen kuvvet nedir?",
        "options": [
          "Yerçekimi",
          "Sürtünme kuvveti",
          "Manyetik kuvvet",
          "Kaldırma kuvveti"
        ],
        "answer": 1,
        "explain": "Frenleme, tekerlekler ile yol arasındaki sürtünme kuvvetinin artırılmasıyla gerçekleşir; bu kuvvet araca zıt yönde etkir ve hızı azaltır."
      },
      {
        "level": "orta",
        "text": "Kütlesi 3 kg olan bir cisim 12 N net kuvvetle itilince ivmesi kaçtır ve bu Newton'un hangi yasasıdır?",
        "options": [
          "4 m/s² – 1. Yasa",
          "36 m/s² – 3. Yasa",
          "4 m/s² – 2. Yasa",
          "0,25 m/s² – 2. Yasa"
        ],
        "answer": 2,
        "explain": "F = m × a → a = F/m = 12/3 = 4 m/s². Bu Newton'un 2. Yasasının (F=ma) doğrudan uygulamasıdır."
      },
      {
        "level": "orta",
        "text": "Hız-zaman grafiğinde yatay bir doğru ne anlama gelir?",
        "options": [
          "Hız artıyor",
          "Hız azalıyor",
          "Sabit hız (ivme sıfır)",
          "Nesne duruyor"
        ],
        "answer": 2,
        "explain": "Yatay doğru: hız değişmiyor, yani ivme = 0. Bu Newton'un 1. Yasasıyla uyumludur; net kuvvet sıfır demektir."
      },
      {
        "level": "orta",
        "text": "Eğik düzlem (rampa) yardımıyla 500 N ağırlığındaki yükü 1 m yüksekliğe çıkarmak için 250 N kuvvet yeterliyse rampanın uzunluğu kaçtır? (İş = Kuvvet × Yol prensibine göre)",
        "options": [
          "1 m",
          "2 m",
          "4 m",
          "0,5 m"
        ],
        "answer": 1,
        "explain": "İş dengesi: F_rampa × L = W × h → 250 × L = 500 × 1 → L = 2 m. Rampa kuvveti azaltır ama mesafeyi artırır; toplam iş sabittir."
      },
      {
        "level": "orta",
        "text": "Uzayda bir astronot ittiği nesneyle aynı kuvvet neden geri gider?",
        "options": [
          "Yerçekimi var",
          "Newton'un Etki-Tepki Yasası – cisim astronota eşit zıt kuvvet uygular",
          "Uzayda sürtünme yoktur",
          "Astronot daha hafiftir"
        ],
        "answer": 1,
        "explain": "Newton'un 3. Yasası: Astronot nesneye F kuvveti uygularken nesne de astronota -F uygular. Uzayda bunu dengeleyecek sürtünme olmadığından astronot geri gider."
      },
      {
        "level": "orta",
        "text": "Katı yüzeyde kayan bir nesne zamanla duruyor. Bu durumu Newton'un hangi yasasıyla açıklarsınız?",
        "options": [
          "1. Yasa: Sürtünme net kuvveti oluşturur ve hareketi durdurur",
          "2. Yasa: Kütle artıyor",
          "3. Yasa: Tepki kuvveti yok",
          "Yasalarla açıklanamaz"
        ],
        "answer": 0,
        "explain": "1. Yasa: Nesne hareket edecektir; ancak sürtünme kuvveti net kuvvet sağlar ve nesneyi yavaşlatarak durdurur. Sürtünme olmasaydı sonsuza dek kayardı."
      },
      {
        "level": "orta",
        "text": "Makara sistemi kullanarak 200 N ağırlığı 50 N kuvvetle kaldırabilmek için kaç tane hareketli makara gereklidir?",
        "options": [
          "1",
          "2",
          "4",
          "8"
        ],
        "answer": 2,
        "explain": "Her hareketli makara kuvveti ikiye böler: 1 hareketli → 100 N, 2 hareketli → 50 N. 4 hareketli makara gerekir (her ikili 1/2 böler: 200→100→50 N)."
      },
      {
        "level": "zor",
        "text": "Bir füze uzaya fırlatılırken Newton'un hangi yasası onu itmektedir ve mekanizması nedir?",
        "options": [
          "1. Yasa – Sabit hız",
          "2. Yasa – F=ma ile ivme",
          "3. Yasa – Egzoz gazları aşağı atılır, roket yukarı itilir",
          "Yerçekimi kaldırır"
        ],
        "answer": 2,
        "explain": "Newton'un 3. Yasası: Motor gazları büyük hızla aşağı (etki) püskürtülürken füze eşit-zıt tepki kuvvetiyle yukarı itilir."
      },
      {
        "level": "zor",
        "text": "Kütle 4 kat artarsa ve aynı kuvvet uygulanırsa ivme nasıl değişir?",
        "options": [
          "4 kat artar",
          "4 kat azalır",
          "2 kat azalır",
          "Değişmez"
        ],
        "answer": 1,
        "explain": "a = F/m. F sabit, m 4 katına çıkınca a = F/(4m) = (1/4)(F/m). İvme ¼'e düşer, yani 4 kat azalır."
      },
      {
        "level": "zor",
        "text": "Sabit hızda dönen bir salıncaktaki çocuğa yön değiştiren kuvvet nerede ve hangi yönde etkir?",
        "options": [
          "Dışa doğru – merkezkaç kuvveti",
          "Yüzeye teğet – sürtünme",
          "İçe doğru – merkezcil kuvvet (ip gerilmesi)",
          "Yukarı doğru – kaldırma"
        ],
        "answer": 2,
        "explain": "Dairesel harekette merkezcil kuvvet, hareketi çemberin merkezi yönüne saptırır. Salıncakta bu kuvveti ipin gerilmesi sağlar."
      }
    ],
    "Elektrik Enerjisi": [
      {
        "level": "kolay",
        "text": "Elektrik akımının birimi nedir?",
        "options": [
          "Volt",
          "Ohm",
          "Amper",
          "Watt"
        ],
        "answer": 2,
        "explain": "Elektrik akımı (I) amper (A) ile ölçülür; birim zamanda iletken kesitinden geçen yük miktarını ifade eder."
      },
      {
        "level": "kolay",
        "text": "Elektrik geriliminin (voltaj) birimi hangisidir?",
        "options": [
          "Amper",
          "Volt",
          "Ohm",
          "Joule"
        ],
        "answer": 1,
        "explain": "Gerilim (U veya V), iki nokta arasındaki elektrik potansiyel farkıdır; volt (V) birimiyle ifade edilir."
      },
      {
        "level": "kolay",
        "text": "Ohm Yasası hangi formülle ifade edilir?",
        "options": [
          "U = I + R",
          "U = I × R",
          "U = I / R",
          "I = U × R"
        ],
        "answer": 1,
        "explain": "Ohm Yasası: U (Volt) = I (Amper) × R (Ohm). Gerilim, akım ile direncin çarpımına eşittir."
      },
      {
        "level": "kolay",
        "text": "Elektrik gücünün birimi ve formülü nedir?",
        "options": [
          "Joule – P = U / I",
          "Watt – P = U × I",
          "Amper – P = R × I",
          "Volt – P = U + I"
        ],
        "answer": 1,
        "explain": "Elektrik gücü P = U × I (Watt). Güç; gerilim ile akımın çarpımına eşittir. Ayrıca P = I² × R formülüyle de hesaplanabilir."
      },
      {
        "level": "kolay",
        "text": "1 kWh (kilowatt-saat) kaç joule'e eşittir?",
        "options": [
          "1.000 J",
          "3.600 J",
          "3.600.000 J",
          "1.000.000 J"
        ],
        "answer": 2,
        "explain": "1 kWh = 1.000 W × 3.600 s = 3.600.000 J = 3,6 MJ. Elektrik sayaçları tüketimi kWh cinsinden ölçer."
      },
      {
        "level": "kolay",
        "text": "Mıknatıs ve manyetik malzeme arasındaki kuvvet hangi tür kuvvettir?",
        "options": [
          "Yerçekimi",
          "Elektrostatik",
          "Manyetik",
          "Sürtünme"
        ],
        "answer": 2,
        "explain": "Manyetik kuvvet, mıknatıslar ve manyetik malzemeler (demir, nikel, kobalt) arasında temas olmaksızın etki eder."
      },
      {
        "level": "orta",
        "text": "12 V gerilimle çalışan bir devrede 3 Ω direnç varsa akım kaç amperdir?",
        "options": [
          "4 A",
          "36 A",
          "0,25 A",
          "9 A"
        ],
        "answer": 0,
        "explain": "Ohm Yasası: I = U / R = 12 / 3 = 4 A."
      },
      {
        "level": "orta",
        "text": "2 Ω ve 4 Ω'luk iki direnç seri bağlanırsa toplam direnç kaçtır?",
        "options": [
          "2 Ω",
          "4 Ω",
          "6 Ω",
          "8 Ω"
        ],
        "answer": 2,
        "explain": "Seri bağlı dirençlerde: R_toplam = R₁ + R₂ = 2 + 4 = 6 Ω."
      },
      {
        "level": "orta",
        "text": "2 Ω ve 4 Ω'luk iki direnç paralel bağlanırsa toplam direnç kaçtır?",
        "options": [
          "6 Ω",
          "2 Ω",
          "1,33 Ω",
          "8 Ω"
        ],
        "answer": 2,
        "explain": "Paralel: 1/R = 1/2 + 1/4 = 2/4 + 1/4 = 3/4 → R = 4/3 ≈ 1,33 Ω. Paralel bağlantıda toplam direnç her bir dirençten küçüktür."
      },
      {
        "level": "orta",
        "text": "1000 W gücündeki bir fırın günde 2 saat çalışıyorsa aylık (30 gün) ne kadar enerji harcar?",
        "options": [
          "60 kWh",
          "30 kWh",
          "2 kWh",
          "600 kWh"
        ],
        "answer": 0,
        "explain": "Günlük: 1 kW × 2 h = 2 kWh. Aylık: 2 × 30 = 60 kWh."
      },
      {
        "level": "orta",
        "text": "Elektromanyetizma nedir?",
        "options": [
          "Mıknatısin yerçekimiyle etkileşimi",
          "Elektrik akımının geçtiği iletkenin çevresinde manyetik alan oluşturması",
          "Statik elektriğin manyetik etkisi",
          "Işığın manyetik kuvvet oluşturması"
        ],
        "answer": 1,
        "explain": "Elektromanyetizma: Elektrik akımı geçen iletken çevresinde manyetik alan oluşur. Bu ilke elektrik motorları, transformatörler ve jeneratörlerin temelidir."
      },
      {
        "level": "orta",
        "text": "Elektrik motoru hangi enerji dönüşümünü gerçekleştirir?",
        "options": [
          "Mekanik → Elektrik",
          "Isı → Elektrik",
          "Elektrik → Mekanik (hareket)",
          "Kimyasal → Isı"
        ],
        "answer": 2,
        "explain": "Elektrik motoru, elektrik enerjisini döner hareket (mekanik enerji) enerjisine dönüştürür. Jeneratör ise tersi dönüşümü yapar."
      },
      {
        "level": "orta",
        "text": "Transformatör ne işe yarar?",
        "options": [
          "Akım üretir",
          "AC gerilimi yükseltir veya düşürür",
          "Direnci değiştirir",
          "DC'yi AC'ye çevirir"
        ],
        "answer": 1,
        "explain": "Transformatörler alternatif akım (AC) gerilimini, bobin sarım oranlarıyla yükseltir ya da düşürür. Elektrik iletiminde kayıpları azaltmak için yüksek gerilim kullanılır."
      },
      {
        "level": "zor",
        "text": "Seri devrede toplam direnç arttıkça akım nasıl değişir? (Gerilim sabit)",
        "options": [
          "Artar",
          "Azalır",
          "Değişmez",
          "Önce artar sonra azalır"
        ],
        "answer": 1,
        "explain": "I = U/R. U sabit, R arttıkça I azalır. Seri devreye eklenen her direnç toplam direnci artırır ve akımı düşürür."
      },
      {
        "level": "zor",
        "text": "Neden yüksek gerilimli elektrik hatları tehlikelidir? Havada temas olmadan bile neden elektrik çarpabilir?",
        "options": [
          "Manyetik alan nedeniyle",
          "Yüksek gerilimde hava yalıtkanlığı bozulabilir; ark (kıvılcım) oluşarak temas olmadan iletim sağlanabilir",
          "Işıma nedeniyle",
          "Ses dalgası nedeniyle"
        ],
        "answer": 1,
        "explain": "Çok yüksek gerilimde (100.000 V üzeri) hava iyonize olabilir ve elektrik ark (kıvılcım) biçiminde atlayabilir. Bu nedenle yüksek gerilim hatlarına belirli mesafede yaklaşmak tehlikelidir."
      },
      {
        "level": "zor",
        "text": "Doğru akım (DC) ile alternatif akım (AC) arasındaki fark ve kullanım alanları nelerdir?",
        "options": [
          "DC hızlıdır, evde kullanılır; AC yavaştır, pillerde kullanılır",
          "DC tek yönde akar (pil, batarya); AC yön değiştirir (50/60 Hz) ve ev elektriği, uzun mesafe iletim için kullanılır",
          "İkisi aynıdır",
          "AC pilde, DC evde kullanılır"
        ],
        "answer": 1,
        "explain": "DC: Tek yönlü akım; piller, güneş panelleri. AC: Yön değiştiren akım (Türkiye'de 50 Hz, 220 V); ev elektriği ve uzun mesafeli iletimde verimli."
      }
    ],
    "Bitkiler ve Hayvanlarda Üreme": [
      {
        "level": "kolay",
        "text": "Eşeyli üreme ile eşeysiz üreme arasındaki temel fark nedir?",
        "options": [
          "Eşeyli üreme daha hızlıdır",
          "Eşeyli üremede iki ebeveynden gelen genetik materyal birleşir; eşeysizde tek ebeveyn kopyalanır",
          "Eşeysiz üreme genetik çeşitlilik sağlar",
          "İkisi aynıdır"
        ],
        "answer": 1,
        "explain": "Eşeyli üreme: sperm + yumurta → genetik çeşitlilik artar. Eşeysiz üreme: tek ebeveyn; döl ebeveynin genetik kopyasıdır."
      },
      {
        "level": "kolay",
        "text": "Çiçekli bitkilerde erkek üreme hücreleri nerede üretilir?",
        "options": [
          "Dişi organ (pistil)",
          "Erkek organ (stamen) – anter kısmında",
          "Yapraklarda",
          "Gövdede"
        ],
        "answer": 1,
        "explain": "Polen taneleri, çiçeğin erkek organı olan stamenin anter bölümünde üretilir."
      },
      {
        "level": "kolay",
        "text": "Tozlaşma nedir?",
        "options": [
          "Tohumun çimlenmesi",
          "Polenlerin aynı veya başka bitkinin dişi organına taşınması",
          "Meyvenin oluşması",
          "Tohumun yayılması"
        ],
        "answer": 1,
        "explain": "Tozlaşma; erkek organın anterindeki polenlerin rüzgar, böcek, su gibi etkenlerle dişi organın tepecik (stigma) bölümüne taşınmasıdır."
      },
      {
        "level": "kolay",
        "text": "Aşağıdakilerden hangisi eşeysiz üreme yöntemidir?",
        "options": [
          "Döllenme",
          "Tohum oluşumu",
          "Çilek bitkisinin yayıcıyla (stolon) çoğalması",
          "Tozlaşma"
        ],
        "answer": 2,
        "explain": "Çilekte stolonlar (yayıcılar) toprak üstünden uzanır ve yeni bitkicikler oluşturur; bu eşeysiz (vejetatif) üremedir."
      },
      {
        "level": "kolay",
        "text": "Hayvanlarda iç döllenme ile dış döllenme arasındaki fark nedir?",
        "options": [
          "İç döllenme balıklarda görülür",
          "Dış döllenme memelilerde görülür",
          "İç döllenme; döllenme vücut içinde, dış döllenme; vücut dışında gerçekleşir",
          "İkisi aynı sonucu verir"
        ],
        "answer": 2,
        "explain": "İç döllenme: Memeliler ve kuşlarda, yumurta anne vücudu içinde döllenir. Dış döllenme: Balık ve kurbağalarda, yumurta ve sperm su ortamında buluşur."
      },
      {
        "level": "kolay",
        "text": "Tohumun çimlenmesi için hangi koşullar gereklidir?",
        "options": [
          "Yalnızca su",
          "Yalnızca ışık",
          "Su, uygun sıcaklık ve oksijen",
          "Işık ve karbon dioksit"
        ],
        "answer": 2,
        "explain": "Çimlenme için temel koşullar: yeterli nem (su), uygun sıcaklık ve oksijen. Çimlenme başlamak için ışık genellikle zorunlu değildir."
      },
      {
        "level": "orta",
        "text": "Çapraz tozlaşmanın (farklı bitkiler arası) aynı bitkiye göre avantajı nedir?",
        "options": [
          "Daha hızlıdır",
          "Genetik çeşitlilik sağlar; döllerin hastalık ve çevresel değişime uyum kapasitesi artar",
          "Daha az enerji gerektirir",
          "Tohum sayısı azalır"
        ],
        "answer": 1,
        "explain": "Çapraz tozlaşmada farklı bireylerden gelen genler birleşir; bu oluşan döllerin genetik çeşitliliğini artırır ve popülasyonun adaptasyonunu güçlendirir."
      },
      {
        "level": "orta",
        "text": "Vejetatif üreme yöntemlerinden olan 'daldırma' nasıl gerçekleşir?",
        "options": [
          "Tohum ekilerek",
          "Bitki dalı toprakla temas edip köklendirilir, ardından ana bitkiden ayrılır",
          "Hücre bölünmesiyle",
          "Spor oluşumuyla"
        ],
        "answer": 1,
        "explain": "Daldırma: Dal toprağa bükülüp gömülür; kökler oluştuğunda dal kesilip bağımsız bitki olarak yetiştirilir. Elmada ve incirde yaygın kullanılır."
      },
      {
        "level": "orta",
        "text": "Meyve neden oluşur ve biyolojik işlevi nedir?",
        "options": [
          "Fotosentez artığı",
          "Döllenmeden sonra yumurtalık gelişerek tohumları çevreler; meyveler tohumların yayılmasını kolaylaştırır",
          "Toprağa mineral verir",
          "Su depolamak içindir"
        ],
        "answer": 1,
        "explain": "Döllenme sonrası yumurtalık meyveye dönüşür; tohumları korur. Etli meyveler hayvanlar tarafından yenir ve tohumlar uzak yerlere taşınır."
      },
      {
        "level": "orta",
        "text": "Eşeysiz üremenin eşeyli üremedeki dezavantajı nedir?",
        "options": [
          "Yavaş çoğalmaya yol açar",
          "Genetik çeşitlilik sağlanamaz; tüm bireyler özdeş olduğundan bir hastalık veya değişen çevre tüm popülasyonu tehdit edebilir",
          "Çok enerji harcar",
          "Yalnızca bitkilere özgüdür"
        ],
        "answer": 1,
        "explain": "Eşeysiz üremede oluşan bireyler klondur; genetik çeşitlilik yoktur. Yeni bir hastalık veya çevresel baskı tüm popülasyonu aynı anda etkileyebilir."
      },
      {
        "level": "orta",
        "text": "Hayvansal üremede yumurtadan doğma (ovipar) ile canlı doğurma (vivipar) arasındaki fark nedir?",
        "options": [
          "Ovipar memelilerde görülür",
          "Ovipar: embriyo yumurta içinde gelişir (kuş, sürüngen); vivipar: embriyo ana rahminde gelişir (çoğu memeli)",
          "İkisi aynıdır",
          "Vivipar balıklarda görülür"
        ],
        "answer": 1,
        "explain": "Ovipar: Kuşlar, sürüngenler, çoğu balık. Vivipar: İnsan dahil çoğu memeli. Ovovivipar: Bazı köpekbalığı ve yılanlar (yumurta vücut içinde açılır)."
      },
      {
        "level": "orta",
        "text": "Amphibiler (kurbağa gibi) neden üremek için suya ihtiyaç duyar?",
        "options": [
          "Karada soluyamazlar",
          "Dış döllenme için yumurtaların su ortamında bırakılması ve spermle birleşmesi gerekir",
          "Yemek bulmak için",
          "Isınmak için"
        ],
        "answer": 1,
        "explain": "Amphibiler dış döllenir; yumurta ve sperm su ortamında buluşur. Ayrıca larvalar (iribaş) solungaçla suda solunur; kara yaşamına metamorfozla geçiş yapılır."
      },
      {
        "level": "zor",
        "text": "Klonlama (eşeysiz üreme) ile sentetik tohumların bitki yetiştiriciliğindeki avantaj ve dezavantajı nedir?",
        "options": [
          "Dezavantaj yok; her durumda idealdir",
          "Avantaj: genetik olarak özdeş, yüksek verimli bitkiler hızla üretilir; Dezavantaj: genetik tekbiçimlilik hastalık salgınına karşı savunmasızlık yaratır",
          "Avantaj yok",
          "Yalnızca çiçekli bitkilerde uygulanabilir"
        ],
        "answer": 1,
        "explain": "Klonlama ekonomik açıdan üstün özellikli ürünleri çoğaltır. Ancak genetik tekbiçimlik (uniform), yeni bir patojen veya iklim değişikliğinde tüm mahsulü yok edebilir."
      },
      {
        "level": "zor",
        "text": "Bazı bitkiler hem erkek hem dişi organları aynı çiçekte taşımasına rağmen kendi poleniyle döllenmez (öz uyumsuzluk). Bu mekanizmanın evrimsel önemi nedir?",
        "options": [
          "Enerji tasarrufu sağlar",
          "Kendiliğinden döllenmeyi önleyerek genetik çeşitliliği artırır ve türün hastalık ile çevresel baskılara uyum kapasitesini güçlendirir",
          "Tohum sayısını artırır",
          "Polen kaybını önler"
        ],
        "answer": 1,
        "explain": "Öz-uyumsuzluk (self-incompatibility) mekanizması, bitkilerin kendi poleniyle döllenmesini kimyasal olarak engeller; bu zorunlu çapraz tozlaşmaya yol açar ve genetik çeşitliliği maksimize eder."
      },
      {
        "level": "zor",
        "text": "Metamorfoz nedir? Kurbağa ve kelebekteki metamorfoz süreçleri nasıl karşılaştırılır?",
        "options": [
          "İkisi de tam dönüşüm geçirir",
          "Kurbağa tam olmayan (iribaş→kurbağa); kelebek tam metamorfoz (yumurta→larva→pupa→erişkin) geçirir",
          "İkisi de aynı aşamalardan geçer",
          "Sadece kelebekler metamorfoz geçirir"
        ],
        "answer": 1,
        "explain": "Kurbağa: Yarı metamorfoz; iribaş (larva) solungaçlı ve suda, yetişkin akciğerli ve karada. Kelebek: Tam metamorfoz (holometabol); yumurta→tırtıl (larva)→krizalit (pupa)→erişkin."
      }
    ]
  },
  "7": {
    "Hücre Bölünmesi ve Kalıtım": [
      {
        "level": "kolay",
        "text": "Mitoz bölünmenin temel amacı nedir?",
        "options": [
          "Üreme hücreleri oluşturmak",
          "Büyüme, doku onarımı ve eşeysiz çoğalma",
          "Genetik çeşitlilik sağlamak",
          "Kromozom sayısını yarıya indirmek"
        ],
        "answer": 1,
        "explain": "Mitoz bölünmede oluşan yeni hücreler ana hücreyle özdeş genetik yapıya sahiptir; bu büyüme ve onarım için kullanılır."
      },
      {
        "level": "kolay",
        "text": "Mayoz bölünme hangi hücrelerde gerçekleşir?",
        "options": [
          "Deri hücrelerinde",
          "Karaciğer hücrelerinde",
          "Üreme organlarındaki (gonad) hücrelerde",
          "Sinir hücrelerinde"
        ],
        "answer": 2,
        "explain": "Mayoz, yumurtalık ve erkek üreme bezlerindeki özel hücrelerde gerçekleşerek sperm ve yumurta (gamet) üretir."
      },
      {
        "level": "kolay",
        "text": "İnsan vücut hücrelerinde kaç kromozom bulunur?",
        "options": [
          "23",
          "46",
          "92",
          "2"
        ],
        "answer": 1,
        "explain": "İnsan somatik (vücut) hücrelerinde 46 kromozom (23 çift) bulunur. Her çiftin biri anneden, biri babadan gelir."
      },
      {
        "level": "kolay",
        "text": "Gen nedir?",
        "options": [
          "Bir protein türü",
          "DNA üzerinde belirli bir özelliği kodlayan bölüm",
          "Hücre zarının yapı birimi",
          "Bir enzim türü"
        ],
        "answer": 1,
        "explain": "Gen; DNA zincirinin belirli bir özelliği (göz rengi, kan grubu vb.) kodlayan ve kalıtımla aktarılan segmentidir."
      },
      {
        "level": "kolay",
        "text": "Kalıtım ne anlama gelir?",
        "options": [
          "Çevreden öğrenilen özellikler",
          "Ebeveynlerden döllerde aktarılan özellikler",
          "Beslenmeyle kazanılan nitelikler",
          "Hastalıkların bulaşması"
        ],
        "answer": 1,
        "explain": "Kalıtım; ebeveynlerin DNA'larında taşıdıkları genetik bilginin yumurta ve sperm aracılığıyla nesillere aktarılmasıdır."
      },
      {
        "level": "kolay",
        "text": "DNA'nın temel yapı taşları (monomerler) nelerdir?",
        "options": [
          "Amino asitler",
          "Yağ asitleri",
          "Nükleotidler",
          "Monosakkaritler"
        ],
        "answer": 2,
        "explain": "DNA, nükleotidlerden oluşur. Her nükleotid; fosfat, deoksiriboz şekeri ve dört azotlu bazdan (A, T, G, C) birinden oluşur."
      },
      {
        "level": "orta",
        "text": "Mitoz ve mayoz bölünme karşılaştırıldığında temel fark nedir?",
        "options": [
          "Mitoz 4 hücre, mayoz 2 hücre üretir",
          "Mitoz kromozom sayısını korur; mayoz kromozom sayısını yarıya indirir ve 4 hücre üretir",
          "Mayoz sadece büyüme içindir",
          "İkisi de aynı aşamaları geçer"
        ],
        "answer": 1,
        "explain": "Mitoz: 2n → 2n (diploid hücreler). Mayoz: 2n → n (haploid gametler, 4 hücre). Mayozda genetik rekombinasyon çeşitliliği artırır."
      },
      {
        "level": "orta",
        "text": "Dominant ve resesif gen kavramlarını açıklayan seçenek hangisidir?",
        "options": [
          "Dominant gen yalnızca homozigot bireylerde görünür",
          "Dominant gen tek kopya olsa bile fenotipte görünür; resesif gen yalnızca iki kopya (homozigot) varsa görünür",
          "Resesif gen her zaman baskındır",
          "İkisi de eşit etki gösterir"
        ],
        "answer": 1,
        "explain": "Dominant alel (büyük harf, örn. A) tek kopya olsa bile özelliği gösterir. Resesif alel (küçük harf, a) yalnızca aa durumunda kendini gösterir."
      },
      {
        "level": "orta",
        "text": "Heterozigot (Aa) bir bireyle homozigot resesif (aa) bireyin çaprazlanmasından oluşan yavrular hangi oranda dağılır?",
        "options": [
          "Hepsi Aa",
          "%25 AA, %25 Aa, %50 aa",
          "50 Aa, 50 aa",
          "Hepsi aa"
        ],
        "answer": 2,
        "explain": "Punnett karesi: Aa × aa → Aa : aa = 1:1 (50 Aa, 50 aa). Yavruların %50'si taşıyıcı (Aa), %50'si resesif (aa) fenotip gösterir."
      },
      {
        "level": "orta",
        "text": "Mutasyon nedir ve neden önem taşır?",
        "options": [
          "Protein sentezinin durmasıdır",
          "DNA dizisindeki kalıcı değişikliktir; hastalığa, evrime veya yararlı özelliklere yol açabilir",
          "Hücre bölünmesinin durmasıdır",
          "Yalnızca zararlıdır"
        ],
        "answer": 1,
        "explain": "Mutasyon, DNA dizisinde kendiliğinden veya çevresel etkenlerle oluşan kalıcı değişimdir. Kanser gibi hastalıklara yol açabileceği gibi evrimin temel kaynağıdır."
      },
      {
        "level": "orta",
        "text": "İkiz kardeşlerden biri gözlük takarken diğeri takmıyorsa bu ikizler tek yumurta mı yoksa çift yumurta ikizi midir? Neden?",
        "options": [
          "Tek yumurta; çünkü fenotip aynıdır",
          "Çift yumurta; çünkü genetik olarak özdeş tek yumurta ikizleri aynı göz kusuruna sahip olmalıdır",
          "Tek yumurta; çünkü çevre farkı yeterlidir",
          "Belirlenemez"
        ],
        "answer": 1,
        "explain": "Tek yumurta ikizleri genetik olarak %100 özdeştir; kalıtsal bir göz kusuru her ikisinde de görülür. Görsel farklılık çift yumurta ikizliğine işaret eder."
      },
      {
        "level": "orta",
        "text": "Kanserin temel nedeni nedir?",
        "options": [
          "Virüs enfeksiyonu",
          "DNA hasarı veya mutasyon sonucu hücre bölünmesinin kontrolden çıkması",
          "Aşırı protein sentezi",
          "Hücre zarı tahribatı"
        ],
        "answer": 1,
        "explain": "Kanser; hücre döngüsünü düzenleyen genlerdeki (onkogen, tümör baskılayıcı gen) mutasyonlar sonucu hücrelerin kontrolsüz çoğalmasıdır."
      },
      {
        "level": "zor",
        "text": "Mayoz I ve mayoz II arasındaki temel fark nedir?",
        "options": [
          "İkisi aynıdır",
          "Mayoz I homolog çiftleri ayırır (rekombinasyon olur); mayoz II kardeş kromatidleri ayırır",
          "Mayoz II homolog çiftleri ayırır",
          "Mayoz I DNA kopyalamaz"
        ],
        "answer": 1,
        "explain": "Mayoz I: Homolog kromozom çiftleri (tetratlar) ayrılır; geçiş (crossing over) genetik çeşitlilik sağlar. Mayoz II: Mitoz benzeri; kardeş kromatidler ayrılır. Sonuç: 4 haploid hücre."
      },
      {
        "level": "zor",
        "text": "AaBb × AaBb çaprazlamasında sarı-yuvarlak (A_B_) fenotipinin görülme olasılığı nedir?",
        "options": [
          "1/4",
          "1/2",
          "9/16",
          "3/4"
        ],
        "answer": 2,
        "explain": "Dihybrid çaprazlama: AaBb × AaBb → 9:3:3:1 oranı. A_B_ (dominant-dominant) = 9/16 ≈ %56 olasılıkla görülür."
      },
      {
        "level": "zor",
        "text": "X'e bağlı resesif bir hastalık (örn. hemofili) neden erkeklerde daha sık görülür?",
        "options": [
          "Erkekler X'i anneden alır",
          "Erkeklerde tek X kromozomu var; X'te resesif alel taşınırsa kompanse eden sağlıklı alel bulunmaz",
          "Erkeklerde Y daha küçük olduğundan",
          "Kadınlar hasta olmaz"
        ],
        "answer": 1,
        "explain": "Erkekler (XY): Tek X; resesif alel taşınırsa hastalık belirginleşir. Kadınlar (XX): İki X; sağlıklı dominant alel hastalığı maskeler → taşıyıcı olabilirler."
      }
    ],
    "Kuvvet ve Enerji": [
      {
        "level": "kolay",
        "text": "İş (W) ne zaman yapılmış sayılır?",
        "options": [
          "Kuvvet uygulandığında",
          "Cisim kuvvet doğrultusunda hareket ettiğinde",
          "Enerji tüketildiğinde",
          "Zaman geçtiğinde"
        ],
        "answer": 1,
        "explain": "Fiziksel anlamda iş = kuvvet × kuvvet yönündeki yer değiştirme. Kuvvet uygulanmasına rağmen cisim hareket etmiyorsa iş sıfırdır."
      },
      {
        "level": "kolay",
        "text": "Bir cismin hareket enerjisi nedir ve formülü nedir?",
        "options": [
          "Potansiyel enerji – E = mgh",
          "Kinetik enerji – E = ½mv²",
          "Isı enerjisi – E = mcΔT",
          "Kimyasal enerji – E = mc²"
        ],
        "answer": 1,
        "explain": "Kinetik enerji, hareket halindeki bir cismin sahip olduğu enerjidir. Formülü: Ek = ½ × m × v²."
      },
      {
        "level": "kolay",
        "text": "Bir cisim yüksekliğe çıkarıldığında ne tür enerji kazanır?",
        "options": [
          "Kinetik enerji",
          "Kimyasal enerji",
          "Potansiyel (konum) enerji",
          "Isı enerjisi"
        ],
        "answer": 2,
        "explain": "Yerçekimi alanında yükselen cisim potansiyel enerji kazanır. Ep = m × g × h formülüyle hesaplanır."
      },
      {
        "level": "kolay",
        "text": "Enerjinin korunumu yasası ne demektir?",
        "options": [
          "Enerji yoktan var edilir",
          "Enerji bir biçimden başkasına dönüşebilir ama toplam miktar değişmez",
          "Enerji sürekli azalır",
          "Enerji yalnızca ısıya dönüşür"
        ],
        "answer": 1,
        "explain": "Enerjinin korunumu: Enerji yaratılamaz ve yok edilemez; yalnızca biçim değiştirir. Kapalı sistemde toplam enerji sabittir."
      },
      {
        "level": "kolay",
        "text": "Güç (P) neyi ölçer ve birimi nedir?",
        "options": [
          "Yapılan toplam işi – Joule",
          "Birim zamanda yapılan işi – Watt",
          "Uygulanan kuvveti – Newton",
          "Enerji birikimini – kWh"
        ],
        "answer": 1,
        "explain": "Güç: P = İş / Zaman = W / t. Birimi Watt (W) = J/s. Güç, işin ne kadar hızlı yapıldığını gösterir."
      },
      {
        "level": "kolay",
        "text": "Yenilenebilir enerji kaynakları arasında hangisi yer almaz?",
        "options": [
          "Güneş enerjisi",
          "Rüzgar enerjisi",
          "Doğal gaz",
          "Hidroelektrik"
        ],
        "answer": 2,
        "explain": "Doğal gaz fosil yakıttır; rezervler tükenince yenilenemez. Güneş, rüzgar ve su sürekli yenilenen kaynaklardır."
      },
      {
        "level": "orta",
        "text": "Kütlesi 5 kg olan bir cisim 4 m/s hızla hareket ediyor. Kinetik enerjisi kaçtır?",
        "options": [
          "20 J",
          "40 J",
          "80 J",
          "160 J"
        ],
        "answer": 1,
        "explain": "Ek = ½ × m × v² = ½ × 5 × 4² = ½ × 5 × 16 = 40 J."
      },
      {
        "level": "orta",
        "text": "Kütlesi 10 kg olan bir cisim 5 m yüksekliğe kaldırılıyor. (g = 10 m/s²) Potansiyel enerjisi kaçtır?",
        "options": [
          "50 J",
          "500 J",
          "5 J",
          "5000 J"
        ],
        "answer": 1,
        "explain": "Ep = m × g × h = 10 × 10 × 5 = 500 J."
      },
      {
        "level": "orta",
        "text": "Bir cisim serbest düşerken enerji dönüşümü nasıl gerçekleşir?",
        "options": [
          "Kinetik → Potansiyel",
          "Potansiyel → Kinetik",
          "Isı → Potansiyel",
          "Kimyasal → Kinetik"
        ],
        "answer": 1,
        "explain": "Serbest düşen cisimde yükseklik azaldıkça potansiyel enerji azalır; bu enerji kinetik enerjiye dönüşür. Toplam mekanik enerji sabit kalır (sürtünmesiz ortamda)."
      },
      {
        "level": "orta",
        "text": "Verim (randıman) nedir ve formülü nedir?",
        "options": [
          "Faydalı enerji / Harcanan enerji × 100",
          "Harcanan enerji / Faydalı enerji × 100",
          "Güç / Zaman × 100",
          "İş / Kuvvet × 100"
        ],
        "answer": 0,
        "explain": "Verim = (Faydalı enerji çıkışı / Toplam enerji girişi) × 100. Gerçek makinelerde sürtünme nedeniyle verim her zaman %100'den küçüktür."
      },
      {
        "level": "orta",
        "text": "Sürtünmeli bir yüzeyde kayan cismin kinetik enerjisi nereye dönüşür?",
        "options": [
          "Potansiyel enerjiye",
          "Kimyasal enerjiye",
          "Isı enerjisine (ve ses)",
          "Elektrik enerjisine"
        ],
        "answer": 2,
        "explain": "Sürtünme kuvveti kinetik enerjiyi ısıya (ve az miktarda sese) dönüştürür. Bu nedenle sürtünmeli sistemlerde toplam mekanik enerji azalır."
      },
      {
        "level": "orta",
        "text": "Güneş panelleri hangi enerji dönüşümünü gerçekleştirir?",
        "options": [
          "Isı → Elektrik",
          "Mekanik → Elektrik",
          "Işık (güneş) → Elektrik",
          "Kimyasal → Elektrik"
        ],
        "answer": 2,
        "explain": "Fotovoltaik güneş panelleri, güneş fotonlarının silikon yarı iletkenlerle etkileşimiyle (fotoelektrik etki) ışık enerjisini doğrudan elektrik enerjisine dönüştürür."
      },
      {
        "level": "zor",
        "text": "2000 W gücünde bir makine 5 saniyede kaç joule iş yapar?",
        "options": [
          "400 J",
          "2000 J",
          "5000 J",
          "10.000 J"
        ],
        "answer": 3,
        "explain": "P = W / t → W = P × t = 2000 × 5 = 10.000 J."
      },
      {
        "level": "zor",
        "text": "Sarkacın en yüksek noktasındaki ve en alçak noktasındaki enerjileri karşılaştırınız. (Sürtünmesiz kabul edilsin)",
        "options": [
          "Her iki noktada da enerji eşit ve yalnızca kinetiktir",
          "En yüksekte yalnızca potansiyel, en alçakta yalnızca kinetik; toplam mekanik enerji her noktada eşittir",
          "En alçakta potansiyel enerji maksimum",
          "En yüksekte enerji sıfırdır"
        ],
        "answer": 1,
        "explain": "Sürtünmesiz sarkaçta: En yüksek noktada v=0, Ek=0, Ep=max. En alçak noktada h=0, Ep=0, Ek=max. Mekanik enerji (Ek+Ep) her noktada sabittir."
      },
      {
        "level": "zor",
        "text": "Bir hidroelektrik santralde enerji dönüşüm zincirini sıralayınız.",
        "options": [
          "Güneş → Kimyasal → Elektrik",
          "Yerçekimi potansiyel enerji → Kinetik (su akışı) → Türbin mekanik → Jeneratörde elektrik",
          "Isı → Buhar → Elektrik",
          "Nükleer → Isı → Elektrik"
        ],
        "answer": 1,
        "explain": "Barajda biriken su yükseklik nedeniyle potansiyel enerji taşır → Düşen su kinetik enerjiye dönüşür → Türbinleri döndürür (mekanik) → Jeneratör elektrik üretir."
      }
    ],
    "Saf Madde ve Karışımlar": [
      {
        "level": "kolay",
        "text": "Element ve bileşik arasındaki fark nedir?",
        "options": [
          "İkisi aynıdır",
          "Element: tek tür atomdan; bileşik: iki veya daha fazla farklı elementten oluşur",
          "Bileşik tek atomdan oluşur",
          "Element birden fazla elementten oluşur"
        ],
        "answer": 1,
        "explain": "Element: Tek tür atom (Au, Fe, O₂). Bileşik: Farklı elementlerin kimyasal birleşimi (H₂O, NaCl, CO₂)."
      },
      {
        "level": "kolay",
        "text": "Homojen ve heterojen karışımlar arasındaki fark nedir?",
        "options": [
          "Homojen görünür farklılık var; heterojen yok",
          "Homojen her noktada aynı bileşim; heterojen bölgeden bölgeye değişir",
          "İkisi aynıdır",
          "Heterojen çözünmüş maddedir"
        ],
        "answer": 1,
        "explain": "Homojen (çözelti): Her yerde aynı bileşim, tek faz (tuzlu su). Heterojen: Farklı bileşimli bölgeler var, gözle fark edilebilir (salata, granit)."
      },
      {
        "level": "kolay",
        "text": "Çözücü ve çözünen nedir? Bir örnekle açıklayınız.",
        "options": [
          "Çözücü = az olan; çözünen = çok olan",
          "Çözücü daha fazla olan (su); çözünen daha az olan (tuz); birlikte çözelti oluştururlar",
          "İkisi aynı oranda olmalı",
          "Çözücü katıdır"
        ],
        "answer": 1,
        "explain": "Çözelti: Çözücü (genellikle su) + çözünen (örn. şeker). Su, evrensel çözücüdür; çözücü genellikle baskın bileşendir."
      },
      {
        "level": "kolay",
        "text": "Aşağıdakilerden hangisi saf maddedir?",
        "options": [
          "Hava",
          "Tuzlu su",
          "Demir (Fe)",
          "Granit"
        ],
        "answer": 2,
        "explain": "Demir (Fe), yalnızca demir atomlarından oluştuğu için element ve saf maddedir. Diğerleri karışımdır."
      },
      {
        "level": "kolay",
        "text": "Süzme yöntemi hangi tür karışımları ayırmak için kullanılır?",
        "options": [
          "Tamamen çözünmüş maddeler",
          "Katı-sıvı karışımları (katı parçacıklar sıvıda dağılmış)",
          "Gaz karışımları",
          "Homojen çözeltiler"
        ],
        "answer": 1,
        "explain": "Süzme, sıvı içindeki çözünmemiş katı parçacıkları ayırmak için kullanılır. Filtre kağıdı küçük deliklerinden sıvıyı geçirir, katıyı tutar."
      },
      {
        "level": "kolay",
        "text": "Çözünürlük nedir?",
        "options": [
          "Bir maddenin yoğunluğu",
          "Belirli sıcaklıkta belirli miktarda çözücüde çözünebilen maksimum çözünen miktarı",
          "Maddenin erime noktası",
          "İki maddenin karışım hızı"
        ],
        "answer": 1,
        "explain": "Çözünürlük: Belirli sıcaklık ve basınçta, belirli miktarda çözücüde (genellikle 100 g su) çözünebilen maksimum çözünen miktarı (g)."
      },
      {
        "level": "orta",
        "text": "Damıtma (distilasyon) yöntemi ne için kullanılır?",
        "options": [
          "Katı-katı karışımları ayırmak için",
          "Farklı kaynama noktalarındaki sıvı karışımları ayırmak için",
          "Katı-sıvı ayırmak için",
          "Mıknatısla ayırmak için"
        ],
        "answer": 1,
        "explain": "Damıtmada karışım ısıtılır; kaynama noktası düşük bileşen önce buharlaşır, soğutulur ve ayrı kaplandır. Deniz suyundan tatlı su üretimi ve alkol damıtma örnektir."
      },
      {
        "level": "orta",
        "text": "Konsantrasyon (derişim) kavramı ne anlama gelir?",
        "options": [
          "Çözücünün miktarı",
          "Birim hacim veya kütle çözeltideki çözünen miktarı",
          "Çözeltinin rengi",
          "Maddenin yoğunluğu"
        ],
        "answer": 1,
        "explain": "Konsantrasyon: C = çözünen miktarı / çözelti hacmi (örn. g/L veya mol/L). Yüksek konsantrasyon → kuvvetli (derişik) çözelti."
      },
      {
        "level": "orta",
        "text": "Sıcaklık artışının katı maddelerin çözünürlüğüne etkisi nedir?",
        "options": [
          "Azaltır",
          "Değiştirmez",
          "Genellikle artırır",
          "Her zaman iki katına çıkarır"
        ],
        "answer": 2,
        "explain": "Çoğu katı için sıcaklık arttıkça çözünürlük artar (endotermik çözünme). Örneğin sıcak çayda daha fazla şeker çözülür."
      },
      {
        "level": "orta",
        "text": "Koloit (kolloidal karışım) ne anlama gelir? Örnekle açıklayınız.",
        "options": [
          "Homojen çözeltiyle aynıdır",
          "Parçacıklar çözeltiden büyük ama süspansiyondan küçük (1–1000 nm); süt, jöle örnektir",
          "Katı-katı karışımıdır",
          "Gözle görülebilir parçacıkları vardır"
        ],
        "answer": 1,
        "explain": "Koloidal sistemde parçacıklar 1–1000 nm arasıdır; çökelmez ama süzülemez. Süt (yağ-su), jelatin, duman koloide örnektir. Tyndall etkisi gösterirler."
      },
      {
        "level": "orta",
        "text": "Kağıt kromatografisi hangi ilkeye dayanır ve ne için kullanılır?",
        "options": [
          "Yoğunluk farkı",
          "Bileşenlerin çözücüde farklı hızlarda hareket etmesi (polarite ve çözünürlük); boya ve bitki pigmentlerini ayırmak için",
          "Manyetik özellik",
          "Kaynama noktası farkı"
        ],
        "answer": 1,
        "explain": "Kromatografide çözücü (etken faz) kağıtta yükselir; farklı bileşenler farklı mesafelere taşınır. Bitki klorofili veya mürekkep ayrımı için kullanılır."
      },
      {
        "level": "orta",
        "text": "Asit yağmuru neden oluşur ve çevresel etkisi nedir?",
        "options": [
          "CO₂'nin yağmur suyuyla birleşmesinden; etkisi yoktur",
          "SO₂ ve NOₓ'nin atmosferde suyla reaksiyona girerek H₂SO₄ ve HNO₃ oluşturmasından; ormanlara, göllere ve yapılara zarar verir",
          "Ozon tabakasından",
          "Suyun donmasından"
        ],
        "answer": 1,
        "explain": "Fosil yakıt yanması SO₂ ve NOₓ salar. Bunlar atmosferdeki su buharıyla tepkimeye girerek sülfürik ve nitrik asit oluşturur. Asit yağmuru ormanları, gölleri ve yapıları tahrip eder."
      },
      {
        "level": "zor",
        "text": "Aşırı doymuş çözelti nedir ve nasıl oluşturulur?",
        "options": [
          "Çözünen miktarı minimumda tutulur",
          "Normal çözünürlüğün üzerinde çözünen barındıran kararsız çözeltidir; yüksek sıcaklıkta çözülerek yavaşça soğutmakla elde edilir",
          "Saf çözücüdür",
          "Doymuş çözeltiyle aynıdır"
        ],
        "answer": 1,
        "explain": "Aşırı doymuş çözelti: Sıcakta çözünürlük sınırının üzerinde çözünen hazırlanır, dikkatle soğutulur. Çözelti kararsızdır; kristal eklenmesi veya sarsılma anında kristalizasyon başlatır."
      },
      {
        "level": "zor",
        "text": "Hangi yöntemle ham petrol farklı ürünlere (benzin, motorin, kerosen) ayrılır ve bu yöntemin adı nedir?",
        "options": [
          "Süzme",
          "Kristallendirme",
          "Fraksiyonlu damıtma",
          "Buharlaştırma"
        ],
        "answer": 2,
        "explain": "Fraksiyonlu damıtma: Ham petrol farklı uzunluktaki hidrokarbonların karışımıdır. Rafineri kulelerinde farklı sıcaklıklarda buharlaşan fraksiyonlar ayrılır: LPG, benzin, kerosen, motorin, fuel oil, asfalt."
      },
      {
        "level": "zor",
        "text": "Su arıtma sürecinde hangi aşamalar yer alır?",
        "options": [
          "Yalnızca süzme",
          "Çökeltme, pıhtılaştırma, süzme, aktif kömür adsorpsiyonu ve dezenfeksiyon (klor/UV)",
          "Yalnızca kaynatma",
          "Yalnızca klorla muamele"
        ],
        "answer": 1,
        "explain": "Modern su arıtımı: 1.Çökeltme (büyük parçacıklar), 2.Pıhtılaştırma (küçük askılar), 3.Kum/aktif kömür filtresi, 4.Dezenfeksiyon (klor veya UV). Her aşama farklı kirleticileri uzaklaştırır."
      }
    ],
    "Elektrik Enerjisi ve Manyetizma": [
      {
        "level": "kolay",
        "text": "Manyetik kutuplar arasındaki kuvvet kuralı nedir?",
        "options": [
          "Aynı kutuplar çeker, zıt kutuplar iter",
          "Zıt kutuplar çeker, aynı kutuplar iter",
          "Tüm kutuplar birbirini çeker",
          "Kutupların önemi yoktur"
        ],
        "answer": 1,
        "explain": "Manyetizmada: Zıt kutuplar (K-G) birbirini çeker; aynı kutuplar (K-K veya G-G) birbirini iter."
      },
      {
        "level": "kolay",
        "text": "Elektromıknatıs nedir ve avantajı nedir?",
        "options": [
          "Kalıcı mıknatıs türüdür",
          "Demir çekirdeğe sarılan bobinden akım geçince oluşan mıknatıs; akım kesilince manyetik özellik kaybolur",
          "Plastik çubuktur",
          "Kimyasal madde içerir"
        ],
        "answer": 1,
        "explain": "Elektromıknatıs: İletken sarımdan akım geçince manyetik alan oluşur. Akım kesilince alan söner. Kontrol edilebilirlik, güç ayarı ve açma-kapama imkânı avantajıdır."
      },
      {
        "level": "kolay",
        "text": "Jeneratör (dinamo) hangi enerji dönüşümünü sağlar?",
        "options": [
          "Elektrik → Mekanik",
          "Mekanik → Elektrik",
          "Isı → Elektrik",
          "Kimyasal → Elektrik"
        ],
        "answer": 1,
        "explain": "Jeneratör; manyetik alan içinde dönen iletken sarmalar aracılığıyla mekanik enerjiyi elektrik enerjisine dönüştürür."
      },
      {
        "level": "kolay",
        "text": "Elektrik sayacı neyi ölçer?",
        "options": [
          "Gerilimi",
          "Akımı",
          "Tüketilen elektrik enerjisini (kWh)",
          "Direnci"
        ],
        "answer": 2,
        "explain": "Elektrik sayacı, evlerde tüketilen elektrik enerjisini kWh (kilowatt-saat) cinsinden ölçer."
      },
      {
        "level": "kolay",
        "text": "Elektrik enerjisini ısıya dönüştüren cihazlara örnek veriniz.",
        "options": [
          "Motor, fan",
          "Saç kurutma makinesi, ütü, elektrikli ocak",
          "Lamba, bilgisayar",
          "Ampul, güneş paneli"
        ],
        "answer": 1,
        "explain": "Saç kurutma makinesi, ütü ve elektrikli ocak; elektrik enerjisini doğrudan ısı enerjisine dönüştüren rezistanslı cihazlardır."
      },
      {
        "level": "kolay",
        "text": "Hangi metal mıknatıs tarafından çekilmez?",
        "options": [
          "Demir",
          "Nikel",
          "Kobalt",
          "Bakır"
        ],
        "answer": 3,
        "explain": "Manyetik malzemeler: Demir, nikel ve kobalt. Bakır, alüminyum, çinko manyetik değildir; mıknatıs tarafından çekilmez."
      },
      {
        "level": "orta",
        "text": "220 V gerilimde çalışan ve 5 A akım çeken bir cihazın gücü kaçtır?",
        "options": [
          "44 W",
          "110 W",
          "1100 W",
          "44 kW"
        ],
        "answer": 2,
        "explain": "P = U × I = 220 × 5 = 1100 W = 1,1 kW."
      },
      {
        "level": "orta",
        "text": "Transformatörde birincil bobinde 100 sarım, ikincil bobinde 500 sarım varsa ve birincil gerilim 220 V ise ikincil gerilim kaçtır?",
        "options": [
          "44 V",
          "220 V",
          "1100 V",
          "500 V"
        ],
        "answer": 2,
        "explain": "Dönüşüm oranı: U₂/U₁ = N₂/N₁ → U₂ = 220 × (500/100) = 1100 V. Bu yükseltici transformatördür."
      },
      {
        "level": "orta",
        "text": "Elektromagnetik indüksiyon nedir?",
        "options": [
          "Sabit mıknatısın demir çekme özelliği",
          "Değişen manyetik alanın iletken bobinde EMK (gerilim) oluşturması",
          "Elektrik akımının ısı üretmesi",
          "Mıknatısın polarite değiştirmesi"
        ],
        "answer": 1,
        "explain": "Faraday yasası: Bir manyetik alan içinde değişen akı (alan veya hareket), bobinde elektromanyetik kuvvet (EMK) oluşturur. Bu ilke jeneratör ve transformatörün temelidir."
      },
      {
        "level": "orta",
        "text": "Yenilenebilir enerji kaynaklarının fosil yakıtlara göre temel üstünlüğü nedir?",
        "options": [
          "Daha fazla enerji üretir",
          "Tükenmez ve sera gazı salımı çok düşük olduğundan iklim değişikliğini azaltır",
          "Kurulumu daha ucuzdur",
          "Gece de çalışır"
        ],
        "answer": 1,
        "explain": "Güneş, rüzgar, jeotermal tükenmeyen kaynaklardır. Fosil yakıtların aksine CO₂ ve CH₄ salımı çok düşüktür; bu iklim krizinin hafifletilmesi için kritiktir."
      },
      {
        "level": "orta",
        "text": "Kompas (pusula) nasıl çalışır?",
        "options": [
          "Elektrik akımını algılar",
          "Mıknatıslı ibre Dünya'nın manyetik alanıyla hizalanarak coğrafi kuzeyi gösterir",
          "Güneş yönünü hesaplar",
          "Sıcaklık değişimine göre döner"
        ],
        "answer": 1,
        "explain": "Pusulanın mıknatıslı ibresi, Dünya'nın büyük bir mıknatıs gibi davranması nedeniyle manyetik kuzey kutbuna doğru döner."
      },
      {
        "level": "orta",
        "text": "Güneş panelleri ile rüzgar türbinleri hangi enerji dönüşümlerini gerçekleştirir?",
        "options": [
          "Her ikisi de ısı → elektrik",
          "Güneş: ışık → elektrik; rüzgar: mekanik (rüzgar) → elektrik",
          "Güneş: kimyasal → elektrik; rüzgar: ısı → elektrik",
          "Her ikisi de mekanik → elektrik"
        ],
        "answer": 1,
        "explain": "Güneş panelleri: Fotoelektrik etki → ışık enerjisi elektriğe. Rüzgar türbinleri: Rüzgarın kinetik enerjisi → kanatlar döner → jeneratör → elektrik."
      },
      {
        "level": "zor",
        "text": "Bir evde 5 adet 100 W ampul günde 8 saat, 1 adet 2000 W klima günde 6 saat çalışıyor. Aylık (30 gün) toplam enerji tüketimi kaçtır?",
        "options": [
          "120 kWh",
          "480 kWh",
          "360 kWh",
          "240 kWh"
        ],
        "answer": 1,
        "explain": "Ampuller: 5 × 100 W × 8 h × 30 = 120.000 Wh = 120 kWh. Klima: 1 × 2000 W × 6 h × 30 = 360.000 Wh = 360 kWh. Toplam: 120 + 360 = 480 kWh."
      },
      {
        "level": "zor",
        "text": "MRI (Manyetik Rezonans Görüntüleme) hangi fizik ilkesine dayanır?",
        "options": [
          "X ışını soğurumu",
          "Güçlü manyetik alan ve radyo dalgalarının vücuttaki hidrojen atomlarının nükleer spinlerini uyarması ve bu sinyalin görüntüye dönüştürülmesi",
          "Ultrason yansıması",
          "Elektrik akımının vücuttan geçirilmesi"
        ],
        "answer": 1,
        "explain": "MRI: Güçlü manyetik alan hidrojen çekirdeklerini hizalar. Radyo dalgası bu çekirdekleri uyarır. Relaksasyon sinyali alınarak doku görüntüsü oluşturulur. X ışını içermez."
      },
      {
        "level": "zor",
        "text": "Akıllı şebekelerin (smart grid) geleneksel elektrik şebekelerinden farkı ve avantajı nedir?",
        "options": [
          "Daha çok enerji üretir",
          "İki yönlü iletişimle enerji akışını optimize eder; yenilenebilir kaynakları entegre eder, enerji israfını azaltır",
          "Yalnızca nükleer enerjiyle çalışır",
          "Kablolar olmadan iletim sağlar"
        ],
        "answer": 1,
        "explain": "Akıllı şebeke: Tüketici-üretici arasında iki yönlü veri ve enerji akışı sağlar. Talep yönetimi, yenilenebilir entegrasyonu ve arıza tespiti için sensörler kullanır; verimliliği artırır."
      }
    ],
    "Yer Kabuğu Nelerden Oluşur?": [
      {
        "level": "kolay",
        "text": "Mineral nedir?",
        "options": [
          "Her türlü kayaç",
          "Belirli kimyasal bileşim ve kristal yapıya sahip, doğal oluşumlu katı madde",
          "Toprak türüdür",
          "Fosil kalıntısıdır"
        ],
        "answer": 1,
        "explain": "Mineral; doğal, inorganik, katı ve belirli kimyasal bileşime (kuvars SiO₂, kalsit CaCO₃ gibi) sahip, kristal yapıda maddelerdir."
      },
      {
        "level": "kolay",
        "text": "Kayaçlar nasıl oluşur?",
        "options": [
          "Bitkilerin birikmesiyle",
          "Bir veya birden fazla mineralin doğal süreçlerle bir araya gelmesiyle",
          "Deniz suyunun buharlaşmasıyla",
          "Güneş ışığının yansımasıyla"
        ],
        "answer": 1,
        "explain": "Kayaçlar; magmatik (soğuma), tortul (çökelme-birikim) ve başkalaşım (metamorfik) süreçlerle oluşan doğal mineral topluluklarıdır."
      },
      {
        "level": "kolay",
        "text": "Magmatik (püskürük) kayaçlar nasıl oluşur?",
        "options": [
          "Deniz dibinde birikim",
          "Magmanın yüzeye çıkarak veya yer kabuğunda soğuyup katılaşmasıyla",
          "Kayaçların baskı altında değişmesiyle",
          "Kum ve çamurun sertleşmesiyle"
        ],
        "answer": 1,
        "explain": "Granit (yavaş soğuma, yer altı) ve bazalt (hızlı soğuma, yüzey) magmatik kayaçlara örnektir."
      },
      {
        "level": "kolay",
        "text": "Erozyon nedir?",
        "options": [
          "Volkanik patlama",
          "Toprağın su, rüzgar veya buzul gibi etkenlerle yerinden taşınması",
          "Yerin çökmesi",
          "Depremin oluşması"
        ],
        "answer": 1,
        "explain": "Erozyon; su, rüzgar, buzul ve dalgaların kaya ve toprağı aşındırarak taşımasıdır. Ormansızlaşma erozyonu hızlandırır."
      },
      {
        "level": "kolay",
        "text": "Deprem neden oluşur?",
        "options": [
          "Volkanik faaliyetler",
          "Tektonik levhaların birbirine sürtünmesi veya kırılmasıyla biriken enerjinin aniden salınmasıyla",
          "Okyanus sularının hareketi",
          "Güneş ışınlarının yerle etkileşimi"
        ],
        "answer": 1,
        "explain": "Litosfer levhaları hareket ederken biriken gerilme enerjisi fay hatlarında aniden salınır → deprem dalgaları oluşur ve yüzeyde sarsıntı hissedilir."
      },
      {
        "level": "kolay",
        "text": "Toprak nasıl oluşur?",
        "options": [
          "Denizden taşınan çökeltilerle",
          "Kayaçların fiziksel ve kimyasal ayrışması ile organik maddenin (humus) birikmesiyle uzun yıllar içinde",
          "Bitkilerden",
          "Yağmur suyunun birikmesiyle"
        ],
        "answer": 1,
        "explain": "Toprak oluşumu (pedogenez): Fiziksel ayrışma (don-çözülme, ısı değişimi) + kimyasal ayrışma (asit çözünmesi) + biyolojik ayrışma (organik madde) → yüzyıllar süren süreç."
      },
      {
        "level": "orta",
        "text": "Tortul (sedimanter) kayaçların özellikleri nelerdir?",
        "options": [
          "Çok sert ve kristalin yapıdadır",
          "Tabakalar halinde birikim, fosil içerebilir, su ve rüzgar taşıntılarından oluşur",
          "Magmanın katılaşmasıyla oluşur",
          "Yüksek sıcaklık ve baskı altında oluşur"
        ],
        "answer": 1,
        "explain": "Tortul kayaçlar: Kumtaşı, kireçtaşı, kil. Tabakalar halindedir; fosil içerebilir. Deniz, göl ve nehir yataklarında çökelti birikiminden oluşur."
      },
      {
        "level": "orta",
        "text": "Başkalaşım (metamorfik) kayaçlar nasıl oluşur? Örnek veriniz.",
        "options": [
          "Magmanın soğumasıyla; granit",
          "Çökelti birikiminden; kumtaşı",
          "Var olan kayaçların yüksek sıcaklık ve basınç altında dönüşmesiyle; mermer (kalkerden), mikaşist",
          "Volkanik patlamadan; bazalt"
        ],
        "answer": 2,
        "explain": "Kireçtaşı → mermer (başkalaşım). Kil taşı → şist (başkalaşım). Metamorfizm: Levha sınırlarında yüksek T ve P var olan kayacı yeniden kristallendirir."
      },
      {
        "level": "orta",
        "text": "Tektonik levhalar birbirinden uzaklaştığında (ayrışma sınırı) ne oluşur?",
        "options": [
          "Dağ oluşur",
          "Okyanus ortası sırtları, rift vadileri ve volkanik aktivite oluşur",
          "Deprem olmaz",
          "Bölge kararır"
        ],
        "answer": 1,
        "explain": "Ayrışma sınırı: Levhalar uzaklaştıkça magma yükselir → yeni okyanus tabanı oluşur (okyanus ortası sırtları). Rift vadisi ve volkanik ada zincirleri görülür."
      },
      {
        "level": "orta",
        "text": "Bir bölgede düzenli aralıklarla deprem ve volkanik patlama yaşanıyorsa bu bölge büyük olasılıkla nerededir?",
        "options": [
          "Kıta ortasında",
          "Tektonik levha sınırlarında",
          "Kutup bölgelerinde",
          "Okyanus tabanının ortasında"
        ],
        "answer": 1,
        "explain": "Deprem ve volkanik aktivite yoğunlukla tektonik levha sınırlarında görülür. Pasifik Ateş Çemberi en aktif örnektir."
      },
      {
        "level": "orta",
        "text": "Fosil nasıl oluşur ve bilime katkısı nedir?",
        "options": [
          "Canlılar donarak korunur",
          "Ölü organizmaların sert kısımları tortul kayaç içinde mineralize olarak korunur; evrimin kanıtı ve jeolojik zaman belirleyicisidir",
          "Yalnızca bitkilerde oluşur",
          "Suyun içindeki canlılarda"
        ],
        "answer": 1,
        "explain": "Fosil: Organizma ölünce sert kısımları (kemik, kabuk) çökelti içinde gömülür, mineraller yumuşak dokuların yerini alır. Fosil kayıtları evrimi belgeleme ve kayaç yaşı belirleme (biyostratigrafi) için kullanılır."
      },
      {
        "level": "orta",
        "text": "Erozyon ile birikim (depolanma) arasındaki ilişki nedir?",
        "options": [
          "İkisi aynı süreçtir",
          "Erozyon: materyal taşınır; birikim: taşınan materyalin durgun ortamda çökmesi. Nehir deltaları bu ilişkiyi gösterir",
          "Birikim sadece rüzgarla olur",
          "Erozyon birikim olmadan gerçekleşmez"
        ],
        "answer": 1,
        "explain": "Erozyon materyali yerinden koparır ve taşır; su hızı azalınca materyal çöker (birikim). Delta, alüvyon ova ve kumul bu sürecin ürünleridir."
      },
      {
        "level": "zor",
        "text": "Radyoaktif tarihleme yöntemi nasıl çalışır?",
        "options": [
          "Fosil derinliğine bakılır",
          "Kayaç veya fosildeki radyoaktif izotopların (C-14, U-238) belirli yarı ömürle bozunması izlenerek yaş hesaplanır",
          "Renk analizine dayalıdır",
          "Manyetik alan ölçümüne dayalıdır"
        ],
        "answer": 1,
        "explain": "Radyoaktif izotoplar belirli hızda (yarı ömür) bozunur. Kalan izotop miktarı ile oluşan ürünün oranından, bozunma formülüyle yaş hesaplanır. C-14: genç organik materyaller; U-238: milyonlarca yıllık kayaçlar."
      },
      {
        "level": "zor",
        "text": "Kıta kaymasını (continental drift) destekleyen kanıtlar nelerdir?",
        "options": [
          "Kıtaların renkleri benzerdir",
          "Kıtaların birbirine uyan şekilleri, karşılıklı kıyılardaki benzer fosil ve kayaç türleri, okyanus tabanı yayılması",
          "Okyanus derinliğinin artması",
          "Buzulların erimesi"
        ],
        "answer": 1,
        "explain": "Wegener'in kıta kayması kanıtları: 1.Kıta kenarlarının geometrik uyumu, 2.Karşılıklı kıyılarda özdeş fosiller ve kayaçlar, 3.Eski iklim izleri (tropik bölgelerde buzul), 4.Okyanus tabanı yayılması (paleomagnetizm)."
      },
      {
        "level": "zor",
        "text": "Tsunami nasıl oluşur ve neden yıkıcı etkisi vardır?",
        "options": [
          "Fırtınanın sebep olduğu dalgalanma",
          "Deniz tabanı depremi, volkanik patlama veya heyelanın denizde su sütunu oluşturmasıyla; açık denizde alçak ama hızlı dalgalar kıyıda yükselerek büyük enerji taşır",
          "Gel-git kaymasıdır",
          "Okyanus akıntısıdır"
        ],
        "answer": 1,
        "explain": "Tsunami: Deniz tabanı deplasmanı büyük su kütlesi hareket ettirir. Açık denizde hızlı (700+ km/h) ama kısa boylu dalgalar, sığ kıyıda yavaşlayıp yükselerek (10–30 m) büyük enerji taşır."
      }
    ],
    "İnsan ve Çevre": [
      {
        "level": "kolay",
        "text": "Sera etkisi nedir?",
        "options": [
          "Güneş ışığının yansımasıdır",
          "Atmosferdeki CO₂, CH₄ gibi gazların güneş ısısını tutarak Dünya'yı ısıtması",
          "Ozon tabakasının incelmesidir",
          "Asit yağmurunun nedenidir"
        ],
        "answer": 1,
        "explain": "Sera gazları (CO₂, CH₄, N₂O) güneş ışığını geçirirken yeryüzünden yansıyan kızılötesiyi tutar; bu doğal ısınmayı sağlar. İnsan kaynaklı artış küresel ısınmaya yol açar."
      },
      {
        "level": "kolay",
        "text": "Ozon tabakası nerededir ve işlevi nedir?",
        "options": [
          "Troposferde; CO₂'yi tutar",
          "Stratosfer'de; zararlı UV-B ve UV-C ışınlarını süzer",
          "Yeryüzünde; sıcaklığı dengeler",
          "Mesosfer'de; meteorları yavaşlatır"
        ],
        "answer": 1,
        "explain": "Stratosfer'deki ozon (O₃) tabakası, güneşten gelen zararlı ultraviyole ışınlarının büyük bölümünü soğurarak canlıları korur."
      },
      {
        "level": "kolay",
        "text": "Geri dönüşümün çevreye faydası nedir?",
        "options": [
          "Ham madde tüketimini ve enerji kullanımını artırır",
          "Ham madde tüketimini azaltır, enerji tasarrufu sağlar ve çöp miktarını düşürür",
          "Hiçbir faydası yoktur",
          "Yalnızca ekonomik fayda sağlar"
        ],
        "answer": 1,
        "explain": "Geri dönüşüm: Ham madde tasarrufu, enerji tasarrufu (alüminyum geri dönüşümü %95 enerji tasarrufu), depolama alanı azalması ve sera gazı emisyonlarının düşmesi."
      },
      {
        "level": "kolay",
        "text": "Biyoçeşitlilik nedir ve neden önemlidir?",
        "options": [
          "Yalnızca hayvanların çeşitliliği",
          "Ekosistemde bulunan tür, gen ve ekosistem çeşitliliği; ekosistem stabilitesi ve insan refahı için kritiktir",
          "Yalnızca bitki türleri",
          "Ülkedeki insan nüfusu"
        ],
        "answer": 1,
        "explain": "Biyoçeşitlilik: Genetik, tür ve ekosistem düzeyindeki çeşitlilik. Ekosistemler biyoçeşitlilik sayesinde hastalık, iklim değişikliği ve çevresel baskılara karşı dayanıklıdır."
      },
      {
        "level": "kolay",
        "text": "Fosil yakıt kullanımının çevresel etkilerinden hangisi en ciddi kabul edilir?",
        "options": [
          "Gürültü kirliliği",
          "CO₂ emisyonları nedeniyle küresel iklim değişikliği",
          "Koku kirliliği",
          "Işık kirliliği"
        ],
        "answer": 1,
        "explain": "Fosil yakıtların yanması CO₂ başta olmak üzere sera gazı üretir. Bu gazlar atmosferde birikip küresel ısınmaya yol açar ve tüm ekosistemler ile insan toplumlarını tehdit eder."
      },
      {
        "level": "kolay",
        "text": "Sürdürülebilir kalkınma ne anlama gelir?",
        "options": [
          "Sınırsız ekonomik büyüme",
          "Bugünkü nesillerin ihtiyaçlarını gelecek nesillerin kaynaklarını tüketmeden karşılayan kalkınma",
          "Yalnızca çevre koruması",
          "Sanayinin durdurulması"
        ],
        "answer": 1,
        "explain": "Brundtland tanımı: 'Günümüz ihtiyaçlarını, gelecek nesillerin kendi ihtiyaçlarını karşılayabilme yeteneğini tehlikeye atmadan karşılayan kalkınma.'"
      },
      {
        "level": "orta",
        "text": "Küresel ısınmanın ekosistemler üzerindeki üç önemli etkisi nedir?",
        "options": [
          "Ormanlar büyür, denizler soğur, biyoçeşitlilik artar",
          "Kutup buzulları erir (deniz seviyesi yükselir), türlerin habitatları değişir, okyanus asitliği artar",
          "Yağışlar artar ve seller oluşur",
          "Etkisi yoktur"
        ],
        "answer": 1,
        "explain": "Küresel ısınmanın temel etkileri: 1.Buzul erimesi ve deniz seviyesi yükselmesi, 2.Türlerin kutuplara veya yükseklere göçü ya da yok olması, 3.CO₂'nin denizde çözünmesiyle okyanus asitliği artışı."
      },
      {
        "level": "orta",
        "text": "CFC'lerin (kloroflorokarbonlar) ozon tabakasına zararı nasıl gerçekleşir?",
        "options": [
          "CO₂ üreterek",
          "Stratosfer'e ulaşan CFC'ler UV ile parçalanarak klor atomu salar; klor O₃ moleküllerini sürekli parçalar",
          "Ozon gazı üretirler",
          "Güneş ışınlarını yansıtırlar"
        ],
        "answer": 1,
        "explain": "CFC (buzdolabı ve spreyde kullanılmış): 1 Cl atomu 100.000 O₃ molekülünü parçalayabilir. Bu nedenle Montreal Protokolü (1987) ile CFC'ler yasaklanmıştır."
      },
      {
        "level": "orta",
        "text": "Ormansızlaşmanın iklim ve su döngüsüne etkisi nedir?",
        "options": [
          "Hiçbir etkisi yoktur",
          "Terleme azalır (yağış azalır), karbon yutağı kaybolur (CO₂ artar), erozyon artar ve toprak verimliliği düşer",
          "Yağışlar artar",
          "Su döngüsü hızlanır"
        ],
        "answer": 1,
        "explain": "Ormanlar: CO₂ emerek karbon deposu oluşturur. Terlemeyle nem salarak yağış sağlar. Ormansızlaşmada bunlar tersine döner: CO₂ artar, yağış azalır, erozyon hız kazanır."
      },
      {
        "level": "orta",
        "text": "Biyoakümülasyon (biyolojik birikim) çevresel açıdan neden önemlidir?",
        "options": [
          "Besin zincirini güçlendirir",
          "Toksik maddeler (DDT, cıva, PCB) besin zinciri boyunca üst tüketicilerde tehlikeli konsantrasyona ulaşır",
          "Yalnızca sularda görülür",
          "Bitkileri besler"
        ],
        "answer": 1,
        "explain": "Biyoakümülasyon: Bitki %1, ördek %100, kartal %1000 konsantrasyon örneği olur. DDT kartal yumurtalarını incelterek üreme başarısını düşürmüştür."
      },
      {
        "level": "orta",
        "text": "Paris İklim Anlaşması'nın temel hedefi nedir?",
        "options": [
          "Fosil yakıtları anında yasaklamak",
          "Küresel ısınmayı sanayi öncesine göre 1,5–2°C ile sınırlamak ve ülkelerin sera gazı salımlarını kesmesini sağlamak",
          "Okyanus kirliliğini önlemek",
          "Ormansızlaşmayı durdurmak"
        ],
        "answer": 1,
        "explain": "Paris Anlaşması (2015): 195 ülke, küresel ortalama sıcaklık artışını 2°C'nin altında tutmayı, mümkünse 1,5°C ile sınırlamayı ve sera gazı emisyonlarını kademeli azaltmayı taahhüt etti."
      },
      {
        "level": "orta",
        "text": "Plastik kirliliğinin deniz ekosistemlerine etkileri nelerdir?",
        "options": [
          "Hiçbir etkisi yoktur",
          "Deniz canlılarının plastik yutması, mikroplastiklerin besin zincirine girmesi ve habitatların tahribi",
          "Yalnızca estetik sorundur",
          "Okyanus suyunu tuzlandırır"
        ],
        "answer": 1,
        "explain": "Plastik kirliliği: Kaplumbağalar, balinalar plastik yutarak ölür. Fotoparçalanmayla oluşan mikroplastikler balık ve midye yoluyla insan vücuduna ulaşır."
      },
      {
        "level": "zor",
        "text": "Karbon döngüsü ve insan faaliyetleri arasındaki ilişkiyi açıklayınız.",
        "options": [
          "İnsan faaliyetleri karbon döngüsünü etkilemez",
          "Fosil yakıt yakımı ve ormansızlaşma atmosfere fazladan CO₂ ekler; okyanuslar ve bitkiler bir kısmını soğurur ama dengesizlik küresel ısınmaya yol açar",
          "Karbon döngüsü sabit ve değişmezdir",
          "Bitkiler tüm CO₂'yi soğurur"
        ],
        "answer": 1,
        "explain": "Doğal döngüde karbon akışı dengelenmiş. Fosil yakıt yanması (6-10 Gt C/yıl) + ormansızlaşma (1-2 Gt C/yıl) → Atmosferde CO₂ birikmesi → Güçlenen sera etkisi → Küresel ısınma."
      },
      {
        "level": "zor",
        "text": "Atık yönetiminde 5R hiyerarşisi nedir ve öncelik sırası nasıldır?",
        "options": [
          "Recycle en önemlidir",
          "Refuse (reddet) → Reduce (azalt) → Reuse (yeniden kullan) → Repair (onar) → Recycle (geri dönüştür). İlk adım en önemlidir.",
          "Geri dönüşüm önce gelir",
          "Tüm adımlar eşit önemdedir"
        ],
        "answer": 1,
        "explain": "5R hiyerarşisi: 1.Refuse (kullanımı reddet), 2.Reduce (az kullan), 3.Reuse (yeniden kullan), 4.Repair (onar), 5.Recycle. Piramit tepeden başlar: tüketimi önlemek, geri dönüştürmekten daha etkilidir."
      },
      {
        "level": "zor",
        "text": "İnsan nüfusu 2100'de tahminen 10–12 milyara ulaşacak. Bu artışın sürdürülebilirlik açısından temel sonucu nedir?",
        "options": [
          "Enerji, su ve gıda üretimi kolaylaşır",
          "Enerji, su, tarım arazisi ve biyoçeşitlilik üzerindeki baskı artacak; sürdürülebilir üretim ve tüketim kalıpları zorunlu hale gelecektir",
          "Ekosistemler iyileşir",
          "Sera gazları azalır"
        ],
        "answer": 1,
        "explain": "Artan nüfus → Daha fazla gıda, enerji ve su talebi → Tarım alanı genişletme baskısı (ormansızlaşma) → Su kıtlığı → Daha fazla fosil yakıt talebi. Bu nedenle yenilenebilir enerji, döngüsel ekonomi ve sürdürülebilir tarım kritik önem kazanır."
      }
    ],
    "Güneş Sistemi ve Ötesi": [
      {
        "level": "kolay",
        "text": "Güneş Sistemi'nin en büyük gezegeni hangisidir?",
        "options": [
          "Satürn",
          "Jüpiter",
          "Neptün",
          "Uranüs"
        ],
        "answer": 1,
        "explain": "Jüpiter, Güneş Sistemi'nin en büyük gezegenidir; kütlesi diğer tüm gezegenlerin toplamından 2,5 kat büyüktür."
      },
      {
        "level": "kolay",
        "text": "Güneş Sistemi'ndeki 8 gezegen sırasıyla hangi şıkta doğru verilmiştir?",
        "options": [
          "Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs, Neptün",
          "Mars, Venüs, Dünya, Merkür, Jüpiter, Satürn, Uranüs, Neptün",
          "Merkür, Dünya, Venüs, Mars, Jüpiter, Satürn, Neptün, Uranüs",
          "Dünya, Merkür, Venüs, Mars, Satürn, Jüpiter, Uranüs, Neptün"
        ],
        "answer": 0,
        "explain": "Güneş'e yakınlık sırasıyla: Merkür – Venüs – Dünya – Mars – Jüpiter – Satürn – Uranüs – Neptün. (Anımsatma: My Very Educated Mother Just Served Us Nachos)"
      },
      {
        "level": "kolay",
        "text": "Ay'ın Dünya çevresindeki yörüngesi yaklaşık kaç günde tamamlanır?",
        "options": [
          "7 gün",
          "14 gün",
          "27-29 gün",
          "365 gün"
        ],
        "answer": 2,
        "explain": "Ay, Dünya çevresini yaklaşık 27,3 günde (yıldız ayı) tamamlar. Sinodik ay (yeni aydan yeni aya) ise yaklaşık 29,5 gündür."
      },
      {
        "level": "kolay",
        "text": "Güneş tutulması hangi koşulda gerçekleşir?",
        "options": [
          "Dünya, Güneş ile Ay arasına girer",
          "Ay, Güneş ile Dünya arasına girerek Güneş'i kısmen veya tamamen kapatır",
          "Dünya'nın gölgesi Ay'a düşer",
          "Güneş ışınları Ay'a yansır"
        ],
        "answer": 1,
        "explain": "Güneş tutulması: Ay, Güneş ile Dünya arasına tam veya kısmi olarak girdiğinde Güneş'in bir bölümü veya tamamı Dünya'nın belirli bölgelerinden görünmez."
      },
      {
        "level": "kolay",
        "text": "Ay tutulması nasıl oluşur?",
        "options": [
          "Ay, Güneş ile Dünya arasına girer",
          "Dünya'nın gölgesi Ay üzerine düşer",
          "Güneş lekesi oluşur",
          "Ay'da fırtına çıkar"
        ],
        "answer": 1,
        "explain": "Ay tutulması: Dünya, Güneş ile Ay arasına girdiğinde Dünya'nın gölgesi Ay'ı kısmen veya tamamen örter."
      },
      {
        "level": "kolay",
        "text": "Işık yılı nedir?",
        "options": [
          "Işığın bir yılda aldığı yolu gösteren uzaklık birimi",
          "Bir yılın süresi",
          "Bir gezegenin yörünge süresi",
          "Güneş'in ışıma gücü"
        ],
        "answer": 0,
        "explain": "Işık yılı (ly), ışığın bir yılda (yaklaşık 9,46 × 10¹² km) aldığı yoldur. Yıldızlar arası mesafeleri ifade etmek için kullanılan uzaklık birimidir."
      },
      {
        "level": "orta",
        "text": "Dünya'nın mevsimler yaşamasının nedeni nedir?",
        "options": [
          "Dünya'nın Güneş'e yaklaşıp uzaklaşması",
          "Dünya'nın ekseninin yörünge düzlemine göre 23,5° eğik olması",
          "Ay'ın çekim kuvveti",
          "Güneş lekelerinin artması"
        ],
        "answer": 1,
        "explain": "Dünya'nın ekseni ~23,5° eğiktir; bu nedenle yılın farklı dönemlerinde yarım küreler güneşe daha dik veya daha eğik açıyla maruz kalır → mevsimler oluşur."
      },
      {
        "level": "orta",
        "text": "Galaksi nedir ve Dünya'mız hangi galaksidedir?",
        "options": [
          "Gezegenler topluluğu; Andromedası",
          "Milyarlarca yıldız, gaz ve toz bulutu ile karanlık maddeden oluşan devasa yapı; Dünya'mız Samanyolu Galaksisi'ndedir",
          "Yalnızca yıldızlardan oluşur; Jüpiter",
          "Bir güneş sistemidir; Merkür"
        ],
        "answer": 1,
        "explain": "Samanyolu: ~200-400 milyar yıldız içeren sarmal galaksi. Güneş sistemi, galaksinin spiral kollarından birinde, merkezden ~26.000 ışık yılı uzakta yer alır."
      },
      {
        "level": "orta",
        "text": "Ay'ın evreleri (ayın görünümünün değişimi) neden oluşur?",
        "options": [
          "Dünya'nın gölgesi Ay'a düşer",
          "Ay'ın Dünya çevresinde dönerken Güneş tarafından aydınlatılan bölümünün farklı açılardan görülmesi",
          "Ay kendi ekseni etrafında döner",
          "Güneş'in ışığı değişir"
        ],
        "answer": 1,
        "explain": "Ay'ın evreleri: Ay Dünya çevresinde dönerken Güneş'e göre konumu değişir. Güneş tarafından aydınlatılan yarısının Dünya'dan görülen bölümü azalıp artar → hilal, yarım, dolunay."
      },
      {
        "level": "orta",
        "text": "Asteroit kuşağı nerededir ve neden önemlidir?",
        "options": [
          "Güneş ile Merkür arasında",
          "Mars ile Jüpiter yörüngeleri arasında; gezegenlerarası kayalık cisimler, Güneş Sistemi'nin ilk döneminden kalma malzeme içerir",
          "Neptün'ün ötesinde",
          "Satürn'ün halkalarında"
        ],
        "answer": 1,
        "explain": "Asteroit kuşağı (ana kuşak): Mars-Jüpiter arası. Jüpiter'in çekim kuvveti, bu cisimlerin birleşerek gezegen oluşturmasını engellemiştir. Güneş Sistemi'nin erken dönemine ait bilgiler taşırlar."
      },
      {
        "level": "orta",
        "text": "Satürn'ün halkalarını oluşturan maddeler nelerdir?",
        "options": [
          "Sıcak gaz ve plazma",
          "Buz parçaları, kaya ve toz; boyutları santimetreden kilometre ölçeğine kadar değişir",
          "Yalnızca erimiş metal",
          "Asteroidler"
        ],
        "answer": 1,
        "explain": "Satürn'ün halkaları ağırlıklı olarak su buzu parçaları, kaya ve toz içerir. Halkaların genişliği yüz binlerce km'dir ama kalınlığı yalnızca 10-100 m'dir."
      },
      {
        "level": "orta",
        "text": "Uzay araştırmalarında Uluslararası Uzay İstasyonu'nun (ISS) bilimsel önemi nedir?",
        "options": [
          "Yalnızca turizm amaçlıdır",
          "Yerçekimsiz ortamda biyoloji, malzeme, tıp ve fizik araştırmaları yapılır; uzun süreli insan uzay yolculuğuna zemin hazırlar",
          "Yalnızca astronot eğitimi içindir",
          "Askeri amaçlıdır"
        ],
        "answer": 1,
        "explain": "ISS: 16 ülkenin ortaklığıyla kurulmuş. Mikrogravite ortamında hücre biyolojisi, protein kristalleşmesi, malzeme bilimi araştırmaları yapılır; Mars gibi uzun yolculuklara hazırlık sağlanır."
      },
      {
        "level": "zor",
        "text": "Güneş, özelliklerine göre hangi yıldız sınıfına girer ve yaşam döngüsü nasıl devam edecektir?",
        "options": [
          "Kırmızı dev; hemen sönecek",
          "Sarı cüce (G tipi); çekirdeğindeki hidrojen tükendikçe kırmızı deve genişleyecek, dış katmanlar nebula oluşturacak, çekirdek beyaz cüceye dönüşecektir",
          "Nötron yıldızı; süpernova",
          "Mavi dev; hızla soğuyacak"
        ],
        "answer": 1,
        "explain": "Güneş G2V sarı cüce yıldızıdır. ~5 milyar yıl sonra H tükenecek → kırmızı dev (Dünya yutulabilir) → gezegen nebulası fırlatır → soğuk beyaz cüce. Süpernova yaşamayacak kadar kütlesi az."
      },
      {
        "level": "zor",
        "text": "Kara delik nedir ve nasıl oluşur?",
        "options": [
          "Uzaydaki boş bölge",
          "Kütlesi çok büyük yıldızların süpernova patlamasıyla çökmesi sonucu oluşan; kaçış hızının ışık hızını aştığı bölge – hiçbir şey, ışık dahil, kaçamaz",
          "Gezegen harabeleri",
          "Asteroid kümesi"
        ],
        "answer": 1,
        "explain": "Büyük kütleli yıldız (güneşin 20+ katı) yakıt tükenince çekirdek çöker → süpernova → geriye kalan çekirdek, kaçış hızı > ışık hızı olan kara deliğe dönüşür. Olaylar ufku adı verilen sınırı geçen hiçbir şey dönemez."
      },
      {
        "level": "zor",
        "text": "Büyük Patlama (Big Bang) teorisi evrenin oluşumunu nasıl açıklar?",
        "options": [
          "Evren her zaman var olmuştur",
          "Yaklaşık 13,8 milyar yıl önce son derece sıcak ve yoğun bir tekilden genişlemeyle başlamış; uzaklaşan galaksiler ve kozmik arka plan ışıması bunu destekler",
          "Evren döngüsel olarak büzülüp genişler",
          "Tanrı tarafından yaratılmıştır"
        ],
        "answer": 1,
        "explain": "Big Bang kanıtları: 1.Galaksilerin Hubble yasasıyla uzaklaşması, 2.Kozmik Mikrodalga Arka Plan Işıması (CMBR), 3.Evrende beklenen oranlarda H ve He bulunması. Evren ~13,8 Myr önce başlamıştır."
      }
    ]
  }
};

  const TOPIC_LIST = {
    5: Object.keys(BANK[5]),
    6: Object.keys(BANK[6]),
    7: Object.keys(BANK[7])
  };

  const TOPIC_COUNTS = {
    5: TOPIC_LIST[5].reduce((sum, t) => sum + BANK[5][t].length, 0),
    6: TOPIC_LIST[6].reduce((sum, t) => sum + BANK[6][t].length, 0),
    7: TOPIC_LIST[7].reduce((sum, t) => sum + BANK[7][t].length, 0)
  };

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function flatten(grade) {
    const cats = BANK[grade];
    const out = [];
    Object.keys(cats).forEach(topic => {
      cats[topic].forEach(qq => out.push({ ...qq, topic }));
    });
    return out;
  }

  function pickBand(all, band, count, usedTexts) {
    const pool = shuffle(all.filter(q => q.level === band && !usedTexts.has(q.text)));
    const chosen = pool.slice(0, count);
    chosen.forEach(q => usedTexts.add(q.text));
    return chosen;
  }

  function buildRound(grade, topicFilter) {
    const all = topicFilter && topicFilter !== 'all'
      ? flatten(grade).filter(q => q.topic === topicFilter)
      : flatten(grade);
    const used = new Set();
    const easy = pickBand(all, 'kolay', 6, used);
    const mid = pickBand(all, 'orta', 6, used);
    const hard = pickBand(all, 'zor', 3, used);
    return easy.concat(mid, hard);
  }

  function audiencePoll(correctIndex, level, removedIndices) {
    removedIndices = removedIndices || [];
    const baseCorrect = level === 'kolay' ? 78 : level === 'orta' ? 62 : 47;
    const correctPct = baseCorrect + Math.floor(Math.random() * 12) - 4;
    const result = [0, 0, 0, 0];
    let remaining = 100 - correctPct;
    const others = [0, 1, 2, 3].filter(i => i !== correctIndex && removedIndices.indexOf(i) < 0);
    others.forEach((idx, kk) => {
      if (kk === others.length - 1) result[idx] = remaining;
      else { const share = Math.floor(Math.random() * (remaining / (others.length - kk)) * 1.4); result[idx] = share; remaining -= share; }
    });
    result[correctIndex] = correctPct;
    removedIndices.forEach(i => { result[i] = 0; });
    const sum = result.reduce((a, b) => a + b, 0);
    if (sum !== 100) result[correctIndex] += (100 - sum);
    return result;
  }

  function expertHint(question, level) {
    const correctLetter = ['A', 'B', 'C', 'D'][question.answer];
    const accurate = Math.random() < 0.80;
    const names = ['Prof. Dr. Aylin', 'Öğretmen Kerem', 'Dr. Selin', 'Mühendis Burak'];
    const name = names[Math.floor(Math.random() * names.length)];
    let pickLetter = correctLetter;
    if (!accurate) {
      const others = [0, 1, 2, 3].filter(i => i !== question.answer);
      pickLetter = ['A', 'B', 'C', 'D'][others[Math.floor(Math.random() * others.length)]];
    }
    const confident = accurate
      ? ['Bence kesinlikle', 'Eminim ki cevap', 'Hiç şüphem yok,', 'Bu konuyu iyi bilirim;']
      : ['Tam emin değilim ama sanırım', 'Galiba', 'Yanılmıyorsam', 'Riskli ama bence'];
    const lead = confident[Math.floor(Math.random() * confident.length)];
    return { name, text: `${lead} doğru cevap ${pickLetter} şıkkı.`, letter: pickLetter, accurate };
  }

  window.QUIZ = {
    LADDER, SAFE_POINTS, timeFor, levelFor, buildRound,
    audiencePoll, expertHint, TOPIC_LIST, TOPIC_COUNTS, shuffle,
    format: (n) => n.toLocaleString('tr-TR')
  };
})();
