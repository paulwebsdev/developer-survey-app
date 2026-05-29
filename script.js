const form = document.getElementById("surveyForm");
const msg = document.getElementById("msg");
const responsesDiv = document.getElementById("responses");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const level = document.getElementById("level").value;
    const learning = document.getElementById("learning").value;
    const goal = document.getElementById("goal").value;

    let techs = [];
    document.querySelectorAll('input[type="checkbox"]:checked')
    .forEach(el => techs.push(el.value));

    let area = document.querySelector('input[name="area"]:checked');
    area = area ? area.value : "Not selected";

    const data = {
        name,
        level,
        techs,
        area,
        learning,
        goal,
        time: new Date().toLocaleString()
    };

    let allData = JSON.parse(localStorage.getItem("survey")) || [];
    allData.push(data);

    localStorage.setItem("survey", JSON.stringify(allData));

    msg.innerText = "✅ Survey submitted successfully!";
    form.reset();
});

function viewResponses(){
    let data = JSON.parse(localStorage.getItem("survey")) || [];

    if(data.length === 0){
        responsesDiv.style.display = "block";
        responsesDiv.innerHTML = "No responses yet.";
        return;
    }

    responsesDiv.style.display = "block";
    responsesDiv.innerHTML = "<h3>Responses</h3>";

    data.forEach((item, index) => {
        responsesDiv.innerHTML += `
        <hr>
        <p><b>#${index + 1}</b></p>
        <p>Name: ${item.name}</p>
        <p>Level: ${item.level}</p>
        <p>Tech: ${item.techs.join(", ")}</p>
        <p>Area: ${item.area}</p>
        <p>Learning: ${item.learning}</p>
        <p>Goal: ${item.goal}</p>
        <p>Time: ${item.time}</p>
        `;
    });
}
