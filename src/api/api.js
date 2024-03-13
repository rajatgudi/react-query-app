const fetchPosts = async (page) => {
  const response = await fetch(
    `http://localhost:3000/posts?_sort=-id&_page=${page}&_per_page=${10}`
  );
  const postData = await response.json();
  console.log("api postData", postData);
  return postData;
};
const fetchTags = async () => {
  const response = await fetch("http://localhost:3000/tags");
  const tagsData = response.json();
  return tagsData;
};
const addPost = async (post) => {
  const response = await fetch(`http://localhost:3000/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
};
export { fetchPosts, fetchTags, addPost };
