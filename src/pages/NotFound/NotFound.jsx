import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div data-component="NotFound" className="mt-40">
            <div className="text-center text-9xl text-accent-1">404</div>
            <div className="mt-4 text-center text-xl">
                Trang không tồn tại, vui lòng{" "}
                <Link to="/" className="text-primary-2 underline">
                    quay lại trang chủ
                </Link>
            </div>
        </div>
    )
}

export default NotFound
