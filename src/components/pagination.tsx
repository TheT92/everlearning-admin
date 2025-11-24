import '../styles/pagination.scss';
import Button from "./button";

interface Props {
    className?: string;
    data?: {
        currentPage: number;
        total: number;
    }
    onPageChange?: (page: number) => void;
}

export default function Pagination({
    className = "",
    data = { currentPage: 0, total: 0 },
    onPageChange = () => { }
}: Props) {

    const onclick = (page: number) => () => {
        onPageChange(page);
    }

    const totalPages = Math.ceil(data.total / 10);
    const { currentPage, total } = data;

    function showNode(index: number) {
        var bool =  index <= 1 || index == totalPages || (index <= currentPage + 2 && index >= currentPage - 2) || (currentPage <= 1 && index <= 6) || (currentPage == totalPages && index >= totalPages - 5);
        return bool;
    }

    function showDot(index: number) {
        return (currentPage == 1 && index == 7 && totalPages > 7) || (currentPage == totalPages && totalPages > 6 && index == totalPages - 6) || index == currentPage - 3 || index == currentPage + 3;
    }


    return (
        <div className={`el-pagination ${className}`}>
            <Button size="sm" className="el-page-btn">Previous</Button>
            {
                Array.from({ length: totalPages }, (_, index) => (
                    showNode(index + 1) ?
                        <Button mode='text' size="sm" onClick={onclick(index + 1)} key={index} className={`el-page-number ${currentPage == index + 1 ? 'active' : ''}`}>{index + 1}</Button>
                        : showDot(index + 1) ? '...' : null

                ))
            }
            <Button size="sm" className="el-page-btn">Next</Button>
        </div>
    );
}