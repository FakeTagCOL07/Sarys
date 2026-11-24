/* =====================================================================
   FOR YOU · script.js  (noche de bayou)
   - Lógica original conservada: vistas, ojo 👀, regalo, carrusel, mensaje,
     sobre de 100 razones + pizarra, 9 reproductores con letra y candado.
   - Nuevo: luciérnagas en canvas, halo de la estrella Evangeline, paralaje,
     estados sincronizados (.is-playing), gestor de modales, MediaSession,
     swipe táctil. Todo pensado para móvil (pausa en segundo plano, fps
     adaptativo, un solo canvas, sin layout thrashing).
   ===================================================================== */
(function () {
'use strict';

/* ==================== DATOS ORIGINALES (copiados tal cual) ==================== */
const reasons = [
  "Tu sonrisa 😊",
  "Tu mirada ✨",
  "Tu risa 😄",
  "Tu corazón 💖",
  "Tu amor ❤",
  "Tu ternura 🧸",
  "Tu calma",
  "Tu voz",
  "Tus abrazos 🤗",
  "Tu presencia ✨",
  "Tu apoyo 💪",
  "Tu dulzura 🍯",
  "Tu paciencia 🌱",
  "Tu cariño 💛",
  "Tu forma de amar 💘",
  "Tu esencia 🌸",
  "Tu luz ✨",
  "Tu compañía 🌹",
  "Tu lealtad 🔐",
  "Tu sinceridad 🤍",
  "Tu tiempo ⏳",
  "Tu cuidado 🌷",
  "Tu conexión 💕",
  "Tu manera de quedarte",
  "Tu calor 🔥",
  "Tu amor bonito 💕",
  "Tu tranquilidad 🌊",
  "Tu compromiso 💖",
  "Tu nobleza ✨",
  "Tu forma de mirarme 😍",
  "Tu forma de escuchar 👂",
  "Tu bondad 🌸",
  "Tu interés 🥺",
  "Tu atención 👀",
  "Tu comprensión 🫂",
  "Tu respeto",
  "Tu manera de hablarme 💬",
  "Tu constancia ⏱",
  "Tu empatía 🤍",
  "Tu romanticismo 🌹",
  "Tu ternura diaria 💕",
  "Tu apoyo constante 🛡",
  "Tu forma de estar 🌙",
  "Tu sensibilidad 💗",
  "Tu confianza 👌",
  "Tu estabilidad 🌿",
  "Tu forma de cuidar 💛",
  "Tu honestidad 💎",
  "Tu cercanía 🫂",
  "Tu amor real ❤‍🔥",
  "Tu manera de querer 🥰",
  "Tu forma de elegir 💕",
  "Tu conexión emocional 🔗",
  "Tu cariño sincero 💖",
  "Tu sonrisa espontánea 😌",
  "Tu mirada bonita ✨",
  "Tu forma de abrazar 🤗",
  "Tu forma de calmar",
  "Tu dedicación",
  "Tu presencia diaria 🌙",
  "Tu apoyo incondicional ❤",
  "Tu paciencia infinita",
  "Tu atención verdadera",
  "Tu forma de proteger 🤍",
  "Tu dulzura constante",
  "Tu energía bonita",
  "Tu compañía sincera 🌹",
  "Tu manera de amar",
  "Tu forma de quedarte",
  "Tu forma de cuidarnos 💛",
  "Tu manera de entender",
  "Tu forma de sostener",
  "Tu forma de dar",
  "Tu paz 😌",
  "Tu hogar",
  "Tu refugio 🤍",
  "Tu forma de amar sin miedo 💖",
  "Tu forma de estar conmigo ✨",
  "Tu mirada con amor",
  "Tu forma de hacerme sentir 💝",
  "Tu corazón bonito 💫",
  "Tu forma de sanar",
  "Tu forma de sumar",
  "Tu manera de acompañar",
  "Tu forma de compartir 🌸",
  "Tu manera de elegirme",
  "Tu honestidad emocional 🤍",
  "Tu constancia real",
  "Tu entrega 💖",
  "Tu compromiso 💖",
  "Tu paz diaria 🌙",
  "Tu luz en mis días",
  "Tu amor sincero ❤",
  "Tu amor bonito 💕",
  "Tu amor constante",
  "Tu presencia 💛",
  "Tu cariño 💖",
  "Tu amor ✨",
  "Tu esencia 💫",
  "Todo de ti, Dulce 💖✨"
];
const reason101 = "Ninguna, porque mi lugar, mi calma y mi corazón siempre eligen quedarse contigo 💖";
const photos = [
  {
    url: "https://i.ibb.co/fd6wj0dd/Imagen-de-Whats-App-2025-12-18-a-las-11-03-39-45fd3d9c.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/r2bWmwZn/Imagen-de-Whats-App-2025-12-18-a-las-11-03-39-858ab1e0.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/FqJ4mYyR/Imagen-de-Whats-App-2025-12-18-a-las-11-03-38-822aa8b4.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/wF4xn6h8/Imagen-de-Whats-App-2025-12-18-a-las-11-03-37-96bbf874.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/VptHvdtn/Imagen-de-Whats-App-2025-12-18-a-las-11-03-38-13ff7fd2.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/xtV9Xp9b/Imagen-de-Whats-App-2025-12-18-a-las-11-03-36-ddd9d80c.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/mWXXWsg/Imagen-de-Whats-App-2025-12-18-a-las-11-03-37-629bb86d.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/cXhnd09G/Imagen-de-Whats-App-2025-12-18-a-las-11-03-38-c3b8a98b.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/DHjbqzCm/Imagen-de-Whats-App-2025-12-18-a-las-11-03-40-178ba809.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/qM2s8ybF/Imagen-de-Whats-App-2025-12-18-a-las-11-03-34-84c85c80.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/jPSvvXYL/Imagen-de-Whats-App-2025-12-18-a-las-11-03-35-dfff2045.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/TD6HwYmY/Imagen-de-Whats-App-2025-12-18-a-las-11-03-40-51be0e6e.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/Nggr2gsr/Imagen-de-Whats-App-2025-12-18-a-las-11-03-34-733a6949.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/TMFJZMRL/Imagen-de-Whats-App-2025-12-18-a-las-09-35-51-e48dc717.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/FkJz0XqK/Imagen-de-Whats-App-2025-12-18-a-las-09-35-52-0cfe9eb6.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/prdv5p3T/Imagen-de-Whats-App-2025-12-18-a-las-09-35-51-6d1710fc.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/Q3StNLh9/Imagen-de-Whats-App-2025-12-18-a-las-09-35-51-53078742.jpg",
    caption: "Sarys"
  },
  {
    url: "https://i.ibb.co/6ChhpmX/Imagen-de-Whats-App-2025-12-18-a-las-09-35-50-3fc8180a.jpg",
    caption: "Sarys"
  }
];
const yourMessage = `Hola Sarita, feliz cumpleaños 🤍

No sé cuándo mirarás esto, pero sé que lo harás.
No quería mostrarte esto de cualquier forma; quería que fuera un momento solo para nosotros, que lo vieras con calma y, sobre todo, poder mirarte a los ojos mientras lo lees.

Nunca te dije un apodo, pero en mi mente siempre te decía cielo.
Porque en ti encuentro todo lo que encuentro cuando miro hacia arriba.

De día, eres esa claridad que tranquiliza, esa sensación de calma que se siente al verte, al escucharte, al estar contigo.
En el atardecer, eres ese calor suave que se queda cuando estamos cerca, cuando nos tocamos, nos besamos y nos miramos.
Y en la noche, incluso cuando no estás, sigues siendo esa luz que brilla en mi corazón, ese instante en el que te apareces y te quedas en mis sueños.

Esos momentos, esos contactos, esas miradas, esos besos, esas mordidas, son la razón por la que vale la pena amar a alguien, y esa eres tú.

Sé que estás a punto de empezar una etapa nueva, y no tengo dudas de que lo harás con esa sensibilidad y fuerza que te hacen tan tú.

La vida da muchas vueltas, y esas vueltas me gustaría darlas a tu lado: apoyarte en tus decisiones, escucharte cuando quieras desahogarte y estar ahí.
Siempre te escucharé, siempre te veré y siempre te amaré.

Feliz cumpleaños, cielo mío ♥ 🤍`;
const thoughts = [
    "no lo planeé",
    "me di cuenta tarde",
    "esto también me pasa",
    "ahí empezó todo",
    "no fue solo atracción",
    "me quedé",
    "sin darme cuenta"
];
const LYRICS = {
  explicale: [
    { time: 0, text: "♪" },
    { time: 5, text: "yeah-yeah-yeah" },
    { time: 6, text: "♪" },
    { time: 8, text: "Yeah" },
    { time: 10, text: "oh-oh-oh" },
    { time: 12, text: "♪" },
    { time: 15, text: "eh" },
    { time: 16, text: "Explícale lo que sientes cuando estás desnuda" },
    { time: 20, text: "Dile que sólo conmigo el corazón desnuda" },
    { time: 24, text: "La cama empieza tendida y quedará desnuda" },
    { time: 28, text: "Cómo te tiemblan las piernas y cómo el cuerpo te suda" },
    { time: 31, text: "Explícale lo que sientes cuando estás desnuda" },
    { time: 35, text: "Dile que sólo conmigo el corazón desnuda" },
    { time: 39, text: "La cama empieza tendida y quedará desnuda" },
    { time: 43, text: "Cómo te tiemblan las piernas y cómo el cuerpo te suda" },
    { time: 47, text: "Yo no soy Carlos Vives Pero quiero que te montes en mi bicicleta" },
    { time: 52, text: "Le damo' la vuelta al planeta Dime en qué país quieres que te lo meta" },
    { time: 56, text: "Explícale que conmigo te sientes completa" },
    { time: 60, text: "Que yo sí te hago venir hasta que el totito se te aprieta" },
    { time: 63, text: "Dile que ya se acabó, que mi nombre en tu piel se grabó" },
    { time: 67, text: "Y ahora tú estás con el bo', que no te alza la voz" },
    { time: 72, text: "Periódico de ayer como dijo Lavoe" },
    { time: 76, text: "Dile que fui yo el que entró pa' tu cuarto y te robó, yeh" },
    { time: 80, text: "Explícale, que te gusta cómo te lo hago" },
    { time: 84, text: "Ve y cuéntale que conmigo en la movie to' pago" },
    { time: 87, text: "Que tú no eres mujer de ser infiel" },
    { time: 91, text: "Pero que te cansaste y no quieres con él" },
    { time: 95, text: "Explícale lo que sientes cuando estás desnuda" },
    { time: 99, text: "Dile que sólo conmigo el corazón desnuda" },
    { time: 103, text: "La cama empieza tendida y quedará desnuda" },
    { time: 107, text: "Cómo te tiemblan las piernas y cómo el cuerpo te suda" },
    { time: 110, text: "Explícale lo que sientes cuando estás desnuda" },
    { time: 114, text: "Dile que sólo conmigo el corazón desnuda" },
    { time: 118, text: "La cama empieza tendida y quedará desnuda" },
    { time: 122, text: "Cómo te tiemblan las piernas y cómo el cuerpo te suda" },
    { time: 127, text: "Y ese momento en que yo, todo te lo hago olvidar" },
    { time: 131, text: "Y es que conmigo tú sientes como que el tiempo se para" },
    { time: 134, text: "Dile que mientes cuando estás sin ropa" },
    { time: 137, text: "Dile lo que te hago sentir, que ya no puedes fingir" },
    { time: 142, text: "Y que conmigo tú te vuelvas loca" },
    { time: 146, text: "No lo puedes resistir, se volverá a repetir" },
    { time: 149, text: "Explícale que en la cama lo íntimo no es igual" },
    { time: 153, text: "Confiésale que cambiaste tu forma de pensar" },
    { time: 158, text: "Explícale lo que sientes cuando estás desnuda" },
    { time: 162, text: "Dile que sólo conmigo el corazón desnuda" },
    { time: 166, text: "La cama empieza tendida y quedará desnuda" },
    { time: 170, text: "Cómo te tiemblan las piernas y cómo el cuerpo te suda" },
    { time: 173, text: "Explícale lo que sientes cuando estás desnuda" },
    { time: 177, text: "Dile que sólo conmigo el corazón desnuda" },
    { time: 182, text: "La cama empieza tendida y quedará desnuda" },
    { time: 185, text: "Cómo te tiemblan las piernas y cómo el cuerpo te suda" },
    { time: 190, text: "Bad Bunny Baby!" },
    { time: 195, text: "Update Yandel" },
    { time: 198, text: "Hea♪r this music" },
    { time: 203, text: "DJ Luain! Mambo Kings!" },
    { time: 208, text: "Yandel" },
    { time: 212, text: "♪" },
  ],
  besame: [
  { time: 0, text: "♪" }, // [00:00:00]
  { time: 45, text: "hoy no quiero que digas ni una palabra" }, // [00:00:48]
  { time: 48, text: "tus labios cerrados van a ser más que suficiente" }, // [00:00:50]
  { time: 51, text: "quiero que te relajes tu mente abras" }, // [00:00:53]
  { time: 53, text: "te acerques a mi y que luego me beses lentamente" }, // [00:00:55]
  { time: 57, text: "deja que el momento fluya como las olas" }, // [00:00:58]
  { time: 59, text: "que tus gemidos retumben en la casa sola" },
  { time: 62, text: "que quieras que yo te quiera cantar muchas rolas" },// [00:01:01]
  { time: 65, text: "y que te vayas cuando florezcan las amapolas" }, // [00:01:03]
  { time: 68, text: "olelo ley lele-lay" }, // [00:01:06]
  { time: 71, text: "olelo ley lele-lay" }, // [00:01:09]
  { time: 73, text: "y dice así" }, // [00:01:11]
  { time: 74, text: "olelo ley lele-lay" }, // [00:01:13]
  { time: 76, text: "olelo ley lele-lay" }, // [00:01:17]
  { time: 78, text: "y dice así" }, // [00:01:19]
  { time: 79, text: "amo cuando dices mi nombre desesperada" }, // [00:01:22]
  { time: 82, text: "la cama suena mientras tú casi rompes la almohada" }, // [00:01:25]
  { time: 85, text: "disfruto que seas mía aunque tú novio te llamaba" }, // [00:01:27]
  { time: 88, text: "para verificar que hacías y no contestabas" }, // [00:01:29]
  { time: 91, text: "porque no importa lo demás" }, // [00:01:32]
  { time: 93, text: "ma na-na-na-na-na-na" }, // [00:01:34]
  { time: 94, text: "solo importa nuestro momento" }, // [00:01:37]
  { time: 96, text: "acércate y no pienses más" }, // [00:01:39]
  { time: 98, text: "na-na-na-na-na-na" }, // [00:01:42]
  { time: 99, text: "sabes que te encanto y que yo no miento" }, // [00:01:44]
  { time: 102, text: "tú piel blanquita me incita" }, // [00:01:47]
  { time: 103, text: "a decirte cosas bonitas" }, // [00:01:49]
  { time: 105, text: "pues tu belleza infinita" }, // [00:01:51]
  { time: 106, text: "ninguna otra te la quita" }, // [00:01:53]
  { time: 108, text: "tú eres la rosa marchita" }, // [00:01:56]
  { time: 109, text: "por la que el cora' palpita" }, // [00:01:58]
  { time: 110, text: "y si tú sigues a mi lado" }, // [00:02:01]
  { time: 112, text: "más na' me debilita" }, // [00:02:03]
  { time: 113, text: "me tienes mal" }, // [00:02:06]
  { time: 114, text: "me tienes mal" }, // [00:02:09]
  { time: 115, text: "me tienes mal" }, // [00:02:15]
  { time: 116, text: "me tienes mal" }, // [00:02:20]
  { time: 116, text: "no sé ni que me está pasando" }, // [00:02:22]
  { time: 119, text: "pero no voy a ver atrás" }, // [00:02:26]
  { time: 120, text: "ya comenzamos a soñar así que mejor sigamos soñando" }, // [00:02:29]
  { time: 124, text: "uoh" }, // [00:02:32]
  { time: 126, text: "no" }, // [00:02:34]
  { time: 127, text: "no-no-na-na" }, // [00:02:37]
  { time: 128, text: "na" }, // [00:02:39]
  { time: 129, text: "acércate a mí" }, // [00:02:42]
  { time: 130, text: "(acércate a mí)" }, // [00:02:45]
  { time: 132, text: "bésame sin sentir" }, // [00:02:46]
  { time: 133, text: "(bésame sin sentir)" }, // [00:02:49]
  { time: 134, text: "que si sentimos vamos a morir" }, // [00:02:51]
  { time: 136, text: "uoh" }, // [00:02:32]
  { time: 140, text: "no puede ser así" }, // [00:02:57]
  { time: 142, text: "(no puede ser así)" },
  { time: 143, text: "querernos es finjir" },// [00:03:00]
  { time: 145, text: "que nunca vamos a pasar de allí" }, // [00:03:02]
  { time: 147, text: "nunca me había sentido tan libre de compromiso" }, // [00:03:03]
  { time: 150, text: "y a la vez tan atado por tus caderas al piso" }, // [00:03:05]
  { time: 153, text: "no sé si es obra de tus labios o tu pelo liso" }, // [00:03:10]
  { time: 156, text: "esta cuestión que me causaste parece un hechizo" }, // [00:03:14]
  { time: 158, text: "y no me mires más, ya no me maltrates" }, // [00:03:19]
  { time: 161, text: "sal de mi mente de la forma en la que entraste" }, // [00:03:22]
  { time: 164, text: "quiero jugar contigo al igual que antes" }, // [00:03:25]
  { time: 167, text: "pero siento que ahora corro el riesgo de enamorame" }, // [00:03:28]
  { time: 170, text: "o enamorarte" }, // [00:03:31]
  { time: 171, text: "pues quiero confesarte" }, // [00:03:34]
  { time: 172, text: "que tus ojos brillantes son luces navegantes" }, // [00:03:37]
  { time: 175, text: "donde yo me metí y juré no olvidarte" }, // [00:03:41]
  { time: 178, text: "y por no hacerlo ahora de mi mente no puedo sacarte" }, // [00:03:45]
  { time: 182, text: "dime que me causaste" }, // [00:03:48]
  { time: 185, text: "na na-na-na" }, // [00:03:50]
  { time: 188, text: "dime que me causaste" }, // [00:03:52]
  { time: 192, text: "no no no-no-no-no" }, // [00:04:16]
  { time: 196, text: "acércate a mí" }, // [00:02:42]
  { time: 198, text: "(acércate a mí)" }, // [00:02:45]
  { time: 199, text: "bésame sin sentir" }, // [00:02:46]
  { time: 200, text: "(bésame sin sentir)" }, // [00:02:49]
  { time: 201, text: "que si sentimos vamos a morir" },
  { time: 204, text: "no no no-no-no-no no" },// [00:02:51]
  { time: 208, text: "no puede ser así" }, // [00:02:57]
  { time: 209, text: "(no puede ser así)" },
  { time: 211, text: "querernos es finjir" },// [00:03:00]
  { time: 213, text: "que nunca vamos a pasar de allí" },
  { time: 216, text: "que nunca vamos a pasar de allí" },
  { time: 219, text: "que nunca vamos a pasar de allí" },
  { time: 221, text: "que nunca vamos a pasar de allí" },
  { time: 222, text: "querernos es finjir" },
  { time: 224, text: "que nunca vamos a pasar de allí" },
  { time: 227, text: "♪" },
  ],
  sancocho: [
  { time: 0, text: "♪" }, // [00:00:00]
  { time: 1, text: "hey" }, // [00:00:48]
  { time: 2, text: "bailando en la calle como 'Lost Boyz'" }, // [00:00:50]
  { time: 4, text: "aquí no hay chimeneas las neas son Santa Claus" }, // [00:00:53]
  { time: 7, text: "los niños ya no creen en los reyes magos" }, // [00:00:55]
  { time: 10, text: "sólo esperan cada año a los Alcolirykoz" }, // [00:00:58]
  { time: 12, text: "(hey, yo!)" },
  { time: 13, text: "trajimos oro, incienso y 'mi-Rap'" },// [00:01:01]
  { time: 15, text: "prenda el fogón, que rueden las birras" }, // [00:01:03]
  { time: 18, text: "leña pa'l carbón y a rozar hebilla," }, // [00:01:06]
  { time: 21, text: "bin, bon, ban, qué turra" }, // [00:01:09]
  { time: 24, text: "detectamos la clase turista" }, // [00:01:11]
  { time: 26, text: "cuando no entiende si les digo que tin, que tan" }, // [00:01:13]
  { time: 29, text: "no hay traducción: criminal slang," }, // [00:01:17]
  { time: 31, text: "mute pa'l soplón, lavamos plata sin soflán" }, // [00:01:19]
  { time: 35, text: "no son marihuaneros mi compay" }, // [00:01:22]
  { time: 37, text: "a esta esquina le decimos la zona Wi-Fi" }, // [00:01:25]
  { time: 40, text: "un chorro de cuenta del chirrete" }, // [00:01:27]
  { time: 42, text: "cubran al parcero, se le juntaron los fletes" }, // [00:01:29]
  { time: 44, text: "sancocho, papa y yuca," }, // [00:01:32]
  { time: 46, text: "grillas y grilletes" }, // [00:01:34]
  { time: 47, text: "ella salió del Buen Pastor y farrea con brazalete," }, // [00:01:37]
  { time: 51, text: "diciembre me compete a mí," }, // [00:01:39]
  { time: 52, text: "la carne pa' llevar," }, // [00:01:42]
  { time: 53, text: "despues de 'Quién Va' les queda grande el beef" }, // [00:01:44]
  { time: 55, text: "no paran de reír," }, 
  { time: 57, text: "las hienas están en Aranjuez" }, // [00:01:47]
  { time: 60, text: "en la 9-2 hay un retén," },
  { time: 62, text: "te van a poner a perder" }, // [00:01:49]
  { time: 65, text: "(qué piojero)" }, // [00:01:51]
  { time: 66, text: "Robin Hood, si vienes te van a robar" }, // [00:01:53]
  { time: 70, text: "vacuna pa' los cerdos no hay" }, // [00:01:56]
  { time: 73, text: "que le merme que va a amanecer, que bla, bla, bla" }, // [00:01:58]
  { time: 77, text: "" }, // [00:02:01]
  { time: 85, text: "volumen," }, // [00:02:03]
  { time: 86, text: "aquí nos gusta el alboroto, como los topos, felices en este roto" }, // [00:02:06]
  { time: 90, text: "los ricos en diciembre se van" }, // [00:02:09]
  { time: 92, text: "y nosotros no cambiamos por nada el rancho de la abuela el 24" }, // [00:02:15]
  { time: 97, text: "de Manrique a Campoloco," }, // [00:02:20]
  { time: 99, text: "cucho, Aranjuez te queda choto," }, // [00:02:22]
  { time: 102, text: "la calle en bajada," }, // [00:02:26]
  { time: 103, text: "vivimos bacaneados" }, // [00:02:29]
  { time: 105, text: "nadie aguanta hambre, comen callados," }, // [00:02:32]
  { time: 107, text: "sornero, sin tanta cháchara" }, // [00:02:34]
  { time: 109, text: "el fierro con Amparo, si viene Laura, no azara" }, // [00:02:37]
  { time: 110, text: "na" }, // [00:02:39]
  { time: 113, text: "(¡pagále pieza!)" }, // [00:02:42]
  { time: 114, text: "exclamó la princesa" }, // [00:02:45]
  { time: 115, text: "con la decencia de Octavio Mesa" }, // [00:02:46]
  { time: 117, text: "faltan 5 pa' las 12" }, // [00:02:49]
  { time: 119, text: "le digo feliz año a todo el mundo en cada roce" }, // [00:02:51]
  { time: 122, text: "fritando en cacerola al presidente" }, // [00:02:32]
  { time: 125, text: "a todo marracho le llega su diciembre" }, // [00:02:57]
  { time: 127, text: "no paran de reír," }, 
  { time: 129, text: "las hienas están en Aranjuez" }, // [00:01:47]
  { time: 132, text: "en la 9-2 hay un retén," },
  { time: 134, text: "te van a poner a perder" }, // [00:01:49]
  { time: 137, text: "(qué piojero)" }, // [00:01:51]
  { time: 138, text: "Robin Hood, si vienes te van a robar" }, // [00:01:53]
  { time: 142, text: "vacuna pa' los cerdos no hay" }, // [00:01:56]
  { time: 145, text: "que le merme que va a amanecer, que bla, bla, bla" },
  { time: 148, text: "no paran de reír," }, 
  { time: 150, text: "las hienas están en Aranjuez" }, // [00:01:47]
  { time: 153, text: "en la 9-2 hay un retén," },
  { time: 156, text: "te van a poner a perder" }, // [00:01:49]
  { time: 158, text: "(qué piojero)" }, // [00:01:51]
  { time: 159, text: "Robin Hood, si vienes te van a robar" }, // [00:01:53]
  { time: 164, text: "vacuna pa' los cerdos no hay" }, // [00:01:56]
  { time: 166, text: "que le merme que va a amanecer, que bla, bla, bla" },
  ],
  media: [
  { time: 0, text: "♪" },
  { time: 23, text: "si estamos los dos en un mismo cuarto" },
  { time: 27, text: "el cielo no se ve tan alto" },
  { time: 29, text: "aquí está" },
  { time: 30, text: "mi corazón" },
  { time: 31, text: "dentro de un frasco" },
  { time: 34, text: "sin tí, ¿que soy yo? un disfráz barato" },
  { time: 36, text: "contigo soy yo, tú el motor del barco" },
  { time: 39, text: "si te tiras de un barranco detrás tuyo salto" },
  { time: 44, text: "puedo ser tu estrella" },
  { time: 48, text: "y tú mi media luna" },
  { time: 50, text: "mi tesoro mi fortuna" },
  { time: 53, text: "yo puedo ser tu estrella" },
  { time: 59, text: "tú mi media luna" },
  { time: 61, text: "mi tesoro mi fortuna" },
  { time: 64, text: "tus ojos ciérralos" },
  { time: 69, text: "el miedo entierralo" },
  { time: 72, text: "yo sé que sin darnos cuenta" },
  { time: 76, text: "esto escaló" },
  { time: 78, text: "y, ¿pa' qué negarlo?" },
  { time: 82, text: "si tu también sentiste mariposas en tu ombligo" },
  { time: 86, text: "la noche aquella en la que nos unió el destino" },
  { time: 92, text: "si es pa' siempre, ¿donde firmo? " },
  { time: 94, text: "aunque esto no lo aguanta un papel" },
  { time: 98, text: "cuando estás suelo brillar, si te vas empieza a llover" },
  { time: 104, text: "y si pudiera el tiempo retroceder" },
  { time: 108, text: "regreso a cuando te dije: 'Te vo'a besar si me miras así otra ve'"},
  { time: 116, text: "otra ve'" },
  { time: 119, text: "otra ve'" },
  { time: 121, text: "otra ve'" },
  ],
  noche: [
    { time: 0, text: "♪" },
    { time: 14, text: "Ay, cómo lo hace'" },
    { time: 16, text: "con tus caderas tas buscando que pase" },
    { time: 20, text: "dame la mano y que pase lo que pase" },
    { time: 23, text: "tienes la habilidad de llevarne a donde vas" },
    { time: 27, text: "pa hacerme llegar a las alturas como nadie más" },
    { time: 32, text: "ven, dame una noche, una noche de calor" },
    { time: 35, text: "con tu cuerpo encantador" },
    { time: 36, text: "pa que te lleves mi olor" },
    { time: 40, text: " si no me conoces, soy tu próximo amor" },
    { time: 44, text: "de la noche, el ganador" },
    { time: 45, text: "solo dime, por favor" },
    { time: 48, text: "Ay, cómo lo hace'" },
    { time: 50, text: "con tus caderas tas buscando que pase" },
    { time: 54, text: "dame la mano y que pase lo que pase" },
    { time: 57, text: "tienes la habilidad de llevarne a donde vas" },
    { time: 61, text: "pa hacerme llegar a las alturas como nadie más" },
    { time: 65, text: "llevo días perdido en tí" },
    { time: 67, text: "desde ese día que te ví" },
    { time: 69, text: "no sabías que querías y yo tampoco" },
    { time: 71, text: "les dí mucho y devolvieron poco" },
    { time: 73, text: "y ahora que te conocí" },
    { time: 75, text: "encontré to lo que quería" },
    { time: 77, text: "dime tú si te atrevería'" },
    { time: 79, text: "pa que me des la fórmula" },
    { time: 82, text: "dame los secretos de tu cuerpo, los puedo guardar" },
    { time: 85, text: "algo te distingue, tú no eres regular" },
    { time: 89, text: "no tienes idea cuánto quiero tus besos, besos, besos" },
    { time: 95, text: "ven, dame una noche, una noche de calor" },
    { time: 98, text: "con tu cuerpo encantador" },
    { time: 100, text: "pa que te lleves mi olor" },
    { time: 103, text: " si no me conoces, soy tu próximo amor" },
    { time: 106, text: "de la noche, el ganador" },
    { time: 108, text: "solo dime, por favor" },
    { time: 111, text: "Ay, cómo lo hace'" },
    { time: 114, text: "y que pase lo que pase" },
    { time: 118, text: "pegaítos mejor nos vemos" },
    { time: 121, text: "una noche, una noche" },
    { time: 123, text: "dame la mano y que pase lo que pase" },
    { time: 126, text: "pa que me des la fórmula" },
    { time: 129, text: "dame los secretos de tu cuerpo, los puedo guardar" },
    { time: 133, text: "algo te distingue, tú no eres regular" },
    { time: 136, text: "no tienes idea cuánto quiero tus besos, besos, besos" },
    { time: 142, text: "ven, dame una noche, una noche de calor" },
    { time: 145, text: "con tu cuerpo encantador" },
    { time: 147, text: "pa que te lleves mi olor" },
    { time: 150, text: " si no me conoces, soy tu próximo amor" },
    { time: 153, text: "de la noche, el ganador" },
    { time: 155, text: "solo pido, por favor" },
    { time: 158, text: "ay, dame una noche" },
    { time: 161, text: "ay, solo una noche" },
    { time: 164, text: "ven, que te invito una noche por la ciudad" },
    { time: 168, text: "♪" },
    { time: 173, text: "y que sea espectactular" },
  ],
  fantasia: [
    { time: 0, text: "♪" },
    { time: 19, text: "mami, yo tengo un par de fantas+ia' que solo prova usted" },
    { time: 24, text: "te las voy a decir pa' que las cumplamo' cuando nos volamo' a ver" },
    { time: 29, text: "quiero darte agresivo y a la misma vez bien lento" },
    { time: 32, text: "besarte los lunare', las estria', los defecto'" },
    { time: 34, text: "aunque ni sé por qué yo dije 'defectos', to' lo tuyo e' perfecto " },
    { time: 39, text: "tengo fantasía'" },
    { time: 42, text: "de comerte, besarte, chingarte to' el día" },
    { time: 46, text: "aunque no ere' de nadie, bebé, tú ere' mía" },
    { time: 52, text: "sé que tiene' tus trauma', pero en mí confía, confía" },  
    { time: 58, text: "tengo fantasía" },
    { time: 62, text: "de comerte, besarte, chingarte to' el día" },
    { time: 67, text: "aunque no ere' de nadie, bebé, tú ere' mía" },
    { time: 72, text: "sé que tiene' tus trauma', pero en mí confía, confía" }, 
    { time: 80, text: "toy adicto y ni te he visto" },
    { time: 82, text: "..." },
    { time: 86, text: "me perdí en tu laberinto" },
    { time: 88, text: "dice' que esto no conviene, pero ya de ti no salgo" },
    { time: 91, text: "dime, ¿qué cuesta intentarlo?" },
    { time: 93, text: "tú ere' mía para siempre y lo digo en voz alta" },
    { time: 95, text: "porque voy a manifestarlo" },
    { time: 97, text: "esa e' mi loca, el precio de ella vale ma' de lo que valgo" },
    { time: 100, text: "dime qué tú hace' vamos a verno'" },
    { time: 103, text: "yo le llego si te quiere' venir" },
    { time: 106, text: "en verdad yo no sé si es un error" },
    { time: 109, text: "..." },
    { time: 111, text: "dicen que este mundo e' el infierno" },
    { time: 113, text: "se nota que ello' no saben de tí" },
    { time: 116, text: "será tanta la suerte que tengo" },
    { time: 118, text: "que tú siente' lo mismo que yo estoy sintiendo" },
    { time: 121, text: "tengo fantasía" },
    { time: 125, text: "de comerte, besarte, chingarte to' el día" },
    { time: 129, text: "aunque no ere' de nadie, bebé, tú ere' mía" },
    { time: 134, text: "sé que tiene' tus trauma', pero en mí confía, confía" },
    { time: 141, text: "tengo fantasía" },
    { time: 144, text: "de comerte, besarte, chingarte to' el día" },
    { time: 149, text: "aunque no ere' de nadie, bebé, tú ere' mía" },
    { time: 155, text: "sé que tiene' tus trauma', pero en mí confía, confía" },
  ],
  capi: [
    { time: 0, text: "♪" },
    { time: 13, text: "no hay un nivel para el final" },
    { time: 18, text: "si mencionan tu nombre, me desenfoco"},
    { time: 22, text: "nunca lo hicimos, pero por poco"},
    { time: 25, text: "botella llena y el corazón roto"},
    { time: 28, text: "ella es una de una, se ve en su rostro"},
    { time: 32, text: "llévame pa la capital, tu país quiero conocer"},
    { time: 35, text: "yo contigo quiero explorar, dime qué es lo que vamos a hacer"},
    { time: 38, text: "yo tus labios quiero besar, blanquita linda, no sé que fue"},
    { time: 41, text: "de lejos te empiezo a rezar y no pienso perder la fe"},
    { time: 44, text: "suena tu nombre y me desenfoco"},
    { time: 47, text: "nunca lo hicimos, pero por poco"},
    { time: 51, text: "botella llena y el corazón roto"},
    { time: 53, text: "ella es una de una, se ve en su rostro"},
    { time: 58, text: "se dice que el pasar del tiempo, ni que las heridas sana"},  
    { time: 61, text: "yo te llevo en mis pensamientos, ella se ve una nena sana"},
    { time: 64, text: "ay, mami chula, no te miento, a mí me enamoró la fama"},    
    { time: 67, text: "pero si es por tí la suelto, uno no se afana"},
    { time: 70, text: "una diosa, yo se lo he dicho"},
    { time: 73, text: "quiero cumplirle, todos sus caprichos"},
    { time: 76, text: "sus fantasías y su anhelo"},
    { time: 79, text: "si tú me dejas, te hago gemelos"},
    { time: 82, text: "te ves intelectual hasta sin los espejuelos"},
    { time: 85, text: "si tuviera el poder, juro que el tiempo lo congelo"},
    { time: 89, text: "pa pasarlo contigo, yo tú lo considero"},
    { time: 92, text: "peluches y Ferrero, aunque no sea febrero, yeah"},
    { time: 96, text: "no hay otro nivel, tú eres el final"},
    { time: 100, text: "se expresa genuina, es original"},
    { time: 103, text: "no hay otro nivel, tú eres el final"},
    { time: 106, text: "Tu cuerpo de guitarra y yo quiero afinar"},
    { time: 108, text: "llévame pa la capital, tu país quiero conocer"},
    { time: 112, text: "yo contigo quiero explorar, dime qué es lo que vamos a hacer"},
    { time: 115, text: "yo tus labios quiero besar, blanquita linda, no sé que fue"},
    { time: 118, text: "de lejos te empiezo a rezar y no pienso perder la fe"},
    { time: 128, text: "no hay otro nivel, tú eres el final"},
    { time: 132, text: "♪"},
    { time: 148, text: "si mencionan tu nombre, me desenfoco"},
    { time: 151, text: "nunca lo hicimos, pero por poco"},
    { time: 155, text: "botella llena y el corazón roto"},
    { time: 157, text: "ella es una de una, se ve en su rostro"},
    { time: 161, text: "si mencionan tu nombre, me desenfoco"},
    { time: 164, text: "nunca lo hicimos, pero por poco"},
    { time: 167, text: "botella llena y el corazón roto"},
    { time: 170, text: "ella es una de una, se ve en su rostro"},
    { time: 176, text: "Young Kingzz, baby" },
  ],
  sobredosis: [
    { time: 0, text: "♪" },
    { time: 7, text: "¿cuál es el misterio de entremedio de tus piernas" },
    { time: 10, text: "que enloquece mi cordura?" },
    { time: 15, text: "Eres un volcán de sensaciones"},  
    { time: 16, text: "cada célula en tu ser compone ricura"},
    { time: 21, text: "y puedo morir"},
    { time: 25, text: "encima de tu cuerpo"},
    { time: 28, text: "amarrado a tu cama"},
    { time: 32, text: "sobredosis de sexo"},
    { time: 36, text: "tú eres el pecado más divino una víbora sexual, calentura"},
    { time: 43, text: "me embeleses con tus técnicas perversas, si te vieran"},
    { time: 47, text: "censuraran tu cintura"},
    { time: 51, text: "ardiendo al sentir"},
    { time: 54, text: "tu narcótico efecto"},  
    { time: 58, text: "que se me exploten los sesos"},
    { time: 62, text: "del placer tan intenso"},
    { time: 65, text: "Ozuna"},
    { time: 68, text: "amárrame a tu espalda, yo me presto"},
    { time: 72, text: "en tu escuelita dame clases de placer"},
    { time: 76, text: "bebe yo quiero ser un alumno en tu pecho"},
    { time: 79, text: "voy a volver a mi niñez"},
    { time: 82, text: "quiero morir en tu interior"},
    { time: 83, text: "juro que me perdone Dios"},
    { time: 85, text: "si estar contigo es un delito"},  
    { time: 87, text: "hago mil años en prisión"},
    { time: 89, text: "ya adivinaste el crucigrama"},
    { time: 91, text: "mi ninfómana en llamas"},
    { time: 93, text: "sabes bien soy bellaquito"},
    { time: 94, text: "y tú eres provocación"},
    { time: 100, text: "who's back?"},
    { time: 102, text: "♪"},
    { time: 111, text: "y puedo morir encima de tu cuerpo"},
    { time: 118, text: "amarrado a tu cama sobredosis de sexo"},
    { time: 127, text: "dime"},
    { time: 128, text: "amárrame a tu espalda, yo me presto"},
    { time: 132, text: "een tu escuelita dame clases de placer"},
    { time: 135, text: "bebe yo quiero ser un alumno en tu pecho"},
    { time: 139, text: "voy a volver a mi niñez"},
    { time: 142, text: "quiero morir en tu interior"},
    { time: 143, text: "juro que me perdone Dios"},
    { time: 145, text: "si estar contigo es un delito"},  
    { time: 147, text: "hago mil años en prisión"},
    { time: 149, text: "ya adivinaste el crucigrama"},
    { time: 151, text: "mi ninfómana en llamas"},
    { time: 153, text: "sabes bien soy bellaquito"},
    { time: 155, text: "y tú eres provocación"},
    { time: 159, text: "gustosa"},
    { time: 164, text: "salvaje"},
    { time: 166, text: "tú eres erótica"},
    { time: 170, text: "y mi abberración"},  
    { time: 172, text: "y yo seré tu esclavo y si es a tu lado"},
    { time: 176, text: "muero feliz"},
    { time: 178, text: "y puedo morir"},
    { time: 181, text: "encima de tu cuerpo"},
    { time: 185, text: "amarrado a tu cama"},
    { time: 189, text: "sobredosis de sexo"}
  ],
  hecha: [
    { time: 0, text: "♪"},
    { time: 2, text: "na na na na na" },
    { time: 4, text: "eh" },
    { time: 7, text: "na na na na na" },
    { time: 9, text: "nanana nana na" },
    { time: 11, text: "nanana na" },
    { time: 17, text: "tienes una mirada que mne encanta, baby" },
    { time: 20, text: "y un cuerpecito que mi mente envuelve" },
    { time: 23, text: "estás hecha pa' mí" },
    { time: 24, text: "tú me resaltas" },
    { time: 25, text: "tú me dejas enrolar entre tus nalgas" },
    { time: 28, text: "mami tú me encantas baby" },
    { time: 29, text: "un cuerpecito que mi mente envuelve" },
    { time: 32, text: "estás hecha pa' mí" },
    { time: 34, text: "tú me resaltas" },
    { time: 37, text: "tu no tienes amigas tiene puras conocidas" },
    { time: 40, text: "ella es callaita y no le gusta gastar saliva" },
    { time: 42, text: "tiene una manera diferente de ver la vida" },
    { time: 45, text: "lo que ella no le conviene le da paso y lo esquiva" },
    { time: 47, text: "tiene su propio refrán" },
    { time: 48, text: "cosas vienen cosas van" },
    { time: 49, text: "todo pasa sin afán" },
    { time: 50, text: "ella me tiene de fan" },
    { time: 51, text: "vivir felices es su plan" },
    { time: 53, text: "entrega lo que le dan" },
    { time: 54, text: "buena y mala, ying yang" },
    { time: 55, text: "anda sola y sin clan" },
    { time: 56, text: "tú vibras diferente a las demás" },
    { time: 61, text: "amo cuando te vienes, odio cuando te vas" },
    { time: 66, text: "hacemos el amor y nos vamos de la faz" },
    { time: 71, text: "y en un mundo de guerra, solo tú me das paz" },
    { time: 74, text: "oye, es que tú tienes una mirada que mne encanta, baby" },
    { time: 78, text: "y un cuerpecito que mi mente envuelve" },
    { time: 80, text: "estás hecha pa' mí" },
    { time: 82, text: "tú me resaltas" },
    { time: 83, text: "tú me dejas enrolar entre tus nalgas" },
    { time: 86, text: "mami tú me encantas baby" },
    { time: 87, text: "un cuerpecito que mi mente envuelve" },
    { time: 90, text: "estás hecha pa' mí" },
    { time: 92, text: "tú me resaltas" },
    { time: 94, text: "mami tú tas como me gusta" },
    { time: 96, text: "me peleas y me buscas" },
    { time: 97, text: "te vestí cartier de arriba abajo" },
    { time: 99, text: "pa' que luzcas" },
    { time: 100, text: "la posición que tú tienes no la tendrá otra nunca" },
    { time: 102, text: "qué pesar mi ex" },
    { time: 104, text: "si solamente somo tú y yo" },
    { time: 107, text: "tú y yo" },
    { time: 108, text: "tú y yo" },
    { time: 109, text: "tú y yo" },
    { time: 110, text: "tú y yo" },
    { time: 111, text: "tú y yo" },
    { time: 112, text: "lo que podemos hacer" },
    { time: 114, text: "de los temores de la vida no se vive" },
    { time: 116, text: "y yo no tengo miedo de vivir algo contigo" },
    { time: 119, text: "procuro darte lo que pidas siempre y cuando que quieras conmigo" },
    { time: 123, text: " si no es amor entonces que sea sexo" },
    { time: 126, text: "soy el ratón que comerá tu queso" },
    { time: 128, text: "en tu casa estaré como un preso" },
    { time: 131, text: "condenado y sin proceso" },
    { time: 133, text: "dicen que soy bandido y soy muy teso" },
    { time: 135, text: "pero contigo se me olvida eso" },
    { time: 138, text: "soy otro cuando me llenas de besos" },
    { time: 140, text: "lo malo es que me encantas con exceso" },
    { time: 143, text: "tú vibras diferente a las demás" },
    { time: 147, text: "amo cuando te vienes, odio cuando te vas" },
    { time: 153, text: "hacemos el amor y nos vamos de la faz" },
    { time: 157, text: "y en un mundo de guerra, solo tú me das paz" },
    { time: 161, text: "oye, es que tú tienes una mirada que mne encanta, baby" },
    { time: 164, text: "y un cuerpecito que mi mente envuelve" },
    { time: 167, text: "estás hecha pa' mí" },
    { time: 169, text: "tú me resaltas" },
    { time: 170, text: "tú me dejas enrolar entre tus nalgas" },
    { time: 172, text: "mami tú me encantas baby" },
    { time: 174, text: "un cuerpecito que mi mente envuelve" },
    { time: 176, text: "estás hecha pa' mí" },
    { time: 178, text: "tú me resaltas" }
  ],
};

/* ==================== UTILIDADES ==================== */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const byId = id => document.getElementById(id);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const coarse = window.matchMedia('(hover: none), (pointer: coarse)');
const PS_VIEWS = ['ps-home', 'ps-momentos', 'ps-mensaje'];

let currentView = 'home';
let autoPlayInterval = null;      // (en el original nunca se declaraba)
let resumeTimer = null;
let typingInterval = null;
let bgWasPlaying = false;

/* Reproduce con manejo de promesa (móviles rechazan play() sin gesto) */
function playMedia(media, onFail) {
  if (!media) return null;
  try {
    const p = media.play();
    if (p && typeof p.catch === 'function') {
      p.catch(err => { console.warn('[media] play bloqueado:', err && err.name); if (onFail) onFail(err); });
    }
    return p;
  } catch (err) { if (onFail) onFail(err); return null; }
}

/* ==================== GESTOR DE MODALES ==================== */
const modalStack = [];
let scrollLocks = 0;

function lockScroll() { if (scrollLocks++ === 0) document.documentElement.style.overflow = 'hidden'; }
function unlockScroll() { scrollLocks = Math.max(0, scrollLocks - 1); if (scrollLocks === 0) document.documentElement.style.overflow = ''; }

function showModal(modal, closeFn, focusSel) {
  if (!modal || modal.classList.contains('active')) return;
  modal.__returnFocus = document.activeElement;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  modalStack.push({ modal, close: closeFn });
  lockScroll();
  document.body.classList.add('modal-open');
  fx.flare = 1;
  setTimeout(() => {
    const f = focusSel && $(focusSel, modal);
    try { (f || modal).focus({ preventScroll: true }); } catch (e) { /* noop */ }
  }, 80);
}

function hideModal(modal) {
  if (!modal || !modal.classList.contains('active')) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  const i = modalStack.findIndex(m => m.modal === modal);
  if (i > -1) modalStack.splice(i, 1);
  unlockScroll();
  if (!modalStack.length) document.body.classList.remove('modal-open');
  const back = modal.__returnFocus;
  if (back && back.focus) { try { back.focus({ preventScroll: true }); } catch (e) { /* noop */ } }
}

function initModalA11y(modal, closeFn) {
  if (!modal) return;
  modal.setAttribute('tabindex', '-1');
  modal.addEventListener('click', e => { if (e.target === modal) closeFn(); });   // toque en el fondo
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const conf = $('.confirmation-modal'); const warn = $('.warning-modal');
    if (conf) { conf.remove(); return; }
    if (warn) { warn.remove(); return; }
    const top = modalStack[modalStack.length - 1];
    if (top) { top.close(); return; }
    const closeBtn = $('.paper.open-session .paper-close');
    if (closeBtn) closeBtn.click();
    return;
  }
  if (e.key === 'Tab' && modalStack.length) {            // trampa de foco básica
    const m = modalStack[modalStack.length - 1].modal;
    const f = $$('button, [role="button"][tabindex="0"], video[controls]', m).filter(el => el.offsetParent !== null || el === document.activeElement);
    if (!f.length) { e.preventDefault(); return; }
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === m)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* Elementos role="button" accesibles con Enter / Espacio */
function onActivate(el, fn) {
  if (!el) return;
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(e); }
  });
}

