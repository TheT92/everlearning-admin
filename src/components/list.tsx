interface Props {
    children: React.ReactNode;
    className?: string;
}
function List({ 
    children,
    className = ""
 }: Props) {
    return (
        <div className={`el-list ${className}`}>
            {children}
        </div>
    );
}

interface ItemProps {
    children: React.ReactNode;
    className?: string;
}
function Item({ 
    children,
    className = ""
 }: ItemProps) {
    return (
        <div className={`el-list-item ${className}`}>
            {children}
        </div>
    );
}

List.Item = Item;
export default List;

