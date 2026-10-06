const MATERIAL_SETTINGS = {
  uPVC: {
    frameAllowance: 15,
    glazingAllowance: 32,
  },
  wood: {
    frameAllowance: 15,
    glazingAllowance: 32,
  },
};

const form = document.querySelector('#window-form');
const materialInput = document.querySelector('#material');
const widthInput = document.querySelector('#width');
const heightInput = document.querySelector('#height');
const resultFrameWidth = document.querySelector('#frame-width');
const resultFrameHeight = document.querySelector('#frame-height');
const resultGlazingWidth = document.querySelector('#glazing-width');
const resultGlazingHeight = document.querySelector('#glazing-height');
const notesBox = document.querySelector('#notes');

function numberValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getMaterialName(materialType) {
  return materialType === 'wood' ? 'Дерево' : 'uPVC';
}

function calculateWindow(materialType, totalWidth, totalHeight) {
  const config = MATERIAL_SETTINGS[materialType];
  if (!config) {
    throw new Error('Unsupported material type selected.');
  }

  return {
    materialType,
    frameWidth: totalWidth - config.frameAllowance,
    frameHeight: totalHeight - config.frameAllowance,
    glazingWidth: totalWidth - config.glazingAllowance,
    glazingHeight: totalHeight - config.glazingAllowance,
    frameAllowance: config.frameAllowance,
    glazingAllowance: config.glazingAllowance,
  };
}

function formatMm(value) {
  return `${Math.round(value)} мм`;
}

function updateResult(result) {
  resultFrameWidth.textContent = formatMm(result.frameWidth);
  resultFrameHeight.textContent = formatMm(result.frameHeight);
  resultGlazingWidth.textContent = formatMm(result.glazingWidth);
  resultGlazingHeight.textContent = formatMm(result.glazingHeight);

  notesBox.textContent = `Для ${getMaterialName(result.materialType)} використано припуск: рама ${result.frameAllowance} мм з кожного боку та скло ${result.glazingAllowance} мм з кожного боку.`;
}

function handleCalculation(event) {
  event.preventDefault();

  const width = numberValue(widthInput.value);
  const height = numberValue(heightInput.value);

  if (width <= 0 || height <= 0) {
    notesBox.textContent = 'Будь ласка, введіть ширину та висоту більше нуля.';
    return;
  }

  updateResult(calculateWindow(materialInput.value, width, height));
}

form.addEventListener('submit', handleCalculation);

const initialResult = calculateWindow('uPVC', 1200, 1500);
updateResult(initialResult);
