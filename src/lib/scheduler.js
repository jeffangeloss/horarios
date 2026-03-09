export const DAYS = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];
export const DAY_LABELS = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
export const COLOR_PALETTE = [
  "#bfe8df",
  "#f2d7a7",
  "#c6d6f5",
  "#efc2b8",
  "#d4e7ba",
  "#e4d2f5",
  "#f5e3b5",
  "#c8ebe6",
  "#f1cfd9",
  "#d8ddf6",
  "#d0e4cc",
];

export const REQUIRED_GABY_CODES = ["650019", "650063"];
export const PROPOSAL_CODE = "650066";
const AVOIDED_PROFESSORS = {
  gaby: {
    "650063": ["IREY NUNEZ JORGE LUIS"],
  },
};
const REMOTE_DAY_WEIGHTS = {
  JUE: 0.35,
};
const SCENARIO_BUCKETS = {
  withProposal: {
    key: "withProposal",
    label: "Con Propuesta (Tesis)",
    limit: 4,
    description: "Aqui el simulador baja la carga esperada porque tesis exige reservar mas foco y menos dispersion.",
  },
  withoutProposal: {
    key: "withoutProposal",
    label: "Sin Propuesta",
    limit: 4,
    description: "Aqui el simulador empuja un ciclo mas cargado para aprovechar el espacio que deja tesis fuera.",
  },
};

export const DEFAULT_SETTINGS = {
  gabyCredits: 19,
  jeffCredits: 18,
  focus: "balanced",
  sameSection: false,
};

export const FOCUS_PROFILES = {
  balanced: {
    label: "Balanceado",
    academicMultiplier: 1,
    comfortMultiplier: 1,
    togetherMultiplier: 1,
    description: "Prioriza avance sano, evita horarios rotos y deja bonos moderados por rutas de especialidad.",
  },
  academic: {
    label: "Avance academico",
    academicMultiplier: 1.25,
    comfortMultiplier: 0.82,
    togetherMultiplier: 0.95,
    description: "Empuja obligatorios, prerequisitos y desbloqueos aunque el horario quede mas intenso.",
  },
  light: {
    label: "Carga mas ligera",
    academicMultiplier: 0.88,
    comfortMultiplier: 1.35,
    togetherMultiplier: 0.92,
    description: "Castiga mas sabados, noches, huecos y acumulacion de cursos pesados.",
  },
  together: {
    label: "Ir mas juntos",
    academicMultiplier: 0.96,
    comfortMultiplier: 1.02,
    togetherMultiplier: 1.55,
    description: "Premia compartir cursos y, cuando se puede, coincidir en la misma seccion.",
  },
};

export const SOURCES = [
  {
    title: "CIS_HORARIOS_2026-1.pdf",
    summary: "Fuente maestra de dias, horas y secciones. Se usaron coordenadas del PDF para reconstruir cada bloque horario con precision.",
  },
  {
    title: "Horario asignaturas investigacion_2026-1.xlsx",
    summary: "Confirma que dia de Propuesta de Investigacion es presencial y cual es virtual; esto se usa para bajar el peso de secciones con menos carga remota para Gaby.",
  },
  {
    title: "dusar-normas_e_instrucciones_para_la_matricula_2026-1.pdf",
    summary: "Da la regla de prioridad de matricula: primero cursos de cargo, luego obligatorios de menor nivel y despues electivos.",
  },
  {
    title: "plan_de_estudios_eegg-2026-1.pdf",
    summary: "Confirma que cursos son obligatorios o electivos, cuantos creditos tienen y que cursos desbloquean despues.",
  },
  {
    title: "certificaciones_parciales_2025-1_v3.pdf",
    summary: "Da bono estrategico a Gestion de Operaciones, Programacion Movil, Analisis y Diseno de Algoritmos y Sistemas Distribuidos.",
  },
  {
    title: "diplomas_de_especialidad_2025-1_v3.pdf",
    summary: "Suma valor de ruta a Paradigmas, Analisis y Diseno, Programacion Movil, Ingenieria del Conocimiento y Sistemas Distribuidos.",
  },
  {
    title: "Silabos 2025-1 y 2025-2",
    summary: "Sirven para puntuar dificultad segun creditos, horas practicas, naturaleza taller y peso tecnico del contenido.",
  },
];

