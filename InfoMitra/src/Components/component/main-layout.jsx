import { Outlet } from "react-router-dom";
import { Header, Footer } from '@/Components';

export function MainLayout(){
    return (
        <>
            <Header />
            <main className="flex flex-1 pt-16 min-h-[90vh] flex-col overflow-hidden">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}