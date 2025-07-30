function mapListDto(list) {
  if (list === null || list === undefined) {
    return [];
  }
  return {
    id: list._id,
    items: list.items?.map((item) => mapItemDto(item)) || [],
  };
}

function mapItemDto(item) {
  return {
    id: item._id,
    text: item.text,
    subItems: item.subItems?.map((subItem) => mapSubItemDto(subItem)) || [],
    comments: item.comments || [],
  };
}

function mapSubItemDto(subItem) {
  return {
    id: subItem._id,
    text: subItem.text,
    comments: subItem.comments || [],
  };
}

module.exports = { mapListDto, mapItemDto, mapSubItemDto };
