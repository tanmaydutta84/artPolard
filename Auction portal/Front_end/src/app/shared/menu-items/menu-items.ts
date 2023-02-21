import { Injectable } from '@angular/core';

export interface Menu {
  state?: string;
  name?: string;
  type?: string;
  icon?: string;
  children?: Menu[];
}

const ADMINMENUITEMS = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'av_timer',
  },
  {
    state: 'admin-managment',
    name: 'Admin Managment',
    type: 'link',
    icon: 'palette',
    children: [
      {
        state: 'lookandfeel',
        name: 'Look and Feel',
        type: 'link',
        icon: 'search',
      },
      {
        state: 'sitepage',
        name: 'Site Page',
        type: 'link',
        icon: 'search',
      }
    ]
  },
  {
    state: 'dealer',
    name: 'Business Types',
    type: 'link',
    icon: 'people',
    children: [
      {
        state: 'add-dealer',
        name: 'Add New User',
        type: 'link',
        icon: 'search',
      },
      {
        state: 'dealer-logo',
        name: 'Logos',
        type: 'link',
        icon: 'search',
      }
    ]
  },
  // {
  //   state: 'products',
  //   name: 'Products',
  //   type: 'link',
  //   icon: 'store',
  //   children: [
  //     {
  //       state: 'add-product',
  //       name: 'Add Product',
  //       type: 'link',
  //       icon: 'search',
  //     }
  //   ]
  // },
  {
    state: 'category',
    name: 'Category',
    type: 'link',
    icon: 'store',
    children: [
      {
        state: 'category-list',
        name: 'Add Category',
        type: 'link',
        icon: 'search',
      }
    ]
  },
  {
    state: 'customer-account',
    name: 'Customer Account',
    type: 'link',
    icon: 'person',
  },
  // {
  //   state: 'account-settings',
  //   name: 'Account Settings',
  //   type: 'link',
  //   icon: 'settings',
  // },
  {
    state: 'inventory',
    name: 'Inventory',
    type: 'link',
    icon: 'table chart',
    children: [
      {
        state: 'inventory',
        name: 'Inventory',
        type: 'link',
        icon: 'search',
      },
      {
        state: 'listed-inventory',
        name: 'Listed Inventory',
        type: 'link',
        icon: 'search',
      },
      {
        state: 'sold-inventory',
        name: 'Sold Inventory',
        type: 'link',
        icon: 'search',
      },
    ]
  },
  {
    state: 'auction',
    name: 'Auction View',
    type: 'link',
    icon: 'update',
  },
  {
    state: 'account-statistics',
    name: 'Account Statistics',
    type: 'link',
    icon: 'ballot',
  },
  {
    state: 'messages',
    name: 'Messages',
    type: 'link',
    icon: 'textsms',
  },
  {
    state: 'expired-listings',
    name: 'Expired Listings',
    type: 'link',
    icon: 'report off',
  }
];

const CUSTOMERSERVICEMENUITEMS = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'av_timer',
  },
  {
    state: 'admin-managment',
    name: 'Admin Managment',
    type: 'link',
    icon: 'palette',
    children: [
      {
        state: 'lookandfeel',
        name: 'Look and Feel',
        type: 'link',
        icon: 'search',
      },
      {
        state: 'sitepage',
        name: 'Site Page',
        type: 'link',
        icon: 'search',
      }
    ]
  },
  {
    state: 'dealer',
    name: 'Business Types',
    type: 'link',
    icon: 'people',
    children: [
      {
        state: 'add-dealer',
        name: 'Add Dealer',
        type: 'link',
        icon: 'search',
      },
      {
        state: 'dealer-logo',
        name: 'Logos',
        type: 'link',
        icon: 'search',
      }
    ]
  },
  {
    state: 'products',
    name: 'Products',
    type: 'link',
    icon: 'store',
    children: [
      {
        state: 'add-product',
        name: 'Add Product',
        type: 'link',
        icon: 'search',
      }
    ]
  },
  // {
  //   state: 'account-settings',
  //   name: 'Account Settings',
  //   type: 'link',
  //   icon: 'settings',
  // },
  {
    state: 'inventory',
    name: 'Inventory',
    type: 'link',
    icon: 'table chart',
    children: [
      {
        state: 'inventory',
        name: 'Inventory',
        type: 'link',
        icon: 'search',
      },
      {
        state: 'listed-inventory',
        name: 'Listed Inventory',
        type: 'link',
        icon: 'search',
      },
      {
        state: 'sold-inventory',
        name: 'Sold Inventory',
        type: 'link',
        icon: 'search',
      },
    ]
  },
  {
    state: 'account-statistics',
    name: 'Account Statistics',
    type: 'link',
    icon: 'ballot',
  },
  {
    state: 'messages',
    name: 'Messages',
    type: 'link',
    icon: 'textsms',
  },
  {
    state: 'expired-listings',
    name: 'Expired Listings',
    type: 'link',
    icon: 'report off',
  }
];

