const response = document.querySelector('.error');
const submit = document.querySelector('.submit');
const heading = document.querySelector('.namesym');
const subHeading = document.querySelector('.quotes');
const support = document.querySelector('.support');
const time = document.querySelector('.time');
const body = document.querySelector('body');
const description = document.querySelector('.description');
const currentPrice = document.querySelector('.price');
const volume = document.querySelector('.volume');
const key = 'brjo6knrh5r9g3ot7150';



const xhr = new XMLHttpRequest();

xhr.onload = function () {
    
    const message = JSON.parse(xhr.responseText);
    submit.addEventListener('click', () => {
    time.innerHTML = new Date(Date.now()).toLocaleString();
    const input = document.querySelector('.symbol').value;
        for(var i = 0; i < message.length; i++) {
            const symbol = message[i].symbol;
            if(input.toUpperCase() === symbol) {
                description.innerHTML = message[i].description;
                heading.innerHTML = input;
                fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`).then (function (response){
                    
                        return response.json();
                    }).then (function (data){
                           subHeading.innerHTML = `<ul> 
                                                        <li>Close: ${data.c}</li> 
                                                        <li>High: ${data.h}</li> 
                                                        <li>Open: ${data.o}</li> 
                                                        <li>Low: ${data.l}</li> 
                                                        <li>Range: ${Math.floor(data.h - data.l)}</li>
                                                   </ul>`;
                                //change color of background if stock is up or down
                                if (data.c >= data.o) {
                                    body.style.background = 'green'
                                } else{body.style.background ='red'}
                            
                            
                            return fetch(`https://finnhub.io/api/v1/scan/support-resistance?symbol=${symbol}&resolution=30&token=${key}`).then (function (response) {
                                return response.json();
                            }).then (function (data){
                                support.innerHTML = `<ul>
                                                        <li>Support: ${data.levels[0]}</li>
                                                        <li>Support: ${data.levels[1]}</li>
                                                        <li>Support/Resistance: ${data.levels[2]}</li>
                                                        <li>Resistance: ${data.levels[3]}</li>
                                                        <li>Resistance: ${data.levels[4]}</li>
                                                    </ul>`;
                                return fetch(`https://api.iextrading.com/1.0/tops?symbols=${symbol}`).then (function (response){
                                    return response.json()
                                }).then (function (data){
                                    console.log(data[0].volume)
                                    currentPrice.innerHTML = data[0].lastSalePrice;
                                    volume.innerHTML = `Volume: ${data[0].volume}`;
                                    
                                })
                            })
                        })
            } else {
                event.preventDefault();

            }
        }
        
})
    
}

xhr.open('GET', `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${key}`, true )
xhr.send();
