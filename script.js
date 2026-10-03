// =============================================================
// CORREO ARGENTINO — RED OPERATIVA NACIONAL
// script.js — Lógica de mapa interactivo, expansión y nodos
// =============================================================

// =============================================================
// 1. DATASET DE NODOS LOGÍSTICOS
// Tipos: 'CLOG' | 'DP' | 'Sorter' | 'Regional' | 'Sucursal'
// =============================================================
const nodosData = [

  // ====================================================
  // REGIÓN CUYO / NOA
  // ====================================================
  {
    id: "tucuman", nombre: "Tucumán", nombreCompleto: "CLOG Tucumán",
    tipo: "CLOG", provincia: "Tucumán",
    lat: -26.81, lng: -65.22,
    capacidad: "12.400 m²", piezasDia: "34.000", operatividad: "24 / 7",
    fotos: ["imagenes/cuyo-noa/Tucuman.jpg", "imagenes/cuyo-noa/Tucunan 1.jpg", "imagenes/cuyo-noa/Tucuman 2.jpg"],
    desc: "Hub principal del Noroeste Argentino (NOA), con conexión directa a Salta, Jujuy, Catamarca y Santiago del Estero."
  },
  {
    id: "mendoza", nombre: "Mendoza", nombreCompleto: "CLOG Mendoza",
    tipo: "CLOG", provincia: "Mendoza",
    lat: -32.89, lng: -68.84,
    capacidad: "14.200 m²", piezasDia: "29.000", operatividad: "24 / 7",
    fotos: ["imagenes/cuyo-noa/mendoza.jpg", "imagenes/cuyo-noa/mendoza 1.jpg", "imagenes/cuyo-noa/mendoza 2.jpg", "imagenes/cuyo-noa/Mendoza 3.jpg"],
    desc: "Cabecera logística de la Región Cuyo y punto de conexión bioceánico con el paso Cristo Redentor."
  },
  {
    id: "salta", nombre: "Salta", nombreCompleto: "CLOG Salta",
    tipo: "CLOG", provincia: "Salta",
    lat: -24.78, lng: -65.41,
    capacidad: "10.800 m²", piezasDia: "13.800", operatividad: "24 / 7",
    fotos: ["imagenes/cuyo-noa/Salta.jpg", "imagenes/cuyo-noa/Salta 1.jpg", "imagenes/cuyo-noa/Salta 2.jpg", "imagenes/cuyo-noa/Salta 3.jpg"],
    desc: "Nodo logístico regional del norte argentino, conectando Jujuy, Formosa y el corredor hacia Bolivia."
  },
  {
    id: "san_juan", nombre: "San Juan", nombreCompleto: "CLOG San Juan",
    tipo: "CLOG", provincia: "San Juan",
    lat: -31.54, lng: -68.54,
    capacidad: "8.500 m²", piezasDia: "11.400", operatividad: "L a S",
    fotos: ["imagenes/cuyo-noa/San Juan.jpg", "imagenes/cuyo-noa/San juan 1.jpg", "imagenes/cuyo-noa/San juan 2.jpg"],
    desc: "Centro de distribución regional para la provincia de San Juan y zonas precordilleranas."
  },
  {
    id: "san_luis", nombre: "San Luis", nombreCompleto: "CLOG San Luis",
    tipo: "CLOG", provincia: "San Luis",
    lat: -33.30, lng: -66.34,
    capacidad: "7.800 m²", piezasDia: "9.200", operatividad: "L a S",
    fotos: ["imagenes/cuyo-noa/San Luis.jpg", "imagenes/cuyo-noa/San Luis 1.jpg", "imagenes/cuyo-noa/San luis 2.jpg", "imagenes/cuyo-noa/San luis 3.jpg"],
    desc: "Nodo operativo de San Luis, articulando con Mendoza y Córdoba."
  },
  {
    id: "jujuy", nombre: "Jujuy", nombreCompleto: "CLOG Jujuy",
    tipo: "CLOG", provincia: "Jujuy",
    lat: -24.19, lng: -65.30,
    capacidad: "6.500 m²", piezasDia: "7.100", operatividad: "L a V",
    fotos: ["imagenes/cuyo-noa/Jujuy.jpg", "imagenes/cuyo-noa/Jujuy 1.jpg", "imagenes/cuyo-noa/Jujuy 2.jpg"],
    desc: "Centro logístico en la Puna juyeña con cobertura de la Quebrada de Humahuaca y puntos de frontera."
  },
  {
    id: "catamarca", nombre: "Catamarca", nombreCompleto: "CLOG Catamarca",
    tipo: "CLOG", provincia: "Catamarca",
    lat: -28.47, lng: -65.78,
    capacidad: "5.200 m²", piezasDia: "5.900", operatividad: "L a V",
    fotos: ["imagenes/cuyo-noa/Catamarca.jpg", "imagenes/cuyo-noa/Catamarca 1.jpg", "imagenes/cuyo-noa/Catamarca 2.jpg"],
    desc: "Nodo logístico provincial que cubre minería y agro en el oeste catamarqueño."
  },
  {
    id: "la_rioja", nombre: "La Rioja", nombreCompleto: "CLOG La Rioja",
    tipo: "CLOG", provincia: "La Rioja",
    lat: -29.41, lng: -66.86,
    capacidad: "4.800 m²", piezasDia: "5.400", operatividad: "L a V",
    fotos: ["imagenes/cuyo-noa/La Rioja.jpg", "imagenes/cuyo-noa/La Rioja 1.jpg", "imagenes/cuyo-noa/La Rioja 2.jpg"],
    desc: "Centro de operaciones provincial de La Rioja, distribución hacia valles y zonas rurales."
  },
  {
    id: "santiago_estero", nombre: "Santiago del Estero", nombreCompleto: "CLOG Santiago del Estero",
    tipo: "CLOG", provincia: "Santiago del Estero",
    lat: -27.78, lng: -64.27,
    capacidad: "6.200 m²", piezasDia: "9.800", operatividad: "L a S",
    fotos: ["imagenes/cuyo-noa/Santiago del Estero.jpg", "imagenes/cuyo-noa/Santiago del Estero 1.jpg", "imagenes/cuyo-noa/Santiago del Estero 2.jpg"],
    desc: "Nodo estratégico del Chaco Santiagueño, distribuye hacia el interior y conecta NOA con NEA."
  },

  // ====================================================
  // REGIÓN CENTRO / NEA
  // ====================================================
  {
    id: "cordoba", nombre: "Córdoba", nombreCompleto: "CLOG Córdoba (Planta Sorter)",
    tipo: "Hub Sorter", provincia: "Córdoba",
    esHub: true, hubKey: "cordoba", hubColor: "#E65100",
    lat: -31.42, lng: -64.18,
    capacidad: "18.500 m²", piezasDia: "48.500", operatividad: "24 / 7",
    fotos: ["imagenes/centro-nea/Cordoba frente.jpg", "imagenes/centro-nea/Cordoba 1.jpg", "imagenes/centro-nea/Cordoba 2.jpg"],
    desc: "Planta Sorter Destino Regional para las cargas de Cuyo, NOA y Centro."
  },
  {
    id: "rosario", nombre: "Rosario", nombreCompleto: "CLOG Rosario",
    tipo: "CLOG", provincia: "Santa Fe",
    lat: -32.95, lng: -60.66,
    capacidad: "16.800 m²", piezasDia: "41.200", operatividad: "24 / 7",
    fotos: ["imagenes/centro-nea/Rosario Frente.jpg", "imagenes/centro-nea/Rosario 1.jpg", "imagenes/centro-nea/Rosario 2.jpg"],
    desc: "Plataforma multimodal en el eje fluvial e industrial de Santa Fe y Entre Ríos."
  },
  {
    id: "santa_fe", nombre: "Santa Fe", nombreCompleto: "CLOG Santa Fe (Planta Sorter)",
    tipo: "Hub Sorter", provincia: "Santa Fe",
    esHub: true, hubKey: "santa_fe", hubColor: "#059669",
    lat: -31.63, lng: -60.70,
    capacidad: "9.000 m²", piezasDia: "16.200", operatividad: "L a S",
    fotos: ["imagenes/centro-nea/Santa Fe Frente 2.jpg", "imagenes/centro-nea/Santa Fe 1.jpg", "imagenes/centro-nea/Santa fe 2.jpg", "imagenes/centro-nea/Santa Fe 3.jpg", "imagenes/centro-nea/Santa Fe 4.jpg"],
    desc: "Planta Sorter Destino Regional para las cargas del Litoral (Rosario, Paraná, Posadas, Corrientes, Resistencia)."
  },
  {
    id: "parana", nombre: "Paraná", nombreCompleto: "CLOG Paraná",
    tipo: "CLOG", provincia: "Entre Ríos",
    lat: -31.74, lng: -60.52,
    capacidad: "8.500 m²", piezasDia: "10.800", operatividad: "L a S",
    fotos: ["imagenes/centro-nea/Parana Frente.jpg", "imagenes/centro-nea/Parana 1.jpg", "imagenes/centro-nea/Parana 2.jpg", "imagenes/centro-nea/Parana frente nave 2.jpg"],
    desc: "Centro operativo de Entre Ríos, articulando el litoral mesopotámico con Córdoba y AMBA."
  },
  {
    id: "rio_cuarto", nombre: "Río Cuarto", nombreCompleto: "CLOG Río Cuarto",
    tipo: "CLOG", provincia: "Córdoba",
    lat: -33.13, lng: -64.35,
    capacidad: "7.500 m²", piezasDia: "8.500", operatividad: "L a S",
    fotos: ["imagenes/centro-nea/Rio Cuarto Frente.jpg", "imagenes/centro-nea/Rio Cuarto 1.jpg", "imagenes/centro-nea/Rio cuarto 2.jpg", "imagenes/centro-nea/Rio cuarto 3.jpg"],
    desc: "Nodo logístico del sur de Córdoba, con distribución hacia La Pampa y San Luis."
  },
  {
    id: "villa_maria", nombre: "Villa María", nombreCompleto: "CLOG Villa María",
    tipo: "CLOG", provincia: "Córdoba",
    lat: -32.41, lng: -63.24,
    capacidad: "6.800 m²", piezasDia: "12.000", operatividad: "L a S",
    fotos: ["imagenes/centro-nea/Villa Maria Frente.jpg", "imagenes/centro-nea/Villa Maria 2.jpg", "imagenes/centro-nea/Villa Maria 3.jpg", "imagenes/centro-nea/Villa Maria 4.jpg"],
    desc: "Nodo estratégico del centro cordobés, articulando el corredor nacional hacia AMBA."
  },
  {
    id: "corrientes", nombre: "Corrientes", nombreCompleto: "CLOG Corrientes",
    tipo: "CLOG", provincia: "Corrientes",
    lat: -27.47, lng: -58.83,
    capacidad: "7.200 m²", piezasDia: "12.000", operatividad: "L a S",
    fotos: ["imagenes/centro-nea/Corrientes Frente.jpg", "imagenes/centro-nea/Corrientes 1.jpg", "imagenes/centro-nea/Corrientes 2.jpg", "imagenes/centro-nea/Corrientes 3.jpg"],
    desc: "Centro logístico del NEA, conectando el litoral mesopotámico con Chaco y Misiones."
  },
  {
    id: "resistencia", nombre: "Resistencia", nombreCompleto: "CLOG Resistencia",
    tipo: "CLOG", provincia: "Chaco",
    lat: -27.46, lng: -58.99,
    capacidad: "6.800 m²", piezasDia: "12.500", operatividad: "L a S",
    fotos: ["imagenes/centro-nea/Resistencia frente.jpg", "imagenes/centro-nea/Resistencia 1.jpg", "imagenes/centro-nea/Resistencia 2.jpg", "imagenes/centro-nea/Resistencia 3.jpg"],
    desc: "Nodo logístico de la capital del Chaco, con distribución hacia Formosa y el interior."
  },
  {
    id: "posadas", nombre: "Posadas", nombreCompleto: "CLOG Posadas",
    tipo: "CLOG", provincia: "Misiones",
    lat: -27.36, lng: -55.90,
    capacidad: "6.400 m²", piezasDia: "11.000", operatividad: "L a S",
    fotos: ["imagenes/centro-nea/Posadas Frente.jpg", "imagenes/centro-nea/Posadas 1.jpg", "imagenes/centro-nea/Posadas 2.jpg", "imagenes/centro-nea/Posadas 3.jpg"],
    desc: "Nodo logístico de Misiones, puerta de distribución hacia la Selva Misionera y frontera con Brasil."
  },

  // ====================================================
  // REGIÓN METRO / BUENOS AIRES / LA PAMPA
  // ====================================================
  {
    id: "bahia_blanca", nombre: "Bahía Blanca", nombreCompleto: "CLOG Bahía Blanca",
    tipo: "CLOG", provincia: "Buenos Aires",
    lat: -38.72, lng: -62.27,
    capacidad: "11.000 m²", piezasDia: "22.800", operatividad: "24 / 7",
    fotos: ["imagenes/metro-pba/Bahia Blanca.jpg", "imagenes/metro-pba/Bahia Blanca 1.jpg"],
    desc: "Puerta logística hacia la Patagonia y nodo de articulación con el sur bonaerense."
  },
  {
    id: "ctp_bue",
    nombre: "CTP BUE",
    nombreCompleto: "CTP BUE (Monte Grande)",
    tipo: "Hub Sorter",
    provincia: "Buenos Aires",
    localidad: "Monte Grande, Esteban Echeverría",
    esHub: true,
    hubKey: "bue",
    hubColor: "#0066FF",
    lat: -34.8250,
    lng: -58.4680,
    capacidad: "45.000 m²",
    piezasDia: "180.000",
    operatividad: "24 / 7",
    desc: "Centro Tecnológico Postal Buenos Aires — Planta Monte Grande, Partido de Esteban Echeverría. Hub nacional de concentración y clasificación automatizada (Sorter)."
  },
  {
    id: "la_plata", nombre: "La Plata", nombreCompleto: "CLOG La Plata",
    tipo: "CLOG", provincia: "Buenos Aires",
    lat: -34.92, lng: -57.95,
    capacidad: "9.500 m²", piezasDia: "14.500", operatividad: "L a S",
    fotos: ["imagenes/metro-pba/La Plata.jpg", "imagenes/metro-pba/La Plata 1.jpg", "imagenes/metro-pba/La Plata 2.jpg", "imagenes/metro-pba/La Plata 3.jpg"],
    desc: "Centro de distribución de la capital bonaerense, cubriendo GBA Sur y la costa atlántica."
  },
  {
    id: "mar_del_plata", nombre: "Mar del Plata", nombreCompleto: "CLOG Mar del Plata",
    tipo: "CLOG", provincia: "Buenos Aires",
    lat: -38.00, lng: -57.56,
    capacidad: "9.500 m²", piezasDia: "19.400", operatividad: "24 / 7",
    fotos: ["imagenes/metro-pba/M del Plata.jpg", "imagenes/metro-pba/M del Plata 1.jpg", "imagenes/metro-pba/M del Plata 2.jpg"],
    desc: "Planta de distribución integral para la Costa Atlántica y el sudeste de la Provincia de Buenos Aires."
  },
  {
    id: "mercedes", nombre: "Mercedes", nombreCompleto: "CLOG Mercedes",
    tipo: "CLOG", provincia: "Buenos Aires",
    lat: -34.65, lng: -59.43,
    capacidad: "7.200 m²", piezasDia: "11.000", operatividad: "L a S",
    fotos: ["imagenes/metro-pba/Mercedes.jpg", "imagenes/metro-pba/Mercedes 1.jpg", "imagenes/metro-pba/Mercedes 2.jpg"],
    desc: "Nodo de distribución del GBA Oeste e interior bonaerense."
  },
  {
    id: "pergamino", nombre: "Pergamino", nombreCompleto: "CLOG Pergamino",
    tipo: "CLOG", provincia: "Buenos Aires",
    lat: -33.88, lng: -60.57,
    capacidad: "5.800 m²", piezasDia: "8.500", operatividad: "L a V",
    fotos: ["imagenes/metro-pba/Pergamino.jpg", "imagenes/metro-pba/Pergamino 1.jpg", "imagenes/metro-pba/Pergamino 2.jpg"],
    desc: "Nodo del norte bonaerense, articulando el agro con la cadena logística hacia AMBA."
  },
  {
    id: "santa_rosa", nombre: "Santa Rosa", nombreCompleto: "CLOG Santa Rosa",
    tipo: "CLOG", provincia: "La Pampa",
    lat: -36.62, lng: -64.29,
    capacidad: "5.400 m²", piezasDia: "7.600", operatividad: "L a V",
    fotos: ["imagenes/metro-pba/Santa Rosa.jpg", "imagenes/metro-pba/Santa Rosa 1.jpg", "imagenes/metro-pba/Santa Rosa 3.jpg"],
    desc: "Nodo logístico de La Pampa, distribuyendo al interior pampeano y articulando con Córdoba."
  },

  // ====================================================
  // REGIÓN SUR / PATAGONIA
  // ====================================================
  {
    id: "bariloche", nombre: "Bariloche", nombreCompleto: "CLOG Bariloche",
    tipo: "CLOG", provincia: "Río Negro",
    lat: -41.13, lng: -71.31,
    capacidad: "4.500 m²", piezasDia: "8.200", operatividad: "L a S",
    fotos: [
      "imagenes/sur/BARILOCHE_1.jpg",
      "imagenes/sur/BARILOCHE_2.jpg",
      "imagenes/sur/BARILOCHE_3.jpg",
      "imagenes/sur/BARILOCHE_4.jpg"
    ],
    desc: "Centro logístico andino patagónico, cabecera de distribución para la zona lacustre y cordillerana de Río Negro."
  },
  {
    id: "comodoro_rivadavia", nombre: "Comodoro Rivadavia", nombreCompleto: "CLOG Comodoro Rivadavia",
    tipo: "CLOG", provincia: "Chubut",
    lat: -45.87, lng: -67.50,
    capacidad: "6.000 m²", piezasDia: "9.500", operatividad: "24 / 7",
    fotos: [
      "imagenes/sur/COMODORO_RIVADAVIA_1.jpg",
      "imagenes/sur/COMODORO_RIVADAVIA_2.jpg",
      "imagenes/sur/COMODORO_RIVADAVIA_3.jpg",
      "imagenes/sur/COMODORO_RIVADAVIA_4.jpg",
      "imagenes/sur/COMODORO_RIVADAVIA_5.jpg",
      "imagenes/sur/COMODORO_RIVADAVIA_6.jpg"
    ],
    desc: "Hub logístico del Golfo San Jorge y la Patagonia Central, articulando Chubut con el norte santacruceño."
  },
  {
    id: "neuquen", nombre: "Neuquén", nombreCompleto: "CLOG Neuquén",
    tipo: "CLOG", provincia: "Neuquén",
    lat: -38.95, lng: -69.25,
    capacidad: "7.800 m²", piezasDia: "15.000", operatividad: "24 / 7",
    fotos: [
      "imagenes/sur/NEUQUEN_1.jpg",
      "imagenes/sur/NEUQUEN_2.jpg",
      "imagenes/sur/NEUQUEN_3.jpg",
      "imagenes/sur/NEUQUEN_4.jpg",
      "imagenes/sur/NEUQUEN_5.jpg",
      "imagenes/sur/NEUQUEN_6.jpg"
    ],
    desc: "Cabecera logística del Alto Valle, soporte operativo integral para el polo de desarrollo de Vaca Muerta."
  },
  {
    id: "rio_gallegos", nombre: "Río Gallegos", nombreCompleto: "CLOG Río Gallegos",
    tipo: "CLOG", provincia: "Santa Cruz",
    lat: -51.62, lng: -69.22,
    capacidad: "4.000 m²", piezasDia: "6.400", operatividad: "L a S",
    fotos: [
      "imagenes/sur/RIO_GALLEGOS_1.jpg",
      "imagenes/sur/RIO_GALLEGOS_2.jpg",
      "imagenes/sur/RIO_GALLEGOS_3.jpg",
      "imagenes/sur/RIO_GALLEGOS_4.jpg"
    ],
    desc: "Nodo logístico austral en Santa Cruz, articulación continental con Tierra del Fuego y pasos fronterizos."
  },
  {
    id: "trelew", nombre: "Trelew", nombreCompleto: "CLOG Trelew",
    tipo: "CLOG", provincia: "Chubut",
    lat: -43.25, lng: -65.31,
    capacidad: "5.500 m²", piezasDia: "6.500", operatividad: "L a S",
    fotos: [
      "imagenes/sur/TRELEW_1.jpg",
      "imagenes/sur/TRELEW_2.jpg",
      "imagenes/sur/TRELEW_3.jpg",
      "imagenes/sur/TRELEW_4.jpg",
      "imagenes/sur/TRELEW_5.jpg"
    ],
    desc: "Centro de distribución del valle inferior del Río Chubut y costa atlántica patagónica."
  },
  {
    id: "ushuaia", nombre: "Ushuaia", nombreCompleto: "Sucursal Ushuaia",
    tipo: "Sucursal", provincia: "Tierra del Fuego",
    lat: -54.8058, lng: -68.3025,
    capacidad: "3.200 m²", piezasDia: "3.800", operatividad: "L a V",
    fotos: ["imagenes/placeholder.jpg"],
    desc: "Cabecera logística austral en Ushuaia, Tierra del Fuego."
  },
  {
    id: "rio_grande", nombre: "Río Grande", nombreCompleto: "Sucursal Río Grande",
    tipo: "Sucursal", provincia: "Tierra del Fuego",
    lat: -53.7889, lng: -67.7038,
    capacidad: "3.500 m²", piezasDia: "4.200", operatividad: "L a V",
    fotos: ["imagenes/placeholder.jpg"],
    desc: "Nodo logístico industrial de Río Grande, Tierra del Fuego."
  }
];

