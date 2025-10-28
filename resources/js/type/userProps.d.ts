interface PageLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  country: string;
  status: string;
}

interface PasswordVisibility {
  password: boolean;
  cpassword: boolean;
}

interface UserProps {
  users: {
    data: Customer[];
    current_page: number;
    last_page: number;
    total: number;
  };
  pages?: PageLink[];
  searchInput: string;
}

type RegisterForm = {
  uname: string;
  email: string;
  password: string;
  cpassword: string;
  country: string;
};

interface CLModalProps {
  modalType: string;
  recordId: number;
  routeLink: string;
  modalFlip: boolean;
  handleModalState: (stateUpdate: string) => void;
}

interface UserView {
  id: number;
  name: string;
  provider_token: string;
  email: string;
  photo: string;
  bg_photo: string;
  country: string;
  address: string;
  phone: string;
  role: string;
  status: string;
  created_at: string;
}

interface UserViewProps {
  user: UserView;
}

type ProgressArray = {
  phone?: string;
  country?: string;
  address?: string;
  photo?: string;
};

type UserFormObj = {
  id: number;
  user_name: string;
  email: string;
  country: string;
  status: string;
  deleted_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

type UserState = UserFormObj;

type UserFormProps = {
  userInfo: UserFormObj;
  handleUserObj: (data: UserState) => void;
};

interface UserTableProps extends UserProps {
  handleUserObj: (data: UserState) => void;
}

export {
  RegisterForm,
  UserFormProps,
  UserProps,
  UserState,
  CLModalProps,
  ProgressArray,
  PageLink,
  UserViewProps,
  UserTableProps,
  PasswordVisibility,
};
