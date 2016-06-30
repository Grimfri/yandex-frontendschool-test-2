/**
 * @param {Array} data – массив CSS классов
 */
module.exports = function(data) {
    // Ваш код

    var firstLetterLimit = 51;
    var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789';

    /**
     * Считает количество имен в масииве
     *
     * @param {Array} data – массив CSS классов
     * @return {Object} - ключ = название, значение = количество
     */
    var getAmountMap = function(data){
        var amountMap = {};
        for (var index = 0; index < data.length; index++) {
            if (amountMap[data[index]]) {
                amountMap[data[index]] = amountMap[data[index]] + 1;
            } else {
                amountMap[data[index]] = 1;
            }
        }

        return amountMap;
    };
    /**
     * Преобразует объект в массив
     * @param {Object} Obj - ключ = название, значение = количество
     * @returns {Array} - массив {name: название ,amount: количество}
     */
    var transformObjectToArray = function(Obj){
        var array = [];
        for (var k in Obj) {
            if (Obj.hasOwnProperty(k)) {
                array.push({name:k, amount: Obj[k]});
            }
        }
        return array;
    };
    /**
     * Сортирует массив по полю amount объекта.
     *
     * @param {Array.<Object>} array - массив
     * @returns {Array.<Object>} - отсортированный массив
     */
    var sortAmountArray = function(array){
        return array.sort(function(a,b){
            return b.amount - a.amount;
        });
    };
    /**
     * Проверят, является ли значение символа максимальным в текущей позиции
     * @param nameArray - название класса
     * @param position - позиция текущего символа
     * @returns {boolean}
     */
    var checkLimit = function(nameArray, position){
        if(position == 0 && nameArray[position] == alphabet[firstLetterLimit]){
            return true;
        }
        if(position > 0 && nameArray[position] == alphabet[alphabet.length-1]){
            return true;
        }
        return false;
    };
    /**
     * Возвращает позицию текущего символа в алфавите
     * @param {String} character - символ
     * @returns {Number} - позиция
     */
    var getCurrentAlphabetIndex = function( character){
        return alphabet.indexOf(character);
    };
    /**
     * Увеличивает длину массива и сбрасывает все буквы на первую в алфавите
     * @param nameArray
     * @returns {*}
     */
    var increaseClassLength = function(nameArray){
        nameArray.unshift(alphabet[0]);
        for(var letter in nameArray){
            nameArray[letter] = alphabet[0];
        }
        return nameArray;
    };
    /**
     * Сбрасывает все буквы на первую в алфавите, начиная с определенной позиции
     * @param {Array} nameArray - массив символов
     * @param {Number} position - индекс позиции
     * @returns {Array} - обновленный массив
     */
    var resetNext = function(nameArray, position){
        for(var i=position+1; i<nameArray.length;i++){
            nameArray[i] = alphabet[0];
        }
        return nameArray;
    };
    /**
     * Генерирует следующее имя класса
     * @param {Object} data
     * @param {Array} data.nameArray - предыдущее имя класса
     * @param {Number} data.position - позиция символа, который следует изменить
     * @returns {Object}
     */
    var nameGenerator = function(data){
        var nameArray = data.nameArray,
            position = data.position;

        if(nameArray.length == 0){
            nameArray = increaseClassLength(nameArray);
            return {nameArray:nameArray, position:position};
        }else
        if(checkLimit(nameArray, position)){
            if(position > 0){
                position--;
                return nameGenerator({nameArray:nameArray, position:position});
            }else{
                nameArray = increaseClassLength(nameArray);
                position = nameArray.length - 1;
                return {nameArray:nameArray, position:position};
            }
        }else{
            var currentAlphabetIndex = getCurrentAlphabetIndex(nameArray[position]);
            nameArray[position] = alphabet[currentAlphabetIndex + 1];  // то "увеличиваем" букву
            nameArray = resetNext(nameArray,position);
            position = nameArray.length - 1;

            return {nameArray:nameArray, position:position};
        }
    };


    var amountMap = getAmountMap(data);
    var amountArray = transformObjectToArray(amountMap);
    var amountArraySorted = sortAmountArray(amountArray);

    var generatorData = {
        nameArray:[],
        position:0
    };

    var result = {};
    for(var index in amountArraySorted){
        generatorData = nameGenerator(generatorData);
        result[amountArraySorted[index].name] = generatorData.nameArray.join('');
    }

    return result;

};