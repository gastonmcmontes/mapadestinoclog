// =============================================================
// CORREO ARGENTINO — RED OPERATIVA NACIONAL
// script.js — Lógica de Mapa Leaflet interactivo de Flujos y Sorters
// =============================================================

// =============================================================
// 1. DATASET DE NODOS LOGÍSTICOS
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
    fotos: ["imagenes/placeholder.jpg"],
    desc: "Centro Tecnológico Postal Buenos Aires — Planta Monte Grande, Esteban Echeverría. Hub nacional de concentración y clasificación automatizada (Sorter)."
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
    id: "pehuajo", nombre: "Pehuajó", nombreCompleto: "CTP Pehuajó",
    tipo: "CTP", provincia: "Buenos Aires",
    lat: -35.81, lng: -61.90,
    capacidad: "4.500 m²", piezasDia: "6.000", operatividad: "L a V",
    fotos: ["imagenes/metro-pba/Mercedes.jpg"],
    desc: "Centro de Transferencia Postal en el oeste bonaerense sobre el corredor de la Ruta Nacional 5."
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
    fotos: ["imagenes/sur/BARILOCHE_1.jpg", "imagenes/sur/BARILOCHE_2.jpg", "imagenes/sur/BARILOCHE_3.jpg", "imagenes/sur/BARILOCHE_4.jpg"],
    desc: "Centro logístico andino patagónico, cabecera de distribución para la zona lacustre y cordillerana de Río Negro."
  },
  {
    id: "comodoro_rivadavia", nombre: "Comodoro Rivadavia", nombreCompleto: "CLOG Comodoro Rivadavia",
    tipo: "CLOG", provincia: "Chubut",
    lat: -45.87, lng: -67.50,
    capacidad: "6.000 m²", piezasDia: "9.500", operatividad: "24 / 7",
    fotos: ["imagenes/sur/COMODORO_RIVADAVIA_1.jpg", "imagenes/sur/COMODORO_RIVADAVIA_2.jpg", "imagenes/sur/COMODORO_RIVADAVIA_3.jpg", "imagenes/sur/COMODORO_RIVADAVIA_4.jpg"],
    desc: "Hub logístico del Golfo San Jorge y la Patagonia Central, articulando Chubut con el norte santacruceño."
  },
  {
    id: "neuquen", nombre: "Neuquén", nombreCompleto: "CLOG Neuquén",
    tipo: "CLOG", provincia: "Neuquén",
    lat: -38.95, lng: -69.25,
    capacidad: "7.800 m²", piezasDia: "15.000", operatividad: "24 / 7",
    fotos: ["imagenes/sur/NEUQUEN_1.jpg", "imagenes/sur/NEUQUEN_2.jpg", "imagenes/sur/NEUQUEN_3.jpg", "imagenes/sur/NEUQUEN_4.jpg"],
    desc: "Cabecera logística del Alto Valle, soporte operativo integral para el polo de desarrollo de Vaca Muerta."
  },
  {
    id: "rio_gallegos", nombre: "Río Gallegos", nombreCompleto: "CLOG Río Gallegos",
    tipo: "CLOG", provincia: "Santa Cruz",
    lat: -51.62, lng: -69.22,
    capacidad: "4.000 m²", piezasDia: "6.400", operatividad: "L a S",
    fotos: ["imagenes/sur/RIO_GALLEGOS_1.jpg", "imagenes/sur/RIO_GALLEGOS_2.jpg", "imagenes/sur/RIO_GALLEGOS_3.jpg"],
    desc: "Nodo logístico austral en Santa Cruz, articulación continental con Tierra del Fuego y pasos fronterizos."
  },
  {
    id: "trelew", nombre: "Trelew", nombreCompleto: "CLOG Trelew",
    tipo: "CLOG", provincia: "Chubut",
    lat: -43.25, lng: -65.31,
    capacidad: "5.500 m²", piezasDia: "6.500", operatividad: "L a S",
    fotos: ["imagenes/sur/TRELEW_1.jpg", "imagenes/sur/TRELEW_2.jpg", "imagenes/sur/TRELEW_3.jpg"],
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
// RUTAS Y DERIVACIÓN HACIA SORTERS
// =============================================================
const rutasExcel = [
  // Flujo 1: Hacia CTP BUE (Monte Grande) - 13 orígenes
  { origen: "neuquen", destino: "ctp_bue", hub: "bue", nombre: "Neuquén ➔ CTP BUE", color: "#0066FF" },
  { origen: "comodoro_rivadavia", destino: "ctp_bue", hub: "bue", nombre: "Comodoro Rivadavia ➔ CTP BUE", color: "#0066FF" },
  { origen: "trelew", destino: "ctp_bue", hub: "bue", nombre: "Trelew ➔ CTP BUE", color: "#0066FF" },
  { origen: "rio_gallegos", destino: "ctp_bue", hub: "bue", nombre: "Río Gallegos ➔ CTP BUE", color: "#0066FF" },
  { origen: "bariloche", destino: "ctp_bue", hub: "bue", nombre: "Bariloche ➔ CTP BUE", color: "#0066FF" },
  { origen: "ushuaia", destino: "ctp_bue", hub: "bue", nombre: "Ushuaia ➔ CTP BUE", color: "#0066FF" },
  { origen: "rio_grande", destino: "ctp_bue", hub: "bue", nombre: "Río Grande ➔ CTP BUE", color: "#0066FF" },
  { origen: "la_plata", destino: "ctp_bue", hub: "bue", nombre: "La Plata ➔ CTP BUE", color: "#0066FF" },
  { origen: "bahia_blanca", destino: "ctp_bue", hub: "bue", nombre: "Bahía Blanca ➔ CTP BUE", color: "#0066FF" },
  { origen: "mar_del_plata", destino: "ctp_bue", hub: "bue", nombre: "Mar del Plata ➔ CTP BUE", color: "#0066FF" },
  { origen: "mercedes", destino: "ctp_bue", hub: "bue", nombre: "Mercedes ➔ CTP BUE", color: "#0066FF" },
  { origen: "pergamino", destino: "ctp_bue", hub: "bue", nombre: "Pergamino ➔ CTP BUE", color: "#0066FF" },
  { origen: "santa_rosa", destino: "ctp_bue", hub: "bue", nombre: "Santa Rosa ➔ CTP BUE", color: "#0066FF" },

  // Flujo 2: Hacia CLOG CÓRDOBA - 11 orígenes
  { origen: "mendoza", destino: "cordoba", hub: "cordoba", nombre: "Mendoza ➔ Córdoba", color: "#E65100" },
  { origen: "san_juan", destino: "cordoba", hub: "cordoba", nombre: "San Juan ➔ Córdoba", color: "#E65100" },
  { origen: "san_luis", destino: "cordoba", hub: "cordoba", nombre: "San Luis ➔ Córdoba", color: "#E65100" },
  { origen: "catamarca", destino: "cordoba", hub: "cordoba", nombre: "Catamarca ➔ Córdoba", color: "#E65100" },
  { origen: "la_rioja", destino: "cordoba", hub: "cordoba", nombre: "La Rioja ➔ Córdoba", color: "#E65100" },
  { origen: "jujuy", destino: "cordoba", hub: "cordoba", nombre: "Jujuy ➔ Córdoba", color: "#E65100" },
  { origen: "salta", destino: "cordoba", hub: "cordoba", nombre: "Salta ➔ Córdoba", color: "#E65100" },
  { origen: "santiago_estero", destino: "cordoba", hub: "cordoba", nombre: "Santiago del Estero ➔ Córdoba", color: "#E65100" },
  { origen: "tucuman", destino: "cordoba", hub: "cordoba", nombre: "Tucumán ➔ Córdoba", color: "#E65100" },
  { origen: "villa_maria", destino: "cordoba", hub: "cordoba", nombre: "Villa María ➔ Córdoba", color: "#E65100" },
  { origen: "rio_cuarto", destino: "cordoba", hub: "cordoba", nombre: "Río Cuarto ➔ Córdoba", color: "#E65100" },

  // Flujo 3: Hacia CLOG SANTA FE - 5 orígenes
  { origen: "rosario", destino: "santa_fe", hub: "santa_fe", nombre: "Rosario ➔ Santa Fe", color: "#059669" },
  { origen: "posadas", destino: "santa_fe", hub: "santa_fe", nombre: "Posadas ➔ Santa Fe", color: "#059669" },
  { origen: "corrientes", destino: "santa_fe", hub: "santa_fe", nombre: "Corrientes ➔ Santa Fe", color: "#059669" },
  { origen: "parana", destino: "santa_fe", hub: "santa_fe", nombre: "Paraná ➔ Santa Fe", color: "#059669" },
  { origen: "resistencia", destino: "santa_fe", hub: "santa_fe", nombre: "Resistencia ➔ Santa Fe", color: "#059669" }
];

// =============================================================
// NODOS Y RUTAS DEL ÁREA METROPOLITANA (AMBA)
// =============================================================
const nodosMetropolitanos = [
  {
    id: "barracas",
    nombre: "CABA Sur (Barracas)",
    nombreCompleto: "CLOG CABA Sur — Barracas",
    tipo: "CLOG",
    provincia: "Ciudad de Buenos Aires",
    esMetropolitano: true,
    lat: -34.6391,
    lng: -58.3789,
    capacidad: "9.200 m²",
    piezasDia: "28.000",
    operatividad: "24 / 7",
    fotos: ["imagenes/placeholder.jpg"],
    desc: "Centro Logístico CABA Sur en Barracas, Capital Federal."
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
    desc: "Centro Logístico Vicente López en Olivos, eje norte del Conurbano."
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
    desc: "Centro Logístico Quilmes Oeste, eje sur del Conurbano Bonaerense."
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
    desc: "Centro Logístico Moreno, corredor oeste sobre RN 7."
  }
];

const rutasMetropolitanas = [
  { origen: "barracas", destino: "ctp_bue", hub: "amba", nombre: "CABA Sur (Barracas) ➔ CTP BUE", distancia: "24 km", color: "#6366F1" },
  { origen: "vte_lopez", destino: "ctp_bue", hub: "amba", nombre: "Vicente López ➔ CTP BUE", distancia: "38 km", color: "#6366F1" },
  { origen: "mercado_central", destino: "ctp_bue", hub: "amba", nombre: "Mercado Central ➔ CTP BUE", distancia: "14 km", color: "#6366F1" },
  { origen: "quilmes", destino: "ctp_bue", hub: "amba", nombre: "Quilmes ➔ CTP BUE", distancia: "26 km", color: "#6366F1" },
  { origen: "moreno", destino: "ctp_bue", hub: "amba", nombre: "Moreno ➔ CTP BUE", distancia: "39 km", color: "#6366F1" }
];

// =============================================================
// LÍNEAS LTN Y LTC (Red Troncal de Larga Distancia)
// =============================================================
const lineasTroncalesData = [
  // ==========================================
  // LÍNEAS LTN (Cabecera CTP Monte Grande) - 23 Líneas
  // ==========================================
  { codigo: "LTN01", tipoRed: "LTN", unidad: "SEMI FURGON", km: 2606, origen: "ctp_bue", destinos: ["santiago_estero", "tucuman"], color: "#1D70B8" },
  { codigo: "LTN01 BIS", tipoRed: "LTN", unidad: "SEMI FURGON", km: 1499, origen: "ctp_bue", destinos: ["cordoba"], color: "#1D70B8" },
  { codigo: "LTN02", tipoRed: "LTN", unidad: "SEMI FURGON", km: 2088, origen: "ctp_bue", destinos: ["resistencia", "corrientes"], color: "#1D70B8" },
  { codigo: "LTN02 BIS", tipoRed: "LTN", unidad: "SEMI FURGON", km: 1118, origen: "ctp_bue", destinos: ["santa_fe", "parana"], color: "#1D70B8" },
  { codigo: "LTN03", tipoRed: "LTN", unidad: "SEMI FURGON", km: 2106, origen: "ctp_bue", destinos: ["mendoza"], color: "#1D70B8" },
  { codigo: "LTN04", tipoRed: "LTN", unidad: "12TN", km: 667, origen: "ctp_bue", destinos: ["mercedes", "pergamino"], color: "#1D70B8" },
  { codigo: "LTN04 BIS", tipoRed: "LTN", unidad: "12TN", km: 782, origen: "ctp_bue", destinos: ["mercedes", "pehuajo"], color: "#1D70B8" },
  { codigo: "LTN05", tipoRed: "LTN", unidad: "SEMI FURGON", km: 3409, origen: "ctp_bue", destinos: ["trelew", "comodoro_rivadavia"], color: "#1D70B8" },
  { codigo: "LTN06", tipoRed: "LTN", unidad: "SEMI FURGON", km: 877, origen: "ctp_bue", destinos: ["mar_del_plata"], color: "#1D70B8" },
  { codigo: "LTN07", tipoRed: "LTN", unidad: "SEMI FURGON", km: 2380, origen: "ctp_bue", destinos: ["neuquen"], color: "#1D70B8" },
  { codigo: "LTN08", tipoRed: "LTN", unidad: "SEMI FURGON", km: 180, origen: "ctp_bue", destinos: ["la_plata"], color: "#1D70B8" },
  { codigo: "LTN09", tipoRed: "LTN", unidad: "SEMI FURGON", km: 1238, origen: "ctp_bue", destinos: ["bahia_blanca"], color: "#1D70B8" },
  { codigo: "LTN10", tipoRed: "LTN", unidad: "12TN", km: 541, origen: "ctp_bue", destinos: ["pergamino"], color: "#1D70B8" },
  { codigo: "LTN11", tipoRed: "LTN", unidad: "SEMI FURGON", km: 652, origen: "ctp_bue", destinos: ["rosario"], color: "#1D70B8" },
  { codigo: "LTN12", tipoRed: "LTN", unidad: "SEMI FURGON", km: 4957, origen: "ctp_bue", destinos: ["rio_gallegos"], color: "#1D70B8" },
  { codigo: "LTN13", tipoRed: "LTN", unidad: "SEMI FURGON", km: 2425, origen: "ctp_bue", destinos: ["cordoba", "la_rioja"], color: "#1D70B8" },
  { codigo: "LTN14", tipoRed: "LTN", unidad: "SEMI FURGON", km: 1247, origen: "ctp_bue", destinos: ["santa_rosa"], color: "#1D70B8" },
  { codigo: "LTN15", tipoRed: "LTN", unidad: "SEMI FURGON", km: 2299, origen: "ctp_bue", destinos: ["corrientes", "posadas"], color: "#1D70B8" },
  { codigo: "LTN16", tipoRed: "LTN", unidad: "SEMI FURGON", km: 1744, origen: "ctp_bue", destinos: ["rio_cuarto", "san_luis"], color: "#1D70B8" },
  { codigo: "LTN17", tipoRed: "LTN", unidad: "SEMI FURGON", km: 3354, origen: "ctp_bue", destinos: ["salta", "jujuy"], color: "#1D70B8" },
  { codigo: "LTN18", tipoRed: "LTN", unidad: "SEMI FURGON", km: 3145, origen: "ctp_bue", destinos: ["neuquen", "bariloche"], color: "#1D70B8" },
  { codigo: "LTN20", tipoRed: "LTN", unidad: "SEMI FURGON", km: 1074, origen: "ctp_bue", destinos: ["parana"], color: "#1D70B8" },
  { codigo: "LTN21", tipoRed: "LTN", unidad: "SEMI FURGON", km: 1499, origen: "ctp_bue", destinos: ["villa_maria", "cordoba"], color: "#1D70B8" },

  // ==========================================
  // LÍNEAS LTC (Transversales / Interurbanas) - 5 Líneas
  // ==========================================
  { codigo: "LTC03", tipoRed: "LTC", unidad: "SEMI FURGON", km: 2164, origen: "rosario", destinos: ["santa_fe", "resistencia", "corrientes", "posadas"], color: "#E67E22" },
  { codigo: "LTC04", tipoRed: "LTC", unidad: "SEMI FURGON", km: 1222, origen: "cordoba", destinos: ["santiago_estero", "tucuman"], color: "#E67E22" },
  { codigo: "LTC12", tipoRed: "LTC", unidad: "SEMI FURGON", km: 759, origen: "tucuman", destinos: ["salta", "jujuy"], color: "#E67E22" },
  { codigo: "LTC13", tipoRed: "LTC", unidad: "SEMI FURGON", km: 900, origen: "rosario", destinos: ["cordoba"], color: "#E67E22" },
  { codigo: "LTC14", tipoRed: "LTC", unidad: "SEMI FURGON", km: 1050, origen: "cordoba", destinos: ["rio_cuarto", "bahia_blanca"], color: "#E67E22" }
];

// =============================================================
// 2. ESTADO GLOBAL Y CONFIGURACIÓN MAPA LEAFLET
// =============================================================
let leafletMap = null;
let geojsonLayer = null;
let mascaraExteriorLayer = null;
let rutasLayerGroup = null;
let markersLayerGroup = null;
let filtroHubActivo = "todos";
let subfiltroLTN = "todas";
let lineaLTNDestacada = null;
let nodoSeleccionado = null;

// Bounding box inicial para Argentina continental
const BND_ARGENTINA = [
  [-55.1, -73.6],
  [-21.8, -53.6]
];

// Bounding box para AMBA
const BND_AMBA = [
  [-34.88, -58.88],
  [-34.45, -58.20]
];

function buscarNodoPorId(id) {
  return nodosData.find(n => n.id === id) || nodosMetropolitanos.find(n => n.id === id) || null;
}

// =============================================================
// 3. INICIALIZACIÓN DEL MAPA LEAFLET
// =============================================================
document.addEventListener("DOMContentLoaded", () => {
  inicializarMapaLeaflet();
  configurarBuscador();
});

function inicializarMapaLeaflet() {
  const container = document.getElementById("mapa-leaflet");
  if (!container) return;

  leafletMap = L.map("mapa-leaflet", {
    zoomControl: false,
    attributionControl: true,
    minZoom: 3.5,
    maxZoom: 19,
    bounceAtZoomLimits: true,
    maxBounds: [
      [-56.8, -75.5],
      [-21.2, -52.0]
    ],
    maxBoundsViscosity: 0.95
  });

  // Crear paneles z-index dedicados
  leafletMap.createPane("mascaraPane");
  leafletMap.getPane("mascaraPane").style.zIndex = 350;
  leafletMap.getPane("mascaraPane").style.pointerEvents = "none";

  leafletMap.createPane("provinciasPane");
  leafletMap.getPane("provinciasPane").style.zIndex = 380;

  leafletMap.createPane("rutasPane");
  leafletMap.getPane("rutasPane").style.zIndex = 410;

  leafletMap.createPane("markersPane");
  leafletMap.getPane("markersPane").style.zIndex = 460;

  // Capa Base: CartoDB Positron
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png?key=cb1_47km_1_a9a7e15ee94d196eec40bf56", {
    maxZoom: 19,
    subdomains: "abcd",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>'
  }).addTo(leafletMap);

  rutasLayerGroup = L.layerGroup().addTo(leafletMap);
  markersLayerGroup = L.layerGroup().addTo(leafletMap);

  // Cargar máscara exterior y provincias
  cargarCapaProvincias();

  // Renderizar rutas y marcadores
  renderizarTodo();

  // Ajustar encuadre de forma segura tras asegurar el renderizado
  setTimeout(() => {
    if (leafletMap) {
      leafletMap.invalidateSize();
      leafletMap.fitBounds(BND_ARGENTINA, { padding: [12, 12] });
    }
  }, 100);

  setTimeout(() => {
    if (leafletMap) {
      leafletMap.invalidateSize();
      leafletMap.fitBounds(BND_ARGENTINA, { padding: [12, 12] });
    }
  }, 350);

  // Click en mapa vacío deselecciona
  leafletMap.on("click", (e) => {
    if (!e.originalEvent || !e.originalEvent._markerClick) {
      deseleccionarNodo();
    }
  });

  window.addEventListener("resize", () => {
    if (leafletMap) leafletMap.invalidateSize();
  });
}

