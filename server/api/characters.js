import md5 from "crypto-js/md5";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const publicKey = config.public.marvelPublicKey;
  const privateKey = config.marvelPrivateKey;
  const baseURL = config.public.marvelBaseUrl;

  const ts = Date.now();

  const hash = md5(ts + privateKey + publicKey).toString();
  const { limit = 20, offset = 0 } = getQuery(event);

  try {
    const response = await fetch(
      `${baseURL}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    console.log(`Limit: ${limit}, Offset: ${offset}`);

    return data;
  } catch (error) {
    return {
      error: "Failed to fetch Marvel characters",
      details: error.message,
    };
  }
});
