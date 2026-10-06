"use client";

import { useRef, useState } from "react";
import styles from "./HomePage.module.css";

type FreeVastuCheckProps = {
  onConsultation: () => void;
};

const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const questions = [
  {
    title: "What kind of space are we looking at?",
    hint: "Choose the closest match.",
    key: "property",
    options: ["Home", "Flat", "Office", "Shop"],
    compass: false,
  },
  {
    title: "Which way does the main entrance face?",
    hint: "Use the direction you know today—you can confirm it later.",
    key: "entrance",
    options: directions,
    compass: true,
  },
  {
    title: "Where is the kitchen located?",
    hint: "Select its broad direction within the floor plan.",
    key: "kitchen",
    options: directions,
    compass: true,
  },
  {
    title: "Where is the master bedroom?",
    hint: "A broad directional estimate is enough for this overview.",
    key: "bedroom",
    options: directions,
    compass: true,
  },
  {
    title: "Where is the puja or meditation space?",
    hint: "Choose “Not present” if the space does not have one.",
    key: "meditation",
    options: [...directions, "Not present"],
    compass: true,
  },
  {
    title: "Do you have a floor plan available?",
    hint: "A plan helps a consultant understand relationships between spaces.",
    key: "floorPlan",
    options: ["Yes", "No", "Not sure"],
    compass: false,
  },
] as const;

export default function FreeVastuCheck({ onConsultation }: FreeVastuCheckProps) {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [complete, setComplete] = useState(false);
  const experienceRef = useRef<HTMLDivElement>(null);
  const question = questions[step];
  const selected = answers[question?.key];

  const bringExperienceIntoView = () => {
    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      experienceRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  };

  const begin = () => {
    setStarted(true);
    bringExperienceIntoView();
  };

  const choose = (answer: string) => {
    setAnswers((current) => ({ ...current, [question.key]: answer }));
  };

  const next = () => {
    if (!selected) return;
    if (step === questions.length - 1) setComplete(true);
    else setStep((current) => current + 1);
    bringExperienceIntoView();
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setComplete(false);
    setStarted(false);
  };

  return (
    <section className={styles.freeCheck} id="free-vastu-check" aria-labelledby="free-check-title">
      <div className={styles.freeCheckIntro}>
        <p className={styles.eyebrow}>60-second spatial reflection</p>
        <h2 id="free-check-title">How aligned is your home?</h2>
        <p>
          Walk through six simple questions to organise what you already know about your
          space. No contact details are required to see your overview.
        </p>
        <div className={styles.freeCheckMandala} aria-hidden="true">
          <span>न</span><i /><i /><i />
        </div>
      </div>

      <div className={styles.checkExperience} ref={experienceRef}>
        {!started && !complete && (
          <div className={styles.checkStart}>
            <span>Free Vastu Check</span>
            <strong>Six questions.<br />One clearer conversation.</strong>
            <p>This is a general orientation exercise—not a professional Vastu diagnosis.</p>
            <button onClick={begin}>Start free check <b aria-hidden="true">→</b></button>
          </div>
        )}

        {started && !complete && (
          <div className={styles.checkQuestion} key={question.key}>
            <div className={styles.checkProgress}>
              <span>0{step + 1} — 0{questions.length}</span>
              <i><b style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></i>
            </div>
            <div className={styles.checkQuestionCopy}>
              <span>Question 0{step + 1}</span>
              <h3>{question.title}</h3>
              <p>{question.hint}</p>
            </div>

            {question.compass ? (
              <>
                <div className={styles.checkCompass} role="group" aria-label={question.title}>
                  <div className={styles.checkCompassCore} aria-hidden="true"><span>N</span><i /></div>
                  {question.options.filter((option) => option !== "Not present").map((option, index) => (
                    <button
                      key={option}
                      className={selected === option ? styles.checkOptionActive : ""}
                      style={{ "--check-index": index } as React.CSSProperties}
                      onClick={() => choose(option)}
                      aria-pressed={selected === option}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {question.options.some((option) => option === "Not present") && (
                  <button className={`${styles.checkNotPresent} ${selected === "Not present" ? styles.checkOptionActive : ""}`} onClick={() => choose("Not present")} aria-pressed={selected === "Not present"}>No puja / meditation space</button>
                )}
              </>
            ) : (
              <div className={styles.checkOptions} role="group" aria-label={question.title}>
                {question.options.map((option) => (
                  <button key={option} className={selected === option ? styles.checkOptionActive : ""} onClick={() => choose(option)} aria-pressed={selected === option}>
                    {option}<span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            )}

            <div className={styles.checkNavigation}>
              <button onClick={() => step === 0 ? setStarted(false) : setStep((current) => current - 1)}>← Back</button>
              <button onClick={next} disabled={!selected}>{step === questions.length - 1 ? "See overview" : "Continue"} →</button>
            </div>
          </div>
        )}

        {complete && (
          <div className={styles.checkResult}>
            <span>Quick Vastu Overview</span>
            <h3>Your space is ready for a more informed conversation.</h3>
            <p>
              Your answers create a useful directional snapshot. Because approved assessment
              rules are not available in this website, we have intentionally not generated a
              score or diagnosis. Acharya Vikash Kumar can interpret these relationships in the
              context of your complete floor plan.
            </p>
            <div className={styles.answerSummary}>
              {questions.map((item) => <span key={item.key}>{item.key}: <b>{answers[item.key]}</b></span>)}
            </div>
            <div className={styles.checkResultActions}>
              <button onClick={onConsultation}>Discuss this overview <span aria-hidden="true">↗</span></button>
              <button onClick={reset}>Start again</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
