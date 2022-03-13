import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import styles from "../module/ShowPost.module.css"

export default function ShowPost(){

    const id = useParams().post_id
    
    const post = useFetch(`http://localhost:3001/posts/${id}`)
    
    return (
        <div className={styles.all_area}>
            <div className={styles.top}>
                
                <Link to={`/board/${post.board}`} className={styles.board}>{post.board} &gt;</Link>
                <div className={styles.title}>{post.title}</div>

                <div className={styles.writer_info}>
                    <Link to={`/userinfo/${post.author}`}><img src="profile_img.png"></img></Link>
                    <div>
                        <Link to={`/userinfo/${post.author}`} className={styles.author}>{post.author}</Link>
                        <div className={styles.date}>{post.date}</div>
                    </div>
                    <div>Options</div>
                </div>
            </div>

            <div className={styles.content}>{post.content}</div>

            <div className={styles.bottom}>
                <Link to={`/userinfo/${post.author}`}><strong>{post.author}</strong>님의 게시글 더보기 &gt;</Link>
                {/* 함수대신에 훅을 이용하여 글 작성자가 자신이라는 조건부로 수정버튼과 삭제버튼 나타남 */}
                <div className={styles.buttons}></div>

                <textarea placeholder="댓글을 입력하세요." style={{width:"100%", height:"100px"}}></textarea>
            </div>

        </div>
    );
}