// General troubleshooting content for the Support Center.
import type { Localized } from '../i18n/utils';

export interface SupportTopic {
  id: string;
  title: Localized;
  items: Localized<string[]>;
}

export const supportTopics: SupportTopic[] = [
  {
    id: 'installation',
    title: { en: 'Installation Problems', tr: 'Kurulum Sorunları' },
    items: {
      en: [
        'Downloaded a ZIP file? Extract the whole archive to a folder first, then run the game from that folder. Keep the .exe next to its data folder and other files.',
        'Windows SmartScreen may warn about new games from small studios. Only choose “More info” → “Run anyway” if you downloaded the game from our official store page or the Downloads page on this website.',
        'If your antivirus blocks or removes the game, please tell us. Do not turn off your antivirus; instead, send us the game name, version and the warning text.',
        'Games from Microsoft Store are installed and updated through the Microsoft Store app. Make sure Windows and the Microsoft Store app are up to date.',
        'Install the game on a drive with enough free space, and avoid folders that need administrator permission.',
      ],
      tr: [
        'ZIP dosyası mı indirdiniz? Önce arşivin tamamını bir klasöre çıkarın, ardından oyunu o klasörden çalıştırın. .exe dosyasını veri klasörü ve diğer dosyalarla aynı yerde tutun.',
        'Windows SmartScreen, küçük stüdyoların yeni oyunları için uyarı gösterebilir. “Ek bilgi” → “Yine de çalıştır” seçeneğini yalnızca oyunu resmî mağaza sayfamızdan veya bu sitedeki İndirmeler sayfasından indirdiyseniz kullanın.',
        'Antivirüs programınız oyunu engeller veya silerse lütfen bize bildirin. Antivirüsünüzü kapatmayın; bunun yerine oyunun adını, sürümünü ve uyarı metnini bize gönderin.',
        'Microsoft Store’dan edinilen oyunlar Microsoft Store uygulaması üzerinden kurulur ve güncellenir. Windows’un ve Microsoft Store uygulamasının güncel olduğundan emin olun.',
        'Oyunu yeterli boş alanı olan bir sürücüye kurun ve yönetici izni gerektiren klasörlerden kaçının.',
      ],
    },
  },
  {
    id: 'performance',
    title: { en: 'Performance Issues', tr: 'Performans Sorunları' },
    items: {
      en: [
        'Update your graphics card driver from NVIDIA, AMD or Intel.',
        'On laptops, plug in the charger and make sure the game uses the dedicated graphics card: Windows Settings → System → Display → Graphics.',
        'Lower the graphics quality or resolution in the game’s settings, if available.',
        'Close other heavy programs, such as browsers with many tabs, recording software or downloads.',
        'If the game stutters or freezes at the same point every time, report it as a bug and include your log file.',
      ],
      tr: [
        'Ekran kartı sürücünüzü NVIDIA, AMD veya Intel’in sitesinden güncelleyin.',
        'Dizüstü bilgisayarlarda şarj cihazını takın ve oyunun harici ekran kartını kullandığından emin olun: Windows Ayarları → Sistem → Ekran → Grafik.',
        'Varsa oyunun ayarlarından grafik kalitesini veya çözünürlüğü düşürün.',
        'Çok sekmeli tarayıcılar, kayıt yazılımları veya indirmeler gibi ağır programları kapatın.',
        'Oyun her seferinde aynı noktada takılıyor veya donuyorsa bunu hata olarak bildirin ve günlük dosyanızı ekleyin.',
      ],
    },
  },
  {
    id: 'saves',
    title: { en: 'Save Game Problems', tr: 'Kayıt Dosyası Sorunları' },
    items: {
      en: [
        'Our games save your progress on your own PC. The exact folder for each game is listed on its support page.',
        'To back up your progress, close the game and copy the whole save folder somewhere safe.',
        'Do not run two copies of the same game at the same time; they can overwrite each other’s saves.',
        'If a save will not load, do not delete it. Some games keep backup files (for example .bak). Email us the game version and, if you are comfortable, the save files, so we can investigate.',
        'We cannot restore saves from our side, because your saves are never sent to us.',
      ],
      tr: [
        'Oyunlarımız ilerlemenizi kendi bilgisayarınızda saklar. Her oyunun tam klasörü kendi destek sayfasında yer alır.',
        'İlerlemenizi yedeklemek için oyunu kapatın ve kayıt klasörünün tamamını güvenli bir yere kopyalayın.',
        'Aynı oyunun iki kopyasını aynı anda çalıştırmayın; birbirlerinin kayıtlarının üzerine yazabilirler.',
        'Bir kayıt yüklenmiyorsa silmeyin. Bazı oyunlar yedek dosyalar (örneğin .bak) tutar. Sorunu inceleyebilmemiz için oyun sürümünü ve isterseniz kayıt dosyalarını bize e-posta ile gönderin.',
        'Kayıtlarınız bize hiçbir zaman gönderilmediği için kayıtları bizim tarafımızdan geri yükleyemeyiz.',
      ],
    },
  },
  {
    id: 'bug-reporting',
    title: { en: 'Bug Reporting', tr: 'Hata Bildirimi' },
    items: {
      en: [
        'Tell us what happened and what you expected to happen.',
        'List the steps that lead to the problem, if you can repeat it.',
        'Add screenshots or a short video if possible.',
        'Attach the game’s log file. Its location is on the game’s support page. Check the file first: logs can contain your Windows user name in file paths.',
        'Include the game name and version, your Windows version, processor, graphics card and RAM.',
      ],
      tr: [
        'Ne olduğunu ve ne olmasını beklediğinizi yazın.',
        'Sorunu tekrarlayabiliyorsanız soruna yol açan adımları sıralayın.',
        'Mümkünse ekran görüntüsü veya kısa bir video ekleyin.',
        'Oyunun günlük dosyasını ekleyin. Konumu oyunun destek sayfasında yer alır. Dosyayı önce kontrol edin: günlükler, dosya yollarında Windows kullanıcı adınızı içerebilir.',
        'Oyunun adını ve sürümünü, Windows sürümünüzü, işlemcinizi, ekran kartınızı ve RAM miktarınızı ekleyin.',
      ],
    },
  },
  {
    id: 'purchases',
    title: { en: 'Purchases and Refunds', tr: 'Satın Almalar ve İadeler' },
    items: {
      en: [
        'Purchases, payments and refunds are handled by the store you bought the game from (for example Microsoft Store or itch.io), under that store’s rules.',
        'For payment or refund problems, contact the store first. We are happy to help where we can, but we cannot see or change your payment details.',
      ],
      tr: [
        'Satın almalar, ödemeler ve iadeler, oyunu satın aldığınız mağaza (örneğin Microsoft Store veya itch.io) tarafından o mağazanın kurallarına göre yürütülür.',
        'Ödeme veya iade sorunları için önce mağazayla iletişime geçin. Elimizden geldiğince yardımcı oluruz; ancak ödeme bilgilerinizi göremez veya değiştiremeyiz.',
      ],
    },
  },
];

export const reportChecklist: Localized<string[]> = {
  en: [
    'Game name and version',
    'Where you got the game (Microsoft Store, itch.io, …)',
    'Windows version, processor, graphics card and RAM',
    'What happened, and the steps to reproduce it',
    'Screenshots, a short video or the log file, if possible',
  ],
  tr: [
    'Oyunun adı ve sürümü',
    'Oyunu nereden edindiğiniz (Microsoft Store, itch.io, …)',
    'Windows sürümü, işlemci, ekran kartı ve RAM',
    'Ne olduğu ve sorunu tekrarlama adımları',
    'Mümkünse ekran görüntüleri, kısa bir video veya günlük dosyası',
  ],
};

export const emailTemplate: Localized = {
  en: 'Game and version:\nWhere I got the game:\nWindows version:\nProcessor / graphics card / RAM:\n\nWhat happened:\n\nSteps to reproduce:\n',
  tr: 'Oyun ve sürüm:\nOyunu nereden edindim:\nWindows sürümü:\nİşlemci / ekran kartı / RAM:\n\nNe oldu:\n\nTekrarlama adımları:\n',
};
