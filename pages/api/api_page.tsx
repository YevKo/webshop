import { ParagraphProps, ContentSection } from '../../src/types';

const fetchPageData = async ( nid: string, lang: string ): Promise<ParagraphProps[]> => {

    const paragraphs_data = await fetch(`${process.env.BACKEND_URL}/${lang}/node/${nid}?_format=json`)
        .then(res => res.json());

    const sections_data:[] = paragraphs_data.field_sections;
    const sections:ContentSection[] = sections_data.map(item => {
        return {
            id: item['target_id'],
            revision_id: item['target_revision_id'],
        }
    });
    const paragraphs = await Promise.all(
        sections.map( async (section:ContentSection) => {
        const response = await fetch(`${process.env.BACKEND_URL}/${lang}/entity/paragraph/${section.id}/?_format=json`)
            .then(res => res.json());

        return {
            id: response['uuid']['0']['value'],
            heading: response['field_heading']['0']['value'],
            text: response['field_text']['0']['value'],
            orientation: response['field_orientation']['0']['value'],
            image: response['field_image']['0']['url'],
            type: response['type']['0']['target_id'],
        }
    }));

    return paragraphs;
};

export default fetchPageData;