/* ==================== NAVEGACIÓN GLOBAL ==================== */
function openView(id) {
  const target = byId(id);
  if (!target) return;
  $$('.view').forEach(v => v.classList.remove('active'));
  target.classList.add('active');
  currentView = id;

  const balloons = byId('ps-balloons');
  const music = byId('bgMusic');
  stopTyping();

  if (id === 'ps-mensaje') {
    setTimeout(() => { if (currentView === 'ps-mensaje') typeMessage(); }, 500);
  }
  if (id === 'ps-inicio') resetGift();

  if (PS_VIEWS.indexOf(id) > -1) {                       // globos y música SOLO en P.S.
    if (balloons) balloons.classList.add('active');
    if (music && music.paused) playMedia(music);
    if (id === 'ps-momentos') startAutoPlay(); else stopAutoPlay();
  } else {
    if (balloons) balloons.classList.remove('active');
    if (music && !music.paused) music.pause();
    stopAutoPlay();
  }
  try { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); } catch (e) { window.scrollTo(0, 0); }
}
function goHome() { openView('home'); }
function goBackToPS() { openView('ps-home'); }

window.openView = openView;
window.goHome = goHome;
window.goBackToPS = goBackToPS;

/* ==================== HOW I SEE YOU ==================== */
function initSeeYou() {
  /* Aparición al hacer scroll */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('show'); });
  }, { threshold: 0.2 });
  $$('.fade').forEach(el => io.observe(el));

  /* Frases flotantes (el elemento #floating-text no existe en el HTML; se conserva el comportamiento) */
  const floating = byId('floating-text');
  $$('.essay p').forEach(p => {
    p.addEventListener('mouseenter', () => {
      if (!floating) return;
      floating.textContent = thoughts[Math.floor(Math.random() * thoughts.length)];
      floating.style.opacity = '1';
      floating.style.transform = 'translate(-50%, 0)';
    });
    p.addEventListener('mouseleave', () => {
      if (!floating) return;
      floating.style.opacity = '0';
      floating.style.transform = 'translate(-50%, -10px)';
    });
  });

  /* Lectura íntima: hover (escritorio) · toque y zona central (móvil) · final de página */
  const essayElements = $$('#see-you .essay p, #see-you .essay h1, #see-you .essay h2');
  const closing = $('#see-you .essay .closing');
  let revealedCount = 0;

  function reveal(el) {
    if (el.classList.contains('active')) return;
    el.classList.add('active');
    revealedCount++;
    if (closing && revealedCount >= essayElements.length - 2) closing.classList.add('unlocked');
  }
  essayElements.forEach(el => {
    el.addEventListener('mouseenter', () => reveal(el));
    el.addEventListener('pointerdown', () => reveal(el), { passive: true });
  });
  if (coarse.matches) {
    const mid = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) reveal(en.target); }),
      { rootMargin: '-15% 0px -30% 0px', threshold: 0 });
    essayElements.forEach(el => mid.observe(el));
  }
  window.addEventListener('scroll', () => {
    if (currentView !== 'see-you') return;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) essayElements.forEach(reveal);
  }, { passive: true });

  /* Corazones de fondo (18; 12 en pantallas pequeñas) */
  const frame = $('.hearts-frame');
  const heartSVG = '<svg viewBox="-6 -6 44 41" aria-hidden="true" focusable="false"><path d="M23.6,0c-3.4,0-6.4,2.1-7.6,5.1C14.8,2.1,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.3,16,20.6,16,20.6s16-11.3,16-20.6C32,3.8,28.2,0,23.6,0z" fill="#e10600" stroke="#000" stroke-width="1.8"/></svg>';
  const n = window.innerWidth < 640 ? 12 : 18;
  if (frame) {
    for (let i = 0; i < n; i++) {
      const h = document.createElement('div');
      h.className = 'heart-bg';
      h.innerHTML = heartSVG;
      h.style.left = Math.random() * 100 + '%';
      h.style.top = Math.random() * 100 + '%';
      h.style.setProperty('--rot', (Math.random() * 40 - 20) + 'deg');
      h.style.animationDelay = (Math.random() * 10) + 's';
      frame.appendChild(h);
    }
  }

  /* Toque en "Accro à vous" */
  const french = $('.french-text');
  function frenchMsg() {
    const msg = document.createElement('div');
    msg.className = 'floating-message';
    msg.textContent = '♥ Adicto a tí ♥';
    msg.style.whiteSpace = 'nowrap';
    french.appendChild(msg);
    setTimeout(() => msg.remove(), 2800);
    fx.flare = Math.max(fx.flare, .6);
  }
  if (french) { french.addEventListener('click', frenchMsg); onActivate(french, frenchMsg); }
}