// =============================================================
// RUTAS Y DERIVACIÓN HACIA SORTERS (DEFINIDAS POR EXCEL)
// =============================================================
const rutasExcel = [
  // Flujo 1: Hacia CTP BUE (Monte Grande, Esteban Echeverría) - 13 orígenes
  { origen: "neuquen", destino: "ctp_bue", hub: "bue", nombre: "Neuquén ➔ CTP BUE" },
  { origen: "comodoro_rivadavia", destino: "ctp_bue", hub: "bue", nombre: "Comodoro Rivadavia ➔ CTP BUE" },
  { origen: "trelew", destino: "ctp_bue", hub: "bue", nombre: "Trelew ➔ CTP BUE" },
  { origen: "rio_gallegos", destino: "ctp_bue", hub: "bue", nombre: "Río Gallegos ➔ CTP BUE" },
  { origen: "bariloche", destino: "ctp_bue", hub: "bue", nombre: "Bariloche ➔ CTP BUE" },
  { origen: "ushuaia", destino: "ctp_bue", hub: "bue", nombre: "Ushuaia ➔ CTP BUE" },
  { origen: "rio_grande", destino: "ctp_bue", hub: "bue", nombre: "Río Grande ➔ CTP BUE" },
  { origen: "la_plata", destino: "ctp_bue", hub: "bue", nombre: "La Plata ➔ CTP BUE" },
  { origen: "bahia_blanca", destino: "ctp_bue", hub: "bue", nombre: "Bahía Blanca ➔ CTP BUE" },
  { origen: "mar_del_plata", destino: "ctp_bue", hub: "bue", nombre: "Mar del Plata ➔ CTP BUE" },
  { origen: "mercedes", destino: "ctp_bue", hub: "bue", nombre: "Mercedes ➔ CTP BUE" },
  { origen: "pergamino", destino: "ctp_bue", hub: "bue", nombre: "Pergamino ➔ CTP BUE" },
  { origen: "santa_rosa", destino: "ctp_bue", hub: "bue", nombre: "Santa Rosa ➔ CTP BUE" },

  // Flujo 2: Hacia CLOG CÓRDOBA - 11 orígenes
  { origen: "mendoza", destino: "cordoba", hub: "cordoba", nombre: "Mendoza ➔ Córdoba" },
  { origen: "san_juan", destino: "cordoba", hub: "cordoba", nombre: "San Juan ➔ Córdoba" },
  { origen: "san_luis", destino: "cordoba", hub: "cordoba", nombre: "San Luis ➔ Córdoba" },
  { origen: "catamarca", destino: "cordoba", hub: "cordoba", nombre: "Catamarca ➔ Córdoba" },
  { origen: "la_rioja", destino: "cordoba", hub: "cordoba", nombre: "La Rioja ➔ Córdoba" },
  { origen: "jujuy", destino: "cordoba", hub: "cordoba", nombre: "Jujuy ➔ Córdoba" },
  { origen: "salta", destino: "cordoba", hub: "cordoba", nombre: "Salta ➔ Córdoba" },
  { origen: "santiago_estero", destino: "cordoba", hub: "cordoba", nombre: "Santiago del Estero ➔ Córdoba" },
  { origen: "tucuman", destino: "cordoba", hub: "cordoba", nombre: "Tucumán ➔ Córdoba" },
  { origen: "villa_maria", destino: "cordoba", hub: "cordoba", nombre: "Villa María ➔ Córdoba" },
  { origen: "rio_cuarto", destino: "cordoba", hub: "cordoba", nombre: "Río Cuarto ➔ Córdoba" },

  // Flujo 3: Hacia CLOG SANTA FE - 5 orígenes
  { origen: "rosario", destino: "santa_fe", hub: "santa_fe", nombre: "Rosario ➔ Santa Fe" },
  { origen: "posadas", destino: "santa_fe", hub: "santa_fe", nombre: "Posadas ➔ Santa Fe" },
  { origen: "corrientes", destino: "santa_fe", hub: "santa_fe", nombre: "Corrientes ➔ Santa Fe" },
  { origen: "parana", destino: "santa_fe", hub: "santa_fe", nombre: "Paraná ➔ Santa Fe" },
  { origen: "resistencia", destino: "santa_fe", hub: "santa_fe", nombre: "Resistencia ➔ Santa Fe" }
];

