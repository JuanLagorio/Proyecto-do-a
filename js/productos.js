/* ════════════════════════════════════════════════════════════════
   DOÑA SOL · Configuración de la tienda
   ────────────────────────────────────────────────────────────────
   Todo lo que hay que tocar para mantener la tienda está acá:

   · whatsapp  → número que recibe los pedidos (598 + celular sin el 0).
   · precio    → cada tamaño tiene `precio: null`. Si ponés un número
                 (ej: precio: 450) la web muestra el precio, calcula
                 totales y los incluye en el mensaje de WhatsApp.
                 Con `null` se muestra "precio a confirmar".
   · productos → agregá, quitá o editá productos copiando un bloque.
                 `cat` tiene que ser una de las claves de `categorias`.
   · Opcionales por producto:
       cover: true  → la foto llena el recuadro (para fotos con fondo de color)
       zoom: 1.3    → agranda la foto dentro del recuadro
   ════════════════════════════════════════════════════════════════ */

window.DONASOL = {
  whatsapp: '59892747716',
  whatsappVisible: '092 747 716',
  telefonos: ['2418 3045', '2418 3003'],
  email: 'donasol@adinet.com.uy',
  direccion: 'Lauro Müller 2008, Montevideo',
  horario: 'Lunes a viernes de 8:00 a 17:00',
  moneda: '$',

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
      tamanos: [{ t: '5 L', precio: null }, { t: '10 L', precio: null }]
    },
    {
      id: 'multiuso-citrico', cat: 'limpieza', nombre: 'Multiuso Cítrico',
      img: 'img/productos/multiuso-citrico.png', zoom: 1.45,
      desc: 'Fragancia cítrica fresca y duradera, con acción desinfectante para una limpieza profunda.',
      tamanos: [{ t: '5 L', precio: null }, { t: '10 L', precio: null }]
    },
    {
      id: 'limpiador-liquido', cat: 'limpieza', nombre: 'Limpiador Desinfectante',
      img: 'img/productos/limpiador-liquido.jpg',
      desc: 'Limpiador líquido de alto poder desinfectante, en base a amonio cuaternario.',
      tamanos: [{ t: '5 L', precio: null }, { t: '10 L', precio: null }]
    },
    {
      id: 'limpiavidrios', cat: 'limpieza', nombre: 'Limpia Vidrios',
      img: 'img/productos/limpiavidrios.jpg',
      desc: 'Limpia y deja relucientes cristales y azulejos.',
      tamanos: [{ t: '2 L', precio: null }]
    },
    {
      id: 'lavandina', cat: 'limpieza', nombre: 'Lavandina',
      img: 'img/productos/lavandina.jpg',
      desc: 'Solución de hipoclorito mayor al 40 %. Blanqueadora y poderosamente desinfectante.',
      tamanos: [{ t: '10 L', precio: null }]
    },
    {
      id: 'cremoso', cat: 'limpieza', nombre: 'Limpiador Cremoso',
      img: 'img/productos/cremoso.jpg',
      desc: 'Limpia a fondo sin rayar. Industria uruguaya.',
      tamanos: [{ t: '750 g', precio: null }]
    },
    {
      id: 'desengrasante', cat: 'limpieza', nombre: 'Desengrasante',
      img: 'img/productos/desengrasante.jpg',
      desc: 'Remueve las suciedades y grasas más rebeldes. Para campanas, hornos y cocinas; también limpia motores.',
      tamanos: [{ t: '5 L', precio: null }]
    },
    {
      id: 'soda-caustica', cat: 'limpieza', nombre: 'Soda Cáustica Líquida',
      img: 'img/productos/soda-caustica.jpg',
      desc: 'Líquida 100 %. Elimina y remueve todo tipo de grasas y residuos orgánicos.',
      tamanos: [{ t: '5 L', precio: null }, { t: '10 L', precio: null }]
    },
    {
      id: 'cera', cat: 'limpieza', nombre: 'Cera al Agua',
      img: 'img/productos/cera.jpg',
      desc: 'Autobrillo semiacrílico, de secado rápido y aroma agradable.',
      tamanos: [{ t: '5 L', precio: null }]
    },
    {
      id: 'hipoclorito', cat: 'limpieza', nombre: 'Hipoclorito de Sodio',
      img: 'img/productos/hipoclorito.jpg',
      desc: 'Hipoclorito de sodio al 100 %, para uso en piscinas.',
      tamanos: [{ t: '10 L', precio: null }]
    },

    /* ── Ropa y vajilla ───────────────────────────────────── */
    {
      id: 'detergente', cat: 'lavado', nombre: 'Detergente Líquido',
      img: 'img/productos/detergente.jpg',
      desc: 'Detergente neutro, activo al 10 % o 12 %. Excelente para lavar platos y para muchos otros usos.',
      tamanos: [{ t: '10 L', precio: null }]
    },
    {
      id: 'jabon-lavarropas', cat: 'lavado', nombre: 'Jabón Lavarropas Dúo',
      img: 'img/productos/jabon-lavarropas.jpg',
      desc: 'Espuma controlada, con suavizante y blanqueador óptico. Ideal para cualquier tipo de lavado.',
      tamanos: [{ t: '5 L', precio: null }, { t: '10 L', precio: null }]
    },
    {
      id: 'suavizante', cat: 'lavado', nombre: 'Suavizante',
      img: 'img/productos/suavizante.jpg',
      desc: 'Suaviza, desinfecta y perfuma delicadamente la ropa.',
      tamanos: [{ t: '10 L', precio: null }]
    },

    /* ── Higiene ──────────────────────────────────────────── */
    {
      id: 'alcohol-gel', cat: 'higiene', nombre: 'Alcohol en Gel',
      img: 'img/productos/alcohol-gel.jpg',
      desc: 'Con dosificador, para tenerlo siempre a mano en casa, en el mostrador o en la oficina.',
      tamanos: [{ t: '1 L', precio: null }, { t: '5 L', precio: null }]
    },
    {
      id: 'alcohol', cat: 'higiene', nombre: 'Alcohol Líquido 70 %',
      img: 'img/productos/alcohol.jpg',
      desc: 'Alcohol líquido rectificado al 70 %.',
      tamanos: [{ t: '1 L', precio: null }, { t: '5 L', precio: null }, { t: '10 L', precio: null }]
    },
    {
      id: 'shampoo-manos', cat: 'higiene', nombre: 'Shampoo para Manos',
      img: 'img/productos/shampoo-manos.png', zoom: 1.45,
      desc: 'Limpia y desinfecta cuidando tus manos.',
      tamanos: [{ t: '5 L', precio: null }]
    },

    /* ── Aromas ───────────────────────────────────────────── */
    {
      id: 'desodorante', cat: 'aromas', nombre: 'Desodorante Bactericida',
      img: 'img/productos/desodorante.jpg',
      desc: 'Perfume delicioso y muy perdurable. Elimina el 99,9 % de las bacterias.',
      tamanos: [{ t: '10 L', precio: null }]
    },
    {
      id: 'esencia', cat: 'aromas', nombre: 'Esencia Desodorante',
      img: 'img/productos/esencia.jpg',
      desc: 'Exquisita fragancia de larga duración.',
      tamanos: [{ t: '2 L', precio: null }]
    },
    {
      id: 'perfumador', cat: 'aromas', nombre: 'Perfumador Textil',
      img: 'img/productos/perfumador.jpg',
      desc: 'Con atomizador. Para tapizados, tableros, cortinas, prendas y telas.',
      tamanos: [{ t: '½ L', precio: null }, { t: '1 L', precio: null }]
    },

    /* ── Autos ────────────────────────────────────────────── */
    {
      id: 'emulsion-neumaticos', cat: 'autos', nombre: 'Emulsión Neumáticos',
      img: 'img/productos/emulsion-neumaticos.png', zoom: 1.45,
      desc: 'Brillo profundo y duradero. Protege contra el desgaste y la decoloración. Fácil de aplicar y de secado rápido.',
      tamanos: [{ t: '5 L', precio: null }]
    },
    {
      id: 'emulsion-plasticos', cat: 'autos', nombre: 'Emulsión Plásticos',
      img: 'img/productos/emulsion-plasticos.png', zoom: 1.45,
      desc: 'Brillo profundo y duradero para tableros y plásticos. Protege contra el desgaste y la decoloración.',
      tamanos: [{ t: '5 L', precio: null }]
    },

    /* ── Textil ───────────────────────────────────────────── */
    {
      id: 'rejillas', cat: 'textil', nombre: 'Rejillas',
      img: 'img/productos/rejillas.jpg',
      desc: 'Grandes, de 40 × 40 cm. Puro algodón.',
      tamanos: [{ t: '6 u.', precio: null }]
    },
    {
      id: 'panos-piso', cat: 'textil', nombre: 'Paños de Piso',
      img: 'img/productos/panos-piso.jpg',
      desc: 'Extra grandes, de 70 × 65 cm. Puro algodón.',
      tamanos: [{ t: '6 u.', precio: null }, { t: '25 u.', precio: null }]
    },
    {
      id: 'franelas', cat: 'textil', nombre: 'Franelas',
      img: 'img/productos/franelas.jpg',
      desc: 'Grandes, de 40 × 40 cm.',
      tamanos: [{ t: '6 u.', precio: null }]
    },
    {
      id: 'guantes-negros', cat: 'textil', nombre: 'Guantes de Látex Negros',
      img: 'img/productos/guantes-negros.jpg', cover: true,
      desc: 'Ultra resistentes, para tareas pesadas. Excelente agarre en seco y mojado. Para industria, mantenimiento y construcción.',
      tamanos: [{ t: '10 pares', precio: null }]
    },
    {
      id: 'guantes-amarillos', cat: 'textil', nombre: 'Guantes de Látex Amarillos',
      img: 'img/productos/guantes-amarillos.jpg', cover: true,
      desc: 'Látex natural de alta resistencia, clorinados y sin talco. Textura rugosa para mejor agarre en industria alimenticia, química y mantenimiento.',
      tamanos: [{ t: '10 pares', precio: null }]
    },

    /* ── Papeles ──────────────────────────────────────────── */
    {
      id: 'jumbo-200', cat: 'papeles', nombre: 'Toalla Jumbo 200',
      img: 'img/productos/jumbo-200.jpg',
      desc: 'Toalla en rollo de alta absorción, para uso profesional e industrial.',
      tamanos: [{ t: 'Funda × 6 rollos', precio: null }]
    },
    {
      id: 'toalla-intercalada', cat: 'papeles', nombre: 'Toalla Intercalada 20 × 23',
      img: 'img/productos/toalla-intercalada.jpg',
      desc: 'Toalla interdoblada para dispensadores. Suave y de alta absorción.',
      tamanos: [{ t: 'Caja × 4.800', precio: null }]
    },
    {
      id: 'rollo-cocina', cat: 'papeles', nombre: 'Rollo de Cocina 200 Hojas',
      img: 'img/productos/rollo-cocina.webp',
      desc: 'Alta absorción para uso doméstico y gastronómico.',
      tamanos: [{ t: 'Funda × 12 rollos', precio: null }]
    },
    {
      id: 'servilleta-bocadillo', cat: 'papeles', nombre: 'Servilleta de Bocadillo',
      img: 'img/productos/servilleta-bocadillo.jpg',
      desc: 'Compacta, económica y práctica para snacks y bocadillos.',
      tamanos: [{ t: 'Caja × 6.000', precio: null }]
    },
    {
      id: 'servilleta-mesa-30', cat: 'papeles', nombre: 'Servilleta de Mesa 30 × 29,5',
      img: 'img/productos/servilleta-mesa-30.webp',
      desc: 'Servilleta grande, ideal para restaurantes y eventos.',
      tamanos: [{ t: '36 paq. × 50', precio: null }]
    },
    {
      id: 'servilleta-mesa-22', cat: 'papeles', nombre: 'Servilleta de Mesa 22 × 21',
      img: 'img/productos/servilleta-mesa-22.jpg',
      desc: 'Para el uso diario en restaurantes y hogares.',
      tamanos: [{ t: '72 paq. × 50', precio: null }]
    },
    {
      id: 'papel-higienico-dh', cat: 'papeles', nombre: 'Papel Higiénico Doble Hoja',
      img: 'img/productos/papel-higienico-dh.jpg',
      desc: 'Suave y resistente, para uso institucional y doméstico. Rollos de 30 m.',
      tamanos: [{ t: 'Funda × 64 rollos', precio: null }]
    },
    {
      id: 'papel-higienico-jumbo', cat: 'papeles', nombre: 'Papel Higiénico Jumbo 500',
      img: 'img/productos/papel-higienico-jumbo.png',
      desc: 'Rollo jumbo de 500 m para baños de alto tránsito.',
      tamanos: [{ t: 'Funda × 8 rollos', precio: null }]
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
