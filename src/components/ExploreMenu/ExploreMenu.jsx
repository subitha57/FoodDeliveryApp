import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
import { useTranslation } from 'react-i18next';

const ExploreMenu = ({ setCategory,category, isDarkTheme }) => {
  const { t } = useTranslation();

  return (
    <div className={`explore-menu ${isDarkTheme ? 'dark-theme' : ''}`} id='explore-menu'>
      <h1>{t("Explore our menu")}</h1>
      <p className={`explore-menu-text ${isDarkTheme ? 'dark-text' : ''}`}>
        {t("Choose from a diverse menu featuring a delectable array of dishes")}.
      </p>
      <div className='explore-menu-list'>
        {
          menu_list.map((item, index) => (
            <div
              onClick={() => setCategory(item.menu_name)}
              key={index}
              className='explore-menu-list-item'
            >
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
              <p className={`circle ${isDarkTheme ? 'dark-text' : ''}`}>{item.menu_name}</p>
            </div>
          ))
        }
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
