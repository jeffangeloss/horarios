import { useEffect, useState } from "react";
import {
  COLOR_PALETTE,
  COURSES,
  DAY_LABELS,
  DAYS,
  formatMeetings,
  JEFF_DEFAULT_SETTINGS,
  JEFF_FOCUS_PROFILES,
  JEFF_PROFILE,
  solveJeffPlans,
  SOURCES,
} from "./lib/scheduler.js";

const ADMIN_PIN = "171103";
const DEFAULT_ADMIN_FORM = {
  maxCredits: String(JEFF_DEFAULT_SETTINGS.maxCredits),
  focus: JEFF_DEFAULT_SETTINGS.focus,
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
const INITIAL_PLANNER = solveJeffPlans(JEFF_DEFAULT_SETTINGS);

export default function App() {
  const [settings, setSettings] = useState(JEFF_DEFAULT_SETTINGS);
  const [planner, setPlanner] = useState(INITIAL_PLANNER);
  const [selectedPlanId, setSelectedPlanId] = useState(INITIAL_PLANNER.bestPlan?.id ?? null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminForm, setAdminForm] = useState(DEFAULT_ADMIN_FORM);

  useEffect(() => {
    setIsCalculating(true);
    const frameId = window.requestAnimationFrame(() => {
      const nextPlanner = solveJeffPlans(settings);
      setPlanner(nextPlanner);
      setSelectedPlanId((currentId) => {
        if (nextPlanner.plans.some((plan) => plan.id === currentId)) {
          return currentId;
        }
        return nextPlanner.bestPlan?.id ?? null;
      });
      setAdminForm({
        maxCredits: String(settings.maxCredits),
        focus: settings.focus,
      });
      setIsCalculating(false);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [settings]);

  const selectedPlan = planner.plans.find((plan) => plan.id === selectedPlanId) ?? planner.bestPlan ?? null;
  const focusProfile = JEFF_FOCUS_PROFILES[settings.focus];

  function handleUnlock(event) {
    event.preventDefault();
    if (adminKey.trim() === ADMIN_PIN) {
      setIsAdminUnlocked(true);
      setAdminError("");
      setAdminKey("");
      return;
    }

    setAdminError("Clave incorrecta.");
  }

  function handleAdminFieldChange(event) {
    const { name, value } = event.target;
    setAdminForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleAdminApply(event) {
    event.preventDefault();
    setSettings({
      maxCredits: Number(adminForm.maxCredits),
      focus: adminForm.focus,
    });
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-a"></div>
      <div className="ambient ambient-b"></div>
      <div className="ambient ambient-c"></div>

      <button
        type="button"
        className="cat-admin-button"
        aria-label="Abrir admin de Jeff"
        onClick={() => setIsAdminOpen(true)}
      >
        🐱
      </button>

      <header className="hero-card panel">
        <div className="hero-copy">
          <p className="eyebrow">Jeff only | ciclo {JEFF_PROFILE.cycle} | dark planner</p>
          <h1>Plan maestro para Jeff: mas certificados, mejor ritmo y un ciclo con sabor tecnico.</h1>
          <p className="hero-text">
            {planner.summary} Jeff ya llega con IoT y Sistemas Distribuidos como base ganada, asi que este tablero
            empuja lo que mas conviene sumar ahora y evita meter ruido que no cierre valor.
          </p>

          <div className="hero-tags">
            <span className="pill primary">{focusProfile.label}</span>
            <span className="pill">{selectedPlan ? `${selectedPlan.schedule.totalCredits} creditos recomendados` : "Sin plan"}</span>
            <span className="pill">{selectedPlan ? `${selectedPlan.newCertifications.length} certificados nuevos` : "0 certificados"}</span>
            <span className="pill">{selectedPlan ? `${selectedPlan.schedule.activeDays.length} dias activos` : "0 dias"}</span>
          </div>
        </div>

        <aside className="hero-side">
          <div className="hero-side-block">
            <p className="section-kicker">Base ya ganada</p>
            <h2>{JEFF_PROFILE.completedElectives.length} electivos ya resueltos</h2>
            <p>{JEFF_PROFILE.mission}</p>
          </div>

          <div className="completed-list">
            {planner.completedElectives.map((course) => (
              <article key={course.id} className="completed-card">
                <strong>{course.name}</strong>
                <span>{course.kind}</span>
                <p>{course.summary}</p>
              </article>
            ))}
          </div>
        </aside>
      </header>

      <section className="metrics-strip">
        <InfoCard
          title="Plan top"
          text={selectedPlan ? `${selectedPlan.headline}. Score ${selectedPlan.score.toFixed(1)}.` : "Esperando resultados."}
        />
        <InfoCard
          title="Carga sugerida"
          text={selectedPlan ? `${selectedPlan.schedule.totalCredits} cr | dificultad ${selectedPlan.schedule.totalDifficulty}/25 | ${selectedPlan.paceLabel.toLowerCase()}.` : "Sin plan activo."}
        />
        <InfoCard
          title="Certificados"
          text={
            selectedPlan
              ? selectedPlan.newCertifications.length
                ? `Nuevos: ${selectedPlan.newCertifications.join(", ")}.`
                : `Jeff conserva ${planner.completedCertifications.join(", ")} y este plan no repite certificados.`
              : "Sin lectura aun."
          }
        />
        <InfoCard
          title="Ritmo semanal"
          text={
            selectedPlan
              ? `${selectedPlan.schedule.activeDays.length} dias | ${selectedPlan.schedule.gapHours} h de huecos | ${selectedPlan.schedule.saturdayCount ? "con sabado" : "sin sabado"}.`
              : "Sin horario."
          }
        />
      </section>

      <main className="dashboard-grid">
        <section className="panel spotlight-panel">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Plan recomendado</p>
              <h2>{selectedPlan ? selectedPlan.headline : "Sin combinaciones validas"}</h2>
              <p>
                {selectedPlan
                  ? selectedPlan.reasons[0]
                  : "Sube el tope de creditos desde admin para reabrir alternativas."}
              </p>
            </div>

            {selectedPlan ? (
              <div className="spotlight-score">
                <strong>Score</strong>
                <span>{selectedPlan.score.toFixed(1)}</span>
              </div>
            ) : null}
          </div>

          {selectedPlan ? (
            <div className="spotlight-body">
              <div className="summary-grid">
                <InfoCard
                  title="Bloque central"
                  text={`${selectedPlan.schedule.selectedCodes.length} curso(s) | ${selectedPlan.schedule.totalCredits} creditos | ${selectedPlan.schedule.activeDays.length} dias.`}
                />
                <InfoCard
                  title="Obligatorios"
                  text={
                    selectedPlan.requiredCodes.length
                      ? selectedPlan.requiredCodes.map((code) => courseShortName(code)).join(", ")
                      : "No mete obligatorios en esta variante."
                  }
                />
                <InfoCard
                  title="Nuevos certificados"
                  text={
                    selectedPlan.newCertifications.length
                      ? selectedPlan.newCertifications.join(", ")
                      : "No abre certificados nuevos en esta variante."
                  }
                />
                <InfoCard
                  title="Rutas vivas"
                  text={
                    selectedPlan.combinedDiplomas.length
                      ? selectedPlan.combinedDiplomas.join(", ")
                      : "Sin rutas extra detectadas."
                  }
                />
              </div>

              <div className="spotlight-columns">
                <div className="reason-box">
                  <p className="section-kicker">Por que conviene</p>
                  <h3>Lectura estrategica</h3>
                  <ul className="reason-list">
                    {selectedPlan.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                </div>

                <div className="course-box">
                  <p className="section-kicker">Bloque del ciclo</p>
                  <h3>Materias del plan</h3>
                  <div className="course-grid">
                    {selectedPlan.schedule.selectedCodes.map((code) => (
                      <JeffCourseCard key={`${code}-${selectedPlan.schedule.selection[code]}`} code={code} schedule={selectedPlan.schedule} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">No hay planes disponibles con la configuracion actual.</div>
          )}
        </section>

        <section className="panel alternatives-panel">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Ranking de Jeff</p>
              <h2>Alternativas visibles</h2>
              <p>{isCalculating ? "Recalculando prioridades..." : "Selecciona una variante para comparar el plan."}</p>
            </div>
          </div>

          <div className="plan-list">
            {planner.plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                className={`plan-option ${plan.id === selectedPlanId ? "is-active" : ""}`}
                onClick={() => setSelectedPlanId(plan.id)}
              >
                <div className="plan-option-head">
                  <div className="plan-rank">{plan.rank}</div>
                  <div>
                    <strong>{plan.headline}</strong>
                    <p>{plan.reasons[0]}</p>
                  </div>
                </div>

                <div className="plan-option-tags">
                  <span className="pill">{plan.schedule.totalCredits} cr</span>
                  <span className="pill">{plan.schedule.activeDays.length} dias</span>
                  <span className="pill">{plan.paceLabel}</span>
                  <span className={`pill ${plan.newCertifications.length ? "success" : ""}`}>
                    {plan.newCertifications.length ? `${plan.newCertifications.length} cert.` : "Sin cert."}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="panel radar-panel">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Radar curricular</p>
              <h2>Jeff y sus certificados</h2>
              <p>
                La idea del ciclo es no desperdiciar que Jeff ya trae una base tecnica. El ranking busca sumar lo que
                de verdad amplie sus certificados y no solo llenar creditos.
              </p>
            </div>
          </div>

          <div className="radar-grid">
            <article className="radar-card">
              <strong>Ya asegurado</strong>
              <p>{planner.completedCertifications.length ? planner.completedCertifications.join(", ") : "Sin certificados previos cargados."}</p>
            </article>
            <article className="radar-card">
              <strong>Objetivo de este ciclo</strong>
              <p>
                {selectedPlan?.newCertifications.length
                  ? selectedPlan.newCertifications.join(", ")
                  : "Priorizar obligatorios y tecnicos sin repetir valor de certificado."}
              </p>
            </article>
            <article className="radar-card">
              <strong>Desbloqueos</strong>
              <p>
                {selectedPlan?.schedule.unlocks.length
                  ? selectedPlan.schedule.unlocks.join(", ")
                  : "Sin desbloqueos adicionales en la variante elegida."}
              </p>
            </article>
            <article className="radar-card">
              <strong>Diplomas activos</strong>
              <p>
                {selectedPlan?.combinedDiplomas.length
                  ? selectedPlan.combinedDiplomas.join(", ")
                  : "Sin diplomas activos detectados."}
              </p>
            </article>
          </div>
        </section>

        <section className="panel board-panel">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Horario de Jeff</p>
              <h2>Lectura semanal</h2>
              <p>
                {selectedPlan
                  ? `${selectedPlan.schedule.meetings.length} bloques, ${selectedPlan.schedule.gapHours} horas de huecos y ${selectedPlan.schedule.remoteSessions} sesiones remotas equivalentes.`
                  : "Sin horario para mostrar."}
              </p>
            </div>
          </div>

          {selectedPlan ? <WeekBoard schedule={selectedPlan.schedule} /> : null}
        </section>

        <section className="panel sources-panel">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Trazabilidad</p>
              <h2>Fuentes que sostienen el tablero</h2>
              <p>El diseno cambio, pero la base sigue cruzando horarios, plan, certificaciones, diplomas y silabos.</p>
            </div>
          </div>

          <div className="sources-grid">
            {SOURCES.map((source) => (
              <article key={source.title} className="source-card">
                <strong>{source.title}</strong>
                <p>{source.summary}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      {isAdminOpen ? (
        <div className="admin-overlay" role="presentation" onClick={() => setIsAdminOpen(false)}>
          <aside className="admin-drawer" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="admin-close" onClick={() => setIsAdminOpen(false)} aria-label="Cerrar panel">
              x
            </button>

            {!isAdminUnlocked ? (
              <form className="admin-lock" onSubmit={handleUnlock}>
                <p className="section-kicker">Admin Jeff</p>
                <h2>Acceso reservado</h2>
                <p>Este panel recalibra el plan de Jeff sin mostrar la clave dentro del sitio.</p>

                <label>
                  <span>Clave</span>
                  <input type="password" value={adminKey} onChange={(event) => setAdminKey(event.target.value)} />
                </label>

                {adminError ? <p className="inline-error">{adminError}</p> : null}

                <button className="primary-button" type="submit">
                  Entrar
                </button>
              </form>
            ) : (
              <form className="admin-form" onSubmit={handleAdminApply}>
                <p className="section-kicker">Admin Jeff</p>
                <h2>Calibrar el ranking</h2>
                <p>Aqui solo se ajusta el plan de Jeff: creditos maximos y enfoque de priorizacion.</p>

                <label>
                  <span>Max creditos</span>
                  <input
                    name="maxCredits"
                    type="number"
                    min="12"
                    max="21"
                    step="1"
                    value={adminForm.maxCredits}
                    onChange={handleAdminFieldChange}
                  />
                </label>

                <label>
                  <span>Modo</span>
                  <select name="focus" value={adminForm.focus} onChange={handleAdminFieldChange}>
                    {Object.entries(JEFF_FOCUS_PROFILES).map(([key, profile]) => (
                      <option key={key} value={key}>
                        {profile.label}
                      </option>
                    ))}
                  </select>
                </label>

                <article className="admin-note">
                  <strong>Lectura actual</strong>
                  <p>{planner.summary}</p>
                </article>

                <button className="primary-button" type="submit">
                  Recalcular plan
                </button>
              </form>
            )}
          </aside>
        </div>
      ) : null}
    </div>
  );
}

function JeffCourseCard({ code, schedule }) {
  const course = COURSES.find((item) => item.code === code);
  const sectionId = schedule.selection[code];
  const sectionInfo = course.sections.find((sectionItem) => sectionItem.id === sectionId);

  return (
    <article className="course-card">
      <header>
        <div>
          <p className="course-kicker">{course.kind === "required" ? "Obligatorio" : "Electivo"}</p>
          <h3>{course.name}</h3>
          <p>
            {course.code} | seccion {sectionId} | {course.credits} creditos
          </p>
        </div>
        <span className="pill">{course.difficultyLabel}</span>
      </header>

      <p>{formatMeetings(sectionInfo.meetings)}</p>
      <p className="meta-line">
        <strong>Profesor:</strong> {sectionInfo.professor}
      </p>

      {sectionInfo.remoteDays.length ? (
        <p className="meta-line">
          <strong>Modalidad:</strong> presencial {formatDayList(sectionInfo.inPersonDays)} | virtual {formatDayList(sectionInfo.remoteDays)}
        </p>
      ) : null}

      <div className="course-tags">
        {course.certifications.length ? <span className="pill success">Certifica</span> : null}
        {course.diplomas.length ? <span className="pill">Diploma</span> : null}
        {course.unlocks.length ? <span className="pill">Desbloquea</span> : null}
        {sectionInfo.remoteDays.length ? <span className="pill subtle">Semipresencial</span> : null}
      </div>
    </article>
  );
}

function WeekBoard({ schedule }) {
  return (
    <section className="week-card" style={SCHEDULE_DIMENSIONS_STYLE}>
      <div className="week-head">
        <div>
          <p className="section-kicker">Semana sugerida</p>
          <h3>Jeff</h3>
          <p>
            {schedule.totalCredits} creditos | {schedule.activeDays.length} dias | {schedule.gapHours} h de huecos
          </p>
        </div>

        <div className="legend-row">
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
                  aria-label={`${meeting.fullName} | ${meeting.professor} | Sec. ${meeting.sectionId} | ${DAY_NAME_BY_CODE[meeting.day]} ${meeting.start}:00-${meeting.end}:00`}
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

function courseShortName(code) {
  return COURSES.find((course) => course.code === code)?.shortName ?? code;
}

function formatDayList(days) {
  return days.map((day) => DAY_NAME_BY_CODE[day] ?? day).join(", ");
}

function compactMeetingName(name) {
  return name
    .replace("Programacion Movil", "Prog. Movil")
    .replace("Analisis y Diseno de Algoritmos", "Algoritmos")
    .replace("Planeamiento Estrategico", "Planeamiento")
    .replace("Ingenieria del Conocimiento", "Ing. Conocimiento")
    .replace("Propuesta de Investigacion", "Propuesta");
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