// =============================================================
// NODOS Y RUTAS DEL ÁREA METROPOLITANA (AMBA)
// Solo visibles al seleccionar la opción 'Área Metropolitana / AMBA'
// Excluidos de la vista de 'Todas las rutas' y vistas nacionales
// =============================================================
const nodosMetropolitanos = [
  {
    id: "barracas",
    nombre: "CABA Sur (Barracas)",
    nombreCompleto: "CLOG CABA Sur — Barracas (Capital Federal)",
    tipo: "CLOG",
    provincia: "Ciudad de Buenos Aires",
    esMetropolitano: true,
    lat: -34.6391,
    lng: -58.3789,
    capacidad: "9.200 m²",
    piezasDia: "28.000",
    operatividad: "24 / 7",
    fotos: ["imagenes/placeholder.jpg"],
    desc: "Centro Logístico CABA Sur en el barrio de Barracas, Capital Federal."
  },
  {
    id: "vte_lopez",
    nombre: "Vicente López",
    nombreCompleto: "CLOG Vicente López (Olivos)",
    tipo: "CLOG",
    provincia: "Buenos Aires",
    esMetropolitano: true,
    lat: -34.5228,
    lng: -58.4870,
    capacidad: "8.100 m²",
    piezasDia: "24.500",
    operatividad: "24 / 7",
    fotos: ["imagenes/placeholder.jpg"],
    desc: "Centro Logístico Vicente López en Olivos, corredor norte del Conurbano."
  },
  {
    id: "mercado_central",
    nombre: "Mercado Central",
    nombreCompleto: "CLOG Mercado Central (Tapiales)",
    tipo: "CLOG",
    provincia: "Buenos Aires",
    esMetropolitano: true,
    lat: -34.7119,
    lng: -58.4867,
    capacidad: "12.000 m²",
    piezasDia: "35.000",
    operatividad: "24 / 7",
    fotos: ["imagenes/placeholder.jpg"],
    desc: "Centro Logístico en el Mercado Central, Tapiales, La Matanza."
  },
  {
    id: "quilmes",
    nombre: "Quilmes",
    nombreCompleto: "CLOG Quilmes Oeste",
    tipo: "CLOG",
    provincia: "Buenos Aires",
    esMetropolitano: true,
    lat: -34.7240,
    lng: -58.2824,
    capacidad: "7.800 m²",
    piezasDia: "21.000",
    operatividad: "24 / 7",
    fotos: ["imagenes/placeholder.jpg"],
    desc: "Centro Logístico Quilmes Oeste, corredor sur del Conurbano Bonaerense."
  },
  {
    id: "moreno",
    nombre: "Moreno",
    nombreCompleto: "CLOG Moreno",
    tipo: "CLOG",
    provincia: "Buenos Aires",
    esMetropolitano: true,
    lat: -34.6461,
    lng: -58.7909,
    capacidad: "8.500 m²",
    piezasDia: "22.000",
    operatividad: "24 / 7",
    fotos: ["imagenes/placeholder.jpg"],
    desc: "Centro Logístico Moreno, corredor oeste del Conurbano Bonaerense."
  }
];

const rutasMetropolitanas = [
  { origen: "barracas", destino: "ctp_bue", hub: "amba", nombre: "CABA Sur (Barracas) ➔ CTP BUE" },
  { origen: "vte_lopez", destino: "ctp_bue", hub: "amba", nombre: "Vicente López ➔ CTP BUE" },
  { origen: "mercado_central", destino: "ctp_bue", hub: "amba", nombre: "Mercado Central ➔ CTP BUE" },
  { origen: "quilmes", destino: "ctp_bue", hub: "amba", nombre: "Quilmes ➔ CTP BUE" },
  { origen: "moreno", destino: "ctp_bue", hub: "amba", nombre: "Moreno ➔ CTP BUE" }
];

let filtroHubActivo = "todos";

function buscarNodoPorId(id) {
  return nodosData.find(n => n.id === id) || nodosMetropolitanos.find(n => n.id === id) || null;
}

