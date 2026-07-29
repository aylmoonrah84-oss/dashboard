const fetchData = async (url, options = {}) => {
  try {
    const res = await fetch(import.meta.env.VITE_BASE_URL + url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export default fetchData;
