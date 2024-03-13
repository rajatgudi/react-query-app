import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addPost, fetchPosts, fetchTags } from "../api/api";
import {
  IsAlert,
  PaginationButton,
  PostButton,
  PostContainer,
  PostForm,
  PostFormContainer,
  PostHeader,
  PostHeaderSelect,
  PostHeaderTitle,
  PostInputTag,
  PostInputTags,
  PostItem,
  PostTag,
  PostTitle,
} from "../styles";
import PostFormList from "./PostForm";

const PostList = () => {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const {
    data: postData,
    isError,
    error,
    isLoading,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["posts", { page }],
    queryFn: () => fetchPosts(page),
    // 👇 will run query every interval
    // refreshInterval: 1000 * 60,
    // 👇 Query runs when this is true
    // enabled: true,
    // 👇 while staletime lasts, it wont refetch on remount
    staleTime: 1000 * 60 * 5,
    // 👇 Dont allow caching
    // gcTime: 0,
    // 👇 keeps the last used data
    // placeholderData: (previousData) => previousData,,
  });

  console.log({ isLoading, isError, error, postData });
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
        queryKey: ["posts", { page }],
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
      <PostHeader>
        <PostHeaderTitle>My Posts:</PostHeaderTitle>
        <PostHeaderSelect
          value={per_page}
          onChange={(e) => {
            setPerPage(e.target.value);
            setPage(1);
          }}
        >
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </PostHeaderSelect>
      </PostHeader>
      <PostFormList handleSubmit={handleSubmit} tagsData={tagsData} />

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
          postData?.data?.map((post, index) => (
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
          <PaginationButton
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
            disabled={!postData?.prev}
          >
            Previous
          </PaginationButton>
          {postData &&
            [...Array(Math.floor(postData?.items / per_page))].map(
              (_, index) => {
                let isActive = index + 1 === page ? true : false;
                return (
                  <PaginationButton
                    active={isActive}
                    onClick={() => {
                      setPage(index + 1);
                    }}
                  >
                    {index + 1}
                  </PaginationButton>
                );
              }
            )}
          {postData?.items >= per_page && (
            <PaginationButton
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
              disabled={!postData?.next}
            >
              Next
            </PaginationButton>
          )}
        </div>
      </PostContainer>
    </div>
  );
};

export default PostList;
