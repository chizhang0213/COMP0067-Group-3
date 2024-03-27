import db from 'db/index';
import ModuleList from 'sections/module/ModuleList';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

export default async function SampleViewPage() {
  try {
    const modules = await db.modules.findMany().then((modules) => {
      return modules.sort((a, b) => a.moduleNo.localeCompare(b.moduleNo, 'en', { numeric: true }));
    });

    let breadcrumbLinks = [{ title: 'Home', to: '/home' }];
    return (
      <>
        <Breadcrumbs custom heading="Home" links={breadcrumbLinks} />
        <ModuleList modules={modules} />
      </>
    );
  } catch (error) {
    console.error('Error fetching modules:', error);
    return <div>Error fetching modules. Please try again later.</div>;
  }
}