/* ==================== PARTÍCULAS Y CORAZONES DEL CANDADO ==================== */
function spawnParticle(box, x, y, type) {
  const holder = $('.particle-container', box);
  if (!holder) return;
  const p = document.createElement('div');
  p.classList.add('particle', type);
  if (type === 'heart') p.textContent = '❤';
  p.style.left = x + 'px';
  p.style.top = y + 'px';
  holder.appendChild(p);
  setTimeout(() => p.remove(), 1800);
}
function createHearts(container) {
  const colors = ['#B9A7E8', '#FFD98A', '#2EE6A6'];
  for (let i = 0; i < 6; i++) {
    const h = document.createElement('span');
    h.textContent = '❤';
    h.style.position = 'absolute';
    h.style.color = colors[i % 3];
    h.style.fontSize = (18 + Math.random() * 10) + 'px';
    h.style.left = Math.random() * 100 + '%';
    h.style.top = Math.random() * 100 + '%';
    h.style.animation = 'heartFloat 1.5s ease forwards';
    container.appendChild(h);
    setTimeout(() => h.remove(), 1500);
  }
}

/* ==================== REPRODUCTORES (9 canciones) ==================== */
/* Misma API global que el HTML espera: open / close / togglePlay / prevLine / nextLine de cada canción */
const SONGS = [
  { key: 'explicale', modal: 'explicale-modal', audio: 'audio', progress: 'progress', time: 'currentTime', play: 'playBtn', lyrics: 'lyrics',
    fn: { open: 'openExplicale', close: 'closeExplicale', toggle: 'togglePlay', prev: 'prevLine', next: 'nextLine' } },
  { key: 'besame', S: 'Besame', open: 'openBesameSinSentir', close: 'closeBesame' },
  { key: 'sancocho', S: 'Sancocho' },
  { key: 'media', S: 'Media' },
  { key: 'noche', S: 'Noche' },
  { key: 'fantasia', S: 'Fantasia' },
  { key: 'capi', S: 'Capi' },
  { key: 'sobredosis', S: 'Sobredosis' },
  { key: 'hecha', S: 'Hecha' }
].map(d => {
  if (d.fn) return d;
  const S = d.S;
  return { key: d.key, modal: d.key + '-modal', audio: 'audio' + S, progress: 'progress' + S, time: 'currentTime' + S, play: 'playBtn' + S, lyrics: 'lyrics' + S,
    fn: { open: d.open || 'open' + S, close: d.close || 'close' + S, toggle: 'togglePlay' + S, prev: 'prevLine' + S, next: 'nextLine' + S } };
});

