const { Selection } = require("../../../shared/selection");

exports.EditorHistory = class {
  constructor(canvasPixelRatio) {
    this.beforeEdits = [];
    this.afterEdits = [];
    this.canvasPixelRatio = canvasPixelRatio;
  }

  push(canvas, area, recordType) {
    const record = new EditRecord(
      canvas,
      area,
      this.canvasPixelRatio,
      recordType
    );
    this.beforeEdits.push(record);
    this.afterEdits = [];
  }

  pushDiff(canvas, area) {
    this.push(canvas, area, RecordType.DIFF);
  }

  pushFrame(canvas, area) {
    this.push(canvas, area, RecordType.FRAME);
  }

  canUndo() {
    return !!this.beforeEdits.length;
  }

  undo(canvasBeforeUndo) {
    if (!this.canUndo()) {
      return null;
    }

    return this._replay(canvasBeforeUndo, this.beforeEdits, this.afterEdits);
  }

  canRedo() {
    return !!this.afterEdits.length;
  }

  redo(canvasBeforeRedo) {
    if (!this.canRedo()) {
      return null;
    }

    return this._replay(canvasBeforeRedo, this.afterEdits, this.beforeEdits);
  }

  _replay(canvasBeforeChange, from, to) {
    const fromRecord = from.pop();

    let area = fromRecord.area;
    if (fromRecord.recordType === RecordType.FRAME) {
      area = new Selection(
        0, 0,
        parseInt(canvasBeforeChange.style.width, 10),
        parseInt(canvasBeforeChange.style.height, 10)
      );
    }

    const toRecord = new EditRecord(
      canvasBeforeChange,
      area,
      this.canvasPixelRatio,
      fromRecord.recordType
    );

    to.push(toRecord);

    return fromRecord;
  }
};

class EditRecord {
  constructor(canvas, area, canvasPixelRatio, recordType) {
    this.area = area;
    this.recordType = recordType;
    this.canvas = this.captureCanvas(canvas, area, canvasPixelRatio, recordType);
  }

  captureCanvas(canvas, area, canvasPixelRatio, recordType) {
    const copy = document.createElement("canvas");

    if (recordType === RecordType.FRAME) {
      copy.width = canvas.width;
      copy.height = canvas.height;
      const copyContext = copy.getContext("2d");
      copyContext.scale(canvasPixelRatio, canvasPixelRatio);
      copyContext.drawImage(
        canvas,
        0, 0, canvas.width, canvas.height,
        0, 0, area.width, area.height);
      return copy;
    }

    copy.width = area.width * canvasPixelRatio;
    copy.height = area.height * canvasPixelRatio;
    const copyContext = copy.getContext("2d");
    copyContext.scale(canvasPixelRatio, canvasPixelRatio);
    copyContext.drawImage(
      canvas,
      area.left * canvasPixelRatio,
      area.top * canvasPixelRatio,
      area.width * canvasPixelRatio,
      area.height * canvasPixelRatio,
      0, 0, area.width, area.height
    );

    return copy;
  }
}

const RecordType = { DIFF: 0, FRAME: 1 };
exports.RecordType = RecordType;
