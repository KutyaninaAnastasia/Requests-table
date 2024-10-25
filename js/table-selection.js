function updateSelectedCount() {
    const checkboxes = document.querySelectorAll('.seo-table__body input[type="checkbox"]:checked');
    const selectedCount = checkboxes.length;
    const deleteWrap = document.querySelector('.seo-table__delete-wrap');
    const deleteButton = deleteWrap.querySelector('.seo-table__delete-btn');
    const selectedText = deleteWrap.querySelector('.seo-table__selected-count');
    
    if (selectedCount > 0) {
        deleteWrap.style.display = 'flex';
        selectedText.innerHTML = `Выбрано слов <span class="seo-table__selected-count--bold">${selectedCount}</span>`;
    } else {
        deleteWrap.style.display = 'none';
        selectedText.textContent = '';
    }

    const pagination = document.querySelector('.seo-table__pagination');
    if (deleteWrap.style.display === 'flex') {
        pagination.style.marginLeft = 'auto';
    } else {
        pagination.style.marginLeft = '0';
    }
}

document.querySelector('.seo-table__head input[type="checkbox"]').addEventListener('change', function() {
    const isChecked = this.checked;
    const checkboxes = document.querySelectorAll('.seo-table__body input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = isChecked;
    });
    updateSelectedCount();
});

document.querySelectorAll('.seo-table__body input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', updateSelectedCount);
});
