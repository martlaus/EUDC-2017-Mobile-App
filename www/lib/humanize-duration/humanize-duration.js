// HumanizeDuration.js - http://git.io/j0HgmQ

;(function () {
  var languages = {
    ar: {
      y: function (c) { return c === 1 ? 'Ų³Ł†Ų©' : 'Ų³Ł†ŁŲ§ŲŖ' },
      mo: function (c) { return c === 1 ? 'Ų´Ł‡Ų±' : 'Ų£Ų´Ł‡Ų±' },
      w: function (c) { return c === 1 ? 'Ų£Ų³ŲØŁŲ¹' : 'Ų£Ų³Ų§ŲØŁŲ¹' },
      d: function (c) { return c === 1 ? 'ŁŁŁ…' : 'Ų£ŁŲ§Ł…' },
      h: function (c) { return c === 1 ? 'Ų³Ų§Ų¹Ų©' : 'Ų³Ų§Ų¹Ų§ŲŖ' },
      m: function (c) { return c === 1 ? 'ŲÆŁ‚ŁŁ‚Ų©' : 'ŲÆŁ‚Ų§Ų¦Ł‚' },
      s: function (c) { return c === 1 ? 'Ų«Ų§Ł†ŁŲ©' : 'Ų«ŁŲ§Ł†Ł' },
      ms: function (c) { return c === 1 ? 'Ų¬Ų²Ų Ł…Ł† Ų§Ł„Ų«Ų§Ł†ŁŲ©' : 'Ų£Ų¬Ų²Ų§Ų Ł…Ł† Ų§Ł„Ų«Ų§Ł†ŁŲ©' },
      decimal: ','
    },
    ca: {
      y: function (c) { return 'any' + (c !== 1 ? 's' : '') },
      mo: function (c) { return 'mes' + (c !== 1 ? 'os' : '') },
      w: function (c) { return 'setman' + (c !== 1 ? 'es' : 'a') },
      d: function (c) { return 'di' + (c !== 1 ? 'es' : 'a') },
      h: function (c) { return 'hor' + (c !== 1 ? 'es' : 'a') },
      m: function (c) { return 'minut' + (c !== 1 ? 's' : '') },
      s: function (c) { return 'segon' + (c !== 1 ? 's' : '') },
      ms: function (c) { return 'milisegon' + (c !== 1 ? 's' : '') },
      decimal: ','
    },
    cs: {
      y: function (c) { return ['rok', 'roku', 'roky', 'let'][getCzechForm(c)] },
      mo: function (c) { return ['mÄ›sĆ­c', 'mÄ›sĆ­ce', 'mÄ›sĆ­ce', 'mÄ›sĆ­cÅÆ'][getCzechForm(c)] },
      w: function (c) { return ['tĆ½den', 'tĆ½dne', 'tĆ½dny', 'tĆ½dnÅÆ'][getCzechForm(c)] },
      d: function (c) { return ['den', 'dne', 'dny', 'dnĆ­'][getCzechForm(c)] },
      h: function (c) { return ['hodina', 'hodiny', 'hodiny', 'hodin'][getCzechForm(c)] },
      m: function (c) { return ['minuta', 'minuty', 'minuty', 'minut'][getCzechForm(c)] },
      s: function (c) { return ['sekunda', 'sekundy', 'sekundy', 'sekund'][getCzechForm(c)] },
      ms: function (c) { return ['milisekunda', 'milisekundy', 'milisekundy', 'milisekund'][getCzechForm(c)] },
      decimal: ','
    },
    da: {
      y: 'Ćr',
      mo: function (c) { return 'mĆned' + (c !== 1 ? 'er' : '') },
      w: function (c) { return 'uge' + (c !== 1 ? 'r' : '') },
      d: function (c) { return 'dag' + (c !== 1 ? 'e' : '') },
      h: function (c) { return 'time' + (c !== 1 ? 'r' : '') },
      m: function (c) { return 'minut' + (c !== 1 ? 'ter' : '') },
      s: function (c) { return 'sekund' + (c !== 1 ? 'er' : '') },
      ms: function (c) { return 'millisekund' + (c !== 1 ? 'er' : '') },
      decimal: ','
    },
    de: {
      y: function (c) { return 'Jahr' + (c !== 1 ? 'e' : '') },
      mo: function (c) { return 'Monat' + (c !== 1 ? 'e' : '') },
      w: function (c) { return 'Woche' + (c !== 1 ? 'n' : '') },
      d: function (c) { return 'Tag' + (c !== 1 ? 'e' : '') },
      h: function (c) { return 'Stunde' + (c !== 1 ? 'n' : '') },
      m: function (c) { return 'Minute' + (c !== 1 ? 'n' : '') },
      s: function (c) { return 'Sekunde' + (c !== 1 ? 'n' : '') },
      ms: function (c) { return 'Millisekunde' + (c !== 1 ? 'n' : '') },
      decimal: ','
    },
    en: {
      y: function (c) { return 'year' + (c !== 1 ? 's' : '') },
      mo: function (c) { return 'month' + (c !== 1 ? 's' : '') },
      w: function (c) { return 'week' + (c !== 1 ? 's' : '') },
      d: function (c) { return 'day' + (c !== 1 ? 's' : '') },
      h: function (c) { return 'hour' + (c !== 1 ? 's' : '') },
      m: function (c) { return 'minute' + (c !== 1 ? 's' : '') },
      s: function (c) { return 'second' + (c !== 1 ? 's' : '') },
      ms: function (c) { return 'millisecond' + (c !== 1 ? 's' : '') },
      decimal: '.'
    },
    es: {
      y: function (c) { return 'aĆ±o' + (c !== 1 ? 's' : '') },
      mo: function (c) { return 'mes' + (c !== 1 ? 'es' : '') },
      w: function (c) { return 'semana' + (c !== 1 ? 's' : '') },
      d: function (c) { return 'dĆ­a' + (c !== 1 ? 's' : '') },
      h: function (c) { return 'hora' + (c !== 1 ? 's' : '') },
      m: function (c) { return 'minuto' + (c !== 1 ? 's' : '') },
      s: function (c) { return 'segundo' + (c !== 1 ? 's' : '') },
      ms: function (c) { return 'milisegundo' + (c !== 1 ? 's' : '') },
      decimal: ','
    },
    fi: {
      y: function (c) { return c === 1 ? 'vuosi' : 'vuotta' },
      mo: function (c) { return c === 1 ? 'kuukausi' : 'kuukautta' },
      w: function (c) { return 'viikko' + (c !== 1 ? 'a' : '') },
      d: function (c) { return 'pĆ¤ivĆ¤' + (c !== 1 ? 'Ć¤' : '') },
      h: function (c) { return 'tunti' + (c !== 1 ? 'a' : '') },
      m: function (c) { return 'minuutti' + (c !== 1 ? 'a' : '') },
      s: function (c) { return 'sekunti' + (c !== 1 ? 'a' : '') },
      ms: function (c) { return 'millisekunti' + (c !== 1 ? 'a' : '') },
      decimal: ','
    },
    fr: {
      y: function (c) { return 'an' + (c !== 1 ? 's' : '') },
      mo: 'mois',
      w: function (c) { return 'semaine' + (c !== 1 ? 's' : '') },
      d: function (c) { return 'jour' + (c !== 1 ? 's' : '') },
      h: function (c) { return 'heure' + (c !== 1 ? 's' : '') },
      m: function (c) { return 'minute' + (c !== 1 ? 's' : '') },
      s: function (c) { return 'seconde' + (c !== 1 ? 's' : '') },
      ms: function (c) { return 'milliseconde' + (c !== 1 ? 's' : '') },
      decimal: ','
    },
    gr: {
      y: function (c) { return c === 1 ? 'Ļ‡ĻĻĪ½ĪæĻ‚' : 'Ļ‡ĻĻĪ½Ī¹Ī±' },
      mo: function (c) { return c === 1 ? 'Ī¼Ī®Ī½Ī±Ļ‚' : 'Ī¼Ī®Ī½ĪµĻ‚' },
      w: function (c) { return c === 1 ? 'ĪµĪ²Ī´ĪæĪ¼Ī¬Ī´Ī±' : 'ĪµĪ²Ī´ĪæĪ¼Ī¬Ī´ĪµĻ‚' },
      d: function (c) { return c === 1 ? 'Ī¼Ī­ĻĪ±' : 'Ī¼Ī­ĻĪµĻ‚' },
      h: function (c) { return c === 1 ? 'ĻˇĻĪ±' : 'ĻˇĻĪµĻ‚' },
      m: function (c) { return c === 1 ? 'Ī»ĪµĻ€Ļ„Ļ' : 'Ī»ĪµĻ€Ļ„Ī¬' },
      s: function (c) { return c === 1 ? 'Ī´ĪµĻ…Ļ„ĪµĻĻĪ»ĪµĻ€Ļ„Īæ' : 'Ī´ĪµĻ…Ļ„ĪµĻĻĪ»ĪµĻ€Ļ„Ī±' },
      ms: function (c) { return c === 1 ? 'Ļ‡Ī¹Ī»Ī¹ĪæĻĻ„Ļ Ļ„ĪæĻ… Ī´ĪµĻ…Ļ„ĪµĻĪæĪ»Ī­Ļ€Ļ„ĪæĻ…' : 'Ļ‡Ī¹Ī»Ī¹ĪæĻĻ„Ī¬ Ļ„ĪæĻ… Ī´ĪµĻ…Ļ„ĪµĻĪæĪ»Ī­Ļ€Ļ„ĪæĻ…' },
      decimal: ','
    },
    hu: {
      y: 'Ć©v',
      mo: 'hĆ³nap',
      w: 'hĆ©t',
      d: 'nap',
      h: 'Ć³ra',
      m: 'perc',
      s: 'mĆsodperc',
      ms: 'ezredmĆsodperc',
      decimal: ','
    },
    id: {
      y: 'tahun',
      mo: 'bulan',
      w: 'minggu',
      d: 'hari',
      h: 'jam',
      m: 'menit',
      s: 'detik',
      ms: 'milidetik',
      decimal: '.'
    },
    is: {
      y: 'Ćr',
      mo: function (c) { return 'mĆnuĆ°' + (c !== 1 ? 'ir' : 'ur') },
      w: function (c) { return 'vik' + (c !== 1 ? 'ur' : 'a') },
      d: function (c) { return 'dag' + (c !== 1 ? 'ar' : 'ur') },
      h: function (c) { return 'klukkutĆ­m' + (c !== 1 ? 'ar' : 'i') },
      m: function (c) { return 'mĆ­nĆŗt' + (c !== 1 ? 'ur' : 'a') },
      s: function (c) { return 'sekĆŗnd' + (c !== 1 ? 'ur' : 'a') },
      ms: function (c) { return 'millisekĆŗnd' + (c !== 1 ? 'ur' : 'a') },
      decimal: '.'
    },
    it: {
      y: function (c) { return 'ann' + (c !== 1 ? 'i' : 'o') },
      mo: function (c) { return 'mes' + (c !== 1 ? 'i' : 'e') },
      w: function (c) { return 'settiman' + (c !== 1 ? 'e' : 'a') },
      d: function (c) { return 'giorn' + (c !== 1 ? 'i' : 'o') },
      h: function (c) { return 'or' + (c !== 1 ? 'e' : 'a') },
      m: function (c) { return 'minut' + (c !== 1 ? 'i' : 'o') },
      s: function (c) { return 'second' + (c !== 1 ? 'i' : 'o') },
      ms: function (c) { return 'millisecond' + (c !== 1 ? 'i' : 'o') },
      decimal: ','
    },
    ja: {
      y: 'å¹´',
      mo: 'ę',
      w: 'é€±',
      d: 'ę—',
      h: 'ę™‚é–“',
      m: 'å†',
      s: 'ē§’',
      ms: 'ććŖē§’',
      decimal: '.'
    },
    ko: {
      y: 'ė…„',
      mo: 'ź°ģ›”',
      w: 'ģ£¼ģ¯¼',
      d: 'ģ¯¼',
      h: 'ģ‹ź°„',
      m: 'ė¶„',
      s: 'ģ´',
      ms: 'ė°€ė¦¬ ģ´',
      decimal: '.'
    },
    lt: {
      y: function (c) { return ((c % 10 === 0) || (c % 100 >= 10 && c % 100 <= 20)) ? 'metÅ³' : 'metai' },
      mo: function (c) { return ['mÄ—nuo', 'mÄ—nesiai', 'mÄ—nesiÅ³'][getLithuanianForm(c)] },
      w: function (c) { return ['savaitÄ—', 'savaitÄ—s', 'savaiÄ¨iÅ³'][getLithuanianForm(c)] },
      d: function (c) { return ['diena', 'dienos', 'dienÅ³'][getLithuanianForm(c)] },
      h: function (c) { return ['valanda', 'valandos', 'valandÅ³'][getLithuanianForm(c)] },
      m: function (c) { return ['minutÄ—', 'minutÄ—s', 'minuÄ¨iÅ³'][getLithuanianForm(c)] },
      s: function (c) { return ['sekundÄ—', 'sekundÄ—s', 'sekundÅ¾iÅ³'][getLithuanianForm(c)] },
      ms: function (c) { return ['milisekundÄ—', 'milisekundÄ—s', 'milisekundÅ¾iÅ³'][getLithuanianForm(c)] },
      decimal: ','
    },
    ms: {
      y: 'tahun',
      mo: 'bulan',
      w: 'minggu',
      d: 'hari',
      h: 'jam',
      m: 'minit',
      s: 'saat',
      ms: 'milisaat',
      decimal: '.'
    },
    nl: {
      y: 'jaar',
      mo: function (c) { return c === 1 ? 'maand' : 'maanden' },
      w: function (c) { return c === 1 ? 'week' : 'weken' },
      d: function (c) { return c === 1 ? 'dag' : 'dagen' },
      h: 'uur',
      m: function (c) { return c === 1 ? 'minuut' : 'minuten' },
      s: function (c) { return c === 1 ? 'seconde' : 'seconden' },
      ms: function (c) { return c === 1 ? 'milliseconde' : 'milliseconden' },
      decimal: ','
    },
    no: {
      y: 'Ćr',
      mo: function (c) { return 'mĆned' + (c !== 1 ? 'er' : '') },
      w: function (c) { return 'uke' + (c !== 1 ? 'r' : '') },
      d: function (c) { return 'dag' + (c !== 1 ? 'er' : '') },
      h: function (c) { return 'time' + (c !== 1 ? 'r' : '') },
      m: function (c) { return 'minutt' + (c !== 1 ? 'er' : '') },
      s: function (c) { return 'sekund' + (c !== 1 ? 'er' : '') },
      ms: function (c) { return 'millisekund' + (c !== 1 ? 'er' : '') },
      decimal: ','
    },
    pl: {
      y: function (c) { return ['rok', 'roku', 'lata', 'lat'][getPolishForm(c)] },
      mo: function (c) { return ['miesiÄ…c', 'miesiÄ…ca', 'miesiÄ…ce', 'miesiÄ™cy'][getPolishForm(c)] },
      w: function (c) { return ['tydzieÅ„', 'tygodnia', 'tygodnie', 'tygodni'][getPolishForm(c)] },
      d: function (c) { return ['dzieÅ„', 'dnia', 'dni', 'dni'][getPolishForm(c)] },
      h: function (c) { return ['godzina', 'godziny', 'godziny', 'godzin'][getPolishForm(c)] },
      m: function (c) { return ['minuta', 'minuty', 'minuty', 'minut'][getPolishForm(c)] },
      s: function (c) { return ['sekunda', 'sekundy', 'sekundy', 'sekund'][getPolishForm(c)] },
      ms: function (c) { return ['milisekunda', 'milisekundy', 'milisekundy', 'milisekund'][getPolishForm(c)] },
      decimal: ','
    },
    pt: {
      y: function (c) { return 'ano' + (c !== 1 ? 's' : '') },
      mo: function (c) { return c !== 1 ? 'meses' : 'mĆŖs' },
      w: function (c) { return 'semana' + (c !== 1 ? 's' : '') },
      d: function (c) { return 'dia' + (c !== 1 ? 's' : '') },
      h: function (c) { return 'hora' + (c !== 1 ? 's' : '') },
      m: function (c) { return 'minuto' + (c !== 1 ? 's' : '') },
      s: function (c) { return 'segundo' + (c !== 1 ? 's' : '') },
      ms: function (c) { return 'milissegundo' + (c !== 1 ? 's' : '') },
      decimal: ','
    },
    ru: {
      y: function (c) { return ['Š»ŠµŃ‚', 'Š³Š¾Š´', 'Š³Š¾Š´Š°'][getSlavicForm(c)] },
      mo: function (c) { return ['Š¼ŠµŃŃ¸Ń†ŠµŠ²', 'Š¼ŠµŃŃ¸Ń†', 'Š¼ŠµŃŃ¸Ń†Š°'][getSlavicForm(c)] },
      w: function (c) { return ['Š½ŠµŠ´ŠµŠ»Ń', 'Š½ŠµŠ´ŠµŠ»Ń¸', 'Š½ŠµŠ´ŠµŠ»Šø'][getSlavicForm(c)] },
      d: function (c) { return ['Š´Š½ŠµŠ¹', 'Š´ŠµŠ½Ń', 'Š´Š½Ń¸'][getSlavicForm(c)] },
      h: function (c) { return ['Ń‡Š°ŃŠ¾Š²', 'Ń‡Š°Ń', 'Ń‡Š°ŃŠ°'][getSlavicForm(c)] },
      m: function (c) { return ['Š¼ŠøŠ½ŃŃ‚', 'Š¼ŠøŠ½ŃŃ‚Š°', 'Š¼ŠøŠ½ŃŃ‚Ń‹'][getSlavicForm(c)] },
      s: function (c) { return ['ŃŠµŠŗŃŠ½Š´', 'ŃŠµŠŗŃŠ½Š´Š°', 'ŃŠµŠŗŃŠ½Š´Ń‹'][getSlavicForm(c)] },
      ms: function (c) { return ['Š¼ŠøŠ»Š»ŠøŃŠµŠŗŃŠ½Š´', 'Š¼ŠøŠ»Š»ŠøŃŠµŠŗŃŠ½Š´Š°', 'Š¼ŠøŠ»Š»ŠøŃŠµŠŗŃŠ½Š´Ń‹'][getSlavicForm(c)] },
      decimal: ','
    },
    uk: {
      y: function (c) { return ['Ń€Š¾ŠŗŃ–Š²', 'Ń€Ń–Šŗ', 'Ń€Š¾ŠŗŠø'][getSlavicForm(c)] },
      mo: function (c) { return ['Š¼Ń–ŃŃ¸Ń†Ń–Š²', 'Š¼Ń–ŃŃ¸Ń†Ń', 'Š¼Ń–ŃŃ¸Ń†Ń–'][getSlavicForm(c)] },
      w: function (c) { return ['Š½ŠµŠ´Ń–Š»Ń', 'Š½ŠµŠ´Ń–Š»Ń¸', 'Š½ŠµŠ´Ń–Š»Ń–'][getSlavicForm(c)] },
      d: function (c) { return ['Š´Š½Ń–Š²', 'Š´ŠµŠ½Ń', 'Š´Š½Ń–'][getSlavicForm(c)] },
      h: function (c) { return ['Š³Š¾Š´ŠøŠ½', 'Š³Š¾Š´ŠøŠ½Š°', 'Š³Š¾Š´ŠøŠ½Šø'][getSlavicForm(c)] },
      m: function (c) { return ['Ń…Š²ŠøŠ»ŠøŠ½', 'Ń…Š²ŠøŠ»ŠøŠ½Š°', 'Ń…Š²ŠøŠ»ŠøŠ½Šø'][getSlavicForm(c)] },
      s: function (c) { return ['ŃŠµŠŗŃŠ½Š´', 'ŃŠµŠŗŃŠ½Š´Š°', 'ŃŠµŠŗŃŠ½Š´Šø'][getSlavicForm(c)] },
      ms: function (c) { return ['Š¼Ń–Š»Ń–ŃŠµŠŗŃŠ½Š´', 'Š¼Ń–Š»Ń–ŃŠµŠŗŃŠ½Š´Š°', 'Š¼Ń–Š»Ń–ŃŠµŠŗŃŠ½Š´Šø'][getSlavicForm(c)] },
      decimal: ','
    },
    sv: {
      y: 'Ćr',
      mo: function (c) { return 'mĆnad' + (c !== 1 ? 'er' : '') },
      w: function (c) { return 'veck' + (c !== 1 ? 'or' : 'a') },
      d: function (c) { return 'dag' + (c !== 1 ? 'ar' : '') },
      h: function (c) { return 'timm' + (c !== 1 ? 'ar' : 'e') },
      m: function (c) { return 'minut' + (c !== 1 ? 'er' : '') },
      s: function (c) { return 'sekund' + (c !== 1 ? 'er' : '') },
      ms: function (c) { return 'millisekund' + (c !== 1 ? 'er' : '') },
      decimal: ','
    },
    tr: {
      y: 'yÄ±l',
      mo: 'ay',
      w: 'hafta',
      d: 'gĆ¼n',
      h: 'saat',
      m: 'dakika',
      s: 'saniye',
      ms: 'milisaniye',
      decimal: ','
    },
    vi: {
      y: 'nÄm',
      mo: 'thĆng',
      w: 'tuįŗ§n',
      d: 'ngĆ y',
      h: 'giį»¯',
      m: 'phĆŗt',
      s: 'giĆ¢y',
      ms: 'mili giĆ¢y',
      decimal: ','
    },
    zh_CN: {
      y: 'å¹´',
      mo: 'äøŖę',
      w: 'å‘Ø',
      d: 'å¤©',
      h: 'å°¸ę—¶',
      m: 'å†é’',
      s: 'ē§’',
      ms: 'ęÆ«ē§’',
      decimal: '.'
    },
    zh_TW: {
      y: 'å¹´',
      mo: 'å€‹ę',
      w: 'å‘Ø',
      d: 'å¤©',
      h: 'å°¸ę™‚',
      m: 'å†é',
      s: 'ē§’',
      ms: 'ęÆ«ē§’',
      decimal: '.'
    }
  }

  // You can create a humanizer, which returns a function with default
  // parameters.
  function humanizer (passedOptions) {
    var result = function humanizer (ms, humanizerOptions) {
      var options = extend({}, result, humanizerOptions || {})
      return doHumanization(ms, options)
    }

    return extend(result, {
      language: 'en',
      delimiter: ', ',
      spacer: ' ',
      conjunction: '',
      serialComma: true,
      units: ['y', 'mo', 'w', 'd', 'h', 'm', 's'],
      languages: {},
      round: false,
      unitMeasures: {
        y: 31557600000,
        mo: 2629800000,
        w: 604800000,
        d: 86400000,
        h: 3600000,
        m: 60000,
        s: 1000,
        ms: 1
      }
    }, passedOptions)
  }

  // The main function is just a wrapper around a default humanizer.
  var humanizeDuration = humanizer({})

  // doHumanization does the bulk of the work.
  function doHumanization (ms, options) {
    var i, len, piece

    // Make sure we have a positive number.
    // Has the nice sideffect of turning Number objects into primitives.
    ms = Math.abs(ms)

    var dictionary = options.languages[options.language] || languages[options.language]
    if (!dictionary) {
      throw new Error('No language ' + dictionary + '.')
    }

    var pieces = []

    // Start at the top and keep removing units, bit by bit.
    var unitName, unitMS, unitCount
    for (i = 0, len = options.units.length; i < len; i++) {
      unitName = options.units[i]
      unitMS = options.unitMeasures[unitName]

      // What's the number of full units we can fit?
      if (i + 1 === len) {
        unitCount = ms / unitMS
      } else {
        unitCount = Math.floor(ms / unitMS)
      }

      // Add the string.
      pieces.push({
        unitCount: unitCount,
        unitName: unitName
      })

      // Remove what we just figured out.
      ms -= unitCount * unitMS
    }

    var firstOccupiedUnitIndex = 0
    for (i = 0; i < pieces.length; i++) {
      if (pieces[i].unitCount) {
        firstOccupiedUnitIndex = i
        break
      }
    }

    if (options.round) {
      var ratioToLargerUnit, previousPiece
      for (i = pieces.length - 1; i >= 0; i--) {
        piece = pieces[i]
        piece.unitCount = Math.round(piece.unitCount)

        if (i === 0) { break }

        previousPiece = pieces[i - 1]

        ratioToLargerUnit = options.unitMeasures[previousPiece.unitName] / options.unitMeasures[piece.unitName]
        if ((piece.unitCount % ratioToLargerUnit) === 0 || (options.largest && ((options.largest - 1) < (i - firstOccupiedUnitIndex)))) {
          previousPiece.unitCount += piece.unitCount / ratioToLargerUnit
          piece.unitCount = 0
        }
      }
    }

    var result = []
    for (i = 0, pieces.length; i < len; i++) {
      piece = pieces[i]
      if (piece.unitCount) {
        result.push(render(piece.unitCount, piece.unitName, dictionary, options))
      }

      if (result.length === options.largest) { break }
    }

    if (result.length) {
      if (!options.conjunction || result.length === 1) {
        return result.join(options.delimiter)
      } else if (result.length === 2) {
        return result.join(options.conjunction)
      } else if (result.length > 2) {
        return result.slice(0, -1).join(options.delimiter) + (options.serialComma ? ',' : '') + options.conjunction + result.slice(-1)
      }
    } else {
      return render(0, options.units[options.units.length - 1], dictionary, options)
    }
  }

  function render (count, type, dictionary, options) {
    var decimal
    if (options.decimal === void 0) {
      decimal = dictionary.decimal
    } else {
      decimal = options.decimal
    }

    var countStr = count.toString().replace('.', decimal)

    var dictionaryValue = dictionary[type]
    var word
    if (typeof dictionaryValue === 'function') {
      word = dictionaryValue(count)
    } else {
      word = dictionaryValue
    }

    return countStr + options.spacer + word
  }

  function extend (destination) {
    var source
    for (var i = 1; i < arguments.length; i++) {
      source = arguments[i]
      for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
          destination[prop] = source[prop]
        }
      }
    }
    return destination
  }

  // Internal helper function for Czech language.
  function getCzechForm (c) {
    if (c === 1) {
      return 0
    } else if (Math.floor(c) !== c) {
      return 1
    } else if (c % 10 >= 2 && c % 10 <= 4 && c % 100 < 10) {
      return 2
    } else {
      return 3
    }
  }

  // Internal helper function for Polish language.
  function getPolishForm (c) {
    if (c === 1) {
      return 0
    } else if (Math.floor(c) !== c) {
      return 1
    } else if (c % 10 >= 2 && c % 10 <= 4 && !(c % 100 > 10 && c % 100 < 20)) {
      return 2
    } else {
      return 3
    }
  }

  // Internal helper function for Russian and Ukranian languages.
  function getSlavicForm (c) {
    if (Math.floor(c) !== c) {
      return 2
    } else if ((c % 100 >= 5 && c % 100 <= 20) || (c % 10 >= 5 && c % 10 <= 9) || c % 10 === 0) {
      return 0
    } else if (c % 10 === 1) {
      return 1
    } else if (c > 1) {
      return 2
    } else {
      return 0
    }
  }

  // Internal helper function for Lithuanian language.
  function getLithuanianForm (c) {
    if (c === 1 || (c % 10 === 1 && c % 100 > 20)) {
      return 0
    } else if (Math.floor(c) !== c || (c % 10 >= 2 && c % 100 > 20) || (c % 10 >= 2 && c % 100 < 10)) {
      return 1
    } else {
      return 2
    }
  }

  humanizeDuration.getSupportedLanguages = function getSupportedLanguages () {
    var result = []
    for (var language in languages) {
      if (languages.hasOwnProperty(language)) {
        result.push(language)
      }
    }
    return result
  }

  humanizeDuration.humanizer = humanizer

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return humanizeDuration
    })
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = humanizeDuration
  } else {
    this.humanizeDuration = humanizeDuration
  }
})();  // eslint-disable-line semi
