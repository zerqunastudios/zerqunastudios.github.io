---
title: 'SpinCraft: Wood Workshop — Bir Fikirden Oynanabilir Atölyeye'
description: 'SpinCraft: Wood Workshop basit bir torna fikrinden eksiksiz bir ahşap tornacılığı oyununa nasıl dönüştü ve yolda bizi en çok neler zorladı?'
date: 2026-10-25
game: spincraft
cover: ../../../assets/games/spincraft/painting-red-blue.webp
coverAlt: 'SpinCraft: Wood Workshop’ta tornada kırmızı ve mavi bölgelerle boyanmış bir parça'
---

SpinCraft: Wood Workshop artık itch.io’da. Oyunun nasıl geliştirildiğine ve bu süreçte neler öğrendiğimize dönüp bakmak için iyi bir zaman.

## Fikir

Ana eylemin bir menü ya da düğme değil, işin kendisi olduğu bir ahşap işçiliği oyunu yapmak istedik: tornada dönen bir parça ahşap ve ondan azar azar talaş kaldıran bir keski. Sakin, elle yapılan ve son şekil doğru çıktığında insanı tatmin eden bir iş.

Diğer her şeyin hedefini bu belirledi. Yontmak iyi hissettirmiyorsa ne mağaza ne yükseltmeler ne de siparişler oyunu kurtarabilirdi.

## Önce torna

Her şey tornada başlıyor. İş parçası, kestikçe profili değişen prosedürel bir mesh. Her geçiş gerçekten malzeme kaldırıyor ve kaldırılan ahşap geri gelmiyor; bu yüzden hedef çizgisini geçmenin bir bedeli var.

İlk sürümlerde atölye basit şekillerden oluşuyordu, ahşap da düz ve desensizdi. Zamanla ahşaba prosedürel bir damar dokusu eklendi, hedef çizgisi nerede durmanız gerektiğini görebilmeniz için dönen parçanın önüne taşındı ve talaşlar gerçekten kaldırdığınız malzemeye bağlandı.

Küçük bir ayrıntı beklediğimizden uzun sürdü. Ahşabın görüntüsünde tek noktalık, çok ince sivri çıkıntılar oluşabiliyordu. Bunları artık yalnızca görsel mesh üzerinde filtreliyoruz; gerçek profile dokunmuyoruz. Böylece bilerek açtığınız keskin oluklar ve ince boyunlar tam yonttuğunuz gibi kalıyor.

## Altı keski

Her birinin kendi kesme genişliği ve davranışı olan altı torna keskisi var. Tab ya da sayı tuşlarıyla keski değiştiriyor, hassas kesim için Shift’e basılı tutuyor, sağ fare tuşuyla yakınlaştırıyorsunuz. Her keskinin, ucunun silüetinden çizilmiş küçük bir simgesi var; böylece bir bakışta ayırt edebiliyorsunuz.

## Zımpara ve boya

İlk sürümlerde zımparalama ve boyama neredeyse anında biten basit efektlerdi. Ahşap işçiliği gibi hissettirmiyordu.

Zımparalama artık bölge bazlı. Zımpara bloğu yalnızca parçanın gerçekten temas ettiği yerlerini işliyor: parça boyunca 128 banda bölünüyor ve her bant kendi ilerlemesini ve kalitesini tutuyor. Daha ince kumlar (80, 120, 240 ve 400) daha pürüzsüz bir sonuç veriyor.

Boyama da aynı yoldan geçti. Bir renk seçmek artık bütün parçayı boyamıyor. Fırçayla darbe darbe boyuyorsunuz ve her darbe parçanın çevresinde nereye sürüldüğünü, genişliğini, opaklığını, rengini ve katmanını hatırlıyor. Kırmızı bir bant ve mavi bir bant boyayıp aradaki ahşabı doğal bırakabiliyorsunuz. Üstüne bir cila seçiyorsunuz: doğal mat, yağ, yarı mat ya da parlak.

## Siparişler, mağaza ve satış

Oyunun iskeletini müşteri siparişleri oluşturuyor. Toplam 21 sipariş var: kâseler, vazolar, satranç taşları, şamdanlar, masa ayakları, saplar ve daha fazlası.

Önceki bir sürümde siparişler birkaç temel şeklin küçük varyasyonlarından üretiliyordu ve çoğu birbirine benzemeye başlamıştı. Bunların yerine elle tasarlanmış 21 ayrı hedef silüet koyduk. Kâse ve vazo açıklamaları yalnızca dış yüzeyi anlatıyor, çünkü tornada gerçekten şekillendirdiğiniz kısım orası.

Doğruluğunuza göre puan alıyor, ardından eseri satıyorsunuz. Para ve deneyimle atölye mağazasında yeni ahşap türleri (çam, kayın, meşe, ceviz, kiraz, akçaağaç ve maun), daha iyi keskiler, torna parçaları, zımparalar ve cilalar açılıyor. Ödülleri, art arda fırça darbesi vurarak sınırsız para kazanılamayacak şekilde ayarladık; boyasız, doğal bir parça da asla cezalandırılmıyor.

Sadece bir şey yapmak istiyorsanız serbest üretim modunda ne müşteri ne de hedef var; eserleriniz bir kütüphanede saklanıyor.

## Bizi zorlayanlar

- **Kayıtları çalışır tutmak.** Özellikler eklendikçe kayıt biçimini birkaç kez değiştirmek gerekti. Her değişikliği bir geçiş adımı olarak yazdık; böylece eski ilerleme, profiller ve satın almalar sıfırlanmak yerine yeni sürüme taşınıyor.
- **Çeşitlilik.** Görünüşü ve hissi birbirinden farklı 21 sipariş hazırlamak, kesme mekaniğinin kendisinden daha fazla emek istedi.
- **Performans.** Kesme, talaşlar, zımpara ve boya canlı bir mesh’i ve dokuları sürekli güncelliyor. Bu yüzden yeni özellik ekledikçe orta seviye bir dizüstü ekran kartında performansı ölçmeye devam ettik.

## Oyunu edinin, düşüncelerinizi paylaşın

SpinCraft: Wood Workshop, İngilizce ve Türkçe arayüz seçenekleriyle Windows için itch.io’da: [zerqunastudios.itch.io/spincraft-wood-workshop](https://zerqunastudios.itch.io/spincraft-wood-workshop)

Oyuncu geri bildirimi bizim için çok değerli. Bir sipariş haksız geliyorsa, bir alet yanlış hissettiriyorsa ya da bir şey bozuluyorsa lütfen itch.io sayfasındaki yorumlardan veya zerquna.studios@gmail.com adresinden bize yazın. Her mesaj bir sonraki güncellemeyi daha iyi yapmamıza yardımcı oluyor.
