
// ===== REGISTRATION FORM =====

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {

    const eventSelect = document.getElementById("eventName");

    // Automatically select the event from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventFromURL = urlParams.get("event");

    if (eventFromURL && eventSelect) {
        eventSelect.value = eventFromURL;
    }

    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const studentId = document.getElementById("studentId").value.trim();
        const email = document.getElementById("email").value.trim();
        const department = document.getElementById("department").value;
        const studyYear = document.getElementById("studyYear").value;
        const eventName = eventSelect.value;

        if (
            !fullName ||
            !studentId ||
            !email ||
            !department ||
            !studyYear ||
            !eventName
        ) {
            alert("Please fill in all the fields.");
            return;
        }

        // Get existing registrations
        let registrations = JSON.parse(
            localStorage.getItem("planoraRegistrations") || "[]"
        );

        // Create a new registration
        const registration = {
            registrationId: "PLN" + Date.now(),
            fullName: fullName,
            studentId: studentId,
            email: email,
            department: department,
            studyYear: studyYear,
            eventName: eventName,
            registrationDate: new Date().toLocaleDateString()
        };

        // Save the registration in the browser
        registrations.push(registration);

        localStorage.setItem(
            "planoraRegistrations",
            JSON.stringify(registrations)
        );

        // Save the latest registration for the success page
        localStorage.setItem(
            "planoraLatestRegistration",
            JSON.stringify(registration)
        );

        // Open the success page
        window.location.href = "success.html";
    });
}


// ===== EVENT BUDGET CALCULATOR =====

const calculateButton = document.getElementById("calculateButton");

if (calculateButton) {

    calculateButton.addEventListener("click", function() {

        const ticketPriceInput = document.getElementById("ticketPrice");
        const numberOfTicketsInput = document.getElementById("numberOfTickets");
        const result = document.getElementById("calculatorResult");

        const ticketPrice = Number(ticketPriceInput.value);
        const numberOfTickets = Number(numberOfTicketsInput.value);

        if (
            ticketPriceInput.value === "" ||
            !Number.isFinite(ticketPrice) ||
            ticketPrice < 0 ||
            numberOfTicketsInput.value === "" ||
            !Number.isInteger(numberOfTickets) ||
            numberOfTickets < 1
        ) {
            result.textContent =
                "Please enter a valid price and ticket quantity.";
            result.style.color = "red";
            return;
        }

        const total = ticketPrice * numberOfTickets;

        result.textContent = "Total Cost: ₹" + total.toFixed(2);
        result.style.color = "green";
    });
}