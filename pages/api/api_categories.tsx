import { Category } from '../../src/types';

const fetchCategories = async ( lang: string ): Promise<Category[]>=> {
    let categories:Category[] = [];

    try {
        // getting all available products
        const categories_data = await fetch(`${process.env.BACKEND_URL}/${lang}/categories/?_format=json`, {mode: 'no-cors'})
            .then(res => res.json());

        categories = categories_data.map( (item: { [x: string]: string; }) => {
            return {
                id: item['tid'],
                name: item['name'].toLowerCase(),
            }
        });

    } catch (error) {
        console.log('unexpected error: ', error);
    }

    return categories;
};

export default fetchCategories;