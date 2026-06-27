/**
 * Module-level store for communicating flow completion back to the wizard.
 * Flow screens call `complete(stepIndex)` before calling `router.back()`.
 * The wizard consumes the value when it regains focus.
 */
let _pending: number | null = null;

export const wizardStore = {
  complete(step: number) {
    _pending = step;
  },
  consume(): number | null {
    const s = _pending;
    _pending = null;
    return s;
  },
};
