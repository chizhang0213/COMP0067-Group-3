import PropTypes from 'prop-types';
import './globals.css';

// PROJECT IMPORTS
import ProviderWrapper from './ProviderWrapper';

export const metadata = {
  title: 'IXN Projects Marking Web App',
  description: 'It aims to streamline the process for lecturers and TAs to manage and assess the performance of students in project-based classes.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node
};

