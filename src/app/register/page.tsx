'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button, Container, Row, Col, Card, CardBody, CardImg, Input, Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormData } from '../component/formData/page';
import classNames from 'classnames';
const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        phone: '',
        address: '',
        subscribe: false,
        urlImage: null
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [fileSelected, setFileSelected] = useState(false);

    useEffect(() => {
        const storedFormData = localStorage.getItem('formData');
        if (storedFormData) {
            setFormData(JSON.parse(storedFormData));
        }

        const storedImageUrl = localStorage.getItem('urlImage');
        if (storedImageUrl) {
            setFormData(prevState => ({
                ...prevState,
                urlImage: storedImageUrl
            }));
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        setFormData(prevState => ({
            ...prevState,
            [name]: fieldValue
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setFormData(prevState => ({
                    ...prevState,
                    urlImage: imageUrl
                }));
                localStorage.setItem('urlImage', imageUrl);
                setFileSelected(true);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please choose a file.");
        }
    };

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePhone = (phone: string) => {
        return /^[0-9]{10}$/.test(phone);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const { name, email, password, repeatPassword, phone, address, urlImage } = formData;

        if (!name || !email || !password || !repeatPassword || !phone || !address) {
            setError('All fields are required.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Invalid email.');
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        if (storedUsers.some((user: { email: string }) => user.email === email)) {
            setError('Email already exists. Please choose another email.');
            return;
        }

        if (password !== repeatPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!validatePhone(phone)) {
            setError('Invalid phone number. Phone number must contain 10 digits.');
            return;
        }

        const newUser = { name, email, password, phone, address, urlImage };
        localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
        setSuccess('Registration successful!');
        router.push("/login");
    };

    return (
        <Container fluid style={{ maxWidth: '900px', height: '760px' }}>
            <Card className='text-black m-5 mt-1' style={{ borderRadius: '25px' }}>
                <CardBody>
                    <Row>
                        <Col md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>
                            <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
                                {error && <Alert color="danger">{error}</Alert>}
                                {success && <Alert color="success">{success}</Alert>}
                                
                                <div className="input-group mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" style={{ width: '40px', height: '40px', fontSize: '12px' }}>
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                    <Input type='text' name='name' placeholder='Your name' style={{fontSize: '19px'}} value={formData.name} onChange={handleChange} />
                                </div>

                                <div className="input-group mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" style={{ width: '40px', height: '40px', fontSize: '12px' }}>
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                    </div>
                                    <Input type='email' name='email' placeholder='Your email' style={{fontSize: '19px'}} value={formData.email} onChange={handleChange} />
                                </div>

                                <div className="input-group mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" style={{ width: '40px', height: '40px', fontSize: '12px' }}>
                                            <i className="fas fa-lock"></i>
                                        </span>
                                    </div>
                                    <Input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password'style={{fontSize: '19px'}} value={formData.password} onChange={handleChange} />
                                    <div className="input-group-append">
                                        <span className="input-group-text" style={{ cursor: 'pointer', marginLeft: '10px',width: '40px', height: '40px', fontSize: '12px'}} onClick={togglePasswordVisibility}>
                                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                        </span>
                                    </div>
                                </div>

                                <div className="input-group mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" style={{ width: '40px', height: '40px', fontSize: '12px' }}>
                                            <i className="fas fa-key"></i>
                                        </span>
                                    </div>
                                    <Input type={showRepeatPassword ? 'text' : 'password'} name='repeatPassword' placeholder='Repeat password'style={{fontSize: '19px'}} value={formData.repeatPassword} onChange={handleChange} />
                                    <div className="input-group-append">
                                        <span className="input-group-text" style={{ cursor: 'pointer', marginLeft: '10px',width: '40px', height: '40px', fontSize: '12px' }} onClick={toggleRepeatPasswordVisibility}>
                                            <i className={`fas ${showRepeatPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                        </span>
                                    </div>
                                </div>

                                <div className="input-group mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" style={{ width: '40px', height: '40px', fontSize: '12px' }}>
                                            <i className="fas fa-phone"></i>
                                        </span>
                                    </div>
                                    <Input type='text' name='phone' placeholder='Your phone number' style={{fontSize: '19px'}}value={formData.phone} onChange={handleChange} />
                                </div>

                                <div className="input-group mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" style={{ width: '40px', height: '40px', fontSize: '12px' }}>
                                            <i className="fas fa-home"></i>
                                        </span>
                                    </div>
                                    <Input type='text' name='address' placeholder='Your address'style={{fontSize: '19px'}} value={formData.address} onChange={handleChange} />
                                </div>

                                <div className="input-group mb-4">
                                    <Input 
                                        type='file' 
                                        accept="image/*" 
                                        name='urlImage' 
                                        onChange={handleImageChange} 
                                        style={{ fontSize: '20px' }} 
                                        placeholder="Choose file" 
                                    />
                                </div>

                                <Button type="submit" id="button" className='mb-4' size='lg'>Register</Button>
                            </form>
                        </Col>
                        <Col md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            {formData.urlImage && (
                                <CardImg src={formData.urlImage} style={{ width: '300px', height: '300px' }} />
                            )}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Container>
    );
};

export default Register;
