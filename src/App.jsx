import { Fragment } from "react"
import { useSelector } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "@/components/Layout"
import { paths } from "@/config"
import routes from "@/routes"

function App() {
    const isLogin = useSelector((state) => state.auth.isLogin)
    return (
        <Routes>
            {routes.map((route) => {
                const Component = route.component
                const ComponentLayout = route.layout ? Layout : null
                const protectedRoute = route.protected

                return (
                    <Fragment key={route.path}>
                        {/* {protectedRoute && !isLogin ? (
                            <Route path="*" element={<Navigate to={paths.login} />} />
                        ) :  */}
                        (
                        <Route
                            path={route.path}
                            element={
                                ComponentLayout ? (
                                    <ComponentLayout title={route.title}>
                                        <Component />
                                    </ComponentLayout>
                                ) : (
                                    <Component />
                                )
                            }
                        />
                        )
                    </Fragment>
                )
            })}
        </Routes>
    )
}

export default App
