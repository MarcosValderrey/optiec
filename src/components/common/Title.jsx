import PropTypes from 'prop-types';


function Title({ title, subtitle }) {
    // Render
    var titleElement = null;
    if (title) {
        titleElement = <h1 className='h1 mt-2'>{title}</h1>;
    }

    var subtitleElement = null;
    if (subtitle) {
        subtitleElement = <p className='text-muted'>{subtitle}</p>;
    }

    return (
        <>
            {titleElement}
            {subtitleElement}
        </>
    );
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
};

export default Title;
