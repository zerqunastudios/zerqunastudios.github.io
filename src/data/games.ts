/**
 * Central game catalogue.
 *
 * Adding a game: append one object to `games` below. Its game page
 * (/en/games/<slug>/, /tr/games/<slug>/), support page, card, sitemap entry and
 * Privacy Policy section are generated automatically.
 *
 * Rules for this file:
 * - Only publish facts that are verified. Leave a field empty rather than guess.
 * - Store and download links must be real, official URLs.
 * - If a game handles data differently, describe it in `privacy` (and, if needed,
 *   give it its own policy via `privacyPolicyPath`).
 */
import type { ImageMetadata } from 'astro';
import type { Localized } from '../i18n/utils';

import scFinished from '../assets/games/spincraft/finished-product.webp';
import scSanding from '../assets/games/spincraft/sanding.webp';
import scPainting from '../assets/games/spincraft/painting-red-blue.webp';
import scFree from '../assets/games/spincraft/free-crafting.webp';
import scShop from '../assets/games/spincraft/shop-categories.webp';
import scLibrary from '../assets/games/spincraft/creation-library.webp';

import sc2Hud from '../assets/games/spincraft-2-creative/ui-01-hud.webp';
import sc2Overview from '../assets/games/spincraft-2-creative/09-overview.webp';
import sc2Cutting from '../assets/games/spincraft-2-creative/14-cuttingstation.webp';
import sc2Entrance from '../assets/games/spincraft-2-creative/01-entrance.webp';

import eoteExplorer from '../assets/games/echoes-of-the-earth/explorer-final.webp';

import vkBackdrop from '../assets/games/velkrion-the-first-breach/menu-backdrop.webp';
import vkInterior from '../assets/games/velkrion-the-first-breach/interior-overview.webp';
import vkArt from '../assets/games/velkrion-the-first-breach/art-overview.webp';

export type GameStatus = 'released' | 'demo-available' | 'in-development';

export interface GameImage {
  src: ImageMetadata;
  alt: Localized;
  caption?: Localized;
  /** Pixel art should be scaled without smoothing. */
  pixelated?: boolean;
}

export interface StoreLink {
  store: 'itch.io' | 'Microsoft Store' | 'Steam' | 'GitHub Releases';
  url: string;
  /** Button text, e.g. "Get on itch.io". Defaults to "Get on <store>". */
  label?: Localized;
  /** Short, verified note about how the game is offered there (no prices). */
  note?: Localized;
}

export interface DownloadItem {
  title: Localized;
  version: string;
  platform: string;
  source: 'itch.io' | 'GitHub Releases';
  url: string;
  size?: string;
}

export interface Requirements {
  os?: string;
  processor?: string;
  memory?: string;
  graphics?: string;
  storage?: string;
}

export interface GamePrivacy {
  engine: string;
  /** Data the game stores on the player's own PC. */
  localData: Localized<string[]>;
  /** Network / third-party behaviour, as verified in the game's configuration. */
  network: Localized<string[]>;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  status: GameStatus;
  featured: boolean;
  genre: Localized;
  platforms: string[];
  engine: string;
  tagline: Localized;
  description: Localized<string[]>;
  features: Localized<string[]>;
  /** Shown under the features list, e.g. "features may change". */
  featuresNote?: Localized;
  /** Plans that are NOT in the game yet. Shown in a separate "Planned Features" section. */
  plannedFeatures?: Localized<string[]>;
  cover: GameImage;
  screenshots: GameImage[];
  /** Short note about the media shown (e.g. work-in-progress captures). */
  mediaNote?: Localized;
  /** YouTube video ID of an official trailer. Leave undefined until one exists. */
  trailerYouTubeId?: string;
  storeLinks: StoreLink[];
  downloads: DownloadItem[];
  /** ISO date (yyyy-mm-dd), only when verified. */
  releaseDate?: string;
  requirements?: { minimum?: Requirements; recommended?: Requirements };
  /** The developer's own test machine. Not official requirements. */
  testedOn?: string;
  controls?: Localized<string[]>;
  knownIssues?: Localized<string[]>;
  /** Paths on Windows for the current build, used on the support page. */
  fileLocations?: { saves?: string; logs?: string; settings?: string };
  /** Optional extra explanation shown under the file locations. */
  fileLocationsNote?: Localized;
  privacy: GamePrivacy;
  /** Defaults to the central policy. Set only if this game needs its own policy. */
  privacyPolicyPath?: string;
}

