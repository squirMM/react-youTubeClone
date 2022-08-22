import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
// import { response } from "express";

function Comments(props) {
  const user = useSelector((state) => state.user);
  const videoId = props.postId;
  const [commentValue, setCommentValue] = useState("");

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    //리다이렉트 안되도록
    event.preventDefault();

    const variable = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
    };

    Axios.post("/api/comment/saveComment", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        setCommentValue("");
        props.refreshFunction(response.data.result);
      } else {
        alert("코멘트를 저장하지 못했습니다.");
      }
    });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />
      {/* Comment Lists */}

      {/* Root Comment Form */}

      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요."
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comments;