export const COURSES = [
  {
    code: "650070",
    name: "Paradigmas de Programacion",
    shortName: "Paradigmas",
    level: 6,
    credits: 3,
    kind: "elective",
    difficulty: 3,
    difficultyLabel: "Media",
    difficultyReason: "Electivo tecnico con 1 hora teorica y 4 practicas; aporta bastante a software.",
    availableFor: ["gaby", "jeff"],
    certifications: [],
    diplomas: ["Ing. de Software"],
    unlocks: [],
    sections: [section("652", [["MAR", 14, 17], ["JUE", 15, 17]], { professor: "MAYHUA QUISPE ANGELA GABRIELA" })],
  },
  {
    code: "650019",
    name: "Gestion de Operaciones",
    shortName: "Gestion de Operaciones",
    level: 7,
    credits: 3,
    kind: "required",
    difficulty: 3,
    difficultyLabel: "Media",
    difficultyReason: "Obligatorio 2+2 con carga cuantitativa y valor directo para la ruta ERP.",
    availableFor: ["gaby"],
    certifications: ["Sistemas ERP"],
    diplomas: [],
    unlocks: ["650028 Sistemas ERP"],
    sections: [
      section("751", [["LUN", 7, 9], ["MIE", 7, 9]], { professor: "DEL SOLAR VERGARA EDUARDO ALEJANDRO" }),
      section("752", [["LUN", 20, 22], ["MIE", 20, 22]], { professor: "ZEVALLOS LUNA VICTORIA GUILLERMO" }),
      section("753", [["MAR", 15, 17], ["VIE", 15, 17]], { professor: "AGUILAR LOZANO CARIDAD" }),
      section("754", [["MAR", 11, 13], ["VIE", 11, 13]], { professor: "AGUILAR LOZANO CARIDAD" }),
      section("756", [["LUN", 18, 20], ["MIE", 18, 20]], { professor: "GERKES MOLFINO ESTEBAN MANUEL" }),
    ],
  },
  {
    code: "650063",
    name: "Ingenieria de Software I",
    shortName: "Ing. Software I",
    level: 7,
    credits: 4,
    kind: "required",
    difficulty: 5,
    difficultyLabel: "Alta",
    difficultyReason: "Curso troncal de 4 creditos y 5 horas; pesa por modelado de requisitos y continuidad a Software II.",
    availableFor: ["gaby"],
    certifications: [],
    diplomas: [],
    unlocks: ["1327 Ingenieria de Software II"],
    sections: [
      section("751", [["LUN", 20, 22], ["JUE", 19, 22]], { professor: "IREY NUNEZ JORGE LUIS" }),
      section("752", [["JUE", 20, 22], ["SAB", 10, 13]], { professor: "WONG URQUIZA HENRY JOE" }),
      section("754", [["MAR", 7, 9], ["JUE", 7, 10]], { professor: "BAUTISTA UBILLUS EFRAIN RICARDO" }),
      section("755", [["MIE", 17, 19], ["VIE", 15, 18]], { professor: "MUNOZ CASILDO NEHIL INDALICIO" }),
      section("756", [["MAR", 20, 22], ["VIE", 19, 22]], { professor: "BAUTISTA UBILLUS EFRAIN RICARDO" }),
    ],
  },
  {
    code: "520074",
    name: "Seguridad, Salud Ocupacional y Bienestar Organizacional",
    shortName: "Seguridad y Bienestar",
    level: 9,
    credits: 3,
    kind: "elective",
    difficulty: 2,
    difficultyLabel: "Media-baja",
    difficultyReason: "Electivo de gestion 2+2, menos tecnico que los cursos de software e investigacion.",
    availableFor: ["gaby", "jeff"],
    certifications: [],
    diplomas: [],
    unlocks: [],
    sections: [
      section("751 / 758", [["LUN", 17, 19], ["VIE", 17, 19]], { professor: "SANABRIA VILLANUEVA JORGE CARLOS" }),
      section("752 / 759", [["MIE", 19, 21], ["VIE", 19, 21]], { professor: "SANABRIA VILLANUEVA JORGE CARLOS" }),
      section("753", [["MIE", 15, 17], ["VIE", 15, 17]], { professor: "SANTA CRUZ PEREDA SANDRA ROSA" }),
    ],
  },
  {
    code: "650074",
    name: "Ingenieria del Conocimiento",
    shortName: "Ing. del Conocimiento",
    level: 7,
    credits: 3,
    kind: "elective",
    difficulty: 2,
    difficultyLabel: "Media-baja",
    difficultyReason: "Electivo teorico de 3 horas; estrategico si quieren empujar Sistemas de Informacion sin cargar practicas.",
    availableFor: ["gaby", "jeff"],
    certifications: [],
    diplomas: ["Sistemas de Informacion"],
    unlocks: [],
    sections: [section("751", [["MIE", 14, 17]], { professor: "AMABLE CIUDAD MIRIAM ELIZABETH" })],
  },
  {
    code: "650042",
    name: "Auditoria y Control de Sistemas",
    shortName: "Auditoria",
    level: 8,
    credits: 3,
    kind: "required",
    difficulty: 3,
    difficultyLabel: "Media",
    difficultyReason: "Obligatorio 2+2 con riesgo, auditoria y normas; tambien abre Gestion de Proyectos.",
    availableFor: ["gaby", "jeff"],
    certifications: [],
    diplomas: [],
    unlocks: ["5674 Gestion de Proyectos"],
    sections: [
      section("851", [["JUE", 18, 20], ["SAB", 7, 9]], { professor: "FERNANDEZ IPARRAGUIRRE JADDY SILVANA" }),
      section("852", [["MAR", 20, 22], ["VIE", 20, 22]], { professor: "CASMA SALCEDO MIGUEL JACINTO" }),
      section("853", [["JUE", 20, 22], ["SAB", 9, 11]], { professor: "FERNANDEZ IPARRAGUIRRE JADDY SILVANA" }),
    ],
  },
  {
    code: PROPOSAL_CODE,
    name: "Propuesta de Investigacion",
    shortName: "Propuesta de Investigacion",
    level: 8,
    credits: 3,
    kind: "required",
    difficulty: 5,
    difficultyLabel: "Alta",
    difficultyReason: "Taller semipresencial exigente con entregables de investigacion; requiere cuidar mucho su peso junto a otros cursos tecnicos.",
    availableFor: ["gaby", "jeff"],
    certifications: [],
    diplomas: [],
    unlocks: ["650035 Seminario de Investigacion I"],
    sections: [
      section("851", [["MAR", 8, 11], ["VIE", 9, 11]], { professor: "MAYHUA QUISPE ANGELA GABRIELA", inPersonDays: ["VIE"], remoteDays: ["MAR"] }),
      section("852", [["LUN", 10, 13], ["MIE", 11, 13]], { professor: "MACHUCA DE PINA JUAN MANUEL", inPersonDays: ["LUN"], remoteDays: ["MIE"] }),
      section("853", [["LUN", 14, 17], ["JUE", 15, 17]], { professor: "DAVILA CALLE GUILLERMO ANTONIO", inPersonDays: ["LUN"], remoteDays: ["JUE"] }),
      section("854", [["MAR", 11, 13], ["JUE", 10, 13]], { professor: "MORE SANCHEZ JAVIER", inPersonDays: ["MAR"], remoteDays: ["JUE"] }),
      section("855", [["LUN", 7, 9], ["MIE", 7, 10]], { professor: "MACHUCA DE PINA JUAN MANUEL", inPersonDays: ["LUN"], remoteDays: ["MIE"] }),
      section("856", [["LUN", 14, 17], ["MIE", 15, 17]], { professor: "RAMIREZ CERNA LOURDES", inPersonDays: ["MIE"], remoteDays: ["LUN"] }),
      section("857", [["MIE", 14, 16], ["VIE", 15, 18]], { professor: "HUARACHI SOTO JULIO CESAR", inPersonDays: ["MIE"], remoteDays: ["VIE"] }),
      section("858", [["MAR", 15, 17], ["VIE", 14, 17]], { professor: "NINA HANCO HERNAN", inPersonDays: ["MAR"], remoteDays: ["VIE"] }),
      section("860", [["MAR", 17, 20], ["JUE", 17, 19]], { professor: "TINCOPA FLORES JEAN PIERRE", inPersonDays: ["MAR"], remoteDays: ["JUE"] }),
    ],
  },
  {
    code: "650030",
    name: "Programacion Movil",
    shortName: "Prog. Movil",
    level: 8,
    credits: 3,
    kind: "elective",
    difficulty: 4,
    difficultyLabel: "Media-alta",
    difficultyReason: "Electivo tecnico con 4 practicas y valor doble para rutas moviles y software.",
    availableFor: ["gaby", "jeff"],
    certifications: ["Aplicaciones Moviles"],
    diplomas: ["Ing. de Software", "Desarrollo de Videojuegos"],
    unlocks: [],
    sections: [section("854", [["MAR", 7, 9], ["VIE", 7, 10]], { professor: "VALDIVIA CABALLERO JOSE JESUS" })],
  },
  {
    code: "650077",
    name: "Sistemas Distribuidos",
    shortName: "Sistemas Distribuidos",
    level: 8,
    credits: 3,
    kind: "elective",
    difficulty: 4,
    difficultyLabel: "Media-alta",
    difficultyReason: "Electivo tecnico de infraestructura; suma fuerte a nube y tecnologias de informacion.",
    availableFor: ["gaby"],
    certifications: ["Computacion en la Nube"],
    diplomas: ["Tecnologias de la Informacion"],
    unlocks: [],
    sections: [section("853", [["MAR", 18, 20], ["VIE", 18, 20]], { professor: "JARA VILLAVICENCIO OCTAVIO V" })],
  },
  {
    code: "650033",
    name: "Planeamiento Estrategico",
    shortName: "Planeamiento",
    level: 9,
    credits: 3,
    kind: "required",
    difficulty: 2,
    difficultyLabel: "Media-baja",
    difficultyReason: "Obligatorio de gestion 2+2; no es el mas tecnico pero ordena la ruta de nivel 9 y habilita Arquitectura Empresarial.",
    availableFor: ["gaby", "jeff"],
    certifications: [],
    diplomas: [],
    unlocks: ["650082 Arquitectura Empresarial"],
    sections: [
      section("951", [["LUN", 7, 9], ["MIE", 7, 9]], { professor: "DIEZ QUINONES PANDURO PERCY" }),
      section("952", [["MAR", 7, 9], ["JUE", 7, 9]], { professor: "DIEZ QUINONES PANDURO PERCY" }),
      section("953", [["MAR", 20, 22], ["JUE", 20, 22]], { professor: "LLANOS PUNYIN HECTOR GERMAN" }),
    ],
  },
  {
    code: "650072",
    name: "Analisis y Diseno de Algoritmos",
    shortName: "Algoritmos",
    level: 7,
    credits: 3,
    kind: "elective",
    difficulty: 5,
    difficultyLabel: "Alta",
    difficultyReason: "Electivo tecnico de 1+4 centrado en complejidad, programacion dinamica y backtracking.",
    availableFor: ["gaby", "jeff"],
    certifications: ["Inteligencia Artificial"],
    diplomas: ["Ing. de Software"],
    unlocks: [],
    sections: [section("751", [["MIE", 10, 13], ["VIE", 11, 13]], { professor: "MAYHUA QUISPE ANGELA GABRIELA" })],
  },
];

