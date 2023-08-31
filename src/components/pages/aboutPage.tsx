import { Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import ProductContext from "../../context/ProductContext";
import Banner from "../banners/Banner";

interface Section {
    id: string,
    revision_id: string,
}
interface Paragraph {
    heading: string,
    text: string,
    orientation: 'row' | 'row-reverse',
    image: string,
}

const AboutPage = () => {
    const { lang } = useContext(ProductContext);
    const [paragraphs, setParagraphs] = useState<Paragraph[]>([]);


    const fetchData = async () => {
        try {
            // get About us page data from the nid 6 page
            const { data } = await axios.get<any>(
            `http://ddev-test.ddev.site/${lang}/node/6?_format=json`,
            );

            const sections_data:[] = data['field_sections'];
            const sections:Section[] = sections_data.map(item => {
                return {
                    id: item['target_id'],
                    revision_id: item['target_revision_id'],
                }
            });
            (async function getParagraphs(): Promise<void> {
                try {
                const paragraphsData = await Promise.all(sections.map( async (section:Section) => {
                    const response: AxiosResponse<any> = await axios.get<any>(
                    `http://ddev-test.ddev.site/${lang}/entity/paragraph/${section.id}/?_format=json`
                    );
                    const responseData: any = response.data;

                    return {
                        heading: responseData['field_heading']['0']['value'],
                        text: responseData['field_text']['0']['value'],
                        orientation: responseData['field_orientation']['0']['value'],
                        image: responseData['field_image']['0']['url'],
                    }
                }));

                setParagraphs(paragraphsData);

                } catch (error) {
                console.error(error);
                }
            })();

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <Typography variant="h1" component="h1" marginBottom="3rem">{ "About us" }</Typography>
            { paragraphs.map((item) => {
                    return <Banner heading={item.heading} text={item.text} imageSrc={item.image} orientation={item.orientation}/>
                }
            ) }
        </>
    );
}

export default AboutPage;