import { Product } from '../types/product';

export const mockProducts: Product[] = [
  // --- EMBALAGENS E DELIVERY ---
  {
    id: 'prod-m101',
    name: 'EMB M101 C/200 MEIWA',
    restaurant: 'Meiwa Embalagens',
    category: 'embalagens',
    description: 'Embalagem térmica de EPS articulada M101 Meiwa. Possui fechamento seguro e mantém alimentos aquecidos e protegidos durante a entrega delivery. Ideal para hambúrgueres, porções e marmitas.',
    basePrice: 84.90,
    rating: 4.9,
    reviewsCount: '1.4k',
    calories: 10056,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/09/produto-342-1016x1024.png',
    isBestSeller: true,
    isPopular: true,
    sizes: [
      { id: 'size-m101-cx', name: 'Caixa C/ 200 un', label: 'Cx 200un', price: 84.90, isDefault: true },
      { id: 'size-m101-fd', name: 'Fardo C/ 400 un (2 Cxs)', label: 'Fd 400un', price: 162.00 }
    ],
    ingredients: [
      { id: 'ing-m101-lacre', name: 'Lacre de Segurança Adesivo (C/ 200)', portion: '200 un', price: 12.00, isDefaultChecked: true, icon: 'tag' },
      { id: 'ing-m101-guard', name: 'Guardanapo Sachê Individual (C/ 200)', portion: '200 un', price: 9.50, isDefaultChecked: false, icon: 'paper' }
    ]
  },
  {
    id: 'prod-m102',
    name: 'EMB M102 C/100 MEIWA',
    restaurant: 'Meiwa Embalagens',
    category: 'embalagens',
    description: 'Embalagem retangular média M102 Meiwa em EPS articulada. Alta resistência e capacidade térmica para refeições quentes e grelhados com praticidade e higiene.',
    basePrice: 52.90,
    rating: 4.8,
    reviewsCount: '890',
    calories: 10054,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/09/produto-377-949x1024.png',
    isBestSeller: true,
    isPopular: true,
    sizes: [
      { id: 'size-m102-100', name: 'Caixa C/ 100 un', label: 'Cx 100un', price: 52.90, isDefault: true },
      { id: 'size-m102-300', name: 'Fardo C/ 300 un (3 Cxs)', label: 'Fd 300un', price: 149.00 }
    ],
    ingredients: [
      { id: 'ing-m102-etq', name: 'Etiquetas Térmicas de Identificação', portion: '100 un', price: 14.00, isDefaultChecked: false, icon: 'tag' }
    ]
  },
  {
    id: 'prod-m104',
    name: 'EMB M104 800ML C/100 MEIWA',
    restaurant: 'Meiwa Embalagens',
    category: 'embalagens',
    description: 'Embalagem funda de 800ml M104 Meiwa com tampa acoplada. Perfeita para refeições completas, pratos executivos, risotos e massas com molho para entrega sem vazamentos.',
    basePrice: 68.50,
    rating: 4.9,
    reviewsCount: '1.1k',
    calories: 10053,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-15573-1-1024x522.png',
    isBestSeller: false,
    isPopular: true,
    sizes: [
      { id: 'size-m104-100', name: 'Caixa C/ 100 un', label: 'Cx 100un', price: 68.50, isDefault: true },
      { id: 'size-m104-200', name: 'Caixa C/ 200 un', label: 'Cx 200un', price: 128.00 }
    ],
    ingredients: [
      { id: 'ing-m104-talher', name: 'Kit Talher Reforçado Garfo + Faca (C/ 100)', portion: '100 kits', price: 18.00, isDefaultChecked: false, icon: 'utensils' }
    ]
  },
  {
    id: 'prod-mc500',
    name: 'EMB MC500 TIGELA 500ML C/TP C/200 MEIWA',
    restaurant: 'Meiwa Embalagens',
    category: 'embalagens',
    description: 'Tigela térmica MC500 de 500ml com tampa hermética transparente Meiwa. Altamente indicada para sopas, caldos, açaí, saladas de frutas e sobremesas no delivery.',
    basePrice: 119.90,
    rating: 4.8,
    reviewsCount: '950',
    calories: 10041,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-6419-1-1024x998.png',
    isBestSeller: true,
    isPopular: true,
    sizes: [
      { id: 'size-mc500-200', name: 'Caixa C/ 200 un + Tampas', label: 'Cx 200un', price: 119.90, isDefault: true },
      { id: 'size-mc500-400', name: 'Caixa C/ 400 un + Tampas', label: 'Cx 400un', price: 225.00 }
    ],
    ingredients: [
      { id: 'ing-mc500-colher', name: 'Colher de Sobremesa Descartável (C/ 200)', portion: '200 un', price: 15.00, isDefaultChecked: true, icon: 'utensils' }
    ]
  },
  {
    id: 'prod-mei110a',
    name: 'EMB MEI110A 460ML S/FURO C/150 MEIWA',
    restaurant: 'Meiwa Embalagens',
    category: 'embalagens',
    description: 'Embalagem plástica cristalina MEI110A de 460ml sem furo com trava de pressão Meiwa. Proporciona visualização nítida para sobremesas, bolos no pote e saladas frias.',
    basePrice: 98.00,
    rating: 4.7,
    reviewsCount: '620',
    calories: 10036,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-12596-1-1024x608.png',
    isBestSeller: false,
    isPopular: false,
    sizes: [
      { id: 'size-mei110a-150', name: 'Caixa C/ 150 un', label: 'Cx 150un', price: 98.00, isDefault: true },
      { id: 'size-mei110a-300', name: 'Caixa C/ 300 un', label: 'Cx 300un', price: 186.00 }
    ],
    ingredients: [
      { id: 'ing-mei110-cinta', name: 'Cinta Adesiva Decorativa Kraft', portion: '150 un', price: 22.00, isDefaultChecked: false, icon: 'tag' }
    ]
  },
  {
    id: 'prod-mo600',
    name: 'EMB MO600 2900ML C/TP C/50 MEIWA',
    restaurant: 'Meiwa Embalagens',
    category: 'embalagens',
    description: 'Travessa térmica grande MO600 de 2.900ml com tampa Meiwa. Ideal para frango assado, feijoadas completas, churrascos e porções familiares de delivery.',
    basePrice: 142.00,
    rating: 4.9,
    reviewsCount: '780',
    calories: 10013,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-7189-1-1024x480.png',
    isBestSeller: true,
    isPopular: false,
    sizes: [
      { id: 'size-mo600-50', name: 'Caixa C/ 50 un + Tampas', label: 'Cx 50un', price: 142.00, isDefault: true },
      { id: 'size-mo600-100', name: 'Caixa C/ 100 un + Tampas', label: 'Cx 100un', price: 269.00 }
    ],
    ingredients: [
      { id: 'ing-mo600-sacola', name: 'Sacola Kraft Delivery Reforçada (C/ 50)', portion: '50 un', price: 35.00, isDefaultChecked: true, icon: 'package' }
    ]
  },
  {
    id: 'prod-mp15',
    name: 'EMB P/BOLO MP15 C/TP ALTA C/150 MEIWA',
    restaurant: 'Meiwa Embalagens',
    category: 'embalagens',
    description: 'Embalagem especial para bolo MP15 com tampa alta cristalina Meiwa. Valoriza a decoração de bolos, tortas e sobremesas finas até 1,5kg com encaixe perfeito.',
    basePrice: 138.50,
    rating: 4.9,
    reviewsCount: '1.2k',
    calories: 9958,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-12439-1-1024x793.png',
    isBestSeller: true,
    isPopular: true,
    sizes: [
      { id: 'size-mp15-150', name: 'Caixa C/ 150 un', label: 'Cx 150un', price: 138.50, isDefault: true },
      { id: 'size-mp15-300', name: 'Caixa C/ 300 un', label: 'Cx 300un', price: 260.00 }
    ],
    ingredients: [
      { id: 'ing-mp15-disco', name: 'Disco Laminado Ouro 24cm (C/ 100)', portion: '100 un', price: 42.00, isDefaultChecked: false, icon: 'sparkles' }
    ]
  },
  {
    id: 'prod-filme-pvc',
    name: 'FILME PELICULA PVC 38CMX1000M (10 MIC)',
    restaurant: 'Meiwa Embalagens',
    category: 'embalagens',
    description: 'Filme de PVC esticável profissional Meiwa 38cm x 1000m (10 micra). Alta aderência, memória elástica e brilho para selar bandejas de alimentos e frios.',
    basePrice: 79.90,
    rating: 4.8,
    reviewsCount: '2.1k',
    calories: 9901,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-12921-1.jpg',
    isBestSeller: false,
    isPopular: true,
    sizes: [
      { id: 'size-pvc-1rl', name: '1 Bobina (38cm x 1000m)', label: '1 Bobina', price: 79.90, isDefault: true },
      { id: 'size-pvc-cx', name: 'Caixa C/ 2 Bobinas', label: 'Cx 2 Bobinas', price: 149.00 }
    ],
    ingredients: [
      { id: 'ing-pvc-dispenser', name: 'Suporte Dispensador de Filme Inox', portion: '1 un', price: 89.00, isDefaultChecked: false, icon: 'settings' }
    ]
  },
  {
    id: 'prod-garrafa-500',
    name: 'GARRAFA TRANSP RED 500ML C/TP PT C/100',
    restaurant: 'Brago Distribuidora',
    category: 'descartaveis',
    description: 'Garrafa plástica redonda transparente de 500ml em PET virgem com tampa de rosca preta e anel de lacre inviolável. Ideal para sucos naturais e bebidas delivery.',
    basePrice: 89.00,
    rating: 4.8,
    reviewsCount: '1.5k',
    calories: 9803,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-15988-1-1021x1024.png',
    isBestSeller: false,
    isPopular: true,
    sizes: [
      { id: 'size-garrafa-100', name: 'Fardo C/ 100 un + Tampas', label: 'Fd 100un', price: 89.00, isDefault: true },
      { id: 'size-garrafa-200', name: 'Fardo C/ 200 un + Tampas', label: 'Fd 200un', price: 168.00 }
    ],
    ingredients: [
      { id: 'ing-garrafa-tampa', name: 'Tampas Extras com Lacre (C/ 50)', portion: '50 un', price: 12.00, isDefaultChecked: false, icon: 'circle' }
    ]
  },

  // --- HIGIENE E LIMPEZA PROFISSIONAL ---
  {
    id: 'prod-garra-chlor',
    name: 'DESINF CLORADO GARRA CHLOR 5L OLEAK',
    restaurant: 'Oleak Profissional',
    category: 'limpeza',
    description: 'Desinfetante clorado concentrado Garra Chlor 5L Oleak. Ação bactericida comprovada de amplo espectro para cozinhas industriais, açougues e pisos laváveis.',
    basePrice: 64.90,
    rating: 4.9,
    reviewsCount: '860',
    calories: 10184,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-14782-1-1024x1024.png',
    isBestSeller: true,
    isPopular: true,
    sizes: [
      { id: 'size-chlor-5l', name: 'Galão 5 Litros', label: '5L', price: 64.90, isDefault: true },
      { id: 'size-chlor-cx', name: 'Caixa C/ 4 Galões (20L)', label: 'Cx 4x5L', price: 240.00 }
    ],
    ingredients: [
      { id: 'ing-chlor-torneira', name: 'Torneira Dosadora para Bombona', portion: '1 un', price: 14.00, isDefaultChecked: false, icon: 'tap' },
      { id: 'ing-chlor-pulv', name: 'Pulverizador Graduado 1L', portion: '1 un', price: 18.00, isDefaultChecked: true, icon: 'bottle' }
    ]
  },
  {
    id: 'prod-garra-oxiativo',
    name: 'DESINF GARRA OXIATIVO M/USO 5L OLEAK',
    restaurant: 'Oleak Profissional',
    category: 'limpeza',
    description: 'Desinfetante e limpador multiuso com oxigênio ativo (peróxido de hidrogênio) 5L. Limpa, desinfeta e alveja superfícies sem agredir e sem odor desagradável.',
    basePrice: 78.00,
    rating: 4.9,
    reviewsCount: '1.3k',
    calories: 10182,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-12827-1.jpg',
    isBestSeller: true,
    isPopular: true,
    sizes: [
      { id: 'size-oxi-5l', name: 'Galão 5 Litros', label: '5L', price: 78.00, isDefault: true },
      { id: 'size-oxi-cx', name: 'Caixa C/ 4 Galões (20L)', label: 'Cx 4x5L', price: 289.00 }
    ],
    ingredients: [
      { id: 'ing-oxi-frasco', name: 'Frasco Diluidor c/ Gatilho Espumador', portion: '1 un', price: 22.00, isDefaultChecked: false, icon: '🫧' }
    ]
  },
  {
    id: 'prod-kitch-care',
    name: 'DESINCRUSTANTE DETERG KITCH CARE 5L OLEAK',
    restaurant: 'Oleak Profissional',
    category: 'limpeza',
    description: 'Detergente desincrustante alcalino concentrado Kitch Care 5L. Remove com facilidade gorduras incrustadas e carbonizadas em fornos, chapas, grelhas e coifas.',
    basePrice: 89.50,
    rating: 4.8,
    reviewsCount: '540',
    calories: 10133,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-14724-1.png',
    isBestSeller: false,
    isPopular: true,
    sizes: [
      { id: 'size-kitch-5l', name: 'Galão 5 Litros', label: '5L', price: 89.50, isDefault: true },
      { id: 'size-kitch-cx', name: 'Caixa C/ 4 Galões (20L)', label: 'Cx 4x5L', price: 335.00 }
    ],
    ingredients: [
      { id: 'ing-kitch-fibra', name: 'Fibraço Pesado Verde Scotch-Brite (C/ 10)', portion: '10 un', price: 16.00, isDefaultChecked: true, icon: 'sponge' }
    ]
  },
  {
    id: 'prod-omo-20l',
    name: 'DETERG OMO SUPER CONCENTRADO 20L UNILEVER',
    restaurant: 'Unilever Pro',
    category: 'limpeza',
    description: 'Detergente líquido lava-roupas OMO Pro Super Concentrado 20 Litros. Alto rendimento e remoção de manchas difíceis para hotelaria, restaurantes e lavanderias.',
    basePrice: 219.00,
    rating: 5.0,
    reviewsCount: '2.4k',
    calories: 10127,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-17406-1-1024x1024.png',
    isBestSeller: true,
    isPopular: true,
    sizes: [
      { id: 'size-omo-20l', name: 'Bombona 20 Litros', label: '20L', price: 219.00, isDefault: true },
      { id: 'size-omo-2b', name: 'Kit C/ 2 Bombonas (40L)', label: 'Kit 40L', price: 415.00 }
    ],
    ingredients: [
      { id: 'ing-omo-comfort', name: 'Amaciante Comfort Pro 20L', portion: '20L', price: 179.00, isDefaultChecked: false, icon: 'sparkles' }
    ]
  },
  {
    id: 'prod-guard-tork',
    name: 'GUARD CAFE 21X21 FS 12X500 DX600J TORK',
    restaurant: 'Tork Professional',
    category: 'limpeza',
    description: 'Guardanapo de café 21x21cm folha simples 100% celulose pura Tork. Fardo econômico com 12 pacotes de 500 folhas (6.000 unidades). Máxima suavidade e absorção.',
    basePrice: 68.00,
    rating: 4.8,
    reviewsCount: '920',
    calories: 9795,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-14260-1.png',
    isBestSeller: false,
    isPopular: true,
    sizes: [
      { id: 'size-guard-fd', name: 'Fardo C/ 12x500 (6.000 un)', label: 'Fd 6.000un', price: 68.00, isDefault: true },
      { id: 'size-guard-2fd', name: 'Kit C/ 2 Fardos (12.000 un)', label: 'Kit 12.000un', price: 128.00 }
    ],
    ingredients: [
      { id: 'ing-guard-porta', name: 'Dispenser Porta-Guardanapos Inox', portion: '1 un', price: 24.00, isDefaultChecked: false, icon: 'package' }
    ]
  },
  {
    id: 'prod-luva-vinil',
    name: 'LUVA VINIL DESC S/PO G C/100 NOBRE',
    restaurant: 'Nobre Professional',
    category: 'epi',
    description: 'Luvas descartáveis de vinil sem pó tamanho G Nobre. Ambidestras, confortáveis e seguras para manipulação de alimentos, panificação e limpeza hospitalar.',
    basePrice: 34.90,
    rating: 4.9,
    reviewsCount: '3.5k',
    calories: 9657,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-17130-1.jpg',
    isBestSeller: true,
    isPopular: true,
    sizes: [
      { id: 'size-luva-g', name: 'Tamanho G (C/ 100 un)', label: 'Tam G', price: 34.90, isDefault: true },
      { id: 'size-luva-m', name: 'Tamanho M (C/ 100 un)', label: 'Tam M', price: 34.90 },
      { id: 'size-luva-cx', name: 'Caixa Master C/ 10 Cxs (1.000 un)', label: 'Cx 1.000un', price: 315.00 }
    ],
    ingredients: [
      { id: 'ing-luva-touca', name: 'Touca Sanfonada Descartável Branca (C/ 100)', portion: '100 un', price: 12.00, isDefaultChecked: true, icon: 'shield' }
    ]
  },
  {
    id: 'prod-wiper-tork',
    name: 'WIPER ROLO L PESADA FS C/710 FLS TORK',
    restaurant: 'Tork Professional',
    category: 'limpeza',
    description: 'Pano Wiper profissional em rolo para limpeza pesada folha simples Tork. Resistente a solventes e alta absorção de óleos e líquidos. Rolo com 710 panos.',
    basePrice: 112.00,
    rating: 4.9,
    reviewsCount: '710',
    calories: 9001,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-12859-1.png',
    isBestSeller: false,
    isPopular: true,
    sizes: [
      { id: 'size-wiper-1rl', name: '1 Rolo C/ 710 folhas', label: '1 Rolo', price: 112.00, isDefault: true },
      { id: 'size-wiper-cx', name: 'Caixa C/ 2 Rolos', label: 'Cx 2 Rolos', price: 210.00 }
    ],
    ingredients: [
      { id: 'ing-wiper-suporte', name: 'Suporte de Parede Tubolar para Wiper', portion: '1 un', price: 48.00, isDefaultChecked: false, icon: 'wrench' }
    ]
  },

  // --- SOLUÇÕES EM PANIFICAÇÃO ---
  {
    id: 'prod-baguete-ireks',
    name: 'BAGUETE CLASSICA MM C100 SACO 20KG IREKS',
    restaurant: 'Ireks Brasil',
    category: 'panificacao',
    description: 'Mistura completa para Baguete Clássica Francesa com Massa Madre (fermentação natural) Ireks. Crosta crocante dourada, alvéolos perfeitos e aroma europeu tradicional. Saco de 20kg.',
    basePrice: 185.00,
    rating: 5.0,
    reviewsCount: '640',
    calories: 10534,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-12424-1-926x1024.png',
    isBestSeller: true,
    isPopular: true,
    sizes: [
      { id: 'size-baguete-20kg', name: 'Saco 20kg', label: '20kg', price: 185.00, isDefault: true },
      { id: 'size-baguete-5sac', name: 'Kit 5 Sacos (100kg)', label: '100kg', price: 880.00 }
    ],
    ingredients: [
      { id: 'ing-baguete-ferm', name: 'Fermento Biológico Seco Instantâneo 500g', portion: '500g', price: 16.00, isDefaultChecked: true, icon: 'package' },
      { id: 'ing-baguete-lamina', name: 'Lâmina de Padeiro para Pestana (C/ 5)', portion: '5 un', price: 19.00, isDefaultChecked: false, icon: 'utensils' }
    ]
  },
  {
    id: 'prod-cake-cenoura',
    name: 'BOLO GOLDEN CAKE CENOURA C100 SACO 2KG',
    restaurant: 'Ireks Brasil',
    category: 'panificacao',
    description: 'Pré-mistura para bolo Golden Cake sabor Cenoura Ireks em pó. Alto rendimento, cor viva natural, miolo macio e úmido por dias. Saco com 2kg.',
    basePrice: 38.90,
    rating: 4.9,
    reviewsCount: '1.8k',
    calories: 10413,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-16504-1-926x1024.png',
    isBestSeller: true,
    isPopular: true,
    sizes: [
      { id: 'size-cake-2kg', name: 'Saco 2kg', label: '2kg', price: 38.90, isDefault: true },
      { id: 'size-cake-cx', name: 'Caixa C/ 6 Sacos (12kg)', label: 'Cx 12kg', price: 215.00 }
    ],
    ingredients: [
      { id: 'ing-cake-choc', name: 'Cobertura Fracionada Meio Amargo 1kg', portion: '1kg', price: 28.00, isDefaultChecked: true, icon: 'package' }
    ]
  },
  {
    id: 'prod-cake-chocolate',
    name: 'BOLO GOLDEN CAKE CHOCOLATE SACO 2KG IREKS',
    restaurant: 'Ireks Brasil',
    category: 'panificacao',
    description: 'Pré-mistura para bolo Golden Cake Chocolate Ireks. Cor rica e intensa de cacau nobre, estrutura aveludada e excelente absorção de caldas. Saco com 2kg.',
    basePrice: 41.50,
    rating: 4.8,
    reviewsCount: '1.5k',
    calories: 10412,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-13467-1-926x1024.png',
    isBestSeller: false,
    isPopular: true,
    sizes: [
      { id: 'size-choc-2kg', name: 'Saco 2kg', label: '2kg', price: 41.50, isDefault: true },
      { id: 'size-choc-cx', name: 'Caixa C/ 6 Sacos (12kg)', label: 'Cx 12kg', price: 235.00 }
    ],
    ingredients: [
      { id: 'ing-choc-gotas', name: 'Gotas de Chocolate Nobre Forneáveis 1kg', portion: '1kg', price: 32.00, isDefaultChecked: false, icon: 'package' }
    ]
  },
  {
    id: 'prod-sepa-wax',
    name: 'DESMOLDANTE SEPA WAX LATA 500ML IREKS',
    restaurant: 'Ireks Brasil',
    category: 'panificacao',
    description: 'Desmoldante aerossol profissional Sepa Wax 500ml à base de ceras e óleos vegetais purificados. Desenforme perfeito sem queimar nem alterar o sabor.',
    basePrice: 36.00,
    rating: 4.9,
    reviewsCount: '2.8k',
    calories: 10161,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-12461-1.png',
    isBestSeller: true,
    isPopular: true,
    sizes: [
      { id: 'size-sepa-500ml', name: 'Lata Spray 500ml', label: '500ml', price: 36.00, isDefault: true },
      { id: 'size-sepa-cx', name: 'Caixa C/ 12 Latas', label: 'Cx 12 Latas', price: 399.00 }
    ],
    ingredients: [
      { id: 'ing-sepa-forma', name: 'Forma Descartável de Alumínio (C/ 20)', portion: '20 un', price: 26.00, isDefaultChecked: false, icon: 'package' }
    ]
  },
  {
    id: 'prod-grano-frances',
    name: 'GRANO PAO FRANCES C50 SACO 5KG IREKS',
    restaurant: 'Ireks Brasil',
    category: 'panificacao',
    description: 'Melhorador enzimático de alta concentração Grano Pão Francês C50 Ireks. Proporciona tolerância mecânica à massa, salto de forno perfeito e casca crocante brilhante.',
    basePrice: 96.00,
    rating: 4.9,
    reviewsCount: '730',
    calories: 9796,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-12432.png',
    isBestSeller: false,
    isPopular: false,
    sizes: [
      { id: 'size-grano-5kg', name: 'Saco 5kg', label: '5kg', price: 96.00, isDefault: true },
      { id: 'size-grano-25kg', name: 'Saco Industrial 25kg', label: '25kg', price: 420.00 }
    ],
    ingredients: [
      { id: 'ing-grano-balanca', name: 'Balança Digital de Precisão 5kg', portion: '1 un', price: 39.00, isDefaultChecked: false, icon: 'scale' }
    ]
  },
  {
    id: 'prod-brioche-ireks',
    name: 'LE PAIN BRIOCHE C100 SACO 2KG IREKS',
    restaurant: 'Ireks Brasil',
    category: 'panificacao',
    description: 'Mistura completa para Pão Brioche Gourmet Francês Ireks. Textura aveludada amanteigada, coloração dourada uniforme e maciez incomparável para pães de hambúrguer e lanches.',
    basePrice: 44.00,
    rating: 5.0,
    reviewsCount: '1.6k',
    calories: 9775,
    prepTime: 'Pronta Entrega',
    image: 'https://bragodistribuidora.com.br/wp-content/uploads/2026/06/produto-7115-1-926x1024.png',
    isBestSeller: true,
    isPopular: true,
    sizes: [
      { id: 'size-brioche-2kg', name: 'Saco 2kg', label: '2kg', price: 44.00, isDefault: true },
      { id: 'size-brioche-cx', name: 'Caixa C/ 6 Sacos (12kg)', label: 'Cx 12kg', price: 245.00 }
    ],
    ingredients: [
      { id: 'ing-brioche-pincel', name: 'Pincel Culinário de Silicone', portion: '1 un', price: 14.00, isDefaultChecked: false, icon: 'brush' }
    ]
  }
];
