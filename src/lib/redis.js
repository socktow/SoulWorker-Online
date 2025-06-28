const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!REDIS_URL || !REDIS_TOKEN) {
  throw new Error('Missing Redis config in .env');
}

// Set giá trị OTP
export async function setOtp(email, otp) {
  const res = await fetch(`${REDIS_URL}/set/otp:${email}/${otp}?EX=300`, {
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
    },
  });

  return res.ok;
}

// Get OTP
export async function getOtp(email) {
  const res = await fetch(`${REDIS_URL}/get/otp:${email}`, {
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
    },
  });

  const data = await res.json();
  return data.result;
}

// Xoá OTP
export async function deleteOtp(email) {
  await fetch(`${REDIS_URL}/del/otp:${email}`, {
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
    },
  });
}