const UNITY_NETWORK: Localized<string[]> = {
  en: [
    'The game has no online features, accounts, multiplayer, advertising or in-game purchases, and its own code does not send data over the internet.',
    'Unity Analytics, Unity Cloud Diagnostics (crash reporting) and Unity Performance Reporting are switched off, and the project is not linked to Unity Cloud, so no diagnostic or analytics data is sent to Zerquna Studios.',
    'The game is built with the Unity engine. In the current build configuration, Unity’s engine-level hardware statistics option is enabled. This may allow the Unity engine to send limited technical information about your device (for example operating system, processor, graphics card and memory) to Unity Technologies. Zerquna Studios does not receive this information. Unity processes it under its own privacy policy.',
  ],
  tr: [
    'Oyunda çevrim içi özellik, hesap, çok oyunculu mod, reklam veya oyun içi satın alma yoktur ve oyunun kendi kodu internet üzerinden veri göndermez.',
    'Unity Analytics, Unity Cloud Diagnostics (çökme raporlama) ve Unity Performance Reporting kapalıdır; proje Unity Cloud’a bağlı değildir. Bu nedenle Zerquna Studios’a herhangi bir tanılama veya analiz verisi gönderilmez.',
    'Oyun Unity motoruyla geliştirilmiştir. Mevcut derleme yapılandırmasında Unity’nin motor düzeyindeki donanım istatistikleri seçeneği açıktır. Bu seçenek, Unity motorunun cihazınız hakkında sınırlı teknik bilgileri (ör. işletim sistemi, işlemci, ekran kartı ve bellek) Unity Technologies’e göndermesine izin verebilir. Zerquna Studios bu bilgileri almaz. Unity bu bilgileri kendi gizlilik politikasına göre işler.',
  ],
};