const players = [];

function fmtTime(t) {
  const m = Math.floor(t / 60); let s = Math.floor(t % 60);
  return m + ':' + (s < 10 ? '0' + s : s);
}

function createPlayer(cfg) {
  const modal = byId(cfg.modal), audio = byId(cfg.audio);
  if (!modal || !audio) return;
  const box = $('.player-box', modal), lock = $('.lock-layer', modal);
  const progress = byId(cfg.progress), timeEl = byId(cfg.time), playBtn = byId(cfg.play), lyricsEl = byId(cfg.lyrics);
  const lines = LYRICS[cfg.key] || [];
  let idx = 0;

  const setPlaying = on => {
    box.classList.toggle('is-playing', on);
    if (playBtn) playBtn.textContent = on ? '⏸' : '▶';
  };

  function render(index) {                               // 4 líneas: la primera es .main
    if (!lyricsEl) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 4; i++) {
      const l = lines[index + i];
      if (!l) continue;
      const div = document.createElement('div');
      div.className = 'lyric ' + (i === 0 ? 'main' : 'sub') + ' animate';
      div.textContent = l.text;
      frag.appendChild(div);
    }
    lyricsEl.textContent = '';
    lyricsEl.appendChild(frag);
  }
  function updateByTime(t) {
    for (let i = lines.length - 1; i >= 0; i--) {
      if (t >= lines[i].time) { if (i !== idx) { idx = i; render(i); } break; }
    }
  }

  function start() {
    playMedia(audio, () => setPlaying(false));
  }
  function open() {
    audio.preload = 'auto';
    showModal(modal, close, '.lock-layer');
    box.classList.remove('unlocked');                    // el candado vuelve a bloquear
    setPlaying(false);
  }
  function close() {
    hideModal(modal);
    audio.pause();
    try { audio.currentTime = 0; } catch (e) { /* noop */ }
    setPlaying(false);
  }
  function toggle() { if (audio.paused) start(); else audio.pause(); }
  function prev() { audio.currentTime = Math.max(0, audio.currentTime - 5); }
  function next() {
    const d = isFinite(audio.duration) ? audio.duration : audio.currentTime + 5;
    audio.currentTime = Math.min(d, audio.currentTime + 5);
  }

  /* Candado: partículas + corazones + reproducción dentro del mismo gesto (requisito iOS/Android) */
  function unlock() {
    if (box.classList.contains('unlocked')) return;
    for (let i = 0; i < 14; i++) {
      setTimeout(() => spawnParticle(box, box.offsetWidth / 2 + Math.random() * 40 - 20, box.offsetHeight / 2,
        Math.random() > 0.3 ? 'heart' : 'spark'), i * 40);
    }
    box.classList.add('unlocked');
    createHearts(lock);
    idx = 0; render(0);
    try { audio.currentTime = 0; } catch (e) { /* noop */ }
    start();
  }
  if (lock) { lock.addEventListener('click', unlock); onActivate(lock, unlock); }

  /* Estado visual sincronizado con el audio real */
  audio.addEventListener('play', () => { setPlaying(true); setMediaSession(modal, audio, prev, next); });
  audio.addEventListener('pause', () => setPlaying(false));
  audio.addEventListener('ended', () => setPlaying(false));
  audio.addEventListener('error', () => setPlaying(false));
  audio.addEventListener('timeupdate', () => {
    const d = audio.duration;
    if (progress && isFinite(d) && d > 0) progress.style.width = (audio.currentTime / d * 100) + '%';
    if (timeEl) timeEl.textContent = fmtTime(audio.currentTime);
    updateByTime(audio.currentTime);
  });
  const bar = progress && progress.parentElement;          // tocar la barra para saltar
  if (bar) bar.addEventListener('click', e => {
    const r = bar.getBoundingClientRect();
    if (isFinite(audio.duration) && r.width) audio.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * audio.duration;
  });

  initModalA11y(modal, close);
  window[cfg.fn.open] = open; window[cfg.fn.close] = close; window[cfg.fn.toggle] = toggle;
  window[cfg.fn.prev] = prev; window[cfg.fn.next] = next;
  players.push({ modal, audio, close });
}

