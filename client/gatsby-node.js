exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path.match(/^\/plant/)) {
    page.matchPath = '/plant/*';
    createPage(page);
  }
};
