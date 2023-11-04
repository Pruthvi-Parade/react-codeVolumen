import React, { useEffect, useState } from "react";
import { Divider, Collapse, Tag, message, Button, Row, Col, Drawer, Space, Input } from 'antd';
import { CheckCircleOutlined, FolderAddTwoTone, CloseCircleOutlined, ArrowUpOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './CustomCollapse.css';
import axios from "axios";
import Addbook from "./Addbook";
const { Panel } = Collapse;

export default function Books() {

    const userType = localStorage.getItem('userType')
    const username = localStorage.getItem('username');
    const [bookData, setBookdata] = useState([]);
    const [bookDetails, setBookdetails] = useState(
        {
            title: '', 
            author: '',
            quantity: 1, 
            summary: '',
            excerpt: '',
        }
    );

    function getBooks() {
        axios.get('/common/all-books').then((response)=>{
            console.log(response);
            setBookdata(response.data)
            console.log(bookData);
        }).catch((error)=>{
            console.log(error);
        })
    }
     
    useEffect(()=>{
        getBooks();
    },[])

    const [keyboard, setKeyboard] = useState(true);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('right');
    const showDrawer = () => {
        setOpen(true);
    };
    const onChange = (e) => {
        setPlacement(e.target.value);
    };
    const onClose = () => {
        setOpen(false);
    };

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
        type: 'success',
        content: "Book Deleted",
        });
    };
    const error = () => {
        messageApi.open({
        type: 'error',
        content: "Failed to delete book",
        });
    };
    return (
        <div>
            <Divider orientation="left">Welcome { username } Browse our Collections</Divider>
            <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
                <Col>
                { userType == 'user' ? (<Button icon={<FolderAddTwoTone />} size="large" onClick={showDrawer}> Add Book </Button>) : (<></>)}
                </Col>
            </Row>
            {
                bookData.map( book =>{
                    return( 
                        <Collapse className="custom-collapse">
                        <Collapse.Panel header={
                            <div> {book.title} 
                            { book.quantity > 1 ? (<Tag icon={<CheckCircleOutlined />} color="success" style={{ float: "right" }}> Available </Tag> ):(<Tag icon={<CloseCircleOutlined />} style={{ float: "right" }} color="error"> Unavailable </Tag>)}
                            </div>
                        } key={book._id}>

                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <div>
                            <h3>Book Title : {book.title}</h3>
                            <h3>Book Author : {book.author}</h3>
                            <h3>Book Excerpt : {book.excerpt}</h3>
                            <h3>Summary : {book.summary}</h3>
                            </div>
                        </Col>
                        <Col span={12}>
                            <Row gutter={[8, 8]}>
                            {userType === 'librarian' ? (
                                <>
                                <Col span={8}>
                                    <Button type="primary" ghost style={{ marginRight: '8px' }}
                                    onClick={()=>{
                                        setBookdetails(book);
                                        console.log(bookDetails);
                                        showDrawer();
                                        }}>
                                    <ArrowUpOutlined /> Update Book 
                                    </Button>
                                    </Col>
                                    <Col span={8}>
                                    <Button type="primary" onClick={()=>{
                                        axios.delete(`/librarian/delete-book/${book._id}`).then(response => {
                                            console.log('Book deleted:', response.data, success);
                                            getBooks();
                                          })
                                          .catch(e => {
                                            console.error('Error deleting the book:', e, error);
                                          });
                                    }} danger ghost> Delete Book </Button>
                                </Col>
                                </>
                            ):(<></>)}
                            </Row>
                        </Col>
                        </Row>
                        </Collapse.Panel>
                    </Collapse>
                    )
                })
            }
            <Drawer title="Enter the details of the book" placement="bottom" height={600} width={500} onClose={onClose} open={open} extra={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                </Space>
                }
            >
                <Addbook 
                    getBooks={getBooks} 
                    role = { userType === 'user' ? "Add" : "Update"}
                    bookDetails = {bookDetails}
                />
            </Drawer>

        </div>
    )
}