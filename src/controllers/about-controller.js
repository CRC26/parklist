export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About Parktime",
        };
        return h.view("about-view", viewData);
      },
    },
  };