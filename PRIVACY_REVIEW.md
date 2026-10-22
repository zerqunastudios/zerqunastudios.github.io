# Privacy Review — Zerquna Studios

**Status: NOT yet confirmed ready for Microsoft Store submission.**
The published Privacy Policy (`/en/privacy-policy/`, `/tr/privacy-policy/`) only states facts that were
checked in the game project files on 22 October 2026. Several points still need the developer's
confirmation before the policy can be called final. Work through this list, update the policy where
needed, then change `privacyPolicyUpdated` in `src/data/site.ts`.

Nothing on the website claims Microsoft Store approval. Microsoft decides that during certification.

---

## 1. How the current policy was verified

| Check | Method | Result |
|---|---|---|
| Network code in game scripts | Searched all game C# / GDScript files for `UnityWebRequest`, `HttpClient`, `WebClient`, `WWW`, `Socket`, `HTTPRequest`, `HTTPClient`, `WebSocket`, `ENet`, `Analytics`, `Telemetry`, `Steamworks` | None found in any of the 4 games |
| Unity services | `ProjectSettings/UnityConnectSettings.asset` | Unity Analytics, Cloud Diagnostics (crash reporting), Performance Reporting, Ads, Purchasing: **off** in all 3 Unity games |
| Unity Cloud link | `ProjectSettings/ProjectSettings.asset` (`cloudProjectId`, `cloudEnabled`) | Not linked in any Unity game |
| Unity hardware statistics | `ProjectSettings/ProjectSettings.asset` → `submitAnalytics: 1` | **On** in all 3 Unity games → disclosed in the policy |
| Unity Engine Diagnostics | `m_EngineDiagnosticsEnabled` | On in SpinCraft 2 and Echoes, off in SpinCraft. Inactive while a project is not linked to Unity Cloud |
| Third-party packages | `Packages/manifest.json` | No analytics, ads, crash-reporting or store SDKs |
| Local saves | Save code + real folders on the dev PC | Paths listed on each support page |

**Important limit:** these checks cover the *project source and settings*, not the shipped binaries.
A build made from different settings could behave differently. See item 2.2.

---

## 2. Studio-wide items to confirm

- [ ] **2.1 Data controller identity.** Under the GDPR and Turkey's KVKK (Law No. 6698), a privacy notice
  normally names the data controller. The policy currently says "Zerquna Studios" with the email
  address. Because the account is an individual developer account, decide whether to add your legal
  name and a contact address, and whether any KVKK obligations (for example VERBİS registration) apply
  to you. Ask a legal professional if unsure. *The site does not claim Zerquna Studios is a registered company.*
- [ ] **2.2 Test the shipped builds for network traffic.** Run each released/demo build with a network
  monitor (for example Windows Resource Monitor → Network, Fiddler or Wireshark) and confirm which
  servers it contacts. If you see connections to Unity (for example `*.unity3d.com`), the current
  "hardware statistics" disclosure is correct. If you see anything else, update the policy before submission.
- [ ] **2.3 Decide on Unity hardware statistics.** Either keep the setting and the disclosure (current
  state), or turn it off in Unity 6 for each project and rebuild. If you turn it off **and** confirm no
  Unity traffic in 2.2, simplify the `UNITY_NETWORK` text in `src/data/games.ts` and section 5.1 of the policy.
- [ ] **2.4 Never link a game project to Unity Cloud without updating the policy first.** Engine
  Diagnostics is switched on in SpinCraft 2 and Echoes; linking them to Unity Cloud would start sending
  crash/diagnostic data to Unity's dashboard.
- [ ] **2.5 Email retention period.** The policy says support emails are kept "only as long as needed".
  Choose a concrete period (for example 24 months after the last message) and add it to section 9.
- [ ] **2.6 Email account security.** The policy says support emails are protected by your provider's
  security features. Turn on 2-Step Verification for `zerquna.studios@gmail.com` so this is clearly true.
- [ ] **2.7 What stores share with you.** Check what itch.io and Microsoft Partner Center actually show you
  about buyers (for example whether itch.io shows buyer email addresses). Section 3.2 currently says this
  in general terms. Make it specific once confirmed.
- [ ] **2.8 Age ratings.** Microsoft Store uses the IARC questionnaire. Complete it honestly for each game
  (Dead Sector: Outbreak contains zombie combat). Section 7 points players to the store ratings and makes
  no age claims of its own.
- [ ] **2.9 HTTPS.** The policy says the site is served over HTTPS. This is automatic on `*.github.io`.
  If you add a custom domain, tick **Enforce HTTPS** in the repository's Pages settings.
- [ ] **2.10 Studio name inside the builds.** The Unity projects still use the company name
  **"Kenna Studio 97"** (SpinCraft also shows "KENNA STUDIO 97" in its main menu; Echoes uses "Echoes").
  The Microsoft Store publisher name, the in-game credits and the website should match.
  **Warning:** changing Unity's *Company Name* changes the save folder
  (`AppData\LocalLow\<Company>\<Product>`), so existing players would lose their saves unless you add a
  migration. After any change, update `fileLocations` in `src/data/games.ts`.
- [ ] **2.11 Before adding any online feature** (accounts, cloud saves, leaderboards, workshop/sharing,
  analytics, crash reporting, ads, in-app purchases, Steam), update the policy and the third-party table
  in `src/pages/[lang]/privacy-policy.astro` **before** the update ships.

---

## 3. Per-game checklist

### SpinCraft — Released (itch.io) · Unity 6000.6.4f1
Project: `D:\Proje\SpinCraft`

