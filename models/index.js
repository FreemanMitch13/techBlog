const Post = require('./post');
const User = require('./user');
const Comment = require('./comments');



User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
Post.belongsTo(User,{
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});


Module.exports = { User, Post, Comment };