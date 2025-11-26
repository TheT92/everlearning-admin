import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { use, useEffect, useRef, useState } from "react";
import { Button, Flex, Form, Input, Pagination, Space, Table, Tag } from "antd";
import type { FormProps, TableProps } from 'antd';
import { apiGetProblems } from "../apis/problem";
import { apiAddCategory } from "../apis/category";
import '../styles/problems.scss';

interface DataType {
    title: string;
    desc: string;
    difficulty: number;
    categories: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Desc',
        dataIndex: 'desc',
        key: 'desc',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'categories',
        key: 'categories',
        dataIndex: 'tags',
        render: (_, { categories }) => (
            <Flex gap="small" align="center" wrap>
                <Tag color='volcano' key={categories}>{categories}</Tag>
            </Flex>
        ),
    },
    {
        title: 'Difficulty',
        dataIndex: 'difficulty',
        key: 'difficulty',
        render: (text) => (<Tag color={text == 1 ? 'green' : (text == 2 ? 'orange' : 'red')}>{text == 1 ? 'Easy' : (text == 2 ? 'Middle' : 'Hard')}</Tag>),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

type FieldType = {
    name?: string;
};

export default function Categories() {
    const navigate = useNavigate();
    const loaded = useRef(false);
    const [total, setTotal] = useState(0);
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [problems, setProblems] = useState<DataType[]>([])
    const [categories, setCategories] = useState([]);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        apiAddCategory(values).then(res => {
            console.log("success", res)
            fetchData()
        }).catch(err => {
            console.log("error", err)
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
        apiGetProblems({ page: page, size: 10 }).then(res => {
            const { items, total } = res?.data;
            setTotal(total);
            setProblems(items);
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
            <Table<DataType> columns={columns} dataSource={problems} pagination={false} className="mb-4" />

            <Pagination onChange={onPageChange} defaultCurrent={1} current={currentPage} total={total} />
        </div>
    );
}