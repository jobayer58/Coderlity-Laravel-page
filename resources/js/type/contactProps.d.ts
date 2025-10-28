interface PageLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  created_at: string;
}

interface ContactView {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  service_type: string;
  message: string;
  created_at: string;
}


interface ContactViewProps {
  contact: ContactView;
}

interface ContactProps {
  contacts: {
    data: Contact[];
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

export { ContactProps, CLModalProps, PageLink, ContactViewProps };
