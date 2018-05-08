import Post from '../models/post_model';


export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.tags = req.body.tags.split(' ');
  post.cover_url = req.body.cover_url;
  post.comments = '';

  post.save()
    .then((result) => {
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
// so that we don't return the content while returning a post
const parseOutContent = (givenPost) => {
  return givenPost.map((post) => {
    return {
      title: post.title, id: post._id, tags: post.tags.toString(), cover_url: post.cover_url, comments: post.comments,
    };
  });
};
export const getPosts = (req, res) => {
  Post.find({}, (err, posts) => {
    res.send(parseOutContent(posts));
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id).then((post) => {
    res.json({
      title: post.title,
      tags: post.tags,
      content: post.content,
      cover_url: post.cover_url,
    });
  })
    .catch((error) => {
      res.json({ error });
    });
};

export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id }).then((result) => {
    res.send('post deleted');
  }).catch((error) => {
    res.status(500).send(error);
  });
};

export const updatePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags.split(' '),
      cover_url: req.body.cover_url,
      comments: req.body.comments,
    },
  )
    .then((result) => {
      res.json({ message: 'Post updated!' });
    })
    .catch((error) => {
      res.json({ error });
    });
};