const DEALERMENUITEMS = [
  // {
  //   state: 'dashboard',
  //   name: 'Dashboard',
  //   type: 'link',
  //   icon: 'av_timer',
  // },
  {
    state: 'logo',
    name: 'Logo',
    type: 'link',
    icon: 'av_timer',
  },
  {
    state: 'active-auction',
    name: 'Active Auction',
    type: 'link',
    icon: 'update',
  },
  {
    state: 'products',
    name: 'Products',
    type: 'link',
    icon: 'store',
    children: [
      {
        state: 'add-product',
        name: 'Add Product',
        type: 'link',
        icon: 'search',
      }
    ]
  },
  {
    state: 'user',
    name: 'User',
    type: 'link',
    icon: 'person',
  },
  {
    state: 'account-settings',
    name: 'Account Settings',
    type: 'link',
    icon: 'settings',
  },
  {
    state: 'inventory',
    name: 'Inventory',
    type: 'link',
    icon: 'table chart',
    children: [
      {
        state: 'inventory',
        name: 'Inventory',
        type: 'link',
        icon: 'search',
      },
      {
        state: 'inventory-list',
        name: 'Listed Inventory',
        type: 'link',
        icon: 'search',
      },
      {
        state: 'sold-inventory',
        name: 'Sold Inventory',
        type: 'link',
        icon: 'search',
      },
    ]
  }
];

const MANUFACTURERMENUITEMS = [
  // {
  //   state: 'dashboard',
  //   name: 'Dashboard',
  //   type: 'link',
  //   icon: 'av_timer',
  // },
  {
    state: 'logo',
    name: 'Logo',
    type: 'link',
    icon: 'av_timer',
  },
  {
    state: 'products',
    name: 'Products',
    type: 'link',
    icon: 'store',
    children: [
      {
        state: 'add-product',
        name: 'Add Product',
        type: 'link',
        icon: 'search',
      }
    ]
  },
  {
    state: 'user',
    name: 'User',
    type: 'link',
    icon: 'person',
  },
  {
    state: 'account-settings',
    name: 'Account Settings',
    type: 'link',
    icon: 'settings',
  },
  {
    state: 'inventory',
    name: 'Inventory',
    type: 'link',
    icon: 'table chart',
    children: [
      {
        state: 'inventory',
        name: 'Inventory',
        type: 'link',
        icon: 'search',
      },
      {
        state: 'listed-inventory',
        name: 'Listed Inventory',
        type: 'link',
        icon: 'search',
      },
      {
        state: 'sold-inventory',
        name: 'Sold Inventory',
        type: 'link',
        icon: 'search',
      },
    ]
  }
];

const SERVICEPROVIDERMENUITEMS = [
  // {
  //   state: 'dashboard',
  //   name: 'Dashboard',
  //   type: 'link',
  //   icon: 'av_timer',
  // },
  {
    state: 'logo',
    name: 'Logo',
    type: 'link',
    icon: 'av_timer',
  },
  // {
  //   state: 'products',
  //   name: 'Products',
  //   type: 'link',
  //   icon: 'store',
  //   children: [
  //     {
  //       state: 'add-product',
  //       name: 'Add Product',
  //       type: 'link',
  //       icon: 'search',
  //     }
  //   ]
  // },
  {
    state: 'user',
    name: 'User',
    type: 'link',
    icon: 'person',
  },
  {
    state: 'account-settings',
    name: 'Account Settings',
    type: 'link',
    icon: 'settings',
  },
  {
    state: 'inventory',
    name: 'Inventory',
    type: 'link',
    icon: 'table chart',
    children: [
      {
        state: 'inventory',
        name: 'Inventory',
        type: 'link',
        icon: 'search',
      },
      {
        state: 'listed-inventory',
        name: 'Listed Inventory',
        type: 'link',
        icon: 'search',
      },
      {
        state: 'sold-inventory',
        name: 'Sold Inventory',
        type: 'link',
        icon: 'search',
      },
    ]
  }
];
@Injectable()
export class MenuItems {

  getAdminMenuitem(): Menu[] {
    return ADMINMENUITEMS;
  }

  getCustomerServiceMenuItem(): Menu[] {
    return CUSTOMERSERVICEMENUITEMS;
  }

  getDealerMenuItem(): Menu[] {
    return DEALERMENUITEMS;
  }

  getManufacturerMenuItem(): Menu[] {
    return MANUFACTURERMENUITEMS;
  }

  getServiceProviderMenuItem(): Menu[] {
    return SERVICEPROVIDERMENUITEMS;
  }

}

