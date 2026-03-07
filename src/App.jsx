import { useEffect, useState } from "react";
import {
  buildCourseStrategy,
  COLOR_PALETTE,
  COURSES,
  DAY_LABELS,
  DAYS,
  DEFAULT_SETTINGS,
  FOCUS_PROFILES,
  formatMeetings,
  PROPOSAL_CODE,
  REQUIRED_GABY_CODES,
  solveScenarios,
  SOURCES,
} from "./lib/scheduler.js";

const DEFAULT_FORM = {
  gabyCredits: String(DEFAULT_SETTINGS.gabyCredits),
  jeffCredits: String(DEFAULT_SETTINGS.jeffCredits),
  focus: DEFAULT_SETTINGS.focus,
  sameSection: DEFAULT_SETTINGS.sameSection,
};
const DAY_NAME_BY_CODE = Object.fromEntries(DAYS.map((day, index) => [day, DAY_LABELS[index]]));
const START_HOUR = 7;
const END_HOUR = 24;
const HOUR_HEIGHT = 42;
const DAY_HEADER_HEIGHT = 48;
const DAY_SLOT_COUNT = END_HOUR - START_HOUR;
const WEEK_HEIGHT = DAY_HEADER_HEIGHT + DAY_SLOT_COUNT * HOUR_HEIGHT;
const SCHEDULE_DIMENSIONS_STYLE = {
  "--hour-size": `${HOUR_HEIGHT}px`,
  "--day-header-height": `${DAY_HEADER_HEIGHT}px`,
  "--week-height": `${WEEK_HEIGHT}px`,
};
const EMPTY_SCENARIO_GROUPS = {
  all: [],
  withProposal: [],
  withoutProposal: [],
};

