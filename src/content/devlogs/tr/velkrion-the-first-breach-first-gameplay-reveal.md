---
title: 'VELKRION: THE FIRST BREACH — İlk Oynanış Gösterimi'
description: '1. Bölüm demosuna ilk bakış: Ana Kamp, jeneratör, beş dakikalık kapı savunması, zombiler, silahlar ve geliştirme sırasında çözdüğümüz sorunlar.'
date: 2026-10-25
game: velkrion-the-first-breach
cover: ../../../assets/games/velkrion-the-first-breach/menu-backdrop.webp
coverAlt: 'VELKRION: THE FIRST BREACH’te Ana Kamp sokaklarının kuşbakışı piksel sanat görünümü'
coverPixelated: true
---

VELKRION: THE FIRST BREACH’in ilk bölümü artık itch.io’da ücretsiz demo olarak oynanabiliyor. Demoda neler olduğunu, nasıl bir araya geldiğini ve oyunun bundan sonra nereye gittiğini anlatalım.

## Fikir

VELKRION, bir salgının tam başlangıcında geçen kuşbakışı 2D piksel sanat bir zombi hayatta kalma nişancısı. Yıllar sonra harabeye dönmüş bir dünyada değil, her şeyin daha yeni dağılmaya başladığı ilk saatlerde geçiyor. İletişimin koptuğu ve kamp savunmalarının çözülmeye başladığı bir askerî üste görevli bir askeri yönetiyorsunuz.

İlk bölümün öldürme sayısından çok hayatta kalmakla ilgili olmasını istedik. Keşfediyor, kampın size sunduklarıyla sorunları çözüyor ve dayanıyorsunuz. Her zombiyi öldürmek zorunda değilsiniz; kurtulmanız gerekiyor.

## Ana Kamp

1. Bölüm, Ana Kamp’ta geçiyor: koğuşları, cephaneliği, reviri, jeneratör odası ve güvenlik ofisi olan, yollar ve servis şeritleriyle birbirine bağlanmış bir üs.

Başlangıçta elektrik yok ve kamp karanlık. Feneriniz çoğu zaman tek ışık kaynağınız: duvarların arkasını göremeyen dar bir koni. Odalar ve köşeler, siz bakana kadar gizli kalıyor. Bu iki yönlü işliyor: fenerinizin ışığına yakalanan bir zombi, karanlıkta duran bir zombiye göre sizi çok daha uzaktan fark edebiliyor.

## Elektrik ve jeneratör

İlk hedef elektriği geri getirmek. Bir sigorta buluyor, elektrik panosuna takıyor ve jeneratörü çalıştırıyorsunuz. Elektrik geldiğinde kamp ışıkları yollar boyunca, bina girişlerinde ve projektörlerde birbiri ardına yanıyor; toplam 34 ışık. Bölüm, kontrol noktasını da burada kaydediyor.

## Güvenlik kapısının açılması

Elektriğin gelmesiyle güvenlik kapısı açılmaya başlıyor ve tamamen açılması beş dakika sürüyor. Bu, 300 saniyelik aktif oyun süresi demek: oyun duraklatıldığında ya da bir belge okurken sayaç duruyor; kapıyı hızlandırmak veya erken sıyrılıp geçmek mümkün değil.

Kapı açılırken kamp saldırıya uğruyor. Takviyeler farklı yönlerden geliyor ve baskı her dakika artıyor: önce çoğunlukla Walker’lar, sonra Runner, Armored ve Crawler’lar, ardından Spitter ve Brute’lar, son dakikada da en fazla bir Alpha. Kapı tamamen açıldığında takviyeler duruyor.

## Yedi zombi türü

- **Walker**: dolaşan, sesleri araştıran ve kovalayan standart enfekte.
- **Runner**: ince, hızlı ve bir yola girdi mi peşinizi bırakmayan.
- **Armored**: mermilerden ve pompalı saçmalarından daha az hasar alan.
- **Brute**: iri ve yavaş; kısa bir hazırlığın ardından ağır vuran.
- **Spitter**: mesafesini koruyan ve kaçabileceğiniz asit tükürükleri atan.
- **Crawler**: kısa, ani atılımlarla yaklaşan.
- **Alpha**: yakındaki zombileri bilinen son konumunuza çağıran.

