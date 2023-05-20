import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  ApartmentOutlined,
  AppstoreOutlined,
  BellOutlined,
  BookOutlined,
  FileOutlined,
  PlusOutlined,
  TrademarkCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Define a type for the slice state
interface HeaderNavState {
  buttons: Buttons[];
}

interface Menu {
  name: string;
  icon: any;
  toolTip: string;
  path?: string;
}

interface Buttons {
  name: string;
  icon: any;
  toolTip: string;
  type?: string;
  menu?: Menu[];
  path?: string;
  admin?: boolean;
}

// Define the initial state using that type
const initialState: HeaderNavState = {
  buttons: [
    {
      name: "Documentos",
      toolTip: "headerNav.documents",
      icon: <FileOutlined />,
      path:'/',
      admin: false
    },
    {
      name: "Administrador",
      toolTip: "headerNav.admin",
      icon: <UserOutlined />,
      path:'/documents',
      admin: true
    },
    {
      name: "Catálogos",
      toolTip: "headerNav.catalogs",
      icon: <BookOutlined />,
      type: "menu",
      admin: true,
      menu: [
        {
          name: "Departamentos",
          toolTip: "departments.title",
          icon: <AppstoreOutlined />,
          path: '/departments'
        },
        {
          name: 'Puestos',
          toolTip: 'positions.title',
          icon: <ApartmentOutlined />,
          path: '/positions'
        },
        {
          name: 'Companies',
          toolTip: 'common.companies',
          icon: <TrademarkCircleOutlined />,
          path: '/companies'
        },
        {
          name: 'Usuarios',
          toolTip: 'common.users',
          icon: <TeamOutlined />,
          path: '/users'
        },
      ],
    }
  ],
};

export const headerNavSlice = createSlice({
  name: "headerNav",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export const { } = headerNavSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const headerButtons = (state: RootState) => state.headerNav.buttons;

export default headerNavSlice.reducer;
