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
  };
}

function mapSubItemDto(subItem) {
  return {
    id: subItem._id,
    text: subItem.text,
    completed: subItem.completed,
  };
}

module.exports = { mapListDto, mapItemDto, mapSubItemDto };
