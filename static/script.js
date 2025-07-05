document.addEventListener('DOMContentLoaded' , () => {
    const input = document.getElementById('text-input');
    const button = document.getElementById('analyze-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultDiv = document.querySelector('.sentiment-result');

    button.addEventListener('click', async () => {
        const text = input.value;
        if(!text.trim()){
            resultDiv.textContent = 'Please enter some text!';
            return;
        }

        try{
            const respose = await fetch('/analyse',{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({ text})
            });
            const data = await respose.json();
            if(data.error){
                resultDiv.textContent = data.error;
            }else{
                resultDiv.textContent = `Sentiment: ${data.sentiment}`;
                rotateNeedle(data.sentiment);
                changeBackground(data.sentiment);
            }
        } catch(err){
            console.error(err);
            resultDiv.textContent = 'Something went wrong.';
        }
    });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        resultDiv.textContent = 'Sentiment: Neutral';
        rotateNeedle('Neutral');
    });

    function rotateNeedle(sentiment) {
        const needle = document.querySelector('.needle');
        let angle = 0;

        if (sentiment === 'Positive') angle = 28;
        else if (sentiment === 'Negative') angle = -28;
        else angle = 0;
        needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    }

    function changeBackground(sentiment) {
    const body = document.body;
    if (sentiment === 'Positive') {
        body.style.backgroundColor = '#d4edda'; // light green
    } else if (sentiment === 'Negative') {
        body.style.backgroundColor = '#f8d7da'; // light red
    } else {
        body.style.backgroundColor = '#fff3cd'; // light yellow
    }
}


});