## Altı silah

Oyuna yedek mermisi hiç bitmeyen bir **Tabanca** ile başlıyorsunuz; yine de şarjör değiştirmeniz gerekiyor. Kampın çeşitli yerlerinde bir **SMG**, bir **Piyade Tüfeği**, her atışta on iki saçma atan bir **Pompalı**, uzun atışlarda saçılması artan bir **LMG** ve ateş etmeden önce dönmeye başlaması gereken, dönerken sizi yavaşlatan bir **Minigun** bulabiliyorsunuz.

Her silahın kendi namlu alevi var ve mermiler çarptıkları yüzeye göre tepki veriyor: metalde kıvılcım, betonda toz, ahşapta kıymık.

## Çözmemiz gereken sorunlar

### Zombi navigasyonu

Binalar, kapılar ve mobilyalarla dolu bir kampta bir zombi kalabalığını hareket ettirmek bu bölümün en zor kısmıydı. Zombiler kapı pervazlarına ve köşelere takılıyordu. Yol bulma sistemini incelediğimizde bir dolap ve bir duvar köşesinin yakınında engellerin içinden geçen rotalar, ara noktaların çok erken atlandığını ve birbirinden uzak durmaya çalışan zombilerin kapı pervazlarına itildiğini gördük.

Çözümler adım adım geldi: daha ince bir navigasyon ızgarası (32 pikselden 16 piksele), her zombinin gövde boyutunu hesaba katan rota kontrolleri ve dar yerler için küçük bir yerel yol bulma yedeği; hiçbir zombi ışınlanmadan. Zombiler artık birbirlerine tamamen çarpmak yerine yumuşakça yön değiştirerek ilerliyor; bu yüzden çok sıkışık kalabalıklarda sprite’lar kısa süreliğine üst üste binebiliyor. Yedi kapının hepsinden iki yönde ve iki gövde boyutu için rotaları kontrol ettik, ama kalabalık davranışını gerçek oynanışta test etmeye devam ediyoruz.

### Silahları askerin eline yerleştirmek

Tabanca başlangıçta askerin sprite karelerine gömülü çizilmişti. Diğer beş silah eklendiğinde, zaten elinde silah olan bir karakterin üzerine yerleşiyorlardı.

Eski tutuşu asker karelerinden çıkardık, Pixelorama’da yeni bir kol ve el çizdik ve her silaha kendi kabza noktasını ve destek eli noktasını verdik. Tabanca iki elle tutuluyor; diğer silahlarda öndeki destek eli kullanılıyor. Namlu alevi, geri tepme, namlu ışığı ve merminin kendisi silahla aynı dönüşümü kullanıyor; böylece atışlar artık gördüğünüz namludan çıkıyor.

## Sırada ne var?

Aşağıdakilerin hepsi **plan** aşamasında. Hiçbiri henüz demoda yok ve geliştirme sırasında değişebilir:

- birbirine bağlı bölümlerle anlatılan uzun bir hikâye; uzun vadeli hedef toplam 250 bölüm,
- askerî üssün ötesinde yeni bölgeler,
- daha çeşitli bulmacalar,
- karakterler arasında geçiş yapılabilen, yapay zekâ kontrollü takım arkadaşlarından oluşan dört kişilik bir ekip.

## Demoyu oynayın

1. Bölüm demosu (v0.1.0, Windows) itch.io’da ücretsiz. Geliştirmeyi desteklemek isterseniz dilediğiniz tutarı ödemeyi seçebilirsiniz. Bu erken bir sürüm; hatalar, denge sorunları ve tamamlanmamış bölümler olabilir. Geri bildirimlerinizi itch.io yorumlarından ya da zerquna.studios@gmail.com adresinden bekliyoruz.

Demoyu itch.io’dan edinin: [zerqunastudios.itch.io/velkrion-the-first-breach](https://zerqunastudios.itch.io/velkrion-the-first-breach)
