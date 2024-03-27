// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { PhoneOutlined, RocketOutlined } from '@ant-design/icons';

// icons
const icons = { PhoneOutlined, RocketOutlined };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const modules = {
  id: 'group-pages',
  title: <FormattedMessage id="modules" />,
  type: 'group',
  children: [
    {
      id: 'COMP 0016',
      title: <FormattedMessage id="comp0016" />,
      type: 'item',
      url: '/modules/comp0016',
      target: true
    },
    {
      id: 'COMP 0067',
      title: <FormattedMessage id="comp0016" />,
      type: 'item',
      url: '/modules/comp0016',
      target: true
    }
  ]
};

export default modules;
