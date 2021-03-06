запроситьМодуль('./руссфифцировать.джаваскрипт');

function являетсяИнтересным(число, офигенныеФразы) {

  var интересное = function (число) {
    return число.является(почтиИнтересным).илиЖе(одноИз, офигенныеФразы).вНатуре();
  }

  if (число.имеет(корректнуюДлину).иЕще(интересное).вНатуре()) {
    return 2;
  }

  var другиеЧислаЯвляютсяИнтересными = [число + 1, число + 2].хотяБыОдинЭлемент(function (число) {
    return число.имеет(корректнуюДлину).иЕще(интересное).вНатуре();
  });

  if (другиеЧислаЯвляютсяИнтересными) {
    return 1;
  }

  return 0;
}

function почтиИнтересным(число) {
  return число.имеет(нулиВКонце).илиИмеет(одинаковыеЦифры).илиЖе(возрастающаяПоследовательность)
    .илиЖе(убывающаяПоследовательность).илиЖе(палиндром).вНатуре();
}

function корректнуюДлину(число) {
  return число.кСтроке().длина > 2;
}

function нулиВКонце(число) {
  var цифры = число.кСтроке();
  return цифры.срезать(1).разделить('').каждая(function (цифра) { return цифра == 0; });
}

function одинаковыеЦифры(число) {
  var цифры = число.кСтроке();
  return цифры.разделить('').каждая(function (цифра) { return цифра == цифры[0]; });
}

var возрПоследовательность = '1234567890';

function возрастающаяПоследовательность(число) {
  var цифры = число.кСтроке();
  return возрПоследовательность.взятьИндекс(цифры) != -1;
}

var убывПоследовательность = '9876543210';

function убывающаяПоследовательность(число) {
  var цифры = число.кСтроке();
  return убывПоследовательность.взятьИндекс(цифры) != -1;
}

function палиндром(число) {
  var цифры = число.кСтроке();
  return цифры == цифры.разделить('').наоборот().соединить('');
}

function одноИз(число, массив) {
  return массив.взятьИндекс(число) != -1;
}

Число.прототип.является = Число.прототип.являются = Число.прототип.имеет = Число.прототип.имеют = function (предикат, аргументы) {
  var аргументы = [ this.значение() ].concat(Массив.прототип.срезать.вызвать(arguments, 1));
  return new ПредикатнаяОбертка(this.значение(), предикат.применить(ничто, аргументы));
};

function ПредикатнаяОбертка(субъект, начальноеЗначение) {
  this.субъект = субъект;
  this.логическоеЗначение = начальноеЗначение;
}

var прототипОбертки = ПредикатнаяОбертка.прототип;

прототипОбертки.иИмеют = прототипОбертки.иИмеет = прототипОбертки.иЯвляются = прототипОбертки.иЯвляется = function (предикат, аргументы) {
  var аргументы = [ this.субъект ].concat(Массив.прототип.срезать.вызвать(arguments, 1));
  this.логическоеЗначение = this.логическоеЗначение && предикат.применить(ничто, аргументы);
  return this;
};

прототипОбертки.илиИмеют = прототипОбертки.илиИмеет = прототипОбертки.илиЯвляются = прототипОбертки.илиЯвляется = function (предикат, аргументы) {
  var аргументы = [ this.субъект ].concat(Массив.прототип.срезать.вызвать(arguments, 1));
  this.логическоеЗначение = this.логическоеЗначение || предикат.применить(ничто, аргументы);
  return this;
};

прототипОбертки.вНатуре = function () {
  return this.логическоеЗначение;
};

модуль.экспортированныеЭлементы = являетсяИнтересным;