// =============================================================
// VISTA DEDICADA: ÁREA DE INFLUENCIA DE LOS 5 CENTROS DEL AMBA
// Enfocada exclusivamente en Vicente López, Moreno, Mercado Central,
// CABA Sur (Barracas), Quilmes y su destino Sorter CTP BUE (Monte Grande)
// =============================================================
function renderizarMapaAMBA(svg) {
  svg.innerHTML = "";
  svg.setAttribute("viewBox", "0 0 960 680");

  const ctpBue = nodosData.find(n => n.id === "ctp_bue") || {
    id: "ctp_bue",
    nombre: "CTP BUE",
    nombreCompleto: "CTP BUE (Monte Grande)",
    tipo: "Hub Sorter",
    provincia: "Buenos Aires",
    localidad: "Monte Grande, Esteban Echeverría",
    esHub: true,
    capacidad: "45.000 m²",
    piezasDia: "180.000",
    operatividad: "24 / 7",
    fotos: ["imagenes/placeholder.jpg"],
    desc: "Centro Tecnológico Postal Buenos Aires — Planta Monte Grande, Partido de Esteban Echeverría. Hub nacional de concentración y clasificación automatizada (Sorter)."
  };

  const nodosAMBA = [
    {
      nodo: nodosMetropolitanos.find(n => n.id === "vte_lopez"),
      x: 460, y: 120,
      labelDir: "right",
      distancia: "38 km",
      curva: "M 460 134 Q 430 320 484 505",
      badgeX: 435, badgeY: 255
    },
    {
      nodo: nodosMetropolitanos.find(n => n.id === "moreno"),
      x: 130, y: 240,
      labelDir: "left",
      distancia: "39 km",
      curva: "M 145 248 Q 280 410 474 515",
      badgeX: 290, badgeY: 360
    },
    {
      nodo: nodosMetropolitanos.find(n => n.id === "mercado_central"),
      x: 390, y: 310,
      labelDir: "left",
      distancia: "14 km",
      curva: "M 398 322 Q 430 420 482 508",
      badgeX: 418, badgeY: 410
    },
    {
      nodo: nodosMetropolitanos.find(n => n.id === "barracas"),
      x: 690, y: 220,
      labelDir: "right",
      distancia: "24 km",
      curva: "M 675 230 Q 610 370 505 512",
      badgeX: 605, badgeY: 350
    },
    {
      nodo: nodosMetropolitanos.find(n => n.id === "quilmes"),
      x: 780, y: 360,
      labelDir: "right",
      distancia: "26 km",
      curva: "M 765 370 Q 650 465 508 518",
      badgeX: 660, badgeY: 445
    }
  ];

  const hubPos = { x: 490, y: 520 };

  // --- Capa DEFS (Gradientes, Marcadores, Sombras) ---
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `
    <marker id="arrow-amba" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#2563EB" />
    </marker>
    <marker id="arrow-amba-hover" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#002554" />
    </marker>
    <filter id="shadow-amba" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#002554" flood-opacity="0.20" />
    </filter>
    <filter id="glow-hub" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="7" flood-color="#FFD200" flood-opacity="0.8" />
    </filter>
    <linearGradient id="grad-rio" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#CDE8F5" />
      <stop offset="100%" stop-color="#A9D4EB" />
    </linearGradient>
    <pattern id="amba-grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 37, 84, 0.04)" stroke-width="1"/>
    </pattern>
  `;
  svg.appendChild(defs);

  // --- Capa 1: Fondo General del Área ---
  const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  bg.setAttribute("width", "960");
  bg.setAttribute("height", "680");
  bg.setAttribute("fill", "#F8FAFC");
  svg.appendChild(bg);

  const grid = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  grid.setAttribute("width", "960");
  grid.setAttribute("height", "680");
  grid.setAttribute("fill", "url(#amba-grid)");
  svg.appendChild(grid);

  // --- Capa 2: Río de la Plata ---
  const rio = document.createElementNS("http://www.w3.org/2000/svg", "path");
  rio.setAttribute("d", "M 520 0 C 600 45, 710 95, 800 170 C 880 245, 930 330, 960 410 L 960 0 Z");
  rio.setAttribute("fill", "url(#grad-rio)");
  rio.setAttribute("stroke", "#8ec3de");
  rio.setAttribute("stroke-width", "2");
  svg.appendChild(rio);

  const rioTxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
  rioTxt.setAttribute("x", "760");
  rioTxt.setAttribute("y", "75");
  rioTxt.setAttribute("fill", "#2563EB");
  rioTxt.setAttribute("font-size", "15");
  rioTxt.setAttribute("font-weight", "800");
  rioTxt.setAttribute("letter-spacing", "5");
  rioTxt.setAttribute("opacity", "0.65");
  rioTxt.setAttribute("transform", "rotate(25, 760, 75)");
  rioTxt.textContent = "RÍO DE LA PLATA";
  svg.appendChild(rioTxt);

  // --- Capa 3: Zonificación de Conurbano & CABA (Área de Influencia de los 5 Nodos) ---
  const gZonas = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gZonas.id = "amba-zonas";
  gZonas.innerHTML = `
    <!-- Conurbano Norte (Vicente López) -->
    <path d="M 330 0 L 520 0 C 490 75, 520 130, 560 135 L 430 185 L 320 110 Z" fill="#EEF2FF" opacity="0.65" stroke="#C7D2FE" stroke-width="1.2" stroke-dasharray="4,4"/>
    <text x="345" y="45" fill="#4338CA" font-size="11" font-weight="700" letter-spacing="1">CONURBANO NORTE (Vte. López / Olivos)</text>

    <!-- Conurbano Oeste (Moreno) -->
    <path d="M 50 140 L 330 140 L 380 280 L 190 350 L 50 280 Z" fill="#F1F5F9" opacity="0.75" stroke="#CBD5E1" stroke-width="1.2" stroke-dasharray="4,4"/>
    <text x="85" y="175" fill="#475569" font-size="11" font-weight="700" letter-spacing="1">CONURBANO OESTE (Moreno / RN 7)</text>

    <!-- La Matanza / Mercado Central -->
    <path d="M 300 280 L 520 280 L 460 445 L 250 410 Z" fill="#F8FAFC" opacity="0.8" stroke="#E2E8F0" stroke-width="1.2" stroke-dasharray="4,4"/>
    <text x="275" y="375" fill="#64748B" font-size="11" font-weight="700" letter-spacing="0.5">LA MATANZA / TAPIALES</text>

    <!-- Conurbano Sur (Quilmes) -->
    <path d="M 660 300 L 840 270 L 930 450 L 730 475 Z" fill="#F0FDF4" opacity="0.7" stroke="#BBF7D0" stroke-width="1.2" stroke-dasharray="4,4"/>
    <text x="790" y="430" fill="#15803D" font-size="11" font-weight="700" letter-spacing="1">CONURBANO SUR (Quilmes)</text>

    <!-- Polígono CABA (Capital Federal) en Rosa Pastel Oficial Metropolitano -->
    <path d="M 560 135 C 620 160, 690 185, 760 215 L 775 250 C 745 295, 680 300, 630 292 C 580 285, 555 245, 545 195 C 540 160, 550 145, 560 135 Z" fill="#FADBD8" stroke="#F43F5E" stroke-width="2"/>
    <text x="645" y="195" text-anchor="middle" fill="#9F1239" font-size="12" font-weight="800" letter-spacing="1.5">CABA (CAPITAL FEDERAL)</text>
  `;
  svg.appendChild(gZonas);

  // --- Capa 4: Principales Corredores Viales (Autopistas y Rutas) ---
  const gVias = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gVias.id = "amba-corredores";
  gVias.innerHTML = `
    <!-- Av. General Paz -->
    <path d="M 560 135 C 540 165, 545 235, 630 292" fill="none" stroke="#64748B" stroke-width="3.5" stroke-dasharray="6,3"/>
    <text x="515" y="215" fill="#475569" font-size="10" font-weight="700" transform="rotate(-68, 515, 215)">Av. General Paz</text>

    <!-- Acceso Norte / Panamericana -->
    <path d="M 400 10 L 460 120 L 560 135" fill="none" stroke="#94A3B8" stroke-width="3"/>
    <text x="405" y="42" fill="#475569" font-size="9.5" font-weight="700">Acceso Norte / Panamericana</text>

    <!-- Acceso Oeste (RN 7) -->
    <path d="M 60 230 L 130 240 L 370 255 L 560 250" fill="none" stroke="#94A3B8" stroke-width="3"/>
    <text x="175" y="234" fill="#475569" font-size="9.5" font-weight="700">Acceso Oeste</text>

    <!-- Autopista Bs.As - La Plata -->
    <path d="M 750 250 L 780 360 L 850 490" fill="none" stroke="#94A3B8" stroke-width="3"/>
    <text x="825" y="325" fill="#475569" font-size="9.5" font-weight="700" transform="rotate(58, 825, 325)">Autopista Bs.As - La Plata</text>

    <!-- Camino de Cintura (RP 4) -->
    <path d="M 230 210 C 310 290, 380 370, 500 480 C 580 520, 680 490, 770 410" fill="none" stroke="#CBD5E1" stroke-width="2.5" stroke-dasharray="5,4"/>
    <text x="315" y="330" fill="#64748B" font-size="9" font-weight="600" transform="rotate(45, 315, 330)">Camino de Cintura (RP 4)</text>
  `;
  svg.appendChild(gVias);

  // --- Capa 5: Rutas y Flechas de Flujo hacia CTP BUE ---
  const gRutas = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gRutas.id = "amba-rutas";

  nodosAMBA.forEach(item => {
    const orig = item.nodo;
    if (!orig) return;

    const gR = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gR.setAttribute("class", "amba-ruta-g");
    gR.dataset.origen = orig.id;

    // Halo brillante de la ruta
    const haloPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    haloPath.setAttribute("d", item.curva);
    haloPath.setAttribute("fill", "none");
    haloPath.setAttribute("stroke", "rgba(37, 99, 235, 0.22)");
    haloPath.setAttribute("stroke-width", "9");
    haloPath.setAttribute("stroke-linecap", "round");
    haloPath.setAttribute("class", "amba-ruta-halo");

    // Línea de flujo con animación y flecha
    const flowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    flowPath.setAttribute("d", item.curva);
    flowPath.setAttribute("fill", "none");
    flowPath.setAttribute("stroke", "#2563EB");
    flowPath.setAttribute("stroke-width", "3.6");
    flowPath.setAttribute("stroke-dasharray", "8,6");
    flowPath.setAttribute("marker-end", "url(#arrow-amba)");
    flowPath.setAttribute("class", "amba-ruta-linea");

    // Badge flotante con la distancia en km
    const gBadge = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gBadge.setAttribute("transform", `translate(${item.badgeX}, ${item.badgeY})`);
    gBadge.setAttribute("class", "amba-distancia-badge");

    const badgeBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    badgeBg.setAttribute("x", "-28");
    badgeBg.setAttribute("y", "-11");
    badgeBg.setAttribute("width", "56");
    badgeBg.setAttribute("height", "22");
    badgeBg.setAttribute("rx", "11");
    badgeBg.setAttribute("fill", "#002554");
    badgeBg.setAttribute("stroke", "#FFD200");
    badgeBg.setAttribute("stroke-width", "1.2");
    badgeBg.setAttribute("filter", "url(#shadow-amba)");

    const badgeTxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    badgeTxt.setAttribute("x", "0");
    badgeTxt.setAttribute("y", "3.5");
    badgeTxt.setAttribute("text-anchor", "middle");
    badgeTxt.setAttribute("fill", "#FFD200");
    badgeTxt.setAttribute("font-size", "10.5");
    badgeTxt.setAttribute("font-weight", "800");
    badgeTxt.setAttribute("font-family", "Inter, sans-serif");
    badgeTxt.textContent = item.distancia;

    gBadge.appendChild(badgeBg);
    gBadge.appendChild(badgeTxt);

    gR.appendChild(haloPath);
    gR.appendChild(flowPath);
    gR.appendChild(gBadge);

    gR.addEventListener("mouseenter", () => {
      flowPath.setAttribute("stroke", "#002554");
      flowPath.setAttribute("stroke-width", "5");
      flowPath.setAttribute("marker-end", "url(#arrow-amba-hover)");
      const hint = document.querySelector(".mapa-hint-bottom span");
      if (hint) {
        hint.innerHTML = `🚚 Flujo AMBA: <strong>${orig.nombreCompleto || orig.nombre}</strong> ➔ <strong>CTP BUE (Monte Grande)</strong> • Distancia: <strong>${item.distancia}</strong>`;
      }
    });

    gR.addEventListener("mouseleave", () => {
      flowPath.setAttribute("stroke", "#2563EB");
      flowPath.setAttribute("stroke-width", "3.6");
      flowPath.setAttribute("marker-end", "url(#arrow-amba)");
    });

    gRutas.appendChild(gR);
  });

  svg.appendChild(gRutas);

  // --- Capa 6: Los 5 Centros Logísticos Metropolitanos ---
  const gNodos = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gNodos.id = "amba-nodos";

  nodosAMBA.forEach(item => {
    const nodo = item.nodo;
    if (!nodo) return;

    const gN = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gN.setAttribute("class", "marcador-g amba-nodo-g");
    gN.dataset.id = nodo.id;
    gN.setAttribute("transform", `translate(${item.x}, ${item.y})`);
    gN.setAttribute("cursor", "pointer");

    const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    halo.setAttribute("cx", "0");
    halo.setAttribute("cy", "0");
    halo.setAttribute("r", "16");
    halo.setAttribute("fill", "rgba(0, 138, 56, 0.22)");

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", "0");
    dot.setAttribute("cy", "0");
    dot.setAttribute("r", "9");
    dot.setAttribute("fill", "#008A38");
    dot.setAttribute("stroke", "#FFFFFF");
    dot.setAttribute("stroke-width", "2.4");
    dot.setAttribute("class", "amba-dot");

    const innerDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    innerDot.setAttribute("cx", "0");
    innerDot.setAttribute("cy", "0");
    innerDot.setAttribute("r", "3.5");
    innerDot.setAttribute("fill", "#FFD200");

    const gPill = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gPill.setAttribute("class", "amba-pill-wrap");

    const titulo = nodo.nombre;
    const sub = `${nodo.tipo} • ➔ CTP BUE`;
    const pillW = Math.max(titulo.length * 7.5 + 26, 120);
    const pillH = 34;

    let px = 14, py = -17;
    if (item.labelDir === "left") px = -pillW - 14;
    else if (item.labelDir === "top") { px = -pillW / 2; py = -pillH - 14; }
    else if (item.labelDir === "right") px = 14;

    const pillBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    pillBg.setAttribute("x", px);
    pillBg.setAttribute("y", py);
    pillBg.setAttribute("width", pillW);
    pillBg.setAttribute("height", pillH);
    pillBg.setAttribute("rx", "7");
    pillBg.setAttribute("fill", "#002554");
    pillBg.setAttribute("stroke", "#FFD200");
    pillBg.setAttribute("stroke-width", "1.6");
    pillBg.setAttribute("filter", "url(#shadow-amba)");
    pillBg.setAttribute("class", "amba-pill-bg");

    const t1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t1.setAttribute("x", px + pillW / 2);
    t1.setAttribute("y", py + 14);
    t1.setAttribute("text-anchor", "middle");
    t1.setAttribute("fill", "#FFFFFF");
    t1.setAttribute("font-size", "11.5");
    t1.setAttribute("font-weight", "800");
    t1.setAttribute("font-family", "Inter, sans-serif");
    t1.textContent = titulo;

    const t2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t2.setAttribute("x", px + pillW / 2);
    t2.setAttribute("y", py + 27);
    t2.setAttribute("text-anchor", "middle");
    t2.setAttribute("fill", "#FFD200");
    t2.setAttribute("font-size", "9.5");
    t2.setAttribute("font-weight", "700");
    t2.setAttribute("font-family", "Inter, sans-serif");
    t2.textContent = sub;

    gPill.appendChild(pillBg);
    gPill.appendChild(t1);
    gPill.appendChild(t2);

    gN.appendChild(halo);
    gN.appendChild(dot);
    gN.appendChild(innerDot);
    gN.appendChild(gPill);

    gN.addEventListener("mouseenter", () => {
      const hint = document.querySelector(".mapa-hint-bottom span");
      if (hint) {
        hint.innerHTML = `📍 <strong>${nodo.nombreCompleto || nodo.nombre}</strong> • Capacidad: <strong>${nodo.capacidad}</strong> • Destino: <strong>CTP BUE</strong> (${item.distancia})`;
      }
    });

    gN.addEventListener("click", e => {
      e.stopPropagation();
      document.querySelectorAll(".marcador-g").forEach(m => m.classList.remove("seleccionado"));
      gN.classList.add("seleccionado");
      abrirDetalleNodo(nodo);
    });

    gNodos.appendChild(gN);
  });

  svg.appendChild(gNodos);

  // --- Capa 7: Hub Central de Destino Sorter CTP BUE (Monte Grande) ---
  const gHub = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gHub.setAttribute("class", "marcador-g amba-hub-g seleccionado");
  gHub.dataset.id = ctpBue.id;
  gHub.setAttribute("transform", `translate(${hubPos.x}, ${hubPos.y})`);
  gHub.setAttribute("cursor", "pointer");

  const hubHalo1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  hubHalo1.setAttribute("cx", "0");
  hubHalo1.setAttribute("cy", "0");
  hubHalo1.setAttribute("r", "28");
  hubHalo1.setAttribute("fill", "rgba(255, 210, 0, 0.28)");
  hubHalo1.setAttribute("class", "hub-halo-pulso");

  const hubHalo2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  hubHalo2.setAttribute("cx", "0");
  hubHalo2.setAttribute("cy", "0");
  hubHalo2.setAttribute("r", "19");
  hubHalo2.setAttribute("fill", "rgba(0, 102, 255, 0.35)");

  const hubCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  hubCircle.setAttribute("cx", "0");
  hubCircle.setAttribute("cy", "0");
  hubCircle.setAttribute("r", "13");
  hubCircle.setAttribute("fill", "#002554");
  hubCircle.setAttribute("stroke", "#FFD200");
  hubCircle.setAttribute("stroke-width", "3");
  hubCircle.setAttribute("filter", "url(#glow-hub)");

  const hubStar = document.createElementNS("http://www.w3.org/2000/svg", "text");
  hubStar.setAttribute("x", "0");
  hubStar.setAttribute("y", "4.5");
  hubStar.setAttribute("text-anchor", "middle");
  hubStar.setAttribute("fill", "#FFD200");
  hubStar.setAttribute("font-size", "14");
  hubStar.setAttribute("font-weight", "900");
  hubStar.textContent = "★";

  const cardW = 130;
  const cardH = 32;
  const cardX = -cardW / 2;
  const cardY = 20;

  const cardBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  cardBg.setAttribute("x", cardX);
  cardBg.setAttribute("y", cardY);
  cardBg.setAttribute("width", cardW);
  cardBg.setAttribute("height", cardH);
  cardBg.setAttribute("rx", "8");
  cardBg.setAttribute("fill", "#002554");
  cardBg.setAttribute("stroke", "#FFD200");
  cardBg.setAttribute("stroke-width", "2");
  cardBg.setAttribute("filter", "url(#shadow-amba)");

  const cardT1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  cardT1.setAttribute("x", "0");
  cardT1.setAttribute("y", cardY + 20.5);
  cardT1.setAttribute("text-anchor", "middle");
  cardT1.setAttribute("fill", "#FFD200");
  cardT1.setAttribute("font-size", "14");
  cardT1.setAttribute("font-weight", "900");
  cardT1.setAttribute("font-family", "Inter, sans-serif");
  cardT1.textContent = "CTP BUE";

  gHub.appendChild(hubHalo1);
  gHub.appendChild(hubHalo2);
  gHub.appendChild(hubCircle);
  gHub.appendChild(hubStar);
  gHub.appendChild(cardBg);
  gHub.appendChild(cardT1);

  gHub.addEventListener("click", e => {
    e.stopPropagation();
    abrirDetalleNodo(ctpBue);
  });

  svg.appendChild(gHub);

  // --- Capa 8: Header Banner Superior Izquierdo (Compacto, sin tapar Vicente López) ---
  const gHeader = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gHeader.id = "amba-header-banner";
  gHeader.innerHTML = `
    <rect x="25" y="20" width="310" height="52" rx="10" fill="rgba(0, 37, 84, 0.94)" stroke="#FFD200" stroke-width="1.8" filter="url(#shadow-amba)"/>
    <text x="40" y="42" fill="#FFD200" font-size="12.5" font-weight="900" font-family="Inter, sans-serif">ÁREA METROPOLITANA (AMBA)</text>
    <text x="40" y="59" fill="#FFFFFF" font-size="10.5" font-weight="500" font-family="Inter, sans-serif">5 Centros Logísticos ➔ Sorter CTP BUE</text>
  `;
  svg.appendChild(gHeader);
}