const COURSE_MAP = new Map(COURSES.map((course) => [course.code, course]));
const PERSON_CODES = {
  gaby: COURSES.filter((course) => course.availableFor.includes("gaby")).map((course) => course.code),
  jeff: COURSES.filter((course) => course.availableFor.includes("jeff")).map((course) => course.code),
};
const COMMON_CODES = COURSES.filter(
  (course) => course.availableFor.includes("gaby") && course.availableFor.includes("jeff"),
).map((course) => course.code);

export function solveScenarios(rawSettings) {
  const settings = normalizeSettings(rawSettings);
  const profile = FOCUS_PROFILES[settings.focus];
  const gabySchedules = trimSchedules(
    buildSchedules("gaby", settings.gabyCredits, REQUIRED_GABY_CODES),
    "gaby",
    settings,
    220,
  );
  const jeffCache = new Map();
  const topPairs = [];
  const topPairsWithProposal = [];
  const topPairsWithoutProposal = [];
  const topLimit = 140;

  for (const gabySchedule of gabySchedules) {
    if (gabySchedule.totalCredits === 0) {
      continue;
    }

    const allowedCommon = gabySchedule.selectedCodes.filter((code) => COMMON_CODES.includes(code));
    if (!allowedCommon.length) {
      continue;
    }

    const cacheKey = settings.sameSection
      ? `same|${settings.jeffCredits}|${allowedCommon.map((code) => `${code}:${gabySchedule.selection[code]}`).join(",")}`
      : `free|${settings.jeffCredits}|${allowedCommon.join(",")}`;

    let jeffSchedules = jeffCache.get(cacheKey);
    if (!jeffSchedules) {
      jeffSchedules = trimSchedules(
        buildJeffSchedules(allowedCommon, settings.jeffCredits, settings.sameSection, gabySchedule.selection),
        "jeff",
        settings,
        120,
      );
      jeffCache.set(cacheKey, jeffSchedules);
    }

    for (const jeffSchedule of jeffSchedules) {
      if (jeffSchedule.totalCredits === 0) {
        continue;
      }
      const evaluated = evaluatePair(gabySchedule, jeffSchedule, settings, profile);
      insertScenario(topPairs, evaluated, topLimit);

      if (matchesScenarioBucket(evaluated, "withProposal", settings)) {
        insertScenario(topPairsWithProposal, evaluated, topLimit);
      }

      if (matchesScenarioBucket(evaluated, "withoutProposal", settings)) {
        insertScenario(topPairsWithoutProposal, evaluated, topLimit);
      }
    }
  }

  topPairs.sort((left, right) => right.score - left.score);
  topPairsWithProposal.sort((left, right) => right.score - left.score);
  topPairsWithoutProposal.sort((left, right) => right.score - left.score);
  const all = finalizeScenarioBucket(topPairs, 8, {
    key: "all",
    label: "Top general",
    description: "Consolida los mejores escenarios sin separar tesis de no tesis.",
  }, settings);
  const withProposal = finalizeScenarioBucket(
    topPairsWithProposal.length ? topPairsWithProposal : topPairs.filter((scenario) => hasProposalScenario(scenario)),
    SCENARIO_BUCKETS.withProposal.limit,
    SCENARIO_BUCKETS.withProposal,
    settings,
  );
  const withoutProposal = finalizeScenarioBucket(
    topPairsWithoutProposal.length ? topPairsWithoutProposal : topPairs.filter((scenario) => !hasProposalScenario(scenario)),
    SCENARIO_BUCKETS.withoutProposal.limit,
    SCENARIO_BUCKETS.withoutProposal,
    settings,
  );

  return {
    all,
    withProposal,
    withoutProposal,
  };
}

function normalizeSettings(rawSettings) {
  return {
    gabyCredits: clampNumber(Number(rawSettings?.gabyCredits ?? DEFAULT_SETTINGS.gabyCredits), 9, 24),
    jeffCredits: clampNumber(Number(rawSettings?.jeffCredits ?? DEFAULT_SETTINGS.jeffCredits), 9, 24),
    focus: FOCUS_PROFILES[rawSettings?.focus] ? rawSettings.focus : DEFAULT_SETTINGS.focus,
    sameSection: Boolean(rawSettings?.sameSection),
  };
}

function buildSchedules(person, maxCredits, requiredCodes = []) {
  const codes = [...PERSON_CODES[person]].sort(sortCodesForGeneration);
  const schedules = [];
  const selection = {};
  const occupancy = Array(DAYS.length).fill(0);
  const requiredSet = new Set(requiredCodes);

  recurse(0, 0);
  return schedules;

  function recurse(index, totalCredits) {
    if (totalCredits > maxCredits) {
      return;
    }

    if (index === codes.length) {
      schedules.push(summarizeSchedule(person, selection, totalCredits));
      return;
    }

    const code = codes[index];
    const course = COURSE_MAP.get(code);

    if (!requiredSet.has(code)) {
      selection[code] = null;
      recurse(index + 1, totalCredits);
    }

    if (totalCredits + course.credits > maxCredits) {
      delete selection[code];
      return;
    }

    for (const option of course.sections) {
      if (isBlockedProfessor(person, code, option)) {
        continue;
      }
      if (hasConflict(occupancy, option.maskByDay)) {
        continue;
      }
      applySection(occupancy, option.maskByDay);
      selection[code] = option.id;
      recurse(index + 1, totalCredits + course.credits);
      removeSection(occupancy, option.maskByDay);
    }

    delete selection[code];
  }
}

function buildJeffSchedules(allowedCommon, maxCredits, sameSection, gabySelection) {
  const codes = [...allowedCommon].sort(sortCodesForGeneration);
  const schedules = [];
  const selection = {};
  const occupancy = Array(DAYS.length).fill(0);

  recurse(0, 0);
  return schedules;

  function recurse(index, totalCredits) {
    if (totalCredits > maxCredits) {
      return;
    }

    if (index === codes.length) {
      schedules.push(summarizeSchedule("jeff", selection, totalCredits));
      return;
    }

    const code = codes[index];
    const course = COURSE_MAP.get(code);
    const options = sameSection
      ? course.sections.filter((sectionItem) => sectionItem.id === gabySelection[code])
      : course.sections;

    selection[code] = null;
    recurse(index + 1, totalCredits);

    if (totalCredits + course.credits > maxCredits) {
      delete selection[code];
      return;
    }

    for (const option of options) {
      if (hasConflict(occupancy, option.maskByDay)) {
        continue;
      }
      applySection(occupancy, option.maskByDay);
      selection[code] = option.id;
      recurse(index + 1, totalCredits + course.credits);
      removeSection(occupancy, option.maskByDay);
    }

    delete selection[code];
  }
}