/* Controles de pantalla de bloqueo / auriculares */
function setMediaSession(modal, audio, prev, next) {
  if (!('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return;
  try {
    const cover = $('.player-cover img', modal);
    navigator.mediaSession.metadata = new MediaMetadata({
      title: ($('.song-name', modal) || {}).textContent || '',
      artist: ($('.song-artist', modal) || {}).textContent || '',
      artwork: cover ? [{ src: cover.src }] : []
    });
    navigator.mediaSession.setActionHandler('play', () => playMedia(audio));
    navigator.mediaSession.setActionHandler('pause', () => audio.pause());
    navigator.mediaSession.setActionHandler('seekbackward', prev);
    navigator.mediaSession.setActionHandler('seekforward', next);
  } catch (e) { /* navegadores sin soporte completo */ }
}

/* ==================== AUDIO/VIDEO GLOBAL: exclusividad + estado ==================== */
function anyAudioPlaying() { return $$('audio').some(a => !a.paused && !a.ended); }
function syncMediaState() {
  const on = anyAudioPlaying();
  document.body.classList.toggle('music-playing', on);
  fx.target = on ? 1.7 : 1;
}
function initMediaSync() {
  document.addEventListener('play', e => {
    const t = e.target;
    if (!(t instanceof HTMLMediaElement)) return;
    const bg = byId('bgMusic');
    $$('audio, video').forEach(m => {                    // nunca dos sonidos a la vez
      if (m !== t && !m.paused) {
        if (m === bg && t.tagName === 'VIDEO') bgWasPlaying = true;
        m.pause();
      }
    });
    if (t.tagName === 'AUDIO' && t !== bg) bgWasPlaying = false;
    fx.flare = Math.max(fx.flare, .8);
    syncMediaState();
  }, true);
  ['pause', 'ended', 'emptied', 'error'].forEach(ev => document.addEventListener(ev, e => {
    if (!(e.target instanceof HTMLMediaElement)) return;
    syncMediaState();
    if (e.target.tagName === 'VIDEO' && bgWasPlaying && PS_VIEWS.indexOf(currentView) > -1) {   // devuelve la música de fondo
      bgWasPlaying = false;
      playMedia(byId('bgMusic'));
    }
  }, true));
}

/* Estado compartido con el motor de efectos (halo de la estrella, intensidad) */
const fx = { flare: 0, target: 1, intensity: 1 };

/* ==================== NOTES: SOBRE + 100 RAZONES + PIZARRA ==================== */
function initNotes() {
  const envelope = byId('envelope');
  if (!envelope) return;
  const flap = $('.flap', envelope), paper = $('.paper', envelope), flapLayer = $('.flap-layer', envelope);
  const closeBtn = $('.paper-close'), prevBtn = byId('prevBtn'), nextReasonBtn = byId('nextReasonBtn');
  const paperText = byId('paper-text'), currentReasonSpan = byId('currentReason');
  const paperStart = byId('paperStart'), paperContent = byId('paperContent');
  const startBtn = byId('startBtn'), homeBtn = byId('homeBtn');
  const chalkboardGrid = byId('chalkboardGrid');
  const viewedReasons = new Set();
  let currentReason = 1, isAnimating = false;

  /* Pizarra: 4 columnas de 25 */
  for (let i = 0; i < 4; i++) {
    const column = document.createElement('div');
    column.className = 'chalkboard-column';
    column.id = 'column-' + i;
    chalkboardGrid.appendChild(column);
  }
  function addToChalkboard(n) {
    if (viewedReasons.has(n)) return;
    viewedReasons.add(n);
    const column = byId('column-' + Math.floor((n - 1) / 25));
    if (!column) return;
    const d = document.createElement('div');
    d.className = 'chalkboard-reason';
    d.innerHTML = '<span class="chalkboard-reason-number">' + n + '.</span>' + reasons[n - 1];
    column.appendChild(d);
  }

  /* Abrir / cerrar SOLO con la solapa */
  function toggleEnvelope(e) {
    if (e) e.stopPropagation();
    if (envelope.classList.contains('open')) {
      envelope.classList.remove('open');
      flapLayer.style.pointerEvents = 'auto';
    } else {
      envelope.classList.add('open');
      flapLayer.style.pointerEvents = 'none';
      fx.flare = Math.max(fx.flare, .5);
    }
  }
  flap.addEventListener('click', toggleEnvelope);
  flapLayer.setAttribute('tabindex', '0');
  onActivate(flapLayer, toggleEnvelope);

  /* Abrir ventana emergente */
  paper.addEventListener('click', e => {
    e.stopPropagation();
    if (!envelope.classList.contains('open')) return;
    if (paper.classList.contains('open-session')) return;
    paper.classList.add('open-session');
    paperStart.classList.remove('hidden');
    paperContent.classList.remove('active');
    currentReason = 1;
  });
  startBtn.addEventListener('click', e => {
    e.stopPropagation();
    paperStart.classList.add('hidden');
    paperContent.classList.add('active');
    updateReason();
  });
  closeBtn.addEventListener('click', e => {
    e.stopPropagation();
    paper.classList.remove('open-session');
    paperStart.classList.remove('hidden');
    paperContent.classList.remove('active');
    currentReason = 1;
    updateReason();
  });
  homeBtn.addEventListener('click', e => {
    e.stopPropagation();
    paperStart.classList.remove('hidden');
    paperContent.classList.remove('active');
    currentReason = 1;
  });

  function swipe(dir, after) {
    isAnimating = true;
    paper.classList.add('swipe-' + dir);
    setTimeout(() => {
      after();
      updateReason();
      paper.classList.remove('swipe-' + dir);
      isAnimating = false;
    }, 700);
  }
  prevBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (isAnimating || currentReason === 1) return;
    swipe('right', () => { currentReason--; });
  });
  nextReasonBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (isAnimating) return;
    if (currentReason === 100) { showWarningModal(); return; }     // 100 → advertencia
    if (currentReason >= 101) return;
    swipe('left', () => { currentReason++; });
  });

  function showWarningModal() {
    const modal = document.createElement('div');
    modal.className = 'warning-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML =
      '<div class="warning-content">' +
        '<div class="warning-icon">⚠️</div>' +
        '<p class="warning-text">1 razón para irme</p>' +
        '<button type="button" class="warning-read-btn">Leer</button>' +
      '</div>';
    document.body.appendChild(modal);
    const btn = $('.warning-read-btn', modal);
    btn.addEventListener('click', () => showConfirmationModal(modal));
    try { btn.focus({ preventScroll: true }); } catch (e) { /* noop */ }
  }
  function showConfirmationModal(warningModal) {
    const confirmModal = document.createElement('div');
    confirmModal.className = 'confirmation-modal';
    confirmModal.setAttribute('role', 'dialog');
    confirmModal.setAttribute('aria-modal', 'true');
    confirmModal.innerHTML =
      '<div class="confirmation-content">' +
        '<button type="button" class="confirmation-btn confirmation-cancel" aria-label="No leer">❌</button>' +
        '<button type="button" class="confirmation-btn confirmation-accept" aria-label="Leer">✓</button>' +
      '</div>';
    document.body.appendChild(confirmModal);
    $('.confirmation-cancel', confirmModal).addEventListener('click', () => {   // ❌ vuelve al inicio de Notes
      confirmModal.remove();
      warningModal.remove();
      paper.classList.remove('open-session');
      envelope.classList.remove('open');
      flapLayer.style.pointerEvents = 'auto';
      paperStart.classList.remove('hidden');
      paperContent.classList.remove('active');
      currentReason = 1;
    });
    $('.confirmation-accept', confirmModal).addEventListener('click', () => {   // ✓ razón 101
      confirmModal.remove();
      warningModal.remove();
      swipe('left', () => { currentReason = 101; });
    });
  }

  function updateReason() {
    if (currentReason === 101) {
      paperText.innerHTML = '<strong style="color: #2EE6A6; font-size: 22px;">1 razón para irme:</strong><br><br><span style="font-size: 24px;">' + reason101 + '</span>';
      currentReasonSpan.textContent = '101';
      nextReasonBtn.disabled = true;
      nextReasonBtn.classList.remove('warning-mode');
      nextReasonBtn.innerHTML = '→';
    } else {
      paperText.textContent = reasons[currentReason - 1];
      currentReasonSpan.textContent = currentReason;
      nextReasonBtn.disabled = false;
      if (currentReason === 100) { nextReasonBtn.classList.add('warning-mode'); nextReasonBtn.innerHTML = '⚠️'; }
      else { nextReasonBtn.classList.remove('warning-mode'); nextReasonBtn.innerHTML = '→'; }
    }
    prevBtn.disabled = currentReason === 1;
    if (currentReason <= 100) addToChalkboard(currentReason);
  }
}

