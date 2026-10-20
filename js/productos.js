/* ════════════════════════════════════════════════════════════════
   DOÑA SOL · Configuración de la tienda
   ────────────────────────────────────────────────────────────────
   Todo lo que hay que tocar para mantener la tienda está acá:

   · whatsapp  → número que recibe los pedidos (598 + celular sin el 0).
   · precios   → NO se editan acá: son los "Precios Base" del panel de
                 Do-aSol (admin.html). La web los lee solos al abrirse,
                 calcula totales y los incluye en el mensaje de WhatsApp.
                 Cada tamaño tiene su `clave`, el nombre con que figura
                 en ese panel. Sin precio base se muestra "Consultar".
   · productos → agregá, quitá o editá productos copiando un bloque.
                 `cat` tiene que ser una de las claves de `categorias`.
   · Opcionales por producto:
       cover: true  → la foto llena el recuadro (para fotos con fondo de color)
       zoom: 1.3    → agranda la foto dentro del recuadro
   · Fotos: al cambiar una foto, guardala con un nombre de archivo nuevo.
     Los navegadores guardan las imágenes 7 días y con el mismo nombre
     siguen mostrando la vieja.
   ════════════════════════════════════════════════════════════════ */

window.DONASOL = {
  whatsapp: '59892747716',
  whatsappVisible: '092 747 716',
  telefonos: ['2418 3045', '2418 3003'],
  email: 'donasol@adinet.com.uy',
  direccion: 'Lauro Müller 2008, Montevideo',
  horario: 'Lunes a viernes de 8:00 a 17:00',
  moneda: '$',

  /* Firebase del proyecto Do-aSol, donde están los precios base */
  firebase: {
    proyecto: 'donasol-9255f',
    apiKey: 'AIzaSyB7vslGtZ0p36LNiczI2UBgS5E3cByeQIw'
  },

  /* Métricas: Google Analytics (ID de medición G-…) y Microsoft Clarity
     (Project ID). Vacío = no se carga. Solo guardan cookies si la persona
     acepta el aviso de la página. */
  analitica: {
    google: 'G-TBQEDPNK3M',
    clarity: 'z0ciuqu50w'
  },

  categorias: {
    limpieza: 'Limpieza',
    lavado:   'Ropa y vajilla',
    higiene:  'Higiene',
    aromas:   'Aromas',
    autos:    'Autos',
    textil:   'Textil',
    papeles:  'Papeles'
  },

  lineas: {
    quimica: ['limpieza', 'lavado', 'higiene', 'aromas', 'autos'],
    textil:  ['textil'],
    papeles: ['papeles']
  },

  productos: [
    /* ── Limpieza ─────────────────────────────────────────── */
    {
      id: 'multiuso', cat: 'limpieza', nombre: 'Limpiador Multiuso',
      img: 'img/productos/multiuso.jpg',
      desc: 'Limpia, perfuma y desinfecta. Fragancia a manzana para pisos, paredes, azulejos, cerámicas y artefactos de baño.',
      tamanos: [{ t: '5 L', clave: 'multiuso_5L' }, { t: '10 L', clave: 'multiuso_10L' }]
    },
    {
      id: 'multiuso-citrico', cat: 'limpieza', nombre: 'Multiuso Cítrico',
      img: 'img/productos/multiuso-citrico.jpg', zoom: 1.45,
      desc: 'Fragancia cítrica fresca y duradera, con acción desinfectante para una limpieza profunda.',
      tamanos: [{ t: '5 L', clave: 'mulcit_5L' }, { t: '10 L', clave: 'mulcit_10L' }]
    },
    {
      id: 'limpiador-liquido', cat: 'limpieza', nombre: 'Limpiador Desinfectante',
      img: 'img/productos/limpiador-desinfectante.jpg',
      desc: 'Limpiador líquido de alto poder desinfectante, en base a amonio cuaternario.',
      tamanos: [{ t: '5 L', clave: 'desinfectante_5L' }, { t: '10 L', clave: 'desinfectante_10L' }]
    },
    {
      id: 'amonio-cuaternario', cat: 'limpieza', nombre: 'Amonio Cuaternario',
      img: 'img/productos/amonio-cuaternario.jpg',
      desc: 'Desinfectante de amplio espectro, sin olor agresivo. Apto para superficies en contacto con alimentos.',
      tamanos: [{ t: '5 L', clave: 'amonio-cuaternario' }]
    },
    {
      id: 'limpiavidrios', cat: 'limpieza', nombre: 'Limpia Vidrios',
      img: 'img/productos/limpiavidrios.jpg',
      desc: 'Limpia y deja relucientes cristales y azulejos.',
      tamanos: [{ t: '2 L', clave: 'limpiavidrios' }]
    },
    {
      id: 'lavandina', cat: 'limpieza', nombre: 'Lavandina',
      img: 'img/productos/lavandina.jpg',
      desc: 'Solución de hipoclorito mayor al 40 %. Blanqueadora y poderosamente desinfectante.',
      tamanos: [{ t: '10 L', clave: 'lavandina' }]
    },
    {
      id: 'cremoso', cat: 'limpieza', nombre: 'Limpiador Cremoso',
      img: 'img/productos/cremoso.jpg',
      desc: 'Limpia a fondo sin rayar. Industria uruguaya.',
      tamanos: [{ t: '750 g', clave: 'cremoso' }]
    },
    {
      id: 'desengrasante', cat: 'limpieza', nombre: 'Desengrasante',
      img: 'img/productos/desengrasante.jpg',
      desc: 'Remueve las suciedades y grasas más rebeldes. Para campanas, hornos y cocinas; también limpia motores.',
      tamanos: [{ t: '5 L', clave: 'desengrasante' }]
    },
    {
      id: 'soda-caustica', cat: 'limpieza', nombre: 'Soda Cáustica Líquida',
      img: 'img/productos/soda-caustica.jpg',
      desc: 'Líquida 100 %. Elimina y remueve todo tipo de grasas y residuos orgánicos.',
      tamanos: [{ t: '5 L', clave: 'soda-caustica_5L' }, { t: '10 L', clave: 'soda-caustica_10L' }]
    },
    {
      id: 'cera', cat: 'limpieza', nombre: 'Cera al Agua',
      img: 'img/productos/cera.jpg',
      desc: 'Autobrillo semiacrílico, de secado rápido y aroma agradable.',
      tamanos: [{ t: '5 L', clave: 'cera-pisos' }]
    },
    {
      id: 'hipoclorito', cat: 'limpieza', nombre: 'Hipoclorito de Sodio',
      img: 'img/productos/hipoclorito.jpg',
      desc: 'Hipoclorito de sodio al 100 %, para uso en piscinas.',
      tamanos: [{ t: '10 L', clave: 'hipoclorito' }]
    },
    {
      id: 'vinagre', cat: 'limpieza', nombre: 'Vinagre de Limpieza',
      img: 'img/productos/vinagre-recortado.jpg', zoom: 1.5,
      desc: 'Quita el sarro, desengrasa y elimina olores. Para baños, cocinas, vidrios y azulejos.',
      tamanos: [{ t: '5 L', clave: 'vinagre_5L' }, { t: '10 L', clave: 'vinagre_10L' }]
    },

    /* ── Ropa y vajilla ───────────────────────────────────── */
    {
      id: 'detergente', cat: 'lavado', nombre: 'Detergente Líquido',
      img: 'img/productos/detergente.jpg',
      desc: 'Detergente neutro, activo al 10 % o 12 %. Excelente para lavar platos y para muchos otros usos.',
      tamanos: [{ t: '10 L', clave: 'jabon-ropa' }]
    },
    {
      id: 'jabon-lavarropas', cat: 'lavado', nombre: 'Jabón Lavarropas Dúo',
      img: 'img/productos/jabon-lavarropas.jpg',
      desc: 'Espuma controlada, con suavizante y blanqueador óptico. Ideal para cualquier tipo de lavado.',
      tamanos: [{ t: '5 L', clave: 'ideal_5L' }, { t: '10 L', clave: 'ideal_10L' }]
    },
    {
      id: 'suavizante', cat: 'lavado', nombre: 'Suavizante',
      img: 'img/productos/suavizante-recortado.jpg', zoom: 1.55,
      desc: 'Suaviza, desinfecta y perfuma delicadamente la ropa.',
      tamanos: [{ t: '5 L', clave: 'suavizante' }, { t: '10 L', clave: 'suavizante_10L' }]
    },

    /* ── Higiene ──────────────────────────────────────────── */
    {
      id: 'alcohol-gel', cat: 'higiene', nombre: 'Alcohol en Gel',
      img: 'img/productos/alcohol-gel.jpg',
      desc: 'Con dosificador, para tenerlo siempre a mano en casa, en el mostrador o en la oficina.',
      tamanos: [{ t: '1 L', clave: 'alcohol-gel_1L' }, { t: '5 L', clave: 'alcohol-gel_5L' }]
    },
    {
      id: 'alcohol', cat: 'higiene', nombre: 'Alcohol Líquido 70 %',
      img: 'img/productos/alcohol.jpg',
      desc: 'Alcohol líquido rectificado al 70 %.',
      tamanos: [{ t: '1 L', clave: 'alcohol_1L' }, { t: '5 L', clave: 'alcohol_5L' }, { t: '10 L', clave: 'alcohol_10L' }]
    },
    {
      id: 'shampoo-manos', cat: 'higiene', nombre: 'Shampoo para Manos',
      img: 'img/productos/shampoo-manos-rojo.jpg', zoom: 1.45,
      desc: 'Limpia y desinfecta cuidando tus manos.',
      tamanos: [{ t: '5 L', clave: 'jabon-manos' }]
    },

    /* ── Aromas ───────────────────────────────────────────── */
    {
      id: 'desodorante', cat: 'aromas', nombre: 'Desodorante Bactericida',
      img: 'img/productos/desodorante.jpg',
      desc: 'Perfume delicioso y muy perdurable. Elimina el 99,9 % de las bacterias.',
      tamanos: [{ t: '10 L', clave: 'desodorante' }]
    },
    {
      id: 'esencia', cat: 'aromas', nombre: 'Esencia Desodorante',
      img: 'img/productos/esencia.jpg',
      desc: 'Exquisita fragancia de larga duración.',
      tamanos: [{ t: '2 L', clave: 'esencia' }]
    },
    {
      id: 'perfumador', cat: 'aromas', nombre: 'Perfumador Textil',
      img: 'img/productos/perfumador.jpg',
      desc: 'Con atomizador. Para tapizados, tableros, cortinas, prendas y telas.',
      tamanos: [{ t: '½ L', clave: 'perfumador_500ml' }, { t: '1 L', clave: 'perfumador_1L' }]
    },

    /* ── Autos ────────────────────────────────────────────── */
    {
      id: 'emulsion-neumaticos', cat: 'autos', nombre: 'Emulsión Neumáticos',
      img: 'img/productos/emulsion-neumaticos.jpg', zoom: 1.45,
      desc: 'Brillo profundo y duradero. Protege contra el desgaste y la decoloración. Fácil de aplicar y de secado rápido.',
      tamanos: [{ t: '5 L', clave: 'emulsion-neumaticos' }]
    },
    {
      id: 'emulsion-plasticos', cat: 'autos', nombre: 'Emulsión Plásticos',
      img: 'img/productos/emulsion-plasticos.jpg', zoom: 1.45,
      desc: 'Brillo profundo y duradero para tableros y plásticos. Protege contra el desgaste y la decoloración.',
      tamanos: [{ t: '5 L', clave: 'emulsion-plasticos' }]
    },

    /* ── Textil ───────────────────────────────────────────── */
    {
      id: 'rejillas', cat: 'textil', nombre: 'Rejillas',
      img: 'img/productos/rejillas.jpg',
      desc: 'Grandes, de 40 × 40 cm. Puro algodón.',
      tamanos: [{ t: '6 u.', clave: 'rejillas' }]
    },
    {
      id: 'panos-piso', cat: 'textil', nombre: 'Paños de Piso',
      img: 'img/productos/panos-piso.jpg',
      desc: 'Extra grandes, de 70 × 65 cm. Puro algodón.',
      tamanos: [{ t: '6 u.', clave: 'panos-de-piso_6u' }, { t: '25 u.', clave: 'panos-de-piso_25u' }]
    },
    {
      id: 'franelas', cat: 'textil', nombre: 'Franelas',
      img: 'img/productos/franelas.jpg',
      desc: 'Grandes, de 40 × 40 cm.',
      tamanos: [{ t: '6 u.', clave: 'franelas' }]
    },
    {
      id: 'microfibras', cat: 'textil', nombre: 'Microfibras',
      img: 'img/productos/microfibras.jpg',
      desc: 'Paños de microfibra de 40 × 40 cm. Atrapan el polvo y secan sin dejar pelusa ni marcas.',
      tamanos: [{ t: '5 u.', clave: 'microfibras' }]
    },
    {
      id: 'guantes-negros', cat: 'textil', nombre: 'Guantes de Látex Negros',
      img: 'img/productos/guantes-negros-latex.jpg', zoom: 1.05,
      desc: 'Ultra resistentes, para tareas pesadas. Excelente agarre en seco y mojado. Para industria, mantenimiento y construcción.',
      tamanos: [{ t: '10 pares', clave: 'guantes-negros' }]
    },
    {
      id: 'guantes-amarillos', cat: 'textil', nombre: 'Guantes de Látex Amarillos',
      img: 'img/productos/guantes-amarillos-latex.jpg', zoom: 1.05,
      desc: 'Látex natural de alta resistencia, clorinados y sin talco. Textura rugosa para mejor agarre en industria alimenticia, química y mantenimiento.',
      tamanos: [{ t: '10 pares', clave: 'guantes-amarillos' }]
    },

    /* ── Papeles ──────────────────────────────────────────── */
    {
      id: 'jumbo-200', cat: 'papeles', nombre: 'Toalla Jumbo 200',
      img: 'img/productos/jumbo-200.jpg',
      desc: 'Toalla en rollo de alta absorción, para uso profesional e industrial.',
      tamanos: [{ t: 'Funda × 6 rollos', clave: 'jumbo-200' }]
    },
    {
      id: 'toalla-intercalada', cat: 'papeles', nombre: 'Toalla Intercalada 20 × 23',
      img: 'img/productos/toalla-intercalada.jpg',
      desc: 'Toalla interdoblada para dispensadores. Suave y de alta absorción.',
      tamanos: [{ t: 'Caja × 4.800', clave: 'toalla-intercalada' }]
    },
    {
      id: 'rollo-cocina', cat: 'papeles', nombre: 'Rollo de Cocina 200 Hojas',
      img: 'img/productos/rollo-cocina.webp',
      desc: 'Alta absorción para uso doméstico y gastronómico.',
      tamanos: [{ t: 'Funda × 12 rollos', clave: 'rollo-cocina' }]
    },
    {
      id: 'servilleta-bocadillo', cat: 'papeles', nombre: 'Servilleta de Bocadillo',
      img: 'img/productos/servilleta-bocadillo.jpg',
      desc: 'Compacta, económica y práctica para snacks y bocadillos.',
      tamanos: [{ t: 'Caja × 6.000', clave: 'servilleta-bocadillo' }]
    },
    {
      id: 'servilleta-mesa-30', cat: 'papeles', nombre: 'Servilleta de Mesa 30 × 29,5',
      img: 'img/productos/servilleta-mesa-30.webp',
      desc: 'Servilleta grande, ideal para restaurantes y eventos.',
      tamanos: [{ t: '36 paq. × 50', clave: 'servilleta-mesa' }]
    },
    {
      id: 'servilleta-mesa-22', cat: 'papeles', nombre: 'Servilleta de Mesa 22 × 21',
      img: 'img/productos/servilleta-mesa-22.jpg',
      desc: 'Para el uso diario en restaurantes y hogares.',
      tamanos: [{ t: '72 paq. × 50', clave: 'servilleta-mesa-22x21' }]
    },
    {
      id: 'papel-higienico-dh', cat: 'papeles', nombre: 'Papel Higiénico Doble Hoja',
      img: 'img/productos/papel-higienico-dh.jpg',
      desc: 'Suave y resistente, para uso institucional y doméstico. Rollos de 30 m.',
      tamanos: [{ t: 'Funda × 64 rollos', clave: 'papel-higienico-dh' }]
    },
    {
      id: 'papel-higienico-jumbo', cat: 'papeles', nombre: 'Papel Higiénico Jumbo 500',
      img: 'img/productos/papel-higienico-jumbo.png',
      desc: 'Rollo jumbo de 500 m para baños de alto tránsito.',
      tamanos: [{ t: 'Funda × 8 rollos', clave: 'papel-higienico-jumbo' }]
    }
  ],

  /* Kits: combinaciones listas que se suman al carrito con un toque.
     Cada ítem es [id del producto, tamaño, cantidad]. */
  kits: [
    {
      id: 'casa', nombre: 'Casa Brillante', para: 'Para el hogar',
      desc: 'Lo básico para que la casa quede impecable de punta a punta.',
      items: [['multiuso', '5 L', 1], ['limpiavidrios', '2 L', 1], ['cremoso', '750 g', 1], ['rejillas', '6 u.', 1], ['panos-piso', '6 u.', 1]]
    },
    {
      id: 'cocina', nombre: 'Cocina Profesional', para: 'Para gastronomía',
      desc: 'Para restaurantes, rotiserías y cocinas que no paran nunca.',
      items: [['detergente', '10 L', 1], ['desengrasante', '5 L', 1], ['alcohol-gel', '5 L', 1], ['rollo-cocina', 'Funda × 12 rollos', 1], ['guantes-amarillos', '10 pares', 1]]
    },
    {
      id: 'autos', nombre: 'Lavadero de Autos', para: 'Para talleres y lavaderos',
      desc: 'Brillo, protección y buen aroma para cada vehículo que sale.',
      items: [['emulsion-neumaticos', '5 L', 1], ['emulsion-plasticos', '5 L', 1], ['desengrasante', '5 L', 1], ['franelas', '6 u.', 1], ['perfumador', '½ L', 1]]
    }
  ],

  /* Productos que giran en la portada */
  portada: ['multiuso', 'lavandina', 'limpiavidrios', 'cremoso', 'alcohol-gel', 'desengrasante']
};
