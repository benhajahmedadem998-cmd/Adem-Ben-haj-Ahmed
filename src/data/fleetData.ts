import heroImg from '../assets/images/hero_auros_supercar_1794691598434.jpg';
import whyChooseImg from '../assets/images/why_auros_rear_supercar_1794691600242.jpg';
import keyFobImg from '../assets/images/luxury_key_fob_1794691600078.jpg';
import catLuxeImg from '../assets/images/cat_luxury_sedan_1794691598156.jpg';
import catSuvImg from '../assets/images/cat_luxury_suv_1794691598932.jpg';
import catSportImg from '../assets/images/cat_sports_supercar_1794691600051.jpg';
import catEcoImg from '../assets/images/cat_economy_city_1794691599784.jpg';
import catVanImg from '../assets/images/cat_minibus_van_1794691599633.jpg';

export type CategoryId = 'luxe' | 'suv' | 'sport' | 'eco' | 'van';

export interface VehicleCategory {
  id: CategoryId;
  title: string;
  subtitle: string;
  image: string;
  startingPricePerDay: number;
  accentTone: 'gold' | 'emerald';
}

export interface FleetVehicle {
  id: string;
  categoryId: CategoryId;
  name: string;
  subtitle: string;
  pricePerDay: number;
  power: string;
  transmission: string;
  seats: number;
  fuel: string;
  hasAc?: boolean;
  isAvailable?: boolean;
  acceleration: string;
  luggage: string;
  insurance: string;
  description: string;
  features: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
  quote: string;
}

export interface SearchBookingCriteria {
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
}

export const RENTAL_LOCATIONS = [
  'AUROS CARS DJERBA',
  'AUROS CARS TUNIS — Aéroport Carthage',
  'AUROS CARS LES BERGES DU LAC',
  'AUROS CARS HAMMAMET / ENFIDHA',
  'AUROS CARS SOUSSE',
];

export const TIME_SLOTS = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '21:00',
  '22:00',
];

export const BRAND_IMAGES = {
  hero: heroImg,
  whyChoose: whyChooseImg,
  keyFob: keyFobImg,
};

export const VEHICLE_CATEGORIES: VehicleCategory[] = [
  {
    id: 'luxe',
    title: 'Voitures de Luxe',
    subtitle: 'Élégance au volant',
    image: catLuxeImg,
    startingPricePerDay: 690,
    accentTone: 'gold',
  },
  {
    id: 'suv',
    title: 'SUV & 4x4',
    subtitle: 'Confort et puissance',
    image: catSuvImg,
    startingPricePerDay: 540,
    accentTone: 'emerald',
  },
  {
    id: 'sport',
    title: 'Voitures Sportives',
    subtitle: 'Sensations garanties',
    image: catSportImg,
    startingPricePerDay: 1450,
    accentTone: 'gold',
  },
  {
    id: 'eco',
    title: 'Économiques',
    subtitle: 'Économisez en toute sérénité',
    image: catEcoImg,
    startingPricePerDay: 145,
    accentTone: 'emerald',
  },
  {
    id: 'van',
    title: 'Minibus & Vans',
    subtitle: 'Voyagez en groupe',
    image: catVanImg,
    startingPricePerDay: 420,
    accentTone: 'gold',
  },
];