/* ==================== P.S.: REGALO · CARRUSEL · MENSAJE · OJO ==================== */
function openGift() {
  const giftBox = byId('giftBox'), balloons = byId('ps-balloons'), music = byId('bgMusic');
  if (!giftBox || giftBox.classList.contains('opening')) return;
  giftBox.classList.add('opening');
  if (balloons) balloons.classList.add('active');
  if (music && music.paused) playMedia(music);           // dentro del gesto → válido en iOS/Android
  fx.flare = 1;
  setTimeout(() => {
    const ini = byId('ps-inicio');
    if (ini) ini.classList.remove('active');
    setTimeout(() => openView('ps-home'), 300);
  }, 800);
}
function resetGift() { const g = byId('giftBox'); if (g) g.classList.remove('opening'); }

/* Carrusel */
let currentPhotoIndex = 0;
let photoToken = 0;

function updatePhoto() {
  const img = byId('currentPhoto'), cap = byId('photoCaption');
  if (!img || !cap || !photos.length) return;
  const tok = ++photoToken;
  img.style.transition = 'opacity .5s ease, transform .5s ease';
  img.style.opacity = '0';
  img.style.transform = 'scale(0.95)';
  setTimeout(() => {
    if (tok !== photoToken) return;
    const show = () => {
      if (tok !== photoToken) return;
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
      updateDots();
    };
    img.src = photos[currentPhotoIndex].url;
    cap.textContent = photos[currentPhotoIndex].caption;
    if (img.decode) img.decode().then(show, show); else img.onload = show;
    setTimeout(show, 4000);                              // red lenta: no dejar la foto invisible
    const nx = new Image(); nx.src = photos[(currentPhotoIndex + 1) % photos.length].url;   // precarga
  }, 300);
}
function scheduleResume() {
  clearTimeout(resumeTimer);
  resumeTimer = setTimeout(() => { if (currentView === 'ps-momentos') startAutoPlay(); }, 5000);
}
function nextPhoto() { currentPhotoIndex = (currentPhotoIndex + 1) % photos.length; updatePhoto(); stopAutoPlay(); scheduleResume(); }
function prevPhoto() { currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length; updatePhoto(); stopAutoPlay(); scheduleResume(); }
function createDots() {
  const box = byId('photoDots');
  if (!box) return;
  box.innerHTML = '';
  photos.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'button');
    dot.setAttribute('tabindex', '0');
    dot.setAttribute('aria-label', 'Foto ' + (i + 1));
    const go = () => { currentPhotoIndex = i; updatePhoto(); stopAutoPlay(); scheduleResume(); };
    dot.addEventListener('click', go);
    onActivate(dot, go);
    box.appendChild(dot);
  });
}
function updateDots() { $$('.dot').forEach((d, i) => d.classList.toggle('active', i === currentPhotoIndex)); }
function startAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(() => {
    if (document.hidden || currentView !== 'ps-momentos') return;
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updatePhoto();
  }, 4000);
}
function stopAutoPlay() { if (autoPlayInterval) { clearInterval(autoPlayInterval); autoPlayInterval = null; } }
window.nextPhoto = nextPhoto;
window.prevPhoto = prevPhoto;

