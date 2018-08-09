import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Navbar from '../components/Navbar'
import '../style/grid.css';
import Heading from '../components/Heading';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="JR->JS" />
    <Heading />
    <div className="grid-main">
        <Navbar />
        <div className="grid-main-content">
            {children()}
        </div>
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
