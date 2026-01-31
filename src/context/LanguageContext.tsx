import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'sq' | 'en' | 'fr';

interface Translations {
  brandName: string;
  brandTagline: string;
  home: string;
  shop: string;
  apparel: string;
  tShirts: string;
  hoodies: string;
  workwearUniforms: string;
  babyKidsClothing: string;
  homeDecor: string;
  embroideredFrames: string;
  kidsFrames: string;
  cushions: string;
  wallDecor: string;
  towels: string;
  napkins: string;
  businessEmbroidery: string;
  businessLogoEmbroidery: string;
  dresses: string;
  tops: string;
  skirts: string;
  jackets: string;
  about: string;
  contact: string;
  admin: string;
  freeShipping: string;
  search: string;
  wishlist: string;
  account: string;
  cart: string;
  newCollection: string;
  heroTitle1: string;
  heroTitle2: string;
  heroDescription: string;
  shopCollection: string;
  ourStory: string;
  browseBy: string;
  categories: string;
  curatedForYou: string;
  featuredCollection: string;
  viewAll: string;
  freeShippingTitle: string;
  freeShippingDesc: string;
  securePayment: string;
  securePaymentDesc: string;
  easyReturns: string;
  easyReturnsDesc: string;
  support24: string;
  supportDesc: string;
  whatCustomersSay: string;
  testimonials: string;
  newBadge: string;
  saleBadge: string;
  quickView: string;
  shopAll: string;
  shopDescription: string;
  allProducts: string;
  priceRange: string;
  filters: string;
  showingProducts: string;
  featured: string;
  newest: string;
  priceLowHigh: string;
  priceHighLow: string;
  noProductsFound: string;
  tryAdjustingFilters: string;
  productNotFound: string;
  backToShop: string;
  size: string;
  color: string;
  quantity: string;
  addToCart: string;
  freeShippingOver: string;
  easyReturns30: string;
  secureCheckout: string;
  youMayAlsoLike: string;
  pleaseSelectSizeColor: string;
  addedToCart: string;
  yourCartEmpty: string;
  emptyCartMessage: string;
  continueShopping: string;
  shoppingCart: string;
  clearCart: string;
  orderSummary: string;
  subtotal: string;
  shipping: string;
  free: string;
  addMoreForFreeShipping: string;
  total: string;
  proceedToCheckout: string;
  ourStoryTitle: string;
  celebratingModesty: string;
  aboutUs: string;
  fashionHonorsValues: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutParagraph3: string;
  countriesShipped: string;
  happyCustomers: string;
  qualityPromise: string;
  exploreCollection: string;
  contactUs: string;
  contactDescription: string;
  sendMessage: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  yourName: string;
  yourEmail: string;
  howCanWeHelp: string;
  yourMessage: string;
  getInTouch: string;
  contactInfo: string;
  address: string;
  phone: string;
  businessHours: string;
  businessHoursText: string;
  messageSentSuccess: string;
  footerDescription: string;
  quickLinks: string;
  customerService: string;
  shippingReturns: string;
  faq: string;
  sizeGuide: string;
  trackOrder: string;
  privacyPolicy: string;
  termsService: string;
  allRightsReserved: string;
  pageNotFound: string;
  pageNotFoundMessage: string;
  returnHome: string;
  testimonial1: string;
  testimonial2: string;
  testimonial3: string;
  productDress1Name: string;
  productDress1Desc: string;
  productTop1Name: string;
  productTop1Desc: string;
  productDress2Name: string;
  productDress2Desc: string;
  productSkirt1Name: string;
  productSkirt1Desc: string;
  productJacket1Name: string;
  productJacket1Desc: string;
  productTopSet: string;
  productTopSetDesc: string;
  productDress3Name: string;
  productDress3Desc: string;
  productJacket2Name: string;
  productJacket2Desc: string;
  dressesDesc: string;
  topsDesc: string;
  skirtsDesc: string;
  jacketsDesc: string;
  addProductTitle: string;
  productName: string;
  productPrice: string;
  productCategory: string;
  productDescription: string;
  productImage: string;
  addButton: string;
  products: string;
  // Custom Orders
  customEmbroideryTitle: string;
  customEmbroideryDescription: string;
  yourDesign: string;
  yourDesignDesc: string;
  weCollaborate: string;
  weCollaborateDesc: string;
  weCreate: string;
  weCreateDesc: string;
  requestCustomOrder: string;
  browseCatalog: string;
  perfectForEvents: string;
  // Updated Features
  payOnDelivery: string;
  payOnDeliveryDesc: string;
  premiumQuality: string;
  premiumQualityDesc: string;
  response24h: string;
  response24hDesc: string;
  // Contact Page
  contactPageTitle: string;
  contactPageDescription: string;
  sendUsMessage: string;
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  sending: string;
  sendMessageBtn: string;
  getInTouchTitle: string;
  getInTouchDescription: string;
  addressLabel: string;
  addressText: string;
  phoneLabel: string;
  emailLabelText: string;
  businessHoursLabel: string;
  businessHoursDetails: string;
  thankYouMessage: string;
  failedToSend: string;
  // Product Detail Page
  loadingProduct: string;
  productNotFoundTitle: string;
  backToShopLink: string;
  sizeLabel: string;
  colorLabel: string;
  quantityLabel: string;
  addToCartBtn: string;
  contactUsToBuy: string;
  preferSocials: string;
  instagram: string;
  facebook: string;
  emailContact: string;
  youMayAlsoLikeTitle: string;
  oneSize: string;
  standardColor: string;
  noDescriptionAvailable: string;
  pleaseSelectSizeAndColor: string;
  productAddedToCart: string;
  // Cart Page
  shoppingCartTitle: string;
  yourCartEmptyTitle: string;
  cartEmptyMessage: string;
  continueShoppingBtn: string;
  clearCartBtn: string;
  orderSummaryTitle: string;
  subtotalLabel: string;
  shippingLabel: string;
  freeShippingText: string;
  addMoreForFreeShippingText: string;
  totalLabel: string;
  contactToOrder: string;
  continueShoppingLink: string;
  confirmAndSend: string;
  confirmSendDescription: string;
  sendViaWhatsApp: string;
  copyOrderTextBtn: string;
  copied: string;
  copyOrderTextTitle: string;
  copyOrderTextDescription: string;
  pasteIntoSocialDM: string;
  cancel: string;
  whatsappNote: string;
  copyOrderNote: string;
}

