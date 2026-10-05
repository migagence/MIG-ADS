# MIG Ecosystem — Landing page (refonte CRO)

Landing page orientée prise de rendez-vous (diagnostic gratuit) pour MIG, construite avec **Astro 7**, TypeScript, CSS natif et un minimum de JavaScript. Aucun framework front, aucune bibliothèque d’animation.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère ./dist (HTML statique + images optimisées)
npm run preview  # sert ./dist
```

Le site est 100 % statique : `dist/` se déploie sur n’importe quel hébergeur (Vercel, Netlify, Cloudflare Pages, S3…).

## Déploiement Vercel

```bash
vercel deploy --prod
```

- Démo en ligne : **https://mig-ecosystem-lp.vercel.app** (projet Vercel `prat-enzos-projects/mig-landing`, protection par authentification désactivée pour que le client puisse la voir).
- Sans variable `SITE_URL`, le déploiement est traité comme une **démo** : balise `noindex`, URLs absolues (Open Graph, canonical) basées sur `DEMO_URL` (défini sur Vercel) ou, à défaut, sur l’URL Vercel du déploiement.
- Pour la mise en production sur le vrai domaine : ajouter la variable d’environnement `SITE_URL=https://www.migecosystem.com` dans le projet Vercel, puis redéployer. La page redevient indexable et les URLs absolues pointent vers le domaine.
- `src/data/site.ts` (`url`) reste la source du domaine final utilisé dans le JSON-LD.

## Où modifier le contenu

Tout le contenu éditorial est centralisé dans `src/data/` :

| Fichier | Contenu |
| --- | --- |
| `site.ts` | URLs (Calendly, Trustpilot), microcopy CTA, chiffres de preuve, IDs analytics |
| `caseStudies.ts` | Les 4 cas clients en dropdowns (avant / après / métriques / avis vérifié / captures) |
| `videoTestimonials.ts` | Les 3 témoignages vidéo (citation, nom, poster, vidéo à fournir) |
| `testimonials.ts` | Témoignages texte (verbatim) conservés pour réutilisation |
| `clients.ts` | Logos clients du bandeau défilant (hero) |
| `method.ts` | Les 4 piliers de la méthode + extraits d’outils + vidéo Wistia (hero) |
| `proofScreens.ts` | Captures d’avis Trustpilot du mur de preuves |
| `diagnostic.ts` | Les 4 étapes du diagnostic (bloc final) |
| `fit.ts` | Pour qui / pas pour qui (bloc final) |
| `faq.ts` | Objections et réponses |
| `experiments.ts` | Tests A/B (variantes de titre, preuve hero, libellé CTA) |

Les images sources sont dans `src/assets/` et sont optimisées au build (WebP/PNG, densités 1x/2x/3x).

## Règle de crédibilité

Chaque chiffre affiché est sourcé dans les commentaires des fichiers de données (landing page actuelle, page Calendly, fiche Trustpilot vérifiée le 30/09/2026 : 4,7/5, 56 avis). Ne pas ajouter de métrique sans source vérifiable.

## Prise de rendez-vous

- Les CTA sont des liens vers Calendly (fonctionnent sans JavaScript).
- Avec JavaScript, ils ouvrent un modal (`BookingModal`) qui charge Calendly en inline **uniquement à l’ouverture**.
- Les paramètres `utm_*`, `gclid` et `fbclid` de l’URL d’arrivée sont conservés en `sessionStorage` et transmis à Calendly.
- Un lien de secours ouvre Calendly dans un nouvel onglet si le widget ne charge pas.

## Tracking

Tous les événements sont poussés dans `window.dataLayer` (compatible Google Tag Manager) et relayés vers `gtag` / `fbq` s’ils sont présents. Événements :

`hero_cta_click`, `header_cta_click`, `results_cta_click`, `sticky_cta_click`, `final_cta_click`, `hero_secondary_click`, `hero_proof_click`, `nav_click`, `leaks_method_click`, `case_study_open`, `trustpilot_click`, `method_interaction` (nœud du diagramme ou lecture vidéo), `faq_open`, `calendly_open`, `booking_slot_selected`, `booking_complete`, `experiment_exposure`.

Chaque événement embarque les paramètres de campagne conservés et les variantes A/B actives.

### Activer le pixel Meta ou GTM

Deux méthodes, au choix.

