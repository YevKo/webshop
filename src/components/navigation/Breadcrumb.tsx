import { Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next';

interface BreadcrumbProps {}

const Breadcrumb: React.FC<BreadcrumbProps> = () => {
    const { t } = useTranslation();

    const router = useRouter()
    const pathname = router.pathname;
    const segments = pathname.split('/').filter(segment => segment !== '').slice(0, -1);

    const items = [
        { label: t('nav.home'), path: '/' }, // 'Home' crumb item,
        ...segments.map((segment, index) => {
            const label = t(`nav.${segment}`);
            const path = `/${segments.slice(0, index + 1).join('/')}`;
            return { label: label, path };
        })
    ];

    return (
        <nav className='breadcrumbs' aria-label='breadcrumb' style={{ marginTop: '3rem', marginBottom: '3rem'}} suppressHydrationWarning={true}>
            <Breadcrumbs aria-label='breadcrumb' sx={{ textTransform: 'uppercase'}}>
                {items.map( (item, index) => (
                    <Link key={index} href={item.path} className='textStyleMain' style={{ color: 'black', textDecoration: 'none' }}>
                        <Typography variant='body2' suppressHydrationWarning={true}>
                            { item.label }
                        </Typography>
                    </Link>
                ))}
            </Breadcrumbs>
        </nav>
    );
}

export default Breadcrumb;