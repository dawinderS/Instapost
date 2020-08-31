const { default: styled } = require("styled-components/ts3.7");

<Post>
  <Files onDoubleClick={toggleLike}>
    {files &&
      files.map((file, index) => (
        <File key={file.id} src={file.url} showing={index === currentItem} />
      ))}
  </Files>
  <Info>
    <Header>
      <Link to={`/${user.username}`}>
        <Avatar size="sm" url={user.avatar} />
      </Link>
      <UserColumn>
        <UsernameLink to={`/${user.username}`}>
          <FatText text={user.username} />
        </UsernameLink>
        {location && <Location>{location}</Location>}
      </UserColumn>
      <p onClick={openModal}><PostOptions /></p>
    </Header>
    {comments && (
    <Comments>
      {comments.map((comment) => (
        <Comment key={comment.id}>
          <Link to={`/${comment.user.username}`}>
            <FatText text={comment.user.username} />
          </Link>
          {comment.text}
        </Comment>
      ))}
      {selfComments.map((comment) => (
        <Comment key={comment.id}>
          <Link to={`/${comment.user.username}`}>
            <FatText text={comment.user.username} />
          </Link>
          {comment.text}
        </Comment>
      ))}
    </Comments>
    )}
    <Meta>
      <Buttons>
        <Button onClick={toggleLike}>
          {isLiked ? <HeartFull /> : <HeartEmpty />}
        </Button>
        <Button>
          <CommentIcon />
        </Button>
      </Buttons>
      <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
      <Timestamp>{moment(createdAt).fromNow()}</Timestamp>
    </Meta>
    <CommentHolder>
      <img src={me.avatar} width="26" height="26" />
      <div>
        <Textarea
          id="usercomment"
          onKeyPress={onKeyPress}
          placeholder={`Add a comment...`}
          value={newComment.value}
          onChange={newComment.onChange}
        />
        {newComment.value.length < 1 && <p id="postComment">Post</p>}
        {newComment.value.length > 0 && <p onClick={onPostClick}>Post</p>}
      </div>
    </CommentHolder>
  </Info>
</Post>

const Post2 = styled.div`
  ${(props) => props.theme.whiteBox};
  display: flex;
  width: 935px;
  min-height: 450px;
  @media screen and (max-width: 770px) {
    display: none;
  }
`;

const Files2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const File2 = styled.img`
  max-width: 600px;
  max-height: 80vh;
  min-height: 450px;
  background-size: cover;
  background-position: center;
`;

const Info = styled.div`
  display: flex;
  width: 335px;
  flex-direction: column;
`;

