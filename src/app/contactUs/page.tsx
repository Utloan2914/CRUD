'use client'
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

export const SendEmail: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string>('');

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      const toInput = document.createElement('input');
      toInput.setAttribute('type', 'hidden');
      toInput.setAttribute('name', 'to');
      toInput.setAttribute('value', 'tonhuoctong@gmail.com');
      form.current.appendChild(toInput);

      emailjs.sendForm('service_y2bvsbg', 'template_1g7nav5', form.current, 'hXi5QM6kiYcFjgTfI')
        .then(
          (result) => {
            console.log('SUCCESS!', result.text);
            setStatus('Email gửi thành công!');
          },
          (error) => {
            console.error('FAILED...', error);
            setStatus(`Gửi email thất bại: ${error.text || 'No error text available'}. Vui lòng thử lại sau.`);
          }
        ).catch((err) => {
          console.error('Error:', err);
          setStatus('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        });

      // Xóa input ẩn sau khi gửi
      form.current.removeChild(toInput);
    } else {
      console.error('Form reference is null');
    }
  };

  return (
    
    <Container>
      <Typography variant="h5" component="h1" gutterBottom sx={{ mt: 2 }}>
      Cảm ơn đã sử dụng dịch vụ của chúng tôi. Nếu có bất kỳ phản hồi nào, vui lòng liên hệ với chúng tôi qua email bên dưới.
        </Typography>
      <Box 
        component="form" 
        ref={form} 
        onSubmit={sendEmail} 
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2, 
          mt: 5,
          ml: 25, 
          p: 3, 
          border: '1px solid #ccc', 
          borderRadius: 1,
          boxShadow: 3,
          maxWidth:'sm',
           
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Liên hệ với chúng tôi
        </Typography>
        <TextField 
          label="Tên" 
          name="user_name" 
          required 
          fullWidth 
        />
        <TextField 
          label="Email" 
          name="user_email" 
          type="email" 
          required 
          fullWidth 
        />
        <TextField 
          label="Tin nhắn" 
          name="message" 
          required 
          multiline 
          rows={4} 
          fullWidth 
          InputProps={{
            style: { backgroundColor: '#ffffff' }
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
        >
          Gửi
        </Button>
        {status && <Typography variant="body1" color="red" align="center">{status}</Typography>}
      </Box>
    </Container>
  );
};

export default SendEmail;
