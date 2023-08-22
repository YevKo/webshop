import { Breadcrumbs, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import i18n from "../../i18n";

interface BreadcrumbProps {}

const Breadcrumb: React.FC<BreadcrumbProps> = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const segments = pathname.split('/').filter(segment => segment !== '');

    const items = [
        { label: i18n.t('nav.home'), path: '/' }, // "Home" crumb item,
        ...segments.map((segment, index) => {
        const label = i18n.exists(`nav.${segment}`) ? i18n.t(`nav.${segment}`) : segment;
        const path = `/${segments.slice(0, index + 1).join('/')}`;
        return { label: label, path };
    })];

    return (
        <nav aria-label="breadcrumb" style={{ marginTop: "3rem", marginBottom: "3rem"}}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ textTransform: 'uppercase'}}>
                {items.map( (item, index) => (
                    <Link key={index} to={item.path} className="textStyleMain" style={{ color: "black", textDecoration: "none" }}>
                        <Typography variant="body2">
                            { item.label }
                        </Typography>
                    </Link>
                ))}
            </Breadcrumbs>
        </nav>
    );
}

export default Breadcrumb;