**Méthode 1 — dans le code** (recommandée si tu n’as pas accès au compte Vercel qui déploie). Dans `src/data/site.ts`, en haut du bloc `analytics` :

```ts
const META_PIXEL_ID = '39199030669683909'; // ton ID, chiffres uniquement
```

Commite et pousse : le déploiement se déclenche tout seul. Un ID de pixel n’est pas un secret, il apparaît de toute façon en clair dans le code de la page.

**Méthode 2 — par variable d’environnement Vercel** (prioritaire sur la valeur du code) :

| Variable | Effet |
| --- | --- |
| `PUBLIC_META_PIXEL_ID` | ID du pixel Meta |
| `PUBLIC_GTM_ID` | ID Google Tag Manager |

Le préfixe `PUBLIC_` est obligatoire, c’est lui qui autorise Astro à exposer la valeur au navigateur. Le site étant statique, **un redéploiement est nécessaire** après chaque changement.

Laisser vide des deux côtés = aucun script de tracking n’est chargé. À n’activer qu’avec un bandeau de consentement (RGPD).

### Déploiement automatique

Le dépôt `migagence/MIG-ADS` est relié au compte Vercel de MIG (`mig-09eb`), sur deux projets : `mig-ads` et `mig-lp`. Chaque push sur `main` les déploie automatiquement. Pour passer en production sur le vrai domaine, y définir `SITE_URL=https://www.migecosystem.com` (sans elle, la page reste en `noindex`).

## Tests A/B

Définis dans `src/data/experiments.ts`. Trois tests préparés :

- `headline` : A « On transforme ton acquisition en système de croissance. » / B « Plus de CA. Pas simplement plus de budget Ads. »
- `heroProof` : `case` (cas client sous le CTA) / `trustpilot` (note Trustpilot sous le CTA)
- `cta` : A « Réserver mon diagnostic gratuit » / B « Identifier mes leviers de croissance »

Par défaut `active: false` → tout le monde voit la variante de contrôle. Passer `active: true` sur **un** test à la fois pour répartir aléatoirement (persistance en `localStorage`). Prévisualiser une combinaison : `/?exp=headline:B,cta:B,heroProof:trustpilot`. L’affectation se fait avant le premier rendu (aucun flash) et est trackée via `experiment_exposure`.

## À confirmer par MIG avant mise en ligne (TODO dans le code)

- `src/data/videoTestimonials.ts` : 2 vidéos intégrées (Leo / EziClic et Julien / Da Licences, `public/video/`). La 3ᵉ (Ambre / Lünae Paris) reste à fournir : la carte affiche un visuel d’attente.
- `src/data/caseStudies.ts` : 4 cas avec captures Shopify (Cosmetic Hair Shop, Siho, Attar Studio, Joia Paris). Wood Vibe a été retiré le 05/10/2026.
- `src/data/clients.ts` : 15 logos clients. Un 16ᵉ logo du dossier Drive n’est pas téléchargeable (droits d’accès) et Natural 5 n’est pas exploitable en monochrome : à renvoyer en PNG transparent si besoin.
- Les témoignages texte de Jean-Christophe Gadrat (Siho) et Johanna Saada (Joia) citent des chiffres arrondis différents des chiffres affichés (4K→40K vs 5K→35K ; 250K→650K vs 4K→250K/mois). Verbatims conservés tels quels : décision MIG du 05/10/2026, ne pas harmoniser.
- Partenaires (« Nous sommes partenaires de », en tête de la section témoignages) : Klaviyo, Shopify Partner, Meta Business Partner, Kanal, badge Google Partner. Le badge est recomposé (G officiel + texte) : remplacer par le fichier officiel de MIG si disponible.
- « +180 marques accompagnées » : chiffre communiqué par MIG (vidéo Tella du 01/10/2026).

- `src/data/faq.ts` : le déroulé exact après le diagnostic.
- `src/pages/mentions-legales.astro` et `src/pages/confidentialite.astro` : contenus juridiques.
- `src/data/site.ts` : ID du pixel Meta et consentement ; la fiche Trustpilot mentionne « +100 marques », la landing actuelle « +60 » — la page conserve +60.
- Le lien Calendly principal est celui des boutons du site actuel (`calendly.com/d/cqhc-yrt-fft/appel-decouverte-mig`) ; l’ancien widget inline (`calendly.com/ismaelmig/appeldedecouverte`) est conservé en secours.