function filtrarRutasHub(hubKey) {
  filtroHubActivo = hubKey;
  document.querySelectorAll(".btn-filtro-ruta").forEach(btn => {
    if (btn.dataset.hub === hubKey) {
      btn.classList.add("activa");
    } else {
      btn.classList.remove("activa");
    }
  });

  const svg = document.getElementById("mapa-svg");
  if (!svg) return;

  if (hubKey === "amba") {
    // Vista Metropolitana: enfocar exclusivamente el área de influencia de los 5 centros del AMBA y CTP BUE
    zoomReset();
    renderizarMapaAMBA(svg);
  } else {
    // Restaurar vista nacional
    zoomReset();
    if (geoData) {
      renderizarMapaCompleto(svg, geoData);
      ajustarLabelsSegunZoom();
      renderizarRutas();
      renderizarNodos();
    }
  }

  // Leyenda reactiva según el hub seleccionado
  document.querySelectorAll(".mapa-leyenda .leyenda-fila").forEach(fila => {
    const esBue = fila.querySelector(".linea-bue");
    const esCba = fila.querySelector(".linea-cordoba");
    const esSta = fila.querySelector(".linea-santafe");
    const esAmba = fila.querySelector(".linea-amba");
    if (esBue) {
      fila.style.display = (hubKey === "todos" || hubKey === "bue") ? "flex" : "none";
    } else if (esCba) {
      fila.style.display = (hubKey === "todos" || hubKey === "cordoba") ? "flex" : "none";
    } else if (esSta) {
      fila.style.display = (hubKey === "todos" || hubKey === "santa_fe") ? "flex" : "none";
    } else if (esAmba) {
      fila.style.display = (hubKey === "amba") ? "flex" : "none";
    }
  });

  const hint = document.querySelector(".mapa-hint-bottom span");
  if (hint) {
    if (hubKey === "todos") {
      hint.textContent = "Red Nacional: 29 rutas hacia los 3 Sorters • Sin centros locales de AMBA";
    } else if (hubKey === "bue") {
      hint.innerHTML = "Filtrado activo: <strong>CTP BUE (Monte Grande)</strong> y sus <strong>13</strong> orígenes del interior nacional";
    } else if (hubKey === "cordoba") {
      hint.innerHTML = "Filtrado activo: <strong>CLOG Córdoba</strong> y sus <strong>11</strong> centros logísticos asociados";
    } else if (hubKey === "santa_fe") {
      hint.innerHTML = "Filtrado activo: <strong>CLOG Santa Fe</strong> y sus <strong>5</strong> centros logísticos asociados";
    } else if (hubKey === "amba") {
      hint.innerHTML = "Vista Metropolitana: <strong>Área de Influencia de los 5 Centros Logísticos</strong> derivados a <strong>CTP BUE (Monte Grande, Esteban Echeverría)</strong>";
    }
  }
}

const CONFIG_HUBS = {
  bue: {
    color: "#0066FF",
    colorHalo: "rgba(0, 102, 255, 0.28)",
    label: "CTP BUE (Monte Grande)",
    clase: "ruta-bue"
  },
  cordoba: {
    color: "#E65100",
    colorHalo: "rgba(230, 81, 0, 0.28)",
    label: "CLOG Córdoba",
    clase: "ruta-cordoba"
  },
  santa_fe: {
    color: "#059669",
    colorHalo: "rgba(5, 150, 105, 0.28)",
    label: "CLOG Santa Fe",
    clase: "ruta-santafe"
  },
  amba: {
    color: "#2563eb",
    colorHalo: "rgba(37, 99, 235, 0.28)",
    label: "CTP BUE (Flujo Metropolitano)",
    clase: "ruta-amba"
  }
};

// =============================================================
// REGIONES OPERATIVAS Y COLORES PASTELES (TAL CUAL EXCEL)
// =============================================================
const REGIONES_PASTEL = {
  sur: {
    id: "sur",
    nombre: "SUR",
    fill: "#CDE8F5",       // Azul cielo pastel suave
    stroke: "#8ec3de",
    provincias: ["neuquen", "rio negro", "chubut", "santa cruz", "tierra del fuego"]
  },
  pba_lapampa: {
    id: "pba_lapampa",
    nombre: "PBA / LA PAMPA",
    fill: "#E8DAEF",       // Lavanda pastel suave
    stroke: "#b89ec9",
    provincias: ["buenos aires", "la pampa"]
  },
  metropolitana: {
    id: "metropolitana",
    nombre: "METROPOLITANA",
    fill: "#FADBD8",       // Coral / Rosa pastel suave
    stroke: "#e09390",
    provincias: ["ciudad de buenos aires", "capital federal", "caba"]
  },
  cuyo_noa: {
    id: "cuyo_noa",
    nombre: "CUYO - NOA",
    fill: "#FDEBD0",       // Durazno / Arena cálido pastel suave
    stroke: "#dfba82",
    provincias: [
      "mendoza", "san juan", "san luis", "catamarca",
      "la rioja", "jujuy", "salta", "santiago del estero", "tucuman"
    ]
  },
  centro_nea: {
    id: "centro_nea",
    nombre: "CENTRO - NEA",
    fill: "#D4EFDF",       // Menta / Salvia verde pastel suave
    stroke: "#88c49e",
    provincias: [
      "cordoba", "santa fe", "entre rios", "corrientes",
      "misiones", "chaco", "formosa"
    ]
  }
};

function obtenerRegionProvincia(nombre) {
  if (!nombre) return { id: "general", nombre: "General", fill: "#e8eff8", stroke: "#98b6d4" };
  const n = nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  for (const [key, reg] of Object.entries(REGIONES_PASTEL)) {
    if (reg.provincias.some(p => n.includes(p) || p.includes(n))) {
      return reg;
    }
  }
  return { id: "general", nombre: "General", fill: "#e8eff8", stroke: "#98b6d4" };
}

// =============================================================
// 2. PROYECCIÓN MERCATOR CONFORME
// =============================================================
const VIEWBOX_W = 500;
const VIEWBOX_H = 900;

let proj = {
  scale: 1,
  minLngRad: 0,
  maxMerc: 0,
  offsetX: 0,
  offsetY: 0,
  toMerc: lat => {
    const r = Math.max(-85, Math.min(85, lat)) * Math.PI / 180;
    return Math.log(Math.tan(Math.PI / 4 + r / 2));
  }
};

function calcularProyeccion(geojson, w = VIEWBOX_W, h = VIEWBOX_H, padding = 16) {
  let minLng = Infinity, maxLng = -Infinity;
  let minLat = Infinity, maxLat = -Infinity;

  function scan(coord) {
    if (!Array.isArray(coord)) return;
    if (typeof coord[0] === "number" && typeof coord[1] === "number") {
      const lng = coord[0], lat = coord[1];
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    } else {
      coord.forEach(scan);
    }
  }

  geojson.features.forEach(f => {
    if (f.geometry && f.geometry.coordinates) scan(f.geometry.coordinates);
  });

  const minLngRad = minLng * Math.PI / 180;
  const maxLngRad = maxLng * Math.PI / 180;
  const maxMerc = proj.toMerc(maxLat);
  const minMerc = proj.toMerc(minLat);

  const deltaLng = maxLngRad - minLngRad;
  const deltaMerc = maxMerc - minMerc;

  const availW = w - 2 * padding;
  const availH = h - 2 * padding;

  const scale = Math.min(availW / deltaLng, availH / deltaMerc);
  const offsetX = padding + (availW - deltaLng * scale) / 2;
  const offsetY = padding + (availH - deltaMerc * scale) / 2;

  proj.scale = scale;
  proj.minLngRad = minLngRad;
  proj.maxMerc = maxMerc;
  proj.offsetX = offsetX;
  proj.offsetY = offsetY;
}

function proyecto(lng, lat) {
  const lngRad = lng * Math.PI / 180;
  const merc = proj.toMerc(lat);
  const x = (lngRad - proj.minLngRad) * proj.scale + proj.offsetX;
  const y = (proj.maxMerc - merc) * proj.scale + proj.offsetY;
  return { x, y };
}

