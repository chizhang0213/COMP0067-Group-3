// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { PhoneOutlined, RocketOutlined } from '@ant-design/icons';

// icons
const icons = { PhoneOutlined, RocketOutlined };

// ==============================|| MENU ITEMS - PAGES ||============================== //


const DynamicMenuItems = ({ initialModules }) => {
  const [modules, setModules] = useState(initialModules || []);

  useEffect(() => {
    const loadModules = async () => {
      const modulesData = await useFetchModule();
      setModules(modulesData);
    };

    loadModules();
  }, []);

  // Construct menu items dynamically
  const modulesMenuItems = {
    id: 'group-modules',
    title: <FormattedMessage id="modules" />,
    type: 'group',
    children: modules.map((module) => ({
      id: module.moduleNo, // Assuming `moduleNo` is unique
      title: <FormattedMessage id={module.moduleNo} defaultMessage={module.title} />,
      type: 'item',
      url: `/modules/${module.moduleNo}`,
      target: true,
    })),
  };

  // Render logic here, or pass `modulesMenuItems` to the component responsible for rendering the menu
  return (
    <div>
      {/* Your rendering logic for the menu based on `modulesMenuItems` */}
    </div>
  );
};

export default DynamicMenuItems