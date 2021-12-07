import React, { useRef } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slice/staffSlice';
import logo from '../assets/ship-01.png';

const mainNav = [
    {
        display: "Chờ Xác Nhận",
        path: "/"
    },
    {
        display: "Đã Xác Nhận Nhập",
        path: "/orderin"
    },
    {
        display: "Đã Xác Nhận Xuất",
        path: "/orderout"
    },
]

const NewHeader = () => {

    // const history = useHistory();

    const dispatch = useDispatch();

    const staff = useSelector(state => state.staff.staff);

    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex(e => e.path === pathname)

    const menuLeft = useRef(null)

    const menuToggle = () => menuLeft.current.classList.toggle('active')

    const handleLogout = () => {
        const action = logout();
        dispatch(action);
    }

    return (
        <div className="header" >
            <div className="header__slogan" >
                    <span className="header__slogan__span">Giao hàng nhanh - Giành chiến thắng</span>
                </div>
            <div className="header__menu">
                <div className="header__menu__left" >
                    <span className="header__menu__left__item">Super Ship</span>
                </div>
                <div className="header__menu__right">
                    <div className="header__menu__item header__menu__right__item">
                        <div className="header__menu__item header__menu__right__item__icon">
                            <i class='bx bxs-bell-ring' ></i>
                        </div>
                        <div className="header__menu__item header__menu__right__item__icon">
                        <i class='bx bx-mail-send'></i>
                        </div>
                        <span className="header__menu__right__item__name" style={{ padding: "0 10px" }}> | </span>
                        <span className="header__menu__right__item__name" >{staff.FullName}</span>
                        <span className="header__menu__right__item__name" style={{ paddingLeft: "10px" }}> | </span>
                        <span className="header__menu__right__item__name" onClick={handleLogout} style={{
                            color: "red",
                            cursor: "pointer",
                            paddingLeft: "10px"
                        }}> Đăng Xuất </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewHeader
