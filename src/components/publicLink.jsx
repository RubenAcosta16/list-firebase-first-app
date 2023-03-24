import style from './css/publicLink.module.css'

const publicLink = ({url,title}) => {
  return (

      <a href={url} className={style.publicLinkContainer} target="_blank">
        <div>{title}</div>
      </a>

  );
};

export default publicLink;