/* Mensaje: efecto de escritura (50 ms por carácter) */
function stopTyping() { if (typingInterval) { clearInterval(typingInterval); typingInterval = null; } }
function typeMessage() {
  const el = byId('typedMessage'), cursor = $('.cursor');
  if (!el) return;
  stopTyping();
  el.textContent = '';
  const node = document.createTextNode('');
  el.appendChild(node);
  const chars = Array.from(yourMessage);                 // emojis completos, sin partir pares sustitutos
  let i = 0;
  if (cursor) cursor.style.display = 'inline-block';
  typingInterval = setInterval(() => {
    if (i < chars.length) { node.data += chars[i++]; }
    else {
      stopTyping();
      setTimeout(() => { if (cursor) cursor.style.display = 'none'; }, 500);
    }
  }, 50);
}

/* Ojo 👀 → modal con VIDEO + FOTO (mismas rutas del HTML) */
function openPsSecretModal() {
  const modal = byId('ps-secret-modal');
  if (!modal) return;
  const img = $('img', modal), vid = $('video', modal);
  if (img) img.loading = 'eager';                        // el lazy no carga dentro de un modal oculto
  if (vid && vid.preload === 'none') vid.preload = 'metadata';
  showModal(modal, closePsSecretModal, '.ps-secret-close');
}
function closePsSecretModal() {
  const modal = byId('ps-secret-modal');
  if (!modal) return;
  const vid = $('video', modal);
  if (vid && !vid.paused) vid.pause();                   // el video no sigue sonando al cerrar
  hideModal(modal);
}
window.openPsSecretModal = openPsSecretModal;
window.closePsSecretModal = closePsSecretModal;

