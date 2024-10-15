import MainLayout from "./components/Layouts/MainLayout"

function Layout({ children, title }) {
    return <MainLayout title={title}>{children}</MainLayout>
}

export default Layout
