// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { ChromeOutlined } from '@ant-design/icons';

// icons
const icons = {
  File
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const samplePage = {
  id: 'home-page',
  title: <FormattedMessage id="Home" />,
  type: 'group',
  url: '/home',
  icon: icons.ChromeOutlined
};


export default samplePage;