function initPS() {
  const gift = byId('giftBox');
  if (gift) { gift.addEventListener('click', openGift); onActivate(gift, openGift); }
  createDots();
  updatePhoto();
  initModalA11y(byId('ps-secret-modal'), closePsSecretModal);

  /* Swipe táctil en el carrusel */
  const car = $('.carousel');
  if (car) {
    let sx = 0, sy = 0;
    car.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    car.addEventListener('touchend', e => {
      const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) { if (dx < 0) nextPhoto(); else prevPhoto(); }
    }, { passive: true });
  }
  document.addEventListener('keydown', e => {
    if (currentView !== 'ps-momentos') return;
    if (e.key === 'ArrowRight') nextPhoto(); else if (e.key === 'ArrowLeft') prevPhoto();
  });
}

/* ==================== LUCIÉRNAGAS + ESTRELLA EVANGELINE (canvas único) ==================== */
function initFX() {
  const canvas = byId('bayou-canvas'), star = byId('evangelineStar');
  const layerStar = $('.layer-evangeline'), layerSil = $('.layer-silhouettes');
  if (!canvas || reduceMotion.matches) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function makeSprite(r, g, b) {                         // brillo pre-renderizado: sin shadowBlur por frame
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const x = c.getContext('2d'), gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(.18, 'rgba(' + r + ',' + g + ',' + b + ',.95)');
    gr.addColorStop(.5, 'rgba(' + r + ',' + g + ',' + b + ',.28)');
    gr.addColorStop(1, 'rgba(' + r + ',' + g + ',' + b + ',0)');
    x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
    return c;
  }
  const spr = [makeSprite(255, 217, 138), makeSprite(255, 217, 138), makeSprite(46, 230, 166), makeSprite(185, 167, 232)];  // oro predomina
  const gold = spr[0];

  let W = 0, H = 0, dpr = 1, flies = [], sparks = [], raf = 0, last = 0;
  let baseSX = 0, baseSY = 0, appliedX = 0, appliedY = 0;
  const par = { x: 0, y: 0, tx: 0, ty: 0 };
  const ptr = { x: -999, y: -999, t: 0 };

  function readStar() {
    if (!star) return;
    const r = star.getBoundingClientRect();
    baseSX = r.left - appliedX; baseSY = r.top - appliedY;
  }
  function populate() {
    const max = coarse.matches ? 22 : 42;
    const n = Math.max(14, Math.min(max, Math.round(W * H / 26000)));
    flies = [];
    for (let i = 0; i < n; i++) {
      flies.push({ x: Math.random() * W, y: H * (.2 + Math.random() * .78), a: Math.random() * 6.283,
        s: 6 + Math.random() * 14, r: 12 + Math.random() * 16, ph: Math.random() * 10, ps: .5 + Math.random() * 1.1,
        c: spr[Math.floor(Math.random() * spr.length)] });
    }
  }
  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    if (w === W && Math.abs(h - H) < 90) return;         // la barra de URL móvil no reinicia el lienzo
    W = w; H = h;
    dpr = Math.min(window.devicePixelRatio || 1, coarse.matches ? 1.5 : 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    populate(); readStar();
  }
  let rt = 0;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); }, { passive: true });

  window.addEventListener('pointermove', e => {
    ptr.x = e.clientX; ptr.y = e.clientY; ptr.t = performance.now();
    if (e.pointerType === 'mouse' && W) { par.tx = (e.clientX / W - .5) * 2; par.ty = (e.clientY / H - .5) * 2; }
  }, { passive: true });
  window.addEventListener('pointerdown', e => {          // chispas al tocar
    if (sparks.length > 28) return;
    for (let i = 0; i < 5; i++) {
      const a = Math.random() * 6.283, v = 20 + Math.random() * 40;
      sparks.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 20, life: .9, max: .9,
        size: 8 + Math.random() * 8, c: Math.random() > .5 ? spr[0] : spr[3] });
    }
  }, { passive: true });

  function tick(now) {
    raf = requestAnimationFrame(tick);
    const fps = modalStack.length ? 24 : (coarse.matches ? 40 : 60);      // ahorra batería en móvil / con modal
    if (now - last < 1000 / fps - 2) return;
    const dt = Math.min(.06, (now - last) / 1000); last = now;
    const t = now / 1000;

    fx.intensity += (fx.target - fx.intensity) * Math.min(1, dt * 2.5);
    fx.flare = Math.max(0, fx.flare - dt * .7);
    const I = fx.intensity;

    par.x += (par.tx - par.x) * Math.min(1, dt * 4); par.y += (par.ty - par.y) * Math.min(1, dt * 4);
    const px = -par.x * 7, py = -par.y * 5;
    if (Math.abs(px - appliedX) > .05 || Math.abs(py - appliedY) > .05) {
      appliedX = px; appliedY = py;
      if (layerStar) layerStar.style.transform = 'translate3d(' + px.toFixed(2) + 'px,' + py.toFixed(2) + 'px,0)';
      if (layerSil) layerSil.style.transform = 'translate3d(' + (par.x * 6).toFixed(2) + 'px,0,0)';
    }

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    const ptrOn = now - ptr.t < 1500;
    for (let i = 0; i < flies.length; i++) {
      const f = flies[i];
      f.a += Math.sin(t * .35 + f.ph) * .9 * dt;
      const sp = f.s * (.8 + .2 * Math.sin(t * .5 + f.ph));
      f.x += Math.cos(f.a) * sp * dt;
      f.y += (Math.sin(f.a) * sp * .6 - 1.5) * dt;
      if (ptrOn) {                                       // se apartan suavemente del dedo / cursor
        const dx = f.x - ptr.x, dy = f.y - ptr.y, d2 = dx * dx + dy * dy;
        if (d2 < 14400 && d2 > 1) { const d = Math.sqrt(d2), k = (1 - d / 120) * 60 * dt; f.x += dx / d * k; f.y += dy / d * k; }
      }
      if (f.x < -30) f.x = W + 30; else if (f.x > W + 30) f.x = -30;
      if (f.y < -30) f.y = H + 30; else if (f.y > H + 30) f.y = -30;
      const b = .5 + .5 * Math.sin(t * f.ps * 2 + f.ph), bb = b * b;
      ctx.globalAlpha = Math.min(1, (.18 + .82 * bb) * (.55 + .45 * I));
      const size = f.r * (1 + .35 * bb) * (.9 + .1 * I);
      ctx.drawImage(f.c, f.x - size / 2, f.y - size / 2, size, size);
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life -= dt;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }
      s.x += s.vx * dt; s.y += s.vy * dt; s.vx *= .97; s.vy *= .97;
      ctx.globalAlpha = s.life / s.max;
      const sz = s.size * (.5 + s.life / s.max);
      ctx.drawImage(s.c, s.x - sz / 2, s.y - sz / 2, sz, sz);
    }
    /* Halo extra de la estrella: crece con la música y destella con eventos */
    const halo = (I - 1) * .35 * (.75 + .25 * Math.sin(t * 2.2)) + fx.flare * .65;
    if (halo > .01) {
      const sz = 140 + fx.flare * 160 + (I - 1) * 60;
      ctx.globalAlpha = Math.min(.9, halo);
      ctx.drawImage(gold, baseSX + appliedX - sz / 2, baseSY + appliedY - sz / 2, sz, sz);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }
  function start() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
  if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', e => {
    if (e.matches) { stop(); ctx.clearRect(0, 0, W, H); } else start();
  });
  resize();
  start();
}

/* ==================== ARRANQUE ==================== */
function init() {
  const bg = byId('bgMusic');
  if (bg) bg.volume = 0.5;                               // (iOS ignora el volumen: es normal)
  initSeeYou();
  SONGS.forEach(createPlayer);
  initMediaSync();
  initNotes();
  initPS();
  initFX();
  document.documentElement.classList.add('js');
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