| Item | Status |
|---|---|
| No network code in game scripts | ✅ verified |
| Unity Analytics / Cloud Diagnostics / Performance Reporting off | ✅ verified |
| Not linked to Unity Cloud | ✅ verified |
| Unity hardware statistics on (`submitAnalytics: 1`) | ⚠️ on — disclosed |
| Save: `spincraft-save.json` (+ `.bak`), creations: `spincraft-creations.json` (+ `.bak`) in `%USERPROFILE%\AppData\LocalLow\Kenna Studio 97\SpinCraft_ Wood Workshop\` | ✅ verified on dev PC |
| Log: `...\Kenna Studio 97\SpinCraft Wood Workshop\Player.log` | ✅ verified on dev PC |
| No `PlayerPrefs` (no registry settings) | ✅ verified |
| The itch.io build was made from these same project settings | ☐ confirm |
| Network test of the itch.io build (item 2.2) | ☐ to do |
| Official itch.io page URL → add to `storeLinks` | ☐ missing |
| Release date and version number → add `releaseDate` | ☐ missing |
| Official system requirements → add `requirements` | ☐ missing (only the dev test PC is shown, clearly labelled) |
| Interface languages (screenshots show Turkish) | ☐ confirm, then mention on the game page if useful |
| Gameplay trailer → add `trailerYouTubeId` | ☐ none yet |

### SpinCraft 2: Creative — In Development · Unity 6000.6.4f1
Project: `D:\SpinCraft2Creative\SpinCraft2_Creative`

| Item | Status |
|---|---|
| No network code in game scripts | ✅ verified |
| Unity services off, not linked to Unity Cloud | ✅ verified |
| Unity hardware statistics on | ⚠️ on — disclosed |
| Engine Diagnostics on (inactive without Unity Cloud) | ⚠️ see item 2.4 |
| Saves: `Application.persistentDataPath\SpinCraft2\Saves` | ✅ verified in code |
| Settings: Unity `PlayerPrefs` → Windows registry (`HKCU\Software\Kenna Studio 97\SpinCraft 2: Creative`) | ✅ verified in code |
| "Creative" features: will creations ever be **shared online**? If yes, a policy update is required first | ☐ decide |
| File locations on the support page | ☐ add at release (left empty on purpose) |
| Store links, release date, requirements | ☐ at release |

### Echoes of the Earth — Demo Available · Unity 6000.6.4f1
Project: `D:\Echoes of The Earth\EchoesOfTheEarth`

| Item | Status |
|---|---|
| No network code in game scripts | ✅ verified |
| Unity services off, not linked to Unity Cloud | ✅ verified |
| Unity hardware statistics on | ⚠️ on — disclosed |
| Engine Diagnostics on (inactive without Unity Cloud) | ⚠️ see item 2.4 |
| World saves: `%USERPROFILE%\AppData\LocalLow\Echoes\Echoes of the Earth\Worlds\` (+ `.bak`, `.tmp`, `.regions`) | ✅ verified |
| Log: same product folder, `Player.log` | ✅ verified |
| Official demo download link (itch.io / GitHub Releases) → add to `downloads` | ☐ missing — the Downloads page shows "coming soon" |
| Demo version number and file size | ☐ missing |
| In-game screenshots (only character art is shown now) | ☐ add |
| Network test of the demo build (item 2.2) | ☐ to do |

### Dead Sector: Outbreak — In Development · Godot 4.7.2
Project: `D:\DeadSectorOutbreak`

| Item | Status |
|---|---|
| No network code (`HTTPRequest`, `HTTPClient`, `WebSocket`, `ENet`, multiplayer) | ✅ verified |
| No analytics / telemetry addons | ✅ verified (Godot has no built-in telemetry) |
| Audio settings: `user://audio_settings.cfg` | ✅ verified in code |
| Godot log files in the user data folder | ✅ folder seen on dev PC (`%APPDATA%\Godot\app_userdata\DeadSectorOutbreak\logs`) |
| Save system for the final game (chapters, progress) | ☐ add to `privacy.localData` when it exists |
| Exported build's user-data path | ☐ confirm after export, then add `fileLocations` |
| Store links, release date, requirements | ☐ at release |

---

## 4. Microsoft Store (Partner Center) fields

Use these after the site is live. Replace `<SITE>` with the published address.

| Partner Center field | Value |
|---|---|
| Privacy policy URL | `<SITE>/en/privacy-policy/` |
| Website | `<SITE>/en/` |
| Support contact info | `<SITE>/en/support/<game-slug>/` (or `zerquna.studios@gmail.com`) |
| Developer contact | `zerquna.studios@gmail.com` |

Game slugs: `spincraft`, `spincraft-2-creative`, `echoes-of-the-earth`, `dead-sector-outbreak`.

Microsoft Store Policies (version 7.20, checked 22 Oct 2026), policy **10.5.1**: Win32 / Desktop Bridge
products must always have a privacy policy; it must say what personal information is accessed,
collected or transmitted, how it is used, stored and secured, who it is disclosed to, what controls
users have, and it must be kept up to date.
Source: https://learn.microsoft.com/windows/apps/publish/store-policies

---

## 5. Adding a new game

1. Add the game to `src/data/games.ts`, including an accurate `privacy` block.
2. Repeat the checks in section 1 for that game's project.
3. If its data handling differs from the central policy in a way the per-game section cannot describe,
   create `src/pages/[lang]/privacy-policy-<slug>.astro` and set `privacyPolicyPath` for that game.
4. Add a checklist for it in section 3 of this file.
