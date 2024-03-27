declare global {
  interface Window {
    storefrontApi: {
      accessToken: string;
    };
    Shopify: {
      country: string;
      locale: string;
      currency: {
        active: string;
      };
      routes: {
        root: string;
      };
      shop: string;
      storefrontApi: {
        accessToken: string;
      };
    };
    customization: {
      openDrawer?: () => void;
      closeDrawer?: () => void;
      toggleDrawer?: () => void;
    };
  }
}
export { };
