function mapListDto(list) {
  if (list === null || list === undefined) {
    return [];
  }
  return {
    id: list._id,
    list: list.items?.map((item) => mapItemDto(item)) || [],
  };
}

function mapItemDto(item) {
  return {
    id: item._id,
    text: item.text,
    completed: item.completed,
    subItems: item.subItems?.map((subItem) => mapSubItemDto(subItem)) || [],
    comments: item.comments?.map((comment) => mapCommentDto(comment)) || [],
  };
}

function mapSubItemDto(subItem) {
  return {
    id: subItem._id,
    text: subItem.text,
    completed: subItem.completed,
    comments: subItem.comments?.map((comment) => mapCommentDto(comment)) || [],
  };
}

function mapCommentDto(comment) {
  return {
    id: comment._id,
    text: comment.text,
  };
}

module.exports = { mapListDto, mapItemDto, mapSubItemDto };