// =============================================================
// 4. MÁSCARA EXTERIOR Y PROVINCIAS
// =============================================================
function cargarCapaProvincias() {
  const geojson = (typeof GEOJSON_ARGENTINA !== "undefined" && GEOJSON_ARGENTINA) ? GEOJSON_ARGENTINA : null;

  if (geojson) {
    aplicarMascaraYProvincias(geojson);
  } else {
    fetch("provincias.geojson")
      .then(r => r.json())
      .then(data => aplicarMascaraYProvincias(data))
      .catch(err => console.warn("No se cargó provincias.geojson:", err));
  }
}

function aplicarMascaraYProvincias(geojson) {
  crearMascaraExterior(geojson);
  dibujarProvincias(geojson);
}

function crearMascaraExterior(geojson) {
  if (mascaraExteriorLayer && leafletMap) {
    leafletMap.removeLayer(mascaraExteriorLayer);
  }

  const worldOuter = [
    [-85.0511, -180],
    [85.0511, -180],
    [85.0511, 180],
    [-85.0511, 180],
    [-85.0511, -180]
  ];

  const huecos = [];
  geojson.features.forEach(f => {
    if (!f.geometry || !f.geometry.coordinates) return;
    if (f.geometry.type === "Polygon") {
      const ring = f.geometry.coordinates[0].map(pt => [pt[1], pt[0]]);
      huecos.push(ring);
    } else if (f.geometry.type === "MultiPolygon") {
      f.geometry.coordinates.forEach(poly => {
        const ring = poly[0].map(pt => [pt[1], pt[0]]);
        huecos.push(ring);
      });
    }
  });

  mascaraExteriorLayer = L.polygon([worldOuter, ...huecos], {
    pane: "mascaraPane",
    fillColor: "#d0dcea",
    fillOpacity: 1.0,
    stroke: true,
    color: "#8ca8cb",
    weight: 1.5,
    interactive: false
  }).addTo(leafletMap);
}

