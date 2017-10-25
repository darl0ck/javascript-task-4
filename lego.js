/* eslint-disable valid-jsdoc */
'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы or и and
 */
exports.isStar = false;

let EXPR_ORDER = ['sortBy', 'filterIn', 'select', 'format', 'limit'];

/**
 * Запрос к коллекции
 * @param {Array} collection
 * @params {...Function} – Функции для запроса
 * @returns {Array}
 */
exports.query = function (collection, ...q) {
    let potatoCollection = collection;
    q = q.sort(function (a, b) {
        return EXPR_ORDER.indexOf(a.name) - EXPR_ORDER.indexOf(b.name);
    });
    for (let i = 0; i < q.length; i++) {
        potatoCollection = q[i](potatoCollection);
    }

    return potatoCollection;
};


/**
 * Выбор полей
 * @params {...String}
 */
exports.select = function (...q) {
    return function select(collection) {
        return collection.map(el =>{
            let newObjOfFriends = {};
            q.forEach((field) => {
                if (el[field]) {
                    newObjOfFriends[field] = el[field];
                }
            });

            return newObjOfFriends;
        });
    };
};

/**
 * Фильтрация поля по массиву значений
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Доступные значения
 */
exports.filterIn = function (property, values) {
    console.info(property, values);

    return function (collection) {
        let potatoColection = [];
        for (let i = 0; i < collection.length; i++) {
            if (values.indexOf(collection[i][property]) !== -1) {
                potatoColection.push(collection[i]);
            }
        }

        return potatoColection;
    };
};

/**
 * Сортировка коллекции по полю
 * @param {String} property – Свойство для фильтрации
 * @param {String} order – Порядок сортировки (asc - по возрастанию; desc – по убыванию)
 */
exports.sortBy = function (property, order) {
    console.info(property, order);

    return function (collection) {
        let potatoCollection = collection;
        if (order === 'asc') {
            collection.sort(function (a, b) {
                if (a[property] < b[property]) {
                    return -1;
                }
                if (a[property] > b[property]) {
                    return 1;
                }

                return 0;
            });
        } else if (order === 'desc') {
            collection.reverse().sort(function (a, b) {
                if (a.property < b.property) {
                    return -1;
                }
                if (a.property > b.property) {
                    return 1;
                }

                return 0;
            });
        }

        return potatoCollection;
    };
};

/**
 * Форматирование поля
 * @param {String} property – Свойство для фильтрации
 * @param {Function} formatter – Функция для форматирования
 */
exports.format = function (property, formatter) {
    console.info(property, formatter);

    return function (collection) {
        let potatoCollection = [];
        for (let i = 0; i < collection.length; i++) {
            potatoCollection.push(collection[i]);
            potatoCollection[i][property] = formatter(collection[i][property]);
        }

        return potatoCollection;
    };
};

/**
 * Ограничение количества элементов в коллекции
 * @param {Number} count – Максимальное количество элементов
 */
exports.limit = function (count) {
    console.info(count);

    return function (collection) {
        let potatoCollection = [];
        for (let i = 0; i < count; i++) {
            potatoCollection.push(collection[i]);
        }

        return potatoCollection;
    };
};

if (exports.isStar) {

    /**
     * Фильтрация, объединяющая фильтрующие функции
     * @star
     * @params {...Function} – Фильтрующие функции
     */
    exports.or = function () {
        return;
    };

    /**
     * Фильтрация, пересекающая фильтрующие функции
     * @star
     * @params {...Function} – Фильтрующие функции
     */
    exports.and = function () {
        return;
    };
}

