'use client';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import { FormData } from '../../component/formData/page';

interface ViewProfileProps {
    formData: FormData; 
}
const ViewProfile: React.FC<ViewProfileProps> = ({ formData }) => {
    const [user, setUser] = useState<FormData | null>(null);

    useEffect(() => {
        const storedUsers= JSON.parse(localStorage.getItem('formData') || '[]');
        if (storedUsers) {
            setUser(storedUsers);
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid style={{ width: '45%' }}>
            <Card className='text-black m-5' style={{ borderRadius: '25px' }}>
                <CardBody>
                    <Row>
                        <Col md='6' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Hồ Sơ Cá Nhân</p>
                            <ListGroup className='w-100'>
                                <ListGroupItem><strong>Tên:</strong> {user.name}</ListGroupItem>
                                <ListGroupItem><strong>Email:</strong> {user.email}</ListGroupItem>
                                <ListGroupItem><strong>Số điện thoại:</strong> {user.phone}</ListGroupItem>
                                <ListGroupItem><strong>Địa chỉ:</strong> {user.address}</ListGroupItem>
                            </ListGroup>
                            <Link href="/editProfile" className="btn btn-primary mt-4">Chỉnh sửa hồ sơ</Link>
                        </Col>
                        <Col className='order-1 order-lg-2 d-flex align-items-center'>
                            <Avatar alt="User Image" src={user.urlImage || './img/defaultImage.png'} style={{ width: '150px', height: '150px', marginLeft:'40px', marginRight:'0px'}} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    );
};

export default ViewProfile;
