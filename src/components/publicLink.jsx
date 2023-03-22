const publicLink = ({url,title}) => {
  return (
    <div>
      <a href={url}>{title}</a>
    </div>
  );
};

export default publicLink;
