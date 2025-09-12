import {dbank} from "../../declarations/dbank";

window.addEventListener("load", async () => {
    update();
});

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = e.target.querySelector("#submit-btn");

    const inputAmt = parseFloat(document.getElementById("input-amount").value);
    const outputAmt = parseFloat(document.getElementById("withdrawal-amount").value);

    btn.setAttribute("disabled", true);

    if(document.getElementById("input-amount").value.length !== 0) {
        await dbank.topUp(inputAmt);
    };

    if(document.getElementById("withdrawal-amount").value.length !== 0){
        await dbank.withdraw(outputAmt);
    };

    await dbank.compound();

    update();
    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";

    btn.removeAttribute("disabled");
    
});

async function update() {
    const currentamt = await dbank.checkBalance();
    document.getElementById("value").innerText = Math.round(currentamt*100)/100;
};