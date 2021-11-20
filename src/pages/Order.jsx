import React, { useEffect, useState } from 'react';
import deliveryAPI from '../api/deliveryAPI';
import { Table, ButtonToggle, Card, CardTitle, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import numberWithCommas from '../utils/numberWithCommas';
import { useHistory } from "react-router-dom";

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
// confirm alert
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// React bootstrap table
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, dateFilter, numberFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

const EditButton = (props) => {

    const token = useSelector(state => state.staff.token);

    const StaffId = useSelector(state => state.staff.staff.StaffId);

    const history = useHistory();

    const handleCheck = props.handleCheck;

    const Status = props.row.StatusDetail;

    const DeliveryId = props.row.DeliveryId;

    const configNotify = {
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 3000,
            onScreen: true
        }
    }

    const hanleIn = () => {
        const item = {
            DeliveryId: DeliveryId,
            StaffId: StaffId,
            Status: 'Nhap kho',
        }
        const fetchUpdateDelivery = async () => {
            var result = {};
            try {
                result = await deliveryAPI.update(item, token);
            } catch (error) {
                console.log("Failed to fetch update delivery status: ", error);
            }
            if (result.successful == true) {
                store.addNotification({
                    title: "Wonderfull!",
                    message: `Xác nhận nhập kho thành công!`,
                    type: "success",
                    ...configNotify
                });
                handleCheck();
                history.push('/orderin');
            } else {
                store.addNotification({
                    title: "Error!",
                    message: `Xác nhận nhập kho thất bại, vui lòng thử lại sau!`,
                    type: "warning",
                    ...configNotify
                });
                handleCheck();
                history.push('/orderin');
            }
        }
        confirmAlert({
            title: 'Xác nhận Nhập Kho',
            message: 'Bạn có chắc chắc muốn xác nhận nhập kho đơn hàng này không?',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => fetchUpdateDelivery()
                },
                {
                    label: 'Không',
                    onClick: () => {
                        history.push('/');
                    }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    }

    const hanleOut = () => {
        const item = {
            DeliveryId: DeliveryId,
            StaffId: StaffId,
            Status: 'Xuat kho',
        }
        const fetchUpdateDelivery = async () => {
            var result = {};
            try {
                result = await deliveryAPI.update(item, token);
            } catch (error) {
                console.log("Failed to fetch update delivery status: ", error);
            }
            if (result.successful == true) {
                store.addNotification({
                    title: "Wonderfull!",
                    message: `Xác nhận xuất kho thành công!`,
                    type: "success",
                    ...configNotify
                });
                handleCheck();
                history.push('/orderout');
            } else {
                store.addNotification({
                    title: "Error!",
                    message: `Xác nhận xuất kho thất bại, vui lòng thử lại sau!`,
                    type: "warning",
                    ...configNotify
                });
                handleCheck();
                history.push('/orderout');
            }
        }
        confirmAlert({
            title: 'Xác Nhận Xuất Kho',
            message: 'Bạn có chắc chắc muốn xác nhận xuất kho này không?',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => fetchUpdateDelivery()
                },
                {
                    label: 'Không',
                    onClick: () => {
                        history.push('/store');
                    }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
        
    }
    return (
        <div>
            {Status.trim() === 'Dang ve kho' ?
                <td>
                    <ButtonToggle color="info" onClick={hanleIn}>Xác nhận nhập kho</ButtonToggle>{' '}
                </td>
                :
                <td>
                    <ButtonToggle color="danger" onClick={hanleOut}>Xác nhận xuất kho</ButtonToggle>{' '}
                </td>
            }
            
        </div>
    );
};

const DeliveryTable = () => {

    const token = useSelector(state => state.staff.token);

    const [deliveries, setDeliveries] = useState([]);

    const [check, setCheck] = useState(false);

    const fetchdeliveries = async () => {
        var deliveries = [];
        try {
            deliveries = await deliveryAPI.getAll(token);
        } catch (error) {
            console.log("Failed to fetch options: ", error);
        }
        setDeliveries(deliveries);
    }

    useEffect(() => {
        fetchdeliveries();
    }, []);

    useEffect(() => {
        fetchdeliveries();
    }, [check]);

    const handleCheck = () => {
        setCheck(!check);
    }

    const cellButton = (cell, row, rowIndex) => (
        <EditButton cell={cell} row={row} rowIndex={rowIndex} handleCheck={handleCheck} />
    );

    const selectOptions = {
        ['Dang roi kho']: 'Đang xuất kho',
        ['Dang ve kho']: 'Đang nhập kho',
    };

    const columns = [
        {
            dataField: 'DeliveryId',
            text: 'Mã vận đơn',
            sort: true,
            filter: textFilter({ placeholder: 'Mã vận đơn...', }),
            style: {
                fontWeight: 'bold',
            },
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'StoreId',
            text: 'Mã cửa hàng',
            sort: true,
            filter: textFilter({ placeholder: 'Mã cửa hàng...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'RecieverName',
            text: 'Tên người nhận',
            sort: true,
            filter: textFilter({ placeholder: 'Tên người nhận...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'RecieverPhone',
            text: 'SĐT người nhận',
            sort: true,
            filter: textFilter({ placeholder: 'SĐT người nhận...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'AddressDetail',
            text: 'Địa chỉ',
            sort: true,
            filter: textFilter({ placeholder: 'Địa chỉ...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'WardName',
            text: 'Phường/Xã',
            sort: true,
            filter: textFilter({ placeholder: 'Phường/Xã...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'DistrictName',
            text: 'Quận/Huyện',
            sort: true,
            filter: textFilter({ placeholder: 'Quận/Huyện...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'ProvinceName',
            text: 'Tỉnh, TP',
            sort: true,
            filter: textFilter({ placeholder: 'Tỉnh, TP...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'COD',
            text: 'Thu hộ',
            sort: true,
            formatter: cell => numberWithCommas(cell),
            filter: numberFilter({ placeholder: 'Nhập tổng tiền ...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'ShipType',
            text: 'Loại giao hàng',
            sort: true,
            filter: textFilter({ placeholder: 'Loại giao hàng...', }),
            headerStyle: {
                width: '100px',
            }
        },
        {
            dataField: 'OrderDate',
            text: 'Ngày đặt hàng',
            headerStyle: { width: '110px' },
            sort: true,
            formatter: cell => cell.split('T')[0],
            filter: dateFilter()
        },
        {
            dataField: 'StatusDetail',
            text: 'Trạng thái',
            sort: true,
            headerStyle: { width: '110px' },
            formatter: cell => selectOptions[cell],
            filter: selectFilter({
                options: selectOptions
            })
        },
        {
            text: "Thao Tác",
            formatter: cellButton,
            sort: true,
            headerStyle: {
                width: '90px',
            },
        }
    ];

    const PageOptions = {
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: '15', value: 15
        }, {
            text: 'All', value: deliveries.length
        }]
    };

    const expandRow = {
        onlyOneExpanding: true,
        renderer: (row, rowIndex) => {
            const delivery = deliveries.find(delivery => delivery.DeliveryId === row.DeliveryId);
            return (
                <Card>
                    <CardTitle tag="h5">Chi tiết vận đơn</CardTitle>
                    <CardBody>
                        <Table striped hover bordered responsive>
                            <tbody>
                                <tr>
                                    <th>Tên mặt hàng</th>
                                    <th>Kích thước</th>
                                    <th>Cân nặng</th>
                                    <th>Loại hàng</th>
                                </tr>
                                <tr>
                                    <td>{delivery.GoodName}</td>
                                    <td>{delivery.GoodSize}</td>
                                    <td>{delivery.GoodWeight}</td>
                                    <td>{delivery.GoodType}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            );
        },
    };

    const MyExportCSV = (props) => {
        const handleClick = () => {
            props.onExport();
        };
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
                <button className="btn btn-info" onClick={handleClick}>Xuất File</button>
            </div>
        );
    };


    return (
        <div >
            <div className="row">
                <div className="col-sm-12 btn btn-info">
                    Danh Sách Vận Đơn
                </div>
            </div>
            <ToolkitProvider
                keyField="DeliveryId"
                data={deliveries}
                columns={columns}
                exportCSV={{
                    fileName: 'deliveries.csv',
                    blobType: 'text/csv;charset=UTF-8'
                }}
            >
                {
                    props => (
                        <div>
                            <BootstrapTable
                                keyField='DeliveryId'
                                data={deliveries}
                                columns={columns}
                                tabIndexCell
                                striped
                                hover
                                condensed
                                pagination={paginationFactory(PageOptions)}
                                filter={filterFactory()}
                                filterPosition="top"
                                expandRow={expandRow}
                                {...props.baseProps} />
                            <hr />
                            <MyExportCSV {...props.csvProps}>Xuất File Excel!!</MyExportCSV>
                            <hr />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}

export default DeliveryTable;