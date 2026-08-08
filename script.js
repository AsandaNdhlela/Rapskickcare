const orderForm = document.getElementById("orderForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

orderForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const formData = new FormData(orderForm);
  orderForm.reset();

  try {
    const response = await fetch(orderForm.action, {
      method: "POST",
      body: new FormData(orderForm),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      formStatus.textContent = "Order received! We'll be in touch shortly.";
      formStatus.style.color = "green";
      formStatus.style.display = "block";
      orderForm.reset();
    } else {
      const data = await response.json().catch(() => null);
      formStatus.textContent =
        data?.errors?.map((e) => e.message).join(", ") ||
        "Something went wrong. Please try again.";
      formStatus.style.color = "red";
      formStatus.style.display = "block";
    }
  } catch (err) {
    formStatus.textContent = "Network error — please try again.";
    formStatus.style.color = "red";
    formStatus.style.display = "block";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Order";
  }
});
