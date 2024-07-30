const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");
const amount = urlParams.get("amount");

async function updateFirebase() {
  if (!userId) {
    window.location.pathname = "/cancel.html";
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
        }),
      }
    );
    console.log(response);
  } catch (error) {
    console.error("Error fetching user info:", error);
    window.location.pathname = "/cancel.html";
  }
}

window.onload = updateFirebase;
