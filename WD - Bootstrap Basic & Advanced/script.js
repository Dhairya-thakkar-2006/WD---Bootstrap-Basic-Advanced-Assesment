const form = document.getElementById("myForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let vehicle = document.getElementById("vehicle").value.trim();
    let complaint = document.getElementById("complaint").value.trim();

    let valid = true;

    // Clear errors
    document.getElementById("nameError").innerText = "";
    document.getElementById("phoneError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("vehicleError").innerText = "";
    document.getElementById("complaintError").innerText = "";
    document.getElementById("successMsg").innerText = "";

    // Name
    if (name === "") {
        document.getElementById("nameError").innerText = "Name required";
        valid = false;
    }

    // Phone
    if (!/^\d{10}$/.test(phone)) {
        document.getElementById("phoneError").innerText = "Phone must be 10 digits";
        valid = false;
    }

    // Email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById("emailError").innerText = "Invalid email";
        valid = false;
    }

    // ✅ Vehicle validation added
    if (vehicle === "") {
        document.getElementById("vehicleError").innerText = "Vehicle required";
        valid = false;
    }

    // ✅ Complaint validation added
    if (complaint === "") {
        document.getElementById("complaintError").innerText = "Complaint required";
        valid = false;
    }

    if (!valid) return;

    let data = { name, phone, email, vehicle, complaint };

    let list = JSON.parse(localStorage.getItem("submissions")) || [];
    list.push(data);

    localStorage.setItem("submissions", JSON.stringify(list));

    // ✅ Success message (no alert)
    document.getElementById("successMsg").innerText = "Data saved successfully!";

    form.reset();
    loadData();
});

function loadData() {
    let list = JSON.parse(localStorage.getItem("submissions")) || [];
    let table = document.querySelector("#dataTable tbody");
    let noData = document.getElementById("noData");

    table.innerHTML = "";

    if (list.length === 0) {
        noData.innerText = "No data available";
        return;
    }

    noData.innerText = "";

    list.forEach(item => {
        let row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.phone}</td>
                <td>${item.email}</td>
                <td>${item.vehicle}</td>
                <td>${item.complaint}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

loadData();