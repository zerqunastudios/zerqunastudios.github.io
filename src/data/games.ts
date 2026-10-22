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

import dsBackdrop from '../assets/games/dead-sector-outbreak/menu-backdrop.webp';
import dsInterior from '../assets/games/dead-sector-outbreak/interior-overview.webp';
import dsArt from '../assets/games/dead-sector-outbreak/art-overview.webp';

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
    title: 'SpinCraft',
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
        'SpinCraft is a woodturning simulation set in a cosy lathe workshop. Pick a customer order, mount a blank and carve the spinning wood with a set of turning chisels until it matches the target profile.',
        'Sand the surface smooth, paint it stroke by stroke, choose a finish and sell your work. Earn money and experience, buy better tools and new wood species, and take on more demanding orders.',
      ],
      tr: [
        'SpinCraft, sıcak bir torna atölyesinde geçen bir ahşap tornacılığı simülasyonudur. Bir müşteri siparişi seçin, kütüğü tornaya bağlayın ve dönen ahşabı keskilerle hedef profile ulaşana kadar yontun.',
        'Yüzeyi zımparalayın, fırça darbeleriyle boyayın, bir cila seçin ve eserinizi satın. Para ve deneyim kazanın, daha iyi aletler ve yeni ahşap türleri satın alın, daha zorlu siparişlere geçin.',
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
        en: 'A finished turned piece on the lathe in SpinCraft, with the product review panel open',
        tr: 'SpinCraft’ta tornada bitmiş bir eser ve açık ürün inceleme paneli',
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
    storeLinks: [],
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
        'Echoes of the Earth is a voxel sandbox survival game. Explore a generated world, mine and place blocks, hunt, craft tools and build a place to live.',
        'Villages are home to villagers and traders with their own economy. Trade, donate to help settlements grow from a hamlet into a town, and build a reputation with the people you meet.',
      ],
      tr: [
        'Echoes of the Earth, voksel tabanlı bir sandbox hayatta kalma oyunudur. Oluşturulan bir dünyayı keşfedin, blok kırın ve yerleştirin, avlanın, alet üretin ve kendinize yaşayacak bir yer kurun.',
        'Köylerde kendi ekonomisi olan köylüler ve tüccarlar yaşar. Ticaret yapın, yerleşimlerin mezradan kasabaya büyümesi için bağışta bulunun ve tanıştığınız insanlar arasında itibar kazanın.',
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
    storeLinks: [],
    downloads: [],
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
    slug: 'dead-sector-outbreak',
    title: 'Dead Sector: Outbreak',
    status: 'in-development',
    featured: false,
    genre: { en: '2D Top-Down Zombie Shooter', tr: '2D Kuşbakışı Zombi Nişancı' },
    platforms: ['Windows PC'],
    engine: 'Godot 4',
    tagline: {
      en: 'Sector 07 has fallen. Fight your way out.',
      tr: 'Sektör 07 düştü. Çıkışa kadar savaş.',
    },
    description: {
      en: [
        'Dead Sector: Outbreak is a 2D top-down zombie shooter with a pixel-art look. A military outpost has been overrun, and you must fight through its barracks, armory, medical wing and generator room to survive.',
        'Scavenge weapons and ammunition, keep your flashlight ready, and learn how each type of infected moves and attacks.',
      ],
      tr: [
        'Dead Sector: Outbreak, piksel sanat görünümüne sahip 2D kuşbakışı bir zombi nişancı oyunudur. Bir askerî üs istila edildi; hayatta kalmak için koğuşlar, cephanelik, revir ve jeneratör odası boyunca savaşmalısınız.',
        'Silah ve cephane toplayın, fenerinizi hazır tutun ve her enfekte türünün nasıl hareket ettiğini ve saldırdığını öğrenin.',
      ],
    },
    features: {
      en: [
        'Seven zombie types, from the Walker and Runner to the Brute, Spitter and Alpha',
        'Six weapons: Pistol, SMG, Assault Rifle, Shotgun, LMG and Minigun',
        'A military outpost map with distinct buildings to explore',
        'Flashlight, ammunition pickups and weapon switching',
        'Hand-made pixel art',
      ],
      tr: [
        'Walker ve Runner’dan Brute, Spitter ve Alpha’ya kadar yedi zombi türü',
        'Altı silah: Tabanca, SMG, Piyade Tüfeği, Pompalı, LMG ve Minigun',
        'Keşfedilecek farklı binalara sahip askerî üs haritası',
        'Fener, cephane toplama ve silah değiştirme',
        'Elle çizilmiş piksel sanat',
      ],
    },
    featuresNote: {
      en: 'Features are in development and may change.',
      tr: 'Özellikler geliştirme aşamasındadır ve değişebilir.',
    },
    cover: {
      src: dsBackdrop,
      alt: {
        en: 'Top-down pixel-art view of the Sector 07 outpost streets in Dead Sector: Outbreak',
        tr: 'Dead Sector: Outbreak’te Sektör 07 üssünün sokaklarının kuşbakışı piksel sanat görünümü',
      },
      pixelated: true,
    },
    screenshots: [
      {
        src: dsInterior,
        alt: {
          en: 'Map overview of the outpost with building interiors',
          tr: 'Bina iç mekânlarıyla birlikte üssün harita görünümü',
        },
        pixelated: true,
      },
      {
        src: dsArt,
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
    storeLinks: [],
    downloads: [],
    controls: {
      en: [
        'W A S D: move · Shift: sprint',
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
    privacy: {
      engine: 'Godot 4',
      localData: {
        en: [
          'Audio settings are saved in a small settings file on your PC.',
          'The Godot engine writes technical log files on your PC. They stay on your device unless you choose to send them to us.',
        ],
        tr: [
          'Ses ayarları bilgisayarınızda küçük bir ayar dosyasına kaydedilir.',
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