function dibujarProvincias(geojson) {
  if (geojsonLayer && leafletMap) {
    leafletMap.removeLayer(geojsonLayer);
  }

  geojsonLayer = L.geoJSON(geojson, {
    pane: "provinciasPane",
    style: {
      fillColor: "#002554",
      fillOpacity: 0.03,
      color: "#6b8eb6",
      weight: 1.2,
      opacity: 0.65
    },
    onEachFeature: (feature, layer) => {
      const nombre = feature.properties.name || feature.properties.nombre || "";
      layer.on({
        mouseover: (e) => {
          const l = e.target;
          l.setStyle({
            fillColor: "#002554",
            fillOpacity: 0.08,
            color: "#FFD200",
            weight: 2.0,
            opacity: 1.0
          });
          if (nombre) {
            l.bindTooltip(`<strong>${nombre}</strong>`, {
              sticky: true,
              direction: "top",
              className: "tooltip-provincia"
            }).openTooltip();
          }
        },
        mouseout: (e) => {
          if (geojsonLayer) geojsonLayer.resetStyle(e.target);
        }
      });
    }
  }).addTo(leafletMap);
}

// =============================================================
// 5. CÁLCULO DE CURVAS BÉZIER PARA FLUJOS LOGÍSTICOS
// =============================================================
function generarPuntosCurva(p1, p2, curvatura = 0.12, numPuntos = 24) {
  const [lat1, lng1] = p1;
  const [lat2, lng2] = p2;

  const midLat = (lat1 + lat2) / 2;
  const midLng = (lng1 + lng2) / 2;

  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;

  const ctrlLat = midLat - dLng * curvatura;
  const ctrlLng = midLng + dLat * curvatura;

  const puntos = [];
  for (let i = 0; i <= numPuntos; i++) {
    const t = i / numPuntos;
    const invT = 1 - t;
    const lat = invT * invT * lat1 + 2 * invT * t * ctrlLat + t * t * lat2;
    const lng = invT * invT * lng1 + 2 * invT * t * ctrlLng + t * t * lng2;
    puntos.push([lat, lng]);
  }
  return puntos;
}

