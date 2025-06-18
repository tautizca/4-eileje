function generuotiElementa(elementas) {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.innerText = elementas.text;
    a.href = elementas.url;
    li.appendChild(a);
    li.classList = 'meniu-itemas';

    return li;
}

const meniuElementas = document.querySelector('header > nav > ul');

// Uzkrauti is meniu_data.json duomenis i meniu masyva
fetch('meniu_data.json')
    .then(response => response.json())
    .then(meniuArray => {
        // Iteruoti per Meniu masyva  ir su kiekvienu masyvo elementu duomenis perduoti i generuoti meniu
        // elementa funkcija
        meniuArray.forEach(element => {
           let htmlElementas = generuotiElementa(element);
           // Gauta DOM elementa turesim appendinti i NAV > ul tag'a
           meniuElementas.appendChild(htmlElementas);
        });
    })
    .catch(error => console.error(error));
