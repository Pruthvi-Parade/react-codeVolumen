import React, { useEffect, useState } from "react";
import { message, Collapse, Tag, InputNumber, Button, Row, Col, Form, Space, Input } from 'antd';
import { CheckCircleOutlined, FolderAddTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './CustomCollapse.css';
import axios from "axios";
const { Panel } = Collapse;

export default function Addbook({ getBooks, role, bookDetails }) {
    const onFinish = (values) => {
        console.log('Success:', values);
        
        if ( role === 'Add'){
            axios.post('user/add-book', values)
            .then(response => {
                console.log('Book added:', response.data, success);
                getBooks();
            })
            .catch(e => {
                console.error('Error adding the book:', e, error);
            })
        }
        else{
            axios.put(`librarian/update-book/${bookDetails._id}`, values)
            .then(response => {
                console.log('Book added:', response.data, success);
                getBooks();
            })
            .catch(e => {
                console.error('Error adding the book:', e, error);
            })
        }

      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      console.log(bookDetails);

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
        type: 'success',
        content: role === 'Add' ? 'BookAdded' : "Book Updated",
        });
    };
    const error = () => {
        messageApi.open({
        type: 'error',
        content: role === 'Add' ? 'Failed to add book' : "Failed to update book",
        });
    };

    const initialValues = {
        title: bookDetails.title || '', 
        author: bookDetails.author || '',
        quantity: bookDetails.quantity || 1, 
        summary: bookDetails.summary || '',
        excerpt: bookDetails.excerpt || '',
    };
      return(
        <div>
            <Form
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            style={{
            maxWidth: 600,
            }}
            initialValues={initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Bookname"
            name="title"
            rules={[
                {
                required: true,
                message: 'Enter Book Name!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Author Names"
            name="author"
            rules={[
                {
                required: true,
                message: 'Enter Author Name!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
                {
                type: 'number',
                required: true,
                message: 'Enter Quantity!',
                },
            ]}
            >
            <InputNumber />
            </Form.Item>

            <Form.Item
            label="Summary"
            name="summary"
            rules={[
                {
                required: true,
                message: 'Enter Summary!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label="Excerpt"
            name="excerpt"
            rules={[
                {
                required: true,
                message: 'Enter Excerpt!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Button type="primary" htmlType="submit">
                {role}
            </Button>
            </Form.Item>
        </Form>
        </div>
      )
}