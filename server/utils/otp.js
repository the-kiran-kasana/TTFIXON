/**
 * Generates a numeric OTP of the given length (default 6 digits).
 */
const generateOtp = (length = 6) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return String(Math.floor(min + Math.random() * (max - min + 1)));
};

/**
 * Sends the OTP to the user's phone.
 *
 * No SMS provider is configured yet, so in development we simply log the OTP
 * to the server console (and it is also returned in the API response). Swap
 * this out for Twilio / MSG91 / etc. when you're ready to go live.
 */
const sendOtp = async (phone, otp) => {
  console.log(`📩 OTP for ${phone}: ${otp}`);
  return true;
};

module.exports = { generateOtp, sendOtp };
