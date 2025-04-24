const path = require("path");
const plans = require("./src/data/plansData").default || require("./src/data/plansData");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Final landing page
  createPage({
    path: "/final-landing/",
    component: require.resolve("./src/templates/finalLanding.js"),
  });

  // Blog posts
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

  // Grammar lessons
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

  // Vocabulary topics
  const vocabularyTemplate = require.resolve(`./src/templates/vocabulary-topic.js`);
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

  // Quizzes
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

  // Plans (from local data)
  const planTemplate = path.resolve("src/templates/PlanDetail.js");
  plans.forEach((plan) => {
    const slug = plan.title.toLowerCase().replace(/\s+/g, "-");
    createPage({
      path: `/plans/${slug}`,
      component: planTemplate,
      context: {
        plan,
      },
    });
  });
};
