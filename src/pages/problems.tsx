import { Link } from "react-router-dom";
import Input from "../components/input";

import { useNavigate, useSearchParams } from "react-router-dom";

import '../styles/problems.scss';
import { use, useEffect, useState } from "react";
import { Button, Flex, Pagination, Space, Table, Tag } from "antd";
import type { TableProps } from 'antd';
import { apiGetProblems } from "../apis/problem";

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
                <Tag color = 'volcano' key={categories}>{categories}</Tag>
            </Flex>
        ),
    },
    {
        title: 'Difficulty',
        dataIndex: 'difficulty',
        key: 'difficulty',
        render: (text) => (<Tag color = {text == 1 ? 'green' : (text == 2 ? 'orange' : 'red')}>{text == 1 ? 'Easy' : (text == 2 ? 'Middle' : 'Hard')}</Tag>),
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

export default function Problems() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [problems, setProblems] = useState<DataType[]>([])



    useEffect(() => {
        const page = searchParams.get('page');
        setCurrentPage(Number(page) < 1 ? 1 : Number(page));
        console.log(`current page number: ${currentPage}`)
        fetchData();
    }, [searchParams]);

    const fetchData = () => {
        // Fetch problems data based on search params
        apiGetProblems().then(res => {
            const list = res.data?.data.map((v: any) => ({ title: v.title, desc: v.description, difficulty: v.difficulty, categories: v.categories }))
            setProblems(list)
        }).catch(err => {
            console.log("error", err)
        })
    };
    const onPageChange = (page: number) => {
        console.log("Page changed to:", page);
        navigate(`/problems?page=${page}`);
    }

    return (
        <div className="page-container problems-page">
            <Input type="text" className="search-bar" placeholder="Search here" />
            <Button type="primary" className="mb-4"><Link to="/problem/addProblem">Add Problem</Link></Button>
            <Table<DataType> columns={columns} dataSource={problems} pagination={false} className="mb-4" />

            <Pagination onChange={onPageChange} defaultCurrent={1} current={currentPage} total={problems.length} />
        </div>
    );
}