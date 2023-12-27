import React, {useState} from 'react';

import {useTheme, useTranslation} from '../hooks/';
import {Block, Carousel} from '../components/';
import Deals from '../components/Deals';
import ProductCategory from '../components/ProductCategory';

const Home = () => {
  useTranslation();
  const [] = useState<number>(0);

  useTheme();

  return (
    <>
      <Block paddingHorizontal={10}>
        {/* <Block color={colors.card} flex={0} padding={sizes.padding}>
          <Input search placeholder={t('common.search')} />
        </Block> */}
        <Carousel />
        {/* <ProductCategory /> */}
        <Deals />
      </Block>
    </>
  );
};

export default Home;
