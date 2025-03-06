import md5 from "crypto-js/md5";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const publicKey = config.public.marvelPublicKey;
  const privateKey = config.marvelPrivateKey;
  const baseURL = config.public.marvelBaseUrl;

  const ts = Date.now();
  const hash = md5(ts + privateKey + publicKey).toString();

  const characterId = event.context.params.id;

  try {
    const response = await fetch(
      `${baseURL}/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    return {
      error: `Failed to fetch Marvel character with ID: ${characterId}`,
      details: error.message,
    };
  }
});
