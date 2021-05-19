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
        },
        populateFromJson: function() {
            const jsonElems = document.querySelectorAll('[data-json]');
            for (let i = 0; i < jsonElems.length; i++) {
                console.log("JSON elements: #" + i);
                const filename = jsonElems[i].getAttribute('data-json');
                console.log("JSON filename: " + filename);
                console.dir(jsonElems[i]);
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
