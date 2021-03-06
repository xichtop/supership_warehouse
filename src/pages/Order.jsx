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
                    message: `X??c nh???n nh???p kho th??nh c??ng!`,
                    type: "success",
                    ...configNotify
                });
                handleCheck();
                history.push('/orderin');
            } else {
                store.addNotification({
                    title: "Error!",
                    message: `X??c nh???n nh???p kho th???t b???i, vui l??ng th??? l???i sau!`,
                    type: "warning",
                    ...configNotify
                });
                handleCheck();
                history.push('/');
            }
        }
        confirmAlert({
            title: 'X??c nh???n Nh???p Kho',
            message: 'B???n c?? ch???c ch???c mu???n x??c nh???n nh???p kho ????n h??ng n??y kh??ng?',
            buttons: [
                {
                    label: 'C??',
                    onClick: () => fetchUpdateDelivery()
                },
                {
                    label: 'Kh??ng',
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
                    message: `X??c nh???n xu???t kho th??nh c??ng!`,
                    type: "success",
                    ...configNotify
                });
                handleCheck();
                history.push('/orderout');
            } else {
                store.addNotification({
                    title: "Error!",
                    message: `X??c nh???n xu???t kho th???t b???i, vui l??ng th??? l???i sau!`,
                    type: "warning",
                    ...configNotify
                });
                handleCheck();
                history.push('/');
            }
        }
        confirmAlert({
            title: 'X??c Nh???n Xu???t Kho',
            message: 'B???n c?? ch???c ch???c mu???n x??c nh???n xu???t kho n??y kh??ng?',
            buttons: [
                {
                    label: 'C??',
                    onClick: () => fetchUpdateDelivery()
                },
                {
                    label: 'Kh??ng',
                    onClick: () => {
                        history.push('/');
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
                    <ButtonToggle color="info" onClick={hanleIn}>X??c nh???n nh???p kho</ButtonToggle>{' '}
                </td>
                :
                <td>
                    <ButtonToggle color="danger" onClick={hanleOut}>X??c nh???n xu???t kho</ButtonToggle>{' '}
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
        ['Dang roi kho']: '??ang xu???t kho',
        ['Dang ve kho']: '??ang nh???p kho',
    };

    const columns = [
        {
            dataField: 'DeliveryId',
            text: 'M?? v???n ????n',
            sort: true,
            filter: textFilter({ placeholder: 'M??...', }),
            style: {
                fontWeight: 'bold',
            },
            headerStyle: {
                width: '60px',
            }
        },
        {
            dataField: 'StoreId',
            text: 'M?? c???a h??ng',
            sort: true,
            filter: textFilter({ placeholder: 'M?? c???a h??ng...', }),
            headerStyle: {
                width: '80px',
            }
        },
        {
            dataField: 'RecieverName',
            text: 'T??n ng?????i nh???n',
            sort: true,
            filter: textFilter({ placeholder: 'T??n ng?????i nh???n...', }),
            headerStyle: {
                width: '106px',
            }
        },
        {
            dataField: 'RecieverPhone',
            text: 'S??T ng?????i nh???n',
            sort: true,
            filter: textFilter({ placeholder: 'S??T ng?????i nh???n...', }),
            headerStyle: {
                width: '100px',
            }
        },
        {
            dataField: 'AddressDetail',
            text: '?????a ch???',
            sort: true,
            filter: textFilter({ placeholder: '?????a ch???...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'WardName',
            text: 'Ph?????ng/X??',
            sort: true,
            filter: textFilter({ placeholder: 'Ph?????ng/X??...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'DistrictName',
            text: 'Qu???n/Huy???n',
            sort: true,
            filter: textFilter({ placeholder: 'Qu???n/Huy???n...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'ProvinceName',
            text: 'T???nh, TP',
            sort: true,
            filter: textFilter({ placeholder: 'T???nh, TP...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'COD',
            text: 'Thu h???',
            sort: true,
            formatter: cell => numberWithCommas(cell),
            filter: numberFilter({ placeholder: 'Nh???p t???ng ti???n ...', }),
            headerStyle: {
                width: '100px',
            }
        },
        {
            dataField: 'ShipType',
            text: 'Lo???i giao h??ng',
            sort: true,
            filter: textFilter({ placeholder: 'Lo???i giao h??ng...', }),
            headerStyle: {
                width: '100px',
            }
        },
        {
            dataField: 'OrderDate',
            text: 'Ng??y ?????t h??ng',
            headerStyle: { width: '110px' },
            sort: true,
            formatter: cell => cell.split('T')[0],
            filter: dateFilter()
        },
        {
            dataField: 'StatusDetail',
            text: 'Tr???ng th??i',
            sort: true,
            headerStyle: { width: '110px' },
            formatter: cell => selectOptions[cell],
            filter: selectFilter({
                options: selectOptions
            })
        },
        {
            text: "Thao T??c",
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
                    <CardTitle tag="h5">Chi ti???t v???n ????n</CardTitle>
                    <CardBody>
                        <Table striped hover bordered responsive>
                            <tbody>
                                <tr>
                                    <th>T??n m???t h??ng</th>
                                    <th>K??ch th?????c</th>
                                    <th>C??n n???ng</th>
                                    <th>Lo???i h??ng</th>
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
                <button className="btn btn-info" onClick={handleClick}>Xu???t File</button>
            </div>
        );
    };


    return (
        <div >
            <div className="row">
                <div className="col-sm-12 title">
                    Danh S??ch V???n ????n M???i
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
                            <MyExportCSV {...props.csvProps}>Xu???t File Excel!!</MyExportCSV>
                            <hr />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}

export default DeliveryTable;