interface PageLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Users {
  id: number;
  name: string;
  email: string;
  country: string;
  role: string;
  status: string;
}


interface UserView {
  id: number;
  name: string;
  email: string;
  photo: string;
  bg_photo: string;
  country: string;
  phone: string;
  role: string;
  status: string;
  created_at: string;
}

interface UserViewProps {
  user: UserView;
}


interface AdminUserProps {
  users: {
    data: Users[];
    current_page: number;
    last_page: number;
    total: number;
  };
  pages?: PageLink[];
  searchInput: string;
}

interface CLModalProps {
  modalType: string;
  recordId: number;
  routeLink: string;
  modalFlip: boolean;
  handleModalState: (stateUpdate: string) => void;
}

export { AdminUserProps, CLModalProps, PageLink, UserViewProps };