export const games: Game[] = [
  {
    id: 'game-01',
    slug: 'spincraft',
    title: 'SpinCraft: Wood Workshop',
    status: 'released',
    featured: true,
    genre: { en: 'Simulation', tr: 'Simülasyon' },
    platforms: ['Windows PC'],
    engine: 'Unity 6',
    tagline: {
      en: 'Shape the wood. Find the rhythm.',
      tr: 'Ahşabı şekillendir. Ritmini bul.',
    },
    description: {
      en: [
        'SpinCraft: Wood Workshop is a relaxing woodturning simulation set in a cosy lathe workshop. Pick a customer order, mount a blank on the lathe and carve the spinning wood with your chisels until it matches the target shape: a bowl, a vase, a chess piece, a candlestick or a table leg.',
        'Once the shape is right, sand the surface smooth zone by zone, paint it stroke by stroke with a brush, choose a finish and sell the piece. The money and experience you earn unlock new wood species, better chisels, lathe upgrades and more demanding orders. When you just want to make something for yourself, free crafting mode has no customer and no target.',
        'The game is out now on itch.io for Windows PC, with English and Turkish interface languages.',
      ],
      tr: [
        'SpinCraft: Wood Workshop, sıcak bir torna atölyesinde geçen, rahatlatıcı bir ahşap tornacılığı simülasyonudur. Bir müşteri siparişi seçin, kütüğü tornaya bağlayın ve dönen ahşabı keskilerinizle hedef şekle ulaşana kadar yontun: bir kâse, bir vazo, bir satranç taşı, bir şamdan ya da bir masa ayağı.',
        'Şekil tamam olduğunda yüzeyi bölge bölge zımparalayın, fırçayla darbe darbe boyayın, bir cila seçin ve eseri satın. Kazandığınız para ve deneyimle yeni ahşap türleri, daha iyi keskiler, torna yükseltmeleri ve daha zorlu siparişler açılır. Sadece kendiniz için bir şey yapmak istediğinizde serbest üretim modunda ne müşteri ne de hedef şekil vardır.',
        'Oyun, Windows PC için itch.io’da yayında. Arayüz İngilizce ve Türkçe olarak sunuluyor.',
      ],
    },
    features: {
      en: [
        'Carve rotating wood in real time with six different turning chisels',
        '21 customer orders, each with its own hand-designed target shape',
        'Seven wood species: pine, beech, oak, walnut, cherry, maple and mahogany',
        'Zone-based sanding with 80, 120, 240 and 400 grit paper',
        'Brush painting with multiple colours and oil, satin or gloss finishes',
        'A workshop store with tools, lathe upgrades, materials and finishes',
        'Free crafting mode and a library for your finished creations',
        'Short, skippable tutorial that can be replayed from the settings',
      ],
      tr: [
        'Altı farklı torna keskisiyle dönen ahşabı gerçek zamanlı yontma',
        'Her biri elle tasarlanmış hedef şekle sahip 21 müşteri siparişi',
        'Yedi ahşap türü: çam, kayın, meşe, ceviz, kiraz, akçaağaç ve maun',
        '80, 120, 240 ve 400 kum zımpara ile bölgesel zımparalama',
        'Birden çok renkle fırça boyama; yağ, yarı mat veya parlak cila',
        'Aletler, torna yükseltmeleri, malzemeler ve cilalar sunan atölye mağazası',
        'Serbest üretim modu ve bitmiş eserler için kütüphane',
        'Ayarlardan yeniden açılabilen kısa ve atlanabilir rehber',
      ],
    },
    cover: {
      src: scFinished,
      alt: {
        en: 'A finished turned piece on the lathe in SpinCraft: Wood Workshop, with the product review panel open',
        tr: 'SpinCraft: Wood Workshop’ta tornada bitmiş bir eser ve açık ürün inceleme paneli',
      },
    },
    screenshots: [
      {
        src: scSanding,
        alt: { en: 'Sanding a workpiece on the lathe', tr: 'Tornada iş parçasını zımparalama' },
      },
      {
        src: scPainting,
        alt: { en: 'A piece painted in red and blue zones', tr: 'Kırmızı ve mavi bölgelerle boyanmış bir parça' },
      },
      {
        src: scFree,
        alt: { en: 'Free crafting mode', tr: 'Serbest üretim modu' },
      },
      {
        src: scShop,
        alt: { en: 'The workshop store and its categories', tr: 'Atölye mağazası ve kategorileri' },
      },
      {
        src: scLibrary,
        alt: { en: 'The creation library', tr: 'Eser kütüphanesi' },
      },
    ],
    mediaNote: {
      en: 'Screenshots captured from the Windows build with the Turkish interface.',
      tr: 'Ekran görüntüleri, Türkçe arayüzlü Windows sürümünden alınmıştır.',
    },
    storeLinks: [
      {
        store: 'itch.io',
        url: 'https://zerqunastudios.itch.io/spincraft-wood-workshop',
        label: { en: 'Get on itch.io', tr: "itch.io'dan Edin" },
        note: {
          en: 'The full game for Windows PC. Purchase and download through itch.io.',
          tr: 'Windows PC için tam oyun. Satın alma ve indirme itch.io üzerinden yapılır.',
        },
      },
    ],
    downloads: [],
    testedOn: 'Windows 11 · NVIDIA GeForce GTX 1650 Ti (laptop) · 1920×1080',
    controls: {
      en: [
        'Left mouse button: carve, sand or paint',
        'Mouse wheel: adjust cutting depth',
        'Right mouse button: zoom · Shift: precision cut',
        'Tab or 1–6: switch chisel',
        'Space: start or stop the lathe',
        'O: orders · U: workshop store',
        'Esc: pause / back',
      ],
      tr: [
        'Sol fare tuşu: yontma, zımparalama veya boyama',
        'Fare tekerleği: kesme derinliğini ayarlama',
        'Sağ fare tuşu: yakınlaştırma · Shift: hassas kesim',
        'Tab veya 1–6: keski değiştirme',
        'Space: tornayı başlatma veya durdurma',
        'O: siparişler · U: atölye mağazası',
        'Esc: duraklatma / geri',
      ],
    },
    fileLocations: {
      saves: '%USERPROFILE%\\AppData\\LocalLow\\Kenna Studio 97\\SpinCraft_ Wood Workshop\\',
      logs: '%USERPROFILE%\\AppData\\LocalLow\\Kenna Studio 97\\SpinCraft Wood Workshop\\Player.log',
    },
    privacy: {
      engine: 'Unity 6',
      localData: {
        en: [
          'Game progress (money, experience, orders, purchased items and the current workpiece) is saved as a file on your PC, together with a backup copy.',
          'Your finished creations are saved in a separate creation-library file on your PC.',
          'The Unity engine writes a technical log file (Player.log) on your PC. It stays on your device unless you choose to send it to us.',
        ],
        tr: [
          'Oyun ilerlemesi (para, deneyim, siparişler, satın alınan ürünler ve mevcut iş parçası) bilgisayarınızda bir dosyaya, bir yedek kopyasıyla birlikte kaydedilir.',
          'Bitmiş eserleriniz bilgisayarınızda ayrı bir eser kütüphanesi dosyasına kaydedilir.',
          'Unity motoru bilgisayarınıza teknik bir günlük dosyası (Player.log) yazar. Bu dosya, siz bize göndermeyi seçmedikçe cihazınızda kalır.',
        ],
      },
      network: UNITY_NETWORK,
    },
  },
  {
    id: 'game-02',
    slug: 'spincraft-2-creative',
    title: 'SpinCraft 2: Creative',
    status: 'in-development',
    featured: false,
    genre: { en: 'Simulation / Creative', tr: 'Simülasyon / Yaratıcı' },
    platforms: ['Windows PC'],
    engine: 'Unity 6',
    tagline: {
      en: 'Step into a full woodworking workshop.',
      tr: 'Eksiksiz bir ahşap atölyesine adım atın.',
    },
    description: {
      en: [
        'SpinCraft 2: Creative takes the woodworking of SpinCraft into a full first-person workshop. Walk between workbenches and machines, pick up boards, cut them to size at the cutting station and put your pieces together at the assembly table.',
        'The game is in active development. Everything shown here is work in progress and may change before release.',
      ],
      tr: [
        'SpinCraft 2: Creative, SpinCraft’ın ahşap işçiliğini birinci şahıs bakış açısıyla eksiksiz bir atölyeye taşıyor. Tezgâhlar ve makineler arasında dolaşın, tahtaları alın, kesim istasyonunda ölçüsüne göre kesin ve parçalarınızı montaj masasında birleştirin.',
        'Oyun aktif olarak geliştiriliyor. Burada gösterilen her şey yapım aşamasındadır ve çıkıştan önce değişebilir.',
      ],
    },
    features: {
      en: [
        'Explore a detailed first-person woodworking workshop',
        'Pick up wooden boards and cut them to size at the cutting station',
        'Separate areas for machining, material storage, assembly, finishing and display',
        'Realistic lighting and materials built with Unity’s Universal Render Pipeline',
      ],
      tr: [
        'Ayrıntılı bir ahşap atölyesini birinci şahıs bakışla keşfetme',
        'Ahşap tahtaları alıp kesim istasyonunda ölçüsüne göre kesme',
        'Makine, malzeme deposu, montaj, yüzey işleme ve sergileme için ayrı bölümler',
        'Unity Universal Render Pipeline ile gerçekçi ışık ve malzemeler',
      ],
    },
    featuresNote: {
      en: 'Features are in development and may change.',
      tr: 'Özellikler geliştirme aşamasındadır ve değişebilir.',
    },
    cover: {
      src: sc2Hud,
      alt: {
        en: 'First-person view of a workbench in the SpinCraft 2: Creative workshop',
        tr: 'SpinCraft 2: Creative atölyesinde bir tezgâhın birinci şahıs görünümü',
      },
    },
    screenshots: [
      {
        src: sc2Overview,
        alt: { en: 'Overview of the workshop building', tr: 'Atölye binasına genel bakış' },
      },
      {
        src: sc2Cutting,
        alt: { en: 'The cutting station', tr: 'Kesim istasyonu' },
      },
      {
        src: sc2Entrance,
        alt: { en: 'The workshop entrance', tr: 'Atölye girişi' },
      },
    ],
    mediaNote: {
      en: 'Work-in-progress captures from development. Not final.',
      tr: 'Geliştirme sürecinden yapım aşaması görüntüleri. Nihai değildir.',
    },
    storeLinks: [],
    downloads: [],
    privacy: {
      engine: 'Unity 6',
      localData: {
        en: [
          'Game saves are stored as files on your PC.',
          'Game settings are stored by the Unity engine in your Windows user registry.',
          'The Unity engine writes a technical log file (Player.log) on your PC. It stays on your device unless you choose to send it to us.',
        ],
        tr: [
          'Oyun kayıtları bilgisayarınızda dosya olarak saklanır.',
          'Oyun ayarları Unity motoru tarafından Windows kullanıcı kayıt defterinizde saklanır.',
          'Unity motoru bilgisayarınıza teknik bir günlük dosyası (Player.log) yazar. Bu dosya, siz bize göndermeyi seçmedikçe cihazınızda kalır.',
        ],
      },
      network: UNITY_NETWORK,
    },
  },
  {
    id: 'game-03',
    slug: 'echoes-of-the-earth',
    title: 'Echoes of the Earth',
    status: 'demo-available',
    featured: true,
    genre: { en: 'Sandbox / Survival', tr: 'Sandbox / Hayatta Kalma' },
    platforms: ['Windows PC'],
    engine: 'Unity 6',
    tagline: {
      en: 'Gather, build and grow a living world.',
      tr: 'Topla, inşa et ve yaşayan bir dünyayı büyüt.',
    },
    description: {
      en: [
        'Echoes of the Earth is a voxel sandbox game, still in active development. The world is built from blocks and generated as you explore it: plains, forests, deserts and rocky highlands, streamed in piece by piece around you. Mine and place blocks, cut down trees block by block, hunt, craft tools and build a place to live.',
        'Exploring leads you to villages with villagers and traders who have their own small economy. Trade with them, donate to help a settlement grow from a hamlet into a town, and build a reputation with the people you meet.',
        'A free demo is available on itch.io for Windows. You can download it for free, and if you would like to support development you can choose to pay what you want. It is a work-in-progress build: expect bugs, unfinished features and performance that varies between PCs. The demo’s interface is currently in Turkish.',
      ],
      tr: [
        'Echoes of the Earth, hâlâ aktif olarak geliştirilen voxel tabanlı bir sandbox oyunudur. Dünya bloklardan oluşur ve siz keşfettikçe üretilir: ovalar, ormanlar, çöller ve kayalık yaylalar, çevrenizde parça parça yüklenir. Blok kırıp yerleştirin, ağaçları blok blok kesin, avlanın, alet üretin ve kendinize yaşayacak bir yer kurun.',
        'Keşfe çıktıkça kendi küçük ekonomisi olan köylülerin ve tüccarların yaşadığı köylere ulaşırsınız. Onlarla ticaret yapın, bir yerleşimin mezradan kasabaya büyümesi için bağışta bulunun ve tanıştığınız insanlar arasında itibar kazanın.',
        'itch.io’da Windows için ücretsiz bir demo bulunuyor. Demoyu ücretsiz indirebilirsiniz; geliştirmeyi desteklemek isterseniz dilediğiniz tutarı ödemeyi seçebilirsiniz. Bu bir yapım aşaması sürümüdür: hatalar, tamamlanmamış özellikler ve bilgisayara göre değişen performans olabilir. Demonun arayüzü şu anda Türkçedir.',
      ],
    },
    features: {
      en: [
        'Generated voxel world to explore, mine and build in',
        'First-person and third-person camera',
        'Hunting, hand crafting, crafting stations, inventory and storage chests',
        'Villages with villagers, traders and a dynamic local economy',
        'Settlements that grow from hamlet to village to town',
        'Relationships, reputation and village news',
        'Multiple world save slots with autosave',
        'Low, Medium and High graphics quality presets',
      ],
      tr: [
        'Keşfedilecek, kazılacak ve inşa edilecek oluşturulmuş voksel dünya',
        'Birinci ve üçüncü şahıs kamera',
        'Avlanma, elle üretim, üretim istasyonları, envanter ve depolama sandıkları',
        'Köylüler, tüccarlar ve dinamik yerel ekonomiye sahip köyler',
        'Mezradan köye, köyden kasabaya büyüyen yerleşimler',
        'İlişkiler, itibar ve köy haberleri',
        'Otomatik kayıtlı birden çok dünya kayıt yuvası',
        'Düşük, Orta ve Yüksek grafik kalitesi seçenekleri',
      ],
    },
    featuresNote: {
      en: 'The demo is a pre-release build. Features may change.',
      tr: 'Demo, çıkış öncesi bir sürümdür. Özellikler değişebilir.',
    },
    cover: {
      src: eoteExplorer,
      alt: {
        en: 'The explorer character from Echoes of the Earth',
        tr: 'Echoes of the Earth’ün kâşif karakteri',
      },
    },
    screenshots: [],
    mediaNote: {
      en: 'Character art shown. In-game screenshots will be added soon.',
      tr: 'Karakter çizimi gösterilmektedir. Oyun içi ekran görüntüleri yakında eklenecek.',
    },
    storeLinks: [
      {
        store: 'itch.io',
        url: 'https://zerqunastudios.itch.io/echoes-of-the-earth',
        label: { en: 'Get on itch.io', tr: "itch.io'dan Edin" },
        note: {
          en: 'Free demo for Windows. Optional support: pay what you want if you would like to back development.',
          tr: 'Windows için ücretsiz demo. Destek isteğe bağlıdır: geliştirmeye katkı olarak dilediğiniz tutarı ödeyebilirsiniz.',
        },
      },
    ],
    downloads: [
      {
        title: { en: 'Free demo (Release Candidate 2)', tr: 'Ücretsiz demo (Release Candidate 2)' },
        version: 'RC2',
        platform: 'Windows x64',
        source: 'itch.io',
        url: 'https://zerqunastudios.itch.io/echoes-of-the-earth',
        size: '36 MB',
      },
    ],
    controls: {
      en: [
        'W A S D: move · Mouse: look · Space: jump · Left Shift: sprint',
        'V: switch first / third person · Mouse wheel: camera distance',
        'Hold left mouse: mine, attack or hunt · Right mouse: place block or use item',
        '1–6: hotbar · E: inventory · C: crafting · F: interact',
        'F5: save · F9: load · F3: technical panel',
        'Esc: close panel or release the mouse pointer',
      ],
      tr: [
        'W A S D: hareket · Fare: bakış · Space: zıplama · Sol Shift: koşma',
        'V: birinci / üçüncü şahıs · Fare tekerleği: kamera uzaklığı',
        'Sol tık basılı: kazma, saldırı veya avlanma · Sağ tık: blok yerleştirme veya eşya kullanma',
        '1–6: kısayol çubuğu · E: envanter · C: üretim · F: etkileşim',
        'F5: kaydet · F9: yükle · F3: teknik panel',
        'Esc: paneli kapatma veya fare imlecini bırakma',
      ],
    },
    knownIssues: {
      en: [
        'There is no dedicated quit key. Use “Save and return to world selection” from the inventory, then close the window.',
        'Do not run two copies of the game at the same time, as they share the same save folder.',
      ],
      tr: [
        'Ayrı bir çıkış tuşu yoktur. Envanterdeki “Kaydet ve dünya seçimine dön” düğmesini kullanın, ardından pencereyi kapatın.',
        'Aynı kayıt klasörünü kullandıkları için oyunun iki kopyasını aynı anda çalıştırmayın.',
      ],
    },
    fileLocations: {
      saves: '%USERPROFILE%\\AppData\\LocalLow\\Echoes\\Echoes of the Earth\\Worlds\\',
      logs: '%USERPROFILE%\\AppData\\LocalLow\\Echoes\\Echoes of the Earth\\Player.log',
    },
    privacy: {
      engine: 'Unity 6',
      localData: {
        en: [
          'Worlds are saved as files on your PC (one folder per world slot), including backup and temporary files used to protect your saves.',
          'The Unity engine writes a technical log file (Player.log) on your PC. It stays on your device unless you choose to send it to us.',
        ],
        tr: [
          'Dünyalar bilgisayarınızda dosya olarak kaydedilir (her dünya yuvası için bir klasör); kayıtlarınızı korumak için kullanılan yedek ve geçici dosyalar da buna dahildir.',
          'Unity motoru bilgisayarınıza teknik bir günlük dosyası (Player.log) yazar. Bu dosya, siz bize göndermeyi seçmedikçe cihazınızda kalır.',
        ],
      },
      network: UNITY_NETWORK,
    },
  },
  {
    id: 'game-04',
    slug: 'velkrion-the-first-breach',
    title: 'VELKRION: THE FIRST BREACH',
    status: 'demo-available',
    featured: false,
    genre: { en: 'Top-Down 2D Pixel-Art Zombie Survival Shooter', tr: 'Kuşbakışı 2D Piksel Sanat Zombi Hayatta Kalma Nişancısı' },
    platforms: ['Windows PC'],
    engine: 'Godot 4',
    tagline: {
      en: 'The outbreak starts at the Main Camp. Hold on until the gate opens.',
      tr: 'Salgın Ana Kamp’ta başlıyor. Kapı açılana kadar dayan.',
    },
    description: {
      en: [
        'VELKRION: THE FIRST BREACH is a top-down, 2D pixel-art zombie survival shooter set at the very start of an outbreak. You play a soldier at a military outpost, the Main Camp, just as communications fail and the camp’s defences begin to give way.',
        'The first chapter is playable now as a free demo. Search the dark camp with your flashlight, find weapons and supplies, get the generator running to bring the power back, then survive five minutes of growing attacks while the security gate slowly opens.',
        'The game is in active development. The demo may contain bugs, balance issues and unfinished parts, and anything in it can still change.',
      ],
      tr: [
        'VELKRION: THE FIRST BREACH, bir salgının tam başlangıcında geçen, kuşbakışı 2D piksel sanat bir zombi hayatta kalma nişancısıdır. İletişimin koptuğu ve savunmaların çökmeye başladığı bir askerî üste, Ana Kamp’ta görevli bir askeri yönetirsiniz.',
        'İlk bölüm şu anda ücretsiz demo olarak oynanabiliyor. Karanlık kampı fenerinizle arayın, silah ve malzeme bulun, elektriği geri getirmek için jeneratörü çalıştırın; ardından güvenlik kapısı yavaşça açılırken giderek şiddetlenen saldırılara beş dakika boyunca dayanın.',
        'Oyun aktif olarak geliştiriliyor. Demoda hatalar, denge sorunları ve tamamlanmamış bölümler olabilir; içindeki her şey hâlâ değişebilir.',
      ],
    },
    features: {
      en: [
        'A military outpost to explore: barracks, armory, medical wing, generator room and security office',
        'A dark atmosphere where your flashlight is often the only light',
        'Six weapons: Pistol, SMG, Assault Rifle, Shotgun, LMG and Minigun, with ammunition to manage',
        'Seven zombie types: Walker, Runner, Armored, Brute, Spitter, Crawler and Alpha, each with its own behaviour',
        'Interactive objects: doors, documents, ammo crates, weapon pickups, a fuse and an electrical panel',
        'A generator and power system: restore power and the camp lights come back on one by one',
        'A security gate that takes five minutes to open, and a defence against attack waves from several directions while it does',
        'Survival-focused play: you do not have to kill every zombie, you have to make it out',
        'A checkpoint save once the generator is running',
      ],
      tr: [
        'Keşfedilecek bir askerî üs: koğuşlar, cephanelik, revir, jeneratör odası ve güvenlik ofisi',
        'Fenerinizin çoğu zaman tek ışık kaynağı olduğu karanlık bir atmosfer',
        'Altı silah: Tabanca, SMG, Piyade Tüfeği, Pompalı, LMG ve Minigun; mühimmatı idareli kullanmak gerekir',
        'Yedi zombi türü: Walker, Runner, Armored, Brute, Spitter, Crawler ve Alpha; her birinin kendine özgü davranışı var',
        'Etkileşimli nesneler: kapılar, belgeler, cephane kutuları, silahlar, bir sigorta ve bir elektrik panosu',
        'Jeneratör ve elektrik sistemi: elektriği geri getirin, kamp ışıkları tek tek yeniden yansın',
        'Açılması beş dakika süren bir güvenlik kapısı ve bu sırada farklı yönlerden gelen saldırı dalgalarına karşı savunma',
        'Hayatta kalma odaklı oynanış: her zombiyi öldürmek zorunda değilsiniz, kurtulmanız gerekiyor',
        'Jeneratör çalıştıktan sonra alınan kontrol noktası kaydı',
      ],
    },
    featuresNote: {
      en: 'These features describe the Chapter 1 demo that is available today. Everything may still change during development.',
      tr: 'Bu özellikler bugün oynanabilen 1. Bölüm demosunu anlatır. Geliştirme sırasında her şey değişebilir.',
    },
    plannedFeatures: {
      en: [
        'A long story told across connected chapters, with a long-term goal of 250 chapters',
        'New regions beyond the military outpost',
        'A wider variety of puzzles',
        'A four-person squad',
        'Switching between squad members',
        'AI-controlled teammates',
      ],
      tr: [
        'Birbirine bağlı bölümlerle anlatılan uzun bir hikâye; uzun vadeli hedef toplam 250 bölüm',
        'Askerî üssün ötesinde yeni bölgeler',
        'Daha çeşitli bulmacalar',
        'Dört kişilik bir ekip',
        'Ekip üyeleri arasında geçiş',
        'Yapay zekâ kontrollü takım arkadaşları',
      ],
    },
    cover: {
      src: vkBackdrop,
      alt: {
        en: 'Top-down pixel-art view of the Main Camp streets in VELKRION: THE FIRST BREACH',
        tr: 'VELKRION: THE FIRST BREACH’te Ana Kamp sokaklarının kuşbakışı piksel sanat görünümü',
      },
      pixelated: true,
    },
    screenshots: [
      {
        src: vkInterior,
        alt: {
          en: 'Map overview of the Main Camp with building interiors',
          tr: 'Bina iç mekânlarıyla birlikte Ana Kamp’ın harita görünümü',
        },
        pixelated: true,
      },
      {
        src: vkArt,
        alt: {
          en: 'Zombie types and weapons artwork',
          tr: 'Zombi türleri ve silahların çizimleri',
        },
        pixelated: true,
      },
    ],
    mediaNote: {
      en: 'Work-in-progress art and map captures from development. Not final.',
      tr: 'Geliştirme sürecinden yapım aşaması çizim ve harita görüntüleri. Nihai değildir.',
    },
    storeLinks: [
      {
        store: 'itch.io',
        url: 'https://zerqunastudios.itch.io/velkrion-the-first-breach',
        label: { en: 'Get the Demo on itch.io', tr: "Demoyu itch.io'dan Edin" },
        note: {
          en: 'Free Chapter 1 demo for Windows. Optional support: pay what you want if you would like to back development.',
          tr: 'Windows için ücretsiz 1. Bölüm demosu. Destek isteğe bağlıdır: geliştirmeye katkı olarak dilediğiniz tutarı ödeyebilirsiniz.',
        },
      },
    ],
    downloads: [
      {
        title: { en: 'Free demo (Chapter 1)', tr: 'Ücretsiz demo (1. Bölüm)' },
        version: 'v0.1.0',
        platform: 'Windows',
        source: 'itch.io',
        url: 'https://zerqunastudios.itch.io/velkrion-the-first-breach',
        size: '45 MB',
      },
    ],
    controls: {
      en: [
        'W A S D: move · Shift: run',
        'Mouse: aim · Left mouse: fire',
        'R: reload · E: interact / pick up · F: flashlight',
        '1–6 or mouse wheel: switch weapon',
        'Esc: pause',
      ],
      tr: [
        'W A S D: hareket · Shift: koşma',
        'Fare: nişan · Sol fare: ateş',
        'R: şarjör değiştirme · E: etkileşim / toplama · F: fener',
        '1–6 veya fare tekerleği: silah değiştirme',
        'Esc: duraklatma',
      ],
    },
    fileLocations: {
      saves: '%APPDATA%\\Godot\\app_userdata\\DeadSectorOutbreak\\campaign_save.json',
      settings: '%APPDATA%\\Godot\\app_userdata\\DeadSectorOutbreak\\audio_settings.cfg, combat_settings.cfg',
      logs: '%APPDATA%\\Godot\\app_userdata\\DeadSectorOutbreak\\logs\\',
    },
    fileLocationsNote: {
      en: 'The folder keeps the project’s internal name so that existing saves and settings stay where they are.',
      tr: 'Mevcut kayıt ve ayarların yerinde kalması için klasör, projenin iç adını korur.',
    },
    privacy: {
      engine: 'Godot 4',
      localData: {
        en: [
          'A checkpoint save (with a copy of the previous one as a backup) is written to your PC once the generator is running. It contains game progress only: the chapter, puzzle state, your position, weapons and ammunition, opened doors, the zombies alive at that moment, your kill count and flashlight state.',
          'Audio settings and combat display settings (damage numbers, camera shake) are saved in small settings files on your PC.',
          'The Godot engine writes technical log files on your PC. They stay on your device unless you choose to send them to us.',
        ],
        tr: [
          'Jeneratör çalıştıktan sonra bilgisayarınıza bir kontrol noktası kaydı (yedek olarak bir önceki kaydın kopyasıyla birlikte) yazılır. Bu kayıt yalnızca oyun ilerlemesini içerir: bölüm, bulmaca durumu, konumunuz, silah ve mühimmatınız, açılan kapılar, o anda hayatta olan zombiler, öldürme sayınız ve fenerin durumu.',
          'Ses ayarları ve savaş görünümü ayarları (hasar rakamları, kamera sarsıntısı) bilgisayarınızda küçük ayar dosyalarına kaydedilir.',
          'Godot motoru bilgisayarınıza teknik günlük dosyaları yazar. Bu dosyalar, siz bize göndermeyi seçmedikçe cihazınızda kalır.',
        ],
      },
      network: {
        en: [
          'The game has no online features, accounts, multiplayer, advertising or in-game purchases, and its code does not send data over the internet.',
          'The Godot engine does not include analytics or telemetry, and no third-party analytics or crash-reporting services are used.',
        ],
        tr: [
          'Oyunda çevrim içi özellik, hesap, çok oyunculu mod, reklam veya oyun içi satın alma yoktur ve oyunun kodu internet üzerinden veri göndermez.',
          'Godot motoru analiz veya telemetri içermez; üçüncü taraf analiz veya çökme raporlama hizmeti kullanılmaz.',
        ],
      },
    },
  },
];

export const PRIVACY_POLICY_PATH = '/privacy-policy/';

export const gamePath = (game: Game) => `/games/${game.slug}/`;
export const supportPath = (game: Game) => `/support/${game.slug}/`;
export const privacyPath = (game: Game) => game.privacyPolicyPath ?? PRIVACY_POLICY_PATH;

export const getGame = (slug: string) => games.find((g) => g.slug === slug);

export const STATUS_ORDER: GameStatus[] = ['released', 'demo-available', 'in-development'];
