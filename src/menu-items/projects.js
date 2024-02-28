// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { PhoneOutlined, RocketOutlined } from '@ant-design/icons';

// icons
const icons = { PhoneOutlined, RocketOutlined };
 


const projects = {
  id: 'group-pages',
  title: <FormattedMessage id="projects" />,
  type: 'group',
  children: [
    {
      id: 'COMP 0016',
      title: <FormattedMessage id="Team 3" />,
      type: 'item',
      url: '/modules/comp0016',
      target: true
    },
    {
      id: 'COMP 0067',
      title: <FormattedMessage id="Team 7" />,
      type: 'item',
      url: '/modules/comp0016',
      target: true
    }
  ]
};

export default projects;


