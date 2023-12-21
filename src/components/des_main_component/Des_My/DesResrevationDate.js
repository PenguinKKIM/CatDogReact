import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loding from "../../tools/Loding";
import { useNavigate } from 'react-router';
import SwalCustomAlert from '../../Alerts/SwalCustomAlert';


function DesResrevationDate(props) {
    const navigate = useNavigate();
    //today
    const shopInfo = props.shopInfo;
    const desInfo = useSelector(state => state.des);
    const [selectDate, setSelectDate] = useState(new Date().toLocaleDateString());
    const [sqlDate, setSqlDate] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-' + new Date().getDate().toString().padStart(2, '0'));
    const [resList, setResList] = useState([]);
    const [loading, setLoading] = useState(false);

    const onChangeDate = (newValue) => {
        //toISOString: UTF 시간 기준이라 우리나라 시간으로 만들려면 9시간 빼야합니다
        const date = new Date(newValue.toISOString());

        // 한국 시간대로 조정 (UTC+9)
        const offset = date.getTimezoneOffset() * 60000;
        const koreaTime = new Date(date.getTime() - offset + (9 * 60 * 60000)); // UTC+9

        const month = (koreaTime.getMonth() + 1).toString().padStart(2, '0');
        const day = koreaTime.getDate().toString().padStart(2, '0');

        const sqlDate = `${koreaTime.getFullYear()}-${month}-${day}`;
        setSqlDate(sqlDate);


        const isoString = koreaTime.toLocaleDateString();
        setSelectDate(isoString);
    };

    //지난 날짜는 선택못하게하기
    const disablePastDates = (date) => {
        //오늘날짜 기준
        return date.isBefore(new Date(), "day");
    };





    const token = useSelector(state => state.token);
    useEffect(() => {

        // console.log("로그인 후 토큰 값 : " + token);
        axios.get('http://localhost:8090/user', {
            headers: {
                Authorization: token,
            }
        })
            .then(res => {
                console.log("Res : " + res.data);
            })
            .catch(err => {
                // console.log("Err : " + err);
                SwalCustomAlert(
                    'warning',
                    "로그인 이후 사용 가능합니다."
                );
                navigate('/userlogin');
            })

        setLoading(true);
        console.log(resList);
        axios.get(`http://localhost:8090/resinfobydesnum?desNum=${desInfo.num}&date=${sqlDate}`)
            .then((res) => {
                setResList(res.data);
                setSelectDate(new Date().toLocaleDateString());
            }
            )
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })

    }, [sqlDate, desInfo.num])



    // 예약된 시간인지 확인
    const isReserved = (date, time) => {
        const reserved = resList.find(res => res.date === date && res.time === time);
        return reserved;
    };
    // 
    const availableTimes = ['10:00', '12:00', '14:00', '16:00'];


    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    showDaysOutsideCurrentMonth
                    shouldDisableDate={disablePastDates}
                    onChange={onChangeDate} />
            </LocalizationProvider>
            {/* <input type="date" placeholder=" 날짜를 선택해주세요." onChange={onChangeDate} /> */}
            <span className="form-text date-center" style={{ cursor: 'pointer' }} >{selectDate}</span>
            <hr className="divide-line" />
                {resList && availableTimes.map(time => (
                    <div key={time}>
                        {isReserved(sqlDate, time) ? (
                            <div className='resv-link'>
                            <div className="reser-time-container btn-gray">
                                <div className="reser-time">
                                    <span className="reser-time-text">{time}</span>
                                </div>
                            </div>
                            </div>
                        ) : (
                            <>
                                {shopInfo !== null ? (
                                    <Link className='resv-link' to={`/shop/${shopInfo.num}/reservation/${desInfo.num}/form`} state={{ data1: time, data2: sqlDate }}>
                                        <div className="reser-time-container">
                                            <div className="reser-time">
                                                <span className="reser-time-text">{time}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="st-profile-shop">
                                    </div>)
                                }
                            </>

                        )}
                        <hr className="divide-line" key={`hr-${time}`} />
                    </div>
                ))}
          
        </>
    );
}

export default DesResrevationDate;