function summarizeSchedule(person, selection, totalCredits) {
  const meetings = [];
  const selectedCodes = [];
  const dayMap = new Map(DAYS.map((day) => [day, []]));
  const remoteDaySet = new Set();
  let totalDifficulty = 0;
  let saturdayCount = 0;
  let nightCount = 0;
  let nightHours = 0;
  let morningHours = 0;
  let remoteSessions = 0;
  let remoteBurden = 0;
  let proposalSection = null;

  for (const [code, sectionId] of Object.entries(selection)) {
    if (!sectionId) {
      continue;
    }

    const course = COURSE_MAP.get(code);
    const sectionItem = course.sections.find((item) => item.id === sectionId);
    if (code === PROPOSAL_CODE) {
      proposalSection = sectionItem;
    }
    selectedCodes.push(code);
    totalDifficulty += course.difficulty;

    for (const meeting of sectionItem.meetings) {
      const isRemote = sectionItem.remoteDays.includes(meeting.day);
      const entry = {
        code,
        courseName: course.shortName,
        fullName: course.name,
        sectionId,
        professor: sectionItem.professor,
        day: meeting.day,
        start: meeting.start,
        end: meeting.end,
        mode: isRemote ? "remote" : "inPerson",
      };
      meetings.push(entry);
      dayMap.get(meeting.day).push(entry);
      if (meeting.day === "SAB") {
        saturdayCount += 1;
      }
      if (meeting.start >= 17 || meeting.end > 19) {
        nightCount += 1;
      }
      nightHours += Math.max(0, meeting.end - Math.max(meeting.start, 17));
      morningHours += Math.max(0, Math.min(meeting.end, 13) - meeting.start);

      if (isRemote) {
        remoteSessions += 1;
        remoteDaySet.add(meeting.day);
        remoteBurden += remoteWeightForDay(meeting.day);
      }
    }
  }

  for (const [day, list] of dayMap.entries()) {
    list.sort((left, right) => left.start - right.start);
    if (!list.length) {
      dayMap.delete(day);
    }
  }

  let gapHours = 0;
  let longestDay = 0;
  let earlyCount = 0;
  let stackedDays = 0;
  let compactDays = 0;

  for (const list of dayMap.values()) {
    let dayHours = 0;
    let dayGap = 0;
    if (list[0]?.start < 8) {
      earlyCount += 1;
    }
    for (const item of list) {
      dayHours += item.end - item.start;
    }
    longestDay = Math.max(longestDay, dayHours);

    for (let index = 0; index < list.length - 1; index += 1) {
      const gap = Math.max(0, list[index + 1].start - list[index].end);
      gapHours += gap;
      dayGap += gap;
    }

    if (list.length > 1 && dayGap === 0) {
      stackedDays += 1;
    }
    if (list.length > 1 && dayGap <= 1) {
      compactDays += 1;
    }
  }

  return {
    person,
    selection: { ...selection },
    selectedCodes,
    totalCredits,
    totalDifficulty,
    meetings: meetings.sort(compareMeetings),
    dayMap,
    activeDays: [...dayMap.keys()],
    saturdayCount,
    nightCount,
    nightHours,
    morningHours,
    gapHours,
    longestDay,
    earlyCount,
    stackedDays,
    compactDays,
    remoteSessions,
    remoteBurden: Number(remoteBurden.toFixed(2)),
    remoteDays: DAYS.filter((day) => remoteDaySet.has(day)),
    proposalSection: proposalSection
      ? {
          id: proposalSection.id,
          professor: proposalSection.professor,
          remoteDays: proposalSection.remoteDays,
          inPersonDays: proposalSection.inPersonDays,
        }
      : null,
    certifications: collectRoutes(selectedCodes, "certifications"),
    diplomas: collectRoutes(selectedCodes, "diplomas"),
    unlocks: collectRoutes(selectedCodes, "unlocks"),
  };
}

function evaluatePair(gabySchedule, jeffSchedule, settings, profile) {
  const sharedCodes = jeffSchedule.selectedCodes.filter((code) => gabySchedule.selectedCodes.includes(code));
  const sameSectionCodes = sharedCodes.filter((code) => gabySchedule.selection[code] === jeffSchedule.selection[code]);
  const sameDayCount = intersection(gabySchedule.activeDays, jeffSchedule.activeDays).length;

  const academicScore =
    individualAcademicScore(gabySchedule, "gaby", settings) +
    individualAcademicScore(jeffSchedule, "jeff", settings);

  const comfortPenalty =
    individualComfortPenalty(gabySchedule, "gaby", settings) +
    individualComfortPenalty(jeffSchedule, "jeff", settings);

  const togetherScore = sharedCodes.length * 8 + sameSectionCodes.length * 9 + sameDayCount * 1.2;
  const score =
    academicScore * profile.academicMultiplier -
    comfortPenalty * profile.comfortMultiplier +
    togetherScore * profile.togetherMultiplier;

  return {
    score,
    gaby: gabySchedule,
    jeff: jeffSchedule,
    sharedCodes,
    sameSectionCodes,
    sameDayCount,
    reasons: buildReasons(gabySchedule, jeffSchedule, sharedCodes, sameSectionCodes, settings),
    focusLabel: profile.label,
  };
}

function individualAcademicScore(schedule, person, settings) {
  let score = 0;
  const loadProfile = buildLoadProfile(schedule, person, settings);
  const targetCredits = loadProfile.targetCredits;

  for (const code of schedule.selectedCodes) {
    const course = COURSE_MAP.get(code);
    const kindScore = course.kind === "required" ? 22 : 11;
    const levelScore = course.kind === "required" ? (11 - course.level) * 2.2 : Math.max(0, 10 - course.level) * 0.7;
    const routeScore = course.certifications.length * 2.8 + course.diplomas.length * 2.1 + course.unlocks.length * 2.4;
    const commonScore = course.availableFor.length === 2 ? 3 : 1;
    const soloRequiredBonus =
      person === "gaby" && course.availableFor.length === 1 && course.kind === "required" ? 4.2 : 0;
    const forcedBonus =
      person === "gaby" && REQUIRED_GABY_CODES.includes(code) ? 12 : 0;

    score += kindScore + levelScore + routeScore + commonScore + soloRequiredBonus + forcedBonus + course.credits * 1.8;
  }

  if (schedule.totalCredits < targetCredits) {
    score -= (targetCredits - schedule.totalCredits) * 5.5;
  } else {
    score += (schedule.totalCredits - targetCredits) * 1.2;
  }

  if (schedule.selectedCodes.length < loadProfile.targetCourseCount) {
    score -= (loadProfile.targetCourseCount - schedule.selectedCodes.length) * 3.8;
  } else {
    score += (schedule.selectedCodes.length - loadProfile.targetCourseCount) * 0.6;
  }

  return score;
}

