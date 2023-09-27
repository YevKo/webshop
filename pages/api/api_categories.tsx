import { Category } from '../../src/types';

const backend_url = 'https://main-bvxea6i-33i32kvwbas3y.de-2.platformsh.site/';

const fetchCategories = async ( lang ): Promise<Category[]>=> {
    let categories:Category[] = [];

    try {
        // getting all available products
        const categories_data = await fetch(`${backend_url}/${lang}/categories/?_format=json`, {mode: 'no-cors'})
            .then(res => res.json());

        categories = categories_data.map( item => {
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