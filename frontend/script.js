async function getMedicines(){
    const response = await fetch("http://localhost:8000/medicines")
    const content = await response.json()
    return content.medicines
}

async function renderMedicines(){
    const medicines = await getMedicines()
    const body = document.getElementById("medicines")
    body.innerHTML = ""
    for (const medicine of medicines) {
        
        const name = medicine.name || "N/A"
        const price = medicine.price || "N/A"
        body.insertAdjacentHTML("beforeend", "<tr><td>" + name  + "</td><td>" + price + "</td></tr>")
    }
}



async function createMedicine(event) {
    event.preventDefault()
    const formData = new FormData(this) 
    const response = await fetch("http://localhost:8000/create", {
        method:"POST",
        body:formData
    }
) 
}

async function load() {
    renderMedicines()
    document.getElementById("add-medicine").addEventListener("submit", createMedicine)

}

load()

