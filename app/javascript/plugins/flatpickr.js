import flatpickr from "flatpickr";
flatpickr(".datepicker", {
  dateFormat: 'd/m/Y',
  language: "pt-BR",
  locale: {
    firstDayOfWeek: 0,
    weekdays: {
      shorthand: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      longhand: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],         
    },
    months: {
      shorthand: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Аgo', 'Set', 'Оut', 'Nov', 'Dez'],
      longhand: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    },
  }, 
});