// =============================================================
// 6. RENDERIZADO DE RUTAS Y MARCADORES
// =============================================================
function renderizarTodo() {
  if (!leafletMap) return;
  rutasLayerGroup.clearLayers();
  markersLayerGroup.clearLayers();

  const esModoAMBA = (filtroHubActivo === "amba");
  const esModoLTN = (filtroHubActivo === "ltn");
  
  const bannerAMBA = document.getElementById("banner-modo-amba");
  const bannerLTN = document.getElementById("banner-modo-ltn");
  const leyFilaAMBA = document.getElementById("ley-fila-amba");
  const leyFilaLTN = document.getElementById("ley-fila-ltn");
  const leyFilaLTC = document.getElementById("ley-fila-ltc");
  const badgeTotal = document.getElementById("badge-total-rutas");

  if (bannerAMBA) bannerAMBA.style.display = esModoAMBA ? "flex" : "none";
  if (bannerLTN) bannerLTN.style.display = esModoLTN ? "flex" : "none";
  if (leyFilaAMBA) leyFilaAMBA.style.display = esModoAMBA ? "flex" : "none";
  if (leyFilaLTN) leyFilaLTN.style.display = esModoLTN ? "flex" : "none";
  if (leyFilaLTC) leyFilaLTC.style.display = esModoLTN ? "flex" : "none";

  if (esModoLTN) {
    let lineasAMostrar = lineasTroncalesData;
    if (subfiltroLTN === "LTN") {
      lineasAMostrar = lineasTroncalesData.filter(l => l.tipoRed === "LTN");
    } else if (subfiltroLTN === "LTC") {
      lineasAMostrar = lineasTroncalesData.filter(l => l.tipoRed === "LTC");
    }

    if (badgeTotal) badgeTotal.textContent = `${lineasAMostrar.length} Líneas ${subfiltroLTN !== 'todas' ? subfiltroLTN : 'Troncales'}`;

    // Subfiltros visuales en banner
    document.querySelectorAll(".btn-subfiltro-ltn").forEach(btn => {
      const id = btn.id;
      btn.classList.toggle("activa", 
        (id === "btn-sub-todas" && subfiltroLTN === "todas") ||
        (id === "btn-sub-ltn" && subfiltroLTN === "LTN") ||
        (id === "btn-sub-ltc" && subfiltroLTN === "LTC")
      );
    });

    const nodosParticipantesLTN = new Set();

    // 1. Dibujar Rutas de Líneas Troncales LTN y LTC
    lineasAMostrar.forEach((linea, lineIdx) => {
      const origNodo = buscarNodoPorId(linea.origen);
      if (!origNodo) return;

      nodosParticipantesLTN.add(linea.origen);

      const waypoints = [origNodo];
      linea.destinos.forEach(destId => {
        const destNodo = buscarNodoPorId(destId);
        if (destNodo) {
          waypoints.push(destNodo);
          nodosParticipantesLTN.add(destId);
        }
      });

      if (waypoints.length < 2) return;

      let puntosTotales = [];
      for (let i = 0; i < waypoints.length - 1; i++) {
        const p1 = [waypoints[i].lat, waypoints[i].lng];
        const p2 = [waypoints[i+1].lat, waypoints[i+1].lng];
        
        // Curvatura leve alternada según índice para separar trazas superpuestas
        const curv = ((lineIdx % 3 === 0 ? 0.07 : lineIdx % 3 === 1 ? -0.06 : 0.04) * (i % 2 === 0 ? 1 : -1));
        const segmento = generarPuntosCurva(p1, p2, curv, 22);

        if (puntosTotales.length === 0) {
          puntosTotales.push(...segmento);
        } else {
          puntosTotales.push(...segmento.slice(1));
        }
      }

      const colorLinea = (linea.tipoRed === "LTN") ? "#1D70B8" : "#E67E22";

      const polylineBase = L.polyline(puntosTotales, {
        pane: "rutasPane",
        color: colorLinea,
        weight: 2.3,
        opacity: 0.85,
        lineCap: "round",
        lineJoin: "round"
      });

      const polylineDash = L.polyline(puntosTotales, {
        pane: "rutasPane",
        color: "#ffffff",
        weight: 1.2,
        opacity: 0.70,
        className: "ruta-flow-dash",
        lineCap: "round"
      });

      const destinosStr = waypoints.slice(1).map(w => w.nombreCompleto || w.nombre).join(" ➔ ");
      const tooltipText = `
        <div class="popup-route-title" style="color:${colorLinea}; font-size:12.5px; font-weight:800;">
          LÍNEA ${linea.codigo} (${linea.tipoRed}) — ${linea.unidad}
        </div>
        <div class="popup-route-sub" style="font-weight:600; color:#002554; margin-top:2px;">
          📍 Origen: <strong>${origNodo.nombreCompleto || origNodo.nombre}</strong><br>
          ➔ Destinos: <strong>${destinosStr}</strong>
        </div>
        ${linea.km ? `<div style="font-size:11px; font-weight:800; color:${colorLinea}; margin-top:4px;">Distancia de itinerario: ${linea.km.toLocaleString()} km</div>` : ''}
      `;

      polylineBase.bindTooltip(tooltipText, { sticky: true, className: "tooltip-ruta" });
      polylineDash.bindTooltip(tooltipText, { sticky: true, className: "tooltip-ruta" });

      const clickAction = (e) => {
        L.DomEvent.stopPropagation(e);
        abrirModalDetalle(origNodo);
      };

      const hoverAction = (hover) => {
        polylineBase.setStyle({
          weight: hover ? 4.2 : 2.3,
          color: hover ? "#FFD200" : colorLinea,
          opacity: hover ? 1.0 : 0.85
        });
      };

      polylineBase.on("mouseover", () => hoverAction(true));
      polylineBase.on("mouseout", () => hoverAction(false));
      polylineDash.on("mouseover", () => hoverAction(true));
      polylineDash.on("mouseout", () => hoverAction(false));

      polylineBase.on("click", clickAction);
      polylineDash.on("click", clickAction);

      rutasLayerGroup.addLayer(polylineBase);
      rutasLayerGroup.addLayer(polylineDash);
    });

    // 2. Dibujar Marcadores
    nodosData.forEach(n => {
      if (!n.lat || !n.lng) return;

      const esParticipante = nodosParticipantesLTN.has(n.id);
      const estaSel = (nodoSeleccionado?.id === n.id);

      if (n.id === "ctp_bue") {
        const hubIcon = L.divIcon({
          className: "leaflet-hub-icon",
          iconSize: [0, 0],
          iconAnchor: [0, 0],
          html: `
            <div class="custom-hub-marker hub-bue">
              <div class="hub-pulse" style="background-color: rgba(29, 112, 184, 0.40);"></div>
              <div class="hub-icon-inner" style="background:#002554; border-color:#1D70B8; color:#1D70B8;">★</div>
              <div class="hub-label-pill" style="border-color:#1D70B8;">
                <span class="hub-title">${n.nombre}</span>
                <span class="hub-tag" style="background:#1D70B8; color:#ffffff; font-weight:800;">Cabecera LTN</span>
              </div>
            </div>
          `
        });

        const marker = L.marker([n.lat, n.lng], {
          pane: "markersPane",
          icon: hubIcon,
          title: "CTP Monte Grande — Cabecera Líneas LTN"
        });

        marker.on("click", (e) => {
          if (e.originalEvent) e.originalEvent._markerClick = true;
          abrirModalDetalle(n);
        });

        markersLayerGroup.addLayer(marker);
      } else {
        const destKey = esParticipante ? "ltn" : "bue";
        const clogIcon = L.divIcon({
          className: "leaflet-clog-icon",
          iconSize: [0, 0],
          iconAnchor: [0, 0],
          html: `
            <div class="clog-marker-wrap dest-${destKey} ${estaSel ? 'seleccionado' : ''}" data-id="${n.id}" style="${!esParticipante ? 'opacity: 0.4;' : ''}">
              <div class="clog-marker-dot" style="${esParticipante ? 'background-color: #1D70B8;' : ''}"></div>
              <div class="clog-marker-pill" style="${esParticipante ? 'border-left-color: #1D70B8;' : ''}">
                <span class="pill-name">${n.nombre}</span>
              </div>
            </div>
          `
        });

        const marker = L.marker([n.lat, n.lng], {
          pane: "markersPane",
          icon: clogIcon,
          title: n.nombreCompleto
        });

        marker.on("click", (e) => {
          if (e.originalEvent) e.originalEvent._markerClick = true;
          abrirModalDetalle(n);
        });

        markersLayerGroup.addLayer(marker);
      }
    });

    return;
  }

  // --- MODO FLUJOS A SORTERS TRADICIONAL ---
  let rutasActuales = [];
  let nodosAMostrar = [];

  if (esModoAMBA) {
    rutasActuales = rutasMetropolitanas;
    nodosAMostrar = [...nodosMetropolitanos, buscarNodoPorId("ctp_bue")];
    if (badgeTotal) badgeTotal.textContent = "5 Rutas AMBA";
  } else {
    if (filtroHubActivo === "todos") {
      rutasActuales = rutasExcel;
      nodosAMostrar = nodosData;
      if (badgeTotal) badgeTotal.textContent = "29 Rutas";
    } else {
      rutasActuales = rutasExcel.filter(r => r.hub === filtroHubActivo);
      const idsParticipantes = new Set();
      rutasActuales.forEach(r => {
        idsParticipantes.add(r.origen);
        idsParticipantes.add(r.destino);
      });
      nodosAMostrar = nodosData.filter(n => idsParticipantes.has(n.id) || n.esHub);
      if (badgeTotal) badgeTotal.textContent = `${rutasActuales.length} Rutas`;
    }
  }

  // 1. Dibujar Rutas Sorter
  rutasActuales.forEach(r => {
    const origen = buscarNodoPorId(r.origen);
    const destino = buscarNodoPorId(r.destino);
    if (!origen || !destino) return;

    const p1 = [origen.lat, origen.lng];
    const p2 = [destino.lat, destino.lng];

    const factorCurva = (r.hub === "cordoba") ? 0.10 : (r.hub === "santa_fe") ? -0.12 : 0.08;
    const puntosCurva = generarPuntosCurva(p1, p2, factorCurva, 24);

    const polylineBase = L.polyline(puntosCurva, {
      pane: "rutasPane",
      color: r.color || "#0066FF",
      weight: esModoAMBA ? 4.0 : 3.0,
      opacity: 0.85,
      lineCap: "round",
      lineJoin: "round"
    });

    const polylineDash = L.polyline(puntosCurva, {
      pane: "rutasPane",
      color: "#ffffff",
      weight: esModoAMBA ? 2.2 : 1.6,
      opacity: 0.9,
      className: "ruta-flow-dash",
      lineCap: "round"
    });

    const tooltipText = `
      <div class="popup-route-title">${r.nombre}</div>
      <div class="popup-route-sub">${origen.nombre} ➔ ${destino.nombreCompleto || destino.nombre}</div>
      ${r.distancia ? `<div style="font-size:10.5px; font-weight:700; color:#4338ca; margin-top:2px;">Distancia aprox: ${r.distancia}</div>` : ''}
    `;

    polylineBase.bindTooltip(tooltipText, { sticky: true, className: "tooltip-ruta" });
    polylineDash.bindTooltip(tooltipText, { sticky: true, className: "tooltip-ruta" });

    const resaltarRuta = (hover) => {
      polylineBase.setStyle({
        weight: hover ? 5.0 : (esModoAMBA ? 4.0 : 3.0),
        color: hover ? "#FFD200" : (r.color || "#0066FF"),
        opacity: hover ? 1.0 : 0.85
      });
    };

    polylineBase.on("mouseover", () => resaltarRuta(true));
    polylineBase.on("mouseout", () => resaltarRuta(false));
    polylineDash.on("mouseover", () => resaltarRuta(true));
    polylineDash.on("mouseout", () => resaltarRuta(false));

    polylineBase.on("click", (e) => {
      L.DomEvent.stopPropagation(e);
      abrirModalDetalle(origen);
    });
    polylineDash.on("click", (e) => {
      L.DomEvent.stopPropagation(e);
      abrirModalDetalle(origen);
    });

    rutasLayerGroup.addLayer(polylineBase);
    rutasLayerGroup.addLayer(polylineDash);
  });

  // 2. Dibujar Marcadores de Nodos
  nodosAMostrar.forEach(n => {
    if (!n.lat || !n.lng) return;

    if (n.esHub) {
      const hubIcon = L.divIcon({
        className: "leaflet-hub-icon",
        iconSize: [0, 0],
        iconAnchor: [0, 0],
        html: `
          <div class="custom-hub-marker hub-${n.hubKey || 'bue'}">
            <div class="hub-pulse"></div>
            <div class="hub-icon-inner">★</div>
            <div class="hub-label-pill">
              <span class="hub-title">${n.nombre}</span>
              <span class="hub-tag">Sorter</span>
            </div>
          </div>
        `
      });

      const marker = L.marker([n.lat, n.lng], {
        pane: "markersPane",
        icon: hubIcon,
        title: n.nombreCompleto
      });

      marker.on("click", (e) => {
        if (e.originalEvent) e.originalEvent._markerClick = true;
        abrirModalDetalle(n);
      });

      markersLayerGroup.addLayer(marker);

    } else {
      let destKey = "bue";
      const rutaNodo = (esModoAMBA ? rutasMetropolitanas : rutasExcel).find(r => r.origen === n.id);
      if (rutaNodo) destKey = rutaNodo.hub;

      const estaSel = (nodoSeleccionado?.id === n.id);

      const clogIcon = L.divIcon({
        className: "leaflet-clog-icon",
        iconSize: [0, 0],
        iconAnchor: [0, 0],
        html: `
          <div class="clog-marker-wrap dest-${destKey} ${estaSel ? 'seleccionado' : ''}" data-id="${n.id}">
            <div class="clog-marker-dot"></div>
            <div class="clog-marker-pill">
              <span class="pill-name">${n.nombre}</span>
            </div>
          </div>
        `
      });

      const marker = L.marker([n.lat, n.lng], {
        pane: "markersPane",
        icon: clogIcon,
        title: n.nombreCompleto
      });

      marker.on("click", (e) => {
        if (e.originalEvent) e.originalEvent._markerClick = true;
        abrirModalDetalle(n);
      });

      markersLayerGroup.addLayer(marker);
    }
  });
}

