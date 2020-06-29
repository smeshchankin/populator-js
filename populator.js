'use strict';

window.populator = (function() {
    let populator = {
        generateId: function(prefix) {
            return prefix + Math.round(Math.random()*1e8).toString(16);
        },
        populate: function(templateSelector, data) {
            let template = document.querySelector(templateSelector);
            if (!data || !template) {
                return;
            }

            if (data.length) {
                populateFromArray(template, data);
            } else {
                populateFromObject(template, data)
            }
        }
    };

    function populateFromObject(elem, obj) {
        for (let idx = 0; idx < elem.attributes.length; idx++) {
            const attr = elem.attributes[idx];
            attr.value = fillValue(attr.value, obj);
        }
        elem.innerHTML = fillValue(elem.innerHTML, obj);
    }

    function populateFromArray(template, arr) {
        let parentElem = template.parentElement;
        parentElem.removeChild(template);

        for (let i = 0; i < arr.length; i++) {
            let elem = template.cloneNode(true);
            populateFromObject(elem, arr[i]);
            parentElem.appendChild(elem);
        }
    }

    function fillValue(value, obj) {
        let result = value;
        Object.keys(obj).forEach(function(key) {
            result = result.replace('{{' + key + '}}', obj[key]);
        });
        return result;
    }

    return populator;
}());