function individualComfortPenalty(schedule, person, settings) {
  const cap = person === "gaby" ? settings.gabyCredits : settings.jeffCredits;
  const loadProfile = buildLoadProfile(schedule, person, settings);
  const targetDifficulty = loadProfile.targetDifficulty;
  const highDemandCount = schedule.selectedCodes.filter((code) => COURSE_MAP.get(code).difficulty >= 4).length;
  const proposalPenalty = schedule.selectedCodes.includes(PROPOSAL_CODE)
    ? 6.8 + Math.max(0, highDemandCount - 1) * 1.9
    : 0;
  const proposalOverloadPenalty = loadProfile.carriesProposal
    ? Math.max(0, schedule.totalCredits - loadProfile.targetCredits) * 4.6
    : 0;

  const basePenalty =
    Math.max(0, schedule.activeDays.length - 4) * (person === "gaby" ? 2.3 : 1.8) +
    Math.max(0, schedule.longestDay - 6) * 1.6 +
    Math.max(0, schedule.totalDifficulty - targetDifficulty) * 3.4 +
    schedule.saturdayCount * 7.5 +
    schedule.gapHours * (person === "gaby" ? 2.05 : 1.35) +
    schedule.earlyCount * (person === "gaby" ? 2.1 : 1.5) +
    Math.max(0, schedule.totalCredits - cap) * 20 +
    proposalPenalty +
    proposalOverloadPenalty;

  const remotePenalty =
    person === "gaby"
      ? schedule.remoteBurden * 6.8 + schedule.remoteSessions * 1.6
      : schedule.remoteBurden * 2.2 + schedule.remoteSessions * 0.5;

  const timePenalty =
    person === "gaby"
      ? schedule.morningHours * 0.95
      : schedule.nightCount * 2.5 + schedule.morningHours * 0.2;

  const preferenceBonus =
    person === "gaby" ? schedule.nightHours * 1.2 + schedule.stackedDays * 2.8 + schedule.compactDays * 1.4 : 0;

  return Math.max(0, basePenalty + remotePenalty + timePenalty - preferenceBonus);
}

function buildReasons(gabySchedule, jeffSchedule, sharedCodes, sameSectionCodes, settings) {
  const reasons = [];
  const gabyRequired = gabySchedule.selectedCodes.filter((code) => COURSE_MAP.get(code).kind === "required");
  const routeSignals = unique([
    ...gabySchedule.certifications,
    ...jeffSchedule.certifications,
    ...gabySchedule.diplomas,
    ...jeffSchedule.diplomas,
  ]);
  const gabyLoadProfile = buildLoadProfile(gabySchedule, "gaby", settings);

  if (gabySchedule.selectedCodes.includes(PROPOSAL_CODE)) {
    reasons.push(
      `Este escenario entra al carril con tesis: el ranking premia bajar carga total y no sobrellenar el ciclo cuando Propuesta entra.`,
    );
    const remoteDays = gabySchedule.proposalSection?.remoteDays ?? [];
    if (remoteDays.includes("JUE")) {
      reasons.push(
        `Gaby queda mas alineada a tarde/noche y, si entra Propuesta, la virtualidad cae en jueves para bajar su carga remota extra.`,
      );
    } else {
      reasons.push(
        `Gaby queda mejor hacia tarde/noche, pero el modelo sigue castigando Propuesta porque su virtualidad cae fuera del jueves y es un curso pesado.`,
      );
    }
  } else {
    reasons.push(
      `Este escenario entra al carril sin tesis: el ranking exige aprovechar ese espacio para llevar mas cursos y empujar mas avance.`,
    );
    reasons.push(
      `Gaby concentra mejor sus bloques y evita meter Propuesta de Investigacion cuando no compensa su peso alto este ciclo.`,
    );
  }

  reasons.push(
    `Jeff queda alineado con Gaby en ${sharedCodes.length} curso(s) y no adelanta ninguno fuera del conjunto que ella lleva.`,
  );
  reasons.push(
    `Gaby mantiene fijos Gestion de Operaciones e Ingenieria de Software I dentro de todas las simulaciones.`,
  );
  reasons.push(
    `Ingenieria de Software I evita a Irey Nunez Jorge Luis como restriccion directa del simulador.`,
  );

  if (gabySchedule.nightHours || gabySchedule.compactDays) {
    reasons.push(
      `Para Gaby pesan ${gabySchedule.nightHours} h en tarde-noche, ${gabySchedule.gapHours} h de huecos y ${gabySchedule.stackedDays} dia(s) con bloques seguidos.`,
    );
  }

  reasons.push(
    `Carga objetivo de Gaby en este carril: ${gabyLoadProfile.targetCredits} creditos y alrededor de ${gabyLoadProfile.targetCourseCount} curso(s).`,
  );

  if (gabySchedule.remoteSessions) {
    reasons.push(
      `La carga remota de Gaby queda en ${gabySchedule.remoteSessions} bloque(s) equivalentes a ${gabySchedule.remoteBurden.toFixed(2)}; jueves virtual se castiga menos que otros dias.`,
    );
  } else {
    reasons.push("Gaby evita sesiones remotas en este escenario, lo que mejora continuidad y control de carga.");
  }

  if (sameSectionCodes.length) {
    reasons.push(
      `Comparten la misma seccion en ${sameSectionCodes.length} curso(s): ${sameSectionCodes.map(formatCourseBadge).join(", ")}.`,
    );
  }

  if (gabyRequired.length) {
    reasons.push(
      `Gaby sostiene avance obligatorio con ${gabyRequired.length} curso(s): ${gabyRequired.map(formatCourseBadge).join(", ")}.`,
    );
  }

  if (!gabySchedule.saturdayCount && !jeffSchedule.saturdayCount) {
    reasons.push("Ambos evitan sabados en este escenario, lo que baja desgaste y riesgo de huecos raros.");
  }

  if (routeSignals.length) {
    reasons.push(
      `Tambien deja valor curricular para rutas futuras: ${routeSignals.slice(0, 4).join(", ")}${routeSignals.length > 4 ? ", ..." : ""}.`,
    );
  }

  if (settings.focus === "light") {
    reasons.push("Se priorizo carga mas ligera: se castigaron sabados, noches, huecos y acumulacion de cursos tecnicos pesados.");
  } else if (settings.focus === "academic") {
    reasons.push("Se priorizo avance academico: los bonos por obligatorios, prerequisitos y desbloqueos pesan mas que la comodidad.");
  } else if (settings.focus === "together") {
    reasons.push("Se priorizo ir mas juntos: compartir cursos y secciones tuvo mas peso en el ranking.");
  }

  return reasons;
}

export function buildCourseStrategy(course) {
  const notes = [];
  notes.push(course.kind === "required" ? "obligatorio del plan" : "electivo");
  if (REQUIRED_GABY_CODES.includes(course.code)) {
    notes.push("obligatorio fijo para Gaby");
  }
  if (course.certifications.length) {
    notes.push(`aporta a ${course.certifications.join(", ")}`);
  }
  if (course.diplomas.length) {
    notes.push(`sirve para ${course.diplomas.join(", ")}`);
  }
  if (course.unlocks.length) {
    notes.push(`desbloquea ${course.unlocks.join(", ")}`);
  }
  return `${notes.join("; ")}.`;
}

export function formatMeetings(meetings) {
  return meetings.map((meeting) => `${meeting.day} ${meeting.start}:00-${meeting.end}:00`).join(" | ");
}