// =============================================================
// 7. FILTRADO POR HUB Y TRANSICIONES DE CÁMARA
// =============================================================
function filtrarRutasHub(hubKey) {
  filtroHubActivo = hubKey;

  document.querySelectorAll(".btn-filtro-ruta").forEach(btn => {
    btn.classList.toggle("activa", btn.getAttribute("data-hub") === hubKey);
  });

  const hintTexto = document.getElementById("mapa-hint-texto");
  if (hintTexto) {
    hintTexto.textContent = "Rutas de derivación de mercadería hacia Sorters de Correo Argentino • Hacé click en cualquier nodo para ver sus detalles";
  }

  renderizarTodo();

  if (hubKey === "amba") {
    leafletMap.flyToBounds(BND_AMBA, { duration: 1.0, padding: [25, 25] });
  } else if (hubKey === "cordoba") {
    leafletMap.flyToBounds([[-35.0, -69.5], [-23.5, -61.0]], { duration: 1.0, padding: [20, 20] });
  } else if (hubKey === "santa_fe") {
    leafletMap.flyToBounds([[-34.0, -62.5], [-26.0, -54.5]], { duration: 1.0, padding: [20, 20] });
  } else if (hubKey === "bue") {
    leafletMap.flyToBounds([[-55.5, -73.0], [-33.5, -56.5]], { duration: 1.1, padding: [20, 20] });
  } else {
    leafletMap.flyToBounds(BND_ARGENTINA, { duration: 1.1, padding: [12, 12] });
  }
}

