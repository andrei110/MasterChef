export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    console.log(res);
    const data = await res.json();
    if (!res.ok) throw new Error(`Error: ${data.message} (${data.code})`);
    return data;
  } catch (err) {
    throw err;
  }
};