export function selectionSignature(selection) {
  return Object.entries(selection)
    .filter(([, sectionId]) => Boolean(sectionId))
    .sort(([leftCode], [rightCode]) => leftCode.localeCompare(rightCode))
    .map(([code, sectionId]) => `${code}:${sectionId}`)
    .join("|");
}

function formatCourseBadge(code) {
  const course = COURSE_MAP.get(code);
  return `${course.shortName} (${code})`;
}

function section(id, meetings, options = {}) {
  const normalizedMeetings = meetings.map(([day, start, end]) => ({ day, start, end }));
  const maskByDay = Array(DAYS.length).fill(0);
  const implicitRemoteDays = normalizedMeetings.filter((meeting) => meeting.day === "JUE").map((meeting) => meeting.day);
  const remoteDays = uniqueDays([...(options.remoteDays ?? []), ...implicitRemoteDays]);
  const inPersonDays = options.inPersonDays ?? uniqueDays(
    normalizedMeetings.map((meeting) => meeting.day).filter((day) => !remoteDays.includes(day)),
  );

  for (const meeting of normalizedMeetings) {
    const dayIndex = DAYS.indexOf(meeting.day);
    let mask = 0;
    for (let hour = meeting.start; hour < meeting.end; hour += 1) {
      mask |= 1 << (hour - 7);
    }
    maskByDay[dayIndex] |= mask;
  }

  return {
    id,
    meetings: normalizedMeetings,
    maskByDay,
    professor: options.professor ?? "Profesor no indicado",
    remoteDays,
    inPersonDays,
  };
}

function remoteWeightForDay(day) {
  return REMOTE_DAY_WEIGHTS[day] ?? 1;
}

function buildLoadProfile(schedule, person, settings) {
  const cap = person === "gaby" ? settings.gabyCredits : settings.jeffCredits;
  const carriesProposal = schedule.selectedCodes.includes(PROPOSAL_CODE);
  const creditTargets = carriesProposal
    ? { gaby: 14, jeff: 12 }
    : { gaby: 18, jeff: 15 };
  const difficultyTargets = carriesProposal
    ? { gaby: 15, jeff: 12 }
    : { gaby: 18, jeff: 15 };
  const courseCountTargets = carriesProposal
    ? { gaby: 5, jeff: 4 }
    : { gaby: 6, jeff: 5 };

  return {
    carriesProposal,
    targetCredits: Math.min(creditTargets[person], cap),
    targetDifficulty: difficultyTargets[person],
    targetCourseCount: courseCountTargets[person],
  };
}

function uniqueDays(days) {
  return [...new Set(days)];
}

function isBlockedProfessor(person, code, sectionItem) {
  const blockedProfessors = AVOIDED_PROFESSORS[person]?.[code] ?? [];
  return blockedProfessors.includes(sectionItem.professor);
}

function hasConflict(occupancy, maskByDay) {
  return occupancy.some((mask, index) => (mask & maskByDay[index]) !== 0);
}

function applySection(occupancy, maskByDay) {
  maskByDay.forEach((mask, index) => {
    occupancy[index] |= mask;
  });
}

function removeSection(occupancy, maskByDay) {
  maskByDay.forEach((mask, index) => {
    occupancy[index] ^= mask;
  });
}

