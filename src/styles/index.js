import styled from "styled-components";
const PostHeader = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px;
  align-items: center;
  justify-content: space-between;
`;
const PostHeaderTitle = styled.h2`
  font-weight: bold;
`;
const PostHeaderSelect = styled.select`
  padding: 5px 10px;
  width: 100px;
  font-size: large;
  background-color: lightblue;
`;
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
`;
const PostItem = styled.div`
  display: flex;
  align-items: center;
  background-color: lightblue;
  border-radius: 5px;
  padding: 10px;
  justify-content: space-between;
`;
const PostTitle = styled.h4`
  color: #333;
`;
const PostTag = styled.span`
  padding: 5px 10px;
  align-items: center;
  background-color: #333;
  color: white;
  border-radius: 10px;
  margin-right: 10px;
`;
const IsAlert = styled.div`
  padding: 10px;
  background-color: ${(props) =>
    (props.loading ? "blue" : props.error ? "red" : "green") || "#645cfc"};
  margin-bottom: 10px;
  width: auto;
  margin: 10px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-weight: bold;
`;
const PostFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: darkslateblue;
  padding: 10px;
  border-radius: 10px;
`;
const PostForm = styled.input`
  padding: 10px;
  border-radius: 10px;
  color: black;
  background-color: #f2f3f2;
  font-size: large;
`;
const PostButton = styled.button`
  padding: 10px;
  margin: auto;
  background-color: #333;
  color: #fff;
  font-weight: bold;
  width: 400px;
  border-radius: 10px;
  font-size: large;
  text-transform: uppercase;
  cursor: pointer;
`;
const PostInputTags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 10px;
`;
const PostInputTag = styled.div`
  display: flex;
  flex-direction: row;
  font-size: medium;
  text-transform: capitalize;
  color: white;
  font-weight: bold;
`;
const PaginationButton = styled.button`
  padding: 10px;
  background-color: ${(props) =>
    (props.active ? "darkslateblue" : props.disabled ? "grey" : "#222") ||
    "#222"};
  color: white;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-right: 4px;
  border-radius: 10px;
`;
const AppStyles = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  align-items: center;

  .modal {
    padding: 4px;
    display: flex;
    flex-direction: row-reverse;
    width: 80%;
    height: 80vh;
    border: 1px solid black;
  }

  form {
    margin: auto;
    display: flex;
    flex-direction: column;
  }

  .close-button {
    width: 32px;
    height: 32px;
  }

  #up {
    border: 2px solid black;
    transform: rotate(-45deg);
    position: relative;
    top: 14px;
    right: 6px;
    width: 40px;
    background-color: black;
    border-radius: 25px;
  }
  #down {
    border: 2px solid black;
    transform: rotate(45deg);
    position: relative;
    top: 10px;
    right: 6px;
    width: 40px;
    background-color: black;
    border-radius: 25px;
  }
`;
export {
  PostContainer,
  PostItem,
  PostTitle,
  PostTag,
  IsAlert,
  PostFormContainer,
  PostForm,
  PostButton,
  PostInputTags,
  PostInputTag,
  PostHeader,
  PostHeaderTitle,
  PostHeaderSelect,
  PaginationButton,
  AppStyles,
};
