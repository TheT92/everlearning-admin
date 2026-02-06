import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { use, useEffect, useRef, useState } from "react";
import { Button, Flex, Form, Input, message, Pagination, Space, Table, Tag } from "antd";
import type { FormProps, TableProps } from 'antd';
import { apiAddCategory, apiGetCategories } from "../apis/category";
import '../styles/problems.scss';

interface DataType {
    uuid: string;
    name: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'UUID',
        dataIndex: 'uuid',
        key: 'uuid',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
];

type FieldType = {
    name?: string;
};

export default function Categories() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const loaded = useRef(false);
    const [total, setTotal] = useState(0);
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        apiAddCategory(values).then(res => {
            message.success("Add category successfully!")
            fetchData();
            form.resetFields();
        }).catch(err => {
            console.log("error", err)
             message.error("Add category failed")
        })
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (!loaded.current) {
            loaded.current = true;
            const page = searchParams.get('page');
            const pageNumber = Number(page) < 1 ? 1 : Number(page);
            setCurrentPage(pageNumber);
            fetchData(pageNumber); // 直接传入计算出的 pageNumber
        }

    }, [searchParams]);

    const fetchData = (page = 1) => {
        apiGetCategories({ page: page, size: 10 }).then(res => {
            const { list, total } = res?.data;
            setTotal(total);
            setCategories(list);
        }).catch(err => {
            console.log(err, 'fetch error');
        })
    };

    const onPageChange = (page: number) => {
        console.log("Page changed to:", page);
        navigate(`/problems?page=${page}`);
    }

    return (
        <div className="page-container problems-page">
            <Input type="text" className="search-bar" placeholder="Search here" />
            <Form
                name="basic"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Category Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter category name' }]}
                >
                    <Input allowClear />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <Table<DataType> columns={columns} dataSource={categories} pagination={false} className="mb-4" />

            <Pagination onChange={onPageChange} defaultCurrent={1} current={currentPage} total={total} />
        </div>
    );
}