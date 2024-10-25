let isSorted = false;
let originalRows = [];
const resetSortButton = document.getElementById('reset-sort');

function showResetSortButton() {
  resetSortButton.style.display = 'inline-block';
  isSorted = true;
}

function hideResetSortButton() {
  resetSortButton.style.display = 'none';
  isSorted = false;
}

function sortTable(columnIndex) {
  const table = document.querySelector('.seo-table__content tbody');
  const rows = Array.from(table.rows);

  rows.sort((rowA, rowB) => {
    const valueA = getMainValue(rowA.cells[columnIndex]);
    const valueB = getMainValue(rowB.cells[columnIndex]);
    return valueB - valueA;
  });

  rows.forEach(row => table.appendChild(row));

  showResetSortButton();
  closeDropdown(activeIcon, activeIcon.closest('th').querySelector('.seo-table__arrow-icon--dates'), dropdown, 'icons/filter_icon_active.svg', 'icons/table_arrow_active.svg', false);
}

function saveOriginalOrder() {
  const table = document.querySelector('.seo-table__content tbody');
  originalRows = Array.from(table.rows);
}

saveOriginalOrder();

function resetSort() {
  const table = document.querySelector('.seo-table__content tbody');
  originalRows.forEach(row => table.appendChild(row));
  hideResetSortButton();
}

resetSortButton.addEventListener('click', resetSort);

function addIconsToDateHeaders() {
  const dateRegex = /\d{2}\.\d{2}\.\d{4}/;
  document.querySelectorAll('.seo-table__head-cell').forEach(header => {
    const headerText = header.textContent.trim();
    if (dateRegex.test(headerText)) {
      const filterIcon = createIcon('icons/filter_icon.svg', 'Фильтр', 'seo-table__filter-icon--dates');
      const arrowIcon = createIcon('icons/table_arrow.svg', 'Стрелка', 'seo-table__arrow-icon--dates');
      const headerContent = document.createElement('span');
      headerContent.textContent = headerText;
      header.textContent = '';
      header.appendChild(filterIcon);
      header.appendChild(headerContent);
      header.appendChild(arrowIcon);
    }
  });
}

function createIcon(src, alt, className) {
  const icon = document.createElement('img');
  icon.src = src;
  icon.alt = alt;
  icon.classList.add(className);
  return icon;
}

function showDropdown(clickedIcon, dropdown, tableContainer, FILTER_OFFSET) {
  const iconRect = clickedIcon.getBoundingClientRect();
  dropdown.style.left = (iconRect.left - FILTER_OFFSET + tableContainer.scrollLeft) + 'px';
  dropdown.style.top = 3 + 'rem';
  dropdown.style.display = 'block';
}

function toggleIconImage(icon, activeSrc, defaultSrc) {
  const currentSrc = icon.getAttribute('src');
  icon.setAttribute('src', currentSrc === defaultSrc ? activeSrc : defaultSrc);
}

function handleIconClick(event, dropdown, tableContainer, FILTER_OFFSET) {
  if (event.target.classList.contains('seo-table__filter-icon--dates') || event.target.classList.contains('seo-table__arrow-icon--dates')) {
    const clickedIcon = event.target.closest('th').querySelector('.seo-table__filter-icon--dates');
    const clickedArrow = event.target.closest('th').querySelector('.seo-table__arrow-icon--dates');

    if (activeIcon === clickedIcon) {
      closeDropdown(clickedIcon, clickedArrow, dropdown, 'icons/filter_icon.svg', 'icons/table_arrow.svg', true);
      return;
    }

    if (activeIcon) {
      closeDropdown(activeIcon, activeIcon.closest('th').querySelector('.seo-table__arrow-icon--dates'), dropdown, 'icons/filter_icon.svg', 'icons/table_arrow.svg', true);
    }

    activeIcon = clickedIcon;
    activeColumn = clickedIcon.closest('th').cellIndex;

    toggleIconImage(activeIcon, 'icons/filter_icon_active.svg', 'icons/filter_icon.svg');
    toggleIconImage(clickedArrow, 'icons/table_arrow_active.svg', 'icons/table_arrow.svg');

    showDropdown(activeIcon, dropdown, tableContainer, FILTER_OFFSET);
    event.stopPropagation();
  }
}

function closeDropdown(filterIcon, arrowIcon, dropdown, filterDefaultSrc, arrowDefaultSrc, resetIcons = true) {
  dropdown.style.display = 'none';
  if (resetIcons) {
    filterIcon.setAttribute('src', filterDefaultSrc);
    arrowIcon.setAttribute('src', arrowDefaultSrc);
    activeIcon = null;
  }
}

function getMainValue(cell) {
  const mainValueElement = cell.querySelector('.seo-table__cell-value-main');
  return mainValueElement 
    ? parseFloat(mainValueElement.childNodes[0].textContent.trim().replace(/[^\d.-]/g, '')) || 0
    : parseFloat(cell.textContent.trim().replace(/[^\d.-]/g, '')) || 0;
}

const dropdown = document.getElementById('common-dropdown');
const tableContainer = document.querySelector('.seo-table__wrapper');
const FILTER_OFFSET = 25;
let activeColumn = null;
let activeIcon = null;

addIconsToDateHeaders();

document.querySelector('.seo-table__content').addEventListener('click', event => {
  handleIconClick(event, dropdown, tableContainer, FILTER_OFFSET);
});

dropdown.querySelectorAll('li').forEach(option => {
  option.addEventListener('click', function() {
    const action = this.textContent.trim();
    if (action === 'Позиция') sortTable(activeColumn);
  });
});