export const FLEET_VEHICLES: FleetVehicle[] = [
  {
    id: 'bmw-serie-3',
    categoryId: 'luxe',
    name: 'BMW Série 3',
    subtitle: 'Élégance, Performance et Liberté',
    pricePerDay: 120,
    power: '184 CH',
    transmission: 'Automatique',
    seats: 5,
    fuel: 'Essence',
    acceleration: '7,1 s (0–100)',
    luggage: '3 valises',
    insurance: 'Assurance tous risques incluse',
    description:
      'Berline dynamique alliant précision de conduite bavaroise, cockpit numérique incurvé et confort acoustique haut de gamme pour tous vos trajets.',
    features: ['Cockpit BMW Live', 'Feux Full LED adaptatifs', 'Aide au stationnement 360°', 'Climatisation tri-zone'],
    image: catLuxeImg,
  },
  {
    id: 'mercedes-classe-c',
    categoryId: 'luxe',
    name: 'Mercedes Classe C',
    subtitle: 'Raffinement Moderne et Confort Absolu',
    pricePerDay: 145,
    power: '204 CH',
    transmission: 'Automatique',
    seats: 5,
    fuel: 'Essence',
    acceleration: '7,3 s (0–100)',
    luggage: '3 valises',
    insurance: 'Assurance tous risques incluse',
    description:
      'Inspirée de la Classe S, la Mercedes Classe C conjugue écran central MBUX, éclairage d’ambiance 64 couleurs et conduite souple sur toutes distances.',
    features: ['Écran MBUX tactile', 'Éclairage d’ambiance', 'Sièges confort cuir', 'Caméra de recul HD'],
    image: heroImg,
  },
  {
    id: 'audi-a4',
    categoryId: 'luxe',
    name: 'Audi A4',
    subtitle: 'Précision Technologique et Sobriété',
    pricePerDay: 135,
    power: '190 CH',
    transmission: 'Automatique',
    seats: 5,
    fuel: 'Essence',
    acceleration: '7,2 s (0–100)',
    luggage: '3 valises',
    insurance: 'Assurance tous risques incluse',
    description:
      'Ligne affûtée, Audi Virtual Cockpit et boîte S-Tronic réactive : une berline équilibrée pour les voyages d’affaires comme les escapades côtières.',
    features: ['Audi Virtual Cockpit', 'Boîte S-Tronic 7 rapports', 'Apple CarPlay & Android Auto', 'Régulateur de vitesse'],
    image: heroImg,
  },
  {
    id: 'tesla-model-3',
    categoryId: 'eco',
    name: 'Tesla Model 3',
    subtitle: 'Silence Électrique et Innovation Pure',
    pricePerDay: 160,
    power: '283 CH',
    transmission: 'Automatique',
    seats: 5,
    fuel: 'Électrique',
    acceleration: '6,1 s (0–100)',
    luggage: '3 valises',
    insurance: 'Assurance tous risques incluse',
    description:
      'Accélération instantanée, toit panoramique intégral et Autopilot de série pour découvrir la Tunisie dans un silence total et zéro émission.',
    features: ['Toit panoramique intégral', 'Écran central 15 pouces', 'Autopilot inclus', 'Recharge rapide incluse'],
    image: catEcoImg,
  },
  {
    id: 'toyota-corolla',
    categoryId: 'eco',
    name: 'Toyota Corolla',
    subtitle: 'Fiabilité Exemplaire et Sérénité',
    pricePerDay: 95,
    power: '122 CH',
    transmission: 'Automatique',
    seats: 5,
    fuel: 'Hybride Essence',
    acceleration: '9,5 s (0–100)',
    luggage: '3 valises',
    insurance: 'Assurance tous risques incluse',
    description:
      'Berline compacte hybride reconnue pour sa faible consommation et son confort urbain, idéale pour vos déplacements quotidiens et circuits touristiques.',
    features: ['Motorisation Hybride', 'Toyota Safety Sense', 'Caméra de recul', 'Faible consommation 4,5 L/100'],
    image: catEcoImg,
  },
  {
    id: 'bmw-serie-5',
    categoryId: 'luxe',
    name: 'BMW Série 5',
    subtitle: 'Stature Exécutive et Grand Tourisme',
    pricePerDay: 220,
    power: '252 CH',
    transmission: 'Automatique',
    seats: 5,
    fuel: 'Essence',
    acceleration: '6,1 s (0–100)',
    luggage: '4 valises',
    insurance: 'Assurance tous risques incluse',
    description:
      'Espace arrière généreux, châssis adaptatif et finitions cuir Dakota : la berline d’affaires par excellence pour vos déplacements VIP.',
    features: ['Système Hi-Fi Harman Kardon', 'Suspension adaptative', 'Sièges électriques à mémoire', 'Pack Confort Exécutif'],
    image: catSportImg,
  },
  {
    id: 's580-maybach',
    categoryId: 'luxe',
    name: 'Mercedes-Benz Classe S 580',
    subtitle: 'Berline Exécutive · Pack Chauffeur en option',
    pricePerDay: 690,
    power: '503 ch',
    transmission: 'Automatique 9G',
    seats: 5,
    fuel: 'Hybride Essence',
    acceleration: '4,4 s (0–100)',
    luggage: '4 valises',
    insurance: 'Assurance tous risques premium incluse',
    description:
      'La référence absolue de la berline exécutive : insonorisation acoustique de pointe, suspension pneumatique AIRMATIC et habitacle cuir Nappa conçu pour vos déplacements VIP.',
    features: ['Sièges massants & ventilés', 'Audio Burmester 4D', 'Éclairage d’ambiance actif', 'Affichage tête haute AR'],
    image: catLuxeImg,
  },
  {
    id: 'bentley-spur',
    categoryId: 'luxe',
    name: 'Bentley Flying Spur Azure',
    subtitle: 'Grand Tourisme · Intérieur Cuir Matelassé',
    pricePerDay: 1290,
    power: '542 ch',
    transmission: 'Automatique 8G',
    seats: 4,
    fuel: 'Essence V8',
    acceleration: '4,1 s (0–100)',
    luggage: '3 valises',
    insurance: 'Assurance tous risques prestige incluse',
    description:
      'Alliant artisanat britannique et puissance V8 biturbo, la Flying Spur Azure offre une prestance incomparable pour les cérémonies, galas et trajets présidentiels.',
    features: ['Cuir matelassé cousu main', 'Placages boiserie vernie', 'Pack Bien-être arrière', 'Toit ouvrant panoramique'],
    image: catLuxeImg,
  },
  {
    id: 'range-rover-auto',
    categoryId: 'suv',
    name: 'Range Rover Autobiography',
    subtitle: 'SUV Prestige 4x4 · Suspension Pneumatique',
    pricePerDay: 640,
    power: '440 ch',
    transmission: 'Intégrale Auto',
    seats: 5,
    fuel: 'Hybride Rechargeable',
    acceleration: '5,5 s (0–100)',
    luggage: '5 valises',
    insurance: 'Assurance tous risques 4x4 incluse',
    description:
      'Confort royal sur autoroute comme sur les pistes côtières de Djerba ou du Cap Bon. Son architecture hybride rechargeable offre silence urbain et grande autonomie.',
    features: ['Transmission intégrale Terrain Response', 'Audio Meridian Signature', 'Sièges Executive arrière', 'Caméras 360° 3D'],
    image: catSuvImg,
  },
  {
    id: 'velar-r-dynamic',
    categoryId: 'suv',
    name: 'Range Rover Velar Black Edition',
    subtitle: 'SUV Urbain & Route · Toit Panoramique',
    pricePerDay: 540,
    power: '300 ch',
    transmission: 'Intégrale 8G',
    seats: 5,
    fuel: 'Essence Turbo',
    acceleration: '6,4 s (0–100)',
    luggage: '4 valises',
    insurance: 'Assurance tous risques incluse',
    description:
      'Silhouette minimaliste noir obsidienne, poignées affleurantes et double écran Pivi Pro : le SUV idéal pour conjuguer dynamisme et élégance au quotidien.',
    features: ['Pack Black Exterior', 'Toit panoramique vitré', 'Apple CarPlay sans fil', 'Régulateur adaptatif'],
    image: catSuvImg,
  },
  {
    id: 'ferrari-488-pista',
    categoryId: 'sport',
    name: 'Ferrari 488 Pista',
    subtitle: 'Supercar V8 Biturbo · Carbone & Alcantara',
    pricePerDay: 1850,
    power: '720 ch',
    transmission: 'F1 Double Embrayage',
    seats: 2,
    fuel: 'Essence V8',
    acceleration: '2,85 s (0–100)',
    luggage: '2 bagages cabine',
    insurance: 'Assurance circuit routier & tous risques incluse',
    description:
      'Issue de la technologie de compétition, la 488 Pista délivre 720 chevaux avec une précision chirurgicale et une sonorité V8 inoubliable.',
    features: ['Aérodynamique S-Duct carbone', 'Freins carbone-céramique', 'Volant LED à palettes F1', 'Télémétrie embarquée'],
    image: catSportImg,
  },
  {
    id: 'amg-gt-black',
    categoryId: 'sport',
    name: 'Mercedes-AMG GT Coupé',
    subtitle: 'Coupé Sportif · Échappement Performance',
    pricePerDay: 1450,
    power: '585 ch',
    transmission: 'Speedshift DCT',
    seats: 2,
    fuel: 'Essence V8',
    acceleration: '3,6 s (0–100)',
    luggage: '2 valises',
    insurance: 'Assurance tous risques sport incluse',
    description:
      'Moteur V8 biturbo assemblé à la main, long capot sculpté et boîte transaxle : le pur plaisir Grand Tourisme sur la côte méditerranéenne.',
    features: ['Échappement AMG Performance', 'Sièges baquets AMG', 'Différentiel autobloquant', 'Modes Race & Sport+'],
    image: whyChooseImg,
  },
  {
    id: 'audi-a1-sportback',
    categoryId: 'eco',
    name: 'Audi A1 Sportback S-Line',
    subtitle: 'Citadine Premium · Faible Consommation',
    pricePerDay: 165,
    power: '110 ch',
    transmission: 'S-Tronic Auto',
    seats: 5,
    fuel: 'Essence TFSI',
    acceleration: '9,8 s (0–100)',
    luggage: '2 valises',
    insurance: 'Assurance tous risques incluse',
    description:
      'Compacte agile et raffinée avec finition S-Line et boîte automatique S-Tronic, parfaite pour circuler en ville tout en maîtrisant son budget.',
    features: ['Virtual Cockpit numérique', 'Aide au stationnement', 'Climatisation bi-zone', 'Consommation 5,2 L/100 km'],
    image: catEcoImg,
  },
  {
    id: 'clio-v-rs',
    categoryId: 'eco',
    name: 'Citadine Confort Plus',
    subtitle: 'Compacte Agile · Kilométrage Illimité',
    pricePerDay: 145,
    power: '100 ch',
    transmission: 'Automatique',
    seats: 5,
    fuel: 'Essence Éco',
    acceleration: '10,4 s (0–100)',
    luggage: '3 valises',
    insurance: 'Assurance tous risques incluse',
    description:
      'Polyvalente, économique et équipée des dernières aides à la conduite, idéale pour vos séjours touristiques et déplacements professionnels.',
    features: ['Écran tactile GPS', 'Caméra de recul', 'Régulateur de vitesse', 'Kilométrage illimité'],
    image: catEcoImg,
  },
  {
    id: 'sprinter-vip',
    categoryId: 'van',
    name: 'Mercedes-Benz VIP Executive Van',
    subtitle: 'Salon Mobile · Wi-Fi & Sièges Capitaine',
    pricePerDay: 480,
    power: '190 ch',
    transmission: '9G-Tronic',
    seats: 9,
    fuel: 'Diesel BlueTEC',
    acceleration: '11,2 s (0–100)',
    luggage: '9 valises',
    insurance: 'Assurance passagers & tous risques incluse',
    description:
      'Véritable salon roulant conçu pour les délégations, équipes corporate et familles exigeantes : connectivité Wi-Fi haut débit et assises grand confort.',
    features: ['Wi-Fi 4G/5G à bord', 'Sièges capitaine inclinables', 'Prises USB-C individuelles', 'Double climatisation arrière'],
    image: catVanImg,
  },
  {
    id: 'v-class-lounge',
    categoryId: 'van',
    name: 'Mercedes-Benz Classe V Extra-Long',
    subtitle: 'Transferts Aéroport & Délégations',
    pricePerDay: 420,
    power: '237 ch',
    transmission: '9G-Tronic',
    seats: 7,
    fuel: 'Diesel',
    acceleration: '8,8 s (0–100)',
    luggage: '7 valises',
    insurance: 'Assurance passagers & tous risques incluse',
    description:
      'Configuration salon 7 places face-à-face avec portes coulissantes électriques et vitrage surteinté pour voyager en toute discrétion.',
    features: ['Portes latérales électriques', 'Configuration salon conférence', 'Vitrage acoustique teinté', 'Grand coffre modulable'],
    image: catVanImg,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ahmed Ben Ali',
    role: 'Dirigeant d’entreprise · Tunis',
    initials: 'AB',
    rating: 5,
    quote:
      'Service exceptionnel ! Voiture en parfait état et équipe très professionnelle. Livraison ponctuelle à l’aéroport Tunis-Carthage.',
  },
  {
    id: 't2',
    name: 'Sofia Trabelsi',
    role: 'Architecte d’intérieur · La Marsa',
    initials: 'ST',
    rating: 5,
    quote:
      'Une expérience incroyable. La berline était impeccable et l’accompagnement personnalisé fait toute la différence. Je recommande fortement AUROS CARS !',
  },
  {
    id: 't3',
    name: 'Mohamed Dridi',
    role: 'Directeur Commercial · Sousse',
    initials: 'MD',
    rating: 5,
    quote:
      'Rapide, fiable et tarif transparent dès la réservation. Le SUV était prêt en dix minutes avec assurance complète incluse.',
  },
  {
    id: 't4',
    name: 'Yasmine Khelifi',
    role: 'Organisatrice d’événements · Carthage',
    initials: 'YK',
    rating: 5,
    quote:
      'Nous avons réservé deux vans exécutifs et une sportive pour un gala privé : prestation haut de gamme du premier contact jusqu’au retour.',
  },
];
