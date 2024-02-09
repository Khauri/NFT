// Need to implement all this shit: https://w3c.github.io/input-events/#interface-InputEvent-Attributes
// But let's start with insertText, insertParagraph, insertFromPaste, deleteByCut, deleteContentBackward, deleteContentForward, historyUndo, historyRedo

type InputEvents = 'insertText' | 'insertParagraph' | 'insertFromPaste';

type Selection = {
  start: number,
  end: number,
}

type HandlerInput = {
  text?: string | null,
  // In case we need to support multiple cursors
  selections: Selection[],
}

// TODO: this should return a
type Handler = (input: HandlerInput) => {status: boolean, selections: Selection[]};

function sortSelections(selections: Selection[]) {
  return selections.toSorted((a, b) => a.start - b.start);
}

export class Coder {
  onUpdate = () => {};

  code = '';

  constructor(onUpdate: () => void) {
    this.onUpdate = onUpdate;
  }

  destroy() {
    // Clean up I guess
  }

  fromBeforeInputEvent(e: InputEvent) {
    console.log(e);
    const {inputType, data} = e;
    const handler = this[inputType as InputEvents] as Handler | void;
    if(typeof handler !== 'function') {
      console.warn(`${inputType} not yet implemented`);
      return;
    }
    const ranges = e.getTargetRanges();
    const selections = ranges.map((range) => {
      return {
        start: range.startOffset,
        end: range.endOffset,
      }
    });
    handler.call(this, {text: data, selections});
    e.preventDefault();
    this.onUpdate();
  }

  insertText({text, selections}: HandlerInput) {
    // A non-empty string is required to do anything
    if(!text) {
      return;
    }
    let added = 0;
    const newSelections: Selection[] = [];
    for(const selection of sortSelections(selections)) {
      const {start, end} = selection;
      this.code = this.code.slice(0, start + added) + text + this.code.slice(end + added);
      added += text.length;
      newSelections.push({
        start: start + added,
        end: start + added,
      });
    }
    return {
      status: true,
      selections: newSelections,
    }
  }

  insertParagraph({selections}: HandlerInput) {
    selections.forEach((selection) => {});
  }

  insertFromPaste() {

  }

  deleteByCut() {

  }

  deleteContentBackward() {

  }

  deleteContentForward() {

  }

  historyUndo() {

  }

  historyRedo() {

  }
}