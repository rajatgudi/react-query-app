import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addPost, fetchPosts, fetchTags } from "../api/api";
import {
  IsAlert,
  PostButton,
  PostContainer,
  PostForm,
  PostFormContainer,
  PostInputTag,
  PostInputTags,
  PostItem,
  PostTag,
  PostTitle,
} from "../styles";

const PostList = () => {
  const [page, setPage] = useState(1);
  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });
  const {
    data: postData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts(),
  });
  console.log("postData", postData, isLoading);
  const queryClient = useQueryClient();
  const {
    mutate,
    isError: isPostError,
    isPending,
    error: postError,
    reset,
  } = useMutation({
    mutationFn: addPost,
    onMutate: () => {
      //executes before calling mutate()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const tags = Array.from(formData.keys()).filter(
      (key) => formData.get(key) === "on"
    );
    console.log({ title, tags });
    if (!title || !tags) return;
    mutate({ title, tags });
    e.target.reset();
  };
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

      {(isLoading || isPending) && <IsAlert loading>Loading Posts...</IsAlert>}
      {isPostError && (
        <IsAlert
          error
          onClick={() => {
            reset();
          }}
        >
          <error>{postError?.message} Something went wrong!</error>
        </IsAlert>
      )}
      {isError && (
        <IsAlert
          error
          onClick={() => {
            reset();
          }}
        >
          <error>{error?.message} Something went wrong!</error>
        </IsAlert>
      )}

      <PostContainer>
        {postData ? (
          postData?.map((post, index) => (
            <PostItem key={post.id}>
              <PostTitle>{post?.title}</PostTitle>
              <div>
                {post.tags &&
                  post.tags.map((tag) => <PostTag key={tag}>{tag}</PostTag>)}
              </div>
            </PostItem>
          ))
        ) : (
          <IsAlert error>There are no Posts!</IsAlert>
        )}
        <div>
          <button>Previous</button>
          <span>{page}</span>
          <button>Next</button>
        </div>
      </PostContainer>
    </div>
  );
};

export default PostList;
