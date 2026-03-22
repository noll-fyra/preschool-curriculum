/**
 * Web Speech API narration for child activities (browser TTS).
 * Cancel before each new utterance so prompts and taps do not overlap.
 */

export function cancelActivitySpeech(): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

export function speechSynthesisAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Normalise whitespace; strip characters that confuse some engines (optional). */
function normaliseForSpeech(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function speakActivityText(text: string): void {
  if (!speechSynthesisAvailable()) return;
  const trimmed = normaliseForSpeech(text);
  if (!trimmed) return;

  const synth = window.speechSynthesis;

  const doSpeak = () => {
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(trimmed);
    utter.lang = "en-SG";
    utter.rate = 0.9;
    utter.pitch = 1;

    const voices = synth.getVoices();
    const voice =
      voices.find((v) => v.lang === "en-SG") ??
      voices.find((v) => v.lang.toLowerCase().startsWith("en-sg")) ??
      voices.find((v) => v.lang.toLowerCase().startsWith("en"));
    if (voice) utter.voice = voice;

    synth.speak(utter);
  };

  if (synth.getVoices().length === 0) {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      synth.removeEventListener("voiceschanged", onVoices);
      window.clearTimeout(fallback);
      doSpeak();
    };
    const onVoices = () => finish();
    const fallback = window.setTimeout(finish, 800);
    synth.addEventListener("voiceschanged", onVoices);
    void synth.getVoices();
  } else {
    doSpeak();
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
