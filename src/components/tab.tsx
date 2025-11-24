interface Props {
    className?: string;
    children: React.ReactNode;
}
function Tab({
    className = "",
    children
}: Props) {
    return (
        <div className={`el-tab ${className}`}>
            {children}
        </div>
    );
}

interface ItemProps {
    className?: string;
    children: React.ReactNode;
}
function Item({ className = "", children }: ItemProps) {
    return (
        <div className={`el-tab-item ${className}`}>
            {children}
        </div>
    );
}

Tab.Item = Item;
export default Tab;