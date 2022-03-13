import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ShowPost from "./ShowPost";
import ShowPosts from "./ShowPosts";
import ShowUserInfo from "./ShowUserInfo";

export default function ShowBodyBox(){

    const boards = useFetch("http://localhost:3001/boards");
    const posts = useFetch("http://localhost:3001/posts");

    return (
        <div className="body_box">

            <div className="left_box">
            <div className='user_info'>내 정보</div>
            <Link to={'/writepost'} className='write_button'>카페 글쓰기</Link>
            
            <form className='search_box'>
                <input type="text" placeholder="search"></input>
                <button>검색</button>
            </form>

            <div className='menu_box'>
                <Link to={`/`} style={{borderBottom: "2px solid #e5e5e5", paddingBottom: "10px"}}>전체글보기 {posts.length}</Link>
                {boards.map(board=>{
                return(
                <Link to={`/board/${board.name}`} key={board.id}><img src="hidden.gif"></img> {board.name}</Link>
                );
            })}</div>
            </div>
            <div className="right_box">
                <div className="notice">알림 </div>
                <div className="board_box">
                    <Routes>
                        <Route exact path="/" element={<ShowPosts/>} />
                            {/* 전체글보기 */}

                        <Route exact path="/board/:board" element={<ShowPosts/>} />
                            {/* 메뉴에서 게시판 목록 클릭했을 때 특정 게시판의 글을 나타냄 */}

                        <Route exact path="/post/:post_id" element={<ShowPost/>} />
                            {/* 게시글을 클릭했을 때 글 보는 곳으로 이동*/}

                        <Route exact path="/userinfo/:user_id" element={<ShowUserInfo/>}/>
                            {/* 유저 정보 확인*/}

                        <Route element={<ShowPosts/>} />
                            {/* 잘못된 주소 입력시 useNavigate()로 처음 페이지로 이동? 또는 페이지가 그냥 유지된다면? 전체글만 표시하기 */}
                            
                    </Routes>
                </div>
            </div>

        </div>
    );
}