export const ACCEPTED_FILE_TYPES = {
  "image/*": [".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"],
  "video/*": [".mp4", ".MP4"],
  "audio/*": [".wav", ".mp3"],
};

export const MEDIA_GALLERY_FILTER_KEY = {
  index: "mg",
  author: {
    filterKey: "author",
    searchKey: "document.author",
  },
  publisher: {
    filterKey: "publisher",
    searchKey: "document.publisher",
  },

  tags: {
    filterKey: "tags",
    searchKey: "tags.name",
  },

  title: {
    filterKey: "title",
    searchKey: "document.title",
  },
};

export const MY_UPLOADS_SORT = [
  {
    label: "uploaded_on",
    value: "dateUploaded",
  },
  {
    label: "taken_on",
    value: "dateCreated",
  },
];
