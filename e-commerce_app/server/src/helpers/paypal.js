import paypal from "paypal-rest-sdk";

paypal.configure({
	mode: "sandbox",
	client_id:
		"ATJajgPAbc_QG6U0CFY2gMmeRmHe_dM6fRpBQmAlqT0MFq4cLschHkt9GLPXn4kwJG82CLxhsJkQbzwm",
	client_secret:
		"EHXGVETn-sFjP7zFG8ZsJSvHEtHj6QGpY6nKz0RNLUAjJwSUtJEaRkPQGtZ3DT-fNI3m3zPmVfGuXp7X",
});

export default paypal