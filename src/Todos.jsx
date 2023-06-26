const Todos = (props) => {
    const {
      parentClassName,
      titleClassName,
      descClassName,
      status,
      checkMark,
      trashCan,
      clickParent,
      title,
      description
    } = props;
    return (
      <div className={parentClassName} onClick={clickParent}>
        <div className="title-desc">
          <h3 className={titleClassName}>{title}</h3>
          <p className={descClassName}>{description}</p>
          <p>{`Status: ${status}`}</p>
        </div>
        <div className="TodoActions">
          {checkMark} {trashCan}
        </div>
      </div>
    );
  };
  
  export default Todos;
  