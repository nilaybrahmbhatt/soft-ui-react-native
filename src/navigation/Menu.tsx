/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Linking, StyleSheet, View} from 'react-native';
import CategoriesApi from '../redux/Categories/actions';
import UserApi from '../redux/User/actions';

import {useDispatch, useSelector} from 'react-redux';
import {
  useIsDrawerOpen,
  createDrawerNavigator,
  // DrawerContentComponentProps,
  // DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Collapsible from 'react-native-collapsible';

import Screens from './Screens';
import CustomCategories from './categories.json';

import {Block, Text, Button, Image} from '../components';
import {useTheme, useTranslation} from '../hooks';
const Drawer = createDrawerNavigator();
/* drawer menu screens navigation */
const ScreensStack = () => {
  const {colors} = useTheme();
  const isDrawerOpen = useIsDrawerOpen();
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{scale: scale}],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}>
      {/*  */}
      <Screens />
    </Animated.View>
  );
};

/* custom drawer menu */
const DrawerContent = (props: any): React.ReactNode => {
  const {navigation, user, categories, loading} = props;
  const customCategoriesList = CustomCategories;

  const {t} = useTranslation();
  // const {isDark, handleIsDark} = useData();
  const [active, setActive] = useState('Home');
  const {assets, colors, gradients, sizes} = useTheme();
  const dispatch = useDispatch();
  // const user = useSelector((s) => s.user.user);
  const labelColor = colors.text;

  const handleNavigation = useCallback(
    (to: React.SetStateAction<string>, parmas: any) => {
      setActive(to);
      navigation.navigate(to, parmas);
    },
    [navigation, setActive],
  );

  const userLogout = () => {
    UserApi.logout(dispatch);
  };

  // const handleWebLink = useCallback((url: string) => Linking.openURL(url), []);
  const screens = [
    {name: t('screens.home'), to: 'Home', icon: assets.home},
    // {name: t('screens.components'), to: 'Components', icon: assets.components},
    // {name: t('screens.articles'), to: 'Articles', icon: assets.document},
    // {name: t('screens.rental'), to: 'Pro', icon: assets.rental},
    // {name: t('screens.profile'), to: 'Profile', icon: assets.profile},
    // {name: t('screens.settings'), to: 'Pro', icon: assets.settings},
    // {name: t('screens.register'), to: 'Register', icon: assets.register},
    // {name: 'Login', to: 'Login', icon: assets.register},
    // {name: t('screens.extra'), to: 'Pro', icon: assets.extras},
  ];
  if (user?.user) {
    screens.push({name: 'My Orders', to: 'My Orders', icon: assets.register});
    screens.push({name: 'My Account', to: 'My Orders', icon: assets.register});
  } else {
    screens.push({
      name: t('screens.register'),
      to: 'Register',
      icon: assets.register,
    });
    screens.push({name: 'Login', to: 'Login', icon: assets.register});
  }
  return (
    <>
      <DrawerContentScrollView
        {...props}
        scrollEnabled
        removeClippedSubviews
        renderToHardwareTextureAndroid
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block paddingHorizontal={sizes.padding} paddingVertical={20}>
          <Block flex={0} row align="center" marginBottom={sizes.l}>
            <Image
              radius={100}
              width={50}
              height={50}
              source={assets.profile}
              marginRight={sizes.sm}
            />
            {user?.user ? (
              <Block>
                <Text size={14} bold>
                  {user.user.displayName}
                </Text>
                <Text
                  size={10}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  color={labelColor}>
                  {user.user.email}
                </Text>
              </Block>
            ) : (
              <Block>
                <Text size={16} semibold>
                  Welcome,
                </Text>
                <Text size={14} semibold>
                  User
                </Text>
              </Block>
            )}
          </Block>
          <Block
            flex={0}
            height={1}
            marginRight={sizes.sm}
            gradient={gradients.menu}
          />
          {screens?.map((screen, index) => {
            const isActive = active === screen.to;
            return (
              <Button
                row
                justify="space-between"
                key={`menu-screen-${screen.name}-${index}`}
                onPress={() => handleNavigation(screen.to)}>
                {/* <Block
                  flex={0}
                  radius={6}
                  align="center"
                  justify="center"
                  width={sizes.md}
                  height={sizes.md}
                  marginRight={sizes.s}
                  gradient={gradients[isActive ? 'primary' : 'white']}>
                  <Image
                    radius={0}
                    width={14}
                    height={14}
                    source={screen.icon}
                    color={colors[isActive ? 'white' : 'black']}
                  />
                </Block> */}
                <Text
                  p
                  semibold={isActive}
                  color={isActive ? colors.primary : labelColor}>
                  {screen.name}
                </Text>
                <Image width={10} height={10} source={assets.arrow} />
              </Button>
            );
          })}
          <Text marginVertical={10} bold size={20}>
            Categories
          </Text>
          {/* <Block flex={0} height={1} gradient={gradients.menu} /> */}
          {customCategoriesList.map((category, index) => {
            return (
              <View key={`menu-screen-${category.handle}-${index}`}>
                <Button
                  row
                  justify="space-between"
                  marginBottom={sizes.s}
                  onPress={() => {
                    if (category.children) {
                      if (active !== category.handle) {
                        setActive(category.handle);
                      } else {
                        setActive(null);
                      }
                    } else {
                      handleNavigation('CategoryInfo', {category});
                    }
                  }}>
                  <Text p color={labelColor}>
                    {category.name}
                  </Text>
                  <Image
                    width={10}
                    height={10}
                    source={assets.arrow}
                    style={{
                      transform: [
                        {rotate: active === category.handle ? '90deg' : '0deg'},
                      ],
                    }}
                  />
                </Button>
                {category.children ? (
                  <Collapsible collapsed={!(active === category.handle)}>
                    <Block marginLeft={10}>
                      {category.children.map((child, i) => {
                        return (
                          <Button
                            key={`menu-screen-${child.handle}-${i}`}
                            row
                            justify="flex-start"
                            marginBottom={sizes.s}
                            onPress={() => {
                              handleNavigation('CategoryInfo', {
                                category: child,
                              });
                            }}>
                            <Text p color={labelColor}>
                              {child.name}
                            </Text>
                          </Button>
                        );
                      })}
                    </Block>
                  </Collapsible>
                ) : null}
              </View>
            );
          })}
        </Block>
      </DrawerContentScrollView>
      {user?.user ? (
        <Button
          paddingHorizontal={20}
          marginBottom={25}
          row
          justify="flex-start"
          onPress={userLogout}>
          <Text semibold transform="uppercase">
            Logout
          </Text>
        </Button>
      ) : null}
    </>
  );
};

/* drawer menu navigation */
const MenuDefault = (props: any) => {
  const {gradients} = useTheme();
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: {categories: any}) => state.categories,
  );
  const user = useSelector((state: {user: any}) => state.user);
  const loading = categories.isFetching;
  const categoriesList = categories.list;
  useEffect(() => {
    CategoriesApi.fetchCategories(dispatch);
  }, []);

  return (
    <Block>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={(props) => (
          <DrawerContent
            {...props}
            categories={categoriesList}
            user={user}
            loading={loading}
          />
        )}
        drawerStyle={{
          flex: 1,
          width: '60%',
          borderRightWidth: 0,
          backgroundColor: 'transparent',
        }}>
        <Drawer.Screen name="Screens" component={ScreensStack} />
      </Drawer.Navigator>
    </Block>
  );
};
export default MenuDefault;
