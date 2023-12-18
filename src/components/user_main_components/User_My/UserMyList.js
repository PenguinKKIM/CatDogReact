import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserMylist() {

    const [showSection, setShowSection] = useState(true);
    const user = useSelector((state) => state.user);



    useEffect(() => {
        console.log(user);
        setShowSection(true);
    }, [user]);

    return (
        <>
            <main className="cd-main dis-center">
                <section className="mypage-title-section">
                    <div className="mypage-title-container">
                        <div className="mypage-title-text">안녕하세요! <span className="color-nomal"> {user.nickname} </span>님!</div>
                    </div>
                </section>
                <section className={`shop-main-section ${showSection ? "" : "hidden"} bg-white`} >
                    <ul className="nav-ul">
                        <li className="nav-li ">
                            <div>
                                <i className="fas fa-caret-square-right mypage-arrow"></i>
                                <Link to="usermodi" >보호자 정보 수정하기</Link>
                            </div>
                            <i className="fas fa-user"></i>
                        </li>
                        <li className="nav-li">
                            <div>
                                <i className="fas fa-caret-square-right mypage-arrow"></i>
                                <Link to="reservation">예약 확인하기</Link>
                            </div>
                            <i className="fas fa-calendar-alt"></i>
                        </li>
                        <li className="nav-li">
                            <div>
                                <i className="fas fa-caret-square-right mypage-arrow"></i>
                                <Link to={`reservationdone/${user.num}`}>이전 이용내역 보기</Link>
                            </div>
                            <i className="fas fa-history"></i>
                        </li>
                        <li className="nav-li">
                            <div>
                                <i className="fas fa-caret-square-right mypage-arrow"></i>
                                <Link to="petreg">반려동물 등록/수정하기</Link>
                            </div>
                            <i className="fas fa-cat"></i>
                        </li>
                        <li className="nav-li">
                            <div>
                                <i className="fas fa-caret-square-right mypage-arrow"></i>
                                <Link to="desreg">디자이너 등록 하기</Link>
                            </div>
                            <i className="fas fa-cut"></i>
                        </li>
                    {user.roles === "ROLE_DES" || user.roles === "ROLE_SHOP" ?
                    <div>
                    

                        <li className="nav-li">
                            <div>
                                <i className="fas fa-caret-square-right mypage-arrow"></i>
                                <Link to="desinfo">디자이너 수정 하기</Link>
                            </div>
                            <i className="fas fa-cut"></i>
                        </li>

                        <li className="nav-li">
                            <div>
                                <i className="fas fa-caret-square-right mypage-arrow"></i>
                                <Link to="desresvlist">디자이너 예약 확인하기</Link>
                            </div>
                            <i className="fas fa-clipboard-list"></i>
                        </li>

                        <li className="nav-li">
                            <div>
                                <i className="fas fa-caret-square-right mypage-arrow"></i>
                                <Link to="shopreg">샵 정보 등록 / 수정하기</Link>
                            </div>
                            <i className="fas fa-store"></i>
                        </li>
                        </div>
                :""}

                    </ul>
                </section>
            </main>
        </>
    );
}

export default UserMylist;
