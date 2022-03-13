import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import styles from '../module/WritePost.module.css'

export default function WritePost(){
    const boards = useFetch('http://localhost:3001/boards');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function onSubmit(event){
        event.preventDefault();

        // 중첩클릭 방지 기능
        // 제목, 내용, 게시판미선택시 제한
        // 포스팅 제차 확인 confirm 

        if(boardRef.current.value === "게시판을 선택해 주세요.") {
            alert("게시판을 선택해 주세요.")
            return undefined;
        }
        if(titleRef.current.value === ""){
            alert("제목을 입력해 주세요.")
            return undefined;
        }
        if(contentRef.current.value === ""){
            alert("내용을 입력해 주세요.")
            return undefined;
        }

        if(!window.confirm("게시물을 작성하시겠습니까?")){
            return undefined;
        }

        if(isLoading){
            return undefined;
        }

        setIsLoading(true);


        fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "board": boardRef.current.value,
                "title": titleRef.current.value,
                "author": "Unknown",
                "content": contentRef.current.value,
                "date" : "2022.03.07",
                "views" : 0
            })
        })
        .then(res=>{
            if(res.ok){
                alert("게시물 작성이 완료되었습니다.")
                //메인페이지로 이동. 원래는 history 썼었는데 이제 navigation? 그거 써야함
                navigate("/");
                setIsLoading(false);

            }
        })
    }

    const boardRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    return(
        <div className={styles.frame}>
            <div className={styles.body_box}>

                <div className={styles.menu_list}>
                    <span><Link to="/" style={{color:"white"}}>전체글보기</Link></span>
                    {boards.map(board=>{
                        return (
                            <span key={board.id}>  •  <Link to={`/board/${board.name}`} style={{color:"white"}}>{board.name}</Link></span>
                        );
                    })}
                </div>
                <div className={styles.guide_and_button}>
                    <span className={styles.guide}>카페 글쓰기</span>
                    <button className={styles.post_button} form="submit">등록</button>
                </div>
                <div className={styles.option_box}>

                    <form className={styles.input_box} id="submit" onSubmit={onSubmit}>

                        <select className={styles.select_board_box} defaultValue="게시판을 선택해 주세요." ref={boardRef}>
                            <option value="게시판을 선택해 주세요." disabled>게시판을 선택해 주세요.</option>
                            {boards.map(board=>{
                                return(
                                    <option value={board.name} key={board.id}>{board.name}</option>
                                )
                            })}
                        </select><br/>
                        
                        <input type='text' placeholder='제목을 입력해 주세요.' className={styles.input_title_box} ref={titleRef}></input>

                        <div className={styles.tools_and_paper}>

                            <div className={styles.tools_box} placeholder="tools"></div>

                            <textarea placeholder='내용을 입력해 주세요.' className={styles.paper} ref={contentRef}></textarea>

                        </div>


                    </form>
                    
                    <div className={styles.additional_option_box}>additional_option_box</div>

                </div>


            </div>
        </div>
    );
}