function geoRingToPath(ring) {
  return ring.map((pt, i) => {
    const { x, y } = proyecto(pt[0], pt[1]);
    return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ") + " Z";
}

function geomToPathD(geometry) {
  if (!geometry) return "";
  const parts = [];
  if (geometry.type === "Polygon") {
    geometry.coordinates.forEach(ring => parts.push(geoRingToPath(ring)));
  } else if (geometry.type === "MultiPolygon") {
    geometry.coordinates.forEach(poly =>
      poly.forEach(ring => parts.push(geoRingToPath(ring)))
    );
  }
  return parts.join(" ");
}

// =============================================================
// 3. ESTADO GLOBAL
// =============================================================
let geoData = null;
let nodoActivo = null;
let mapaEstaExpandido = false;

// Zoom & Pan state
let escala = 1;
let panX = 0;
let panY = 0;
let estaArrastrando = false;
let inicioX = 0, inicioY = 0;
let huboMovimiento = false;

// =============================================================
// 4. INICIALIZACIÓN
// =============================================================
document.addEventListener("DOMContentLoaded", () => {
  iniciarInteraccionPanZoom();
  configurarBuscador();
  cargarYConstruirMapa();
});

// =============================================================
// 5. CARGA DEL MAPA DESDE GEOJSON
// =============================================================
async function cargarYConstruirMapa() {
  const svg = document.getElementById("mapa-svg");

  try {
    if (typeof GEOJSON_ARGENTINA !== "undefined" && GEOJSON_ARGENTINA) {
      geoData = GEOJSON_ARGENTINA;
      renderizarMapaCompleto(svg, geoData);
      ajustarLabelsSegunZoom();
      renderizarRutas();
      renderizarNodos();
      return;
    }
    const resp = await fetch("provincias.geojson");
    if (!resp.ok) throw new Error("No se pudo cargar provincias.geojson");
    geoData = await resp.json();
    renderizarMapaCompleto(svg, geoData);
    ajustarLabelsSegunZoom();
    renderizarRutas();
    renderizarNodos();

  } catch (err) {
    console.error("Error al cargar mapa:", err);
    svg.innerHTML = `
      <text x="250" y="450" text-anchor="middle" fill="#002554" font-size="14" font-family="Plus Jakarta Sans, sans-serif">
        Cargando Mapa Operativo Nacional...
      </text>`;
  }
}

// =============================================================
// 6. RENDERIZADO DEL MAPA COMPLETO (PROVINCIAS + ETIQUETAS + RUTAS + NODOS)
// =============================================================
function renderizarMapaCompleto(svg, geojson) {
  svg.innerHTML = "";
  svg.setAttribute("viewBox", `0 0 ${VIEWBOX_W} ${VIEWBOX_H}`);

  // Calcular proyección conforme sobre las 24 provincias
  calcularProyeccion(geojson, VIEWBOX_W, VIEWBOX_H, 16);

  // --- Capa 1: Provincias Argentinas ---
  const gProvincias = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gProvincias.id = "g-provincias";
  svg.appendChild(gProvincias);

  geojson.features.forEach(feature => {
    const rawName = feature.properties.name || feature.properties.nombre || "";
    const d = geomToPathD(feature.geometry);
    if (!d) return;

    const reg = obtenerRegionProvincia(rawName);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("class", `provincia-svg region-${reg.id}`);
    path.dataset.nombre = rawName;
    path.dataset.region = reg.nombre;
    path.setAttribute("fill", reg.fill);
    path.setAttribute("stroke", reg.stroke);

    // Feedback al pasar el mouse sobre la provincia
    path.addEventListener("mouseenter", () => {
      const hint = document.querySelector(".mapa-hint-bottom span");
      if (hint) {
        hint.innerHTML = `📍 <strong>${rawName}</strong> • Región Operativa: <strong>${reg.nombre}</strong>`;
      }
    });

    gProvincias.appendChild(path);
  });

  // --- Capa 2: Etiquetas de nombres de provincias ---
  const gLabels = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gLabels.id = "g-labels";
  svg.appendChild(gLabels);

  geojson.features.forEach(feature => {
    const rawName = feature.properties.name || feature.properties.nombre || "";
    if (!rawName) return;
    const bbox = feature.bbox;
    let cx, cy;
    if (bbox) {
      const pt = proyecto((bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2);
      cx = pt.x; cy = pt.y;
    } else {
      try {
        const coords = feature.geometry.type === "Polygon"
          ? feature.geometry.coordinates[0]
          : feature.geometry.coordinates[0][0];
        let sumLng = 0, sumLat = 0, count = 0;
        coords.forEach(c => { sumLng += c[0]; sumLat += c[1]; count++; });
        const pt = proyecto(sumLng / count, sumLat / count);
        cx = pt.x; cy = pt.y;
      } catch (e) { return; }
    }
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", cx.toFixed(1));
    label.setAttribute("y", cy.toFixed(1));
    label.setAttribute("class", "label-provincia");
    label.textContent = rawName.toUpperCase();
    gLabels.appendChild(label);
  });

  // --- Capa 3: Rutas Logísticas de Transporte ---
  const gRutas = document.createElementNS("http://www.w3.org/2000/svg", "g");
  gRutas.id = "g-rutas";
  svg.appendChild(gRutas);
}

// =============================================================
// SISTEMA DE RUTAS LOGÍSTICAS TRAZADAS
// =============================================================
let rutasPersonalizadas = [];

function trazarRuta(nodos, opciones = {}) {
  const color = opciones.color || "#002554";
  const ancho = opciones.ancho || 3.5;
  const nombre = opciones.nombre || "Ruta Logística";
  const estilo = opciones.estilo || "solid";

  rutasPersonalizadas.push({
    id: "ruta-" + Date.now(),
    nombre,
    color,
    ancho,
    estilo,
    nodos
  });

  const leyendaRutas = document.getElementById("leyenda-rutas-activa");
  if (leyendaRutas) leyendaRutas.style.display = "flex";

  renderizarRutas();
}

function limpiarRutas() {
  rutasPersonalizadas = [];
  const leyendaRutas = document.getElementById("leyenda-rutas-activa");
  if (leyendaRutas) leyendaRutas.style.display = "none";
  renderizarRutas();
}

function buscarNodoPorId(identificador) {
  if (!identificador) return null;
  return nodosData.find(n => n.id === identificador) || nodosMetropolitanos.find(n => n.id === identificador) || null;
}

function buscarNodoPorNombreOId(identificador) {
  if (!identificador) return null;
  const normalizado = identificador.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const todos = [...nodosData, ...nodosMetropolitanos];
  return todos.find(n => {
    const idNorm = n.id.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const nomNorm = n.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const nomCompNorm = (n.nombreCompleto || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return idNorm === normalizado || nomNorm === normalizado || nomCompNorm === normalizado || nomNorm.includes(normalizado) || normalizado.includes(nomNorm);
  });
}

function renderizarRutas() {
  const gRutas = document.getElementById("g-rutas");
  if (!gRutas) return;
  gRutas.innerHTML = "";

  const s = escala;
  const k = s >= 2.5 ? (s * 0.72) : Math.pow(Math.max(s, 0.6), 0.42);

  const rutasAVisualizar = (filtroHubActivo === "amba") ? rutasMetropolitanas : rutasExcel;

  rutasAVisualizar.forEach((ruta, idx) => {
    // Si hay un filtro de destino activo y la ruta no corresponde a ese hub, no se dibuja
    if (filtroHubActivo !== "todos" && filtroHubActivo !== ruta.hub) {
      return;
    }

    const orig = buscarNodoPorId(ruta.origen);
    const dest = buscarNodoPorId(ruta.destino);
    if (!orig || !dest) return;

    const pOrig = proyecto(orig.lng, orig.lat);
    const pDest = proyecto(dest.lng, dest.lat);

    const cfg = CONFIG_HUBS[ruta.hub] || CONFIG_HUBS.bue;

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "ruta-flecha-grupo");
    g.dataset.origen = orig.nombre;
    g.dataset.destino = dest.nombre;
    g.dataset.hub = ruta.hub;

    // Calcular vector dirección
    const dx = pDest.x - pOrig.x;
    const dy = pDest.y - pOrig.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 2) return;

    const ux = dx / dist;
    const uy = dy / dist;

    // Ajustar puntos de inicio y final para respetar los radios de los pines
    const rOrig = (orig.esHub ? 11.0 : 6.5) / k;
    const rDest = (dest.esHub ? 14.5 : 8.5) / k;

    const sx = pOrig.x + ux * rOrig;
    const sy = pOrig.y + uy * rOrig;
    const ex = pDest.x - ux * rDest;
    const ey = pDest.y - uy * rDest;

    // Curvatura suave: arco ligero para distinguir líneas que convergen
    const curvaturaSigno = (idx % 2 === 0 ? 1 : -1);
    const curvaturaAmp = Math.min(22.0, dist * 0.075) * curvaturaSigno / k;
    const perpX = -uy;
    const perpY = ux;

    const cx = (sx + ex) / 2 + perpX * curvaturaAmp;
    const cy = (sy + ey) / 2 + perpY * curvaturaAmp;

    const dPath = `M ${sx.toFixed(2)} ${sy.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)}`;

    // 1. Sombra exterior blanca
    const pathSombra = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathSombra.setAttribute("d", dPath);
    pathSombra.setAttribute("stroke", "#ffffff");
    pathSombra.setAttribute("stroke-width", (4.6 / k).toFixed(2));
    pathSombra.setAttribute("stroke-linecap", "round");
    pathSombra.setAttribute("fill", "none");
    pathSombra.setAttribute("opacity", "0.92");
    g.appendChild(pathSombra);

    // 2. Trazo principal con el color del hub
    const pathLinea = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathLinea.setAttribute("d", dPath);
    pathLinea.setAttribute("stroke", cfg.color);
    pathLinea.setAttribute("stroke-width", (2.2 / k).toFixed(2));
    pathLinea.setAttribute("stroke-linecap", "round");
    pathLinea.setAttribute("fill", "none");
    pathLinea.setAttribute("class", "ruta-linea");
    g.appendChild(pathLinea);

    // 3. Cabeza de flecha orientada en el punto final
    const tangX = ex - cx;
    const tangY = ey - cy;
    const angulo = Math.atan2(tangY, tangX);

    const arrowLen = 9.0 / k;
    const spread = 0.44;
    const w1x = ex - arrowLen * Math.cos(angulo - spread);
    const w1y = ey - arrowLen * Math.sin(angulo - spread);
    const w2x = ex - arrowLen * Math.cos(angulo + spread);
    const w2y = ey - arrowLen * Math.sin(angulo + spread);
    const notchX = ex - (arrowLen * 0.65) * Math.cos(angulo);
    const notchY = ey - (arrowLen * 0.65) * Math.sin(angulo);

    const flechaPoly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    flechaPoly.setAttribute("points", `${ex.toFixed(2)},${ey.toFixed(2)} ${w1x.toFixed(2)},${w1y.toFixed(2)} ${notchX.toFixed(2)},${notchY.toFixed(2)} ${w2x.toFixed(2)},${w2y.toFixed(2)}`);
    flechaPoly.setAttribute("fill", cfg.color);
    flechaPoly.setAttribute("stroke", "#ffffff");
    flechaPoly.setAttribute("stroke-width", (1.0 / k).toFixed(2));
    g.appendChild(flechaPoly);

    // Tooltip al interactuar con la flecha
    g.addEventListener("mouseenter", () => {
      const hint = document.querySelector(".mapa-hint-bottom span");
      if (hint) {
        hint.innerHTML = `📦 <strong>${orig.nombreCompleto || orig.nombre}</strong> ➔ Destino Sorter: <strong>${dest.nombreCompleto || dest.nombre}</strong>`;
      }
    });

    gRutas.appendChild(g);
  });
}

// =============================================================
// SISTEMA DE CLUSTERING Y MARCADORES DE NODOS
// =============================================================

/**
 * Agrupa únicamente nodos con cercanía extrema (específicamente AMBA en vista general).
 * A escala general (s < 1.8), los 5 nodos del AMBA se agrupan en un badge elegante "5 AMBA".
 * Al hacer zoom (s >= 1.8), se abren individualmente con etiquetas inteligentes sin pisarse.
 * Los nodos del interior del país se mantienen siempre visibles individualmente.
 */
/**
 * Agrupa nodos en círculos de cluster según cercanía visual en el nivel de zoom actual.
 * - En vista general o al achicar (zoom out), los nodos cercanos se consolidan en círculos
 *   con el número de CLOGs disponibles, evitando solapamientos de etiquetas.
 * - Al hacer zoom o hacer clic en el cluster, se separan y muestran sus etiquetas completas.
 */
function calcularClusters(nodos) {
  // Cada Centro Logístico se muestra directamente con su pin y etiqueta para facilitar el trazado de rutas
  return nodos.map(n => {
    const p = proyecto(n.lng, n.lat);
    return { nodos: [n], cx: p.x, cy: p.y };
  });
}

/**
 * Renderiza la capa de nodos y badges según el nivel de zoom actual.
 */
function renderizarNodos() {
  const svg = document.getElementById("mapa-svg");
  if (!svg) return;

  let gNodos = document.getElementById("g-nodos");
  if (gNodos) {
    gNodos.innerHTML = "";
  } else {
    gNodos = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gNodos.id = "g-nodos";
    svg.appendChild(gNodos);
  }

  const s = escala;

  let nodosVisibles = [];

  if (filtroHubActivo === "amba") {
    // En la vista Metropolitana: SOLO los 5 centros del AMBA + CTP BUE
    const ctpBue = nodosData.find(n => n.id === "ctp_bue");
    nodosVisibles = [...nodosMetropolitanos];
    if (ctpBue) nodosVisibles.push(ctpBue);
  } else if (filtroHubActivo === "todos") {
    // En Todas las Rutas: TODOS los nodos nacionales, EXCLUYENDO los 5 metropolitanos
    nodosVisibles = nodosData.filter(n => !n.esMetropolitano);
  } else {
    // En los filtros por Hub Sorter (bue, cordoba, santa_fe):
    // Solo los nodos nacionales de origen + el hub destino implicados (excluyendo metropolitanos)
    const idsImplicados = new Set();
    rutasExcel.forEach(r => {
      if (r.hub === filtroHubActivo) {
        idsImplicados.add(r.origen);
        idsImplicados.add(r.destino);
      }
    });
    nodosVisibles = nodosData.filter(n => !n.esMetropolitano && idsImplicados.has(n.id));
  }

  const clusters = calcularClusters(nodosVisibles);

  clusters.forEach(cluster => {
    if (cluster.nodos.length > 1) {
      _renderCluster(cluster, gNodos, s);
    } else {
      _renderNodoSimple(cluster.nodos[0], gNodos, s);
    }
  });
}

/** Dibuja un cluster agrupado: Círculo moderno tipo cluster con el número de CLOGs */
function _renderCluster(cluster, parent, s) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("class", "cluster-g");

  const k = Math.pow(Math.max(s, 0.6), 0.35);
  const count = cluster.nodos.length;

  // Radio del círculo según la cantidad de nodos agrupados
  const baseR = count >= 5 ? 16.0 : (count >= 3 ? 14.5 : 13.0);
  const R = baseR / k;

  // 1. Halo suave exterior
  const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  halo.setAttribute("cx", cluster.cx.toFixed(3));
  halo.setAttribute("cy", cluster.cy.toFixed(3));
  halo.setAttribute("r", (R + 4.5 / k).toFixed(3));
  halo.setAttribute("fill", "rgba(255, 210, 0, 0.28)");
  halo.setAttribute("pointer-events", "none");

  // 2. Círculo sólido principal (Azul institucional Correo con borde dorado)
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", cluster.cx.toFixed(3));
  circle.setAttribute("cy", cluster.cy.toFixed(3));
  circle.setAttribute("r", R.toFixed(3));
  circle.setAttribute("fill", "#002554");
  circle.setAttribute("stroke", "#FFD200");
  circle.setAttribute("stroke-width", (2.2 / k).toFixed(3));
  circle.setAttribute("class", "cluster-circle-bg");

  // 3. Número de nodos (grande, centrado, ultra legible)
  const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
  txt.setAttribute("x", cluster.cx.toFixed(3));
  txt.setAttribute("y", cluster.cy.toFixed(3));
  txt.setAttribute("text-anchor", "middle");
  txt.setAttribute("dominant-baseline", "central");
  txt.setAttribute("fill", "#FFD200");
  txt.setAttribute("font-family", "Inter, -apple-system, sans-serif");
  txt.setAttribute("font-weight", "900");
  txt.setAttribute("font-size", ((baseR * 0.9) / k).toFixed(3));
  txt.setAttribute("class", "cluster-text");
  txt.setAttribute("pointer-events", "none");
  txt.textContent = count;

  g.appendChild(halo);
  g.appendChild(circle);
  g.appendChild(txt);

  // Click en el cluster: hace zoom suave centrado para abrir y desplegar los nodos con etiquetas
  g.addEventListener("click", e => {
    if (huboMovimiento) return;
    e.stopPropagation();

    const contenedor = document.getElementById("mapa-contenedor");
    if (!contenedor) return;
    const rect = contenedor.getBoundingClientRect();

    const elemRect = g.getBoundingClientRect();
    const screenX = elemRect.left + elemRect.width / 2 - rect.left;
    const screenY = elemRect.top + elemRect.height / 2 - rect.top;

    // Zoom hacia el cluster: si tiene muchos nodos (como AMBA) salta a 3.6x, si tiene 2-3 salta a 2.3x
    const targetScale = count >= 4 ? Math.max(escala * 2.2, 3.6) : Math.max(escala * 1.8, 2.3);

    const mapX = (screenX - panX) / escala;
    const mapY = (screenY - panY) / escala;

    panX = rect.width / 2 - mapX * targetScale;
    panY = rect.height / 2 - mapY * targetScale;
    escala = Math.min(targetScale, 8.5);

    aplicarTransformacion(true);
  });

  parent.appendChild(g);
}

/** Dibuja un nodo individual con Pin nítido y Pill badge que protege el texto de pisadas */
function _renderNodoSimple(nodo, parent, s) {
  const p = proyecto(nodo.lng, nodo.lat);

  // Escala suavizada: a mayor zoom (s), los nodos y textos crecen visualmente en pantalla de forma proporcional y limpia
  const k = s >= 2.5 ? (s * 0.72) : Math.pow(Math.max(s, 0.6), 0.42);

  const esHub = Boolean(nodo.esHub);

  // Dimensiones del puntito (nodo físico en el mapa)
  const DOT_R = (esHub ? 10.5 : 7.2) / k;
  const INNER_R = (esHub ? 4.8 : 3.2) / k;
  const GLOW_R = (esHub ? 16.0 : 12.0) / k;
  const SW = (esHub ? 2.4 : 1.8) / k;

  // Direcciones inteligentes calculadas para evitar solapamientos en áreas densas
  let dir = "right";
  if (nodo.id === "ctp_bue") dir = (filtroHubActivo === "amba") ? "bottom" : "top";
  else if (nodo.id === "vte_lopez") dir = "top";
  else if (nodo.id === "barracas") dir = "right";
  else if (nodo.id === "moreno") dir = "left";
  else if (nodo.id === "mercado_central") dir = "left";
  else if (nodo.id === "quilmes") dir = "right";
  else if (nodo.id === "la_plata") dir = "bottom-right";
  else if (nodo.id === "mercedes") dir = "left";
  else if (nodo.id === "pergamino") dir = "top";
  else if (nodo.id === "rio_cuarto") dir = "bottom";
  else if (nodo.id === "villa_maria") dir = "top";
  else if (nodo.id === "santa_fe") dir = "top";
  else if (nodo.id === "rosario") dir = "bottom";
  else if (nodo.id === "cordoba") dir = "top-left";
  else if (nodo.id === "resistencia") dir = "top-left";
  else if (nodo.id === "corrientes") dir = "bottom-right";
  else if (nodo.id === "trelew") dir = "top";
  else if (nodo.id === "comodoro_rivadavia") dir = "bottom";
  else if (nodo.id === "ushuaia") dir = "bottom";
  else if (nodo.id === "rio_grande") dir = "right";

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("class", `marcador-g ${esHub ? "marcador-hub" : ""}`);
  g.dataset.id = nodo.id;

  // Dimensiones de la etiqueta con el nombre del CLOG
  const nombreTexto = esHub ? `★ ${nodo.nombre}` : nodo.nombre;
  const charWidth = (esHub ? 6.8 : 6.2) / k;
  const pillW = (nombreTexto.length * charWidth + (esHub ? 18 : 14) / k);
  const pillH = (esHub ? 18.5 : 16.5) / k;
  const fontSize = (esHub ? 10.0 : 9.2) / k;
  const pillRadius = 4.5 / k;
  const gap = 5.0 / k;

  let pillX = p.x + DOT_R + gap;
  let pillY = p.y - pillH / 2;
  let textX = pillX + pillW / 2;
  let textY = p.y;

  if (dir === "left") {
    pillX = p.x - DOT_R - gap - pillW;
    pillY = p.y - pillH / 2;
    textX = pillX + pillW / 2;
    textY = p.y;
  } else if (dir === "top") {
    pillX = p.x - pillW / 2;
    pillY = p.y - DOT_R - gap - pillH;
    textX = p.x;
    textY = pillY + pillH / 2;
  } else if (dir === "bottom") {
    pillX = p.x - pillW / 2;
    pillY = p.y + DOT_R + gap;
    textX = p.x;
    textY = pillY + pillH / 2;
  } else if (dir === "bottom-left") {
    pillX = p.x - DOT_R - gap - pillW;
    pillY = p.y + DOT_R * 0.4 + gap;
    textX = pillX + pillW / 2;
    textY = pillY + pillH / 2;
  } else if (dir === "bottom-right") {
    pillX = p.x + DOT_R + gap;
    pillY = p.y + DOT_R * 0.4 + gap;
    textX = pillX + pillW / 2;
    textY = pillY + pillH / 2;
  } else if (dir === "top-left") {
    pillX = p.x - DOT_R - gap - pillW;
    pillY = p.y - DOT_R - gap - pillH * 0.5;
    textX = pillX + pillW / 2;
    textY = pillY + pillH / 2;
  }

  // --- Capa 1: Fondo del Pill ---
  const pillBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  pillBg.setAttribute("x", pillX.toFixed(3));
  pillBg.setAttribute("y", pillY.toFixed(3));
  pillBg.setAttribute("width", pillW.toFixed(3));
  pillBg.setAttribute("height", pillH.toFixed(3));
  pillBg.setAttribute("rx", pillRadius.toFixed(3));
  pillBg.setAttribute("ry", pillRadius.toFixed(3));
  pillBg.setAttribute("fill", esHub ? "#002554" : "#ffffff");
  pillBg.setAttribute("stroke", esHub ? "#FFD200" : "#c4d8ea");
  pillBg.setAttribute("stroke-width", ((esHub ? 1.8 : 1.2) / k).toFixed(3));
  pillBg.setAttribute("class", "label-pill-bg");
  pillBg.setAttribute("pointer-events", "none");

  // Texto del nombre del CLOG
  const labelTxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
  labelTxt.setAttribute("x", textX.toFixed(3));
  labelTxt.setAttribute("y", textY.toFixed(3));
  labelTxt.setAttribute("text-anchor", "middle");
  labelTxt.setAttribute("dominant-baseline", "central");
  labelTxt.setAttribute("fill", esHub ? "#FFD200" : "#002554");
  labelTxt.setAttribute("font-family", "Inter, -apple-system, sans-serif");
  labelTxt.setAttribute("font-size", fontSize.toFixed(3));
  labelTxt.setAttribute("font-weight", esHub ? "900" : "800");
  labelTxt.setAttribute("class", "label-pill-text");
  labelTxt.setAttribute("pointer-events", "none");
  labelTxt.textContent = nombreTexto;

  g.appendChild(pillBg);
  g.appendChild(labelTxt);

  // --- Capa 2: Puntito del CLOG ---
  if (esHub) {
    // Halo pulsante dorado exclusivo de los 3 Sorters de Destino
    const haloHub = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    haloHub.setAttribute("cx", p.x.toFixed(3));
    haloHub.setAttribute("cy", p.y.toFixed(3));
    haloHub.setAttribute("r", (DOT_R + 6.0 / k).toFixed(3));
    haloHub.setAttribute("fill", "rgba(255, 210, 0, 0.40)");
    haloHub.setAttribute("class", "hub-halo-pulso");
    haloHub.setAttribute("pointer-events", "none");
    g.appendChild(haloHub);
  }

  // Halo exterior
  const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  halo.setAttribute("cx", p.x.toFixed(3));
  halo.setAttribute("cy", p.y.toFixed(3));
  halo.setAttribute("r", GLOW_R.toFixed(3));
  halo.setAttribute("fill", esHub ? "rgba(255, 210, 0, 0.22)" : "rgba(0, 37, 84, 0.16)");

  // Círculo base (Azul institucional para Hubs, Verde para orígenes)
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", p.x.toFixed(3));
  circle.setAttribute("cy", p.y.toFixed(3));
  circle.setAttribute("r", DOT_R.toFixed(3));
  circle.setAttribute("fill", esHub ? "#002554" : "#008a38");
  circle.setAttribute("stroke", esHub ? "#FFD200" : "#ffffff");
  circle.setAttribute("stroke-width", SW.toFixed(3));
  circle.setAttribute("class", "node-dot-core");

  // Centro
  const centerDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  centerDot.setAttribute("cx", p.x.toFixed(3));
  centerDot.setAttribute("cy", p.y.toFixed(3));
  centerDot.setAttribute("r", INNER_R.toFixed(3));
  centerDot.setAttribute("fill", esHub ? "#FFD200" : "#FFD200");
  centerDot.setAttribute("pointer-events", "none");

  g.appendChild(halo);
  g.appendChild(circle);
  g.appendChild(centerDot);

  g.addEventListener("click", e => {
    if (huboMovimiento) return;
    e.stopPropagation();
    document.querySelectorAll(".marcador-g").forEach(m => m.classList.remove("seleccionado"));
    g.classList.add("seleccionado");
    abrirDetalleNodo(nodo);
  });

  parent.appendChild(g);
}

/** Zoom suave hacia el centroide de un cluster */
function zoomHaciaCluster(cx, cy) {
  const contenedor = document.getElementById("mapa-contenedor");
  if (!contenedor) return;
  const rect = contenedor.getBoundingClientRect();

  const nuevaEscala = Math.min(escala * 2.5, 9);
  panX = rect.width / 2 - cx * nuevaEscala;
  panY = rect.height / 2 - cy * nuevaEscala;
  escala = nuevaEscala;

  aplicarTransformacion(true);
}

function obtenerClaseTipo(tipo) {
  switch (tipo) {
    case "CLOG": return "nodo-clog";
    case "DP": return "nodo-dp";
    case "Sorter": return "nodo-sorter";
    case "Regional": return "nodo-regional";
    default: return "nodo-sucursal";
  }
}

function resaltarProvincia(pathEl) {
  document.querySelectorAll(".provincia-svg").forEach(p => {
    p.classList.remove("seleccionada");
  });
  if (pathEl) {
    pathEl.classList.add("seleccionada");
  }
}

/** Deselecciona cualquier provincia o nodo activo y cierra popups */
function deseleccionarTodo() {
  document.querySelectorAll(".provincia-svg.seleccionada").forEach(p => {
    p.classList.remove("seleccionada");
  });
  document.querySelectorAll(".marcador-g.seleccionado").forEach(m => {
    m.classList.remove("seleccionado");
  });
  cerrarPopupNodo();
  const hint = document.querySelector(".mapa-hint-bottom span");
  if (hint) {
    hint.textContent = "Seleccioná un nodo en el mapa para ver su información.";
  }
}

function normalizarTexto(txt) {
  return (txt || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function buscarNodosPorProvincia(rawName) {
  const norm = normalizarTexto(rawName);
  return nodosData.filter(n => {
    const np = normalizarTexto(n.provincia);
    if (norm.includes("ciudad") || norm === "caba") {
      return np.includes("ciudad") || np.includes("caba") || n.id === "barracas";
    }
    if (norm === "buenos aires") {
      return np === "buenos aires";
    }
    return np === norm || np.includes(norm) || norm.includes(np);
  });
}

function seleccionarProvincia(rawName) {
  const nodos = buscarNodosPorProvincia(rawName);

  if (nodos.length > 0) {
    // Destacar en el mapa el/los marcadores correspondientes a esta provincia
    document.querySelectorAll(".marcador-g").forEach(m => {
      const match = nodos.some(n => n.id === m.dataset.id);
      if (match) m.classList.add("seleccionado");
      else m.classList.remove("seleccionado");
    });

    // Abrir ficha del nodo principal o primer nodo, sin saltar la pantalla a zonas vacías
    const principal = nodos.find(n => n.id === "mercado_central" || n.id === "cordoba" || n.id === "rosario" || n.id === "trelew") || nodos[0];
    abrirDetalleNodo(principal, nodos);

    const hint = document.querySelector(".mapa-hint-bottom span");
    if (hint) {
      hint.textContent = `${rawName}: ${nodos.length} centro(s) logístico(s) operativo(s).`;
    }
  } else {
    // Si la provincia no tiene CLOGs propios (ej. Formosa, Tierra del Fuego)
    cerrarPopupNodo();
    const hint = document.querySelector(".mapa-hint-bottom span");
    if (hint) {
      hint.textContent = `Provincia de ${rawName}: cobertura logística articulada mediante cabeceras regionales limítrofes.`;
    }
  }
}

// =============================================================
// 7. EXPANDIR / HACER GRANDE EL MAPA (OCULTAR SIDEBAR)
// =============================================================
function toggleExpandirMapa() {
  expandirMapa(!mapaEstaExpandido);
}

function expandirMapa(expandir) {
  mapaEstaExpandido = expandir;
  const dashboard = document.getElementById("dashboard-principal");
  const expandText = document.getElementById("expand-text");
  const expandIcon = document.getElementById("expand-icon");

  if (mapaEstaExpandido) {
    dashboard.classList.add("mapa-expandido");
    if (expandText) expandText.textContent = "Contraer mapa";
    if (expandIcon) expandIcon.textContent = "✕";

    // Scroll suave hacia el mapa si está arriba
    const mapaEl = document.getElementById("columna-mapa");
    if (mapaEl) {
      mapaEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else {
    dashboard.classList.remove("mapa-expandido");
    if (expandText) expandText.textContent = "Ampliar mapa";
    if (expandIcon) expandIcon.textContent = "⛶";
  }
}

// =============================================================
// 8. INTERACCIÓN DE PAN (MOVER) Y ZOOM (CON RATÓN Y TOUCH)
// =============================================================
function aplicarTransformacion(conAnimacion = false) {
  const wrap = document.getElementById("mapa-wrap");
  if (!wrap) return;

  if (conAnimacion) {
    wrap.style.transition = "transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)";
  } else {
    wrap.style.transition = "none";
  }
  wrap.style.transform = `translate(${panX.toFixed(2)}px, ${panY.toFixed(2)}px) scale(${escala.toFixed(4)})`;

  // Actualizar etiquetas de provincias, rutas y nodos solo en la vista nacional
  if (filtroHubActivo !== "amba") {
    ajustarLabelsSegunZoom();
    renderizarRutas();
    renderizarNodos();
  }
}

/**
 * Ajusta tamaño y opacidad de las etiquetas provinciales según el nivel de zoom.
 * Al hacer zoom en los nodos (escala >= 2.0), las provincias se atenúan para no competir con los nombres de los nodos.
 */
function ajustarLabelsSegunZoom() {
  const s = escala;
  const svg = document.getElementById("mapa-svg");
  if (!svg) return;

  const BASE_PROV = 6.4;
  const opacity = s >= 2.2 ? 0.10 : (s >= 1.6 ? 0.35 : 0.85);

  svg.querySelectorAll(".label-provincia").forEach(el => {
    el.style.fontSize = (BASE_PROV / s).toFixed(3) + "px";
    el.style.letterSpacing = (0.3 / s).toFixed(3) + "px";
    el.style.opacity = opacity;
  });
}


function zoomCentrado(factor) {
  const contenedor = document.getElementById("mapa-contenedor");
  if (!contenedor) return;

  const rect = contenedor.getBoundingClientRect();
  const mouseX = rect.width / 2;
  const mouseY = rect.height / 2;

  const mapX = (mouseX - panX) / escala;
  const mapY = (mouseY - panY) / escala;

  const nuevaEscala = Math.min(Math.max(escala * factor, 0.6), 32);
  panX = mouseX - mapX * nuevaEscala;
  panY = mouseY - mapY * nuevaEscala;
  escala = nuevaEscala;

  aplicarTransformacion(true);
}

function zoomIn() { zoomCentrado(1.3); }
function zoomOut() { zoomCentrado(1 / 1.3); }
function zoomReset() {
  escala = 1;
  panX = 0;
  panY = 0;
  aplicarTransformacion(true);
}

function iniciarInteraccionPanZoom() {
  const contenedor = document.getElementById("mapa-contenedor");
  if (!contenedor) return;

  // 1. Rueda del ratón (Wheel Zoom hacia el cursor)
  contenedor.addEventListener("wheel", e => {
    e.preventDefault();
    const rect = contenedor.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const mapX = (mouseX - panX) / escala;
    const mapY = (mouseY - panY) / escala;

    const factor = e.deltaY < 0 ? 1.15 : (1 / 1.15);
    const nuevaEscala = Math.min(Math.max(escala * factor, 0.6), 32);

    panX = mouseX - mapX * nuevaEscala;
    panY = mouseY - mapY * nuevaEscala;
    escala = nuevaEscala;

    aplicarTransformacion(false);
  }, { passive: false });

  // 2. Arrastre con el ratón (Pan / Drag)
  contenedor.addEventListener("mousedown", e => {
    if (e.button !== 0) return; // Solo clic izquierdo
    estaArrastrando = true;
    huboMovimiento = false;
    inicioX = e.clientX - panX;
    inicioY = e.clientY - panY;
    contenedor.classList.add("arrastrando");
  });

  window.addEventListener("mousemove", e => {
    if (!estaArrastrando) return;
    const dx = Math.abs(e.clientX - (inicioX + panX));
    const dy = Math.abs(e.clientY - (inicioY + panY));
    if (dx > 4 || dy > 4) {
      huboMovimiento = true;
    }
    panX = e.clientX - inicioX;
    panY = e.clientY - inicioY;
    aplicarTransformacion(false);
  });

  window.addEventListener("mouseup", () => {
    if (estaArrastrando) {
      estaArrastrando = false;
      contenedor.classList.remove("arrastrando");
      setTimeout(() => { huboMovimiento = false; }, 60);
    }
  });

  // Al hacer clic en el mapa:
  contenedor.addEventListener("click", e => {
    if (huboMovimiento) return;

    // Si hizo clic en controles o leyenda, ignorar
    if (e.target.closest(".btn-ctrl-mapa") || e.target.closest(".mapa-leyenda")) {
      return;
    }

    // Si hizo clic en un nodo, cluster o provincia, ellos manejan su evento
    if (e.target.closest(".marcador-g") || e.target.closest(".cluster-g") || e.target.closest(".provincia-svg")) {
      return;
    }

    // Si hizo clic en un lugar vacío del mapa (océano / fondo):
    // Desaparece el foco amarillo de la provincia y se deselecciona todo
    deseleccionarTodo();

    if (!mapaEstaExpandido) {
      expandirMapa(true);
    }
  });

  // 3. Touch Drag y Pinch-to-zoom
  let distInicialToque = 0;
  let escalaInicialToque = 1;
  let centroInicialToque = { x: 0, y: 0 };

  contenedor.addEventListener("touchstart", e => {
    if (e.touches.length === 1) {
      estaArrastrando = true;
      huboMovimiento = false;
      inicioX = e.touches[0].clientX - panX;
      inicioY = e.touches[0].clientY - panY;
    } else if (e.touches.length === 2) {
      estaArrastrando = false;
      huboMovimiento = true;
      const t1 = e.touches[0], t2 = e.touches[1];
      distInicialToque = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      escalaInicialToque = escala;
      const rect = contenedor.getBoundingClientRect();
      centroInicialToque = {
        x: (t1.clientX + t2.clientX) / 2 - rect.left,
        y: (t1.clientY + t2.clientY) / 2 - rect.top
      };
    }
  }, { passive: false });

  contenedor.addEventListener("touchmove", e => {
    e.preventDefault();
    if (e.touches.length === 1 && estaArrastrando) {
      huboMovimiento = true;
      panX = e.touches[0].clientX - inicioX;
      panY = e.touches[0].clientY - inicioY;
      aplicarTransformacion(false);
    } else if (e.touches.length === 2 && distInicialToque > 0) {
      huboMovimiento = true;
      const t1 = e.touches[0], t2 = e.touches[1];
      const distActual = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const factor = distActual / distInicialToque;
      const mouseX = centroInicialToque.x;
      const mouseY = centroInicialToque.y;
      const mapX = (mouseX - panX) / escala;
      const mapY = (mouseY - panY) / escala;

      const nuevaEscala = Math.min(Math.max(escalaInicialToque * factor, 0.6), 32);
      panX = mouseX - mapX * nuevaEscala;
      panY = mouseY - mapY * nuevaEscala;
      escala = nuevaEscala;
      aplicarTransformacion(false);
    }
  }, { passive: false });

  contenedor.addEventListener("touchend", () => {
    estaArrastrando = false;
    distInicialToque = 0;
    setTimeout(() => { huboMovimiento = false; }, 60);
  });
}

// =============================================================
// 9. DETALLE DEL NODO AL HACER CLICK (POPUP CON FOTO)
// =============================================================
function abrirDetalleNodo(nodo, nodosHermano = null) {
  nodoActivo = nodo;

  const hint = document.querySelector(".mapa-hint-bottom span");
  if (hint) {
    hint.textContent = `📍 ${nodo.nombreCompleto || nodo.nombre} (${nodo.provincia}) seleccionado.`;
  }

  const popup = document.getElementById("popup-nodo");
  if (!popup) return;

  const nomEl = document.getElementById("popup-nombre");
  if (nomEl) nomEl.textContent = nodo.nombreCompleto || nodo.nombre;
  const ubEl = document.getElementById("popup-ubicacion");
  if (ubEl) ubEl.textContent = `${nodo.provincia} · Red Logística Nacional`;
  const bgEl = document.getElementById("popup-badge-tipo");
  if (bgEl) bgEl.textContent = formatearTipoBadge(nodo.tipo);

  // Foto del nodo (o fallback a placeholder)
  const imgEl = document.getElementById("popup-img");
  const fotos = (nodo.fotos && nodo.fotos.length > 0) ? nodo.fotos : ["imagenes/placeholder.jpg"];
  fotoActualIdx = 0;
  if (imgEl) imgEl.src = fotos[0];

  // Renderizar tira interactiva de miniaturas de fotos del nodo
  const strip = document.getElementById("popup-galeria-strip");
  if (strip) {
    strip.innerHTML = "";
    if (fotos.length > 1) {
      fotos.forEach((f, idx) => {
        const thumb = document.createElement("img");
        thumb.src = f;
        thumb.className = `popup-thumb ${idx === 0 ? "activa" : ""}`;
        thumb.alt = `Foto ${idx + 1} de ${nodo.nombre}`;
        thumb.onclick = (e) => {
          e.stopPropagation();
          fotoActualIdx = idx;
          if (imgEl) imgEl.src = f;
          strip.querySelectorAll(".popup-thumb").forEach(t => t.classList.remove("activa"));
          thumb.classList.add("activa");
        };
        strip.appendChild(thumb);
      });
      strip.style.display = "flex";
    } else {
      strip.style.display = "none";
    }
  }

  popup.classList.add("visible");
}

function formatearTipoBadge(tipo) {
  switch (tipo) {
    case "CLOG":
    case "CDP":
      return "Centro Logístico (CLOG)";
    case "Hub Sorter":
    case "Sorter":
      return "Planta Sorter Automatizada";
    case "DP":
      return "Centro Logístico (CLOG)";
    case "Regional":
      return "Nodo Regional";
    default:
      return "Centro Logístico (CLOG)";
  }
}

function cerrarPopupNodo() {
  const p = document.getElementById("popup-nodo");
  if (p) p.classList.remove("visible");
}

function cerrarPopupNodoOverlay(e) {
  if (e.target.id === "popup-nodo") {
    deseleccionarTodo();
  }
}

// =============================================================
// 10. MODAL DE GALERÍA EN PANTALLA COMPLETA
// =============================================================
let fotoActualIdx = 0;

function abrirGaleriaDesdePopup() {
  if (!nodoActivo) return;
  fotoActualIdx = 0;
  actualizarVistaGaleria();
  document.getElementById("modal-galeria").classList.add("visible");
}

function cerrarGaleria() {
  document.getElementById("modal-galeria").classList.remove("visible");
}

function cerrarGaleriaOverlay(e) {
  if (e.target.id === "modal-galeria") {
    cerrarGaleria();
  }
}

function fotoAnterior() {
  if (!nodoActivo) return;
  const fotos = nodoActivo.fotos || ["imagenes/placeholder.jpg"];
  fotoActualIdx = (fotoActualIdx - 1 + fotos.length) % fotos.length;
  actualizarVistaGaleria();
}

function fotoSiguiente() {
  if (!nodoActivo) return;
  const fotos = nodoActivo.fotos || ["imagenes/placeholder.jpg"];
  fotoActualIdx = (fotoActualIdx + 1) % fotos.length;
  actualizarVistaGaleria();
}

function actualizarVistaGaleria() {
  const fotos = (nodoActivo && nodoActivo.fotos && nodoActivo.fotos.length) ? nodoActivo.fotos : ["imagenes/placeholder.jpg"];
  document.getElementById("gal-img").src = fotos[fotoActualIdx];
  document.getElementById("gal-titulo").textContent = nodoActivo ? (nodoActivo.nombreCompleto || nodoActivo.nombre) : "Fotografía de Instalaciones";
  document.getElementById("gal-sub").textContent = nodoActivo ? `${nodoActivo.provincia} · ${nodoActivo.tipo}` : "";
  document.getElementById("gal-contador").textContent = `Foto ${fotoActualIdx + 1} de ${fotos.length}`;
}

// Teclado para galería y popup
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    cerrarGaleria();
    cerrarPopupNodo();
  }
  const modalGal = document.getElementById("modal-galeria");
  if (modalGal && modalGal.classList.contains("visible")) {
    if (e.key === "ArrowLeft") fotoAnterior();
    if (e.key === "ArrowRight") fotoSiguiente();
  }
});

// =============================================================
// 11. ACCESO RÁPIDO & FILTROS POR TIPO DE NODO
// =============================================================
function filtrarTipoNodo(tipo) {
  // Al hacer click en "Centros Logísticos" o "Sorters", expandimos el mapa y destacamos esos nodos
  expandirMapa(true);

  document.querySelectorAll(".marcador-g").forEach(el => {
    // Si queremos filtrar visualmente, podemos resaltar o parpadear
    el.style.opacity = "1";
  });
}

// Buscador en Topbar
function configurarBuscador() {
  const input = document.getElementById("global-search");
  if (!input) return;

  input.addEventListener("input", e => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) return;

    // Buscar coincidencia en nodos
    const match = nodosData.find(n => n.nombre.toLowerCase().includes(q) || n.provincia.toLowerCase().includes(q));
    if (match) {
      if (filtroHubActivo !== "todos") {
        filtrarRutasHub("todos");
      }
      const p = proyecto(match.lng, match.lat);
      const contenedor = document.getElementById("mapa-contenedor");
      if (contenedor) {
        const rect = contenedor.getBoundingClientRect();
        escala = 2.2;
        panX = rect.width / 2 - p.x * escala;
        panY = rect.height / 2 - p.y * escala;
        aplicarTransformacion(true);
      }
    }
  });
}
