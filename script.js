// Elements for navigation and form
const lengthNav = document.getElementById('length');
const weightNav = document.getElementById('weight');
const temperatureNav = document.getElementById('temperature');
const form = document.getElementById('converter-form');
const output = document.getElementById('output');

// Length units
const lengthUnits = `
    <label for="length-input">Enter the length to convert:</label>
    <input id="length-input" name="length-input" type="number" />
    <br />
    <label for="length-from">Unit to convert from:</label>
    <select id="length-from">
        <option value="millimeter">millimeter</option>
        <option value="centimeter">centimeter</option>
        <option value="meter">meter</option>
        <option value="kilometer">kilometer</option>
        <option value="inch">inch</option>
        <option value="foot">foot</option>
        <option value="yard">yard</option>
        <option value="mile">mile</option>
    </select>
    <br />
    <label for="length-to">Unit to convert to:</label>
    <select id="length-to">
        <option value="millimeter">millimeter</option>
        <option value="centimeter">centimeter</option>
        <option value="meter">meter</option>
        <option value="kilometer">kilometer</option>
        <option value="inch">inch</option>
        <option value="foot">foot</option>
        <option value="yard">yard</option>
        <option value="mile">mile</option>
    </select>
    <br />
    <button type="submit">Convert Length</button>
`;

// Weight units
const weightUnits = `
    <label for="weight-input">Enter the weight to convert:</label>
    <input id="weight-input" name="weight-input" type="number" />
    <br />
    <label for="weight-from">Unit to convert from:</label>
    <select id="weight-from">
        <option value="milligram">milligram</option>
        <option value="gram">gram</option>
        <option value="kilogram">kilogram</option>
        <option value="ounce">ounce</option>
        <option value="pound">pound</option>
    </select>
    <br />
    <label for="weight-to">Unit to convert to:</label>
    <select id="weight-to">
        <option value="milligram">milligram</option>
        <option value="gram">gram</option>
        <option value="kilogram">kilogram</option>
        <option value="ounce">ounce</option>
        <option value="pound">pound</option>
    </select>
    <br />
    <button type="submit">Convert Weight</button>
`;

// Temperature units
const temperatureUnits = `
    <label for="temperature-input">Enter the temperature to convert:</label>
    <input id="temperature-input" name="temperature-input" type="number" />
    <br />
    <label for="temperature-from">Unit to convert from:</label>
    <select id="temperature-from">
        <option value="Celsius">Celsius</option>
        <option value="Fahrenheit">Fahrenheit</option>
        <option value="Kelvin">Kelvin</option>
    </select>
    <br />
    <label for="temperature-to">Unit to convert to:</label>
    <select id="temperature-to">
        <option value="Celsius">Celsius</option>
        <option value="Fahrenheit">Fahrenheit</option>
        <option value="Kelvin">Kelvin</option>
    </select>
    <br />
    <button type="submit">Convert Temperature</button>
`;

// Update the form content
function updateForm(content) {
    form.innerHTML = content;
}

// Perform conversion
function performConversion(type, value, fromUnit, toUnit) {
    let result;

    if (type === 'length') {
        const lengthConversions = { millimeter: 1, centimeter: 10, meter: 1000, kilometer: 1000000, inch: 25.4, foot: 304.8, yard: 914.4, mile: 1609344 };
        result = (value * lengthConversions[fromUnit]) / lengthConversions[toUnit];
    } else if (type === 'weight') {
        const weightConversions = { milligram: 1, gram: 1000, kilogram: 1000000, ounce: 28349.5, pound: 453592.37 };
        result = (value * weightConversions[fromUnit]) / weightConversions[toUnit];
    } else if (type === 'temperature') {
        if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') result = (value * 9 / 5) + 32;
        else if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') result = (value - 32) * 5 / 9;
        else if (fromUnit === 'Celsius' && toUnit === 'Kelvin') result = value + 273.15;
        else if (fromUnit === 'Kelvin' && toUnit === 'Celsius') result = value - 273.15;
        else if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') result = (value - 32) * 5 / 9 + 273.15;
        else if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') result = (value - 273.15) * 9 / 5 + 32;
        else result = value;
    }

    output.innerHTML = `<h3>Converted Value: ${result.toFixed(2)}</h3>`;
}

// Event listeners
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = parseFloat(document.querySelector('input').value);
    const fromUnit = document.querySelector('select').value;
    const toUnit = document.querySelectorAll('select')[1].value;
    const type = form.querySelector('select').id.includes('length') ? 'length' : form.querySelector('select').id.includes('weight') ? 'weight' : 'temperature';
    performConversion(type, value, fromUnit, toUnit);
});

// Nav link events
lengthNav.addEventListener('click', () => updateForm(lengthUnits));
weightNav.addEventListener('click', () => updateForm(weightUnits));
temperatureNav.addEventListener('click', () => updateForm(temperatureUnits));

// Default form
updateForm(lengthUnits);