function trimSchedules(schedules, person, settings, limit) {
  return schedules
    .map((schedule) => ({
      score: individualAcademicScore(schedule, person, settings) - individualComfortPenalty(schedule, person, settings),
      schedule,
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((item) => item.schedule);
}

function insertScenario(store, scenario, limit) {
  store.push(scenario);
  store.sort((left, right) => right.score - left.score);
  if (store.length > limit) {
    store.length = limit;
  }
}

function finalizeScenarioBucket(scenarios, limit, bucket, settings) {
  const sorted = [...scenarios].sort(
    (left, right) =>
      bucketPreferenceScore(right, bucket.key, settings) - bucketPreferenceScore(left, bucket.key, settings) ||
      right.score - left.score,
  );

  return selectDiverseScenarios(sorted, limit).map((scenario, index) => ({
    ...scenario,
    id: `${bucket.key}-${index + 1}`,
    rank: index + 1,
    bucketKey: bucket.key,
    bucketLabel: bucket.label,
    bucketDescription: bucket.description,
  }));
}

function hasProposalScenario(scenario) {
  return scenario.gaby.selectedCodes.includes(PROPOSAL_CODE);
}

function matchesScenarioBucket(scenario, bucketKey, settings) {
  if (bucketKey === "withProposal") {
    return (
      hasProposalScenario(scenario) &&
      scenario.gaby.totalCredits <= Math.min(16, settings.gabyCredits) &&
      scenario.gaby.selectedCodes.length <= 5 &&
      scenario.jeff.totalCredits <= Math.min(14, settings.jeffCredits)
    );
  }

  if (bucketKey === "withoutProposal") {
    return (
      !hasProposalScenario(scenario) &&
      scenario.gaby.totalCredits >= Math.min(18, settings.gabyCredits) &&
      scenario.gaby.selectedCodes.length >= 6 &&
      scenario.jeff.totalCredits >= Math.min(12, settings.jeffCredits)
    );
  }

  return true;
}

function bucketPreferenceScore(scenario, bucketKey, settings) {
  if (bucketKey === "all") {
    return scenario.score;
  }

  const targetMap = bucketKey === "withProposal"
    ? {
        gabyCredits: Math.min(15, settings.gabyCredits),
        gabyCourses: 5,
        jeffCredits: Math.min(12, settings.jeffCredits),
        jeffCourses: 4,
      }
    : {
        gabyCredits: Math.min(18, settings.gabyCredits),
        gabyCourses: 6,
        jeffCredits: Math.min(15, settings.jeffCredits),
        jeffCourses: 5,
      };

  const creditPenalty =
    Math.abs(scenario.gaby.totalCredits - targetMap.gabyCredits) * 7 +
    Math.abs(scenario.jeff.totalCredits - targetMap.jeffCredits) * 5;
  const coursePenalty =
    Math.abs(scenario.gaby.selectedCodes.length - targetMap.gabyCourses) * 8 +
    Math.abs(scenario.jeff.selectedCodes.length - targetMap.jeffCourses) * 5;
  const overloadPenalty =
    bucketKey === "withProposal"
      ? Math.max(0, scenario.gaby.totalCredits - targetMap.gabyCredits) * 10 +
        Math.max(0, scenario.jeff.totalCredits - targetMap.jeffCredits) * 7
      : Math.max(0, targetMap.gabyCredits - scenario.gaby.totalCredits) * 9 +
        Math.max(0, targetMap.jeffCredits - scenario.jeff.totalCredits) * 6;

  return scenario.score - creditPenalty - coursePenalty - overloadPenalty;
}

function selectDiverseScenarios(scenarios, limit) {
  const selected = [];
  const pairSeen = new Set();
  const gabyCounts = new Map();

  for (const scenario of scenarios) {
    const pairKey = `${selectionSignature(scenario.gaby.selection)}|${selectionSignature(scenario.jeff.selection)}`;
    const gabyKey = selectionSignature(scenario.gaby.selection);
    const usedForGaby = gabyCounts.get(gabyKey) ?? 0;

    if (pairSeen.has(pairKey) || usedForGaby >= 2) {
      continue;
    }

    pairSeen.add(pairKey);
    gabyCounts.set(gabyKey, usedForGaby + 1);
    selected.push(scenario);

    if (selected.length === limit) {
      break;
    }
  }

  return selected;
}

function sortCodesForGeneration(leftCode, rightCode) {
  const left = COURSE_MAP.get(leftCode);
  const right = COURSE_MAP.get(rightCode);
  return right.sections.length - left.sections.length || left.level - right.level || left.name.localeCompare(right.name);
}

function collectRoutes(selectedCodes, field) {
  return unique(
    selectedCodes.flatMap((code) => {
      const course = COURSE_MAP.get(code);
      return course[field];
    }),
  );
}

function compareMeetings(left, right) {
  const dayDiff = DAYS.indexOf(left.day) - DAYS.indexOf(right.day);
  if (dayDiff !== 0) {
    return dayDiff;
  }
  if (left.start !== right.start) {
    return left.start - right.start;
  }
  return left.code.localeCompare(right.code);
}

function unique(values) {
  return [...new Set(values)];
}

function intersection(left, right) {
  const rightSet = new Set(right);
  return left.filter((item) => rightSet.has(item));
}

function clampNumber(value, min, max) {
  if (Number.isNaN(value)) {
    return min;
  }
  return Math.min(max, Math.max(min, value));
}

export const JEFF_COMPLETED_ELECTIVES = [
  {
    id: "iot",
    name: "IoT",
    kind: "Electivo ya cursado",
    summary:
      "Ya le da a Jeff una base aplicada en dispositivos y soluciones conectadas, asi que este ciclo puede concentrarse en certificados nuevos.",
    certifications: [],
    diplomas: [],
  },
  {
    id: "650077",
    code: "650077",
    name: "Sistemas Distribuidos",
    kind: "Electivo ya cursado",
    summary:
      "Ya deja una senal tecnica fuerte y aporta el certificado parcial de Computacion en la Nube para no repetir valor.",
    certifications: ["Computacion en la Nube"],
    diplomas: ["Tecnologias de la Informacion"],
  },
];

const JEFF_COMPLETED_CERTIFICATIONS = unique(
  JEFF_COMPLETED_ELECTIVES.flatMap((course) => course.certifications),
);
const JEFF_COMPLETED_DIPLOMAS = unique(JEFF_COMPLETED_ELECTIVES.flatMap((course) => course.diplomas));

export const JEFF_PROFILE = {
  name: "Jeff",
  cycle: "2026-1",
  mission:
    "Armar un ciclo eficiente e interesante, con prioridad real en certificados y sin perder avance obligatorio.",
  completedElectives: JEFF_COMPLETED_ELECTIVES,
};

export const JEFF_DEFAULT_SETTINGS = {
  maxCredits: 16,
  focus: "certificate",
};

export const JEFF_FOCUS_PROFILES = {
  certificate: {
    key: "certificate",
    label: "Certificados primero",
    description:
      "Empuja los cursos que convierten el ciclo en certificados nuevos y mantiene la carga dentro de un bloque sostenible.",
    certificateMultiplier: 1.35,
    requiredMultiplier: 1.08,
    curiosityMultiplier: 1,
    comfortMultiplier: 1,
    researchPenalty: 1.2,
  },
  balanced: {
    key: "balanced",
    label: "Balance tecnico",
    description:
      "Mantiene certificados, avance obligatorio y un ritmo ordenado para no abrir un ciclo innecesariamente pesado.",
    certificateMultiplier: 1.12,
    requiredMultiplier: 1.12,
    curiosityMultiplier: 1,
    comfortMultiplier: 1.08,
    researchPenalty: 1.1,
  },
  exploration: {
    key: "exploration",
    label: "Perfil interesante",
    description:
      "Sigue buscando certificados, pero sube mas las combinaciones tecnicas y las rutas con mejor color de perfil.",
    certificateMultiplier: 1.18,
    requiredMultiplier: 0.98,
    curiosityMultiplier: 1.28,
    comfortMultiplier: 0.96,
    researchPenalty: 0.95,
  },
};

export function solveJeffPlans(rawSettings) {
  const settings = normalizeJeffSettings(rawSettings);
  const profile = JEFF_FOCUS_PROFILES[settings.focus];
  const scenarios = buildSchedules("jeff", settings.maxCredits)
    .filter((schedule) => schedule.totalCredits > 0)
    .map((schedule) => evaluateJeffScenario(schedule, settings, profile))
    .sort((left, right) => right.score - left.score);
  const plans = finalizeJeffPlans(scenarios, 6);
  const bestPlan = plans[0] ?? null;

  return {
    settings,
    profile,
    plans,
    bestPlan,
    completedElectives: JEFF_COMPLETED_ELECTIVES,
    completedCertifications: JEFF_COMPLETED_CERTIFICATIONS,
    completedDiplomas: JEFF_COMPLETED_DIPLOMAS,
    summary: buildJeffSummary(plans, profile, settings),
  };
}

function normalizeJeffSettings(rawSettings) {
  return {
    maxCredits: clampNumber(Number(rawSettings?.maxCredits ?? JEFF_DEFAULT_SETTINGS.maxCredits), 12, 21),
    focus: JEFF_FOCUS_PROFILES[rawSettings?.focus] ? rawSettings.focus : JEFF_DEFAULT_SETTINGS.focus,
  };
}

function evaluateJeffScenario(schedule, settings, profile) {
  const requiredCodes = schedule.selectedCodes.filter((code) => COURSE_MAP.get(code).kind === "required");
  const certificationCodes = schedule.selectedCodes.filter((code) => COURSE_MAP.get(code).certifications.length);
  const technicalCodes = schedule.selectedCodes.filter((code) => {
    const course = COURSE_MAP.get(code);
    return course.kind === "elective" || course.difficulty >= 4;
  });
  const carriesProposal = schedule.selectedCodes.includes(PROPOSAL_CODE);
  const newCertifications = schedule.certifications.filter((item) => !JEFF_COMPLETED_CERTIFICATIONS.includes(item));
  const combinedCertifications = unique([...JEFF_COMPLETED_CERTIFICATIONS, ...schedule.certifications]);
  const combinedDiplomas = unique([...JEFF_COMPLETED_DIPLOMAS, ...schedule.diplomas]);
  const target = buildJeffLoadTarget(schedule, settings, profile);

  const courseScore = schedule.selectedCodes.reduce((total, code) => {
    const course = COURSE_MAP.get(code);
    const requiredValue = course.kind === "required" ? 16 * profile.requiredMultiplier : 6;
    const certificateValue = course.certifications.length * 12 * profile.certificateMultiplier;
    const unlockValue = course.unlocks.length * 7 * profile.requiredMultiplier;
    const diplomaValue = course.diplomas.length * 4.5 * profile.curiosityMultiplier;
    const interestValue = course.difficulty * 1.6 * profile.curiosityMultiplier;
    return total + requiredValue + certificateValue + unlockValue + diplomaValue + interestValue + course.credits * 1.5;
  }, 0);

  const strategicBonuses =
    newCertifications.length * 26 * profile.certificateMultiplier +
    certificationCodes.length * 9 * profile.certificateMultiplier +
    requiredCodes.length * 6 * profile.requiredMultiplier +
    (certificationCodes.length >= 2 ? 8 : 0) +
    (requiredCodes.length >= 2 ? 5 : 0) +
    (technicalCodes.length >= 3 ? 4 * profile.curiosityMultiplier : 0) +
    (schedule.selectedCodes.includes("650030") && schedule.selectedCodes.includes("650072") ? 10 : 0) +
    (schedule.selectedCodes.includes("650033") && schedule.selectedCodes.includes("650042") ? 6 : 0);

  const comfortPenalty =
    Math.abs(schedule.totalCredits - target.credits) * 4.8 +
    Math.max(0, schedule.activeDays.length - target.days) * 4.2 +
    schedule.saturdayCount * 11 +
    schedule.gapHours * 1.85 +
    Math.max(0, schedule.longestDay - target.longestDay) * 2.4 +
    Math.max(0, schedule.totalDifficulty - target.difficulty) * 3.3 +
    schedule.remoteBurden * 1.7 +
    schedule.earlyCount * 0.9 +
    Math.max(0, schedule.remoteSessions - 1) * 0.9 +
    (carriesProposal ? 8.5 * profile.researchPenalty : 0) -
    schedule.compactDays * 1.6;

  const score = courseScore + strategicBonuses - comfortPenalty * profile.comfortMultiplier;
  const headline = buildJeffHeadline({
    carriesProposal,
    newCertifications,
    requiredCodes,
    technicalCodes,
    schedule,
  });

  return {
    score,
    headline,
    paceLabel: buildJeffPaceLabel(schedule),
    requiredCodes,
    certificationCodes,
    technicalCodes,
    newCertifications,
    combinedCertifications,
    combinedDiplomas,
    target,
    reasons: buildJeffReasons(
      schedule,
      {
        requiredCodes,
        certificationCodes,
        newCertifications,
        combinedCertifications,
        combinedDiplomas,
        carriesProposal,
      },
      profile,
      target,
    ),
    schedule,
  };
}

function buildJeffLoadTarget(schedule, settings, profile) {
  const carriesProposal = schedule.selectedCodes.includes(PROPOSAL_CODE);
  const baseCredits = carriesProposal ? 13 : profile.key === "exploration" ? 16 : 15;

  return {
    credits: Math.min(baseCredits, settings.maxCredits),
    days: profile.key === "exploration" ? 5 : 4,
    difficulty: carriesProposal ? 15 : profile.key === "balanced" ? 16 : 17,
    longestDay: carriesProposal ? 9 : profile.key === "exploration" ? 9 : 8,
  };
}

function buildJeffHeadline({ carriesProposal, newCertifications, requiredCodes, technicalCodes, schedule }) {
  if (newCertifications.length >= 2) {
    return "Sprint dual de certificados";
  }
  if (!carriesProposal && requiredCodes.length >= 2 && schedule.gapHours <= 6) {
    return "Cierre obligatorio bien amarrado";
  }
  if (technicalCodes.length >= 3) {
    return "Bloque tecnico con perfil";
  }
  if (carriesProposal) {
    return "Ruta con investigacion controlada";
  }
  return "Bloque estrategico para Jeff";
}

function buildJeffPaceLabel(schedule) {
  if (schedule.saturdayCount || schedule.totalDifficulty >= 18 || schedule.longestDay >= 10) {
    return "Exigente";
  }
  if (schedule.activeDays.length <= 4 && schedule.gapHours <= 5) {
    return "Compacto";
  }
  return "Equilibrado";
}

function buildJeffReasons(schedule, meta, profile, target) {
  const reasons = [];

  if (meta.newCertifications.length >= 2) {
    reasons.push(
      `Activa ${meta.newCertifications.length} certificados nuevos en un solo ciclo: ${meta.newCertifications.join(", ")}.`,
    );
  } else if (meta.newCertifications.length === 1) {
    reasons.push(`Asegura un certificado nuevo: ${meta.newCertifications[0]}.`);
  } else {
    reasons.push(
      "No abre certificados nuevos, asi que solo sube si el cierre obligatorio y la forma del horario compensan el valor perdido.",
    );
  }

  if (meta.certificationCodes.length >= 2) {
    reasons.push(
      `Mete las dos materias con mejor retorno de certificados este ciclo: ${meta.certificationCodes
        .map(formatCourseBadge)
        .join(", ")}.`,
    );
  } else if (meta.certificationCodes.length === 1) {
    reasons.push(`Incluye al menos una materia de certificacion: ${formatCourseBadge(meta.certificationCodes[0])}.`);
  }

  if (meta.requiredCodes.length) {
    reasons.push(
      `No abandona el plan obligatorio: ${meta.requiredCodes.map(formatCourseBadge).join(", ")}.`,
    );
  }

  if (meta.carriesProposal) {
    reasons.push(
      "Incluye Propuesta solo cuando el resto del bloque sigue respirable; aun asi recibe castigo porque distrae del frente de certificados.",
    );
  } else {
    reasons.push("Deja Propuesta fuera para concentrar energia en certificados, cursos utiles y menos dispersion.");
  }

  if (!schedule.saturdayCount) {
    reasons.push("Evita sabado, lo que deja un ritmo mas facil de sostener.");
  }

  if (schedule.activeDays.length <= target.days) {
    reasons.push(`Se mueve en ${schedule.activeDays.length} dias activos, dentro del formato compacto buscado para Jeff.`);
  }

  if (schedule.gapHours <= 4) {
    reasons.push(`Los huecos quedan controlados en ${schedule.gapHours} hora(s) semanales.`);
  } else {
    reasons.push(`Acepta ${schedule.gapHours} hora(s) de huecos porque el retorno curricular sigue siendo alto.`);
  }

  if (meta.combinedCertifications.length) {
    reasons.push(
      `Junto con lo ya ganado, Jeff termina proyectando certificados en ${meta.combinedCertifications.join(", ")}.`,
    );
  }

  if (meta.combinedDiplomas.length) {
    reasons.push(`Tambien empuja rutas de diploma en ${meta.combinedDiplomas.join(", ")}.`);
  }

  if (profile.key === "certificate") {
    reasons.push("El enfoque actual premia mas las materias que cierran certificados parciales oficiales.");
  } else if (profile.key === "balanced") {
    reasons.push("El enfoque actual equilibra certificados, obligatorios y una carga que siga siendo util semana a semana.");
  } else if (profile.key === "exploration") {
    reasons.push("El enfoque actual sube mas los cursos tecnicos para que el ciclo se sienta interesante, no solo correcto.");
  }

  return reasons.slice(0, 8);
}

function finalizeJeffPlans(scenarios, limit) {
  const selected = [];
  const seen = new Set();

  for (const scenario of scenarios) {
    const signature = selectionSignature(scenario.schedule.selection);
    if (seen.has(signature)) {
      continue;
    }

    seen.add(signature);
    selected.push({
      ...scenario,
      id: `jeff-${signature}`,
      rank: selected.length + 1,
    });

    if (selected.length === limit) {
      break;
    }
  }

  return selected;
}

function buildJeffSummary(plans, profile, settings) {
  if (!plans.length) {
    return `No salieron combinaciones validas para Jeff con tope de ${settings.maxCredits} creditos.`;
  }

  const best = plans[0];
  const certificateLine = best.newCertifications.length
    ? `${best.newCertifications.length} certificado(s) nuevo(s)`
    : "sin certificados nuevos";

  return `Con ${profile.label.toLowerCase()}, el mejor bloque deja a Jeff con ${best.schedule.totalCredits} creditos, ${best.requiredCodes.length} obligatorios utiles y ${certificateLine}.`;
}
