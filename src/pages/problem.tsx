import { Link, useParams } from "react-router-dom";
import Button from "../components/button";
export default function Problem() {
    const { id } = useParams(); // 获取路径参数

    return (
        <div className="full-width problem-page">
            <div className=" d-flex">
                <div className="flex-1">
                    <h2>Description</h2>
                    <p>This is a detailed description of problem {id}.</p>
                </div>
                <div className="flex-1">
                    <h2>Submit Solution</h2>
                    <div className="d-flex flex-column align-center justify-center">
                        <p>Please login to submit the answer.</p>
                        <Link to="/login"><Button>Go to Login Page</Button></Link>
                    </div>

                </div>
            </div>
        </div>
    );
}