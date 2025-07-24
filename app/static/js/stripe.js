// Stripe Payment Intents API
// https://stripe.com/docs/payments/accept-a-payment

const stripe = Stripe("pk_test_xxx");

// client_secretをテンプレートから取得
const clientSecret = document
  .getElementById("client-secret")
  .getAttribute("data-secret");

const elements = stripe.elements({
  clientSecret: clientSecret,
});

const paymentElement = elements.create("payment");
paymentElement.mount("#payment-element");

const form = document.getElementById("payment-form");
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // 送信ボタンを無効化
  const submitButton = document.querySelector("#submit-button");
  submitButton.disabled = true;
  submitButton.textContent = "処理中...";

  try {
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/thanks/",
      },
      redirect: "if_required",
    });

    if (error) {
      // エラー表示
      showError(error.message);
      submitButton.disabled = false;
      submitButton.textContent = "注文を確定する";
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // 決済成功時、サーバーに通知
      const response = await fetch("/payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]")
            .value,
        },
        body: JSON.stringify({
          payment_intent_id: paymentIntent.id,
        }),
      });

      const result = await response.json();
      if (result.status === "success") {
        window.location.href = "/thanks/";
      } else {
        showError("決済の処理でエラーが発生しました: " + result.error);
        submitButton.disabled = false;
        submitButton.textContent = "注文を確定する";
      }
    }
  } catch (err) {
    showError("予期しないエラーが発生しました");
    submitButton.disabled = false;
    submitButton.textContent = "注文を確定する";
  }
});

function showError(message) {
  const errorElement = document.getElementById("payment-errors");
  errorElement.textContent = message;
  errorElement.style.display = "block";
}
