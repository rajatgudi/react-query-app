import React from "react";
import {
  PostButton,
  PostForm,
  PostFormContainer,
  PostInputTag,
  PostInputTags,
} from "../styles";

const PostFormList = ({ tagsData, handleSubmit }) => {
  return (
    <div>
      <PostFormContainer onSubmit={handleSubmit}>
        <PostForm
          type="text"
          placeholder="enter your title here"
          name="title"
        />
        <PostInputTags>
          {tagsData &&
            tagsData?.map((tag) => {
              return (
                <PostInputTag key={tag}>
                  <input name={tag} id={tag} type="checkbox" />
                  <label htmlFor={tag}>{tag}</label>
                </PostInputTag>
              );
            })}
        </PostInputTags>
        <PostButton type="submit">Add Post</PostButton>
      </PostFormContainer>
    </div>
  );
};

export default PostFormList;