export default function App() {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [scenarioGroups, setScenarioGroups] = useState(EMPTY_SCENARIO_GROUPS);
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);
  const [isCalculating, setIsCalculating] = useState(true);

  useEffect(() => {
    setIsCalculating(true);
    const frameId = window.requestAnimationFrame(() => {
      const nextScenarioGroups = solveScenarios(settings);
      const nextScenarios = flattenScenarioGroups(nextScenarioGroups);
      setScenarioGroups(nextScenarioGroups);
      setSelectedScenarioId((currentId) => {
        if (nextScenarios.some((scenario) => scenario.id === currentId)) {
          return currentId;
        }
        return nextScenarios[0]?.id ?? null;
      });
      setIsCalculating(false);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [settings]);

  const scenarioPool = flattenScenarioGroups(scenarioGroups);
  const selectedScenario = scenarioPool.find((scenario) => scenario.id === selectedScenarioId) ?? null;
  const bestScenario = scenarioGroups.all[0] ?? scenarioPool[0] ?? null;
  const focusProfile = FOCUS_PROFILES[settings.focus];

  function handleFieldChange(event) {
    const { name, type, value, checked } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSettings({
      gabyCredits: Number(form.gabyCredits),
      jeffCredits: Number(form.jeffCredits),
      focus: form.focus,
      sameSection: form.sameSection,
    });
  }

  return (
    <div className="page-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">React + Vite | Horarios 2026-1 cruzados con plan, silabos y rutas</p>
          <h1>Simulador de horarios para Gaby y Jeff</h1>
          <p className="hero-text">
            El ranking usa los horarios oficiales, los silabos, el plan de estudios, las certificaciones
            parciales y los diplomas de especialidad. Jeff nunca adelanta un curso que Gaby no lleve.
          </p>
        </div>

        <div className="hero-panel">
          <div className="hero-chip">Regla fija: Jeff subset de Gaby</div>
          <div className="hero-chip">Gaby fija: Gestion de Operaciones + Ing. Software I</div>
          <div className="hero-chip">Software I: evitar Irey Nunez</div>
          <div className="hero-chip">Jueves: bloques virtuales</div>
          <div className="hero-chip">Base: CIS_HORARIOS_2026-1</div>
          <div className="hero-chip">Prioridad: obligatorios y menor nivel</div>
        </div>
      </header>

      <section className="overview-strip">
        <InfoCard
          title="Escenarios activos"
          text={isCalculating ? "Recalculando..." : `${scenarioPool.length} alternativas visibles entre con y sin tesis.`}
        />
        <InfoCard
          title="Enfoque actual"
          text={`${focusProfile.label}. ${focusProfile.description}`}
        />
        <InfoCard
          title="Cursos fijos de Gaby"
          text="Gestion de Operaciones e Ingenieria de Software I siempre quedan dentro del escenario."
        />
        <InfoCard
          title="Recomendacion top"
          text={
            bestScenario
              ? `Gaby ${bestScenario.gaby.totalCredits} cr y Jeff ${bestScenario.jeff.totalCredits} cr con score ${bestScenario.score.toFixed(1)}.`
              : "Esperando calculo inicial."
          }
        />
      </section>

      <main className="layout">
        <section className="card controls-card">
          <div className="section-heading">
            <div>
              <h2>Parametros</h2>
              <p>Cambien topes o enfoque y recalculen el ranking.</p>
            </div>
          </div>

          <form className="controls-grid" onSubmit={handleSubmit}>
            <label>
              <span>Max creditos Gaby</span>
              <input
                id="gaby-credits"
                name="gabyCredits"
                type="number"
                min="9"
                max="24"
                step="1"
                value={form.gabyCredits}
                onChange={handleFieldChange}
              />
            </label>

            <label>
              <span>Max creditos Jeff</span>
              <input
                id="jeff-credits"
                name="jeffCredits"
                type="number"
                min="9"
                max="24"
                step="1"
                value={form.jeffCredits}
                onChange={handleFieldChange}
              />
            </label>

            <label>
              <span>Enfoque</span>
              <select id="focus-mode" name="focus" value={form.focus} onChange={handleFieldChange}>
                {Object.entries(FOCUS_PROFILES).map(([key, profile]) => (
                  <option key={key} value={key}>
                    {profile.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="checkbox-row">
              <input
                id="same-section"
                name="sameSection"
                type="checkbox"
                checked={form.sameSection}
                onChange={handleFieldChange}
              />
              <span>Si ambos llevan un curso, intentar misma seccion</span>
            </label>

            <button className="primary-button" type="submit">
              Recalcular simulacion
            </button>
          </form>

          <div className="focus-spotlight">
            <p className="section-kicker">Lectura rapida</p>
            <h3>{focusProfile.label}</h3>
            <p>{focusProfile.description}</p>
            <div className="pill-stack">
              <span className="tag rose">Gaby fija: 650019 y 650063</span>
              <span className="tag rose">Software I evita a Irey Nunez</span>
              <span className="tag">Jeff nunca adelanta a Gaby</span>
              <span className="tag warn">Comparacion por score + carga + rutas</span>
            </div>
          </div>

          <div className="criteria-grid">
            <InfoCard
              title="Cursos fijos de Gaby"
              text="Todas las simulaciones incluyen Gestion de Operaciones e Ingenieria de Software I."
            />
            <InfoCard
              title="Orden del plan"
              text="Mas puntos para obligatorios y menor nivel, siguiendo la recomendacion de DUSAR y el plan 2026-1."
            />
            <InfoCard
              title="Carga real"
              text="Ahora tambien pesa mas Propuesta de Investigacion; los jueves cuentan como virtuales y, para Gaby, se favorecen noches compactas."
            />
            <InfoCard
              title="Rutas futuras"
              text={focusProfile.description}
            />
          </div>
        </section>

        <section className="card results-card">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Ranking priorizado</p>
              <h2>Mejores escenarios</h2>
              <p>
                {isCalculating
                  ? "Calculando escenarios..."
                  : buildSummaryText(scenarioGroups, settings)}
              </p>
            </div>
            {bestScenario ? (
              <div className="heading-emphasis">
                <strong>Top actual</strong>
                <span>
                  {bestScenario.bucketLabel} #{bestScenario.rank} | score {bestScenario.score.toFixed(1)}
                </span>
              </div>
            ) : null}
          </div>

          <div className="scenario-groups">
            {isCalculating ? (
              <div className="loading">Calculando combinaciones validas y reordenando prioridades...</div>
            ) : scenarioPool.length ? (
              <>
                <ScenarioGroup
                  title="Con Propuesta (Tesis)"
                  description="Aqui el simulador baja la carga ideal y evita sobrecargar el ciclo cuando entra tesis."
                  scenarios={scenarioGroups.withProposal}
                  selectedScenarioId={selectedScenarioId}
                  onSelect={setSelectedScenarioId}
                />
                <ScenarioGroup
                  title="Sin Propuesta"
                  description="Aqui el simulador exige mas cursos para aprovechar el ciclo cuando tesis queda fuera."
                  scenarios={scenarioGroups.withoutProposal}
                  selectedScenarioId={selectedScenarioId}
                  onSelect={setSelectedScenarioId}
                />
              </>
            ) : (
              <div className="loading">
                No se encontraron escenarios validos con esos topes. Prueben subir creditos o quitar la misma seccion.
              </div>
            )}
          </div>
        </section>

        <section className="card detail-card">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Escenario seleccionado</p>
              <h2>Detalle del escenario</h2>
              <p>
                {selectedScenario
                  ? `${selectedScenario.bucketLabel} #${selectedScenario.rank}: ${selectedScenario.focusLabel}. Score ${selectedScenario.score.toFixed(1)}.`
                  : "Seleccionen un escenario para revisar cursos, horas y razones del puntaje."}
              </p>
            </div>
          </div>

          {selectedScenario ? (
            <div className="detail-grid">
              <article className="spotlight-card">
                <div className="spotlight-main">
                  <p className="section-kicker">Resumen ejecutivo</p>
                  <h3>{selectedScenario.bucketLabel} #{selectedScenario.rank}</h3>
                  <p>
                    {selectedScenario.reasons[0]} Gaby queda con {selectedScenario.gaby.totalCredits} creditos y Jeff con{" "}
                    {selectedScenario.jeff.totalCredits}.
                  </p>
                </div>
                <div className="spotlight-side">
                  <span className={`badge ${selectedScenario.gaby.selectedCodes.includes(PROPOSAL_CODE) ? "" : "warn"}`}>
                    {selectedScenario.gaby.selectedCodes.includes(PROPOSAL_CODE) ? "Con tesis" : "Sin tesis"}
                  </span>
                  <span className="badge">Score {selectedScenario.score.toFixed(1)}</span>
                  <span className="badge">{selectedScenario.sharedCodes.length} compartidos</span>
                  <span className={`badge ${selectedScenario.sameSectionCodes.length ? "" : "warn"}`}>
                    {selectedScenario.sameSectionCodes.length} misma seccion
                  </span>
                </div>
              </article>

              <div className="detail-top">
                <InfoCard
                  title="Carga de Gaby"
                  text={`${selectedScenario.gaby.totalCredits} creditos | dificultad ${selectedScenario.gaby.totalDifficulty}/25`}
                />
                <InfoCard
                  title="Carga de Jeff"
                  text={`${selectedScenario.jeff.totalCredits} creditos | dificultad ${selectedScenario.jeff.totalDifficulty}/25`}
                />
                <InfoCard
                  title="Coincidencia"
                  text={`${selectedScenario.sharedCodes.length} compartidos | ${selectedScenario.sameSectionCodes.length} misma seccion`}
                />
                <InfoCard
                  title="Preferencia de Gaby"
                  text={`${selectedScenario.gaby.nightHours} h noche | ${selectedScenario.gaby.stackedDays} dia(s) seguidos | remoto eq ${selectedScenario.gaby.remoteBurden.toFixed(2)}`}
                />
              </div>

              <div className="people-grid">
                <section className="person-panel person-panel-gaby">
                  {renderPersonStack("Gaby", selectedScenario.gaby, "gaby")}
                </section>
                <section className="person-panel person-panel-jeff">
                  {renderPersonStack("Jeff", selectedScenario.jeff, "jeff")}
                </section>
              </div>

              <div className="detail-columns">
                <div>
                  <p className="section-kicker">Explicacion del score</p>
                  <h3>Por que subio en el ranking</h3>
                  <ul className="reason-list">
                    {selectedScenario.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="section-kicker">Impacto curricular</p>
                  <h3>Rutas y desbloqueos</h3>
                  <div className="route-grid">
                    <InfoCard
                      title="Jeff no adelanta a Gaby"
                      text={`Jeff lleva ${selectedScenario.jeff.selectedCodes.length} curso(s), todos incluidos dentro de los ${selectedScenario.gaby.selectedCodes.length} que tambien lleva Gaby.`}
                    />
                    <InfoCard
                      title="Cursos fijos de Gaby"
                      text="Gestion de Operaciones e Ingenieria de Software I estan fijados como obligatorios duros."
                    />
                    {selectedScenario.gaby.unlocks.length ? (
                      <InfoCard
                        title="Desbloqueos de Gaby"
                        text={`Abre o empuja: ${selectedScenario.gaby.unlocks.join(", ")}.`}
                      />
                    ) : null}
                    {selectedScenario.jeff.unlocks.length ? (
                      <InfoCard
                        title="Desbloqueos de Jeff"
                        text={`Abre o empuja: ${selectedScenario.jeff.unlocks.join(", ")}.`}
                      />
                    ) : null}
                    {unique([...selectedScenario.gaby.certifications, ...selectedScenario.jeff.certifications]).length ? (
                      <InfoCard
                        title="Certificaciones parciales"
                        text={`Suman valor para: ${unique([
                          ...selectedScenario.gaby.certifications,
                          ...selectedScenario.jeff.certifications,
                        ]).join(", ")}.`}
                      />
                    ) : null}
                    {unique([...selectedScenario.gaby.diplomas, ...selectedScenario.jeff.diplomas]).length ? (
                      <InfoCard
                        title="Diplomas de especialidad"
                        text={`Aportan a: ${unique([
                          ...selectedScenario.gaby.diplomas,
                          ...selectedScenario.jeff.diplomas,
                        ]).join(", ")}.`}
                      />
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="schedule-panels">
                <WeekBoard title="Horario de Gaby" schedule={selectedScenario.gaby} personKey="gaby" />
                <WeekBoard title="Horario de Jeff" schedule={selectedScenario.jeff} personKey="jeff" />
              </div>
            </div>
          ) : null}
        </section>

        <section className="card analysis-card">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Mapa del ciclo</p>
              <h2>Lectura academica del ciclo</h2>
              <p>Esta matriz resume que tan pesado o estrategico es cada curso segun horas, plan, certificaciones y diplomas.</p>
            </div>
          </div>

          <div className="course-catalog">
            {COURSES.slice()
              .sort((left, right) => left.level - right.level || left.name.localeCompare(right.name))
              .map((course) => (
                <article key={course.code} className="catalog-card">
                  <header>
                    <div>
                      <h3>{course.name}</h3>
                      <p>
                        {course.code} | nivel {course.level} | {course.credits} creditos
                      </p>
                    </div>
                    <span className="badge">{course.difficultyLabel}</span>
                  </header>
                  <p>{course.difficultyReason}</p>
                  <p>
                    <strong>Profesores:</strong> {collectCourseProfessors(course).join(", ")}.
                  </p>
                  <p>
                    <strong>Valor estrategico:</strong> {buildCourseStrategy(course)}
                  </p>
                  <div className="tag-row">
                    <span className={`tag ${course.kind === "required" ? "" : "warn"}`}>
                      {course.kind === "required" ? "Obligatorio" : "Electivo"}
                    </span>
                    <span className={`tag ${course.availableFor.length === 2 ? "" : "rose"}`}>
                      {course.availableFor.length === 2 ? "Lo pueden llevar ambos" : "Solo Gaby"}
                    </span>
                    {REQUIRED_GABY_CODES.includes(course.code) ? <span className="tag rose">Fijo para Gaby</span> : null}
                    {course.certifications.length ? <span className="tag">Certificaciones: {course.certifications.length}</span> : null}
                    {course.diplomas.length ? <span className="tag">Diplomas: {course.diplomas.length}</span> : null}
                  </div>
                </article>
              ))}
          </div>
        </section>

        <section className="card sources-card">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Trazabilidad</p>
              <h2>Fuentes consideradas</h2>
              <p>El simulador cruza todos los PDFs relevantes de la carpeta, no una sola tabla.</p>
            </div>
          </div>

          <div className="sources-grid">
            {SOURCES.map((source) => (
              <InfoCard key={source.title} title={source.title} text={source.summary} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function renderPersonStack(personLabel, schedule, personKey) {
  return (
    <>
      <article className={`course-card summary-card summary-card-${personKey}`}>
        <header>
          <div>
            <p className="person-eyebrow">{personKey === "gaby" ? "Ruta principal" : "Ruta alineada"}</p>
            <h3>{personLabel}</h3>
            <p>
              {schedule.selectedCodes.length} curso(s) | huecos {schedule.gapHours} h | remoto eq{" "}
              {schedule.remoteBurden.toFixed(2)}
            </p>
          </div>
        </header>
        <div className="tag-row">
          <span className="badge">{schedule.totalCredits} creditos</span>
          <span className="badge">{schedule.activeDays.length} dias</span>
          <span className={`badge ${schedule.saturdayCount ? "warn" : ""}`}>
            {schedule.saturdayCount ? "Sabado" : "Sin sabado"}
          </span>
          <span className={`badge ${schedule.nightHours ? "rose" : ""}`}>
            {schedule.nightHours ? `${schedule.nightHours} h noche` : "Sin noche"}
          </span>
          <span className={`badge ${schedule.remoteSessions ? "warn" : ""}`}>
            {schedule.remoteSessions ? `${schedule.remoteSessions} remoto(s)` : "Sin remoto"}
          </span>
          <span className={`badge ${schedule.stackedDays ? "" : "warn"}`}>
            {schedule.stackedDays ? `${schedule.stackedDays} dia(s) seguidos` : "Poco apilado"}
          </span>
          <span className={`badge ${schedule.morningHours ? "warn" : ""}`}>
            {schedule.morningHours ? `${schedule.morningHours} h manana` : "Manana baja"}
          </span>
        </div>
      </article>

      {schedule.selectedCodes.map((code) => {
        const course = COURSES.find((item) => item.code === code);
        const sectionId = schedule.selection[code];
        const sectionInfo = course.sections.find((sectionItem) => sectionItem.id === sectionId);
        return (
          <article key={`${code}-${sectionId}`} className={`course-card course-card-${personKey}`}>
            <header>
              <div>
                <h3>{course.name}</h3>
                <p>
                  {course.code} | seccion {sectionId} | {course.credits} creditos
                </p>
              </div>
              <span className="badge">{course.difficultyLabel}</span>
            </header>
            <p>{formatMeetings(sectionInfo.meetings)}</p>
            <p className="meta-line">
              <strong>Profesor:</strong> {sectionInfo.professor}
            </p>
            {sectionInfo.remoteDays.length ? (
              <p className="meta-line">
                <strong>Modalidad:</strong> presencial {formatDayList(sectionInfo.inPersonDays)} | virtual{" "}
                {formatDayList(sectionInfo.remoteDays)}
              </p>
            ) : null}
            <div className="tag-row">
              <span className={`tag ${course.kind === "required" ? "" : "warn"}`}>
                {course.kind === "required" ? "Obligatorio" : "Electivo"}
              </span>
              <span className={`tag ${course.availableFor.length === 2 ? "" : "rose"}`}>
                {course.availableFor.length === 2 ? "Comun" : "Solo Gaby"}
              </span>
              {REQUIRED_GABY_CODES.includes(course.code) ? <span className="tag rose">Fijo para Gaby</span> : null}
              {course.certifications.length ? <span className="tag">Certifica</span> : null}
              {course.diplomas.length ? <span className="tag">Diploma</span> : null}
              {sectionInfo.remoteDays.length ? <span className="tag warn">Semipresencial</span> : null}
              {sectionInfo.remoteDays.includes("JUE") ? <span className="tag">Virtual en jueves</span> : null}
            </div>
          </article>
        );
      })}
    </>
  );
}

function WeekBoard({ title, schedule, personKey }) {
  return (
    <section className={`schedule-card schedule-card-${personKey}`} style={SCHEDULE_DIMENSIONS_STYLE}>
      <div className="schedule-head">
        <div>
          <p className="person-eyebrow">{personKey === "gaby" ? "Horario priorizado" : "Horario acompasado"}</p>
          <h3>{title}</h3>
          <p>
            {schedule.activeDays.length} dias activos | {schedule.meetings.length} bloque(s) | {schedule.gapHours} h de huecos
          </p>
        </div>
        <div className="schedule-legend">
          <span className="legend-chip">Presencial</span>
          {schedule.remoteSessions ? <span className="legend-chip is-remote">Virtual</span> : null}
        </div>
      </div>

      <div className="schedule-scroll">
        <div className="schedule-wrap">
          <div className="time-axis">
            {Array.from({ length: DAY_SLOT_COUNT + 1 }, (_, index) => START_HOUR + index).map((hour) => (
              <span key={hour} style={{ top: `${(hour - START_HOUR) * HOUR_HEIGHT + DAY_HEADER_HEIGHT}px` }}>
                {formatHourLabel(hour)}
              </span>
            ))}
          </div>

          <div className="week-board">
            <div className="day-row">
              {DAY_LABELS.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="board-grid">
              {DAYS.map((day) => (
                <div key={day}></div>
              ))}
            </div>

            {schedule.meetings.map((meeting) => {
              const courseIndex = COURSES.findIndex((course) => course.code === meeting.code);
              const durationHours = meeting.end - meeting.start;
              const sizeClass = durationHours <= 2 ? "is-compact" : durationHours === 3 ? "is-medium" : "is-long";
              const timeLabel = `${formatHourLabel(meeting.start)} - ${formatHourLabel(meeting.end)}`;
              return (
                <article
                  key={`${meeting.code}-${meeting.sectionId}-${meeting.day}-${meeting.start}`}
                  className={`meeting-block ${sizeClass} ${meeting.mode === "remote" ? "is-remote" : ""}`}
                  aria-label={`${meeting.fullName} | ${meeting.professor} | Sec. ${meeting.sectionId} | ${DAY_NAME_BY_CODE[meeting.day]} ${meeting.start}:00-${meeting.end}:00 | ${meeting.mode === "remote" ? "Virtual" : "Presencial"}`}
                  style={{
                    left: `calc(${(DAYS.indexOf(meeting.day) / DAYS.length) * 100}% + 7px)`,
                    width: `calc(${100 / DAYS.length}% - 14px)`,
                    top: `${(meeting.start - START_HOUR) * HOUR_HEIGHT + DAY_HEADER_HEIGHT + 5}px`,
                    height: `${(meeting.end - meeting.start) * HOUR_HEIGHT - 10}px`,
                    background: COLOR_PALETTE[courseIndex % COLOR_PALETTE.length],
                  }}
                >
                  <strong className="meeting-title">{compactMeetingName(meeting.courseName)}</strong>
                  <span className="meeting-meta">Sec. {meeting.sectionId} | {timeLabel}</span>
                  <span className="meeting-professor">{compactProfessorName(meeting.professor)}</span>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, text }) {
  return (
    <article className="metric-card">
      <strong>{title}</strong>
      <p>{text}</p>
    </article>
  );
}

function ScenarioGroup({ title, description, scenarios, selectedScenarioId, onSelect }) {
  return (
    <section className="scenario-group-card">
      <header className="scenario-group-head">
        <div>
          <p className="section-kicker">Bloque de simulacion</p>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className="badge">{scenarios.length} escenario(s)</span>
      </header>

      {scenarios.length ? (
        <div className="scenario-list">
          {scenarios.map((scenario) => {
            const hasSaturday = scenario.gaby.saturdayCount || scenario.jeff.saturdayCount;
            const heavyLoad = scenario.gaby.totalDifficulty >= 16 || scenario.jeff.totalDifficulty >= 14;
            return (
              <article
                key={scenario.id}
                className={`scenario-card ${scenario.id === selectedScenarioId ? "is-active" : ""}`}
                onClick={() => onSelect(scenario.id)}
              >
                <div className="scenario-rank">{scenario.rank}</div>
                <div>
                  <div className="scenario-head">
                    <div className="scenario-score">{scenario.score.toFixed(1)}</div>
                    <div className="scenario-badges">
                      <span className="badge">Gaby {scenario.gaby.totalCredits} cr</span>
                      <span className="badge">Jeff {scenario.jeff.totalCredits} cr</span>
                      <span className="badge">{scenario.sharedCodes.length} compartidos</span>
                      <span className="badge">{scenario.sameSectionCodes.length} misma seccion</span>
                    </div>
                  </div>
                  <p className="scenario-blurb">{scenario.reasons[0]}</p>
                </div>
                <div className="tag-row">
                  {hasSaturday ? <span className="badge warn">Con sabado</span> : null}
                  {heavyLoad ? <span className="badge rose">Carga exigente</span> : null}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="loading">No salieron alternativas validas en este bloque con los topes actuales.</div>
      )}
    </section>
  );
}

function formatDayList(days) {
  return days.map((day) => DAY_NAME_BY_CODE[day] ?? day).join(", ");
}

function compactMeetingName(name) {
  return name
    .replace("Gestion de Operaciones", "Gestion Op.")
    .replace("Propuesta de Investigacion", "Propuesta")
    .replace("Ing. del Conocimiento", "Ing. Conoc.")
    .replace("Ingenieria del Conocimiento", "Ing. Conoc.")
    .replace("Ing. Software I", "Ing. Software I")
    .replace("Seguridad y Bienestar", "Seguridad")
    .replace("Planeamiento", "Planeamiento")
    .replace("Sistemas Distribuidos", "Distribuidos");
}

function formatHourLabel(hour) {
  if (hour === 24) {
    return "00:00";
  }
  return `${String(hour).padStart(2, "0")}:00`;
}

function compactProfessorName(name) {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length <= 2) {
    return name;
  }
  return parts.slice(0, 2).join(" ");
}

function collectCourseProfessors(course) {
  return unique(course.sections.map((section) => section.professor));
}

function buildSummaryText(groups, settings) {
  const total = flattenScenarioGroups(groups).length;
  if (!total) {
    return "No se encontraron escenarios validos con esos topes de creditos.";
  }

  const best = groups.all[0] ?? groups.withProposal[0] ?? groups.withoutProposal[0];
  const profile = FOCUS_PROFILES[settings.focus];
  return `Se encontraron ${groups.withProposal.length} escenarios con tesis y ${groups.withoutProposal.length} sin tesis para ${profile.label.toLowerCase()}. El mejor deja a Gaby con ${best.gaby.totalCredits} creditos y a Jeff con ${best.jeff.totalCredits}.`;
}

function unique(values) {
  return [...new Set(values)];
}

function flattenScenarioGroups(groups) {
  return [...groups.withProposal, ...groups.withoutProposal];
}
