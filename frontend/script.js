async function getMedicines(){
    // Uses the backend to fetch medicines from the database
    const response = await fetch("http://localhost:8000/medicines")
    const content = await response.json()
    return content.medicines
}

async function getAverage(){
    //uses backend to fetch average price from database
    const response = await fetch("http://localhost:8000/average")
    const average = await response.json()
    return average
}

async function renderMedicines(){
    //retrieves the average pprice and full database
    //iterates through the data and prepares it in a HTML friendly way
    //allows a fallback for null values
    const average = await getAverage()
    const medicines = await getMedicines()
    const body = document.getElementById("medicines")
    body.innerHTML = ""
    for (const medicine of medicines) {
        
        const name = medicine.name || "N/A"
        const price = medicine.price || "N/A"
        body.insertAdjacentHTML("beforeend", "<tr><td>" + name  + "</td><td>" + "£" + price + "</td></tr>")
    }
    body.insertAdjacentHTML("beforeend", "<tr><td>" + "Average Cost"  + "</td><td>" + "£" + average + "</td></tr>")
}


async function createMedicine(event) {
    //event handler to create a medicine in the backend
    event.preventDefault()
    const formData = new FormData(this) 
    const response = await fetch("http://localhost:8000/create", {
        method:"POST",
        body:formData
    }
) 
}

async function updateMedicine(event) {
    //event handler to update a medicine in the backend
    event.preventDefault()
    const formData = new FormData(this) 
    const response = await fetch("http://localhost:8000/update", {
        method:"POST",
        body:formData
    }
) 
}


async function deleteMedicine(event) {
    //event handler to delete a medicine in the backend
    event.preventDefault()
    const formData = new FormData(this) 
    const response = await fetch("http://localhost:8000/delete", {
        method:"DELETE",
        body:formData
    }
) 
}

async function load() {
    //"main" function to load all other functions
    renderMedicines()
    document.getElementById("add-medicine").addEventListener("submit", createMedicine)
    document.getElementById("delete-medicine").addEventListener("submit", deleteMedicine)
    document.getElementById("delete-medicine").addEventListener("submit", updateMedicine)
}

load()


