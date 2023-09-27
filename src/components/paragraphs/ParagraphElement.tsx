import React from 'react';
import BannerSplit from '../banners/BannerSplit';
import BannerWide from '../banners/BannerWide';
import { ParagraphProps } from '../../types';

const ParagraphElement: React.FC< { par: ParagraphProps}> = ( { par } ) => {

    return (
        <div>
            { (par.type == 'banner' && par.orientation !== 'wide') && <BannerSplit heading={par.heading} text={par.text} image={par.image} orientation={par.orientation} id={par.id} />}
            { (par.type == 'banner' && par.orientation === 'wide') && <BannerWide heading={par.heading} text={par.text} image={par.image} id={par.id} />}
        </div>
    );
}

export default ParagraphElement;