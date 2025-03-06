import md5 from "crypto-js/md5";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const publicKey = config.public.marvelPublicKey;
  const privateKey = config.marvelPrivateKey;
  const baseURL = config.public.marvelBaseUrl;

  const { q } = getQuery(event);

  const ts = Date.now();
  const hash = md5(ts + privateKey + publicKey).toString();

  const queryParam = q ? `&nameStartsWith=${encodeURIComponent(q)}` : "";

  const url = `${baseURL}/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}${queryParam}`;

  try {
    const data = await $fetch(url);
    return data;
    
  } catch (error) {
    return {
      error: `Failed to fetch characters for query: ${q}`,
      details: error.message,
    };
  }
});
