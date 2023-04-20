// const apiKey = "ea04abcb75324c4b94b41268d7e52997";
const apiKey = "06e5b0e43de742888c8362e0be77fb6c";
const minResults = 2;

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const cleanInputString = (inputString) =>
  inputString
    .replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "")
    .replace(/[^a-zA-Z]+/g, ",")
    .replace(/,+/g, ",")
    .replace(/[\s\n]+/g, "")
    .toLowerCase()
    .trim();

export { apiKey, minResults, fetchData, cleanInputString };
