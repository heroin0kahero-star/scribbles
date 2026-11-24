import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, CheckCircle2, HelpCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { READING_DETECTIVE_STAGES } from '../data/scribblesData';

export default function ReadingChallenge() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [showClues, setShowClues] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  const stage = READING_DETECTIVE_STAGES[activeStageIdx];
  const answeredCount = stage.questions.filter(
    (q) => selectedAnswers[q.id] !== undefined
  ).length;

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleResetStage = () => {
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      stage.questions.forEach((q) => {
        delete next[q.id];
      });
      return next;
    });
    setShowClues(false);
  };

  const renderHighlightedSentence = (sentence: string) => {
    if (!showClues) return sentence;
    for (const clue of stage.clues) {
      const idx = sentence.toLowerCase().indexOf(clue.phrase.toLowerCase());
      if (idx !== -1) {
        const before = sentence.slice(0, idx);
        const match = sentence.slice(idx, idx + clue.phrase.length);
        const after = sentence.slice(idx + clue.phrase.length);
        return (
          <>
            {before}
            <mark className="rounded bg-[#F5CB65]/70 px-1 py-0.5 text-[#26352F] font-semibold">
              {match}
            </mark>
            {after}
          </>
        );
      }
    }
    return sentence;
  };

  return (
    <div className="space-y-8">
      {/* Stage Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#26352F]/10 pb-6">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Reading Detective Stages">
          {READING_DETECTIVE_STAGES.map((item, idx) => {
            const active = idx === activeStageIdx;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setActiveStageIdx(idx);
                  setShowClues(false);
                }}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#26352F] text-[#FFF8ED]'
                    : 'bg-[#F6ECD9] text-[#26352F] hover:bg-[#DDE9D9]'
                }`}
              >
                {item.stageNumber} · {item.stageTitle.split('—')[1]?.trim()}
              </button>
            );
          })}
        </div>

        <p className="text-xs font-semibold text-[#4B5D55]">
          Website Demonstration · {stage.difficultyLabel}
        </p>
      </div>

      {/* Main Detective Split Layout */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left: Passage & Clues */}
        <div className="lg:col-span-6 rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED] p-7 sm:p-9 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-hand text-xl text-[#466B56]">{stage.stageTitle}</p>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#26352F]">
                {stage.passageTitle}
              </h3>
            </div>
            <Search className="h-6 w-6 text-[#466B56] shrink-0" aria-hidden="true" />
          </div>

          <div className="space-y-4 rounded-2xl bg-[#F6ECD9]/75 p-6 text-lg leading-relaxed text-[#26352F]">
            {stage.passage.map((line, i) => (
              <p key={i}>{renderHighlightedSentence(line)}</p>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => setShowClues((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-[#26352F]/20 bg-[#F5CB65]/40 px-4 py-2 text-sm font-bold text-[#26352F] hover:bg-[#F5CB65]/70 transition-colors cursor-pointer"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span>{showClues ? 'Hide Story Clues' : 'Spot the Clues'}</span>
            </button>

            <span className="text-xs font-semibold text-[#4B5D55] tabular-nums">
              {answeredCount} of {stage.questions.length} thinking questions answered
            </span>
          </div>

          {showClues && (
            <div className="space-y-2.5 rounded-2xl border border-[#26352F]/12 bg-[#DDE9D9]/45 p-5">
              <p className="text-xs font-bold tracking-wide uppercase text-[#466B56]">
                Detective Clue Notes
              </p>
              {stage.clues.map((clue) => (
                <div key={clue.phrase} className="text-sm text-[#26352F]">
                  <span className="font-bold">“{clue.phrase}”</span> — {clue.hint}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Thinking Questions */}
        <div className="lg:col-span-6 space-y-5">
          {stage.questions.map((question, qIndex) => {
            const chosen = selectedAnswers[question.id];
            const isAnswered = chosen !== undefined;
            const isCorrect = chosen === question.correctIndex;

            return (
              <div
                key={question.id}
                className="rounded-3xl border border-[#26352F]/12 bg-[#FFF8ED] p-6 sm:p-7 space-y-4"
              >
                <p className="text-xs font-bold tracking-wider uppercase text-[#4B5D55] tabular-nums">
                  Thinking Question 0{qIndex + 1}
                </p>
                <h4 className="font-display text-xl font-semibold text-[#26352F]">
                  {question.prompt}
                </h4>

                <div className="space-y-2.5">
                  {question.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    const showRight = isAnswered && optIdx === question.correctIndex;
                    const showWrong = isAnswered && isSelected && !isCorrect;

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption(question.id, optIdx)}
                        className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm sm:text-base font-medium transition-colors cursor-pointer ${
                          showRight
                            ? 'border-[#466B56] bg-[#DDE9D9]/80 text-[#26352F]'
                            : showWrong
                            ? 'border-[#EF9B82] bg-[#EF9B82]/25 text-[#26352F]'
                            : isSelected
                            ? 'border-[#26352F] bg-[#F6ECD9]'
                            : 'border-[#26352F]/15 bg-white/60 hover:bg-[#F6ECD9]/60'
                        }`}
                      >
                        <span>{opt}</span>
                        {showRight && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#466B56] shrink-0">
                            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                            <span>Clue Match</span>
                          </span>
                        )}
                        {showWrong && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#9A3412] shrink-0">
                            <HelpCircle className="h-4 w-4" aria-hidden="true" />
                            <span>Look Again</span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="rounded-2xl bg-[#F6ECD9]/80 p-4 text-sm leading-relaxed text-[#26352F]">
                    <span className="font-bold">Why: </span>
                    {question.explanation}
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleResetStage}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#4B5D55] hover:text-[#26352F] cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Reset This Passage</span>
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#466B56] px-5 py-2.5 text-sm font-semibold text-[#FFF8ED] hover:bg-[#345241] transition-colors"
            >
              <span>Enquire About Reading Detective Practice Sheets</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