const translations: Record<Language, Translations> = {
  sq: {
    brandName: 'Embroidery Elegance',
    brandTagline: 'Luks, artizanat dhe elegancë në çdo detaj',
    home: 'Kryefaqja',
    shop: 'Dyqani',
    apparel: 'Veshje',
    tShirts: 'Bluza',
    hoodies: 'Hoodies',
    workwearUniforms: 'Uniforma Pune',
    babyKidsClothing: 'Rroba për Foshnje & Fëmijë',
    homeDecor: 'Dekor & Shtëpi',
    embroideredFrames: 'Korniza të Qendisura',
    kidsFrames: 'Korniza për Fëmijë',
    cushions: 'Jastëkë',
    wallDecor: 'Dekor Muri',
    towels: 'Peshqirë',
    napkins: 'Peceta',
    businessEmbroidery: 'Qendistje Biznesi',
    businessLogoEmbroidery: 'Qendistje Logo Biznesi',
    dresses: 'Fustanet',
    tops: 'Bluzat',
    skirts: 'Skirtat',
    jackets: 'Xhaketat',
    about: 'Rreth Nesh',
    contact: 'Kontakt',
    admin: 'Administrim',
    freeShipping: 'Transporti falas për porosi mbi 150€ ✨',
    search: 'Kërko',
    wishlist: 'Lista e Dëshirave',
    account: 'Llogaria',
    cart: 'Shporta',
    newCollection: 'Koleksioni i Ri 2026',
    heroTitle1: 'Elegancë në',
    heroTitle2: 'Artin e Qepjes',
    heroDescription: 'Zbuloni koleksionin tonë të zgjedhur të veshjes me qepje të bukur.',
    shopCollection: 'Shfletoni Koleksionin',
    ourStory: 'Historia Jonë',
    browseBy: 'Shfletoni Sipas',
    categories: 'Kategorive',
    curatedForYou: 'Të Zgjedhura për Ju',
    featuredCollection: 'Koleksioni i Veçantë',
    viewAll: 'Shiko të Gjitha',
    freeShippingTitle: 'Transport Falas',
    freeShippingDesc: 'Transport falas për porosi mbi 150€',
    securePayment: 'Pagesë e Sigurt',
    securePaymentDesc: 'Informacioni juaj i pagesës mbrohet gjithmonë',
    easyReturns: 'Kthime të Lehta',
    easyReturnsDesc: 'Politikë kthimi pa telashe brenda 30 ditëve',
    support24: 'Mbështetje 24/7',
    supportDesc: 'Ekipi i dedikuar i mbështetjes gati t\'ju ndihmojë',
    whatCustomersSay: 'Çfarë Thonë Klientët Tanë',
    testimonials: 'Dëshmitë',
    newBadge: 'E Re',
    saleBadge: 'Ulje',
    quickView: 'Shikim i Shpejtë',
    shopAll: 'Të Gjitha Produktet',
    shopDescription: 'Eksploroni koleksionin tonë të zgjedhur të veshjes me qepje.',
    allProducts: 'Të Gjitha Produktet',
    priceRange: 'Gama e Çmimeve',
    filters: 'Filtrat',
    showingProducts: 'Duke shfaqur {count} produkte',
    featured: 'Të Veçanta',
    newest: 'Më të Rejat',
    priceLowHigh: 'Çmimi: Ulët në Lartë',
    priceHighLow: 'Çmimi: Lartë në Ulët',
    noProductsFound: 'Nuk u gjetën produkte',
    tryAdjustingFilters: 'Provoni të rregulloni filtrat tuaj',
    productNotFound: 'Produkti Nuk u Gjet',
    backToShop: 'Kthehu te Dyqani',
    size: 'Madhësia',
    color: 'Ngjyra',
    quantity: 'Sasia',
    addToCart: 'Shto në Shportë',
    freeShippingOver: 'Transport falas për porosi mbi 150€',
    easyReturns30: 'Kthime të lehta brenda 30 ditëve',
    secureCheckout: 'Pagesë e sigurt',
    youMayAlsoLike: 'Mund t\'ju Pëlqejnë Gjithashtu',
    pleaseSelectSizeColor: 'Ju lutem zgjidhni madhësinë dhe ngjyrën',
    addedToCart: 'u shtua në shportë!',
    yourCartEmpty: 'Shporta Juaj është Bosh',
    emptyCartMessage: 'Duket se nuk keni shtuar ende asnjë artikull në shportën tuaj.',
    continueShopping: 'Vazhdoni Blerjet',
    shoppingCart: 'Shporta e Blerjeve',
    clearCart: 'Pastro Shportën',
    orderSummary: 'Përmbledhja e Porosisë',
    subtotal: 'Nëntotali',
    shipping: 'Transporti',
    free: 'Falas',
    addMoreForFreeShipping: 'Shtoni {amount}€ më shumë për transport falas!',
    total: 'Totali',
    proceedToCheckout: 'Vazhdoni me Pagesën',
    ourStoryTitle: 'Historia Jonë',
    celebratingModesty: 'Duke festuar artin e qepjes me elegancë',
    aboutUs: 'Rreth Nesh',
    fashionHonorsValues: 'Moda që Nderon Cilësinë',
    aboutParagraph1: 'Gjilpera Magjike është sinonim i luksit dhe mjeshtërisë së rrallë. Çdo veshje është një deklaratë stili dhe elegance.',
    aboutParagraph2: 'Misioni ynë është të sjellim luksin dhe finesën e qëndisjes në çdo produkt, për klientë që vlerësojnë të veçantën.',
    aboutParagraph3: 'Materialet më të mira, dizajn modern dhe mjeshtëri e pakrahasueshme – për ata që kërkojnë më të mirën.',
    countriesShipped: 'Vende të Dërguara',
    happyCustomers: 'Klientë të Kënaqur',
    qualityPromise: 'Premtimi i Cilësisë',
    exploreCollection: 'Eksploroni Koleksionin Tonë',
    contactUs: 'Na Kontaktoni',
    contactDescription: 'Do të donim të dëgjonim nga ju.',
    sendMessage: 'Dërgoni Mesazh',
    name: 'Emri',
    email: 'Email',
    subject: 'Subjekti',
    message: 'Mesazhi',
    yourName: 'Emri juaj',
    yourEmail: 'Email-i juaj',
    howCanWeHelp: 'Si mund t\'ju ndihmojmë?',
    yourMessage: 'Mesazhi juaj',
    getInTouch: 'Kontaktohuni',
    contactInfo: 'Keni një pyetje për produktet tona?',
    address: 'Adresa',
    phone: 'Telefoni',
    businessHours: 'Orari i Punës',
    businessHoursText: 'E Hënë - E Premte: 9:00 - 18:00',
    messageSentSuccess: 'Faleminderit për mesazhin tuaj!',
    footerDescription: 'Luks, elegancë dhe cilësi e pakrahasueshme në çdo detaj.',
    quickLinks: 'Lidhje të Shpejta',
    customerService: 'Shërbimi i Klientit',
    shippingReturns: 'Transporti & Kthimet',
    faq: 'Pyetje të Shpeshta',
    sizeGuide: 'Udhëzuesi i Madhësive',
    trackOrder: 'Ndiqni Porosinë',
    privacyPolicy: 'Politika e Privatësisë',
    termsService: 'Kushtet e Shërbimit',
    allRightsReserved: 'Të gjitha të drejtat të rezervuara.',
    pageNotFound: 'Faqja Nuk u Gjet',
    pageNotFoundMessage: 'Faqja që po kërkoni nuk ekziston.',
    returnHome: 'Kthehu në Kryefaqe',
    testimonial1: 'Cilësia e qepjes është e jashtëzakonshme.',
    testimonial2: 'Më në fund gjeta një markë që e kupton cilësinë!',
    testimonial3: 'Porosa e ardhur përkaloi pritshmëritë e mia.',
    productDress1Name: 'Fustan me Qepje Jeshile',
    productDress1Desc: 'Fustan elegant jeshil me qepje të bukur.',
    productTop1Name: 'Bluzë Premium me Qepje',
    productTop1Desc: 'Bluzë luksoze me qepje të çmuar.',
    productDress2Name: 'Fustan i Zi me Qepje Ari',
    productDress2Desc: 'Fustan mahnitës me qepje ari.',
    productSkirt1Name: 'Skirtë me Qepje Detaje',
    productSkirt1Desc: 'Skirtë jeshile me qepje delikate.',
    productJacket1Name: 'Xhaketë me Qepje',
    productJacket1Desc: 'Xhaketë e bukur me qepje elegante.',
    productTopSet: 'Komplet Bluzash me Qepje',
    productTopSetDesc: 'Komplet prejbluzash me qepje të çmuar.',
    productDress3Name: 'Fustan Minimaliste me Qepje',
    productDress3Desc: 'Fustan i thjeshtë me qepje të bukur.',
    productJacket2Name: 'Xhaketë Luksoze',
    productJacket2Desc: 'Xhaketë kompakte me qepje të çmuar.',
    dressesDesc: 'Fustanet elegante për çdo rast',
    topsDesc: 'Bluzat premium me qepje të çmuar',
    skirtsDesc: 'Skirtat e bukura për ngjarje',
    jacketsDesc: 'Xhaketat modest dhe stiloze',
    addProductTitle: 'Shtoni Produkt të Ri',
    productName: 'Emri i Produktit',
    productPrice: 'Çmimi',
    productCategory: 'Kategoria',
    productDescription: 'Përshkrimi',
    productImage: 'URL e Fotos',
    addButton: 'Shto Produktin',
    products: 'Produktet',
    // Custom Orders
    customEmbroideryTitle: 'Shërbimi i Qendistjes së Personalizuar',
    customEmbroideryDescription: 'Nuk mund të gjeni atë që kërkoni? Ne specializohemi në porosi qendistjeje të personalizuara sipas vizionit tuaj unik.',
    yourDesign: 'Dizajni Juaj',
    yourDesignDesc: 'Sillni idetë, logot ose dizajnet tuaja',
    weCollaborate: 'Ne Bashkëpunojmë',
    weCollaborateDesc: 'Punoni direkt me ekipin tonë për të përsosur dizajnin tuaj',
    weCreate: 'Ne Krijojmë',
    weCreateDesc: 'Kthejm​ë idenë tuaj në realitet të bukur të qendisur',
    requestCustomOrder: 'Kërkoni Porosi të Personalizuar',
    browseCatalog: 'Shfletoni Katalogun',
    perfectForEvents: 'Perfekt për dhurata korporative, ngjarje të veçanta, ose projekte personale',
    // Updated Features
    payOnDelivery: 'Pagesë në Dorëzim',
    payOnDeliveryDesc: 'Paguani vetëm kur merrni produktin tuaj',
    premiumQuality: 'Cilësi Premium',
    premiumQualityDesc: 'Qendistje me dorë me materiale të cilësisë së lartë',
    response24h: 'Përgjigje brenda 24 Orëve',
    response24hDesc: 'U përgjigjemi të gjitha pyetjeve brenda 24 orëve',
    // Contact Page
    contactPageTitle: 'Na Kontaktoni',
    contactPageDescription: 'Do të donim të dëgjonim nga ju. Kontaktoni ekipin tonë për çdo pyetje apo informacion.',
    sendUsMessage: 'Dërgoni një Mesazh',
    nameLabel: 'Emri',
    emailLabel: 'Email',
    subjectLabel: 'Subjekti',
    messageLabel: 'Mesazhi',
    namePlaceholder: 'Emri juaj',
    emailPlaceholder: 'Email-i juaj',
    subjectPlaceholder: 'Si mund t\'ju ndihmojmë?',
    messagePlaceholder: 'Mesazhi juaj',
    sending: 'Duke dërguar...',
    sendMessageBtn: 'Dërgo Mesazhin',
    getInTouchTitle: 'Kontaktohuni',
    getInTouchDescription: 'Keni një pyetje për produktet, transportin, ose kthimet tona? Ekipi ynë i shërbimit ndaj klientit është këtu për t\'ju ndihmuar.',
    addressLabel: 'Adresa',
    addressText: 'Albania',
    phoneLabel: 'Telefoni',
    emailLabelText: 'example@email.com',
    businessHoursLabel: 'Orari i Punës',
    businessHoursDetails: 'E Diel - E Enjte: 9:00 - 18:00\nE Premte - E Shtunë: Mbyllur',
    thankYouMessage: 'Faleminderit për mesazhin tuaj! Do t\'ju përgjigjemi së shpejti.',
    failedToSend: 'Dështoi dërgimi i mesazhit. Ju lutemi provoni përsëri.',
    // Product Detail Page
    loadingProduct: 'Duke ngarkuar produktin...',
    productNotFoundTitle: 'Produkti Nuk u Gjet',
    backToShopLink: '← Kthehu te Dyqani',
    sizeLabel: 'Madhësia',
    colorLabel: 'Ngjyra',
    quantityLabel: 'Sasia',
    addToCartBtn: 'Shto në Shportë',
    contactUsToBuy: 'Kontaktoni për të blerë',
    preferSocials: 'Preferoni rrjetet sociale? Kontaktoni drejtpërdrejt:',
    instagram: 'Instagram',
    facebook: 'Facebook',
    emailContact: 'Email',
    youMayAlsoLikeTitle: 'Mund t\'ju Pëlqejnë Gjithashtu',
    oneSize: 'Një madhësi',
    standardColor: 'Standard',
    noDescriptionAvailable: 'Nuk ka përshkrim të disponueshëm',
    pleaseSelectSizeAndColor: 'Ju lutemi zgjidhni madhësinë dhe ngjyrën',
    productAddedToCart: 'u shtua në shportë',
    // Cart Page
    shoppingCartTitle: 'Shporta e Blerjeve',
    yourCartEmptyTitle: 'Shporta Juaj është Bosh',
    cartEmptyMessage: 'Duket se nuk keni shtuar ende asnjë artikull në shportën tuaj.',
    continueShoppingBtn: 'Vazhdoni Blerjet',
    clearCartBtn: 'Pastro Shportën',
    orderSummaryTitle: 'Përmbledhja e Porosisë',
    subtotalLabel: 'Nëntotali',
    shippingLabel: 'Transporti',
    freeShippingText: 'Falas',
    addMoreForFreeShippingText: 'Shtoni ${amount} më shumë për transport falas!',
    totalLabel: 'Totali',
    contactToOrder: 'Kontaktoni për Porosi',
    continueShoppingLink: 'Vazhdoni Blerjet',
    confirmAndSend: 'Konfirmoni & Dërgoni',
    confirmSendDescription: 'Për të blerë, na kontaktoni në WhatsApp ose kopjoni përmbledhjen dhe na dërgoni mesazh në kanalin tuaj të preferuar social.',
    sendViaWhatsApp: 'Dërgo nëpërmjet WhatsApp',
    copyOrderTextBtn: 'Kopjo tekstin e porosisë',
    copied: 'U kopjua',
    copyOrderTextTitle: 'Kopjoni tekstin e porosisë për Instagram/Facebook DM.',
    copyOrderTextDescription: 'Ngjisni këtë në çdo DM social nëse preferoni të mos përdorni WhatsApp.',
    pasteIntoSocialDM: 'Ngjisni këtë në çdo DM social nëse preferoni të mos përdorni WhatsApp.',
    cancel: 'Anulo',
    whatsappNote: 'WhatsApp hapet me porosinë të parapërfunduar. Përditësoni numrin e WhatsApp kur të jeni gati.',
    copyOrderNote: 'Mund të kopjoni gjithashtu tekstin e porosisë dhe ta dërgoni në çdo DM social.',
  },

  en: {
    brandName: 'Embroidery Elegance',
    brandTagline: 'Luxury, craftsmanship, and elegance in every detail',
    home: 'Home',
    shop: 'Shop',
    apparel: 'Apparel',
    tShirts: 'T-Shirts',
    hoodies: 'Hoodies',
    workwearUniforms: 'Workwear Uniforms',
    babyKidsClothing: 'Baby & Kids Clothing (Bodysuits)',
    homeDecor: 'Home & Decor',
    embroideredFrames: 'Embroidered Frames',
    kidsFrames: 'Kids Frames',
    cushions: 'Cushions',
    wallDecor: 'Wall Decor',
    towels: 'Towels',
    napkins: 'Napkins',
    businessEmbroidery: 'Business Embroidery',
    businessLogoEmbroidery: 'Business Logo Embroidery',
    dresses: 'Dresses',
    tops: 'Tops',
    skirts: 'Skirts',
    jackets: 'Jackets',
    about: 'About',
    contact: 'Contact',
    admin: 'Admin',
    freeShipping: 'Free shipping on orders over €150 ✨',
    search: 'Search',
    wishlist: 'Wishlist',
    account: 'Account',
    cart: 'Cart',
    newCollection: 'New Collection 2026',
    heroTitle1: 'Elegance in',
    heroTitle2: 'Fine Embroidery',
    heroDescription: 'Discover our curated collection of beautifully embroidered clothing.',
    shopCollection: 'Shop Collection',
    ourStory: 'Our Story',
    browseBy: 'Browse By',
    categories: 'Categories',
    curatedForYou: 'Curated For You',
    featuredCollection: 'Featured Collection',
    viewAll: 'View All',
    freeShippingTitle: 'Free Shipping',
    freeShippingDesc: 'Free shipping on orders over €150',
    securePayment: 'Secure Payment',
    securePaymentDesc: 'Your payment information is always protected',
    easyReturns: 'Easy Returns',
    easyReturnsDesc: 'Hassle-free returns within 30 days',
    support24: '24/7 Support',
    supportDesc: 'Dedicated support team ready to help',
    whatCustomersSay: 'What Our Customers Say',
    testimonials: 'Testimonials',
    newBadge: 'New',
    saleBadge: 'Sale',
    quickView: 'Quick View',
    shopAll: 'All Products',
    shopDescription: 'Explore our curated collection of beautifully embroidered clothing.',
    allProducts: 'All Products',
    priceRange: 'Price Range',
    filters: 'Filters',
    showingProducts: 'Showing {count} products',
    featured: 'Featured',
    newest: 'Newest',
    priceLowHigh: 'Price: Low to High',
    priceHighLow: 'Price: High to Low',
    noProductsFound: 'No products found',
    tryAdjustingFilters: 'Try adjusting your filters',
    productNotFound: 'Product Not Found',
    backToShop: 'Back to Shop',
    size: 'Size',
    color: 'Color',
    quantity: 'Quantity',
    addToCart: 'Add to Cart',
    freeShippingOver: 'Free shipping on orders over €150',
    easyReturns30: 'Easy returns within 30 days',
    secureCheckout: 'Secure checkout',
    youMayAlsoLike: 'You May Also Like',
    pleaseSelectSizeColor: 'Please select a size and color',
    addedToCart: 'added to cart!',
    yourCartEmpty: 'Your Cart is Empty',
    emptyCartMessage: 'Looks like you haven\'t added any items to your cart yet.',
    continueShopping: 'Continue Shopping',
    shoppingCart: 'Shopping Cart',
    clearCart: 'Clear Cart',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    addMoreForFreeShipping: 'Add €{amount} more for free shipping!',
    total: 'Total',
    proceedToCheckout: 'Proceed to Checkout',
    ourStoryTitle: 'Our Story',
    celebratingModesty: 'Celebrating fine embroidery with elegance',
    aboutUs: 'About Us',
    fashionHonorsValues: 'Fashion That Values Quality',
    aboutParagraph1: 'Gjilpera Magjike is the epitome of luxury and refined craftsmanship. Each piece is a statement of style and sophistication.',
    aboutParagraph2: 'Our mission is to deliver luxury and exquisite embroidery to discerning clients who appreciate the extraordinary.',
    aboutParagraph3: 'Finest materials, modern design, and rare artistry—for those who demand the best.',
    countriesShipped: 'Countries Shipped',
    happyCustomers: 'Happy Customers',
    qualityPromise: 'Quality Promise',
    exploreCollection: 'Explore Our Collection',
    contactUs: 'Contact Us',
    contactDescription: 'We\'d love to hear from you.',
    sendMessage: 'Send Message',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    yourName: 'Your name',
    yourEmail: 'Your email',
    howCanWeHelp: 'How can we help?',
    yourMessage: 'Your message',
    getInTouch: 'Get In Touch',
    contactInfo: 'Have a question about our products?',
    address: 'Address',
    phone: 'Phone',
    businessHours: 'Business Hours',
    businessHoursText: 'Monday - Friday: 9:00 AM - 6:00 PM',
    messageSentSuccess: 'Thank you for your message!',
    footerDescription: 'Luxury, elegance, and unmatched quality in every detail.',
    quickLinks: 'Quick Links',
    customerService: 'Customer Service',
    shippingReturns: 'Shipping & Returns',
    faq: 'FAQ',
    sizeGuide: 'Size Guide',
    trackOrder: 'Track Order',
    privacyPolicy: 'Privacy Policy',
    termsService: 'Terms of Service',
    allRightsReserved: 'All rights reserved.',
    pageNotFound: 'Page Not Found',
    pageNotFoundMessage: 'The page you\'re looking for doesn\'t exist.',
    returnHome: 'Return Home',
    testimonial1: 'The embroidery quality is exceptional.',
    testimonial2: 'Finally found a brand that understands quality!',
    testimonial3: 'My order exceeded expectations.',
    productDress1Name: 'Green Embroidered Dress',
    productDress1Desc: 'Elegant green dress with embroidery details.',
    productTop1Name: 'Premium Embroidered Top',
    productTop1Desc: 'Luxurious rose embroidered top.',
    productDress2Name: 'Black Dress with Gold Embroidery',
    productDress2Desc: 'Stunning black dress with gold embroidery.',
    productSkirt1Name: 'Embroidered Skirt',
    productSkirt1Desc: 'Flowing green skirt with embroidery details.',
    productJacket1Name: 'Embroidered Jacket',
    productJacket1Desc: 'Beautiful cream jacket with embroidery.',
    productTopSet: 'Set of Embroidered Tops',
    productTopSetDesc: 'Set of 3 premium tops with embroidery.',
    productDress3Name: 'Minimalist Embroidered Dress',
    productDress3Desc: 'Simple yet elegant dress with embroidery.',
    productJacket2Name: 'Luxury Travel Jacket',
    productJacket2Desc: 'Compact jacket with fine embroidery.',
    dressesDesc: 'Elegant dresses for every occasion',
    topsDesc: 'Premium tops with fine embroidery',
    skirtsDesc: 'Beautiful skirts for events',
    jacketsDesc: 'Modest and stylish jackets',
    addProductTitle: 'Add New Product',
    productName: 'Product Name',
    productPrice: 'Price',
    productCategory: 'Category',
    productDescription: 'Description',
    productImage: 'Image URL',
    addButton: 'Add Product',
    products: 'Products',
    // Custom Orders
    customEmbroideryTitle: 'Custom Embroidery Services',
    customEmbroideryDescription: 'Can\'t find what you\'re looking for? We specialize in custom embroidery orders tailored to your unique vision.',
    yourDesign: 'Your Design',
    yourDesignDesc: 'Bring your own ideas, logos, or artwork',
    weCollaborate: 'We Collaborate',
    weCollaborateDesc: 'Work directly with our team to perfect your design',
    weCreate: 'We Create',
    weCreateDesc: 'Turn your idea into beautiful embroidered reality',
    requestCustomOrder: 'Request Custom Order',
    browseCatalog: 'Browse Catalog',
    perfectForEvents: 'Perfect for corporate gifts, special events, or personal projects',
    // Updated Features
    payOnDelivery: 'Pay on Delivery',
    payOnDeliveryDesc: 'Payment only when you receive your product',
    premiumQuality: 'Premium Quality',
    premiumQualityDesc: 'Handcrafted embroidery with high-quality materials',
    response24h: '24-Hour Response',
    response24hDesc: 'We respond to all inquiries within 24 hours',
    // Contact Page
    contactPageTitle: 'Contact Us',
    contactPageDescription: 'We\'d love to hear from you. Get in touch with our team for any questions or inquiries.',
    sendUsMessage: 'Send Us a Message',
    nameLabel: 'Name',
    emailLabel: 'Email',
    subjectLabel: 'Subject',
    messageLabel: 'Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Your email',
    subjectPlaceholder: 'How can we help?',
    messagePlaceholder: 'Your message',
    sending: 'Sending...',
    sendMessageBtn: 'Send Message',
    getInTouchTitle: 'Get In Touch',
    getInTouchDescription: 'Have a question about our products, shipping, or returns? Our customer service team is here to help you.',
    addressLabel: 'Address',
    addressText: 'Albania',
    phoneLabel: 'Phone',
    emailLabelText: 'example@email.com',
    businessHoursLabel: 'Business Hours',
    businessHoursDetails: 'Sunday - Thursday: 9:00 AM - 6:00 PM\nFriday - Saturday: Closed',
    thankYouMessage: 'Thank you for your message! We will get back to you soon.',
    failedToSend: 'Failed to send message. Please try again.',
    // Product Detail Page
    loadingProduct: 'Loading product...',
    productNotFoundTitle: 'Product Not Found',
    backToShopLink: '← Back to Shop',
    sizeLabel: 'Size',
    colorLabel: 'Color',
    quantityLabel: 'Quantity',
    addToCartBtn: 'Add to Cart',
    contactUsToBuy: 'Contact us to buy',
    preferSocials: 'Prefer socials? Reach out directly:',
    instagram: 'Instagram',
    facebook: 'Facebook',
    emailContact: 'Email',
    youMayAlsoLikeTitle: 'You May Also Like',
    oneSize: 'One size',
    standardColor: 'Standard',
    noDescriptionAvailable: 'No description available',
    pleaseSelectSizeAndColor: 'Please select a size and color',
    productAddedToCart: 'added to cart',
    // Cart Page
    shoppingCartTitle: 'Shopping Cart',
    yourCartEmptyTitle: 'Your Cart is Empty',
    cartEmptyMessage: 'Looks like you haven\'t added any items to your cart yet.',
    continueShoppingBtn: 'Continue Shopping',
    clearCartBtn: 'Clear Cart',
    orderSummaryTitle: 'Order Summary',
    subtotalLabel: 'Subtotal',
    shippingLabel: 'Shipping',
    freeShippingText: 'Free',
    addMoreForFreeShippingText: 'Add ${amount} more for free shipping!',
    totalLabel: 'Total',
    contactToOrder: 'Contact to Order',
    continueShoppingLink: 'Continue Shopping',
    confirmAndSend: 'Confirm & Send',
    confirmSendDescription: 'To buy, contact us on WhatsApp or copy the summary and message us on your favorite social channel.',
    sendViaWhatsApp: 'Send via WhatsApp',
    copyOrderTextBtn: 'Copy order text',
    copied: 'Copied',
    copyOrderTextTitle: 'Copy order text for Instagram/Facebook DM.',
    copyOrderTextDescription: 'Paste this into any social DM if you prefer not to use WhatsApp.',
    pasteIntoSocialDM: 'Paste this into any social DM if you prefer not to use WhatsApp.',
    cancel: 'Cancel',
    whatsappNote: 'WhatsApp opens with the order prefilled. Update the WhatsApp number when ready.',
    copyOrderNote: 'You can also copy the order text and send it in any social DM.',
  },

  fr: {
    brandName: 'Embroidery Elegance',
    brandTagline: 'Luxe, savoir-faire et élégance dans chaque détail',
    home: 'Accueil',
    shop: 'Boutique',
    apparel: 'Vêtements',
    tShirts: 'T-Shirts',
    hoodies: 'Hoodies',
    workwearUniforms: 'Uniformes de Travail',
    babyKidsClothing: 'Vêtements Bébé & Enfants (Bodies)',
    homeDecor: 'Maison & Décor',
    embroideredFrames: 'Cadres Brodés',
    kidsFrames: 'Cadres Enfants',
    cushions: 'Coussins',
    wallDecor: 'Décor Murale',
    towels: 'Serviettes',
    napkins: 'Nappes Serviettes',
    businessEmbroidery: 'Broderie pour Entreprises',
    businessLogoEmbroidery: 'Broderie de Logo',
    dresses: 'Robes',
    tops: 'Chemises',
    skirts: 'Jupes',
    jackets: 'Vestes',
    about: 'À Propos',
    contact: 'Contact',
    admin: 'Admin',
    freeShipping: 'Livraison gratuite pour les commandes de plus de 150€ ✨',
    search: 'Rechercher',
    wishlist: 'Liste de Souhaits',
    account: 'Compte',
    cart: 'Panier',
    newCollection: 'Nouvelle Collection 2026',
    heroTitle1: 'Élégance en',
    heroTitle2: 'Fine Broderie',
    heroDescription: 'Découvrez notre collection soignée de vêtements magnifiquement brodés.',
    shopCollection: 'Parcourir la Collection',
    ourStory: 'Notre Histoire',
    browseBy: 'Parcourir par',
    categories: 'Catégories',
    curatedForYou: 'Sélectionné pour Vous',
    featuredCollection: 'Collection en Vedette',
    viewAll: 'Voir Tout',
    freeShippingTitle: 'Livraison Gratuite',
    freeShippingDesc: 'Livraison gratuite pour les commandes de plus de 150€',
    securePayment: 'Paiement Sécurisé',
    securePaymentDesc: 'Vos informations de paiement sont toujours protégées',
    easyReturns: 'Retours Faciles',
    easyReturnsDesc: 'Retours sans tracas dans les 30 jours',
    support24: 'Support 24/7',
    supportDesc: 'Équipe de support dédiée prête à vous aider',
    whatCustomersSay: 'Ce Que Disent Nos Clients',
    testimonials: 'Témoignages',
    newBadge: 'Nouveau',
    saleBadge: 'Solde',
    quickView: 'Aperçu Rapide',
    shopAll: 'Tous les Produits',
    shopDescription: 'Explorez notre collection soignée de vêtements magnifiquement brodés.',
    allProducts: 'Tous les Produits',
    priceRange: 'Gamme de Prix',
    filters: 'Filtres',
    showingProducts: 'Affichage de {count} produits',
    featured: 'En Vedette',
    newest: 'Plus Récent',
    priceLowHigh: 'Prix: Bas à Haut',
    priceHighLow: 'Prix: Haut à Bas',
    noProductsFound: 'Aucun produit trouvé',
    tryAdjustingFilters: 'Essayez d\'ajuster vos filtres',
    productNotFound: 'Produit Non Trouvé',
    backToShop: 'Retour à la Boutique',
    size: 'Taille',
    color: 'Couleur',
    quantity: 'Quantité',
    addToCart: 'Ajouter au Panier',
    freeShippingOver: 'Livraison gratuite pour les commandes de plus de 150€',
    easyReturns30: 'Retours faciles dans les 30 jours',
    secureCheckout: 'Paiement sécurisé',
    youMayAlsoLike: 'Vous Aimerez Peut-Être Aussi',
    pleaseSelectSizeColor: 'Veuillez sélectionner une taille et une couleur',
    addedToCart: 'ajouté au panier!',
    yourCartEmpty: 'Votre Panier est Vide',
    emptyCartMessage: 'Il semble que vous n\'ayez pas encore ajouté d\'articles à votre panier.',
    continueShopping: 'Continuer vos Achats',
    shoppingCart: 'Panier d\'Achat',
    clearCart: 'Vider le Panier',
    orderSummary: 'Résumé de la Commande',
    subtotal: 'Sous-total',
    shipping: 'Livraison',
    free: 'Gratuit',
    addMoreForFreeShipping: 'Ajoutez {amount}€ de plus pour la livraison gratuite!',
    total: 'Total',
    proceedToCheckout: 'Procéder au Paiement',
    ourStoryTitle: 'Notre Histoire',
    celebratingModesty: 'Célébrer la fine broderie avec élégance',
    aboutUs: 'À Propos de Nous',
    fashionHonorsValues: 'La Mode Qui Valorise la Qualité',
    aboutParagraph1: 'Gjilpera Magjike incarne le luxe et l\'artisanat raffiné. Chaque création est une déclaration de style et de sophistication.',
    aboutParagraph2: 'Notre mission est d\'offrir le luxe et la broderie exquise à une clientèle exigeante qui apprécie l\'exceptionnel.',
    aboutParagraph3: 'Matériaux nobles, design moderne et savoir-faire rare – pour ceux qui exigent l\'excellence.',
    countriesShipped: 'Pays Livrés',
    happyCustomers: 'Clients Satisfaits',
    qualityPromise: 'Promesse de Qualité',
    exploreCollection: 'Explorer Notre Collection',
    contactUs: 'Nous Contacter',
    contactDescription: 'Nous aimerions vous entendre.',
    sendMessage: 'Envoyer un Message',
    name: 'Nom',
    email: 'Email',
    subject: 'Objet',
    message: 'Message',
    yourName: 'Votre nom',
    yourEmail: 'Votre email',
    howCanWeHelp: 'Comment pouvons-nous vous aider?',
    yourMessage: 'Votre message',
    getInTouch: 'Entrez en Contact',
    contactInfo: 'Avez-vous une question sur nos produits?',
    address: 'Adresse',
    phone: 'Téléphone',
    businessHours: 'Heures d\'Ouverture',
    businessHoursText: 'Lundi - Vendredi: 9:00 - 18:00',
    messageSentSuccess: 'Merci pour votre message!',
    footerDescription: 'Luxe, élégance et qualité inégalée dans chaque détail.',
    quickLinks: 'Liens Rapides',
    customerService: 'Service Client',
    shippingReturns: 'Livraison et Retours',
    faq: 'FAQ',
    sizeGuide: 'Guide des Tailles',
    trackOrder: 'Suivre la Commande',
    privacyPolicy: 'Politique de Confidentialité',
    termsService: 'Conditions d\'Utilisation',
    allRightsReserved: 'Tous droits réservés.',
    pageNotFound: 'Page Non Trouvée',
    pageNotFoundMessage: 'La page que vous recherchez n\'existe pas.',
    returnHome: 'Retour à l\'Accueil',
    testimonial1: 'La qualité de la broderie est exceptionnelle.',
    testimonial2: 'J\'ai enfin trouvé une marque qui comprend la qualité!',
    testimonial3: 'Ma commande a dépassé mes attentes.',
    productDress1Name: 'Robe Brodée Verte',
    productDress1Desc: 'Robe verte élégante avec broderie.',
    productTop1Name: 'Chemise Brodée Premium',
    productTop1Desc: 'Chemise rose brodée luxueuse.',
    productDress2Name: 'Robe Noire avec Broderie Or',
    productDress2Desc: 'Robe noire avec broderie or.',
    productSkirt1Name: 'Jupe Brodée',
    productSkirt1Desc: 'Jupe verte fluide avec broderie.',
    productJacket1Name: 'Veste Brodée',
    productJacket1Desc: 'Belle veste crème avec broderie.',
    productTopSet: 'Ensemble de Chemises Brodées',
    productTopSetDesc: 'Ensemble de 3 chemises avec broderie.',
    productDress3Name: 'Robe Brodée Minimaliste',
    productDress3Desc: 'Robe simple avec broderie.',
    productJacket2Name: 'Veste de Voyage Luxe',
    productJacket2Desc: 'Veste compacte avec broderie.',
    dressesDesc: 'Robes élégantes pour toutes les occasions',
    topsDesc: 'Chemises premium avec fine broderie',
    skirtsDesc: 'Belles jupes pour les événements',
    jacketsDesc: 'Vestes modestes et stylées',
    addProductTitle: 'Ajouter un Nouveau Produit',
    productName: 'Nom du Produit',
    productPrice: 'Prix',
    productCategory: 'Catégorie',
    productDescription: 'Description',
    productImage: 'URL de l\'Image',
    addButton: 'Ajouter le Produit',
    products: 'Produits',
    // Custom Orders
    customEmbroideryTitle: 'Services de Broderie Personnalisée',
    customEmbroideryDescription: 'Vous ne trouvez pas ce que vous cherchez? Nous sommes spécialisés dans les commandes de broderie personnalisées adaptées à votre vision unique.',
    yourDesign: 'Votre Design',
    yourDesignDesc: 'Apportez vos propres idées, logos ou œuvres d\'art',
    weCollaborate: 'Nous Collaborons',
    weCollaborateDesc: 'Travaillez directement avec notre équipe pour perfectionner votre design',
    weCreate: 'Nous Créons',
    weCreateDesc: 'Transformez votre idée en belle réalité brodée',
    requestCustomOrder: 'Demander une Commande Personnalisée',
    browseCatalog: 'Parcourir le Catalogue',
    perfectForEvents: 'Parfait pour les cadeaux d\'entreprise, événements spéciaux ou projets personnels',
    // Updated Features
    payOnDelivery: 'Paiement à la Livraison',
    payOnDeliveryDesc: 'Paiement uniquement à la réception de votre produit',
    premiumQuality: 'Qualité Premium',
    premiumQualityDesc: 'Broderie artisanale avec des matériaux de haute qualité',
    response24h: 'Réponse en 24 Heures',
    response24hDesc: 'Nous répondons à toutes les demandes dans les 24 heures',
    // Contact Page
    contactPageTitle: 'Contactez-nous',
    contactPageDescription: 'Nous aimerions vous entendre. Contactez notre équipe pour toute question ou demande.',
    sendUsMessage: 'Envoyez-nous un Message',
    nameLabel: 'Nom',
    emailLabel: 'Email',
    subjectLabel: 'Objet',
    messageLabel: 'Message',
    namePlaceholder: 'Votre nom',
    emailPlaceholder: 'Votre email',
    subjectPlaceholder: 'Comment pouvons-nous vous aider?',
    messagePlaceholder: 'Votre message',
    sending: 'Envoi en cours...',
    sendMessageBtn: 'Envoyer le Message',
    getInTouchTitle: 'Entrez en Contact',
    getInTouchDescription: 'Avez-vous une question sur nos produits, la livraison ou les retours? Notre équipe de service client est là pour vous aider.',
    addressLabel: 'Adresse',
    addressText: 'Albania',
    phoneLabel: 'Téléphone',
    emailLabelText: 'example@email.com',
    businessHoursLabel: 'Heures d\'Ouverture',
    businessHoursDetails: 'Dimanche - Jeudi: 9h00 - 18h00\nVendredi - Samedi: Fermé',
    thankYouMessage: 'Merci pour votre message! Nous vous répondrons bientôt.',
    failedToSend: 'Échec de l\'envoi du message. Veuillez réessayer.',
    // Product Detail Page
    loadingProduct: 'Chargement du produit...',
    productNotFoundTitle: 'Produit Non Trouvé',
    backToShopLink: '← Retour à la Boutique',
    sizeLabel: 'Taille',
    colorLabel: 'Couleur',
    quantityLabel: 'Quantité',
    addToCartBtn: 'Ajouter au Panier',
    contactUsToBuy: 'Contactez-nous pour acheter',
    preferSocials: 'Vous préférez les réseaux sociaux? Contactez-nous directement:',
    instagram: 'Instagram',
    facebook: 'Facebook',
    emailContact: 'Email',
    youMayAlsoLikeTitle: 'Vous Aimerez Peut-Être Aussi',
    oneSize: 'Taille unique',
    standardColor: 'Standard',
    noDescriptionAvailable: 'Aucune description disponible',
    pleaseSelectSizeAndColor: 'Veuillez sélectionner une taille et une couleur',
    productAddedToCart: 'ajouté au panier',
    // Cart Page
    shoppingCartTitle: 'Panier d\'Achat',
    yourCartEmptyTitle: 'Votre Panier est Vide',
    cartEmptyMessage: 'Il semble que vous n\'ayez pas encore ajouté d\'articles à votre panier.',
    continueShoppingBtn: 'Continuer vos Achats',
    clearCartBtn: 'Vider le Panier',
    orderSummaryTitle: 'Résumé de la Commande',
    subtotalLabel: 'Sous-total',
    shippingLabel: 'Livraison',
    freeShippingText: 'Gratuit',
    addMoreForFreeShippingText: 'Ajoutez ${amount} de plus pour la livraison gratuite!',
    totalLabel: 'Total',
    contactToOrder: 'Contactez pour Commander',
    continueShoppingLink: 'Continuer vos Achats',
    confirmAndSend: 'Confirmer et Envoyer',
    confirmSendDescription: 'Pour acheter, contactez-nous sur WhatsApp ou copiez le résumé et envoyez-nous un message sur votre réseau social préféré.',
    sendViaWhatsApp: 'Envoyer via WhatsApp',
    copyOrderTextBtn: 'Copier le texte de la commande',
    copied: 'Copié',
    copyOrderTextTitle: 'Copiez le texte de la commande pour Instagram/Facebook DM.',
    copyOrderTextDescription: 'Collez ceci dans n\'importe quel DM social si vous préférez ne pas utiliser WhatsApp.',
    pasteIntoSocialDM: 'Collez ceci dans n\'importe quel DM social si vous préférez ne pas utiliser WhatsApp.',
    cancel: 'Annuler',
    whatsappNote: 'WhatsApp s\'ouvre avec la commande pré-remplie. Mettez à jour le numéro WhatsApp lorsque vous êtes prêt.',
    copyOrderNote: 'Vous pouvez également copier le texte de la commande et l\'envoyer dans n\'importe quel DM social.',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const useTranslation = () => {
  const { t } = useLanguage();
  return { t };
};
