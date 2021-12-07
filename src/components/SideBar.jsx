import React, { useRef } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slice/staffSlice';

const SideBar = () => {
    return (

        <div className="side--bar">
            <div className="side--bar__body">
                <div className="side--bar__body__item">
                    <div className="side--bar__body__item__title">
                        Đơn hàng mới
                    </div>
                    <div className="side--bar__body__item__link">
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-list-plus'></i>
                        </div>
                        <Link to="/">
                            <p>Danh sách</p>
                        </Link>
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-chevron-right'></i>
                        </div>
                    </div>
                </div>
                <div className="side--bar__body__item">
                    <div className="side--bar__body__item__title">
                        Đơn trả hàng
                    </div>
                    <div className="side--bar__body__item__link">
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-list-plus'></i>
                        </div>
                        <Link to="/return">
                            <p>Danh sách</p>
                        </Link>
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-chevron-right'></i>
                        </div>
                    </div>
                </div>
                <div className="side--bar__body__item">
                    <div className="side--bar__body__item__title">
                        Đơn hàng đã xác nhận
                    </div>
                    <div className="side--bar__body__item__link">
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-log-in-circle' ></i>
                        </div>
                        <Link to="/orderin">
                            <p>Nhập kho</p>
                        </Link>
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-chevron-right'></i>
                        </div>
                    </div>
                    <div className="side--bar__body__item__link">
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-log-out-circle'></i>
                        </div>
                        <Link to="/orderout">
                            <p>Rời kho</p>
                        </Link>
                        <div className="side--bar__body__item__link__icon">
                            <i class='bx bx-chevron-right'></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