// =============================================================
// ACTIVACIÓN DE MODO LÍNEAS LTN / LTC (DOBLE CLICK)
// =============================================================
function activarModoLTN() {
  filtroHubActivo = "ltn";
  subfiltroLTN = "todas";

  document.querySelectorAll(".btn-filtro-ruta").forEach(btn => {
    btn.classList.toggle("activa", btn.getAttribute("data-hub") === "ltn");
  });

  const hintTexto = document.getElementById("mapa-hint-texto");
  if (hintTexto) {
    hintTexto.textContent = "Red Troncal de Transporte • 23 Líneas LTN (Azul) y 5 Líneas LTC (Ámbar) • Hacé click en cualquier nodo";
  }

  renderizarTodo();

  if (leafletMap) {
    leafletMap.flyToBounds(BND_ARGENTINA, { duration: 1.2, padding: [15, 15] });
  }
}

function subfiltrarLineasTroncales(tipo) {
  subfiltroLTN = tipo;
  renderizarTodo();
}

let ltnClickTimer = null;
function manejarClickLTN(event) {
  if (filtroHubActivo !== "ltn") {
    if (ltnClickTimer) clearTimeout(ltnClickTimer);
    ltnClickTimer = setTimeout(() => {
      activarModoLTN();
    }, 280);
  }
}

// =============================================================
// 8. PANEL / MODAL DE DETALLES DE PLANTA
// =============================================================
let fotoActualIdx = 0;
let fotosGaleriaActual = [];

function abrirModalDetalle(nodo) {
  nodoSeleccionado = nodo;

  const backdrop = document.getElementById("modal-detalle-backdrop");
  const panel = document.getElementById("modal-detalle");
  if (!panel) return;

  const esModoLTN = (filtroHubActivo === "ltn");

  if (nodo.id === "ctp_bue" && esModoLTN) {
    // Tarjeta personalizada para CTP BUE en Modo Líneas LTN / LTC
    document.getElementById("modal-nodo-tipo").textContent = "Cabecera Troncal LTN";
    document.getElementById("modal-nodo-provincia").textContent = "Buenos Aires";
    document.getElementById("modal-nodo-nombre").textContent = "CTP BUE (Monte Grande)";
    document.getElementById("modal-nodo-sub").textContent = "Esteban Echeverría • Cabecera Nacional de Despacho de Líneas LTN";

    document.getElementById("modal-kpi-capacidad").textContent = "45.000 m²";
    document.getElementById("modal-kpi-piezas").textContent = "180.000 pzs/día";
    document.getElementById("modal-kpi-operatividad").textContent = "24 / 7";
    document.getElementById("modal-nodo-desc").textContent = "Centro de concentración y cabecera de la red de transporte de larga distancia. Despacha 23 líneas troncales terrestres (LTN) hacia los centros logísticos del interior del país.";

    const bloqueDestino = document.getElementById("modal-bloque-destino");
    const bloqueHubOrigenes = document.getElementById("modal-hub-origenes-box");

    if (bloqueDestino) {
      bloqueDestino.style.display = "block";
      bloqueDestino.style.backgroundColor = "#f0f7ff";
      bloqueDestino.style.borderColor = "#b9dcfa";
      document.getElementById("modal-destino-nombre").innerHTML = `<span style="color:#1D70B8;">23 Líneas LTN Despachadas</span>`;
      document.getElementById("modal-destino-info").innerHTML = `
        <div style="color:#002554; font-weight:600; margin-top:2px;">
          Unidades Semi Furgón y 12TN con itinerarios diarios a todo el país.
        </div>
      `;
    }

    if (bloqueHubOrigenes) {
      bloqueHubOrigenes.style.display = "block";
      document.getElementById("modal-hub-origenes-titulo").textContent = "Líneas LTN que parten de esta Cabecera (23)";
      const listContainer = document.getElementById("modal-hub-origenes-list");
      listContainer.innerHTML = "";

      const lineasLTN = lineasTroncalesData.filter(l => l.tipoRed === "LTN");
      lineasLTN.forEach(l => {
        const chip = document.createElement("button");
        chip.className = "chip-origen";
        chip.style.backgroundColor = "#e0f2fe";
        chip.style.borderColor = "#7dd3fc";
        chip.style.color = "#0369a1";
        chip.style.fontWeight = "700";
        chip.innerHTML = `<strong>${l.codigo}</strong> • ${l.destinos.map(d => buscarNodoPorId(d)?.nombre).join('➔')}`;
        chip.onclick = () => {
          subfiltrarLineasTroncales("LTN");
        };
        listContainer.appendChild(chip);
      });
    }

  } else {
    // Tarjetas estándar (todos los demás CLOGs quedan exactamente iguales)
    const bloqueDestino = document.getElementById("modal-bloque-destino");
    if (bloqueDestino) {
      bloqueDestino.style.backgroundColor = "#f0f7ff";
      bloqueDestino.style.borderColor = "#bfdbfe";
    }

    document.getElementById("modal-nodo-tipo").textContent = nodo.tipo || "CLOG";
    document.getElementById("modal-nodo-provincia").textContent = nodo.provincia || "Argentina";
    document.getElementById("modal-nodo-nombre").textContent = nodo.nombreCompleto || nodo.nombre;
    document.getElementById("modal-nodo-sub").textContent = nodo.localidad || `${nodo.provincia} • Red Oficial Correo Argentino`;

    document.getElementById("modal-kpi-capacidad").textContent = nodo.capacidad || "-- m²";
    document.getElementById("modal-kpi-piezas").textContent = nodo.piezasDia ? `${nodo.piezasDia} pzs/día` : "--";
    document.getElementById("modal-kpi-operatividad").textContent = nodo.operatividad || "24 / 7";
    document.getElementById("modal-nodo-desc").textContent = nodo.desc || "Planta operativa estratégica de la Red Nacional.";

    const bloqueHubOrigenes = document.getElementById("modal-hub-origenes-box");

    if (nodo.esHub) {
      if (bloqueDestino) bloqueDestino.style.display = "none";
      if (bloqueHubOrigenes) {
        bloqueHubOrigenes.style.display = "block";
        const rutasHaciaHub = rutasExcel.filter(r => r.destino === nodo.id);
        document.getElementById("modal-hub-origenes-titulo").textContent = `Plantas que derivan cargas a este Sorter (${rutasHaciaHub.length})`;
        
        const listContainer = document.getElementById("modal-hub-origenes-list");
        listContainer.innerHTML = "";
        rutasHaciaHub.forEach(r => {
          const origNodo = buscarNodoPorId(r.origen);
          if (origNodo) {
            const chip = document.createElement("button");
            chip.className = "chip-origen";
            chip.textContent = origNodo.nombre;
            chip.onclick = () => abrirModalDetalle(origNodo);
            listContainer.appendChild(chip);
          }
        });
      }
    } else {
      if (bloqueHubOrigenes) bloqueHubOrigenes.style.display = "none";
      if (bloqueDestino) {
        bloqueDestino.style.display = "block";
        const rutaAsignada = (filtroHubActivo === "amba" ? rutasMetropolitanas : rutasExcel).find(r => r.origen === nodo.id);
        if (rutaAsignada) {
          const destNodo = buscarNodoPorId(rutaAsignada.destino);
          document.getElementById("modal-destino-nombre").textContent = destNodo ? (destNodo.nombreCompleto || destNodo.nombre) : "Sorter Destino";
          document.getElementById("modal-destino-info").textContent = rutaAsignada.distancia ? `Distancia de tránsito: ${rutaAsignada.distancia}` : `Flujo troncal hacia ${rutaAsignada.hub.toUpperCase()}`;
        } else {
          document.getElementById("modal-destino-nombre").textContent = "CTP BUE (Monte Grande)";
          document.getElementById("modal-destino-info").textContent = "Flujo troncal nacional";
        }
      }
    }
  }

  fotosGaleriaActual = (Array.isArray(nodo.fotos) && nodo.fotos.length > 0) ? nodo.fotos : ["imagenes/placeholder.jpg"];
  fotoActualIdx = 0;
  renderizarGaleria();

  if (backdrop) backdrop.style.display = "block";
  panel.style.display = "flex";

  renderizarTodo();
}

