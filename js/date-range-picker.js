$(function() {
    $('#daterange').daterangepicker({
        "startDate": "01/10/2024",
        "endDate": "01/11/2024",
        "opens": "center",
        "locale": {
            "format": "DD.MM.YYYY",
            "separator": " - ",
            "applyLabel": "Применить",
            "cancelLabel": "Отменить",
            "fromLabel": "От",
            "toLabel": "До",
            "customRangeLabel": "Период",
            "daysOfWeek": ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            "monthNames": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            "firstDay": 1
        },
        ranges: {
           'Сегодня': [moment(), moment()],
           'Вчера': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Последние 7 дней': [moment().subtract(6, 'days'), moment()],
           'Последние 30 дней': [moment().subtract(29, 'days'), moment()],
           'Последние 90 дней': [moment().subtract(89, 'days'), moment()],
           'От начала работы': [moment().subtract(365, 'days'), moment()]
        }
    });
});
