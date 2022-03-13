import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from '../hooks/useFetch';

export default function ShowPosts(){

    const board = useParams().board;
    // 반환되는 값이 없다면 undefined 반환, 조건문에선 false로 간주
    const posts = useFetch(`http://localhost:3001/posts`);



    if(!board){
        return(
            <div>
                <h3 className="board_name">전체글보기</h3>
                {posts.map(post=>{
                    return(
                        <div className="post_list" key={post.id}>
                            <Link to={`/board/${post.board}`} className="prevent-overflow" style={{fontSize: "14px"}}>{post.board}</Link>
                            <Link to={`/post/${post.id}`} className="prevent-overflow" style={{textAlign: "left"}}>{post.title}</Link>
                            <Link to={`/userinfo/${post.author}`} className="prevent-overflow" >{post.author}</Link>
                            <span className="prevent-overflow">{post.date}</span>
                            <span className="prevent-overflow">{post.views}</span>
                        </div>
                    );
                })}
            </div>
        );
    } else{
        return(
            <div>
                <h3 className="board_name" style={{borderBottom: "2px solid #e5e5e5", margin: "1em 30px", paddingBottom: "15px", color:"#065093"}}>{board} ({(posts.filter(post=>post.board===board)).length})</h3>
                {posts.map(post=>{
                    if(post.board=== board){
                        return(
                            <div className="post_list" key={post.id}>
                                <span className="prevent-overflow" style={{fontSize: "16px"}}>{post.id}</span>
                                <Link to={`/post/${post.id}`} className="prevent-overflow" style={{textAlign: "left"}}>{post.title}</Link>
                                <Link to={`/userinfo/${post.author}`} className="prevent-overflow" >{post.author}</Link>
                                <span className="prevent-overflow">{post.date}</span>
                                <span className="prevent-overflow">{post.views}</span>
                            </div>
                        );   
                    }
    
                })}
            </div>
        );
    }


}