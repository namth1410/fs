const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");
const amount = urlParams.get("amount");
const id = urlParams.get("id");
const orderCode = urlParams.get("orderCode");

async function updateFirebase() {
  if (!userId) {
    window.location.pathname = "/error.html";
    return;
  }
  try {
    const response = await fetch(
      `https://fs-mlio.onrender.com/update-firebase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          amount: amount,
          id: id,
          orderCode: orderCode,
        }),
      }
    );
    console.log(response);
  } catch (error) {
    console.error("Error fetching user info:", error);
    window.location.pathname = "/error.html";
  }
}

window.onload = updateFirebase;