function renderizarGaleria() {
  const container = document.getElementById("modal-galeria");
  const dotsContainer = document.getElementById("modal-galeria-dots");
  if (!container) return;

  const currentImgSrc = fotosGaleriaActual[fotoActualIdx] || "imagenes/placeholder.jpg";
  container.innerHTML = `<img src="${currentImgSrc}" class="modal-galeria-img" alt="Foto Planta" onerror="this.src='imagenes/placeholder.jpg';">`;

  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    if (fotosGaleriaActual.length > 1) {
      fotosGaleriaActual.forEach((_, idx) => {
        const dot = document.createElement("div");
        dot.className = `galeria-dot ${idx === fotoActualIdx ? 'activa' : ''}`;
        dot.onclick = () => {
          fotoActualIdx = idx;
          renderizarGaleria();
        };
        dotsContainer.appendChild(dot);
      });
    }
  }
}

function cerrarModalDetalle() {
  const backdrop = document.getElementById("modal-detalle-backdrop");
  const panel = document.getElementById("modal-detalle");
  if (backdrop) backdrop.style.display = "none";
  if (panel) panel.style.display = "none";
  deseleccionarNodo();
}

function deseleccionarNodo() {
  nodoSeleccionado = null;
  renderizarTodo();
}

// =============================================================
// 9. BUSCADOR GLOBAL CON AUTOCOMPLETADO
// =============================================================
function configurarBuscador() {
  const input = document.getElementById("global-search");
  const btnClear = document.getElementById("btn-clear-search");
  const dropdown = document.getElementById("search-results-dropdown");
  if (!input || !dropdown) return;

  input.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (btnClear) btnClear.style.display = q.length > 0 ? "block" : "none";

    if (q.length < 2) {
      dropdown.style.display = "none";
      return;
    }

    const todosLosNodos = [...nodosData, ...nodosMetropolitanos];
    const resultados = todosLosNodos.filter(n => {
      const nom = (n.nombre || "").toLowerCase();
      const nomC = (n.nombreCompleto || "").toLowerCase();
      const prov = (n.provincia || "").toLowerCase();
      return nom.includes(q) || nomC.includes(q) || prov.includes(q);
    });

    if (resultados.length === 0) {
      dropdown.innerHTML = `<div style="padding: 10px; font-size:11.5px; color:#64748b; text-align:center;">No se encontraron plantas.</div>`;
      dropdown.style.display = "block";
      return;
    }

    dropdown.innerHTML = "";
    resultados.forEach(n => {
      const item = document.createElement("div");
      item.className = "search-result-item";
      item.innerHTML = `
        <div>
          <div class="res-title">${n.nombreCompleto || n.nombre}</div>
          <div class="res-sub">${n.provincia}</div>
        </div>
        <span class="res-badge ${n.esHub ? 'badge-hub' : ''}">${n.esHub ? 'Sorter Hub' : (n.tipo || 'CLOG')}</span>
      `;
      item.onclick = () => {
        dropdown.style.display = "none";
        input.value = n.nombre;
        seleccionarDesdeBuscador(n);
      };
      dropdown.appendChild(item);
    });
    dropdown.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
}

function seleccionarDesdeBuscador(nodo) {
  if (!nodo || !leafletMap) return;

  if (nodo.esMetropolitano && filtroHubActivo !== "amba") {
    filtrarRutasHub("amba");
  } else if (!nodo.esMetropolitano && filtroHubActivo === "amba") {
    filtrarRutasHub("todos");
  }

  leafletMap.flyTo([nodo.lat, nodo.lng], Math.max(leafletMap.getZoom(), 8), {
    duration: 1.0
  });

  abrirModalDetalle(nodo);
}

function limpiarBuscador() {
  const input = document.getElementById("global-search");
  const btnClear = document.getElementById("btn-clear-search");
  const dropdown = document.getElementById("search-results-dropdown");
  if (input) input.value = "";
  if (btnClear) btnClear.style.display = "none";
  if (dropdown) dropdown.style.display = "none";
}

// =============================================================
// 10. CONTROLES DE ZOOM Y LEYENDA
// =============================================================
function zoomIn() {
  if (leafletMap) leafletMap.zoomIn();
}

function zoomOut() {
  if (leafletMap) leafletMap.zoomOut();
}

function zoomReset() {
  if (leafletMap) {
    if (filtroHubActivo === "amba") {
      leafletMap.flyToBounds(BND_AMBA, { duration: 1.0, padding: [25, 25] });
    } else {
      leafletMap.flyToBounds(BND_ARGENTINA, { duration: 1.0, padding: [12, 12] });
    }
  }
}

function toggleLeyenda() {
  const ley = document.getElementById("mapa-leyenda");
  if (ley) ley.classList.toggle("oculta");
}
