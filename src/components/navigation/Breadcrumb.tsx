import { Breadcrumbs, Link } from "@mui/material";
import { useLocation } from "react-router-dom";

interface BreadcrumbProps {
    items: {
        label: string;
        path: string;
    }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = () => {
    const location = useLocation();
    const pathname = location.pathname;
    // Split the pathname into segments
    const segments = pathname.split('/').filter(segment => segment !== '');

    // Build the breadcrumb items array
    const items = [
        { label: 'Home', path: '/' }, // "Home" crumb item,
        ...segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`;
        return { label: segment, path };
    })];

    return (
        <nav aria-label="breadcrumb" style={{ marginTop: "3rem"}}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ textTransform: 'uppercase'}}>
                {items.map( (item, index) => (
                    <Link key={index} underline="hover" color="inherit" href={item.path} variant="body2">
                        { item.label }
                    </Link>
                ))}
            </Breadcrumbs>
        </nav>
    );
}

export default Breadcrumb;