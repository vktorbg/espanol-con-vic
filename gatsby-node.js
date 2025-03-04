const path = require("path");

// Import your plans data
const plans = require("./src/data/plansData").default || require("./src/data/plansData");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Create Community Blog Pages
  const blogPostTemplate = require.resolve(`./src/templates/blog-post.js`);
  const blogResult = await graphql(`
    {
      allContentfulBlogPost(sort: { createdAt: DESC }) {
        nodes {
          slug
        }
      }
    }
  `);
  blogResult.data.allContentfulBlogPost.nodes.forEach((post) => {
    createPage({
      path: `/blog/${post.slug}`,
      component: blogPostTemplate,
      context: { slug: post.slug },
    });
  });

  // Create Grammar Lesson Pages
  const grammarTemplate = require.resolve(`./src/templates/grammar-lesson.js`);
  const grammarResult = await graphql(`
    {
      allContentfulGrammarLesson(sort: { createdAt: DESC }) {
        nodes {
          slug
        }
      }
    }
  `);
  grammarResult.data.allContentfulGrammarLesson.nodes.forEach((lesson) => {
    createPage({
      path: `/grammar/${lesson.slug}`,
      component: grammarTemplate,
      context: { slug: lesson.slug },
    });
  });

  // Create Vocabulary Topic Pages
  const vocabularyTemplate = require.resolve(
    `./src/templates/vocabulary-topic.js`
  );
  const vocabularyResult = await graphql(`
    {
      allContentfulVocabularyTopic(sort: { createdAt: DESC }) {
        nodes {
          slug
        }
      }
    }
  `);
  vocabularyResult.data.allContentfulVocabularyTopic.nodes.forEach((topic) => {
    createPage({
      path: `/vocabulary/${topic.slug}`,
      component: vocabularyTemplate,
      context: { slug: topic.slug },
    });
  });

  // Create Quizzes Pages (using the contentful quiz id)
  const quizTemplate = require.resolve(`./src/templates/quiz.js`);
  const quizResult = await graphql(`
    {
      allContentfulQuiz {
        nodes {
          id
        }
      }
    }
  `);
  quizResult.data.allContentfulQuiz.nodes.forEach((quiz) => {
    createPage({
      path: `/quizzes/${quiz.id}`,
      component: quizTemplate,
      context: { id: quiz.id },
    });
  });

  // Create Plan Detail Pages
  const planTemplate = path.resolve("src/templates/PlanDetail.js");

  // Iterate over each plan to create a page.
  plans.forEach((plan) => {
    // Create a URL-friendly slug. You might use a library like slugify for more robust conversion.
    const slug = plan.title.toLowerCase().replace(/\s+/g, "-");

    createPage({
      path: `/plans/${slug}`,
      component: planTemplate,
      context: {
        plan, // pass the plan data as context
      },
    });
  });
};


exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  createPage({
    path: "/final-landing/",
    component: require.resolve("./src/templates/finalLanding.js"),
  });
};
